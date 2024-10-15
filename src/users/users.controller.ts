import { Controller, Get, Post, Patch, Delete, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiTags } from '@nestjs/swagger';
import logger from 'src/logger';

@ApiTags('Users And Supplier')
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get('supplier')
  async findAllSupplier(@Req() request: Request) {
    logger.info({
      'request method': request.method,
      'request header': request.headers,
    });
    return this.userService.findAllSupplier();
  }

  @Get('supplier/:id')
  async findOneSupplier(id: number, @Req() request: Request) {
    logger.info({
      'request method': request.method,
      'request header': request.headers,
    });
    return this.userService.findOneSupplier(id);
  }

  @Post('supplier')
  async createSupplier(data: any, @Req() request: Request) {
    logger.info({
      'request method': request.method,
      'request header': request.headers,
    });
    return this.userService.addSupplier(data);
  }

  @Patch('supplier')
  async editSupplier(id: number, data: any, @Req() request: Request) {
    logger.info({
      'request method': request.method,
      'request header': request.headers,
    });
    return this.userService.updateSupplier(id, data);
  }

  @Delete('supplier')
  async deleteSupplier(id: number, @Req() request: Request) {
    logger.info({
      'request method': request.method,
      'request header': request.headers,
    });
    return this.userService.deleteSupplier(id);
  }
}
