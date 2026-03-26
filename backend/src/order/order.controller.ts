import { Body, Controller, Post } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderDto, OrderResultItemDto } from './dto/order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  createOrder(
    @Body() orderDto: OrderDto,
  ): Promise<{ total: number; items: OrderResultItemDto[] }> {
    return this.orderService.createOrder(orderDto);
  }
}
