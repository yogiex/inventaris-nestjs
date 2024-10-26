import { Module } from '@nestjs/common';
import { MovementLogController } from './movement_log.controller';
import { MovementLogService } from './movement_log.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [MovementLogController],
  providers: [MovementLogService, PrismaService],
  exports: [MovementLogService],
})
export class MovementLogModule {}