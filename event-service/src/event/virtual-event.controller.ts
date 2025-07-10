import { Controller } from '@nestjs/common';
import { EventService } from './event.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UpdateVirtualEventDto } from './dto/update-virtual-event.dto';
import { Types } from 'mongoose';
import { PaginationDto } from '../global/pagination.dto';

@Controller('events/virtual')
export class VirtualEventController {
  constructor(private readonly eventService: EventService) {}

  @MessagePattern('findAllVirtualEvents')
  async getAllVirtualEvents() {
    return this.eventService.getAllVirtualEvents();
  }

  @MessagePattern('paginatedAndFilteredVirtualEvents')
  async getPaginatedAndFilteredVirtualEvents(
    @Payload() paginationDto: PaginationDto,
  ) {
    return this.eventService.getPaginatedAndFilteredVirtualEvents(
      paginationDto,
    );
  }

  @MessagePattern('findOneVirtualEvent')
  async getVirtualEventById(@Payload('id') id: Types.ObjectId) {
    return this.eventService.getVirtualEventById(id);
  }

  @MessagePattern('updateVirtualEvent')
  async updateVirtualEvent(@Payload() eventDto: UpdateVirtualEventDto) {
    return this.eventService.updateVirtualEventByEvent(eventDto);
  }

  @MessagePattern('deleteVirtualEvent')
  async deleteVirtualEvent(@Payload('id') id: Types.ObjectId) {
    return this.eventService.deleteVirtualEvent(id);
  }
}
