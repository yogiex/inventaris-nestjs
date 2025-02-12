/* eslint-disable prettier/prettier */
import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Body,
  Param,
  Req,
} from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { RoomsService } from './rooms.service';
import { CreateRoom, RoomIdDto } from './dto/rooms';
import logger from 'src/logger';

@ApiTags('rooms')
@Controller('rooms')
export class RoomsController {
  constructor(private roomService: RoomsService) {}
  @Get()
  async findAll(@Req() request: Request) {
    logger.info({
      'request method': request.method,
      'request header': request.headers,
    });
    return this.roomService.findAll();
  }

  @Get(':id')
  @ApiParam({ name: 'id', required: true })
  async findOne(@Param() data: RoomIdDto, @Req() request: Request) {
    logger.info({
      'request method': request.method,
      'request header': request.headers,
    });
    return this.roomService.findOne(data);
  }

  @Post()
  async create(@Body() data: CreateRoom, @Req() request: Request) {
    logger.info({
      'request method': request.method,
      'request header': request.headers,
    });
    return this.roomService.create(data);
  }

  @Patch(':id')
  @ApiParam({ name: 'id', required: true })
  async update(
    @Param() id: number,
    @Body() data: any,
    @Req() request: Request,
  ) {
    logger.info({
      'request method': request.method,
      'request header': request.headers,
    });
    return this.roomService.update(id, data);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', required: true })
  async delete(@Param() id: number, @Req() request: Request) {
    logger.info({
      'request method': request.method,
      'request header': request.headers,
    });
    return this.roomService.delete(id);
  }
}
