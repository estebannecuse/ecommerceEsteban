import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Order } from "./orders.entity";
import { User } from "src/users/user.entity";
import { Product } from "src/products/product.entity";
import { OrderDetails } from "src/orderDetails/orderDetails.entity";

@Injectable()
export class OrdersDbService{
    constructor(
        @InjectRepository(Order)
        private readonly ordersRepository: Repository<Order>,
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
        @InjectRepository(Product)
        private readonly productsRepository: Repository<Product>
    ){}


    async addOrder(userId: string, productIds: string[]): Promise<Order> {
        const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (!user) {
        throw new Error("User not found");
    }
        
    for (const productId of productIds) {
        const product = await this.productsRepository.findOne({ where: { id: productId } });
        if (!product) {
            throw new Error(`Product with id ${productId} not found`);
        }
    }
        let total = 0;
        const orderDetails: OrderDetails[] = [];
    
        for (const productId of productIds) {
            const product = await this.productsRepository.findOne({
                where: { id: productId },
                relations: ['category'],
            });
    
            if (product && product.stock > 0) {
                product.stock -= 1;
                await this.productsRepository.save(product);
    
                const orderDetail = new OrderDetails();
                orderDetail.products = product;
                orderDetail.price = Number(product.price);
                orderDetails.push(orderDetail);
    
                total += Number(product.price);
            }

        }
        
        const order = new Order();
        order.user = user;
        order.total = parseFloat(total.toFixed(2));
        order.date = new Date().toLocaleString();
        order.orderDetails = orderDetails;
        
        console.log(order);
        console.log(order);
        
        
        return this.ordersRepository.save(order);
        
    }

    async getOrder(orderId: string){
        const order = await this.ordersRepository.findOne({where: {id: orderId},             
            relations: ['user','orderDetails'],
        });
        console.log(order.orderDetails);
        if(!order){
            throw new Error("Order not found");
        }
        return order;
    }
}