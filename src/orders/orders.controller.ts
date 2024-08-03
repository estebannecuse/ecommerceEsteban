import { Body, Controller, Get, HttpStatus, Param, ParseUUIDPipe, Post, Res, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { OrdersDbService } from "./ordersDb.service";
import { Order } from "./orders.entity";
import { AuthGuard } from "src/auth/Auth/auth.guard";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { CreateOrderDto } from "./dtos/create-order.dto";
import { Response } from 'express';


@ApiTags("Orders")
@Controller('orders')
export class OrderController{
    constructor(private readonly ordersDbService: OrdersDbService){}

@ApiBearerAuth()
@Post('add')
@UseGuards(AuthGuard)
async addOrder(@Res() response: Response, @Body() createOrderDto: CreateOrderDto): Promise<any> {
    try {
        const { userId, productIds } = createOrderDto;
        const products = productIds.map(product => product);
        const order = await this.ordersDbService.addOrder(userId, products);
        return response.status(HttpStatus.OK).json(order);
    } catch (error) {
        console.error(error);
        return response.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
}
    
    @Get(':id')
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @UsePipes(new ValidationPipe({transform: true}))
  async getOrder(@Param('id', ParseUUIDPipe) id: string): Promise<Order> {
    return this.ordersDbService.getOrder(id);
}}
