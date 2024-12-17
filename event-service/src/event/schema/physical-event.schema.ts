import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';

export type PhysicalEventDocument = HydratedDocument<PhysicalEvent>;

@Schema({
  timestamps: true,
  versionKey: false,
  toJSON: {
    transform: (doc, ret) => {
      delete ret.event;
      delete ret.updatedAt;
      delete ret.deletedAt;
    },
  },
})
export class PhysicalEvent {
  @Prop({ required: true, type: MongooseSchema.Types.ObjectId })
  event: MongooseSchema.Types.ObjectId;

  @Prop()
  venue: string;

  @Prop({ type: [MongooseSchema.Types.ObjectId] })
  attendees: MongooseSchema.Types.ObjectId[];

  @Prop({ default: null })
  deletedAt: Date;
}

export const PhysicalEventSchema = SchemaFactory.createForClass(PhysicalEvent);
