import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { OrderDto, OrderResultItemDto } from './dto/order.dto';

describe('OrderController', () => {
  let controller: OrderController;
  let orderService: jest.Mocked<OrderService>;

  const orderDto: OrderDto = {
    email: 'user@example.com',
    phone: '+7921234567',
    tickets: [
      {
        film: 'film-1',
        session: 'session-1',
        daytime: '2024-06-28T10:00:53+03:00',
        row: 1,
        seat: 1,
        price: 350,
      },
    ],
  };

  const orderResultItem: OrderResultItemDto = {
    id: 'order-1',
    film: 'film-1',
    session: 'session-1',
    daytime: '2026-07-10T10:00:24+05:00',
    row: 1,
    seat: 1,
    price: 350,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [
        {
          provide: OrderService,
          useValue: {
            createOrder: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<OrderController>(OrderController);
    orderService = module.get(OrderService);
  });

  it('должен быть определён', () => {
    expect(controller).toBeDefined();
  });

  describe('createOrder', () => {
    it('возвращает объект с total и items массивом созданных заказов', async () => {
      orderService.createOrder.mockResolvedValue({
        total: 1,
        items: [orderResultItem],
      });

      const result = await controller.createOrder(orderDto);

      expect(orderService.createOrder).toHaveBeenCalledWith(orderDto);
      expect(result.total).toBe(1);
      expect(result.items).toEqual([orderResultItem]);
    });

    it('прокидывает ошибку при неудачной попытке бронирования', async () => {
      orderService.createOrder.mockRejectedValue(
        new Error('Seat is already taken'),
      );

      await expect(controller.createOrder(orderDto)).rejects.toThrow(
        'Seat is already taken',
      );
    });
  });
});
