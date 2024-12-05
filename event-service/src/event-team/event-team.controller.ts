import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { EventTeamService } from './event-team.service';
import { Types } from 'mongoose';
import { CreateEventTeamDto } from './dto/create-event-team.dto';
import { UpdateEventTeamDto } from './dto/update-event-team.dto';

@Controller()
export class EventTeamController {
  constructor(private readonly eventTeamService: EventTeamService) {}

  @MessagePattern('createEventTeam')
  create(@Payload() CreateEventTeamDto: CreateEventTeamDto) {
    return this.eventTeamService.create(CreateEventTeamDto);
  }

  @MessagePattern('findAllEventTeam')
  findAll() {
    return this.eventTeamService.findAll();
  }

  @MessagePattern('findAllPaginatedEventTeam')
  findAllPaginated(@Payload() paginationDto: any) {
    return this.eventTeamService.findAllPaginated(paginationDto);
  }

  @MessagePattern('findOneEventTeam')
  findOne(@Payload() id: Types.ObjectId) {
    return this.eventTeamService.findOne(id);
  }

  @MessagePattern('updateEventTeam')
  update(@Payload() updateEventTeamDto: UpdateEventTeamDto) {
    return this.eventTeamService.update(
      updateEventTeamDto.id,
      updateEventTeamDto,
    );
  }

  @MessagePattern('removeEventTeam')
  remove(@Payload() id: Types.ObjectId) {
    return this.eventTeamService.remove(id);
  }
}
