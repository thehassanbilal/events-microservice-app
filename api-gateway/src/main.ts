import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { ArrayResponseInterceptor } from './common/interceptors/array-response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.use((req, res, next) => {
    console.log(
      `[${new Date().toISOString()}] Incoming ${req.method} request to ${req.url}`,
    );

    const start = Date.now();
    res.on('finish', () => {
      const duration = Date.now() - start;
      console.log(
        `[${new Date().toISOString()}] Response sent for ${req.method} ${req.url} - Status: ${res.statusCode} - Duration: ${duration}ms`,
      );
    });

    next();
  });
  app.enableCors();
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new ArrayResponseInterceptor());
  await app.listen(3030, () => {
    console.log('API Gateway is listening');
  });
}
bootstrap();
