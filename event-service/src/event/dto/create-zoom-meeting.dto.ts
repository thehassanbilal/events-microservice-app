import { IsString, IsOptional, IsNumber, IsBoolean } from 'class-validator';

export class CreateZoomMeetingDto {
  @IsString()
  topic: string;

  @IsNumber()
  type: number;

  @IsString()
  start_time: string;

  @IsNumber()
  duration: number;

  @IsString()
  timezone: string;

  @IsOptional()
  @IsString()
  password?: string;

  @IsOptional()
  @IsString()
  agenda?: string;

  @IsOptional()
  settings?: ZoomMeetingSettingsDto;
}

class ZoomMeetingSettingsDto {
  @IsOptional()
  @IsBoolean()
  host_video?: boolean;

  @IsOptional()
  @IsBoolean()
  participant_video?: boolean;

  @IsOptional()
  @IsBoolean()
  join_before_host?: boolean;

  @IsOptional()
  @IsBoolean()
  mute_upon_entry?: boolean;

  @IsOptional()
  @IsBoolean()
  watermark?: boolean;

  @IsOptional()
  @IsString()
  audio?: string;

  @IsOptional()
  @IsString()
  auto_recording?: string;

  @IsOptional()
  @IsBoolean()
  waiting_room?: boolean;
}
