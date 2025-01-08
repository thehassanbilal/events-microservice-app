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
import { UpdateEventDto } from './dto/update-event.dto';
import { paginateWithMongoose } from 'src/pagination/pagination.service';
import { Event, EventDocument } from './schema/event.schema';
import { EventTypeEnum } from './enum/event-type-enum';
import { NotFoundError } from 'rxjs';
import { ZoomService } from './zoom.service';
import { GoogleMeetService } from './google-meet.service';
import { VirtualEventSource } from './enum/virtual-event-source.enum';

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
    console.log('here is the eventDto in service', eventDto);
    const newEvent = await this.eventModel.create(eventDto);

    const isVirtual = eventDto.eventType === EventTypeEnum.VIRTUAL;

    if (isVirtual) {
      await this.createVirtualEvent(newEvent._id as Types.ObjectId);
    } else {
      await this.createPhysicalEvent(newEvent._id as Types.ObjectId);
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
    const event = await this.eventModel.findById(id).populate([
      {
        path: 'team',
        select: '_id name',
      },
      {
        path: 'category',
        select: '_id name',
      },
      {
        path: 'languages',
        select: '_id name countryCode',
      },
    ]);

    if (!event) {
      throw new NotFoundError('Event not found');
    }

    const eventDetails = await this.getEventDetails(id);

    return {
      ...event.toObject(),
      details: eventDetails,
    };
  }

  async getPaginatedAndFilteredEvents(paginationDto: PaginationDto) {
    const result = await paginateWithMongoose(
      this.eventModel,
      paginationDto,
      {},
      [
        {
          path: 'languages',
          select: '_id name countryCode',
        },
      ],
    );
    return result;
  }

  async deleteEvent(id: Types.ObjectId) {
    const deletedEvent = await this.eventModel.findByIdAndDelete(id);
    return deletedEvent;
  }

  // CRUD Operations for Virtual Events

  async createVirtualEvent(eventId: Types.ObjectId) {
    const newVirtualEvent = await this.virtualEventModel.create({
      event: eventId,
    });

    return newVirtualEvent.toObject();
  }

  async updateVirtualEventByEvent(eventDto: UpdateVirtualEventDto) {
    const { id, ...rest } = eventDto;

    const event = await this.virtualEventModel.findOne({
      event: id,
    });

    if (!event) {
      return { message: 'Event not found', data: null };
    }

    if (eventDto.source) {
      const createdMeeting =
        await this.createMeetingOnThridPartyService(eventDto);
      const updatedEvent = await this.virtualEventModel.findOneAndUpdate(
        { event: id },
        { ...rest, meetingId: createdMeeting.meetingId },
        { new: true },
      );
      return updatedEvent;
    }

    await this.updateMeetingOnThridPartyService(event, eventDto);

    return { message: 'Event updated successfully', event: event.toObject() };
  }

  async deleteVirtualEvent(id: Types.ObjectId) {
    const deletedEvent = await this.virtualEventModel.findByIdAndUpdate(
      id,
      { deletedAt: new Date() },
      { new: true },
    );

    switch (deletedEvent.source) {
      case VirtualEventSource.ZOOM:
        await this.zoomService.deleteZoomMeeting(deletedEvent.meetingId);
        break;
      case VirtualEventSource.GOOGLE_MEET:
        await this.googleMeetService.deleteGoogleMeet(deletedEvent.meetingId);
        break;
    }
    return deletedEvent;
  }

  async getAllVirtualEvents() {
    const events = await this.virtualEventModel.find();

    return events;
  }

  async getVirtualEventById(id: Types.ObjectId) {
    return this.virtualEventModel.findByIdAndUpdate(id, { new: true });
  }

  // CRUD Operations for Physical Events

  async createPhysicalEvent(eventId: Types.ObjectId) {
    const newPhysicalEvent = await this.physicalEventModel.create({
      event: eventId,
    });

    return newPhysicalEvent.toObject();
  }

  async updatePhysicalEvent(id: Types.ObjectId, eventDto: any) {
    const updatedEvent = await this.physicalEventModel.findByIdAndUpdate(
      id,
      eventDto,
      { new: true },
    );
    return updatedEvent;
  }

  async getPaginatedAndFilteredVirtualEvents(paginationDto: PaginationDto) {
    const result = await paginateWithMongoose(
      this.virtualEventModel,
      paginationDto,
    );
    return result;
  }

  async getAllPhysicalEvents() {
    return this.physicalEventModel.find();
  }

  async getPhysicalEventById(id: Types.ObjectId) {
    return this.physicalEventModel.findById(id);
  }

  async deletePhysicalEvent(id: Types.ObjectId) {
    const deletedEvent = await this.physicalEventModel.findByIdAndDelete(id);
    return deletedEvent;
  }

  // Third Party Meeting Methods

  async createMeetingOnThridPartyService(eventDto: UpdateVirtualEventDto) {
    const { source, startTime } = eventDto;

    let createdMeeting;
    switch (source) {
      case VirtualEventSource.ZOOM:
        const createdZoomMetting = await this.zoomService.createZoomMeeting({
          startTime,
        });
        createdMeeting = {
          meetingId: createdZoomMetting.id,
        };
        break;
      case VirtualEventSource.GOOGLE_MEET:
        const createdGoogleMeet = await this.googleMeetService.createGoogleMeet(
          {
            summary: eventDto.summary,
            startTime,
            endTime: eventDto.endTime,
            timeZone: eventDto.timeZone,
          },
        );
        createdMeeting = {
          meetingId: createdGoogleMeet.meetingId,
        };
        break;
    }

    return createdMeeting;
  }

  async updateMeetingOnThridPartyService(
    virtualEvent: VirtualEventDocument,
    eventDto: UpdateVirtualEventDto,
  ) {
    const { source, meetingId } = virtualEvent;

    switch (source) {
      case VirtualEventSource.ZOOM:
        await this.zoomService.updateZoomMeeting(meetingId, eventDto);
        break;
      case VirtualEventSource.GOOGLE_MEET:
        await this.googleMeetService.updateGoogleMeet(meetingId, {
          summary: eventDto.summary,
          startTime: eventDto.startTime,
          endTime: eventDto.endTime,
          timeZone: eventDto.timeZone,
        });
        break;
    }
  }

  async getThirdPartyMeetingDetails(eventId: Types.ObjectId) {
    const virtualEventRecord = await this.virtualEventModel
      .findOne({ event: eventId })
      .lean();

    const { source, meetingId } = virtualEventRecord;

    switch (source) {
      case VirtualEventSource.ZOOM:
        return this.zoomService.getZoomMeetingById(meetingId);
      case VirtualEventSource.GOOGLE_MEET:
        return this.googleMeetService.getGoogleMeet(meetingId);
    }
  }

  // Helper Methods

  private async getEventDetails(eventId: Types.ObjectId): Promise<any> {
    const event = await this.eventModel.findById(eventId);
    const isVirtual = event.eventType === EventTypeEnum.VIRTUAL;
    const isPhysical = event.eventType === EventTypeEnum.PHYSICAL;

    if (isVirtual) {
      const thirdPartyMeetingDetails =
        await this.getThirdPartyMeetingDetails(eventId);
      const virtualEventRecord = await this.virtualEventModel.findOne({
        event: eventId,
      });

      const source = virtualEventRecord.source;
      const details = {
        id: thirdPartyMeetingDetails.id,
        source,
        topic: thirdPartyMeetingDetails.topic,
        startTime: thirdPartyMeetingDetails.start_time,
        joinUrl: thirdPartyMeetingDetails.join_url,
        password: thirdPartyMeetingDetails.password,
        duration: thirdPartyMeetingDetails.duration,
        hostEmail: thirdPartyMeetingDetails.host_email,
      };
      return details;
    }

    if (isPhysical) {
      const thirdPartyMeetingDetails =
        await this.getThirdPartyMeetingDetails(eventId);
      // {
      //     kind: 'calendar#event',
      //     etag: '"3470054651024000"',
      //     id: 'eln9l8crfhn0lhlsiq783a4nj0',
      //     status: 'confirmed',
      //     htmlLink: 'https://www.google.com/calendar/event?eid=ZWxuOWw4Y3JmaG4wbGhsc2lxNzgzYTRuajAgZXZlbnQtc2VydmljZUBza2lsbGFtaS00MjA3MDguaWFtLmdzZXJ2aWNlYWNjb3VudC5jb20',
      //     created: '2024-12-24T08:02:05.000Z',
      //     updated: '2024-12-24T08:02:05.512Z',
      //     creator: {
      //       email: 'event-service@skillami-420708.iam.gserviceaccount.com',
      //       self: true
      //     },
      //     organizer: {
      //       email: 'event-service@skillami-420708.iam.gserviceaccount.com',
      //       self: true
      //     },
      //     start: { dateTime: '2024-12-21T07:29:29Z', timeZone: 'UTC' },
      //     end: { dateTime: '2024-12-21T08:29:29Z', timeZone: 'UTC' },
      //     iCalUID: 'eln9l8crfhn0lhlsiq783a4nj0@google.com',
      //     sequence: 0,
      //     reminders: { useDefault: true },
      //     eventType: 'default'
      //   },
      return thirdPartyMeetingDetails;
    }

    return null;
  }
}
