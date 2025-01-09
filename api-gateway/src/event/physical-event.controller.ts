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
import { UpdatePhysicalEventDto } from './dto/update-physical-event.dto';

@Controller('physical')
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
  async getPhysicalEventById(@Param('id') id: Types.ObjectId) {
    return this.eventService.getPhysicalEventById(id);
  }

  @Put(':id')
  async updatePhysicalEvent(
    @Param('id') id: Types.ObjectId,
    @Body() eventDto: UpdatePhysicalEventDto,
  ) {
    return this.eventService.updatePhysicalEvent(id, eventDto);
  }

  @Delete(':id')
  async deletePhysicalEvent(@Param('id') id: Types.ObjectId) {
    return this.eventService.deletePhysicalEvent(id);
  }
}
