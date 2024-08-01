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
exports.ProductsDbService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const product_entity_1 = require("./product.entity");
const category_entity_1 = require("../category/category.entity");
const uuid_1 = require("uuid");
const data = require("../data.json");
let ProductsDbService = class ProductsDbService {
    constructor(productRepository, categoryRepository) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
    }
    async findAll(page, limit) {
        const start = (page - 1) * limit;
        const end = start + limit;
        const product = await this.productRepository.find({ relations: ['category'] });
        return product.slice(start, end);
    }
    async findById(id) {
        return await this.productRepository.findOne({ where: { id: id } });
    }
    async addProduct(productRecibido) {
        const category = await this.categoryRepository.findOne({ where: { name: productRecibido.category } });
        const exist = await this.productRepository.findOne({ where: { name: productRecibido.name } });
        if (!exist) {
            try {
                const product = new product_entity_1.Product();
                product.name = productRecibido.name;
                product.description = productRecibido.description;
                product.price = productRecibido.price;
                product.stock = productRecibido.stock;
                product.imgUrl = productRecibido.imgUrl;
                product.category = category;
                console.log(category);
                const newProduct = await this.productRepository.save(product);
                return ({ message: "producto agregado con exito", newProduct });
            }
            catch (error) {
                return ({ message: "error al agregar producto", error });
            }
        }
        else {
            return ({ message: "producto ya existe", exist });
        }
    }
    async updateProduct(product) {
        const exist = await this.productRepository.findOne({ where: { id: product.id } });
        if (exist) {
            try {
                const newProduct = await this.productRepository.update(exist, product);
                return ({ message: "producto actualizado con exito", newProduct });
            }
            catch (error) {
                return ({ message: "error al actualizar producto", error });
            }
        }
        else {
            return ({ message: "producto no existe" });
        }
    }
    async updateProductImg(id, image) {
        const exist = await this.productRepository.findOne({ where: { id } });
        if (exist) {
            try {
                const newProduct = await this.productRepository.update(exist, { imgUrl: image });
                return ({ message: "producto actualizado con exito", newProduct });
            }
            catch (error) {
                return ({ message: "error al actualizar imagen", error });
            }
        }
        else {
            return ({ message: "producto no existe" });
        }
    }
    async deleteProduct(product) {
        const exist = await this.productRepository.findOne({ where: { id: product.id } });
        if (exist) {
            try {
                const newProduct = await this.productRepository.delete(exist);
                return ({ message: "producto eliminado con exito", newProduct });
            }
            catch (error) {
                return ({ message: "error al eliminar producto", error });
            }
        }
        else {
            return ({ message: "producto no existe" });
        }
    }
    async seedProducts() {
        for (const item of data) {
            const { name, description, price, stock, category: categoryName } = item;
            console.log(`Processing product "${name}" in category "${categoryName}"...`);
            const allCats = await this.categoryRepository.find();
            console.log(allCats);
            const category = await this.categoryRepository.findOne({ where: { name: categoryName } });
            if (!category) {
                console.log(`Category "${categoryName}" not found, skipping product "${name}".`);
                continue;
            }
            console.log(`Category "${categoryName}" found with ID "${category.id}".`);
            const existingProduct = await this.productRepository.findOne({
                where: {
                    name,
                    category: {
                        id: category.id
                    }
                },
                relations: ['category']
            });
            if (!existingProduct) {
                console.log(`Agregando producto "${name}"...`);
                const product = this.productRepository.create({
                    id: (0, uuid_1.v4)(),
                    name,
                    description,
                    price,
                    stock,
                    category,
                });
                try {
                    await this.productRepository.save(product);
                    console.log(`Product "${name}" inserted successfully.`);
                }
                catch (error) {
                    console.error(`Error insertando el producto "${name}":`, error);
                }
            }
            else {
                console.log(`Producto "${name}" ya existe en la categoria "${categoryName}", siguiente.`);
            }
        }
        console.log("Precarga completada.");
    }
};
exports.ProductsDbService = ProductsDbService;
exports.ProductsDbService = ProductsDbService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __param(1, (0, typeorm_1.InjectRepository)(category_entity_1.Category)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ProductsDbService);
//# sourceMappingURL=productsDb.service.js.map