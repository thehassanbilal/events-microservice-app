import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { VirtualEventController } from './virtual-event.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  VirtualEvent,
  VirtualEventSchema,
} from './schema/virtual-event.schema';
import {
  PhysicalEvent,
  PhysicalEventSchema,
} from './schema/physical-event.schema';
import { PhysicalEventController } from './physical-event.controller';
import { Event, EventSchema } from './schema/event.schema';
import { EventController } from './event.controller';
import { ZoomService } from './zoom.service';
import { GoogleMeetService } from './google-meet.service';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Event.name, schema: EventSchema },
      { name: VirtualEvent.name, schema: VirtualEventSchema },
      { name: PhysicalEvent.name, schema: PhysicalEventSchema },
    ]),
  ],
  controllers: [
    EventController,
    VirtualEventController,
    PhysicalEventController,
  ],
  providers: [EventService, ZoomService, GoogleMeetService, ConfigService],
})
export class EventModule {}
