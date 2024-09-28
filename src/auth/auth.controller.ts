/* eslint-disable prettier/prettier */
import { Body, Controller, Post, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { LoginDTO, RegisterDTO } from './dto/auth';
import logger from 'src/logger';
import { JwtGuard } from './jwt.guard';
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

  @Get('tes')
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  async tesAuth() {
    return 'tes auth bisa';
  }
}
