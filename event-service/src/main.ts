import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { kafkaConfig } from './kafka.config';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, kafkaConfig);
  await app.listen();
  console.log('Event service is listening');
}
bootstrap();
