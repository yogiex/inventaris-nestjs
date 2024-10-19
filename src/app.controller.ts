import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Req,
  Res,
  StreamableFile,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Request, Response } from 'express';
import logger from './logger';
import { FileInterceptor } from '@nestjs/platform-express';
import { join } from 'path';
import { createReadStream, existsSync } from 'fs';
import { PrismaService } from './prisma.service';
import { ApiParam } from '@nestjs/swagger';
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private prismaService: PrismaService,
  ) {}

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
    const fullpathfile = `${req.protocol}://${req.get('host')}${req.originalUrl}/uploads/${file.originalname}`;
    // const timestampFile = fil;
    return { data, file, linkFile, fullpathfile };
    // const datas = await this.prismaService.items.create({
    //   data: {
    //     roomId: Number(data.roomId),
    //     condition: data.condition,
    //     image: fullpathfile.toString(),
    //     spec: data.spec,
    //     typeId: Number(data.typeId),
    //   },
    //   include: {
    //     room: true,
    //   },
    // });
    // return datas;
  }

  @Get('file/uploads/:filename')
  @ApiParam({ name: 'filename', required: true })
  async getFiles(@Param() file: string, @Res() res: Response) {
    const filePath = createReadStream(join(process.cwd(), 'uploads'));
    return new StreamableFile(filePath);
    console.log(filePath);
    // if (!existsSync(filePath)) throw new NotFoundException('File Not Found');
    // res.setHeader('Content-Disposition', `inline; filename="${filename}"`);
  }
}
