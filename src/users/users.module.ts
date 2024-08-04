import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersDbService } from './usersDb.service';
import { Product } from 'src/products/product.entity';
import { Order } from 'src/orders/orders.entity';
import { OrderDetails } from 'src/orderDetails/orderDetails.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User]), Product, Order, OrderDetails],
  controllers: [UsersController],
  providers: [UsersDbService],
  exports:[UsersDbService]
})
export class UsersModule {}
