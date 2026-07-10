import { Test, TestingModule } from '@nestjs/testing';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';
import { FilmDto, ScheduleDto } from './dto/films.dto';

describe('FilmsController', () => {
  let controller: FilmsController;
  let filmsService: jest.Mocked<FilmsService>;

  const filmDto: FilmDto = {
    id: 'film-1',
    rating: 9,
    director: 'Director',
    tags: ['tag'],
    title: 'Title',
    about: 'About',
    description: 'Description',
    image: '/img.jpg',
    cover: '/cover.jpg',
  };

  const scheduleDto: ScheduleDto = {
    id: 'session-1',
    daytime: '2026-07-10T10:00:24+05:00',
    hall: 0,
    rows: 5,
    seats: 10,
    price: 350,
    taken: [],
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilmsController],
      providers: [
        {
          provide: FilmsService,
          useValue: {
            getFilms: jest.fn(),
            getFilmSchedule: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<FilmsController>(FilmsController);
    filmsService = module.get(FilmsService);
  });

  it('должен быть определён', () => {
    expect(controller).toBeDefined();
  });

  describe('getFilms', () => {
    it('возвращает объект с total и items массивом фильмов', async () => {
      filmsService.getFilms.mockResolvedValue({
        total: 1,
        items: [filmDto],
      });

      const result = await controller.getFilms();

      expect(filmsService.getFilms).toHaveBeenCalledTimes(1);
      expect(result.total).toBe(1);
      expect(result.items).toEqual([filmDto]);
    });

    it('возвращает пустой список, когда фильмов нет', async () => {
      filmsService.getFilms.mockResolvedValue({ total: 0, items: [] });

      const result = await controller.getFilms();

      expect(result.total).toBe(0);
      expect(result.items).toEqual([]);
    });
  });

  describe('getFilmSchedule', () => {
    it('возвращает объект с total и items массивом сеансов для фильма', async () => {
      filmsService.getFilmSchedule.mockResolvedValue({
        total: 1,
        items: [scheduleDto],
      });

      const result = await controller.getFilmSchedule('film-1');

      expect(filmsService.getFilmSchedule).toHaveBeenCalledWith('film-1');
      expect(result.total).toBe(1);
      expect(result.items).toEqual([scheduleDto]);
    });

    it('прокидывает ошибку, если сервис бросает NotFoundException', async () => {
      filmsService.getFilmSchedule.mockRejectedValue(
        new Error('Film not found'),
      );

      await expect(controller.getFilmSchedule('unknown')).rejects.toThrow(
        'Film not found',
      );
    });
  });
});
