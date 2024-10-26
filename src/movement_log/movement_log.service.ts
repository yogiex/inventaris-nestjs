import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateMovementLog } from './dto/movement-log.dto';

@Injectable()
export class MovementLogService {
  constructor(private prismaService: PrismaService) {}

  async findAll(query?: {
    startDate?: Date;
    endDate?: Date;
    movementType?: string;
    status?: string;
    itemTypeName?: string;
    requesterName?: string;
  }) {
    const where: any = {};

    if (query?.startDate && query?.endDate) {
      where.created_at = {
        gte: new Date(query.startDate),
        lte: new Date(query.endDate),
      };
    }

    if (query?.movementType) {
      where.movementType = query.movementType;
    }

    if (query?.status) {
      where.status = query.status;
    }

    if (query?.itemTypeName) {
      where.itemTypeName = {
        contains: query.itemTypeName,
        mode: 'insensitive',
      };
    }

    if (query?.requesterName) {
      where.requesterName = {
        contains: query.requesterName,
        mode: 'insensitive',
      };
    }

    return this.prismaService.movement_log.findMany({
      where,
      orderBy: {
        created_at: 'desc',
      },
    });
  }

  async findOne(id: number) {
    return this.prismaService.movement_log.findUnique({
      where: { id },
    });
  }

  async create(data: CreateMovementLog) {
    return this.prismaService.movement_log.create({
      data,
    });
  }

  async getStatistics(startDate?: Date, endDate?: Date) {
    const where: any = {};

    if (startDate && endDate) {
      where.created_at = {
        gte: new Date(startDate),
        lte: new Date(endDate),
      };
    }

    const [
      totalMovements,
      movementsByType,
      movementsByStatus,
      itemsInvolved,
    ] = await Promise.all([
      // Total movements
      this.prismaService.movement_log.count({ where }),

      // Movements by type
      this.prismaService.movement_log.groupBy({
        by: ['movementType'],
        _count: true,
        where,
      }),

      // Movements by status
      this.prismaService.movement_log.groupBy({
        by: ['status'],
        _count: true,
        where,
      }),

      // Total items involved
      this.prismaService.movement_log.aggregate({
        _sum: {
          quantity: true,
        },
        where,
      }),
    ]);

    return {
      totalMovements,
      movementsByType,
      movementsByStatus,
      totalItemsInvolved: itemsInvolved._sum.quantity,
    };
  }

  async getItemHistory(itemTypeName: string) {
    return this.prismaService.movement_log.findMany({
      where: {
        itemTypeName,
      },
      orderBy: {
        created_at: 'desc',
      },
    });
  }

  async getUserActivity(userName: string) {
    return this.prismaService.movement_log.findMany({
      where: {
        OR: [
          { requesterName: userName },
          { approvedBy: userName },
          { assignedTo: userName },
          { inputBy: userName },
        ],
      },
      orderBy: {
        created_at: 'desc',
      },
    });
  }
}