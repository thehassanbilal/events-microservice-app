import { Injectable } from '@nestjs/common';
import { CreateEventCategoryDto } from './dto/create-event-category.dto';
import { UpdateEventCategoryDto } from './dto/update-event-category.dto';
import {
  EventCategory,
  EventCategoryDocument,
} from './schema/event-category.schema';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { PaginationDto } from 'src/global/pagination.dto';
import { paginateWithMongoose } from 'src/pagination/pagination.service';
import { catchException } from 'src/common/handle.exceptionh.helper';

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
    return (await newEventCategory.save()).toObject();
  }

  async findAll() {
    console.log('here is data');
    const result = await this.eventCategoryModel.find();
    return result;
  }

  async findAllPaginated(paginationDto: PaginationDto) {
    const result = await paginateWithMongoose(
      this.eventCategoryModel,
      paginationDto,
    );

    return result;
  }

  async findOne(id: Types.ObjectId) {
    try {
      const result = await this.eventCategoryModel.findById(id);
      return result.toObject();
    } catch (e) {
      catchException(e);
    }
  }

  async update(
    id: Types.ObjectId,
    updateEventCategoryDto: UpdateEventCategoryDto,
  ) {
    const result = await this.eventCategoryModel.findByIdAndUpdate(
      id,
      updateEventCategoryDto,
      {
        new: true,
      },
    );
    return result.toObject();
  }

  remove(id: Types.ObjectId) {
    return this.eventCategoryModel.findByIdAndDelete(id);
  }
}
