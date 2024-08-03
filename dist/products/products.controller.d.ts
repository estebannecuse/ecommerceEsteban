import { ProductsDbService } from "./productsDb.service";
import { Response } from 'express';
import { CloudinaryService } from "src/cloudinary/cloudinary.service";
import { UpdateProductDto } from "./dto/update-product.dto";
export declare class ProductsController {
    private readonly productsDbService;
    private readonly cloudinaryService;
    constructor(productsDbService: ProductsDbService, cloudinaryService: CloudinaryService);
    seedProducts(): Promise<{
        message: string;
    }>;
    findAll(response: Response, limit?: number, page?: number): Promise<Response<any, Record<string, any>> | {
        message: string;
        error: any;
    }>;
    findById(response: Response, id: string): Promise<Response<any, Record<string, any>> | {
        message: string;
        error: any;
    }>;
    addProduct(response: Response, product: {
        name: string;
    }): Promise<Response<any, Record<string, any>> | {
        message: string;
        error: any;
    }>;
    uploadFile(file: Express.Multer.File): Promise<import("cloudinary").UploadApiResponse>;
    updateProduct(response: Response, id: string, product: UpdateProductDto): Promise<Response<any, Record<string, any>> | {
        message: string;
        error: any;
    }>;
    deleteProduct(response: Response, id: string): Promise<Response<any, Record<string, any>> | {
        message: string;
        error: any;
    }>;
}
