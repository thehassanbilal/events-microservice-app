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

  @Prop({
    type: [
      {
        name: { type: String, required: true },
        role: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String },
        department: { type: String },
        isActive: { type: Boolean, default: true },
        joinedAt: { type: Date, default: Date.now },
      },
    ],
    default: [],
  })
  members: {
    name: string;
    role: string;
    email: string;
    phone?: string;
    department?: string;
    isActive?: boolean;
    joinedAt?: Date;
  }[];

  @Prop({
    type: {
      teamLead: { type: String },
      contactEmail: { type: String },
      contactPhone: { type: String },
      maxMembers: { type: Number, default: 10 },
      isActive: { type: Boolean, default: true },
    },
    default: {},
  })
  teamInfo: {
    teamLead?: string;
    contactEmail?: string;
    contactPhone?: string;
    maxMembers?: number;
    isActive?: boolean;
  };

  @Prop({ default: null })
  deletedAt: Date;
}

export const EventTeamSchema = SchemaFactory.createForClass(EventTeam);
