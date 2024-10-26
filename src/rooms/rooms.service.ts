import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateRoom, UpdateRoom, RoomIdDto } from './dto/rooms';

@Injectable()
export class RoomsService {
  constructor(private prismaService: PrismaService) {}

  async findOne(data: RoomIdDto, isPublic: boolean = false) {
    const room = await this.prismaService.room.findUnique({
      where: { id: +data.id },
      include: {
        items: {
          where: isPublic ? { availability: 'TERSEDIA' } : {},
          include: {
            itemType: {
              include: {
                supplier: !isPublic
              }
            }
          }
        },
        ...(!isPublic && {
          movementsFrom: true,
          movementsTo: true,
        })
      },
    });

    if (!room) throw new NotFoundException('Room not found');
    return room;
  }

  async findAll(isPublic: boolean = false) {
    return this.prismaService.room.findMany({
      include: {
        items: {
          where: isPublic ? { availability: 'TERSEDIA' } : {},
          include: {
            itemType: {
              include: {
                supplier: !isPublic
              }
            }
          }
        },
        ...(!isPublic && {
          movementsFrom: true,
          movementsTo: true,
        })
      },
    });
  }

  async create(data: CreateRoom) {
    return this.prismaService.room.create({
      data,
      include: {
        items: {
          include: {
            itemType: true,
          }
        },
      },
    });
  }

  async update(id: number, data: UpdateRoom) {
    const room = await this.prismaService.room.update({
      where: { id },
      data,
      include: {
        items: {
          include: {
            itemType: true,
          }
        },
      },
    });

    if (!room) throw new NotFoundException('Room not found');
    return room;
  }

  async delete(id: number) {
    // Check if room has any items or movements
    const room = await this.prismaService.room.findUnique({
      where: { id },
      include: {
        items: true,
        movementsFrom: true,
        movementsTo: true,
      },
    });

    if (!room) throw new NotFoundException('Room not found');

    if (room.items.length > 0) {
      throw new Error('Cannot delete room with existing items');
    }

    if (room.movementsFrom.length > 0 || room.movementsTo.length > 0) {
      throw new Error('Cannot delete room with existing movements');
    }

    return this.prismaService.room.delete({
      where: { id },
    });
  }

  async getRoomInventory(id: number, isPublic: boolean = false) {
    const room = await this.prismaService.room.findUnique({
      where: { id },
      include: {
        items: {
          where: isPublic ? { availability: 'TERSEDIA' } : {},
          include: {
            itemType: {
              include: {
                supplier: !isPublic
              }
            }
          }
        },
      },
    });

    if (!room) throw new NotFoundException('Room not found');

    // Group items by item type
    const itemsByType = room.items.reduce((acc, item) => {
      const typeId = item.itemType.id;
      if (!acc[typeId]) {
        acc[typeId] = {
          typeInfo: isPublic ? {
            id: item.itemType.id,
            name: item.itemType.name,
            description: item.itemType.description,
            type: item.itemType.type,
          } : item.itemType,
          items: [],
          count: 0,
        };
      }
      acc[typeId].items.push(item);
      acc[typeId].count++;
      return acc;
    }, {});

    return {
      room: {
        id: room.id,
        name: room.name,
        building: room.building,
        number: room.number,
      },
      inventory: Object.values(itemsByType),
    };
  }
}