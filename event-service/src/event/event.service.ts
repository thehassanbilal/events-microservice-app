import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  VirtualEvent,
  VirtualEventDocument,
} from './schema/virtual-event.schema';
import {
  PhysicalEvent,
  PhysicalEventDocument,
} from './schema/physical-event.schema';
import { UpdateVirtualEventDto } from './dto/update-virtual-event.dto';
import { toObjectId } from 'src/common/helpers/helpers';

@Injectable()
export class EventService {
  private readonly logger = new Logger(EventService.name);

  constructor(
    @InjectModel(VirtualEvent.name)
    private virtualEventModel: Model<VirtualEventDocument>,
    @InjectModel(PhysicalEvent.name)
    private physicalEventModel: Model<PhysicalEventDocument>,
  ) {}

  // CRUD Operations for Virtual Events

  async createVirtualEvent(eventDto: any) {
    const newEvent = new this.virtualEventModel(eventDto);
    await newEvent.save();
    return newEvent;
  }

  async updateVirtualEvent(eventDto: UpdateVirtualEventDto) {
    const { id, ...rest } = eventDto;

    const updatedEvent = await this.virtualEventModel.findByIdAndUpdate(
      toObjectId(id),
      rest,
      { new: true },
    );

    return updatedEvent;
  }

  async deleteVirtualEvent(id: Types.ObjectId) {
    const deletedEvent = await this.virtualEventModel.findByIdAndDelete(id);
    return deletedEvent;
  }

  async getAllVirtualEvents() {
    return this.virtualEventModel.find();
  }

  async getVirtualEventById(id: Types.ObjectId) {
    return this.virtualEventModel.findByIdAndUpdate(id, { new: true });
  }

  // CRUD Operations for Physical Events
  async createPhysicalEvent(eventDto: any) {
    const newEvent = new this.physicalEventModel(eventDto);
    await newEvent.save();
    return newEvent;
  }

  async updatePhysicalEvent(id: Types.ObjectId, eventDto: any) {
    const updatedEvent = await this.physicalEventModel.findByIdAndUpdate(
      id,
      eventDto,
      { new: true },
    );
    return updatedEvent;
  }

  async deletePhysicalEvent(id: Types.ObjectId) {
    const deletedEvent = await this.physicalEventModel.findByIdAndDelete(id);
    return deletedEvent;
  }

  async getAllPhysicalEvents() {
    return this.physicalEventModel.find();
  }

  async getPhysicalEventById(id: Types.ObjectId) {
    return this.physicalEventModel.findById(id);
  }
}
