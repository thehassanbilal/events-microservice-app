import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
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
}

export const VirtualEventSchema = SchemaFactory.createForClass(VirtualEvent);
