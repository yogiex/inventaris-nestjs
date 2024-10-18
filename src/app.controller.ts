import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';
import logger from './logger';
import { FileInterceptor } from '@nestjs/platform-express';
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
  // upload file
  @Post('file')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() data: any,
    @Req() req: Request,
  ) {
    const linkFile = file.path;
    const fullpathfile = `${req.protocol}://${req.get('host')}${req.originalUrl}/${linkFile}`;
    // const timestampFile = fil
    return { data, file, linkFile, fullpathfile };
  }

  @Get('file/uploads/:filename')
  async getFIles(@Req() filename: any) {
    return filename;
  }
}
