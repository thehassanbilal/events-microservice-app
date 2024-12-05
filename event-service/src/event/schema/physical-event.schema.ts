import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PhysicalEventDocument = HydratedDocument<PhysicalEvent>;

@Schema({
  timestamps: true,
  versionKey: false,
  toJSON: {
    transform: (doc, ret) => {
      delete ret.updatedAt;
    },
  },
})
export class PhysicalEvent {
  @Prop({ required: true })
  venue: string;

  @Prop({ type: [String], required: true })
  attendees: string[];
}

export const PhysicalEventSchema = SchemaFactory.createForClass(PhysicalEvent);
