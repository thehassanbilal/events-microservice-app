import { IsEnum, IsMongoId, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';
import { VirtualEventSource } from '../enum/virtual-event-source.enum';

export class UpdateVirtualEventDto {
  @IsMongoId()
  id: Types.ObjectId;

  @IsString()
  startTime: string;

  @IsOptional()
  @IsString()
  meetingId: string;

  @IsOptional()
  @IsEnum(VirtualEventSource)
  source: VirtualEventSource;

  @IsOptional()
  @IsString()
  endTime: string;

  @IsOptional()
  @IsString()
  timeZone: string;

  @IsOptional()
  @IsString()
  summary: string;
}
