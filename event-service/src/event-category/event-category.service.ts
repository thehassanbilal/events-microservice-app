import { Injectable } from '@nestjs/common';
import { CreateEventCategoryDto } from './dto/create-event-category.dto';
import { UpdateEventCategoryDto } from './dto/update-event-category.dto';
import {
  EventCategory,
  EventCategoryDocument,
} from './schema/event-category.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { PaginationDto } from 'src/global/pagination.dto';
import { paginateWithMongoose } from 'src/pagination/pagination.service';

@Injectable()
export class EventCategoryService {
  constructor(
    @InjectModel(EventCategory.name)
    private eventCategoryModel: Model<EventCategoryDocument>,
  ) {}

  async create(createEventCategoryDto: CreateEventCategoryDto) {
    const newEventCategory = new this.eventCategoryModel(
      createEventCategoryDto,
    );
    return newEventCategory.save();
  }

  findAll() {
    return this.eventCategoryModel.find();
  }

  async findAllPaginated(paginationDto: PaginationDto) {
    const result = await paginateWithMongoose(
      this.eventCategoryModel,
      paginationDto,
    );

    return result;
  }

  findOne(id: number) {
    return this.eventCategoryModel.findById(id);
  }

  update(id: number, updateEventCategoryDto: UpdateEventCategoryDto) {
    return this.eventCategoryModel.findByIdAndUpdate(
      id,
      updateEventCategoryDto,
      {
        new: true,
      },
    );
  }

  remove(id: number) {
    return this.eventCategoryModel.findByIdAndDelete(id);
  }
}
