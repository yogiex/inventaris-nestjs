import { ApiProperty, OmitType, PartialType, PickType } from '@nestjs/swagger';

export class RoomsDTO {
  id?: number;
  @ApiProperty()
  name: string;
  @ApiProperty()
  building: string;
  @ApiProperty()
  number: string;
  @ApiProperty()
  address: string;
}

export class CreateRoom extends OmitType(RoomsDTO, ['id']) {}
export class UpdateRoom extends PartialType(CreateRoom) {}
export class RoomIdDto extends PickType(RoomsDTO, ['id']) {}
