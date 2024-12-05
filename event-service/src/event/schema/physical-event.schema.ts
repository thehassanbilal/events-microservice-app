import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { EventCategory } from 'src/event-category/schema/event-category.schema';
import { EventTeam } from 'src/event-team/schema/event-team.schema';
import { EventStatus } from '../enum/event-status.enum';

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
  title: string;

  @Prop({ required: true })
  venue: string;

  @Prop({ type: [String], required: true })
  attendees: string[];

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

  @Prop({ required: true })
  startDate: Date;

  @Prop({ required: true })
  endDate: Date;

  @Prop({ type: [String], required: true })
  languages: string[];

  @Prop({ required: true })
  timezone: string;

  @Prop({ type: [{ from: String, to: String }] })
  breaks: { from: string; to: string }[];

  @Prop({ enum: EventStatus, default: EventStatus.DRAFT })
  status: EventStatus;

  @Prop()
  deletedAt: Date;
}

export const PhysicalEventSchema = SchemaFactory.createForClass(PhysicalEvent);
