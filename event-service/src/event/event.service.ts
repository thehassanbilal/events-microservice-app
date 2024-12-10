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
import { PaginationDto } from 'src/global/pagination.dto';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto copy';
import { paginateWithMongoose } from 'src/pagination/pagination.service';
import { Event, EventDocument } from './schema/event.schema';
import { EventTypeEnum } from './enum/event-type-enum';
import { NotFoundError } from 'rxjs';
import { ZoomService } from './zoom.service';
import { GoogleMeetService } from './google-meet.service';

@Injectable()
export class EventService {
  private readonly logger = new Logger(EventService.name);

  constructor(
    @InjectModel(Event.name)
    private eventModel: Model<EventDocument>,
    @InjectModel(VirtualEvent.name)
    private virtualEventModel: Model<VirtualEventDocument>,
    @InjectModel(PhysicalEvent.name)
    private physicalEventModel: Model<PhysicalEventDocument>,
    private readonly zoomService: ZoomService,
    private readonly googleMeetService: GoogleMeetService,
  ) {}

  // CRUD Operations for Events

  async createEvent(eventDto: CreateEventDto) {
    const newEvent = await this.eventModel.create(eventDto);

    const isVirtual = eventDto.eventType === EventTypeEnum.VIRTUAL;

    if (isVirtual) {
      const virtualEvent = new this.virtualEventModel({
        ...eventDto,
        event: newEvent._id,
      });
      await virtualEvent.save();
    } else {
      const physicalEvent = new this.physicalEventModel({
        ...eventDto,
        event: newEvent._id,
      });
      await physicalEvent.save();
    }

    return newEvent.toObject();
  }

  async updateEvent(eventDto: UpdateEventDto) {
    const { id, ...rest } = eventDto;

    const updatedEvent = await this.eventModel.findByIdAndUpdate(id, rest, {
      new: true,
    });

    return updatedEvent.toObject();
  }

  async getAllEvents() {
    const records = await this.eventModel.find();
    return records;
  }

  async getEventById(id: Types.ObjectId): Promise<any> {
    const event = await this.eventModel.findById(id);

    if (!event) {
      throw new NotFoundError('Event not found');
    }

    const eventDetails = await this.getEventDetails(id, event.eventType);

    return {
      ...event.toObject(),
      details: eventDetails,
    };
  }

  async getPaginatedAndFilteredEvents(paginationDto: PaginationDto) {
    const result = await paginateWithMongoose(this.eventModel, paginationDto);
    return result;
  }

  async deleteEvent(id: Types.ObjectId) {
    const deletedEvent = await this.eventModel.findByIdAndDelete(id);
    return deletedEvent;
  }

  // CRUD Operations for Virtual Events

  async updateVirtualEvent(eventDto: UpdateVirtualEventDto) {
    const { id, ...rest } = eventDto;

    const updatedEvent = await this.virtualEventModel.findByIdAndUpdate(
      id,
      rest,
      { new: true },
    );

    return updatedEvent.toObject();
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

  // Helper Methods

  private async getEventDetails(
    eventId: Types.ObjectId,
    eventType: EventTypeEnum,
  ): Promise<any> {
    if (eventType === EventTypeEnum.VIRTUAL) {
      return this.virtualEventModel.findOne({ event: eventId }).lean();
    }

    if (eventType === EventTypeEnum.PHYSICAL) {
      return this.physicalEventModel.findOne({ event: eventId }).lean();
    }

    return null;
  }
}
