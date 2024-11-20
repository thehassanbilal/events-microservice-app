import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class GatewayService {
  constructor(
    @Inject('EVENT_SERVICE') private readonly eventProxyClient: ClientKafka,
  ) {}

  // Virtual Event CRUD Operations
  async createVirtualEvent(eventDto: any) {
    return this.eventProxyClient.send('create_virtual_event', eventDto); // Send message to Event Service topic
  }

  async getAllVirtualEvents() {
    return this.eventProxyClient.send('get_all_virtual_events', {}); // Send message to Event Service topic
  }

  async getVirtualEventById(id: string) {
    return this.eventProxyClient.send('get_virtual_event_by_id', { id }); // Send message to Event Service topic
  }

  async updateVirtualEvent(id: string, eventDto: any) {
    return this.eventProxyClient.send('update_virtual_event', {
      id,
      ...eventDto,
    }); // Send message to Event Service topic
  }

  async deleteVirtualEvent(id: string) {
    return this.eventProxyClient.send('delete_virtual_event', { id }); // Send message to Event Service topic
  }

  // Physical Event CRUD Operations
  async createPhysicalEvent(eventDto: any) {
    return this.eventProxyClient.send('create_physical_event', eventDto); // Send message to Event Service topic
  }

  async getAllPhysicalEvents() {
    return this.eventProxyClient.send('get_all_physical_events', {}); // Send message to Event Service topic
  }

  async getPhysicalEventById(id: string) {
    return this.eventProxyClient.send('get_physical_event_by_id', { id }); // Send message to Event Service topic
  }

  async updatePhysicalEvent(id: string, eventDto: any) {
    return this.eventProxyClient.send('update_physical_event', {
      id,
      ...eventDto,
    }); // Send message to Event Service topic
  }

  async deletePhysicalEvent(id: string) {
    return this.eventProxyClient.send('delete_physical_event', { id }); // Send message to Event Service topic
  }
}
