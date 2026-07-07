import { Injectable, NotFoundException } from '@nestjs/common';
import { FilmsRepository } from '../repository/films.repository';
import { FilmDto, ScheduleDto } from './dto/films.dto';

@Injectable()
export class FilmsService {
  constructor(private readonly filmsRepository: FilmsRepository) {}

  async getFilms(): Promise<{ total: number; items: FilmDto[] }> {
    const films = await this.filmsRepository.findAll();
    const items: FilmDto[] = films.map(
      ({
        id,
        rating,
        director,
        tags,
        title,
        about,
        description,
        image,
        cover,
      }) => ({
        id,
        rating,
        director,
        tags,
        title,
        about,
        description,
        image,
        cover,
      }),
    );
    return { total: items.length, items };
  }

  async getFilmSchedule(
    id: string,
  ): Promise<{ total: number; items: ScheduleDto[] }> {
    const film = await this.filmsRepository.findById(id);
    if (!film) throw new NotFoundException(`Film ${id} not found`);

    const items: ScheduleDto[] = film.schedule.map(
      ({ id, daytime, hall, rows, seats, price, taken }) => ({
        id,
        daytime,
        hall,
        rows,
        seats,
        price,
        taken,
      }),
    );
    return { total: items.length, items };
  }
}
