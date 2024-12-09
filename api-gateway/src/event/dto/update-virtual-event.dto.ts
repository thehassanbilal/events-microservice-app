import { IsOptional, IsString } from 'class-validator';

export class UpdateVirtualEventDto {
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
}
