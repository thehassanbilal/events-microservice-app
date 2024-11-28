import { Inject, Injectable } from '@nestjs/common';
import { CreateEventCategoryDto } from './dto/create-event-category.dto';
import { UpdateEventCategoryDto } from './dto/update-event-category.dto';
import { ClientKafka } from '@nestjs/microservices';
import { Types } from 'mongoose';

@Injectable()
export class EventCategoryService {
  constructor(
    @Inject('EVENT_SERVICE')
    private readonly eventProxyClient: ClientKafka,
  ) {}

  async onModuleInit() {
    const requestPatterns = [
      'createEventCategory',
      'findAllEventCategory',
      'findOneEventCategory',
      'updateEventCategory',
      'deleteEventCategory',
    ];

    requestPatterns.forEach((pattern) => {
      this.eventProxyClient.subscribeToResponseOf(pattern);
    });

    await this.eventProxyClient.connect();
  }

  onModuleDestroy() {
    this.eventProxyClient.close();
  }

  async create(createEventCategoryDto: CreateEventCategoryDto) {
    const reply = await this.eventProxyClient.send(
      'createEventCategory',
      createEventCategoryDto,
    );

    console.log('here is data', reply.toPromise());

    return reply.toPromise();
  }

  findAll() {
    return this.eventProxyClient.send('findAllEventCategory', {});
  }

  findOne(id: Types.ObjectId) {
    return this.eventProxyClient.send('findOneEventCategory', { id });
  }

  update(id: Types.ObjectId, updateEventCategoryDto: UpdateEventCategoryDto) {
    return this.eventProxyClient.send('updateEventCategory', {
      id,
      ...updateEventCategoryDto,
    });
  }

  remove(id: Types.ObjectId) {
    return this.eventProxyClient.send('deleteEventCategory', { id });
  }
}
