import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { EventCategory } from '../../event-category/schema/event-category.schema';
import { EventTeam } from '../../event-team/schema/event-team.schema';
import { EventStatus } from '../enum/event-status.enum';
import { EventTypeEnum } from '../enum/event-type-enum';
import { Language } from '../../language/schema/language.schema';

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

  @Prop({ required: true, default: 'New Event' })
  title: string;

  @Prop({ required: true, default: 'Some description for the event' })
  description: string;

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

  @Prop({
    type: [MongooseSchema.Types.ObjectId],
    ref: Language.name,
  })
  languages: MongooseSchema.Types.ObjectId[];

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
