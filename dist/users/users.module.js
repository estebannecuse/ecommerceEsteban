"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersModule = void 0;
const common_1 = require("@nestjs/common");
const users_controller_1 = require("./users.controller");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./user.entity");
const usersDb_service_1 = require("./usersDb.service");
const product_entity_1 = require("../products/product.entity");
const orders_entity_1 = require("../orders/orders.entity");
const orderDetails_entity_1 = require("../orderDetails/orderDetails.entity");
let UsersModule = class UsersModule {
};
exports.UsersModule = UsersModule;
exports.UsersModule = UsersModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([user_entity_1.User]), product_entity_1.Product, orders_entity_1.Order, orderDetails_entity_1.OrderDetails],
        controllers: [users_controller_1.UsersController],
        providers: [usersDb_service_1.UsersDbService],
        exports: [usersDb_service_1.UsersDbService]
    })
], UsersModule);
//# sourceMappingURL=users.module.js.map