import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { EventService } from './event.service';

@Controller('events/physical')
export class PhysicalEventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  async createPhysicalEvent(@Body() eventDto: any) {
    return this.eventService.createPhysicalEvent(eventDto);
  }

  @Get()
  async getAllPhysicalEvents() {
    return this.eventService.getAllPhysicalEvents();
  }

  @Get(':id')
  async getPhysicalEventById(@Param('id') id: string) {
    return this.eventService.getPhysicalEventById(id);
  }

  @Put(':id')
  async updatePhysicalEvent(@Param('id') id: string, @Body() eventDto: any) {
    return this.eventService.updatePhysicalEvent(id, eventDto);
  }

  @Delete(':id')
  async deletePhysicalEvent(@Param('id') id: string) {
    return this.eventService.deletePhysicalEvent(id);
  }
}
