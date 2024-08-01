import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Query, Res, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { ProductsDbService } from "./productsDb.service";
import { Response } from 'express';
import { FileInterceptor } from "@nestjs/platform-express";
import { CloudinaryService } from "src/cloudinary/cloudinary.service";
import { AuthGuard } from "src/auth/Auth/auth.guard";
import { Roles } from "src/decorators/roles.decorator";
import { RolesGuard } from "src/auth/Auth/roles.guard";
import { Role } from "src/roles.enum";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";


@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsDbService: ProductsDbService,
    private readonly cloudinaryService: CloudinaryService
  ) {}


  @Get('seeder')
  async seedProducts(){
    try {
      await this.productsDbService.seedProducts();
      return { message: 'Products seeded successfully' };
      
    } catch (error) {
      return { message: 'Error seeding products' + error };
    }
  }

  @Get('')
    async findAll(@Res() response: Response,
    @Query("limit") limit? : number, @Query("page") page?: number){
      try {
        const products =  await this.productsDbService.findAll(+page, +limit);
        return response.status(HttpStatus.OK).json(products)
      } catch (error) {
        return {message: "Error al obtener los productos", error}
      }
    }

    @Get(':id')
    async findById(@Res() response: Response, @Param('id') id: string){
      try {
        const product = await this.productsDbService.findById(id);
        return response.status(HttpStatus.OK).json(product)
      } catch (error) {
        return {message: "Error al obtener el producto", error}
      }
    }

    @Post('add')
    async addProduct(@Res() response: Response,@Body() product: {name: string}){
      try {
        const newProduct = await this.productsDbService.addProduct(product);
        return response.status(HttpStatus.OK).json(newProduct)
      } catch (error) {
        return {message: "Error al agregar el producto", error}
      }
    }
    
    @Post('upload')
    @UseInterceptors(FileInterceptor('image'))
    uploadFile(@UploadedFile() file: Express.Multer.File){
      return this.cloudinaryService.uploadImage(file);
    }

    @ApiBearerAuth()
    @Put('/:id')
    @UseGuards(AuthGuard)
    @Roles(Role.Admin)
    @UseGuards(AuthGuard, RolesGuard)
    async updateProduct(@Res() response: Response, @Body() product: {id: string}){
      try {
        const updatedProduct = await this.productsDbService.updateProduct(product);
        return response.status(HttpStatus.OK).json(updatedProduct)
      } catch (error) {
        return {message: "Error al actualizar el producto", error}
      }
    }

    @Delete('delete')
    async deleteProduct(@Res() response: Response, @Body() product: {id: string}){
      try {
        const deletedProduct = await this.productsDbService.deleteProduct(product);
        return response.status(HttpStatus.OK).json(deletedProduct)
      } catch (error) {
        return {message: "Error al eliminar el producto", error}
      }
    }


}

