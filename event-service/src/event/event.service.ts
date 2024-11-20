import { Injectable, Inject, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ClientKafka } from '@nestjs/microservices';
import {
  VirtualEvent,
  VirtualEventDocument,
} from './schema/virtual-event.schema';
import {
  PhysicalEvent,
  PhysicalEventDocument,
} from './schema/physical-event.schema';

@Injectable()
export class EventService {
  private readonly logger = new Logger(EventService.name);

  constructor(
    @InjectModel(VirtualEvent.name)
    private virtualEventModel: Model<VirtualEventDocument>,
    @InjectModel(PhysicalEvent.name)
    private physicalEventModel: Model<PhysicalEventDocument>,
    @Inject('KAFKA_SERVICE') private kafkaClient: ClientKafka,
  ) {}

  async onModuleInit() {
    // Ensure Kafka topics are subscribed to
    this.kafkaClient.subscribeToResponseOf('event.created.virtual');
    this.kafkaClient.subscribeToResponseOf('event.updated.virtual');
    this.kafkaClient.subscribeToResponseOf('event.deleted.virtual');
    this.kafkaClient.subscribeToResponseOf('event.created.physical');
    this.kafkaClient.subscribeToResponseOf('event.updated.physical');
    this.kafkaClient.subscribeToResponseOf('event.deleted.physical');

    await this.kafkaClient.connect();
  }

  async onModuleDestroy() {
    await this.kafkaClient.close();
  }

  // CRUD Operations for Virtual Events
  async createVirtualEvent(eventDto: any) {
    const newEvent = new this.virtualEventModel(eventDto);
    await newEvent.save();
    this.kafkaClient.emit('event.created.virtual', newEvent); // Emit Kafka event
    return newEvent;
  }

  async updateVirtualEvent(id: string, eventDto: any) {
    const updatedEvent = await this.virtualEventModel.findByIdAndUpdate(
      id,
      eventDto,
      { new: true },
    );
    this.kafkaClient.emit('event.updated.virtual', updatedEvent); // Emit Kafka event
    return updatedEvent;
  }

  async deleteVirtualEvent(id: string) {
    const deletedEvent = await this.virtualEventModel.findByIdAndDelete(id);
    this.kafkaClient.emit('event.deleted.virtual', deletedEvent); // Emit Kafka event
    return deletedEvent;
  }

  async getAllVirtualEvents() {
    return this.virtualEventModel.find();
  }

  async getVirtualEventById(id: string) {
    return this.virtualEventModel.findById(id);
  }

  // CRUD Operations for Physical Events
  async createPhysicalEvent(eventDto: any) {
    const newEvent = new this.physicalEventModel(eventDto);
    await newEvent.save();
    this.kafkaClient.emit('event.created.physical', newEvent); // Emit Kafka event
    return newEvent;
  }

  async updatePhysicalEvent(id: string, eventDto: any) {
    const updatedEvent = await this.physicalEventModel.findByIdAndUpdate(
      id,
      eventDto,
      { new: true },
    );
    this.kafkaClient.emit('event.updated.physical', updatedEvent); // Emit Kafka event
    return updatedEvent;
  }

  async deletePhysicalEvent(id: string) {
    const deletedEvent = await this.physicalEventModel.findByIdAndDelete(id);
    this.kafkaClient.emit('event.deleted.physical', deletedEvent); // Emit Kafka event
    return deletedEvent;
  }

  async getAllPhysicalEvents() {
    return this.physicalEventModel.find();
  }

  async getPhysicalEventById(id: string) {
    return this.physicalEventModel.findById(id);
  }
}
