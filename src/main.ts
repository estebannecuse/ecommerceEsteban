import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalMiddleware } from './middlewareGlobal/global.middleware';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './exceptions/exceptionHandler';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

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
  await app.listen(3000);
}
bootstrap();


// importo los modulos y servicios en providers 
// en una const guardo el servicio 
// luego del app listen llamo a esa const con un punto y deberia habilitarse las funcionalidades 