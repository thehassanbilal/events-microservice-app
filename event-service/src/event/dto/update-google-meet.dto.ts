import { IsOptional, IsString } from 'class-validator';

export class UpdateGoogleMeetDto {
  @IsOptional()
  @IsString()
  startTime: string;

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
