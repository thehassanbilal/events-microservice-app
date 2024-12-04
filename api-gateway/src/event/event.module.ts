import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { KafkaModule } from 'src/kafka.module';

@Module({
  imports: [KafkaModule],
  controllers: [EventController],
  providers: [EventService],
})
export class EventModule {}
