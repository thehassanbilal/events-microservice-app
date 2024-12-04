import { Injectable } from '@nestjs/common';
import { CreateEventGroupDto } from './dto/create-event-group.dto';
import { UpdateEventGroupDto } from './dto/update-event-group.dto';
import { EventGroup, EventGroupDocument } from './schema/event-group.schema';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { paginateWithMongoose } from 'src/pagination/pagination.service';

@Injectable()
export class EventGroupService {
  constructor(
    @InjectModel(EventGroup.name)
    private readonly eventGroupModel: Model<EventGroupDocument>,
  ) {}

  async create(createEventGroupDto: CreateEventGroupDto) {
    const eventGroup = new this.eventGroupModel(createEventGroupDto);
    return eventGroup.save();
  }

  async findAll() {
    return this.eventGroupModel.find();
  }

  async findAllPaginated(paginationDto: any) {
    const result = await paginateWithMongoose(
      this.eventGroupModel,
      paginationDto,
    );

    return result;
  }

  async findOne(id: Types.ObjectId) {
    return this.eventGroupModel.findById(id);
  }

  async update(id: Types.ObjectId, updateEventGroupDto: UpdateEventGroupDto) {
    return this.eventGroupModel.findByIdAndUpdate(id, updateEventGroupDto, {
      new: true,
    });
  }

  async remove(id: Types.ObjectId) {
    return this.eventGroupModel.findByIdAndUpdate(id, {
      deletedAt: new Date(),
    });
  }
}
