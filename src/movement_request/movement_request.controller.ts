import { Controller, Get, Delete, Param, Req } from '@nestjs/common';
import { MovementRequestService } from './movement_request.service';
import { ApiTags } from '@nestjs/swagger';
import logger from 'src/logger';

@ApiTags('MovementRequest')
@Controller('movement-request')
export class MovementRequestController {
  constructor(private movementService: MovementRequestService) {}

  @Get()
  async getAll(@Req() request: Request) {
    logger.info({
      'request method': request.method,
      'request header': request.headers,
    });
    return this.movementService.findAll();
  }

  @Get(':id')
  async getOne(@Param() id: number, @Req() request: Request) {
    logger.info({
      'request method': request.method,
      'request header': request.headers,
    });
    return this.movementService.findOne(id);
  }

  async create(@Req() request: Request) {
    logger.info({
      'request method': request.method,
      'request header': request.headers,
    });
    // const items = await this;
  }

  @Delete(':id')
  async delete(@Param() id: number, @Req() request: Request) {
    logger.info({
      'request method': request.method,
      'request header': request.headers,
    });
    return this.movementService.deleteMovement(id);
  }
}
