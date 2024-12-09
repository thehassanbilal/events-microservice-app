import { PartialType } from '@nestjs/mapped-types';
import { CreateLanguageDto } from './create-language.dto';
import { Types } from 'mongoose';

export class UpdateLanguageDto extends PartialType(CreateLanguageDto) {
  id: Types.ObjectId;
}
