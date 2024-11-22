import { Module } from '@nestjs/common';
import { GatewayService } from './gateway.service';
import { GatewayController } from './gateway.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'EVENT_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'api-gateway-consumer',
          },
        },
      },
    ]),
  ],
  controllers: [GatewayController],
  providers: [GatewayService],
})
export class GatewayModule {}
