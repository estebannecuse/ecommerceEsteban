import { IsNotEmpty, IsString } from "class-validator"

export class CreateProductDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    price: number;

    @IsNotEmpty()
    stock: number;

    @IsNotEmpty()
    @IsString()
    imgUrl: string;

    @IsNotEmpty()
    @IsString()
    category: string;
}
