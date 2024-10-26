import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateItemType, UpdateItemType } from './dto/item-type';
import { TypeBarang } from '@prisma/client';

@Injectable()
export class ItemTypeService {
  constructor(private prismaService: PrismaService) {}

  async findOne(id: number) {
    const itemType = await this.prismaService.items_type.findUnique({
      where: { id },
      include: {
        supplier: true,
        users: {
          select: {
            username: true,
            id: true,
            role: true,
          },
        },
        Items: {
          include: {
            room: true,
          }
        },
      },
    });

    if (!itemType) throw new NotFoundException('Item type not found');
    return itemType;
  }

  async findAll(params: {
    page: number;
    limit: number;
    search?: string;
    type?: TypeBarang;
  }) {
    const { page, limit, search, type } = params;
    const skip = (page - 1) * limit;

    const where: any = {};
    if (type) where.type = type;
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } }
      ];
    }

    const [items, total] = await Promise.all([
      this.prismaService.items_type.findMany({
        where,
        skip,
        take: limit,
        include: {
          supplier: true,
          users: {
            select: {
              username: true
            }
          },
          _count: {
            select: { Items: true }
          }
        },
        orderBy: {
          created_at: 'desc'
        }
      }),
      this.prismaService.items_type.count({ where })
    ]);

    return {
      items,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      totalItems: total
    };
  }

  async create(data: CreateItemType) {
    const user = await this.prismaService.users.findUnique({
      where: { id: +data.inputBy }
    });

    if (!user) throw new NotFoundException('User not found');

    const itemType = await this.prismaService.items_type.create({
      data: {
        name: data.name,
        description: data.description,
        quantity: 0,
        type: data.type,
        supplier: {
          connect: {
            id: +data.supplierId
          }
        },
        users: {
          connect: {
            id: +data.inputBy
          }
        }
      },
      include: {
        supplier: true,
        users: {
          select: {
            username: true,
            id: true,
            role: true,
          },
        },
      },
    });

    await this.prismaService.movement_log.create({
      data: {
        MovementTitle: `New Item Type: ${itemType.name}`,
        movementType: 'BARANG_MASUK',
        itemTypeName: itemType.name,
        quantity: itemType.quantity,
        inputBy: user.username,
        status: 'SELESAI',
        itemAvailability: 'TERSEDIA',
        description: `Initial creation of item type: ${itemType.name}`,
      },
    });

    return itemType;
  }

  async update(id: number, data: UpdateItemType) {
    const existingItemType = await this.prismaService.items_type.findUnique({
      where: { id },
      include: {
        users: true,
      },
    });

    if (!existingItemType) throw new NotFoundException('Item type not found');

    const updatedItemType = await this.prismaService.items_type.update({
      where: { id },
      data: {
        name: data.name,
        description: data.description,
        quantity: data.quantity ? +data.quantity : undefined,
        type: data.type,
        supplierId: data.supplierId ? +data.supplierId : undefined,
        inputBy: data.inputBy ? +data.inputBy : undefined
      },
      include: {
        supplier: true,
        users: {
          select: {
            username: true,
            id: true,
            role: true,
          },
        },
      },
    });

    if (data.quantity && data.quantity !== existingItemType.quantity) {
      await this.prismaService.movement_log.create({
        data: {
          MovementTitle: `Update Item Type: ${updatedItemType.name}`,
          movementType: +data.quantity > existingItemType.quantity ? 'BARANG_MASUK' : 'BARANG_KELUAR',
          itemTypeName: updatedItemType.name,
          quantity: Math.abs(+data.quantity - existingItemType.quantity),
          requesterName: existingItemType.users.username,
          status: 'SELESAI',
          itemAvailability: 'TERSEDIA',
          description: `Updated quantity from ${existingItemType.quantity} to ${data.quantity}`,
        },
      });
    }

    return updatedItemType;
  }

  async delete(id: number) {
    const itemType = await this.prismaService.items_type.findUnique({
      where: { id },
      include: {
        Items: true,
        users: true,
      },
    });

    if (!itemType) throw new NotFoundException('Item type not found');

    if (itemType.Items.length > 0) {
      throw new Error('Cannot delete item type with existing items');
    }

    return this.prismaService.items_type.delete({
      where: { id },
    });
  }

  async getStats() {
    const [inventory, consumable] = await Promise.all([
      this.prismaService.items_type.count({
        where: { type: 'INVENTORY' }
      }),
      this.prismaService.items_type.count({
        where: { type: 'CONSUMABLE' }
      })
    ]);

    return {
      inventoryCount: inventory,
      consumableCount: consumable
    };
  }

  async updateQuantityBasedOnItems(id: number) {
    const itemCount = await this.prismaService.items.count({
      where: { typeId: id }
    });

    await this.prismaService.items_type.update({
      where: { id },
      data: { quantity: itemCount }
    });

    return itemCount;
  }
}