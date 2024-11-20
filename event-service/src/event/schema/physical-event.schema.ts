import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PhysicalEventDocument = HydratedDocument<PhysicalEvent>;

@Schema({ timestamps: true })
export class PhysicalEvent {
  @Prop({ required: true })
  eventType: string; // Fixed value: "Physical"

  @Prop({ required: true })
  venue: string; // Venue for physical events

  @Prop({ type: [String], required: true })
  attendees: string[]; // Array of attendee IDs or names

  // Common fields
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
}

export const PhysicalEventSchema = SchemaFactory.createForClass(PhysicalEvent);
