import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeOrmConfig from './config/typeorm'
import { CategoryModule } from './category/category.module';
import { OrderModule } from './orders/orders.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { FilesModule } from './files/files.module';
import { JwtModule } from '@nestjs/jwt';
import { CategoryDbService } from './category/categoryDb.service';
import { ProductsDbService } from './products/productsDb.service';
import { Product } from './products/product.entity';
import { Category } from './category/category.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeOrmConfig],
    }),TypeOrmModule.forFeature([Product, Category]),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => configService.get('typeorm'),
      }
    ), ProductsModule, 
    UsersModule, 
    AuthModule,  
    CategoryModule, 
    OrderModule, 
    CloudinaryModule, 
    FilesModule,
    JwtModule.register({
      global: true,
      signOptions:{expiresIn: '1h'}, // para que el token espire en una hora
      secret: process.env.JWT_SECRET,
    })],
  controllers: [AppController],
  providers: [AppService,CategoryDbService,ProductsDbService],
})
export class AppModule  {
}
