import { OrderDetails } from "src/orderDetails/orderDetails.entity";
import { User } from "src/users/user.entity";
export declare class Order {
    id: string;
    date: string;
    total: number;
    user: User;
    orderDetails: OrderDetails[];
}
