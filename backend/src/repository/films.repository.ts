import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Film, FilmDocument } from './schemas/film.schema';

@Injectable()
export class FilmsRepository {
  constructor(
    @InjectModel(Film.name) private readonly filmModel: Model<FilmDocument>,
  ) {}

  async findAll(): Promise<Film[]> {
    return this.filmModel.find().lean().exec();
  }

  async findById(id: string): Promise<Film | null> {
    return this.filmModel.findOne({ id }).lean().exec();
  }

  async bookSeat(
    filmId: string,
    sessionId: string,
    seatKey: string,
  ): Promise<void> {
    const result = await this.filmModel.findOneAndUpdate(
      {
        id: filmId,
        schedule: {
          $elemMatch: { id: sessionId, taken: { $ne: seatKey } },
        },
      },
      { $push: { 'schedule.$.taken': seatKey } },
    );

    if (!result) {
      throw new BadRequestException(
        `Seat ${seatKey} is already taken or session not found`,
      );
    }
  }
}
