import { Module, Global, OnModuleInit, Inject } from '@nestjs/common';
import { ClientKafka, ClientsModule, Transport } from '@nestjs/microservices';

@Global()
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
  providers: [
    {
      provide: 'KAFKA_CLIENT',
      useExisting: 'EVENT_SERVICE',
    },
  ],
  exports: [ClientsModule, 'KAFKA_CLIENT'],
})
export class KafkaModule implements OnModuleInit {
  constructor(
    @Inject('EVENT_SERVICE')
    private readonly kafkaClient: ClientKafka,
  ) {}

  async onModuleInit() {
    const eventRequestPatterns = [
      'createEventCategory',
      'findAllEventCategory',
      'findOneEventCategory',
      'updateEventCategory',
      'deleteEventCategory',
    ];

    const eventCategoryRequestPatterns = [
      'createVirtualEvent',
      'findAllVirtualEvents',
      'findOneVirtualEvent',
      'updateVirtualEvent',
      'deleteVirtualEvent',

      'createPhysicalEvent',
      'findAllPhysicalEvents',
      'findOnePhysicalEvent',
      'updatePhysicalEvent',
      'deletePhysicalEvent',
    ];

    const allRequestPatterns = [
      ...eventRequestPatterns,
      ...eventCategoryRequestPatterns,
    ];

    allRequestPatterns.forEach((pattern) => {
      this.kafkaClient.subscribeToResponseOf(pattern);
    });

    await this.kafkaClient.connect();

    console.log('Kafka Client connected and subscriptions are active');
  }

  onModuleDestroy() {
    this.kafkaClient.close();
  }
}
