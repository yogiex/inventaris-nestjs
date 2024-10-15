import { Controller, Get, Post, Patch, Delete, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import logger from 'src/logger';
import { SupplierService } from './supplier.service';

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
  async findOneSupplier(id: number, @Req() request: Request) {
    logger.info({
      'request method': request.method,
      'request header': request.headers,
    });
    return this.supplierService.findOneSupplier(id);
  }

  @Post()
  async createSupplier(data: any, @Req() request: Request) {
    logger.info({
      'request method': request.method,
      'request header': request.headers,
    });
    return this.supplierService.addSupplier(data);
  }

  @Patch()
  async editSupplier(id: number, data: any, @Req() request: Request) {
    logger.info({
      'request method': request.method,
      'request header': request.headers,
    });
    return this.supplierService.updateSupplier(id, data);
  }

  @Delete()
  async deleteSupplier(id: number, @Req() request: Request) {
    logger.info({
      'request method': request.method,
      'request header': request.headers,
    });
    return this.supplierService.deleteSupplier(id);
  }
}
