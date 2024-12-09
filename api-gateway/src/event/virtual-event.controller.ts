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
import { UpdateVirtualEventDto } from './dto/update-virtual-event.dto';

@Controller('event/virtual')
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
  async getVirtualEventById(@Param('id') id: Types.ObjectId) {
    return this.eventService.getVirtualEventById(id);
  }

  @Put(':id')
  async updateVirtualEvent(
    @Param('id') id: Types.ObjectId,
    @Body() eventDto: UpdateVirtualEventDto,
  ) {
    return this.eventService.updateVirtualEvent(id, eventDto);
  }

  @Delete(':id')
  async deleteVirtualEvent(@Param('id') id: Types.ObjectId) {
    return this.eventService.deleteVirtualEvent(id);
  }
}
