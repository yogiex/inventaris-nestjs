/* eslint-disable prettier/prettier */
import { Body, Controller, Post, Get, UseGuards, Req } from '@nestjs/common';
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
  async register(@Body() data: RegisterDTO, @Req() request: Request) {
    logger.info({
      'request method': request.method,
      'request header': request.headers,
    });
    return this.authService.register(data);
  }

  @Post('login')
  async login(@Body() data: LoginDTO, @Req() request: Request) {
    logger.info({
      'request method': request.method,
      'request header': request.headers,
    });
    return this.authService.login(data);
  }

  @Get('tes')
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  async tesAuth(@Req() request: Request) {
    logger.info({
      'request method': request.method,
      'request header': request.headers,
    });
    return 'tes auth bisa';
  }
}
