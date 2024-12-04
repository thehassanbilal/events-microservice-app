import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { EventGroupService } from './event-group.service';
import { CreateEventGroupDto } from './dto/create-event-group.dto';
import { UpdateEventGroupDto } from './dto/update-event-group.dto';
import { Types } from 'mongoose';
import { PaginationDto } from 'src/global/paginated.dto';

@Controller('event-group')
export class EventGroupController {
  constructor(private readonly eventGroupService: EventGroupService) {}

  @Post()
  create(@Body() createEventGroupDto: CreateEventGroupDto) {
    return this.eventGroupService.create(createEventGroupDto);
  }

  @Get()
  findAll() {
    return this.eventGroupService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: Types.ObjectId) {
    return this.eventGroupService.findOne(id);
  }

  @Get('paginated')
  findAllPaginated(@Body() paginationDto: PaginationDto) {
    return this.eventGroupService.findAllPaginated(paginationDto);
  }

  @Put(':id')
  update(
    @Param('id') id: Types.ObjectId,
    @Body() updateEventGroupDto: UpdateEventGroupDto,
  ) {
    return this.eventGroupService.update(id, updateEventGroupDto);
  }

  @Delete(':id')
  remove(@Param('id') id: Types.ObjectId) {
    return this.eventGroupService.remove(id);
  }
}
