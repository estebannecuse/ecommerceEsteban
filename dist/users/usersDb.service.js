"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersDbService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./user.entity");
let UsersDbService = class UsersDbService {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async create(user) {
        const exist = await this.usersRepository.findOne({ where: { name: user.name, password: user.password } });
        if (exist) {
            throw new common_1.BadRequestException('User already exists');
        }
        try {
            const newUser = await this.usersRepository.save(user);
            return { message: "User added successfully", newUser };
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async getAllUsersDb(page, limit) {
        const start = (page - 1) * limit;
        const end = start + limit;
        const users = await this.usersRepository.find();
        const usersPaginado = users.slice(start, end);
        console.log("users paginado : ", usersPaginado);
        const usersSliced = usersPaginado.map(user => {
            const { password, isAdmin, ...userWithoutPassword } = user;
            return userWithoutPassword;
        });
        return usersSliced;
    }
    async findByName(name) {
        try {
            const user = await this.usersRepository.findOne({ where: { name } });
            if (!user) {
                throw new common_1.NotFoundException(`User with name ${name} not found`);
            }
            const { password, ...userWithoutPassword } = user;
            return userWithoutPassword;
        }
        catch (error) {
            throw new common_1.NotFoundException(error.message);
        }
    }
    async findOne(id) {
        try {
            const user = await this.usersRepository.findOne({ where: { id } });
            if (!user) {
                throw new common_1.NotFoundException(`User with id ${id} not found`);
            }
            const { password, ...userWithoutPassword } = user;
            return userWithoutPassword;
        }
        catch (error) {
            throw new common_1.NotFoundException(error.message);
        }
    }
    async update(id, updateUser) {
        try {
            const { confirmPassword, ...userToUpdate } = updateUser;
            const userUpdated = await this.usersRepository.update(id, userToUpdate);
            return id;
        }
        catch (error) {
            return ({ message: error });
        }
    }
    async remove(id) {
        try {
            const exist = await this.usersRepository.findOne({ where: { id } });
            if (exist) {
                await this.usersRepository.delete(id);
                return id;
            }
            else {
                return ({ message: 'User not found' });
            }
        }
        catch (error) {
            return ({ message: error });
        }
    }
    async login(email) {
        const userLogin = await this.usersRepository.find({ where: { email: email } });
        if (userLogin.length > 0) {
            return userLogin[0];
        }
        else {
            return null;
        }
    }
};
exports.UsersDbService = UsersDbService;
exports.UsersDbService = UsersDbService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsersDbService);
//# sourceMappingURL=usersDb.service.js.map