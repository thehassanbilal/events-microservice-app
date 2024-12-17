import { IsArray, IsEnum, IsMongoId, IsOptional } from 'class-validator';
import { Types } from 'mongoose';
import { EventStatus } from '../enum/event-status.enum';

export class UpdateEventDto {
  @IsMongoId()
  id: Types.ObjectId;

  @IsMongoId()
  @IsOptional()
  team: Types.ObjectId;

  @IsMongoId()
  @IsOptional()
  category: Types.ObjectId;

  @IsArray()
  @IsMongoId({ each: true })
  @IsOptional()
  languages: Types.ObjectId[];

  @IsOptional()
  breaks: { from: string; to: string }[];

  @IsEnum(EventStatus)
  @IsOptional()
  status: EventStatus;
}
