"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const productsDb_service_1 = require("./productsDb.service");
const products_controller_1 = require("./products.controller");
const product_entity_1 = require("./product.entity");
const category_module_1 = require("../category/category.module");
const cloudinary_1 = require("../config/cloudinary");
const cloudinary_service_1 = require("../cloudinary/cloudinary.service");
let ProductsModule = class ProductsModule {
};
exports.ProductsModule = ProductsModule;
exports.ProductsModule = ProductsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([product_entity_1.Product]), category_module_1.CategoryModule],
        controllers: [products_controller_1.ProductsController],
        providers: [productsDb_service_1.ProductsDbService, cloudinary_1.CloudinaryConfig, cloudinary_service_1.CloudinaryService],
        exports: [productsDb_service_1.ProductsDbService]
    })
], ProductsModule);
//# sourceMappingURL=products.module.js.map