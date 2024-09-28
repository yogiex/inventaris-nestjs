/* eslint-disable prettier/prettier */
import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { LoginDTO, RegisterDTO } from './dto/auth';
import logger from 'src/logger';
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() data: RegisterDTO) {
    logger.info({});
    return this.authService.register(data);
  }

  @Post('login')
  async login(@Body() data: LoginDTO) {
    return this.authService.login(data);
  }
}
