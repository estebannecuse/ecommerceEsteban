import { CategoryDbService } from './categoryDb.service';
import { CreateCategoryDto } from './create-category.dto';
export declare class CategoryController {
    private readonly categoryDbService;
    constructor(categoryDbService: CategoryDbService);
    seedCategories(): Promise<{
        message: string;
    }>;
    getCategories(): Promise<import("./category.entity").Category[] | {
        message: string;
    }>;
    addCategory(category: CreateCategoryDto): Promise<import("./category.entity").Category | {
        message: string;
    }>;
}
