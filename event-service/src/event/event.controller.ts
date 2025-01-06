import { Controller } from '@nestjs/common';
import { EventService } from './event.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Types } from 'mongoose';
import { UpdateEventDto } from './dto/update-event.dto';
import { PaginationDto } from 'src/global/pagination.dto';
import { CreateEventDto } from './dto/create-event.dto';

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @MessagePattern('createEvent')
  async createEvent(@Payload() eventDto: CreateEventDto) {
    console.log('here is the createEvent eventDto in controller', eventDto);
    return this.eventService.createEvent(eventDto);
  }

  @MessagePattern('findAllEvents')
  async getAllEvents() {
    console.log('here is the getAllEvents in controller');
    return this.eventService.getAllEvents();
  }

  @MessagePattern('findOneEvent')
  async getEventById(@Payload('id') id: Types.ObjectId) {
    return this.eventService.getEventById(id);
  }

  @MessagePattern('paginateEvents')
  async getPaginatedAndFilteredEvents(@Payload() paginationDto: PaginationDto) {
    console.log('here is the paginationDto in event service', paginationDto);
    return this.eventService.getPaginatedAndFilteredEvents(paginationDto);
  }

  @MessagePattern('updateEvent')
  async updateEvent(@Payload() eventDto: UpdateEventDto) {
    return this.eventService.updateEvent(eventDto);
  }

  @MessagePattern('deleteEvent')
  async deleteEvent(@Payload('id') id: Types.ObjectId) {
    return this.eventService.deleteEvent(id);
  }
}
