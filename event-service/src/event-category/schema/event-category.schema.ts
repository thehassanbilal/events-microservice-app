import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type EventCategoryDocument = EventCategory & Document;

@Schema({
  timestamps: true,
  versionKey: false,
})
export class EventCategory {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop()
  description: string;
}

export const EventCategorySchema = SchemaFactory.createForClass(EventCategory);
