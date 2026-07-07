import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Film } from './entities/film.entity';
import { Schedule } from './entities/schedule.entity';

@Injectable()
export class FilmsRepository {
  constructor(
    @InjectRepository(Film) private readonly filmRepository: Repository<Film>,
    @InjectRepository(Schedule)
    private readonly scheduleRepository: Repository<Schedule>,
  ) {}

  async findAll(): Promise<Film[]> {
    return this.filmRepository.find();
  }

  async findById(id: string): Promise<Film | null> {
    return this.filmRepository.findOne({
      where: { id },
      relations: { schedule: true },
    });
  }

  async bookSeat(
    filmId: string,
    sessionId: string,
    seatKey: string,
  ): Promise<void> {
    const session = await this.scheduleRepository.findOne({
      where: { id: sessionId, filmId },
    });

    if (!session) {
      throw new BadRequestException(
        `Seat ${seatKey} is already taken or session not found`,
      );
    }

    if (session.taken.includes(seatKey)) {
      throw new BadRequestException(`Seat ${seatKey} is already taken`);
    }

    const result = await this.scheduleRepository.update(
      { id: sessionId, filmId },
      { taken: [...session.taken, seatKey] },
    );

    if (result.affected === 0) {
      throw new BadRequestException(
        `Seat ${seatKey} is already taken or session not found`,
      );
    }
  }
}
