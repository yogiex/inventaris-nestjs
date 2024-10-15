import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Req,
  Body,
  Param,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import logger from 'src/logger';
import { SupplierService } from './supplier.service';
import { SupplierDTO } from './dto/supplier';

@ApiTags('Supplier')
@Controller('supplier')
export class SupplierController {
  constructor(private supplierService: SupplierService) {}
  @Get()
  async findAllSupplier(@Req() request: Request) {
    logger.info({
      'request method': request.method,
      'request header': request.headers,
    });
    return this.supplierService.findAllSupplier();
  }

  @Get(':id')
  async findOneSupplier(@Param() id: number, @Req() request: Request) {
    logger.info({
      'request method': request.method,
      'request header': request.headers,
    });
    return this.supplierService.findOneSupplier(id);
  }

  @Post()
  async createSupplier(@Body() data: SupplierDTO, @Req() request: Request) {
    logger.info({
      'request method': request.method,
      'request header': request.headers,
    });
    return this.supplierService.addSupplier(data);
  }

  @Patch()
  async editSupplier(id: number, @Body() data: any, @Req() request: Request) {
    logger.info({
      'request method': request.method,
      'request header': request.headers,
    });
    return this.supplierService.updateSupplier(id, data);
  }

  @Delete(':id')
  async deleteSupplier(@Param() id: number, @Req() request: Request) {
    logger.info({
      'request method': request.method,
      'request header': request.headers,
    });
    return this.supplierService.deleteSupplier(id);
  }
}
