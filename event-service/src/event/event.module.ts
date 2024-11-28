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

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: VirtualEvent.name, schema: VirtualEventSchema },
      { name: PhysicalEvent.name, schema: PhysicalEventSchema },
    ]),
  ],
  controllers: [VirtualEventController, PhysicalEventController],
  providers: [EventService],
})
export class EventModule {}
