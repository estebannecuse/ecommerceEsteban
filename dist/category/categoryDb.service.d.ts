import { Repository } from 'typeorm';
import { Category } from './category.entity';
import { CreateCategoryDto } from './create-category.dto';
export declare class CategoryDbService {
    private categoryRepository;
    constructor(categoryRepository: Repository<Category>);
    seedCategory(): Promise<{
        message: string;
    }>;
    getCategories(): Promise<Category[] | {
        message: string;
    }>;
    addCategory(category: CreateCategoryDto): Promise<Category | {
        message: string;
    }>;
}
