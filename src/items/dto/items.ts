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
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  quantity: number;

  @ApiProperty()
  type: ItemType;

  @ApiProperty()
  room_id: number;
}

export class CreateItem extends OmitType(Items, ['id']) {}
export class UpdateItem extends PartialType(Items) {}
export class ItemIdDTO extends PickType(Items, ['id']) {}
