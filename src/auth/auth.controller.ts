import { BadRequestException, Body, Controller, HttpStatus, Post, Res, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { DateAdderInterceptor } from 'src/users/interceptors/date-adder/date-adder.interceptor';
import { Response } from 'express';
import { LoginUserDto } from 'src/users/dtos/LoginUserDTO';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("Auth")
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService
  ) {}

  @Post('signup')
  @UseInterceptors(DateAdderInterceptor)
  async create(@Res() response: Response, @Body()user: CreateUserDto) {
    if(user.confirmPassword !== user.password){
      throw new BadRequestException({message: "Contrasenas no coinciden"})
    }
    try {
      console.log("controller input", user);
      const result = await this.authService.signUp(user);
      return response.status(HttpStatus.CREATED).json(result);
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }

  @Post('signin')
  async login(@Body() user: LoginUserDto){
    const {email, password} = user
    try {
      const result = await this.authService.signIn(email, password);
      return result;
    } catch (error) {
      return error.message;
    }
  }
}