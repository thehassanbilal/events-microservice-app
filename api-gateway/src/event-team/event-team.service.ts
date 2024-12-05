import { Inject, Injectable } from '@nestjs/common';
import { CreateEventTeamDto } from './dto/create-event-team.dto';
import { UpdateEventTeamDto } from './dto/update-event-team.dto';
import { Types } from 'mongoose';
import { ClientKafka } from '@nestjs/microservices';
import { PaginationDto } from 'src/global/paginated.dto';

@Injectable()
export class EventTeamService {
  constructor(
    @Inject('EVENT_SERVICE')
    private readonly eventProxyClient: ClientKafka,
  ) {}

  async create(CreateEventTeamDto: CreateEventTeamDto) {
    const reply = await this.eventProxyClient.send(
      'createEventTeam',
      CreateEventTeamDto,
    );

    return reply;
  }

  async findAll() {
    const reply = await this.eventProxyClient.send('findAllEventTeam', {});
    return reply;
  }

  async findAllPaginated(paginationDto: PaginationDto) {
    const reply = await this.eventProxyClient.send(
      'findAllPaginatedEventTeam',
      {
        paginationDto,
      },
    );
    return reply;
  }

  async findOne(id: Types.ObjectId) {
    const reply = await this.eventProxyClient.send('findOneEventTeam', id);
    return reply;
  }

  async update(id: Types.ObjectId, updateEventTeamDto: UpdateEventTeamDto) {
    const reply = await this.eventProxyClient.send('updateEventTeam', {
      id,
      ...updateEventTeamDto,
    });
    return reply;
  }

  async remove(id: Types.ObjectId) {
    const reply = await this.eventProxyClient.send('removeEventTeam', id);
    return reply;
  }
}
