import { ApiProperty } from '@nestjs/swagger';

export class SupplierDTO {
  @ApiProperty()
  name: string;
  @ApiProperty()
  phone: string;
}
