/* eslint-disable prettier/prettier */
import { ApiProperty, OmitType } from '@nestjs/swagger';

export class RegisterDTO {
  @ApiProperty({ required: true })
  username: string;

  @ApiProperty({ required: true })
  password: string;

  @ApiProperty({ required: true })
  role: number;
}

export class LoginDTO extends OmitType(RegisterDTO, ['role']) {}
