import { Controller, Body, Param } from '@nestjs/common';
import { EventService } from './event.service';
import { MessagePattern } from '@nestjs/microservices';
import { UpdateVirtualEventDto } from './dto/update-virtual-event.dto';
import { Types } from 'mongoose';

@Controller('events/virtual')
export class VirtualEventController {
  constructor(private readonly eventService: EventService) {}

  @MessagePattern('event.virtual.create')
  async createVirtualEvent(@Body() eventDto: any) {
    return this.eventService.createVirtualEvent(eventDto);
  }

  @MessagePattern('event.virtual.get.all')
  async getAllVirtualEvents() {
    return this.eventService.getAllVirtualEvents();
  }

  @MessagePattern('event.virtual.getById')
  async getVirtualEventById(@Body() body: any) {
    const { id } = body;
    return this.eventService.getVirtualEventById(id);
  }

  @MessagePattern('event.virtual.updateById')
  async updateVirtualEvent(
    @Param('id') id: Types.ObjectId,
    @Body() eventDto: UpdateVirtualEventDto,
  ) {
    return this.eventService.updateVirtualEvent(id, eventDto);
  }

  @MessagePattern('event.virtual.deleteById')
  async deleteVirtualEvent(@Param('id') id: Types.ObjectId) {
    return this.eventService.deleteVirtualEvent(id);
  }
}
