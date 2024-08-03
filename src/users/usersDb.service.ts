import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./user.entity";
import { CreateUserDto } from "./dtos/create-user.dto";
import { log } from "console";

@Injectable()
export class UsersDbService {
    constructor(
        @InjectRepository(User) private usersRepository: Repository<User>,
    ){}
    
    async create(user: Partial<CreateUserDto>) {
        const exist = await this.usersRepository.findOne({ where: { name: user.name, password: user.password } });
        if (exist) {
            throw new BadRequestException('User already exists');
        }

        try {
            const newUser = await this.usersRepository.save(user);
            return { message: "User added successfully", newUser };
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    async getAllUsersDb(page:number, limit:number): Promise <Partial<User>[]> {
       const start = (page -1) * limit;
       const end = start  +limit;

        const users = await this.usersRepository.find();

        const usersPaginado = users.slice(start,end)
        
        console.log("users paginado : ",usersPaginado);
        
        const usersSliced = usersPaginado.map(user => {
          const { password, isAdmin, ...userWithoutPassword } = user;
          
          return userWithoutPassword;
        });
    
        return usersSliced;
      }

      async findByName(name: string) {
        try {
            const user = await this.usersRepository.findOne({ where: { name } });
            if (!user) {
                throw new NotFoundException(`User with name ${name} not found`);
            }
            const { password, ...userWithoutPassword } = user;
            return userWithoutPassword;
        } catch (error) {
            throw new NotFoundException(error.message);
        }
    }

    async findOne(id: string) {
        try {
            const user = await this.usersRepository.findOne({ where: { id } });
            if (!user) {
                throw new NotFoundException(`User with id ${id} not found`);
            }
            const { password, ...userWithoutPassword } = user;
            return userWithoutPassword;
        } catch (error) {
            throw new NotFoundException(error.message);
        }
    }

    async update(id, updateUser: CreateUserDto){
        try {
            const { confirmPassword, ...userToUpdate } = updateUser
             const userUpdated = await this.usersRepository.update(id, userToUpdate)           
             return id
        } catch (error) {
            return ({message: error})
        }
    }
    
    async remove(id: string) {
        try {
            const exist = await this.usersRepository.findOne({where: {id}})
            if(exist){
                await this.usersRepository.delete(id)
                return id
            }else{
                return ({message: 'User not found'})
            }
        } catch (error) {
            return ({message: error})
        }
    }
    
    async login(email){
        const userLogin =  await this.usersRepository.find({where:{email:email}})
        if(userLogin.length > 0){
            return userLogin[0]
        }else{
            return null
        }
    }

}