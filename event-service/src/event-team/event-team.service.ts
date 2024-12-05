import { Injectable } from '@nestjs/common';
import { UpdateEventTeamDto } from './dto/update-event-team.dto';
import { CreateEventTeamDto } from './dto/create-event-team.dto';
import { EventTeam, EventTeamDocument } from './schema/event-team.schema';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { paginateWithMongoose } from 'src/pagination/pagination.service';

@Injectable()
export class EventTeamService {
  constructor(
    @InjectModel(EventTeam.name)
    private readonly eventTeamModel: Model<EventTeamDocument>,
  ) {}

  async create(CreateEventTeamDto: CreateEventTeamDto) {
    const newRecord = new this.eventTeamModel(CreateEventTeamDto);
    return (await newRecord.save()).toObject();
  }

  async findAll() {
    const result = await this.eventTeamModel.find();
    return result;
  }

  async findAllPaginated(paginationDto: any) {
    const result = await paginateWithMongoose(
      this.eventTeamModel,
      paginationDto,
    );

    return result;
  }

  async findOne(id: Types.ObjectId) {
    const result = await this.eventTeamModel.findById(id);
    return result.toObject();
  }

  async update(id: Types.ObjectId, updateEventTeamDto: UpdateEventTeamDto) {
    const result = await this.eventTeamModel.findByIdAndUpdate(
      id,
      updateEventTeamDto,
      {
        new: true,
      },
    );
    return result.toObject();
  }

  async remove(id: Types.ObjectId) {
    return await this.eventTeamModel.findByIdAndUpdate(id, {
      deletedAt: new Date(),
    });
  }
}
