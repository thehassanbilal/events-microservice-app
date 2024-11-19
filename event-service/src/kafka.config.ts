import { Transport } from '@nestjs/microservices';

export const kafkaConfig = {
  transport: Transport.KAFKA,
  options: {
    client: {
      brokers: ['localhost:9092'],
    },
    consumer: {
      groupId: 'event-consumer',
    },
  },
};
