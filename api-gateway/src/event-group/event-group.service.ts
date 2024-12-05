import { Inject, Injectable } from '@nestjs/common';
import { CreateEventGroupDto } from './dto/create-event-group.dto';
import { UpdateEventGroupDto } from './dto/update-event-group.dto';
import { Types } from 'mongoose';
import { ClientKafka } from '@nestjs/microservices';
import { PaginationDto } from 'src/global/paginated.dto';

@Injectable()
export class EventGroupService {
  constructor(
    @Inject('EVENT_SERVICE')
    private readonly eventProxyClient: ClientKafka,
  ) {}

  async create(createEventGroupDto: CreateEventGroupDto) {
    const reply = await this.eventProxyClient.send(
      'createEventGroup',
      createEventGroupDto,
    );

    return reply;
  }

  findAll() {
    return this.eventProxyClient.send('findAllEventGroup', {});
  }

  findAllPaginated(paginationDto: PaginationDto) {
    return this.eventProxyClient.send('findAllPaginatedEventGroup', {
      paginationDto,
    });
  }

  findOne(id: Types.ObjectId) {
    return this.eventProxyClient.send('findOneEventGroup', id);
  }

  update(id: Types.ObjectId, updateEventGroupDto: UpdateEventGroupDto) {
    return this.eventProxyClient.send('updateEventGroup', {
      id,
      ...updateEventGroupDto,
    });
  }

  remove(id: Types.ObjectId) {
    return this.eventProxyClient.send('removeEventGroup', id);
  }
}
