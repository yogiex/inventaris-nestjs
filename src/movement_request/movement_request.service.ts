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
    // const items = await this.prismaService.items.findMany({
    //   where: {
    //     availability: true,
    //   },
    // });
    const items = await this.prismaService.items_type.findMany({
      where: {
        availability: true,
      },
    });

    return { items };
  }
  async createMovement() {
    // const items = await this.prismaService.items.create();
    // console.log(items);
    // return items;
  }
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

// 1.list all data di table where availbility true
// 2.if make movement request then update item ->
// status -> pending
// availbility -> false
// requesterName -> diisi nama requesterName
// approvedBy -> bisa diisi null
