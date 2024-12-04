import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { EventGroupService } from './event-group.service';
import { CreateEventGroupDto } from './dto/create-event-group.dto';
import { UpdateEventGroupDto } from './dto/update-event-group.dto';
import { Types } from 'mongoose';

@Controller()
export class EventGroupController {
  constructor(private readonly eventGroupService: EventGroupService) {}

  @MessagePattern('createEventGroup')
  create(@Payload() createEventGroupDto: CreateEventGroupDto) {
    return this.eventGroupService.create(createEventGroupDto);
  }

  @MessagePattern('findAllEventGroup')
  findAll() {
    return this.eventGroupService.findAll();
  }

  @MessagePattern('findAllPaginatedEventGroup')
  findAllPaginated(@Payload() paginationDto: any) {
    return this.eventGroupService.findAllPaginated(paginationDto);
  }

  @MessagePattern('findOneEventGroup')
  findOne(@Payload() id: Types.ObjectId) {
    return this.eventGroupService.findOne(id);
  }

  @MessagePattern('updateEventGroup')
  update(@Payload() updateEventGroupDto: UpdateEventGroupDto) {
    return this.eventGroupService.update(
      updateEventGroupDto.id,
      updateEventGroupDto,
    );
  }

  @MessagePattern('removeEventGroup')
  remove(@Payload() id: Types.ObjectId) {
    return this.eventGroupService.remove(id);
  }
}
