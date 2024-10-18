/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
// import { CreateItem, ItemIdDTO, UpdateItem } from './dto/items';

@Injectable()
export class ItemsService {
  constructor(private prismaService: PrismaService) {}
  async findOne(id: number) {
    const data = await this.prismaService.items.findUnique({
      where: {
        id: +id,
      },
    });
    if (!data) throw new NotFoundException('data not found');
  }
  async findAll() {
    return this.prismaService.items.findMany();
  }
  async create(data: any) {
    return this.prismaService.items.create({
      data: data,
    });
  }
  async update(id: number, data: any) {
    const datas = await this.prismaService.items.update({
      where: {
        id: +id,
      },
      data: data,
    });
    if (!data) throw new NotFoundException('data not found');
    return datas;
  }
  async delete(id: number) {
    const datas = await this.prismaService.items.delete({
      where: {
        id: +id,
      },
    });
    if (!datas) throw new NotFoundException('data not found');
    return datas;
  }

  async upload(data: any) {
    return data;
  }
}
