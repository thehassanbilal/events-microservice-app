import { PartialType } from '@nestjs/mapped-types';
import { CreateEventGroupDto } from './create-event-group.dto';
import { Types } from 'mongoose';

export class UpdateEventGroupDto extends PartialType(CreateEventGroupDto) {
  id: Types.ObjectId;
}
