/* eslint-disable prettier/prettier */
import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RoomsService } from './rooms.service';
import { CreateRoom, RoomIdDto } from './dto/rooms';

@ApiTags('rooms')
@Controller('rooms')
export class RoomsController {
  constructor(private roomService: RoomsService) {}
  @Get()
  async findAll() {
    return this.roomService.findAll();
  }

  @Get(':id')
  async findOne(data: RoomIdDto) {
    return this.roomService.findOne(data);
  }

  @Post()
  async create(@Body() data: CreateRoom) {
    return this.roomService.create(data);
  }

  @Patch()
  async update(@Param() id: number, @Body() data: any) {
    return this.roomService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param() id: number) {
    return this.roomService.delete(id);
  }
}
