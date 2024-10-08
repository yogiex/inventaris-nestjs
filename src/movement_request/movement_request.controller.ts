import { Controller, Get, Delete, Param } from '@nestjs/common';
import { MovementRequestService } from './movement_request.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('MovementRequest')
@Controller('movement-request')
export class MovementRequestController {
  constructor(private movementService: MovementRequestService) {}

  @Get()
  async getOne(@Param() id: number) {
    return this.movementService.findOne(id);
  }

  @Get()
  async getAll() {
    return this.movementService.findAll();
  }
  async create() {}

  @Delete()
  async delete(@Param() id: number) {
    return this.movementService.deleteMovement(id);
  }
}
