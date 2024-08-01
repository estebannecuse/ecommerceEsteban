import { Repository } from "typeorm";
import { Order } from "./orders.entity";
import { User } from "src/users/user.entity";
import { Product } from "src/products/product.entity";
export declare class OrdersDbService {
    private readonly ordersRepository;
    private readonly usersRepository;
    private readonly productsRepository;
    constructor(ordersRepository: Repository<Order>, usersRepository: Repository<User>, productsRepository: Repository<Product>);
    addOrder(userId: string, productIds: string[]): Promise<Order>;
    getOrder(orderId: string): Promise<Order>;
}
