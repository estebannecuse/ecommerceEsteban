import { Category } from "src/category/category.entity";
import { OrderDetails } from "src/orderDetails/orderDetails.entity";
export declare class Product {
    id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    imgUrl: string;
    category: Category;
    orderDetails: OrderDetails[];
}
