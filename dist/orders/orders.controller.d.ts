import { OrdersDbService } from "./ordersDb.service";
import { Order } from "./orders.entity";
import { CreateOrderDto } from "./dtos/create-order.dto";
export declare class OrderController {
    private readonly ordersDbService;
    constructor(ordersDbService: OrdersDbService);
    addOrder(createOrderDto: CreateOrderDto): Promise<Order>;
    getOrder(id: string): Promise<Order>;
}
