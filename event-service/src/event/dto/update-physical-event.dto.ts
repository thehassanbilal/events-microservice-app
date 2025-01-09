import { IsMongoId, IsNumber, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class UpdatePhysicalEventDto {
  @IsMongoId()
  id: Types.ObjectId;

  @IsOptional()
  @IsString()
  venue: string;

  @IsOptional()
  @IsString()
  startTime: Date;

  @IsOptional()
  @IsNumber()
  duration: number;
}
