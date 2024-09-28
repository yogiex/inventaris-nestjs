/* eslint-disable prettier/prettier */
import { ApiProperty, OmitType } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

export class RegisterDTO {
  @ApiProperty({ required: true })
  username: string;

  @Exclude({ toPlainOnly: true })
  @ApiProperty({ required: true })
  password: string;

  @ApiProperty({ required: true })
  role: number;
}

export class LoginDTO extends OmitType(RegisterDTO, ['role']) {}
