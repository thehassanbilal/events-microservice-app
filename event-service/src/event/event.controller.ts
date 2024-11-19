import { Controller } from '@nestjs/common';
import { EventService } from './event.service';
import { EventPattern } from '@nestjs/microservices';

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @EventPattern('create_event')
  handleEventCreated(data: any) {
    console.log('Event created', data);
  }
}
