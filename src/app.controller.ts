import { Controller, Get, Req } from '@nestjs/common';
import { AppService } from './app.service';
import logger from './logger';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Req() request: Request): string {
    logger.info({
      'request method': request.method,
      'request header': request.headers,
    });
    return this.appService.getHello();
  }
}
