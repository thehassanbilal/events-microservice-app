import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { EventTeamService } from './event-team.service';
import { CreateEventTeamDto } from './dto/create-event-team.dto';
import { UpdateEventTeamDto } from './dto/update-event-team.dto';
import { Types } from 'mongoose';
import { PaginationDto } from 'src/global/paginated.dto';

@Controller('event-team')
export class EventTeamController {
  constructor(private readonly eventTeamService: EventTeamService) {}

  @Post()
  create(@Body() CreateEventTeamDto: CreateEventTeamDto) {
    return this.eventTeamService.create(CreateEventTeamDto);
  }

  @Get()
  findAll() {
    return this.eventTeamService.findAll();
  }

  @Get('paginated')
  findAllPaginated(@Body() paginationDto: PaginationDto) {
    return this.eventTeamService.findAllPaginated(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: Types.ObjectId) {
    return this.eventTeamService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: Types.ObjectId,
    @Body() updateEventTeamDto: UpdateEventTeamDto,
  ) {
    return this.eventTeamService.update(id, updateEventTeamDto);
  }

  @Delete(':id')
  remove(@Param('id') id: Types.ObjectId) {
    return this.eventTeamService.remove(id);
  }
}
