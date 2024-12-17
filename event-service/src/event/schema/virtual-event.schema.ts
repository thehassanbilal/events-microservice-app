import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { VirtualEventSource } from '../enum/virtual-event-source.enum';

export type VirtualEventDocument = HydratedDocument<VirtualEvent>;

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
export class VirtualEvent {
  @Prop({ required: true, type: MongooseSchema.Types.ObjectId })
  event: MongooseSchema.Types.ObjectId;

  @Prop({
    enum: VirtualEventSource,
  })
  source: VirtualEventSource;

  @Prop()
  meetingId: string;

  @Prop({ default: null })
  deletedAt: Date;
}

export const VirtualEventSchema = SchemaFactory.createForClass(VirtualEvent);
