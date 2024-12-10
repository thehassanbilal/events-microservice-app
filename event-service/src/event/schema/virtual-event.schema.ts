import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { VirtualEventSource } from '../enum/virtualEventSource.enum';

export type VirtualEventDocument = HydratedDocument<VirtualEvent>;

@Schema({
  timestamps: true,
  versionKey: false,
  toJSON: {
    transform: (doc, ret) => {
      delete ret.updatedAt;
      delete ret.event;
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
  url: string;

  @Prop()
  meetingId: string;

  @Prop()
  passcode: string;
}

export const VirtualEventSchema = SchemaFactory.createForClass(VirtualEvent);
