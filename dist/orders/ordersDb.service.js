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
exports.OrdersDbService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const orders_entity_1 = require("./orders.entity");
const user_entity_1 = require("../users/user.entity");
const product_entity_1 = require("../products/product.entity");
const orderDetails_entity_1 = require("../orderDetails/orderDetails.entity");
let OrdersDbService = class OrdersDbService {
    constructor(ordersRepository, usersRepository, productsRepository) {
        this.ordersRepository = ordersRepository;
        this.usersRepository = usersRepository;
        this.productsRepository = productsRepository;
    }
    async addOrder(userId, productIds) {
        const user = await this.usersRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new Error("User not found");
        }
        for (const productId of productIds) {
            const product = await this.productsRepository.findOne({ where: { id: productId } });
            if (!product) {
                throw new Error(`Product with id ${productId} not found`);
            }
        }
        let total = 0;
        const orderDetails = [];
        for (const productId of productIds) {
            const product = await this.productsRepository.findOne({
                where: { id: productId },
                relations: ['category'],
            });
            if (product && product.stock > 0) {
                product.stock -= 1;
                await this.productsRepository.save(product);
                const orderDetail = new orderDetails_entity_1.OrderDetails();
                orderDetail.products = product;
                orderDetail.price = Number(product.price);
                orderDetails.push(orderDetail);
                total += Number(product.price);
            }
        }
        const order = new orders_entity_1.Order();
        order.user = user;
        order.total = parseFloat(total.toFixed(2));
        order.date = new Date().toLocaleString();
        order.orderDetails = orderDetails;
        console.log(order);
        console.log(order);
        return this.ordersRepository.save(order);
    }
    async getOrder(orderId) {
        const order = await this.ordersRepository.findOne({ where: { id: orderId },
            relations: ['user', 'orderDetails'],
        });
        console.log(order.orderDetails);
        if (!order) {
            throw new Error("Order not found");
        }
        return order;
    }
};
exports.OrdersDbService = OrdersDbService;
exports.OrdersDbService = OrdersDbService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(orders_entity_1.Order)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(2, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], OrdersDbService);
//# sourceMappingURL=ordersDb.service.js.map