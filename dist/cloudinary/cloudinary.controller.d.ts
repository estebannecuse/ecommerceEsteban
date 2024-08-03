import { CloudinaryService } from './cloudinary.service';
export declare class CloudinaryController {
    private readonly cloudinaryService;
    constructor(cloudinaryService: CloudinaryService);
    uploadFile(file: Express.Multer.File): Express.Multer.File;
}
