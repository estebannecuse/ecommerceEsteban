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
exports.CategoryDbService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const category_entity_1 = require("./category.entity");
const data = require("../data.json");
let CategoryDbService = class CategoryDbService {
    constructor(categoryRepository) {
        this.categoryRepository = categoryRepository;
    }
    async seedCategory() {
        for (const item of data) {
            const categoryName = item.category;
            const existCategory = await this.categoryRepository.findOne({
                where: { name: categoryName },
            });
            if (!existCategory) {
                console.log(categoryName);
                await this.categoryRepository.save({ name: categoryName });
            }
        }
        return { message: "Categorias cargadas correctamente" };
    }
    async getCategories() {
        try {
            return await this.categoryRepository.find();
        }
        catch (error) {
            return { message: "Error al cargar las categorias" };
        }
    }
    async addCategory(category) {
        console.log(category.name);
        const exist = await this.categoryRepository.findOne({
            where: { name: category.name }
        });
        if (!exist) {
            try {
                const newCategory = this.categoryRepository.create(category);
                return await this.categoryRepository.save(newCategory);
            }
            catch (error) {
                return { message: "Error al cargar la categoria" };
            }
        }
        else {
            return { message: "La categoria ya existe o los datos son incorrectos" };
        }
    }
};
exports.CategoryDbService = CategoryDbService;
exports.CategoryDbService = CategoryDbService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(category_entity_1.Category)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CategoryDbService);
//# sourceMappingURL=categoryDb.service.js.map