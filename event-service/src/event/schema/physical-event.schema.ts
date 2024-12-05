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
  @Prop({ required: true, default: 'physical' })
  eventType: string;

  @Prop({ required: true })
  venue: string;

  @Prop({ type: [String], required: true })
  attendees: string[];

  @Prop({ required: true })
  team: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  category: string;

  @Prop({ required: true })
  startDate: Date;

  @Prop({ required: true })
  endDate: Date;

  @Prop({ type: [String], required: true })
  languages: string[];

  @Prop({ required: true })
  timezone: string;

  @Prop({ type: Number, default: 0 })
  numberOfBreaks: number;

  @Prop({ type: [{ from: String, to: String }] })
  breaks: { from: string; to: string }[];

  @Prop()
  deletedAt: Date;
}

export const PhysicalEventSchema = SchemaFactory.createForClass(PhysicalEvent);
