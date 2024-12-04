import { Module } from '@nestjs/common';
import { EventCategoryService } from './event-category.service';
import { EventCategoryController } from './event-category.controller';
import { KafkaModule } from 'src/kafka.module';

@Module({
  imports: [KafkaModule],
  controllers: [EventCategoryController],
  providers: [EventCategoryService],
})
export class EventCategoryModule {}
