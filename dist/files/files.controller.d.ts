import { FilesDbService } from './filesDb.service';
import { ProductsDbService } from 'src/products/productsDb.service';
export declare class FilesController {
    private readonly filesDbService;
    private readonly productsDbService;
    constructor(filesDbService: FilesDbService, productsDbService: ProductsDbService);
    updateImg(id: string, image: Express.Multer.File): Promise<{
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
}
