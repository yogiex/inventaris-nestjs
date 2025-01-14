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
import logger from 'src/logger';
import { SupplierService } from './supplier.service';
import { SupplierDTO } from './dto/supplier';
import { JwtGuard } from 'src/auth/jwt.guard';

@ApiBearerAuth()
@UseGuards(JwtGuard)
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
  @ApiParam({ name: 'id', required: true })
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

  @Patch(':id')
  @ApiParam({ name: 'id', required: true })
  async editSupplier(id: number, @Body() data: any, @Req() request: Request) {
    logger.info({
      'request method': request.method,
      'request header': request.headers,
    });
    return this.supplierService.updateSupplier(id, data);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', required: true })
  async deleteSupplier(@Param() id: number, @Req() request: Request) {
    logger.info({
      'request method': request.method,
      'request header': request.headers,
    });
    return this.supplierService.deleteSupplier(id);
  }
}
