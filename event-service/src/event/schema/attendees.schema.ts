import { Prop, Schema } from '@nestjs/mongoose';

export type AttendeesDocument = Attendees & Document;

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
export class Attendees {
  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  phone: string;
}
