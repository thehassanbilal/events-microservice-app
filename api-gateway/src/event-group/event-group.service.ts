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

  async findAll() {
    const reply = await this.eventProxyClient.send('findAllEventGroup', {});
    return reply;
  }

  async findAllPaginated(paginationDto: PaginationDto) {
    const reply = await this.eventProxyClient.send(
      'findAllPaginatedEventGroup',
      {
        paginationDto,
      },
    );
    return reply;
  }

  async findOne(id: Types.ObjectId) {
    const reply = await this.eventProxyClient.send('findOneEventGroup', id);
    return reply;
  }

  async update(id: Types.ObjectId, updateEventGroupDto: UpdateEventGroupDto) {
    const reply = await this.eventProxyClient.send('updateEventGroup', {
      id,
      ...updateEventGroupDto,
    });
    return reply;
  }

  async remove(id: Types.ObjectId) {
    const reply = await this.eventProxyClient.send('removeEventGroup', id);
    return reply;
  }
}
