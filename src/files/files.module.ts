import { Module } from '@nestjs/common';
import { FilesController } from './files.controller';
import { CloudinaryConfig } from 'src/config/cloudinary';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { FilesDbService } from './filesDb.service';
import { ProductsModule } from 'src/products/products.module';

@Module({
    imports: [ProductsModule],
    controllers: [FilesController],
    providers: [CloudinaryConfig, CloudinaryService, FilesDbService],
    exports: [FilesDbService]
})
export class FilesModule{}
