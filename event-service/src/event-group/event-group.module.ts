import { Module } from '@nestjs/common';
import { EventGroupService } from './event-group.service';
import { EventGroupController } from './event-group.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { EventGroup, EventGroupSchema } from './schema/event-group.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: EventGroup.name,
        schema: EventGroupSchema,
      },
    ]),
  ],
  controllers: [EventGroupController],
  providers: [EventGroupService],
})
export class EventGroupModule {}
