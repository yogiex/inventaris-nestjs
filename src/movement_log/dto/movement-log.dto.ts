import { ApiProperty, OmitType } from '@nestjs/swagger';
import { MovementStatus, ItemAvailability } from '@prisma/client';

export class MovementLog {
  @ApiProperty()
  id?: number;

  @ApiProperty({ required: false })
  MovementTitle?: string;

  @ApiProperty()
  movementType: string;

  @ApiProperty()
  itemTypeName: string;

  @ApiProperty()
  quantity: number;

  @ApiProperty({ required: false })
  fromRoom?: string;

  @ApiProperty({ required: false })
  toRoom?: string;

  @ApiProperty({ required: false })
  requesterName: string;

  @ApiProperty({ required: false })
  approvedBy?: string;

  @ApiProperty({ required: false })
  assignedTo?: string;

  @ApiProperty({ required: false })
  inputBy?: string;

  @ApiProperty({ enum: MovementStatus })
  status: MovementStatus;

  @ApiProperty({ enum: ItemAvailability })
  itemAvailability: ItemAvailability;

  @ApiProperty({ required: false })
  description?: string;
}

export class CreateMovementLog extends OmitType(MovementLog, ['id']) {}