import { Module } from '@nestjs/common';
import { MovementRequestController } from './movement_request.controller';
import { MovementRequestService } from './movement_request.service';

@Module({
  controllers: [MovementRequestController],
  providers: [MovementRequestService]
})
export class MovementRequestModule {}
