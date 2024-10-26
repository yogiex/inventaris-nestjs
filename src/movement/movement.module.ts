import { Module } from '@nestjs/common';
import { MovementController } from './movement.controller';
import { MovementService } from './movement.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [],
  controllers: [MovementController],
  providers: [MovementService, PrismaService],
  exports: [MovementService]
})
export class MovementRequestModule {}
