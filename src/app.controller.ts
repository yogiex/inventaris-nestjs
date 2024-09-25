import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import logger from './logger';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    logger.info('welcome to the root page');
    return this.appService.getHello();
  }
}
