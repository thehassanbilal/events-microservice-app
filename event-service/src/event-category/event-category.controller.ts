import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { EventCategoryService } from './event-category.service';
import { CreateEventCategoryDto } from './dto/create-event-category.dto';
import { UpdateEventCategoryDto } from './dto/update-event-category.dto';
import { PaginationDto } from '../global/pagination.dto';
import { Types } from 'mongoose';

@Controller('events/categories')
export class EventCategoryController {
  constructor(private readonly eventCategoryService: EventCategoryService) {}

  @MessagePattern('createEventCategory')
  async create(@Payload() createEventCategoryDto: CreateEventCategoryDto) {
    return this.eventCategoryService.create(createEventCategoryDto);
  }

  @MessagePattern('findAllEventCategory')
  findAll() {
    return this.eventCategoryService.findAll();
  }

  @MessagePattern('findAllPaginatedEventCategory')
  findAllPaginated(@Payload() paginationDto: PaginationDto) {
    return this.eventCategoryService.findAllPaginated(paginationDto);
  }

  @MessagePattern('findOneEventCategory')
  findOne(@Payload('id') id: Types.ObjectId) {
    return this.eventCategoryService.findOne(id);
  }

  @MessagePattern('updateEventCategory')
  update(@Payload() updateEventCategoryDto: UpdateEventCategoryDto) {
    return this.eventCategoryService.update(
      updateEventCategoryDto.id,
      updateEventCategoryDto,
    );
  }

  @MessagePattern('removeEventCategory')
  remove(@Payload('id') id: Types.ObjectId) {
    return this.eventCategoryService.remove(id);
  }
}
