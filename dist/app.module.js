"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const products_module_1 = require("./products/products.module");
const users_module_1 = require("./users/users.module");
const auth_module_1 = require("./auth/auth.module");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const typeorm_2 = require("./config/typeorm");
const category_module_1 = require("./category/category.module");
const orders_module_1 = require("./orders/orders.module");
const cloudinary_module_1 = require("./cloudinary/cloudinary.module");
const files_module_1 = require("./files/files.module");
const jwt_1 = require("@nestjs/jwt");
const categoryDb_service_1 = require("./category/categoryDb.service");
const productsDb_service_1 = require("./products/productsDb.service");
const product_entity_1 = require("./products/product.entity");
const category_entity_1 = require("./category/category.entity");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                load: [typeorm_2.default],
            }), typeorm_1.TypeOrmModule.forFeature([product_entity_1.Product, category_entity_1.Category]),
            typeorm_1.TypeOrmModule.forRootAsync({
                inject: [config_1.ConfigService],
                useFactory: (configService) => configService.get('typeorm'),
            }), products_module_1.ProductsModule,
            users_module_1.UsersModule,
            auth_module_1.AuthModule,
            category_module_1.CategoryModule,
            orders_module_1.OrderModule,
            cloudinary_module_1.CloudinaryModule,
            files_module_1.FilesModule,
            jwt_1.JwtModule.register({
                global: true,
                signOptions: { expiresIn: '1h' },
                secret: process.env.JWT_SECRET,
            })
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, categoryDb_service_1.CategoryDbService, productsDb_service_1.ProductsDbService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map