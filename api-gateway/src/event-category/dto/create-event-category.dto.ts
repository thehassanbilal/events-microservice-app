import { IsString } from 'class-validator';

export class CreateEventCategoryDto {
  @IsString()
  name: string;

  @IsString()
  description: string;
}
