import { Controller, Body, Param } from '@nestjs/common';
import { EventService } from './event.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller('events/physical')
export class PhysicalEventController {
  constructor(private readonly eventService: EventService) {}

  @MessagePattern('event.physical.created')
  async createPhysicalEvent(@Body() eventDto: any) {
    return this.eventService.createPhysicalEvent(eventDto);
  }

  @MessagePattern('event.physical.get.all')
  async getAllPhysicalEvents() {
    return this.eventService.getAllPhysicalEvents();
  }

  @MessagePattern('event.physical.get')
  async getPhysicalEventById(@Param('id') id: string) {
    return this.eventService.getPhysicalEventById(id);
  }

  @MessagePattern('event.physical.update')
  async updatePhysicalEvent(@Param('id') id: string, @Body() eventDto: any) {
    return this.eventService.updatePhysicalEvent(id, eventDto);
  }

  @MessagePattern('event.physical.delete')
  async deletePhysicalEvent(@Param('id') id: string) {
    return this.eventService.deletePhysicalEvent(id);
  }
}
