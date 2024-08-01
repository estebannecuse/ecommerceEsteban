import { UploadApiResponse } from 'cloudinary';
export declare class FilesDbService {
    uploadImage(file: Express.Multer.File): Promise<UploadApiResponse>;
}
