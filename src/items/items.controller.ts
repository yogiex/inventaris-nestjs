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
  UseInterceptors,
  UploadedFile,
  Res,
  NotFoundException,
} from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItem, ItemIdDTO, UpdateItem } from './dto/items';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/jwt.guard';
import logger from 'src/logger';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { createReadStream, existsSync } from 'fs';
import { join } from 'path';

@ApiTags('Items')
@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller('items')
export class ItemsController {
  constructor(private itemService: ItemsService) {}

  @Get(':id')
  @ApiParam({ name: 'id', required: true })
  async findOne(@Param() id: any, @Req() request: Request) {
    logger.info({
      'request method': request.method,
      'request header': request.headers,
    });
    return this.itemService.findOne(id);
  }

  @Get()
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
  @ApiParam({ name: 'id', required: true })
  async update(
    @Param() id: ItemIdDTO,
    @Body() datas: UpdateItem,
    @Req() request: Request,
  ) {
    logger.info({
      'request method': request.method,
      'request header': request.headers,
    });
    return this.itemService.update(id.id, datas);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', required: true })
  async delete(@Param() id: ItemIdDTO, @Req() request: Request) {
    logger.info({
      'request method': request.method,
      'request header': request.headers,
    });
    return this.itemService.delete(id.id);
  }

  @Get('file/uploads/:filename')
  @ApiParam({ name: 'filename', required: true })
  async showFile(@Param() filename: string, @Res() res: Response) {
    const filePath = join(process.cwd(), 'uploads', filename);
    if (!existsSync(filePath)) throw new NotFoundException('File Not Found');
    res.setHeader('Content-Disposition', `inline; filename="${filename}"`);
    const fileStream = createReadStream(filePath);
    return fileStream.pipe(res);
  }
}
