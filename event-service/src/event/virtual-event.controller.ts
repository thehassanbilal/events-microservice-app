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

@Controller('events/virtual')
export class VirtualEventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  async createVirtualEvent(@Body() eventDto: any) {
    return this.eventService.createVirtualEvent(eventDto);
  }

  @Get()
  async getAllVirtualEvents() {
    return this.eventService.getAllVirtualEvents();
  }

  @Get(':id')
  async getVirtualEventById(@Param('id') id: string) {
    return this.eventService.getVirtualEventById(id);
  }

  @Put(':id')
  async updateVirtualEvent(@Param('id') id: string, @Body() eventDto: any) {
    return this.eventService.updateVirtualEvent(id, eventDto);
  }

  @Delete(':id')
  async deleteVirtualEvent(@Param('id') id: string) {
    return this.eventService.deleteVirtualEvent(id);
  }
}
