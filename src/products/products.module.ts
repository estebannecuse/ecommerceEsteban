import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsDbService } from './productsDb.service';
import { ProductsController } from './products.controller';
import { Product } from './product.entity';
import { CategoryModule } from 'src/category/category.module';
import { CloudinaryConfig } from 'src/config/cloudinary';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product]), CategoryModule],
  controllers: [ProductsController],
  providers: [ProductsDbService, CloudinaryConfig, CloudinaryService],
  exports: [ProductsDbService]
})
export class ProductsModule {}

