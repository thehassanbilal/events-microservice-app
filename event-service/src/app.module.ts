import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventModule } from './event/event.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import configuration from 'config/configuration';
import { Connection } from 'mongoose';

const uri = 'mongodb://127.0.0.1/event-service';
const logString =
  '==================== 🚀🚀🚀🚀 Connected to database 🚀🚀🚀🚀 ====================';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: uri,
        onConnectionCreate: (connection: Connection) => {
          console.log(logString);
          return connection;
        },
      }),
    }),
    EventModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
