import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type EventGroupDocument = EventGroup & Document;

@Schema({
  timestamps: true,
  versionKey: false,
  toJSON: {
    transform: (doc, ret) => {
      delete ret.updatedAt;
    },
  },
})
export class EventGroup {
  @Prop({
    required: true,
    unique: true,
  })
  name: string;

  @Prop()
  description: string;

  @Prop()
  deletedAt: Date;
}

export const EventGroupSchema = SchemaFactory.createForClass(EventGroup);
