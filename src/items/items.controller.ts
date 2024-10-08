/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItem, ItemIdDTO, UpdateItem } from './dto/items';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/jwt.guard';
import logger from 'src/logger';

@ApiTags('Items')
@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller('items')
export class ItemsController {
  constructor(private itemService: ItemsService) {}

  @Get(':id')
  async findOne(@Req() request: Request) {
    logger.info({
      'request method': request.method,
      'request header': request.headers,
    });
  }

  @Get('/')
  async findAll(@Req() request: Request) {
    logger.info({
      'request method': request.method,
      'request header': request.headers,
    });
    return this.itemService.findAll();
  }

  @Post()
  async create(@Body() data: CreateItem, @Req() request: Request) {
    logger.info({
      'request method': request.method,
      'request header': request.headers,
    });
    return this.itemService.create(data);
  }

  @Patch(':id')
  async update(
    @Param() id: ItemIdDTO,
    @Body() datas: UpdateItem,
    @Req() request: Request,
  ) {
    logger.info({
      'request method': request.method,
      'request header': request.headers,
    });
    return this.itemService.update(id, datas);
  }

  @Delete(':id')
  async delete(@Param() id: ItemIdDTO, @Req() request: Request) {
    logger.info({
      'request method': request.method,
      'request header': request.headers,
    });
    return this.itemService.delete(id);
  }
}
