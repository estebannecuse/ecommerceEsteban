import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalMiddleware } from './middlewareGlobal/global.middleware';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './exceptions/exceptionHandler';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { CategoryDbService } from './category/categoryDb.service';
import { ProductsDbService } from './products/productsDb.service';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  const swaggerConfig = new DocumentBuilder()
  .setTitle("Demo titulo API ")
  .setDescription("esta es la descripcion")
  .addBearerAuth()
  .build()

  const document = SwaggerModule.createDocument(app, swaggerConfig)
  SwaggerModule.setup('api', app, document)


  app.use(new GlobalMiddleware().use)
  app.useGlobalPipes(new ValidationPipe({whitelist:true}));
  app.useGlobalFilters(new HttpExceptionFilter());
  const categorySEed = app.get(CategoryDbService);
  await categorySEed.seedCategory();
  const productSeed = app.get(ProductsDbService);
  await productSeed.seedProducts();
  await app.listen(3000);
}
bootstrap();
