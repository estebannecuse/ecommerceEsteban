"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const productsDb_service_1 = require("./productsDb.service");
const platform_express_1 = require("@nestjs/platform-express");
const cloudinary_service_1 = require("../cloudinary/cloudinary.service");
const auth_guard_1 = require("../auth/Auth/auth.guard");
const roles_decorator_1 = require("../decorators/roles.decorator");
const roles_guard_1 = require("../auth/Auth/roles.guard");
const roles_enum_1 = require("../roles.enum");
const swagger_1 = require("@nestjs/swagger");
const update_product_dto_1 = require("./dto/update-product.dto");
let ProductsController = class ProductsController {
    constructor(productsDbService, cloudinaryService) {
        this.productsDbService = productsDbService;
        this.cloudinaryService = cloudinaryService;
    }
    async seedProducts() {
        try {
            await this.productsDbService.seedProducts();
            return { message: 'Products seeded successfully' };
        }
        catch (error) {
            return { message: 'Error seeding products' + error };
        }
    }
    async findAll(response, limit, page) {
        try {
            const products = await this.productsDbService.findAll(+page, +limit);
            return response.status(common_1.HttpStatus.OK).json(products);
        }
        catch (error) {
            return { message: "Error al obtener los productos", error };
        }
    }
    async findById(response, id) {
        try {
            const product = await this.productsDbService.findById(id);
            return response.status(common_1.HttpStatus.OK).json(product);
        }
        catch (error) {
            return { message: "Error al obtener el producto", error };
        }
    }
    async addProduct(response, product) {
        try {
            const newProduct = await this.productsDbService.addProduct(product);
            return response.status(common_1.HttpStatus.OK).json(newProduct);
        }
        catch (error) {
            return { message: "Error al agregar el producto", error };
        }
    }
    uploadFile(file) {
        return this.cloudinaryService.uploadImage(file);
    }
    async updateProduct(response, id, product) {
        try {
            console.log("1. id controller", id);
            console.log("2. product controller", product);
            const updatedProduct = await this.productsDbService.updateProduct(id, product);
            return response.status(common_1.HttpStatus.OK).json(updatedProduct);
        }
        catch (error) {
            return { message: "Error al actualizar el producto", error };
        }
    }
    async deleteProduct(response, id) {
        try {
            await this.productsDbService.deleteProduct(id);
            return response.status(common_1.HttpStatus.OK).json(id);
        }
        catch (error) {
            return { message: "Error al eliminar el producto", error };
        }
    }
};
exports.ProductsController = ProductsController;
__decorate([
    (0, common_1.Get)('seeder'),
    openapi.ApiResponse({ status: 200 }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "seedProducts", null);
__decorate([
    (0, common_1.Get)(''),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Query)("limit")),
    __param(2, (0, common_1.Query)("page")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Number]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "findById", null);
__decorate([
    (0, common_1.Post)('add'),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "addProduct", null);
__decorate([
    (0, common_1.Post)('upload'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image')),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "uploadFile", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Put)('/:id'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, roles_decorator_1.Roles)(roles_enum_1.Role.Admin),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, update_product_dto_1.UpdateProductDto]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "updateProduct", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "deleteProduct", null);
exports.ProductsController = ProductsController = __decorate([
    (0, swagger_1.ApiTags)('Products'),
    (0, common_1.Controller)('products'),
    __metadata("design:paramtypes", [productsDb_service_1.ProductsDbService,
        cloudinary_service_1.CloudinaryService])
], ProductsController);
//# sourceMappingURL=products.controller.js.map