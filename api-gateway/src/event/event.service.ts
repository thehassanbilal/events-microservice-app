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
      'createVirtualEvent',
      'findAllVirtualEvents',
      'findOneVirtualEvent',
      'updateVirtualEvent',
      'deleteVirtualEvent',

      'createPhysicalEvent',
      'findAllPhysicalEvents',
      'findOnePhysicalEvent',
      'updatePhysicalEvent',
      'deletePhysicalEvent',
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
      'createVirtualEvent',
      eventDto,
    );
    return reply.toPromise();
  }

  async getAllVirtualEvents() {
    return this.eventProxyClient.send('findAllVirtualEvents', {});
  }

  async getVirtualEventById(id: Types.ObjectId) {
    return this.eventProxyClient.send('findOneVirtualEvent', { id });
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

  async updatePhysicalEvent(id: Types.ObjectId, eventDto: any) {
    return this.eventProxyClient.send('updatePhysicalEvent', {
      id,
      ...eventDto,
    });
  }

  async deletePhysicalEvent(id: Types.ObjectId) {
    return this.eventProxyClient.send('deletePhysicalEvent', { id });
  }
}
