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
exports.OrderController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const ordersDb_service_1 = require("./ordersDb.service");
const auth_guard_1 = require("../auth/Auth/auth.guard");
const swagger_1 = require("@nestjs/swagger");
const create_order_dto_1 = require("./dtos/create-order.dto");
let OrderController = class OrderController {
    constructor(ordersDbService) {
        this.ordersDbService = ordersDbService;
    }
    async addOrder(createOrderDto) {
        const { userId, productIds } = createOrderDto;
        const products = productIds.map(product => product);
        return this.ordersDbService.addOrder(userId, products);
    }
    async getOrder(id) {
        return this.ordersDbService.getOrder(id);
    }
};
exports.OrderController = OrderController;
__decorate([
    (0, common_1.Post)('add'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    openapi.ApiResponse({ status: 201, type: require("./orders.entity").Order }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_order_dto_1.CreateOrderDto]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "addOrder", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    openapi.ApiResponse({ status: 200, type: require("./orders.entity").Order }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "getOrder", null);
exports.OrderController = OrderController = __decorate([
    (0, swagger_1.ApiTags)("Orders"),
    (0, common_1.Controller)('orders'),
    __metadata("design:paramtypes", [ordersDb_service_1.OrdersDbService])
], OrderController);
//# sourceMappingURL=orders.controller.js.map