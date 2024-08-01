import { Order } from 'src/orders/orders.entity';
import { Product } from 'src/products/product.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToOne, JoinColumn, ManyToOne } from 'typeorm';



@Entity()
export class OrderDetails {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @ManyToOne(() => Order, (order) => order.orderDetails)
  @JoinColumn({name: 'order_id'})
  order: Order;

  @ManyToMany(() => Product)
  products: Product;
  
}