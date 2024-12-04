import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { EventStatus } from '../enum/event-status.enum';
import { VirtualEventSource } from '../enum/virtualEventSource.enum';

export type VirtualEventDocument = HydratedDocument<VirtualEvent>;

@Schema({
  timestamps: true,
  versionKey: false,
  toJSON: {
    transform: (doc, ret) => {
      delete ret.updatedAt;
    },
  },
})
export class VirtualEvent {
  @Prop({ required: true, default: 'virtual' })
  eventType: string;

  @Prop()
  url: string;

  @Prop()
  meetingId: string;

  @Prop()
  passcode: string;

  @Prop({
    enum: VirtualEventSource,
  })
  source: VirtualEventSource;

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
  status: EventStatus;

  @Prop()
  deletedAt: Date;
}

export const VirtualEventSchema = SchemaFactory.createForClass(VirtualEvent);
