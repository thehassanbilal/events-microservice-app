import { Controller, Param } from '@nestjs/common';
import { EventService } from './event.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Types } from 'mongoose';
import { UpdatePhysicalEventDto } from './dto/update-physical-event.dto';

@Controller('events/physical')
export class PhysicalEventController {
  constructor(private readonly eventService: EventService) {}

  @MessagePattern('findAllPhysicalEvents')
  async getAllPhysicalEvents() {
    return this.eventService.getAllPhysicalEvents();
  }

  @MessagePattern('findOnePhysicalEvent')
  async getPhysicalEventById(@Param('id') id: Types.ObjectId) {
    return this.eventService.getPhysicalEventById(id);
  }

  @MessagePattern('updatePhysicalEvent')
  async updatePhysicalEvent(@Payload() eventDto: UpdatePhysicalEventDto) {
    return this.eventService.updatePhysicalEventByEvent(eventDto);
  }

  @MessagePattern('deletePhysicalEvent')
  async deletePhysicalEvent(@Param('id') id: Types.ObjectId) {
    return this.eventService.deletePhysicalEvent(id);
  }
}
