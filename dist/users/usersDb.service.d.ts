import { Repository } from "typeorm";
import { User } from "./user.entity";
import { CreateUserDto } from "./dtos/create-user.dto";
export declare class UsersDbService {
    private usersRepository;
    constructor(usersRepository: Repository<User>);
    create(user: Partial<CreateUserDto>): Promise<{
        message: string;
        newUser: Partial<CreateUserDto> & User;
    }>;
    getAllUsersDb(page: number, limit: number): Promise<Partial<User>[]>;
    findByName(name: string): Promise<{
        id: string;
        name: string;
        email: string;
        phone: number;
        country: string;
        address: string;
        city: string;
        isAdmin: boolean;
        orders: import("../orders/orders.entity").Order[];
    }>;
    findOne(id: string): Promise<{
        id: string;
        name: string;
        email: string;
        phone: number;
        country: string;
        address: string;
        city: string;
        isAdmin: boolean;
        orders: import("../orders/orders.entity").Order[];
    }>;
    update(id: any, updateUserDto: CreateUserDto): Promise<import("typeorm").UpdateResult | {
        message: any;
    }>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
    login(email: any): Promise<User>;
}
