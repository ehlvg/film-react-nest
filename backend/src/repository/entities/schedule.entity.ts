import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Film } from './film.entity';

@Entity()
export class Schedule {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @Column({ name: 'filmId', type: 'uuid' })
  filmId: string;

  @ManyToOne(() => Film, (film) => film.schedule, {
    onDelete: 'CASCADE',
  })
  film: Film;

  @Column({ type: 'varchar', length: 255 })
  daytime: string;

  @Column({ type: 'integer', default: 0 })
  hall: number;

  @Column({ name: 'rows', type: 'integer', default: 0 })
  rows: number;

  @Column({ type: 'integer', default: 0 })
  seats: number;

  @Column({ type: 'integer', default: 0 })
  price: number;

  @Column({ type: 'varchar', length: 255, array: true, default: [] })
  taken: string[];
}
