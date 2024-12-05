import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { EventStatus } from '../enum/event-status.enum';
import { VirtualEventSource } from '../enum/virtualEventSource.enum';
import { EventTeam } from 'src/event-team/schema/event-team.schema';
import { EventCategory } from 'src/event-category/schema/event-category.schema';

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
  title: string;

  @Prop()
  startDate: Date;

  @Prop()
  endDate: Date;

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

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: EventTeam.name,
  })
  team: mongoose.Schema.Types.ObjectId;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: EventCategory.name,
  })
  category: mongoose.Schema.Types.ObjectId;

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
