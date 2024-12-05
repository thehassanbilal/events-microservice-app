import { PartialType } from '@nestjs/mapped-types';
import { CreateEventCategoryDto } from './create-event-category.dto';
import { Types } from 'mongoose';

export class UpdateEventCategoryDto extends PartialType(
  CreateEventCategoryDto,
) {
  id: Types.ObjectId;
}
