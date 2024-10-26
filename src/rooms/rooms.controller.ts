import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Body,
  Param,
  Req,
  UseGuards,
} from '@nestjs/common';
import { 
  ApiParam, 
  ApiTags, 
  ApiBearerAuth, 
  ApiOperation,
  ApiResponse 
} from '@nestjs/swagger';
import { Request } from 'express';
import { RoomsService } from './rooms.service';
import { CreateRoom, UpdateRoom, RoomIdDto } from './dto/rooms';
import { JwtGuard } from 'src/auth/jwt.guard';
import { Public } from '../auth/decorators/public.decorator';
import logger from 'src/logger';

@ApiTags('Rooms')
@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller('rooms')
export class RoomsController {
  constructor(private roomService: RoomsService) {}

  @Public()
  @Get()
  @ApiOperation({ summary: 'Get all rooms (Public Access)' })
  @ApiResponse({ status: 200, description: 'List of all rooms with basic information' })
  async findAll(@Req() request: Request) {
    logger.info({
      'request method': request.method,
      'request header': request.headers,
      'access type': 'public'
    });
    return this.roomService.findAll(true);
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Get room details (Public Access)' })
  @ApiParam({ name: 'id', required: true })
  async findOne(@Param() data: RoomIdDto, @Req() request: Request) {
    logger.info({
      'request method': request.method,
      'request header': request.headers,
      'access type': 'public'
    });
    return this.roomService.findOne(data, true);
  }

  @Post()
  @ApiOperation({ summary: 'Create new room (Protected)' })
  async create(@Body() data: CreateRoom, @Req() request: Request) {
    logger.info({
      'request method': request.method,
      'request header': request.headers,
      'access type': 'protected'
    });
    return this.roomService.create(data);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update room (Protected)' })
  @ApiParam({ name: 'id', required: true })
  async update(
    @Param('id') id: number,
    @Body() data: UpdateRoom,
    @Req() request: Request,
  ) {
    logger.info({
      'request method': request.method,
      'request header': request.headers,
      'access type': 'protected'
    });
    return this.roomService.update(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete room (Protected)' })
  @ApiParam({ name: 'id', required: true })
  async delete(@Param('id') id: number, @Req() request: Request) {
    logger.info({
      'request method': request.method,
      'request header': request.headers,
      'access type': 'protected'
    });
    return this.roomService.delete(id);
  }

  @Public()
  @Get(':id/inventory')
  @ApiOperation({ summary: 'Get room inventory (Public Access)' })
  @ApiParam({ name: 'id', required: true })
  async getRoomInventory(@Param('id') id: number, @Req() request: Request) {
    logger.info({
      'request method': request.method,
      'request header': request.headers,
      'access type': 'public'
    });
    return this.roomService.getRoomInventory(id, true);
  }
}