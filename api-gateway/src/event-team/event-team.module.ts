import { Module } from '@nestjs/common';
import { EventTeamService } from './event-team.service';
import { EventTeamController } from './event-team.controller';

@Module({
  controllers: [EventTeamController],
  providers: [EventTeamService],
})
export class EventTeamModule {}
