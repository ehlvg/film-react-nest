import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Schedule } from './schedule.entity';

@Entity()
export class Film {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @Column({ type: 'double precision', default: 0 })
  rating: number;

  @Column({ type: 'varchar', length: 255 })
  director: string;

  @Column({ type: 'varchar', length: 255, array: true, default: [] })
  tags: string[];

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'text' })
  about: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'varchar', length: 255 })
  image: string;

  @Column({ type: 'varchar', length: 255 })
  cover: string;

  @OneToMany(() => Schedule, (schedule) => schedule.film, {
    cascade: true,
    eager: true,
  })
  schedule: Schedule[];
}
