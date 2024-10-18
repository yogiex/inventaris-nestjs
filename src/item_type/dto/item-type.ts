/* eslint-disable prettier/prettier */
import { ApiProperty, OmitType, PartialType, PickType } from '@nestjs/swagger';
export enum ItemTypes {
  REDUCE = 'barang_stok',
  NON_REDUCE = 'barang_sekali_pakai',
}
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
  roomId: number;

  @ApiProperty()
  supplierId: number;

  @ApiProperty()
  inputBy: number;

  @ApiProperty()
  status: string;

  @ApiProperty()
  availability: boolean;

  @ApiProperty()
  type: string;
}

export class CreateItemType extends OmitType(ItemType, ['id']) {}
export class UpdateItemType extends PartialType(ItemType) {}
export class ItemTypeIdDTO extends PickType(ItemType, ['id']) {}
