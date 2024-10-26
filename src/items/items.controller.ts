import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  Req,
  UseInterceptors,
  UploadedFile,
  Res,
  NotFoundException,
} from '@nestjs/common';
import { 
  ApiBearerAuth, 
  ApiParam, 
  ApiQuery, 
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response, Request } from 'express';
import { createReadStream, existsSync } from 'fs';
import { join } from 'path';
import { TypeBarang } from '@prisma/client';

import { ItemsService } from './items.service';
import { CreateItem, ItemIdDTO, UpdateItem } from './dto/items';
import { JwtGuard } from 'src/auth/jwt.guard';
import { Public } from '../auth/decorators/public.decorator';
import logger from 'src/logger';

@ApiTags('Items')
@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller('items')
export class ItemsController {
  constructor(private itemService: ItemsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all items (Public Access)' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'search', required: false, type: String })
  @ApiQuery({ name: 'typeId', required: false, type: Number })
  @ApiQuery({ name: 'itemType', required: false, enum: TypeBarang })
  @ApiResponse({ status: 200, description: 'List of available items' })
  async findAll(
    @Req() request: Request,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('search') search?: string,
    @Query('typeId') typeId?: number,
    @Query('itemType') itemType?: TypeBarang,
  ) {
    logger.info({
      'request method': request.method,
      'request header': request.headers,
      'access type': 'public'
    });
    return this.itemService.findAll({
      page,
      limit,
      search,
      typeId,
      itemType,
      isPublic: true
    });
  }

  @Public()
  @Get('room/:roomId')
  @ApiOperation({ summary: 'Get available items by room (Public Access)' })
  @ApiParam({ name: 'roomId', required: true, type: Number })
  @ApiResponse({ 
    status: 200, 
    description: 'List of available items in the specified room, grouped by item type' 
  })
  async findItemsByRoom(
    @Param('roomId') roomId: string,
    @Req() request: Request
  ) {
    logger.info({
      'request method': request.method,
      'request header': request.headers,
      'access type': 'public',
      'roomId': roomId
    });
    
    try {
      const items = await this.itemService.findItemsByRoom(parseInt(roomId));
      return items;
    } catch (error) {
      logger.error({
        'method': 'findItemsByRoom',
        'roomId': roomId,
        'error': error.message
      });
      throw error;
    }
  }

  @Get('by-type/:typeId')
  @ApiOperation({ summary: 'Get items by type (Protected)' })
  @ApiParam({ name: 'typeId', required: true })
  async findByType(
    @Param('typeId') typeId: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10
  ) {
    return this.itemService.findByType(parseInt(typeId), { page, limit });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get item details (Protected)' })
  @ApiParam({ name: 'id', required: true })
  async findOne(@Param('id') id: string, @Req() request: Request) {
    logger.info({
      'request method': request.method,
      'request header': request.headers,
      'access type': 'protected'
    });
    return this.itemService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create new item (Protected)' })
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Body() data: CreateItem,
    @UploadedFile() file: Express.Multer.File,
    @Req() request: Request
  ) {
    logger.info({
      'request method': request.method,
      'request header': request.headers,
      'access type': 'protected'
    });
    
    if (file) {
      data.image = file.filename;
    }
    
    return this.itemService.create(data);
  }
  
  @Patch(':id')
  @ApiOperation({ summary: 'Update item (Protected)' })
  @ApiParam({ name: 'id', required: true })
  async update(
    @Param() id: ItemIdDTO,
    @Body() datas: UpdateItem,
    @Req() request: Request,
  ) {
    logger.info({
      'request method': request.method,
      'request header': request.headers,
      'access type': 'protected'
    });
    return this.itemService.update(id.id, datas);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete item (Protected)' })
  @ApiParam({ name: 'id', required: true })
  async delete(@Param() id: ItemIdDTO, @Req() request: Request) {
    logger.info({
      'request method': request.method,
      'request header': request.headers,
      'access type': 'protected'
    });
    return this.itemService.delete(id.id);
  }

  @Get('file/uploads/:filename')
  @ApiOperation({ summary: 'Get item image' })
  @ApiParam({ name: 'filename', required: true })
  async showFile(@Param('filename') filename: string, @Res() res: Response) {
    const filePath = join(process.cwd(), 'uploads', filename);
    if (!existsSync(filePath)) throw new NotFoundException('File Not Found');
    res.setHeader('Content-Disposition', `inline; filename="${filename}"`);
    const fileStream = createReadStream(filePath);
    return fileStream.pipe(res);
  }
}