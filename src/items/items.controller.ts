/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItem, ItemIdDTO, UpdateItem } from './dto/items';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('items')
@Controller('items')
export class ItemsController {
  constructor(private itemService: ItemsService) {}

  @Get(':id')
  async findOne() {}

  @Get('/')
  async findAll() {
    return this.itemService.findAll();
  }

  @Post()
  async create(@Body() data: CreateItem) {
    return this.itemService.create(data);
  }

  @Patch(':id')
  async update(@Param() id: ItemIdDTO, @Body() datas: UpdateItem) {
    return this.itemService.update(id, datas);
  }

  @Delete(':id')
  async delete(@Param() id: ItemIdDTO) {
    return this.itemService.delete(id);
  }
}
