import {
  IsEnum,
  IsMongoId,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Types } from 'mongoose';
import { VirtualEventSource } from '../enum/virtual-event-source.enum';

export class UpdateVirtualEventDto {
  @IsMongoId()
  id: Types.ObjectId;

  @IsOptional()
  @IsString()
  meetingId: string;

  @IsOptional()
  @IsEnum(VirtualEventSource)
  source: VirtualEventSource;

  @IsString()
  startTime: string;

  @IsOptional()
  @IsString()
  endTime: string;

  @IsOptional()
  @IsNumber()
  duration: number;

  @IsOptional()
  @IsString()
  timeZone: string;

  @IsOptional()
  @IsString()
  summary: string;
}
