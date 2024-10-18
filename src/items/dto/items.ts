/* eslint-disable prettier/prettier */
import { ApiProperty, OmitType, PartialType, PickType } from '@nestjs/swagger';
export enum ItemType {
  REDUCE = 'barang_stok',
  NON_REDUCE = 'barang_sekali_pakai',
}
export class Items {
  @ApiProperty()
  id?: number;

  @ApiProperty()
  image: string;

  @ApiProperty()
  condition: string;

  @ApiProperty()
  spec: string;
}

export class CreateItem extends OmitType(Items, ['id']) {}
export class UpdateItem extends PartialType(Items) {}
export class ItemIdDTO extends PickType(Items, ['id']) {}
