import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventModule } from './event/event.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from 'config/configuration';
import { Connection } from 'mongoose';
import { EventCategoryModule } from './event-category/event-category.module';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        uri: config.get<string>('MONGODB_URI'),
        onConnectionCreate: (connection: Connection) => {
          console.log('🚀🚀🚀🚀 Connected to database 🚀🚀🚀🚀');
          return connection;
        },
      }),
    }),
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
    EventModule,
    EventCategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
