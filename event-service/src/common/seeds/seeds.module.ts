import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { SeedManagerService } from './seed-manager.service';
import { SeedCommandService } from './seed-command.service';
import { SeedCLIService } from './seed-cli.service';
import { SeedConfigService } from './seed-config.service';
import { SeedController } from './seed.controller';
import { LanguageSeeder } from '../../language/language.seeder';
import { EventCategorySeeder } from '../../event-category/event-category.seeder';
import { EventTeamSeeder } from '../../event-team/event-team.seeder';
import { EventSeeder } from '../../event/event.seeder';
import { LanguageModule } from '../../language/language.module';
import { EventCategoryModule } from '../../event-category/event-category.module';
import { EventTeamModule } from '../../event-team/event-team.module';
import { EventModule } from '../../event/event.module';
import {
  Language,
  LanguageSchema,
} from '../../language/schema/language.schema';
import {
  EventCategory,
  EventCategorySchema,
} from '../../event-category/schema/event-category.schema';
import {
  EventTeam,
  EventTeamSchema,
} from '../../event-team/schema/event-team.schema';
import { Event, EventSchema } from '../../event/schema/event.schema';
import {
  VirtualEvent,
  VirtualEventSchema,
} from '../../event/schema/virtual-event.schema';
import {
  PhysicalEvent,
  PhysicalEventSchema,
} from '../../event/schema/physical-event.schema';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([
      { name: Language.name, schema: LanguageSchema },
      { name: EventCategory.name, schema: EventCategorySchema },
      { name: EventTeam.name, schema: EventTeamSchema },
      { name: Event.name, schema: EventSchema },
      { name: VirtualEvent.name, schema: VirtualEventSchema },
      { name: PhysicalEvent.name, schema: PhysicalEventSchema },
    ]),
    LanguageModule,
    EventCategoryModule,
    EventTeamModule,
    EventModule,
  ],
  controllers: [SeedController],
  providers: [
    SeedManagerService,
    SeedCommandService,
    SeedCLIService,
    SeedConfigService,
    LanguageSeeder,
    EventCategorySeeder,
    EventTeamSeeder,
    EventSeeder,
  ],
  exports: [
    SeedManagerService,
    SeedCommandService,
    SeedCLIService,
    SeedConfigService,
  ],
})
export class SeedsModule {}
