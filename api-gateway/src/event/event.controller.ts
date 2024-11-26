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

@Controller('events')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  // Virtual Event CRUD Operations
  @Post('virtual')
  async createVirtualEvent(@Body() eventDto: any) {
    return this.eventService.createVirtualEvent(eventDto);
  }

  @Get('virtual')
  async getAllVirtualEvents() {
    return this.eventService.getAllVirtualEvents();
  }

  @Get('virtual/:id')
  async getVirtualEventById(@Param('id') id: Types.ObjectId) {
    return this.eventService.getVirtualEventById(id);
  }

  @Put('virtual/:id')
  async updateVirtualEvent(
    @Param('id') id: Types.ObjectId,
    @Body() eventDto: UpdateVirtualEventDto,
  ) {
    return this.eventService.updateVirtualEvent(id, eventDto);
  }

  @Delete('virtual/:id')
  async deleteVirtualEvent(@Param('id') id: Types.ObjectId) {
    return this.eventService.deleteVirtualEvent(id);
  }

  // Physical Event CRUD Operations
  @Post('physical')
  async createPhysicalEvent(@Body() eventDto: any) {
    return this.eventService.createPhysicalEvent(eventDto);
  }

  @Get('physical')
  async getAllPhysicalEvents() {
    return this.eventService.getAllPhysicalEvents();
  }

  @Get('physical/:id')
  async getPhysicalEventById(@Param('id') id: Types.ObjectId) {
    return this.eventService.getPhysicalEventById(id);
  }

  @Put('physical/:id')
  async updatePhysicalEvent(
    @Param('id') id: Types.ObjectId,
    @Body() eventDto: any,
  ) {
    return this.eventService.updatePhysicalEvent(id, eventDto);
  }

  @Delete('physical/:id')
  async deletePhysicalEvent(@Param('id') id: Types.ObjectId) {
    return this.eventService.deletePhysicalEvent(id);
  }
}
