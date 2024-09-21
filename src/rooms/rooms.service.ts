import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateRoom, RoomIdDto } from './dto/rooms';

@Injectable()
export class RoomsService {
  constructor(private prismaService: PrismaService) {}
  async findOne(data: RoomIdDto) {
    return this.prismaService.room.findUnique({
      where: {
        id: data.id,
      },
    });
  }
  async findAll() {
    return this.prismaService.room.findMany();
  }
  async create(data: CreateRoom) {
    return this.prismaService.room.create({ data });
  }
  async update() {}
  async delete() {}
}
