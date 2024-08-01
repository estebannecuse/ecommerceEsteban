import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './orders.entity';
import { OrderDetails } from 'src/orderDetails/orderDetails.entity';
import { User } from 'src/users/user.entity';
import { Product } from 'src/products/product.entity';
import { OrdersDbService } from './ordersDb.service';
import { OrderController } from './orders.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderDetails, User, Product])],
  providers: [OrdersDbService],
  controllers: [OrderController],
})
export class OrderModule {}