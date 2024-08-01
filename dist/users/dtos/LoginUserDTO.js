"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginUserDto = void 0;
const create_user_dto_1 = require("./create-user.dto");
const swagger_1 = require("@nestjs/swagger");
class LoginUserDto extends (0, swagger_1.PickType)(create_user_dto_1.CreateUserDto, ['email', 'password']) {
}
exports.LoginUserDto = LoginUserDto;
//# sourceMappingURL=LoginUserDTO.js.map