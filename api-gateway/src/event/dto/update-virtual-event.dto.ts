import { IsEnum, IsOptional, IsString } from 'class-validator';
import { VirtualEventSource } from '../enum/virtual-event-source.enum';

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
  @IsEnum(VirtualEventSource)
  source: VirtualEventSource;
}
