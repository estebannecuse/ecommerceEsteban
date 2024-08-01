import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';
import * as data from "../data.json"
import { CreateCategoryDto } from './create-category.dto';


@Injectable()
export class CategoryDbService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}


  async seedCategory(){
    for (const item of data) {
      const categoryName = item.category;
      const existCategory = await this.categoryRepository.findOne({
        where: { name: categoryName },
      });

      if (!existCategory) {
        console.log(categoryName);
        await this.categoryRepository.save({name: categoryName});
      }
    }
    return { message: "Categorias cargadas correctamente" };
  }

  async getCategories(){
    try {
      return await this.categoryRepository.find();
    } catch (error) {
      return { message: "Error al cargar las categorias" };
    }
  }

  async addCategory(category: CreateCategoryDto){
    console.log(category.name);
    const exist = await this.categoryRepository.findOne({
      where: { name: category.name }
    })
    if(!exist){
      try {
        const newCategory = this.categoryRepository.create(category);
        return await this.categoryRepository.save(newCategory);
      } catch (error) {
        return { message: "Error al cargar la categoria" };
      }
    }
    else{
      return { message: "La categoria ya existe o los datos son incorrectos" };
    }
  }
  

}
