import { ApiProperty, OmitType, PartialType, PickType } from '@nestjs/swagger';
import { ItemAvailability } from '@prisma/client';

export class Items {
  @ApiProperty()
  id?: string;

  @ApiProperty({ enum: ItemAvailability })
  availability: ItemAvailability;

  @ApiProperty()
  roomId: number;

  @ApiProperty()
  condition: string;

  @ApiProperty()
  spec: string;

  @ApiProperty()
  image: string;

  @ApiProperty()
  typeId: number;

  @ApiProperty({ required: false })
  currentMovementId?: number;
}

export class CreateItem extends OmitType(Items, ['id', 'currentMovementId']) {}
export class UpdateItem extends PartialType(Items) {}
export class ItemIdDTO extends PickType(Items, ['id']) {}