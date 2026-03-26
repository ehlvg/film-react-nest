import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { FilmsRepository } from '../repository/films.repository';
import { OrderDto, OrderResultItemDto } from './dto/order.dto';

@Injectable()
export class OrderService {
  constructor(private readonly filmsRepository: FilmsRepository) {}

  async createOrder(
    orderDto: OrderDto,
  ): Promise<{ total: number; items: OrderResultItemDto[] }> {
    const items: OrderResultItemDto[] = [];

    for (const ticket of orderDto.tickets) {
      const film = await this.filmsRepository.findById(ticket.film);
      if (!film) throw new NotFoundException(`Film ${ticket.film} not found`);

      const session = film.schedule.find((s) => s.id === ticket.session);
      if (!session)
        throw new NotFoundException(`Session ${ticket.session} not found`);

      const seatKey = `${ticket.row}:${ticket.seat}`;
      await this.filmsRepository.bookSeat(ticket.film, ticket.session, seatKey);

      items.push({
        id: randomUUID(),
        film: ticket.film,
        session: ticket.session,
        daytime: session.daytime,
        row: ticket.row,
        seat: ticket.seat,
        price: session.price,
      });
    }

    return { total: items.length, items };
  }
}
