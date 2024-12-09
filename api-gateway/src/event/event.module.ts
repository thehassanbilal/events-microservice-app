import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { KafkaModule } from 'src/kafka.module';
import { PhysicalEventController } from './physical-event.controller';
import { VirtualEventController } from './virtual-event.controller';

@Module({
  imports: [KafkaModule],
  controllers: [
    EventController,
    VirtualEventController,
    PhysicalEventController,
  ],
  providers: [EventService],
})
export class EventModule {}
