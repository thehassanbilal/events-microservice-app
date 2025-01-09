import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventModule } from './event/event.module';
import { EventCategoryModule } from './event-category/event-category.module';
import { EventTeamModule } from './event-team/event-team.module';
import { LanguageModule } from './language/language.module';

@Module({
  imports: [EventModule, EventCategoryModule, EventTeamModule, LanguageModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
