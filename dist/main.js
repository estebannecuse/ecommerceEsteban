"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const global_middleware_1 = require("./middlewareGlobal/global.middleware");
const common_1 = require("@nestjs/common");
const exceptionHandler_1 = require("./exceptions/exceptionHandler");
const swagger_1 = require("@nestjs/swagger");
const categoryDb_service_1 = require("./category/categoryDb.service");
const productsDb_service_1 = require("./products/productsDb.service");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const swaggerConfig = new swagger_1.DocumentBuilder()
        .setTitle("Demo titulo API ")
        .setDescription("esta es la descripcion")
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, swaggerConfig);
    swagger_1.SwaggerModule.setup('api', app, document);
    app.use(new global_middleware_1.GlobalMiddleware().use);
    app.useGlobalPipes(new common_1.ValidationPipe({ whitelist: true }));
    app.useGlobalFilters(new exceptionHandler_1.HttpExceptionFilter());
    const categorySEed = app.get(categoryDb_service_1.CategoryDbService);
    await categorySEed.seedCategory();
    const productSeed = app.get(productsDb_service_1.ProductsDbService);
    await productSeed.seedProducts();
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map