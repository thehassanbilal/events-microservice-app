import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdatePhysicalEventDto {
  @IsOptional()
  @IsString()
  venue: string;

  @IsOptional()
  @IsString()
  startTime: string;

  @IsOptional()
  @IsNumber()
  duration: number;
}
