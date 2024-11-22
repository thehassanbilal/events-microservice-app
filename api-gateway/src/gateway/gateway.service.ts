import {
  Inject,
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class GatewayService implements OnModuleInit, OnModuleDestroy {
  constructor(
    @Inject('EVENT_SERVICE') private readonly eventProxyClient: ClientKafka,
  ) {}

  async onModuleInit() {
    const requestPatterns = [
      'event.virtual.create',
      'event.get.all.virtual',
      'event.get.virtual',
      'event.updated.virtual',
      'event.deleted.virtual',
      'event.created.physical',
      'event.get.all.physical',
      'event.get.physical',
      'event.updated.physical',
      'event.deleted.physical',
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
    return this.eventProxyClient.send('event.get.all.virtual', {});
  }

  async getVirtualEventById(id: string) {
    return this.eventProxyClient.send('event.get.virtual', { id });
  }

  async updateVirtualEvent(id: string, eventDto: any) {
    return this.eventProxyClient.send('event.updated.virtual', {
      id,
      ...eventDto,
    });
  }

  async deleteVirtualEvent(id: string) {
    return this.eventProxyClient.send('event.deleted.virtual', { id });
  }

  // Physical Event CRUD Operations
  async createPhysicalEvent(eventDto: any) {
    return this.eventProxyClient.send('event.created.physical', eventDto);
  }

  async getAllPhysicalEvents() {
    return this.eventProxyClient.send('event.get.all.physical', {});
  }

  async getPhysicalEventById(id: string) {
    return this.eventProxyClient.send('event.get.physical', { id });
  }

  async updatePhysicalEvent(id: string, eventDto: any) {
    return this.eventProxyClient.send('event.updated.physical', {
      id,
      ...eventDto,
    });
  }

  async deletePhysicalEvent(id: string) {
    return this.eventProxyClient.send('event.deleted.physical', { id });
  }
}
