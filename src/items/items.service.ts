import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateItem, ItemIdDTO, UpdateItem } from './dto/items';
import { TypeBarang } from '@prisma/client';

@Injectable()
export class ItemsService {
  constructor(private prismaService: PrismaService) {}

  async findAll(params: {
    page: number;
    limit: number;
    search?: string;
    typeId?: number;
    itemType?: TypeBarang;
    availability?: string;
    isPublic?: boolean;
  }) {
    const { page, limit, search, typeId, itemType, availability, isPublic } = params;
    const skip = (page - 1) * limit;

    const where: any = {};
    
    if (isPublic) {
      where.availability = 'TERSEDIA';
    } else if (availability) {
      where.availability = availability;
    }

    if (typeId) {
      where.typeId = typeId;
    }

    if (itemType) {
      where.itemType = {
        type: itemType
      };
    }

    if (search) {
      where.OR = [
        { 
          itemType: {
            name: { contains: search, mode: 'insensitive' }
          }
        },
        { condition: { contains: search, mode: 'insensitive' } },
        { spec: { contains: search, mode: 'insensitive' } }
      ];
    }

    const [items, total] = await Promise.all([
      this.prismaService.items.findMany({
        where,
        skip,
        take: limit,
        include: {
          room: true,
          itemType: {
            include: {
              supplier: !isPublic
            }
          }
        },
        orderBy: {
          created_at: 'desc'
        }
      }),
      this.prismaService.items.count({ where })
    ]);

    return {
      items,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      totalItems: total
    };
  }


  async findByType(typeId: number, params: { page: number; limit: number }) {
    const { page, limit } = params;
    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      this.prismaService.items.findMany({
        where: { typeId },
        skip,
        take: limit,
        include: {
          room: true,
          itemType: {
            include: {
              supplier: true
            }
          }
        },
        orderBy: {
          created_at: 'desc'
        }
      }),
      this.prismaService.items.count({ 
        where: { typeId } 
      })
    ]);

    return {
      items,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      totalItems: total
    };
  }

  async findOne(id: string) {
    const item = await this.prismaService.items.findUnique({
      where: { id },
      include: {
        room: true,
        itemType: {
          include: {
            supplier: true,
            users: {
              select: {
                username: true,
                role: true
              }
            }
          }
        },
        movements: {
          include: {
            movement: true
          }
        }
      }
    });
    
    if (!item) throw new NotFoundException('Item not found');
    return item;
  }

  async create(data: CreateItem) {
    return await this.prismaService.$transaction(async (prisma) => {
      // Create item
      const item = await prisma.items.create({
        data: {
          availability: data.availability,
          roomId: data.roomId,
          condition: data.condition,
          spec: data.spec,
          image: data.image,
          typeId: data.typeId
        },
        include: {
          room: true,
          itemType: true
        }
      });

      // Update itemType quantity
      await prisma.items_type.update({
        where: { id: data.typeId },
        data: {
          quantity: {
            increment: 1
          }
        }
      });

      // Create movement log
      await prisma.movement_log.create({
        data: {
          MovementTitle: `New Item Created`,
          movementType: 'BARANG_MASUK',
          itemTypeName: item.itemType.name,
          quantity: 1,
          toRoom: item.room.name,
          requesterName: 'SYSTEM',
          status: 'SELESAI',
          itemAvailability: item.availability,
          description: `New item created with condition: ${item.condition}`
        }
      });

      return item;
    });
  }

  async update(id: string, data: UpdateItem) {
    const existingItem = await this.prismaService.items.findUnique({
      where: { id },
      include: {
        room: true,
        itemType: true,
        movements: {
          include: {
            movement: true
          }
        }
      }
    });

    if (!existingItem) throw new NotFoundException('Item not found');

    // Check if item is part of an approved movement
    const hasApprovedMovement = existingItem.movements.some(
      im => im.movement.status === 'DISETUJUI'
    );

    if (hasApprovedMovement && data.availability) {
      throw new BadRequestException('Cannot change availability of item in approved movement');
    }

    const updatedItem = await this.prismaService.items.update({
      where: { id },
      data,
      include: {
        room: true,
        itemType: true,
        movements: {
          include: {
            movement: true
          }
        }
      }
    });

    // Log if availability or room changed
    if (data.availability !== existingItem.availability || data.roomId !== existingItem.roomId) {
      await this.prismaService.movement_log.create({
        data: {
          MovementTitle: `Item Updated`,
          movementType: 'PEMINDAHAN',
          itemTypeName: updatedItem.itemType.name,
          quantity: 1,
          fromRoom: existingItem.room?.name || 'Unknown',
          toRoom: updatedItem.room?.name || 'Unknown',
          requesterName: 'SYSTEM',
          status: 'SELESAI',
          itemAvailability: updatedItem.availability,
          description: `Item updated: ${JSON.stringify(data)}`
        }
      });
    }

    return updatedItem;
  }

  async delete(id: string) {
    return await this.prismaService.$transaction(async (prisma) => {
      const item = await prisma.items.findUnique({
        where: { id },
        include: {
          room: true,
          itemType: true,
          movements: {
            include: {
              movement: true
            }
          }
        }
      });
  
      if (!item) throw new NotFoundException('Item not found');
  
      // Check active movements
      const hasActiveMovements = item.movements.some(
        m => m.isActive && !m.endDate
      );
      
      if (hasActiveMovements) {
        throw new Error('Cannot delete item that is currently in movement');
      }
  
      // Delete item
      const deletedItem = await prisma.items.delete({
        where: { id }
      });
  
      // Decrement itemType quantity
      await prisma.items_type.update({
        where: { id: item.typeId },
        data: {
          quantity: {
            decrement: 1
          }
        }
      });
  
      // Create log
      await prisma.movement_log.create({
        data: {
          MovementTitle: `Item Deleted`,
          movementType: 'BARANG_KELUAR',
          itemTypeName: item.itemType.name,
          quantity: 1,
          fromRoom: item.room.name,
          requesterName: 'SYSTEM',
          status: 'SELESAI',
          itemAvailability: 'TIDAK_TERSEDIA',
          description: `Item deleted from system`
        }
      });
  
      return deletedItem;
    });
  }

  async upload(file: Express.Multer.File) {
    return {
      filename: file.filename,
      path: `uploads/${file.filename}`
    };
  }

  async findItemsByRoom(roomId: number) {
    const items = await this.prismaService.items.findMany({
      where: {
        roomId: roomId,
        availability: 'TERSEDIA'
      },
      include: {
        itemType: {
          select: {
            id: true,
            name: true,
            description: true,
            type: true,
            quantity: true
          }
        },
        room: {
          select: {
            id: true,
            name: true,
            building: true,
            number: true
          }
        }
      },
      orderBy: [
        {
          itemType: {
            name: 'asc'
          }
        },
        {
          created_at: 'desc'
        }
      ]
    });

    // Group items by itemType for better organization
    const groupedItems = items.reduce((acc, item) => {
      const typeId = item.itemType.id;
      if (!acc[typeId]) {
        acc[typeId] = {
          typeInfo: item.itemType,
          items: []
        };
      }
      acc[typeId].items.push(item);
      return acc;
    }, {});

    return Object.values(groupedItems);
  }
}