import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ _id: false })
export class ScheduleItem {
  @Prop({ required: true }) id: string;
  @Prop() daytime: string;
  @Prop() hall: number;
  @Prop() rows: number;
  @Prop() seats: number;
  @Prop() price: number;
  @Prop({ type: [String], default: [] }) taken: string[];
}

export const ScheduleItemSchema = SchemaFactory.createForClass(ScheduleItem);

@Schema({ versionKey: false })
export class Film {
  @Prop({ required: true }) id: string;
  @Prop() rating: number;
  @Prop() director: string;
  @Prop({ type: [String] }) tags: string[];
  @Prop() title: string;
  @Prop() about: string;
  @Prop() description: string;
  @Prop() image: string;
  @Prop() cover: string;
  @Prop({ type: [ScheduleItemSchema], default: [] }) schedule: ScheduleItem[];
}

export type FilmDocument = Film & Document;
export const FilmSchema = SchemaFactory.createForClass(Film);
