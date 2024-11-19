import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class GatewayService {
  constructor(
    @Inject('EVENT_SERVICE') private readonly eventProxyClient: ClientKafka,
  ) {}

  createEventEvent(payload: any) {
    this.eventProxyClient.emit('create_event', payload);
  }
}
