import { Controller, Post, Body, Get } from '@nestjs/common';
import { CategoryDbService } from './categoryDb.service';
import { CreateCategoryDto } from './create-category.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("Categories")
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryDbService: CategoryDbService) {}

  @Get('seeder')
  async seedCategories() {
    return this.categoryDbService.seedCategory();
  }
  @Get('/')
  async getCategories(){
    return this.categoryDbService.getCategories();
  }
  @Post('add')
  async addCategory(@Body() category: CreateCategoryDto ) {
    return this.categoryDbService.addCategory(category);
  }
}
