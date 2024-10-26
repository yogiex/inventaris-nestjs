import { Controller, Get, Query, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { MovementLogService } from './movement_log.service';
import { JwtGuard } from 'src/auth/jwt.guard';
import logger from 'src/logger';

@ApiTags('Movement-Log')
@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller('movement-log')
export class MovementLogController {
  constructor(private movementLogService: MovementLogService) {}

  @Get()
  @ApiQuery({ name: 'startDate', required: false })
  @ApiQuery({ name: 'endDate', required: false })
  @ApiQuery({ name: 'movementType', required: false })
  @ApiQuery({ name: 'status', required: false })
  @ApiQuery({ name: 'itemTypeName', required: false })
  @ApiQuery({ name: 'requesterName', required: false })
  async findAll(
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
    @Query('movementType') movementType?: string,
    @Query('status') status?: string,
    @Query('itemTypeName') itemTypeName?: string,
    @Query('requesterName') requesterName?: string,
  ) {
    logger.info('Fetching movement logs with filters', {
      startDate,
      endDate,
      movementType,
      status,
      itemTypeName,
      requesterName,
    });

    return this.movementLogService.findAll({
      startDate: startDate ? new Date(startDate) : undefined,
      endDate: endDate ? new Date(endDate) : undefined,
      movementType,
      status,
      itemTypeName,
      requesterName,
    });
  }

  @Get('statistics')
  @ApiQuery({ name: 'startDate', required: false })
  @ApiQuery({ name: 'endDate', required: false })
  async getStatistics(
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    logger.info('Fetching movement statistics', { startDate, endDate });
    return this.movementLogService.getStatistics(
      startDate ? new Date(startDate) : undefined,
      endDate ? new Date(endDate) : undefined,
    );
  }

  @Get('item/:itemTypeName')
  async getItemHistory(@Param('itemTypeName') itemTypeName: string) {
    logger.info('Fetching item history', { itemTypeName });
    return this.movementLogService.getItemHistory(itemTypeName);
  }

  @Get('user/:userName')
  async getUserActivity(@Param('userName') userName: string) {
    logger.info('Fetching user activity', { userName });
    return this.movementLogService.getUserActivity(userName);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    logger.info('Fetching specific movement log', { id });
    return this.movementLogService.findOne(+id);
  }
}