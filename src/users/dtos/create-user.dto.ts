
import { IsString, IsEmail, IsNotEmpty, Length, IsStrongPasswordOptions, IsStrongPassword, IsNumber, IsEmpty} from 'class-validator';

const strongPasswordOptions: IsStrongPasswordOptions = {
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  };

export class CreateUserDto {
    
  
    /**
     * @description: "este es el nombre del usuario"
     * @example: "esteban"
     */

    @IsNotEmpty()
    @IsString()
    @Length(3,80)
    name: string;

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    @Length(8,15)
    
    @IsStrongPassword(strongPasswordOptions)
    password: string;

    @IsNotEmpty()
    confirmPassword: string;

    @IsNotEmpty()
    @IsNumber()
    phone: number;

    @IsNotEmpty()
    @IsString()
    @Length(5,20)
    country: string;

    @IsNotEmpty()
    @IsString()
    address: string;

    @IsNotEmpty()
    @IsString()
    @Length(5,20)
    city: string;
}

