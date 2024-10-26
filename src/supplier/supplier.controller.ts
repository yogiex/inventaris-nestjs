import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Req,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { SupplierService } from './supplier.service';
import { CreateSupplierDTO, UpdateSupplierDTO } from './dto/supplier';
import { JwtGuard } from 'src/auth/jwt.guard';
import logger from 'src/logger';

@ApiTags('Supplier')
@ApiBearerAuth()              // Untuk dokumentasi Swagger
@UseGuards(JwtGuard)          // Menerapkan JWT Guard untuk semua endpoints
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
  @ApiParam({ name: 'id', required: true })
  async findOneSupplier(@Param('id') id: number, @Req() request: Request) {
    logger.info({
      'request method': request.method,
      'request header': request.headers,
    });
    return this.supplierService.findOneSupplier(id);
  }

  @Post()
  async createSupplier(@Body() data: CreateSupplierDTO, @Req() request: Request) {
    logger.info({
      'request method': request.method,
      'request header': request.headers,
    });
    return this.supplierService.addSupplier(data);
  }

  @Patch(':id')
  @ApiParam({ name: 'id', required: true })
  async updateSupplier(
    @Param('id') id: number,
    @Body() data: UpdateSupplierDTO,
    @Req() request: Request,
  ) {
    logger.info({
      'request method': request.method,
      'request header': request.headers,
    });
    return this.supplierService.updateSupplier(id, data);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', required: true })
  async deleteSupplier(@Param('id') id: number, @Req() request: Request) {
    logger.info({
      'request method': request.method,
      'request header': request.headers,
    });
    return this.supplierService.deleteSupplier(id);
  }

  // Endpoint tambahan untuk mendapatkan inventory supplier
  @Get(':id/inventory')
  @ApiParam({ name: 'id', required: true })
  async getSupplierInventory(@Param('id') id: number, @Req() request: Request) {
    logger.info({
      'request method': request.method,
      'request header': request.headers,
    });
    return this.supplierService.getSupplierInventory(id);
  }
}