import { IsOptional, IsString } from 'class-validator';

export class CreateGoogleMeetDto {
  @IsOptional()
  @IsString()
  startTime: string;

  @IsOptional()
  @IsString()
  timeZone: string;

  @IsOptional()
  @IsString()
  summary: string;

  @IsOptional()
  @IsString()
  endTime: string;
}
