import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ItemTypeService } from './item_type.service';

@ApiTags('Item-Type')
@Controller('item-type')
export class ItemTypeController {
  constructor(private itemTypeService: ItemTypeService) {}
  @Get()
  async findAll() {
    return this.itemTypeService.findAll();
  }

  @Get(':id')
  async findOne(@Param() id: any) {
    return this.itemTypeService.findOne(id);
  }

  @Post()
  async create(@Body() data: any) {
    return this.itemTypeService.create(data);
  }

  @Patch(':id')
  async update(@Param() id: any, @Body() data: any) {
    return this.itemTypeService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param() id: any) {
    return this.itemTypeService.delete(id);
  }
}
