import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from 'src/prisma.service';

@Injectable()
export class MovementRequestService {
  constructor(private prismaService: PrismaService) {}

  async findOne(id: number) {
    const movement = await this.prismaService.movement_Request.findUnique({
      where: {
        id: id,
      },
    });
    if (!movement) throw new NotFoundException('movement not found');
    return movement;
  }
  async findAll() {
    return this.prismaService.movement_Request.findMany();
  }
  async createMovement() {}
  async updateMovement() {}
  async deleteMovement(id: number) {
    const movement = await this.prismaService.movement_Request.delete({
      where: {
        id: id,
      },
    });
    if (!movement) throw new NotFoundException('movement request not found');
    return movement;
  }
}
