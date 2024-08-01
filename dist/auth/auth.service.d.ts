import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { UsersDbService } from 'src/users/usersDb.service';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private readonly userDbService;
    private readonly jwtService;
    constructor(userDbService: UsersDbService, jwtService: JwtService);
    signUp(user: Partial<CreateUserDto>): Promise<{
        name: string;
        email: string;
        confirmPassword?: string;
        phone: number;
        country: string;
        address: string;
        city: string;
        isAdmin: boolean;
        id: string;
        orders: import("../orders/orders.entity").Order[];
    }>;
    signIn(email: string, password: string): Promise<{
        success: string;
        token: string;
    }>;
}
