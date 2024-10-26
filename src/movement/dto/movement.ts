// movement/dto/movement.ts
import { ApiProperty, OmitType, PartialType, PickType } from '@nestjs/swagger';
import { MovementStatus, MovementType } from '@prisma/client';
import { IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class Movement {
  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  id?: number;

  @ApiProperty({ required: false })
  MovementTitle?: string;

  @ApiProperty({ type: [String] })
  itemIds: string[];

  @ApiProperty({ enum: MovementType })
  movementType: MovementType;

  @ApiProperty({ enum: MovementStatus, default: 'PENGAJUAN' })
  status: MovementStatus;

  @ApiProperty()
  quantity: number;

  @ApiProperty({ required: false })
  fromRoomId?: number;

  @ApiProperty({ required: false })
  toRoomId?: number;

  @ApiProperty({ required: false })
  requesterName: string;

  @ApiProperty({ required: false })
  description?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  approvedById?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  assignedToId?: number;
}

export class CreateMovement extends OmitType(Movement, ['id', 'approvedById', 'assignedToId']) {}
export class UpdateMovement extends PartialType(Movement) {}
export class MovementIdDTO extends PickType(Movement, ['id']) {}