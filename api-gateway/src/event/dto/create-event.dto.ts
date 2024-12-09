import { IsEnum } from 'class-validator';
import { EventTypeEnum } from '../enum/event-type-enum';

export class CreateEventDto {
  @IsEnum(EventTypeEnum)
  eventType: EventTypeEnum;
}
