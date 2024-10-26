import { 
  Controller, Get, Post, Patch, Delete, 
  Param, Body, Req, UseGuards, ParseIntPipe,
  ForbiddenException
} from '@nestjs/common';
import { MovementService } from './movement.service';
import { PrismaService } from 'src/prisma.service';
import { ApiTags, ApiBearerAuth, ApiParam, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { CreateMovement, UpdateMovement, MovementIdDTO } from 'src/movement/dto/movement';
import { JwtGuard } from 'src/auth/jwt.guard';
import { Public } from '../auth/decorators/public.decorator';
import logger from 'src/logger';

@ApiTags('Movement')
@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller('movement')
export class MovementController {
  constructor(
    private movementService: MovementService,
    private prismaService: PrismaService
  ) {}

  @Get()
  async findAll(@Req() request: Request) {
    logger.info({
      'request method': request.method,
      'request header': request.headers,
    });
    return this.movementService.findAll();
  }

  @Get('available-officers')
  @ApiOperation({ summary: 'Get available officers' })
  @ApiResponse({ 
    status: 200, 
    description: 'Returns list of officers with role 1 (petugas)',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'number' },
          username: { type: 'string' }
        }
      }
    }
  })
  async getAvailableOfficers() {
    return this.movementService.getAvailableOfficers();
  }

  @Get('assigned/:userId')
  @ApiOperation({ summary: 'Get movements assigned to specific user' })
  @ApiParam({ name: 'userId', type: 'number' })
  async getAssignedMovements(
    @Param('userId', ParseIntPipe) userId: number,
    @Req() request: any
  ) {
    // Verify user can only see their own assignments
    if (request.user.role !== 0 && request.user.id !== userId) {
      throw new ForbiddenException('You can only view your own assignments');
    }
    return this.movementService.findAssignedMovements(userId);
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: 'number', description: 'Movement ID' })
  @ApiOperation({ summary: 'Get movement by ID' })
  async findOne(@Param('id', ParseIntPipe) id: number, @Req() request: Request) {
    logger.info({
      'request method': request.method,
      'request header': request.headers,
    });
    return this.movementService.findOne(id);
  }

  @Public()
  @Post()
  @ApiOperation({ summary: 'Create movement request (Public Access)' })
  async create(@Body() data: CreateMovement, @Req() request: Request) {
    logger.info({
      'request method': request.method,
      'request header': request.headers,
    });
    return this.movementService.create({
      ...data,
      status: 'PENGAJUAN'
    });
  }

  @Patch(':id')
  @ApiParam({ name: 'id', required: true, type: Number })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateMovement,
    @Req() request: any
  ) {
    logger.info({
      'request method': request.method,
      'request header': request.headers,
    });

    // Validate status updates
    if (data.status) {
      const movement = await this.movementService.findOne(id);
      
      // Only assigned officer can update to SEDANG_DIPINDAHKAN or SELESAI
      if (
        ['SEDANG_DIPINDAHKAN', 'SELESAI'].includes(data.status) &&
        movement.assignedToId !== request.user.id
      ) {
        throw new ForbiddenException('Only assigned officer can update this status');
      }

      // Only admin can approve/reject
      if (
        ['DISETUJUI', 'DITOLAK'].includes(data.status) &&
        request.user.role !== 0
      ) {
        throw new ForbiddenException('Only admin can approve or reject movements');
      }

      // Set approvedById for approval/rejection
      if (['DISETUJUI', 'DITOLAK'].includes(data.status)) {
        data.approvedById = request.user.id;
      }
    }

    return this.movementService.update(id, data);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', required: true, type: Number })
  async delete(@Param('id', ParseIntPipe) id: number, @Req() request: Request) {
    logger.info({
      'request method': request.method,
      'request header': request.headers,
    });
    return this.movementService.delete(id);
  }
}