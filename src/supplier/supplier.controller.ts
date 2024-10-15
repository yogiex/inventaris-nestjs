import { Controller, Get, Post, Patch, Delete, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import logger from 'src/logger';
import { SupplierService } from './supplier.service';

@ApiTags('Supplier')
@Controller('supplier')
export class SupplierController {
  constructor(private supplierService: SupplierService) {}
  @Get('supplier')
  async findAllSupplier(@Req() request: Request) {
    logger.info({
      'request method': request.method,
      'request header': request.headers,
    });
    return this.supplierService.findAllSupplier();
  }

  @Get('supplier/:id')
  async findOneSupplier(id: number, @Req() request: Request) {
    logger.info({
      'request method': request.method,
      'request header': request.headers,
    });
    return this.supplierService.findOneSupplier(id);
  }

  @Post('supplier')
  async createSupplier(data: any, @Req() request: Request) {
    logger.info({
      'request method': request.method,
      'request header': request.headers,
    });
    return this.supplierService.addSupplier(data);
  }

  @Patch('supplier')
  async editSupplier(id: number, data: any, @Req() request: Request) {
    logger.info({
      'request method': request.method,
      'request header': request.headers,
    });
    return this.supplierService.updateSupplier(id, data);
  }

  @Delete('supplier')
  async deleteSupplier(id: number, @Req() request: Request) {
    logger.info({
      'request method': request.method,
      'request header': request.headers,
    });
    return this.supplierService.deleteSupplier(id);
  }
}
