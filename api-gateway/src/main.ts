import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { ArrayResponseInterceptor } from './common/interceptors/array-response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors();
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new ArrayResponseInterceptor());
  await app.listen(3030, () => {
    console.log('API Gateway is listening');
  });
}
bootstrap();
