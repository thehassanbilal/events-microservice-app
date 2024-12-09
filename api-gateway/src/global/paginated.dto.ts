import { IsNumber, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { SortOrder } from 'mongoose';

export class PaginationDto {
  @IsNumber()
  @Transform(({ value }) => parseInt(value, 10))
  page: number;

  @IsNumber()
  @Transform(({ value }) => parseInt(value, 10))
  limit: number;

  sort?:
    | string
    | { [key: string]: SortOrder | { $meta: any } }
    | [string, SortOrder][];

  @IsString()
  filter?: string;
}
