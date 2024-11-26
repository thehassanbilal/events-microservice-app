import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type VirtualEventDocument = HydratedDocument<VirtualEvent>;

@Schema({ timestamps: true })
export class VirtualEvent {
  @Prop()
  eventType: string; // Fixed value: "virtual"

  @Prop()
  url: string; // URL for virtual events

  @Prop()
  meetingId: string;

  @Prop()
  passcode: string;

  @Prop()
  source: string; // e.g., ZOOM

  // Common fields
  @Prop()
  team: string;

  @Prop()
  title: string;

  @Prop()
  category: string;

  @Prop()
  startDate: Date;

  @Prop()
  endDate: Date;

  @Prop({ type: [String], required: true })
  languages: string[];

  @Prop()
  timezone: string;

  @Prop({ type: Number, default: 0 })
  numberOfBreaks: number;

  @Prop({ type: [{ from: String, to: String }] })
  breaks: { from: string; to: string }[];
}

export const VirtualEventSchema = SchemaFactory.createForClass(VirtualEvent);
