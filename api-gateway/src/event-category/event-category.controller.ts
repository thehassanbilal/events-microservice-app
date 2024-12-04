import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { EventCategoryService } from './event-category.service';
import { CreateEventCategoryDto } from './dto/create-event-category.dto';
import { UpdateEventCategoryDto } from './dto/update-event-category.dto';
import { Types } from 'mongoose';
import { PaginationDto } from 'src/global/paginated.dto';

@Controller('event-category')
export class EventCategoryController {
  constructor(private readonly eventCategoryService: EventCategoryService) {}

  @Post()
  create(@Body() createEventCategoryDto: CreateEventCategoryDto) {
    return this.eventCategoryService.create(createEventCategoryDto);
  }

  @Get()
  findAll() {
    return this.eventCategoryService.findAll();
  }

  @Get('paginated')
  findAllPaginated(@Body() paginationDto: PaginationDto) {
    return this.eventCategoryService.findAllPaginated(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: Types.ObjectId) {
    return this.eventCategoryService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: Types.ObjectId,
    @Body() updateEventCategoryDto: UpdateEventCategoryDto,
  ) {
    return this.eventCategoryService.update(id, updateEventCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: Types.ObjectId) {
    return this.eventCategoryService.remove(id);
  }
}
