import { Module } from '@nestjs/common';
import { EventCategoryService } from './event-category.service';
import { EventCategoryController } from './event-category.controller';
import { EventCategorySeeder } from './event-category.seeder';
import { MongooseModule } from '@nestjs/mongoose';
import {
  EventCategory,
  EventCategorySchema,
} from './schema/event-category.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: EventCategory.name, schema: EventCategorySchema },
    ]),
  ],
  controllers: [EventCategoryController],
  providers: [EventCategoryService, EventCategorySeeder],
  exports: [EventCategorySeeder],
})
export class EventCategoryModule {}
