import { IsString } from 'class-validator';

export class CreateEventTeamDto {
  @IsString()
  name: string;

  @IsString()
  description: string;
}
