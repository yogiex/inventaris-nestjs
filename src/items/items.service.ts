/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateItem, ItemIdDTO, UpdateItem } from './dto/items';
@Injectable()
export class ItemsService {
  constructor(private prismaService: PrismaService) {}

  async findOne(data: ItemIdDTO) {
    return this.prismaService.items.findUnique({
      where: {
        id: data.id,
      },
    });
  }

  async findAll() {
    return this.prismaService.items.findMany({
      include: {
        supplier: {
          select: {
            name: true,
          },
        },
        room: {
          select: {
            name: true,
            building: true,
            address: true,
          },
        },
      },
    });
  }
  async create(data: any) {
    const datas = await this.prismaService.items.create({
      data: data,
      include: {
        supplier: true,
        room: true,
        users: {
          select: {
            username: true,
            id: true,
            role: true,
          },
        },
      },
    });

    const log = await this.prismaService.movement_Request_History_Log.create({
      data: {
        inputName: datas.name,
        inputBy: datas.users.username,
        roomName: datas.room.name,
        quantity: datas.quantity,
        status: datas.status,
      },
    });
    return { datas, log };
  }
  async update(id: ItemIdDTO, datas: any) {
    const item = await this.prismaService.items.update({
      where: {
        id: id.id,
      },
      data: datas,
    });
    if (!item) throw new NotFoundException('item not found');

    return item;
  }
  async delete(id: ItemIdDTO) {
    const user = await this.prismaService.users.delete({
      where: {
        id: id.id,
      },
    });
    if (!user) throw new NotFoundException('user not found');
    return user;
  }
}
