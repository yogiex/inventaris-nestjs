import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';

export class SupplierDTO {
  @ApiProperty()
  id?: number;
  @ApiProperty()
  name: string;
  @ApiProperty()
  phone: string;
}
export class CreateSupplierDTO extends OmitType(SupplierDTO, ['id']) {}
export class UpdateSupplierDTO extends PartialType(CreateSupplierDTO) {}
