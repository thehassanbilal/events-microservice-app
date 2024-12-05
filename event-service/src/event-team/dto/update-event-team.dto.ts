import { PartialType } from '@nestjs/mapped-types';
import { CreateEventTeamDto } from './create-event-team.dto';
import { Types } from 'mongoose';

export class UpdateEventTeamDto extends PartialType(CreateEventTeamDto) {
  id: Types.ObjectId;
}
