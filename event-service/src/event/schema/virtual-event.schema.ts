import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { EventStatus } from '../enum/event-status.enum';

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

  @Prop({ type: [{ from: String, to: String }] })
  breaks: { from: string; to: string }[];

  @Prop({ enum: EventStatus, default: EventStatus.DRAFT })
  status: string;
}

export const VirtualEventSchema = SchemaFactory.createForClass(VirtualEvent);
