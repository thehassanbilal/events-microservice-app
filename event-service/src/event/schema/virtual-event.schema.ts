import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type VirtualEventDocument = HydratedDocument<VirtualEvent>;

@Schema({ timestamps: true })
export class VirtualEvent {
  @Prop({ required: true })
  eventType: string; // Fixed value: "virtual"

  @Prop({ required: true })
  url: string; // URL for virtual events

  @Prop({ required: true })
  meetingId: string;

  @Prop({ required: true })
  passcode: string;

  @Prop({ required: true })
  source: string; // e.g., ZOOM

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

export const VirtualEventSchema = SchemaFactory.createForClass(VirtualEvent);
