import { IsString } from 'class-validator';

export class CreateEventGroupDto {
  @IsString()
  name: string;

  @IsString()
  description: string;
}
