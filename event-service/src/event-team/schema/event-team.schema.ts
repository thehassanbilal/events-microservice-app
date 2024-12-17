import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type EventTeamDocument = EventTeam & Document;

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
export class EventTeam {
  @Prop({
    required: true,
    unique: true,
  })
  name: string;

  @Prop()
  description: string;

  @Prop({ default: null })
  deletedAt: Date;
}

export const EventTeamSchema = SchemaFactory.createForClass(EventTeam);
