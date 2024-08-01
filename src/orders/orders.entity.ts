import { OrderDetails } from "src/orderDetails/orderDetails.entity";
import { User } from "src/users/user.entity";
import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import {v4 as uuid} from 'uuid';

@Entity({
    name: 'orders'
})
export class Order {
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid();

    @Column()
    date: string

    @Column('decimal')
    total: number;
    

    @ManyToOne(() => User, (user) => user.orders)
    user: User;

    @OneToMany(() => OrderDetails, (orderDetail) => orderDetail.order, { cascade: true })
    orderDetails: OrderDetails[];
}
