import { Controller, Body, Param, Inject } from '@nestjs/common';
import { EventService } from './event.service';
import { ClientKafka, MessagePattern } from '@nestjs/microservices';

@Controller('events/virtual')
export class VirtualEventController {
  constructor(
    private readonly eventService: EventService,
    @Inject('EVENT_SERVICE') private readonly eventProxyClient: ClientKafka,
  ) {}

  onModuleDestroy() {
    throw new Error('Method not implemented.');
  }

  @MessagePattern('event.virtual.create')
  async createVirtualEvent(@Body() eventDto: any) {
    return this.eventService.createVirtualEvent(eventDto);
  }

  @MessagePattern('event.virtual.get.all')
  async getAllVirtualEvents() {
    return this.eventService.getAllVirtualEvents();
  }

  @MessagePattern('event.virtual.get')
  async getVirtualEventById(@Param('id') id: string) {
    return this.eventService.getVirtualEventById(id);
  }

  @MessagePattern('event.virtual.updated')
  async updateVirtualEvent(@Param('id') id: string, @Body() eventDto: any) {
    return this.eventService.updateVirtualEvent(id, eventDto);
  }

  @MessagePattern('event.virtual.deleted')
  async deleteVirtualEvent(@Param('id') id: string) {
    return this.eventService.deleteVirtualEvent(id);
  }
}
