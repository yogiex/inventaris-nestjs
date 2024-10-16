import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ItemsModule } from './items/items.module';
import { RoomsModule } from './rooms/rooms.module';
import { MovementRequestModule } from './movement_request/movement_request.module';
import { UsersModule } from './users/users.module';
import { PrismaService } from './prisma.service';
import { SupplierModule } from './supplier/supplier.module';
import { ItemTypeModule } from './item_type/item_type.module';

@Module({
  imports: [
    AuthModule,
    ItemsModule,
    RoomsModule,
    MovementRequestModule,
    UsersModule,
    SupplierModule,
    ItemTypeModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
