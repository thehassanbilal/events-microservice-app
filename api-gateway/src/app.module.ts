import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventModule } from './event/event.module';
import { EventCategoryModule } from './event-category/event-category.module';

@Module({
  imports: [EventModule, EventCategoryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
