import { Injectable, NotFoundException } from '@nestjs/common';
import { ItemIdDTO } from 'src/items/dto/items';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ItemTypeService {
  //   constructor(private prismaService: PrismaService) {}

  //   async findAll() {
  //     return this.prismaService.ite
  //   }
  //   async findOne() {}
  //   async create() {}
  //   async updateItem() {}
  //   async deleteItem() {}
  constructor(private prismaService: PrismaService) {}

  async findOne(data: ItemIdDTO) {
    return this.prismaService.items_type.findUnique({
      where: {
        id: +data.id,
      },
    });
  }

  async findAll() {
    return this.prismaService.items_type.findMany({
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
    const datas = await this.prismaService.items_type.create({
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
        id: +id.id,
      },
      data: datas,
    });
    if (!item) throw new NotFoundException('item not found');

    return item;
  }
  async delete(data: ItemIdDTO) {
    const user = await this.prismaService.users.delete({
      where: {
        id: +data.id,
      },
    });
    if (!user) throw new NotFoundException('user not found');
    return user;
  }
}
