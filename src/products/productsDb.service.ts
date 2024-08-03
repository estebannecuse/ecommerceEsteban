import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Product } from "./product.entity";
import { Category } from "src/category/category.entity";
import { v4 as uuidv4 } from 'uuid';
import * as data from '../data.json';
import { UpdateProductDto } from "./dto/update-product.dto";

@Injectable()
export class ProductsDbService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async findAll(page:number, limit:number){
    const start = (page -1) * limit;
    const end = start  +limit;

    const product = await this.productRepository.find({relations: ['category']});
    return product.slice(start, end);

  }

  async findById(id: string){ 
    return await this.productRepository.findOne({where: {id: id}});
  }

  async addProduct(productRecibido){
    const category = await this.categoryRepository.findOne({where: {name: productRecibido.category}})
    const exist = await this.productRepository.findOne({where: {name: productRecibido.name}})
    if(!exist){
      try {
        const product = new Product()
        product.name = productRecibido.name;
        product.description = productRecibido.description;
        product.price = productRecibido.price;
        product.stock = productRecibido.stock;
        product.imgUrl = productRecibido.imgUrl;
        product.category = category;
        console.log(category);
        
        const newProduct = await this.productRepository.save(product)
       return ({message: "producto agregado con exito", newProduct})
      } catch (error) {
        return ({message: "error al agregar producto", error})
      }
    }
    else{
      return ({message: "producto ya existe", exist})
    }
  }

   async updateProduct(id: string, product: Partial<UpdateProductDto>) {
    const exist = await this.productRepository.findOne({ where: { id } });
    if (exist) {
      try {
        console.log("Producto existente:", exist);
        console.log("Producto actualizado:", product);
        const { category, ...productToUpdate } = product
        await this.productRepository.update(id, productToUpdate);
        const updatedProduct = await this.productRepository.findOne({ where: { id } });
        return { message: "Producto actualizado con éxito", updatedProduct };
      } catch (error) {
        throw new Error('Error al actualizar el producto');
      }
    } else {
      throw new Error('Producto no existe');
    }
  }


  async updateProductImg(id, image){
    const exist = await this.productRepository.findOne({where: {id}})
    if(exist){
      try {
        const newProduct = await this.productRepository.update(exist, {imgUrl: image})
        return ({message: "producto actualizado con exito", newProduct})
      } catch (error) {
        return ({message: "error al actualizar imagen", error})
      }
      }else{
        return ({message: "producto no existe"})
      }
    }

  async deleteProduct(id: string){
    const productExist = await this.productRepository.findOne({where: {id}})
    if(productExist){
      try {
        const newProduct = await this.productRepository.delete(productExist)
        return ( `producto eliminado con exito,  ${id}` )
      } catch (error) {
        return ({message: "error al eliminar producto", error})
      }
    }else{
      return ({message: "producto no existe"})
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
          id: uuidv4(),
          name,
          description,
          price,
          stock,
          category,
        });
        try {
          await this.productRepository.save(product);
          console.log(`Product "${name}" inserted successfully.`);
        } catch (error) {
          console.error(`Error insertando el producto "${name}":`, error);
        }
      } else {
        console.log(`Producto "${name}" ya existe en la categoria "${categoryName}", siguiente.`);
      }
    }
    console.log("Precarga completada.");
  }

  

  
}


