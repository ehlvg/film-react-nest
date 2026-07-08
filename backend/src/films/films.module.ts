import { Module } from '@nestjs/common';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';
import { FilmsRepository } from '../repository/films.repository';
import { DatabaseModule } from '../repository/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [FilmsController],
  providers: [FilmsService, FilmsRepository],
  exports: [FilmsRepository],
})
export class FilmsModule {}
