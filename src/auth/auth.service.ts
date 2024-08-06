import { BadRequestException, Body, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { UsersDbService } from 'src/users/usersDb.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Role } from 'src/roles.enum';

@Injectable()
export class AuthService {
  constructor( private readonly userDbService: UsersDbService,
    private readonly jwtService: JwtService
   ){}

  async signUp(user: Partial<CreateUserDto>) {
    const userSignUp = await this.userDbService.login(user.email);

    if (userSignUp) {
      console.log("veo si entra en el if");
      console.log(userSignUp);
      throw new BadRequestException("Email already exists");
    }
    const hashedPassword = await bcrypt.hash(user.password, 10);
    if (!hashedPassword) {
      throw new BadRequestException("Password not hashed");
    }
    const result = await this.userDbService.create({ ...user, password: hashedPassword });

    if (!result.newUser) {
      throw new BadRequestException(result.message);
    }

    const { password, confirmPassword, ...userWithOutPass } = result.newUser;
    return userWithOutPass;
  }


  
  async signIn(email: string, password: string){
    const user = await this.userDbService.login(email);
    if (!user) {
      throw new BadRequestException("User or password not valid");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new BadRequestException("User or password not valid");
    }else{
      const payload = { email: user.email, id: user.id, sub: user.id, roles: user.isAdmin ? ["Admin"] : ["User"] };
      const token = await this.jwtService.sign(payload);
      return {success: "User logged in succesfully", token};
    }
  }
}
