import { Controller, FileTypeValidator, MaxFileSizeValidator, NotFoundException, Param, ParseFilePipe, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesDbService } from './filesDb.service';
import { ProductsDbService } from 'src/products/productsDb.service';
import { ApiBody, ApiConsumes, ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags("Files")
@Controller('files')
export class FilesController {
  constructor(
    private readonly filesDbService: FilesDbService, 
    private readonly productsDbService: ProductsDbService
  ) {}

  @Put('/uploadImage/:id')
  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        image: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  async updateImg(@Param('id')id: string,
  @UploadedFile( 
    new ParseFilePipe({validators:[
     new MaxFileSizeValidator({maxSize:200000, message:'file must be 200kb max'}),
      new FileTypeValidator({fileType: /(jpg|jpeg|png|webp)$/})
    ]})
  ) image: Express.Multer.File) {
    const product = await this.productsDbService.findById(id);
    if (!product) {
      throw new NotFoundException({ message: 'Producto no encontrado' });
    } else {
      const img = (await this.filesDbService.uploadImage(image)).secure_url;
      
      const updatedProduct = await this.productsDbService.updateProductImg(id, img);
      return updatedProduct;

    }
  }

  
}