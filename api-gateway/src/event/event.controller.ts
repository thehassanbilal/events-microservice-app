import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { EventService } from './event.service';
import { Types } from 'mongoose';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { PaginationDto } from 'src/global/paginated.dto';

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  async createEvent(@Body() eventDto: CreateEventDto) {
    console.log('here is the createEvent eventDto in controller', eventDto);
    return this.eventService.createEvent(eventDto);
  }

  @Get()
  async getAllEvents() {
    return this.eventService.getAllEvents();
  }

  @Get('paginated')
  async getPaginatedAndFilteredEvents(@Body() paginationDto: PaginationDto) {
    console.log(
      'here is the getPaginatedAndFilteredEvents paginationDto in controller',
      paginationDto,
    );
    return this.eventService.getPaginatedAndFilteredEvents(paginationDto);
  }

  @Get(':id')
  async getEventById(@Param('id') id: Types.ObjectId) {
    return this.eventService.getEventById(id);
  }

  @Put(':id')
  async updateEvent(
    @Param('id') id: Types.ObjectId,
    @Body() eventDto: UpdateEventDto,
  ) {
    return this.eventService.updateEvent(id, eventDto);
  }

  @Delete(':id')
  async deleteEvent(@Param('id') id: Types.ObjectId) {
    return this.eventService.deleteEvent(id);
  }
}
