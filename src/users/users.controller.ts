import { Controller, Get, Body, Put, Param, Delete, Query, HttpStatus, Res, UseGuards, Post, ParseUUIDPipe, UsePipes, ValidationPipe, Req } from '@nestjs/common';
//import { CreateUserDto } from './dto/create-user.dto';
import { Response } from 'express';
import { AuthGuard } from 'src/auth/Auth/auth.guard';
import { UsersDbService } from './usersDb.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/roles.enum';
import { RolesGuard } from 'src/auth/Auth/roles.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User } from './user.entity';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersDbService: UsersDbService,
    
  ) {}
  
  @ApiBearerAuth()
  @Get('')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  async findAll(@Req() request: Request & {user: Partial<User>},@Res() response: Response, 
  @Query("limit") limit? : number, @Query("page") page?: number) {
    limit = limit?? 5
    page = page?? 1
    const result = await this.usersDbService.getAllUsersDb(+page, +limit);
    return response.status(HttpStatus.OK).json(result);
  }


  @ApiBearerAuth()
  @Get(':id')
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe({transform: true}))
  async findOne(@Res() response: Response,@Param('id', ParseUUIDPipe) id: string) {
    console.log(typeof id);
    const result = await this.usersDbService.findOne(id);    
    return response.status(HttpStatus.OK).json(result);
  }
  

  @ApiBearerAuth()
  @Put(':id')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @UsePipes(new ValidationPipe({transform: true}))
  async update(@Param("id") id: string,@Body() updateUser: CreateUserDto) {
    try {
      const userUpdated = await this.usersDbService.update(id, updateUser);
      return userUpdated;
    } catch (error) {
      console.error('Error updating user:', error);
      throw new Error('Error al actualizar el usuario');
    }
  }


  @ApiBearerAuth()
  @Delete(':id')
  @UseGuards(AuthGuard)
  async remove(@Res() response: Response, @Param('id') id: string) {
    const userToRemove = await this.usersDbService.remove(id);
    return response.status(HttpStatus.OK).json(userToRemove );
  }
}
