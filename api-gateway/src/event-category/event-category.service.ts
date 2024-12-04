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

  findAll() {
    return this.eventProxyClient.send('findAllEventCategory', {});
  }

  findAllPaginated(paginationDto: PaginationDto) {
    return this.eventProxyClient.send('findAllPaginatedEventCategory', {
      paginationDto,
    });
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
