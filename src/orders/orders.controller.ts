import { Body, Controller, Get, Param, ParseUUIDPipe, Post, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { OrdersDbService } from "./ordersDb.service";
import { Order } from "./orders.entity";
import { AuthGuard } from "src/auth/Auth/auth.guard";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { CreateOrderDto } from "./dtos/create-order.dto";

@ApiTags("Orders")
@Controller('orders')
export class OrderController{
    constructor(private readonly ordersDbService: OrdersDbService){}

    @Post('add')
    @UseGuards(AuthGuard)
    async addOrder(@Body() createOrderDto:CreateOrderDto ): Promise<Order>{
            const {userId, productIds} = createOrderDto;
            const products = productIds.map(product => product);
            return this.ordersDbService.addOrder(userId,products)
    }

    
    @Get(':id')
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @UsePipes(new ValidationPipe({transform: true}))
  async getOrder(@Param('id', ParseUUIDPipe) id: string): Promise<Order> {
    return this.ordersDbService.getOrder(id);
}}


// {userId: string; products: {id:string} []}