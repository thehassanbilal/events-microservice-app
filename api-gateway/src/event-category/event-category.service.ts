import { Inject, Injectable } from '@nestjs/common';
import { CreateEventCategoryDto } from './dto/create-event-category.dto';
import { UpdateEventCategoryDto } from './dto/update-event-category.dto';
import { ClientKafka } from '@nestjs/microservices';
import { Types } from 'mongoose';
import { PaginationDto } from 'src/global/paginated.dto';

@Injectable()
export class EventCategoryService {
  constructor(
    @Inject('EVENT_SERVICE')
    private readonly eventProxyClient: ClientKafka,
  ) {}

  async create(createEventCategoryDto: CreateEventCategoryDto) {
    const reply = await this.eventProxyClient.send(
      'createEventCategory',
      createEventCategoryDto,
    );

    return reply;
  }

  async findAll() {
    const reply = await this.eventProxyClient.send('findAllEventCategory', {});
    return reply;
  }

  async findAllPaginated(paginationDto: PaginationDto) {
    const reply = await this.eventProxyClient.send(
      'findAllPaginatedEventCategory',
      {
        paginationDto,
      },
    );
    return reply;
  }

  async findOne(id: Types.ObjectId) {
    const reply = this.eventProxyClient.send('findOneEventCategory', { id });
    return reply;
  }

  async update(
    id: Types.ObjectId,
    updateEventCategoryDto: UpdateEventCategoryDto,
  ) {
    const reply = await this.eventProxyClient.send('updateEventCategory', {
      id,
      ...updateEventCategoryDto,
    });
    return reply;
  }

  remove(id: Types.ObjectId) {
    return this.eventProxyClient.send('deleteEventCategory', { id });
  }
}
