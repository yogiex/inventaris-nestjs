import { ApiProperty, OmitType, PartialType, PickType } from '@nestjs/swagger';
import { TypeBarang } from '@prisma/client'; // Import dari Prisma

export class ItemType {
  @ApiProperty()
  id?: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  quantity: number;

  @ApiProperty()
  supplierId: number;

  @ApiProperty()
  inputBy: number;

  @ApiProperty({ enum: TypeBarang })
  type: TypeBarang;
}

export class CreateItemType extends OmitType(ItemType, ['id']) {}
export class UpdateItemType extends PartialType(ItemType) {}
export class ItemTypeIdDTO extends PickType(ItemType, ['id']) {}

export class FindAllItemTypesQuery {
  @ApiProperty({ required: false })
  page?: number;

  @ApiProperty({ required: false })
  limit?: number;

  @ApiProperty({ required: false })
  search?: string;

  @ApiProperty({ required: false, enum: TypeBarang })
  type?: TypeBarang;
}

export class ItemTypeStats {
  @ApiProperty()
  inventoryCount: number;

  @ApiProperty()
  consumableCount: number;
}