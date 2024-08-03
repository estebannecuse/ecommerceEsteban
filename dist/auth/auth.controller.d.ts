import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { Response } from 'express';
import { LoginUserDto } from 'src/users/dtos/LoginUserDTO';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    create(response: Response, user: CreateUserDto): Promise<Response<any, Record<string, any>>>;
    login(user: LoginUserDto): Promise<any>;
}
