import { Module } from '@nestjs/common';
import { EventTeamService } from './event-team.service';
import { EventTeamController } from './event-team.controller';
import { EventTeamSeeder } from './event-team.seeder';
import { MongooseModule } from '@nestjs/mongoose';
import { EventTeam, EventTeamSchema } from './schema/event-team.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: EventTeam.name,
        schema: EventTeamSchema,
      },
    ]),
  ],
  controllers: [EventTeamController],
  providers: [EventTeamService, EventTeamSeeder],
  exports: [EventTeamSeeder],
})
export class EventTeamModule {}
