import { Repository } from "typeorm";
import { Product } from "./product.entity";
import { Category } from "src/category/category.entity";
import { UpdateProductDto } from "./dto/update-product.dto";
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
    updateProduct(id: string, product: Partial<UpdateProductDto>): Promise<{
        message: string;
        updatedProduct: Product;
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
    deleteProduct(id: string): Promise<string | {
        message: string;
        error: any;
    } | {
        message: string;
        error?: undefined;
    }>;
    seedProducts(): Promise<void>;
}
