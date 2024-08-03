import { Response } from 'express';
import { UsersDbService } from './usersDb.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from './user.entity';
export declare class UsersController {
    private readonly usersDbService;
    constructor(usersDbService: UsersDbService);
    findAll(request: Request & {
        user: Partial<User>;
    }, response: Response, limit?: number, page?: number): Promise<Response<any, Record<string, any>>>;
    findOne(response: Response, id: string): Promise<Response<any, Record<string, any>>>;
    update(id: string, updateUser: CreateUserDto): Promise<any>;
    remove(response: Response, id: string): Promise<Response<any, Record<string, any>>>;
}
