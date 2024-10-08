import { Module } from '@nestjs/common';
import { MovementRequestController } from './movement_request.controller';
import { MovementRequestService } from './movement_request.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [],
  controllers: [MovementRequestController],
  providers: [MovementRequestService, PrismaService],
})
export class MovementRequestModule {}
