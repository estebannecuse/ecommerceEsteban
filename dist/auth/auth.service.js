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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const usersDb_service_1 = require("../users/usersDb.service");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    constructor(userDbService, jwtService) {
        this.userDbService = userDbService;
        this.jwtService = jwtService;
    }
    async signUp(user) {
        const userSignUp = await this.userDbService.login(user.email);
        if (userSignUp) {
            console.log("veo si entra en el if");
            console.log(userSignUp);
            throw new common_1.BadRequestException("Email already exists");
        }
        const hashedPassword = await bcrypt.hash(user.password, 10);
        if (!hashedPassword) {
            throw new common_1.BadRequestException("Password not hashed");
        }
        const result = await this.userDbService.create({ ...user, password: hashedPassword });
        if (!result.newUser) {
            throw new common_1.BadRequestException(result.message);
        }
        const { password, ...userWithOutPass } = result.newUser;
        return userWithOutPass;
    }
    async signIn(email, password) {
        const user = await this.userDbService.login(email);
        if (!user) {
            throw new common_1.BadRequestException("User or password not valid");
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new common_1.BadRequestException("User or password not valid");
        }
        else {
            const payload = { email: user.email, id: user.id, sub: user.id, roles: user.isAdmin ? ["Admin"] : ["User"] };
            const token = await this.jwtService.sign(payload);
            return { success: "User logged in succesfully", token };
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [usersDb_service_1.UsersDbService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map