import { Module } from '@nestjs/common';
import { ItemTypeService } from './item_type.service';
import { ItemTypeController } from './item_type.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [ItemTypeService, PrismaService],
  controllers: [ItemTypeController],
})
export class ItemTypeModule {}
