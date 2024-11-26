import {
  IsDate,
  IsMongoId,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Types } from 'mongoose';

export class UpdateVirtualEventDto {
  @IsMongoId()
  id: Types.ObjectId;

  @IsOptional()
  @IsString()
  url: string;

  @IsOptional()
  @IsString()
  meetingId: string;

  @IsOptional()
  @IsString()
  passcode: string;

  @IsOptional()
  @IsString()
  source: string;

  @IsOptional()
  @IsString()
  team: string;

  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  category: string;

  @IsOptional()
  @IsDate()
  startDate: Date;

  @IsOptional()
  @IsDate()
  endDate: Date;

  @IsOptional()
  @IsString({ each: true })
  languages: string[];

  @IsOptional()
  @IsString()
  timezone: string;

  @IsOptional()
  @IsNumber()
  numberOfBreaks: number;

  @IsOptional()
  breaks: { from: string; to: string }[];
}
