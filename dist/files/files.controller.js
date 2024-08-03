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
exports.FilesController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const filesDb_service_1 = require("./filesDb.service");
const productsDb_service_1 = require("../products/productsDb.service");
const swagger_1 = require("@nestjs/swagger");
let FilesController = class FilesController {
    constructor(filesDbService, productsDbService) {
        this.filesDbService = filesDbService;
        this.productsDbService = productsDbService;
    }
    async updateImg(id, image) {
        const product = await this.productsDbService.findById(id);
        if (!product) {
            throw new common_1.NotFoundException({ message: 'Producto no encontrado' });
        }
        else {
            const img = (await this.filesDbService.uploadImage(image)).secure_url;
            const updatedProduct = await this.productsDbService.updateProductImg(id, img);
            return updatedProduct;
        }
    }
};
exports.FilesController = FilesController;
__decorate([
    (0, common_1.Put)('/uploadImage/:id'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image')),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                image: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    }),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.UploadedFile)(new common_1.ParseFilePipe({ validators: [
            new common_1.MaxFileSizeValidator({ maxSize: 200000, message: 'file must be 200kb max' }),
            new common_1.FileTypeValidator({ fileType: /(jpg|jpeg|png|webp)$/ })
        ] }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], FilesController.prototype, "updateImg", null);
exports.FilesController = FilesController = __decorate([
    (0, swagger_1.ApiTags)("Files"),
    (0, common_1.Controller)('files'),
    __metadata("design:paramtypes", [filesDb_service_1.FilesDbService,
        productsDb_service_1.ProductsDbService])
], FilesController);
//# sourceMappingURL=files.controller.js.map