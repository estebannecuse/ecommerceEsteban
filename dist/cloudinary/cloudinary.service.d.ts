import { UploadApiResponse } from 'cloudinary';
export declare class CloudinaryService {
    uploadImage(file: Express.Multer.File): Promise<UploadApiResponse>;
}
