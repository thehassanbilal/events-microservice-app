import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  Document,
  HydratedDocument,
  Schema as MongooseSchema,
  Types,
} from 'mongoose';
import { EventCategory } from 'src/event-category/schema/event-category.schema';
import { EventTeam } from 'src/event-team/schema/event-team.schema';
import { EventStatus } from '../enum/event-status.enum';
import { EventTypeEnum } from '../enum/event-type-enum';

export type EventDocument = HydratedDocument<Event>;

@Schema({
  timestamps: true,
  versionKey: false,
  toJSON: {
    transform: (doc, ret) => {
      delete ret.updatedAt;
      delete ret.deletedAt;
    },
  },
})
export class Event extends Document {
  @Prop({ required: true, enum: EventTypeEnum, immutable: true })
  eventType: EventTypeEnum;

  @Prop()
  title: string;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: EventTeam.name,
  })
  team: MongooseSchema.Types.ObjectId;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: EventCategory.name,
  })
  category: MongooseSchema.Types.ObjectId;

  @Prop()
  startDate: Date;

  @Prop()
  endDate: Date;

  @Prop()
  timezone: string;

  @Prop({
    type: [Types.ObjectId],
  })
  languages: Types.ObjectId[];

  @Prop({
    type: [{ from: { type: String }, to: { type: String } }],
    default: [],
  })
  breaks: { from: string; to: string }[];

  @Prop({
    enum: EventStatus,
    default: EventStatus.DRAFT,
  })
  status: EventStatus;

  @Prop({ default: null })
  deletedAt: Date;
}

export const EventSchema = SchemaFactory.createForClass(Event);
