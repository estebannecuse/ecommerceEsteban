import { Repository } from "typeorm";
import { Product } from "./product.entity";
import { Category } from "src/category/category.entity";
export declare class ProductsDbService {
    private readonly productRepository;
    private readonly categoryRepository;
    constructor(productRepository: Repository<Product>, categoryRepository: Repository<Category>);
    findAll(page: number, limit: number): Promise<Product[]>;
    findById(id: string): Promise<Product>;
    addProduct(productRecibido: any): Promise<{
        message: string;
        newProduct: Product;
        error?: undefined;
        exist?: undefined;
    } | {
        message: string;
        error: any;
        newProduct?: undefined;
        exist?: undefined;
    } | {
        message: string;
        exist: Product;
        newProduct?: undefined;
        error?: undefined;
    }>;
    updateProduct(product: {
        id: string;
    }): Promise<{
        message: string;
        newProduct: import("typeorm").UpdateResult;
        error?: undefined;
    } | {
        message: string;
        error: any;
        newProduct?: undefined;
    } | {
        message: string;
        newProduct?: undefined;
        error?: undefined;
    }>;
    updateProductImg(id: any, image: any): Promise<{
        message: string;
        newProduct: import("typeorm").UpdateResult;
        error?: undefined;
    } | {
        message: string;
        error: any;
        newProduct?: undefined;
    } | {
        message: string;
        newProduct?: undefined;
        error?: undefined;
    }>;
    deleteProduct(product: {
        id: string;
    }): Promise<{
        message: string;
        newProduct: import("typeorm").DeleteResult;
        error?: undefined;
    } | {
        message: string;
        error: any;
        newProduct?: undefined;
    } | {
        message: string;
        newProduct?: undefined;
        error?: undefined;
    }>;
    seedProducts(): Promise<void>;
}
