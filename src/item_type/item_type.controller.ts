import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { TypeBarang } from '@prisma/client';
import { ItemTypeService } from './item_type.service';
import { 
  CreateItemType, 
  UpdateItemType, 
  ItemTypeIdDTO,
} from './dto/item-type';

@ApiTags('Item-Type')
@Controller('item-type')
export class ItemTypeController {
  constructor(private itemTypeService: ItemTypeService) {}

  @Get()
  @ApiOperation({ summary: 'Get all item types' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'search', required: false, type: String })
  @ApiQuery({ name: 'type', required: false, enum: TypeBarang })
  async findAll(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
    @Query('search') search?: string,
    @Query('type') type?: TypeBarang
  ) {
    return this.itemTypeService.findAll({
      page: +page,
      limit: +limit,
      search,
      type
    });
  }

  @Get('stats')
  @ApiOperation({ summary: 'Get item type statistics' })
  async getStats() {
    return this.itemTypeService.getStats();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get item type by id' })
  async findOne(@Param('id') id: string) {
    return this.itemTypeService.findOne(parseInt(id));
  }

  @Post()
  @ApiOperation({ summary: 'Create new item type' })
  async create(@Body() data: CreateItemType) {
    return this.itemTypeService.create(data);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update item type' })
  async update(@Param('id') id: string, @Body() data: UpdateItemType) {
    return this.itemTypeService.update(parseInt(id), data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete item type' })
  async delete(@Param('id') id: string) {
    return this.itemTypeService.delete(parseInt(id));
  }
}