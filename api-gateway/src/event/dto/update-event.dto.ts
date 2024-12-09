import {
  IsDate,
  IsEnum,
  IsMongoId,
  IsOptional,
  IsString,
} from 'class-validator';
import { Types } from 'mongoose';
import { EventStatus } from '../enum/event-status.enum';

export class UpdateEventDto {
  @IsString()
  @IsOptional()
  title: string;

  @IsMongoId()
  @IsOptional()
  team: Types.ObjectId;

  @IsMongoId()
  @IsOptional()
  category: Types.ObjectId;

  @IsDate()
  @IsOptional()
  startDate: Date;

  @IsDate()
  @IsOptional()
  endDate: Date;

  @IsString({ each: true })
  @IsOptional()
  languages: string[];

  @IsString()
  @IsOptional()
  timezone: string;

  @IsOptional()
  breaks: { from: string; to: string }[];

  @IsEnum(EventStatus)
  @IsOptional()
  status: EventStatus;
}
