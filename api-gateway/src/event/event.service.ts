import {
  Inject,
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { Types } from 'mongoose';
import { UpdateVirtualEventDto } from './dto/update-virtual-event.dto';

@Injectable()
export class EventService implements OnModuleInit, OnModuleDestroy {
  constructor(
    @Inject('EVENT_SERVICE') private readonly eventProxyClient: ClientKafka,
  ) {}

  async onModuleInit() {
    const requestPatterns = [
      'event.virtual.create',
      'event.virtual.get.all',
      'event.virtual.getById',
      'event.virtual.updateById',
      'event.virtual.deleteById',

      'event.physical.create',
      'event.physical.get.all',
      'event.physical.getById',
      'event.physical.updateById',
      'event.physical.deleteById',
    ];

    requestPatterns.forEach((pattern) => {
      this.eventProxyClient.subscribeToResponseOf(pattern);
    });

    await this.eventProxyClient.connect();
  }

  onModuleDestroy() {
    this.eventProxyClient.close();
  }

  async createVirtualEvent(eventDto: any) {
    const reply = await this.eventProxyClient.send(
      'event.virtual.create',
      eventDto,
    );
    return reply.toPromise();
  }

  async getAllVirtualEvents() {
    return this.eventProxyClient.send('event.virtual.get.all', {});
  }

  async getVirtualEventById(id: Types.ObjectId) {
    return this.eventProxyClient.send('event.virtual.getById', { id });
  }

  async updateVirtualEvent(
    id: Types.ObjectId,
    eventDto: UpdateVirtualEventDto,
  ) {
    console.log('here is data', eventDto);
    return this.eventProxyClient.send('event.virtual.updateById', {
      id,
      ...eventDto,
    });
  }

  async deleteVirtualEvent(id: Types.ObjectId) {
    return this.eventProxyClient.send('event.virtual.deleteById', { id });
  }

  // Physical Event CRUD Operations
  async createPhysicalEvent(eventDto: any) {
    return this.eventProxyClient.send('event.created.physical', eventDto);
  }

  async getAllPhysicalEvents() {
    return this.eventProxyClient.send('event.get.all.physical', {});
  }

  async getPhysicalEventById(id: Types.ObjectId) {
    return this.eventProxyClient.send('event.get.physical', { id });
  }

  async updatePhysicalEvent(id: Types.ObjectId, eventDto: any) {
    return this.eventProxyClient.send('event.updated.physical', {
      id,
      ...eventDto,
    });
  }

  async deletePhysicalEvent(id: Types.ObjectId) {
    return this.eventProxyClient.send('event.deleted.physical', { id });
  }
}
