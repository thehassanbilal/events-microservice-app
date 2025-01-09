import { IsOptional, IsString } from 'class-validator';

export class UpdatePhysicalEventDto {
  @IsOptional()
  @IsString()
  venue: string;
}
