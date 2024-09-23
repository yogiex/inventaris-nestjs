/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ItemIdDTO, UpdateItem } from './dto/items';
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
    return this.prismaService.items.findMany();
  }
  async create(data: any) {
    return this.prismaService.items.create({ data });
  }
  async update(id: ItemIdDTO, datas: UpdateItem) {
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
