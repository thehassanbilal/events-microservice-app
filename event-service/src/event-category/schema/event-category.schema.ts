import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type EventCategoryDocument = EventCategory & Document;

@Schema({
  timestamps: true,
  versionKey: false,
  toJSON: {
    transform: (doc, ret) => {
      delete ret.updatedAt;
      delete ret.deletedAt;
    },
  },
})
export class EventCategory {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ default: null })
  deletedAt: Date;
}

export const EventCategorySchema = SchemaFactory.createForClass(EventCategory);
