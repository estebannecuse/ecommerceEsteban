import { OrdersDbService } from "./ordersDb.service";
import { Order } from "./orders.entity";
import { CreateOrderDto } from "./dtos/create-order.dto";
import { Response } from 'express';
export declare class OrderController {
    private readonly ordersDbService;
    constructor(ordersDbService: OrdersDbService);
    addOrder(response: Response, createOrderDto: CreateOrderDto): Promise<any>;
    getOrder(id: string): Promise<Order>;
}
