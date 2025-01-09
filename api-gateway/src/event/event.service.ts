import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { Types } from 'mongoose';
import { UpdateVirtualEventDto } from './dto/update-virtual-event.dto';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { PaginationDto } from 'src/global/paginated.dto';
import { UpdatePhysicalEventDto } from './dto/update-physical-event.dto';

@Injectable()
export class EventService {
  constructor(
    @Inject('EVENT_SERVICE') private readonly eventProxyClient: ClientKafka,
  ) {}

  // Event CRUD Operations

  async createEvent(eventDto: CreateEventDto) {
    console.log('here is the createEvent eventDto', eventDto);
    return await this.eventProxyClient.send('createEvent', eventDto);
  }

  async updateEvent(id: Types.ObjectId, eventDto: UpdateEventDto) {
    const reply = await this.eventProxyClient.send('updateEvent', {
      id,
      ...eventDto,
    });
    return reply;
  }

  async getAllEvents() {
    const reply = await this.eventProxyClient.send('findAllEvents', {});
    return reply;
  }

  async getPaginatedAndFilteredEvents(paginationDto: PaginationDto) {
    const reply = await this.eventProxyClient.send(
      'paginateEvents',
      paginationDto,
    );

    return reply;
  }

  async getEventById(id: Types.ObjectId) {
    const reply = await this.eventProxyClient.send('findOneEvent', { id });
    return reply;
  }

  async deleteEvent(id: Types.ObjectId) {
    return await this.eventProxyClient.send('deleteEvent', { id });
  }

  // Virtual Event CRUD Operations
  async createVirtualEvent(eventDto: CreateEventDto) {
    const reply = await this.eventProxyClient.send(
      'createVirtualEvent',
      eventDto,
    );
    return reply;
  }

  async getAllVirtualEvents() {
    return this.eventProxyClient.send('findAllVirtualEvents', {});
  }

  async getVirtualEventById(id: Types.ObjectId) {
    return this.eventProxyClient.send('findOneVirtualEvent', { id });
  }

  async getPaginatedAndFilteredVirtualEvents(paginationDto: PaginationDto) {
    const reply = await this.eventProxyClient.send(
      'paginatedAndFilteredVirtualEvents',
      {
        paginationDto,
      },
    );
    return reply;
  }

  async updateVirtualEvent(
    id: Types.ObjectId,
    eventDto: UpdateVirtualEventDto,
  ) {
    return this.eventProxyClient.send('updateVirtualEvent', {
      id,
      ...eventDto,
    });
  }

  async deleteVirtualEvent(id: Types.ObjectId) {
    return this.eventProxyClient.send('deleteVirtualEvent', { id });
  }

  // Physical Event CRUD Operations
  async createPhysicalEvent(eventDto: any) {
    return this.eventProxyClient.send('createPhysicalEvent', eventDto);
  }

  async getAllPhysicalEvents() {
    return this.eventProxyClient.send('findAllPhysicalEvents', {});
  }

  async getPhysicalEventById(id: Types.ObjectId) {
    return this.eventProxyClient.send('findOnePhysicalEvent', { id });
  }

  async updatePhysicalEvent(
    id: Types.ObjectId,
    eventDto: UpdatePhysicalEventDto,
  ) {
    return this.eventProxyClient.send('updatePhysicalEvent', {
      id,
      ...eventDto,
    });
  }

  async deletePhysicalEvent(id: Types.ObjectId) {
    return this.eventProxyClient.send('deletePhysicalEvent', { id });
  }
}
