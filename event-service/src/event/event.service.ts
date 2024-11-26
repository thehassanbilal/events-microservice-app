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

  async updateVirtualEvent(
    id: Types.ObjectId,
    eventDto: UpdateVirtualEventDto,
  ) {
    const updatedEvent = await this.virtualEventModel.findByIdAndUpdate(
      id,
      eventDto,
      { new: true },
    );
    return updatedEvent;
  }

  async deleteVirtualEvent(id: Types.ObjectId) {
    const deletedEvent = await this.virtualEventModel.findByIdAndDelete(id);
    // this.kafkaClient.emit('event.deleted.virtual', deletedEvent); // Emit Kafka event
    return deletedEvent;
  }

  async getAllVirtualEvents() {
    return this.virtualEventModel.find();
  }

  async getVirtualEventById(id: Types.ObjectId) {
    return this.virtualEventModel.findById(id);
  }

  // CRUD Operations for Physical Events
  async createPhysicalEvent(eventDto: any) {
    const newEvent = new this.physicalEventModel(eventDto);
    await newEvent.save();
    // this.kafkaClient.emit('event.created.physical', newEvent); // Emit Kafka event
    return newEvent;
  }

  async updatePhysicalEvent(id: Types.ObjectId, eventDto: any) {
    const updatedEvent = await this.physicalEventModel.findByIdAndUpdate(
      id,
      eventDto,
      { new: true },
    );
    // this.kafkaClient.emit('event.updated.physical', updatedEvent); // Emit Kafka event
    return updatedEvent;
  }

  async deletePhysicalEvent(id: Types.ObjectId) {
    const deletedEvent = await this.physicalEventModel.findByIdAndDelete(id);
    // this.kafkaClient.emit('event.deleted.physical', deletedEvent); // Emit Kafka event
    return deletedEvent;
  }

  async getAllPhysicalEvents() {
    return this.physicalEventModel.find();
  }

  async getPhysicalEventById(id: Types.ObjectId) {
    return this.physicalEventModel.findById(id);
  }
}
