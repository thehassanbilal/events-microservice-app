import { Controller, Body, Param } from '@nestjs/common';
import { EventService } from './event.service';
import { MessagePattern } from '@nestjs/microservices';
import { Types } from 'mongoose';

@Controller('events/physical')
export class PhysicalEventController {
  constructor(private readonly eventService: EventService) {}

  @MessagePattern('event.physical.create')
  async createPhysicalEvent(@Body() eventDto: any) {
    return this.eventService.createPhysicalEvent(eventDto);
  }

  @MessagePattern('event.physical.get.all')
  async getAllPhysicalEvents() {
    return this.eventService.getAllPhysicalEvents();
  }

  @MessagePattern('event.physical.getById')
  async getPhysicalEventById(@Param('id') id: Types.ObjectId) {
    return this.eventService.getPhysicalEventById(id);
  }

  @MessagePattern('event.physical.updateById')
  async updatePhysicalEvent(
    @Param('id') id: Types.ObjectId,
    @Body() eventDto: any,
  ) {
    return this.eventService.updatePhysicalEvent(id, eventDto);
  }

  @MessagePattern('event.physical.deleteById')
  async deletePhysicalEvent(@Param('id') id: Types.ObjectId) {
    return this.eventService.deletePhysicalEvent(id);
  }
}
