import { Module } from '@nestjs/common';
import { EventCategoryService } from './event-category.service';
import { EventCategoryController } from './event-category.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  EventCategory,
  EventCategorySchema,
} from './schema/event-category.schema';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: EventCategory.name, schema: EventCategorySchema },
    ]),
    ClientsModule.register([
      {
        name: 'EVENT_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'event-service-consumer',
          },
        },
      },
    ]),
  ],
  controllers: [EventCategoryController],
  providers: [EventCategoryService],
})
export class EventCategoryModule {}
