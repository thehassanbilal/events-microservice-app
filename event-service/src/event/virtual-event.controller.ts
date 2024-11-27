import { Controller, Param } from '@nestjs/common';
import { EventService } from './event.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UpdateVirtualEventDto } from './dto/update-virtual-event.dto';
import { Types } from 'mongoose';

@Controller('events/virtual')
export class VirtualEventController {
  constructor(private readonly eventService: EventService) {}

  @MessagePattern('createVirtualEvent')
  async createVirtualEvent(@Payload() eventDto: any) {
    return this.eventService.createVirtualEvent(eventDto);
  }

  @MessagePattern('findAllVirtualEvents')
  async getAllVirtualEvents() {
    return this.eventService.getAllVirtualEvents();
  }

  @MessagePattern('findOneVirtualEvent')
  async getVirtualEventById(@Param('id') id: Types.ObjectId) {
    return this.eventService.getVirtualEventById(id);
  }

  @MessagePattern('updateVirtualEvent')
  async updateVirtualEvent(@Payload() eventDto: UpdateVirtualEventDto) {
    return this.eventService.updateVirtualEvent(eventDto);
  }

  @MessagePattern('deleteVirtualEvent')
  async deleteVirtualEvent(@Param('id') id: Types.ObjectId) {
    return this.eventService.deleteVirtualEvent(id);
  }
}
