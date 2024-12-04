import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, any> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((response) => {
        const httpContext = context.switchToHttp();
        const httpResponse = httpContext.getResponse();
        const statusCode = httpResponse.statusCode;

        if (!response) {
          return {
            success: false,
            statusCode: statusCode || 500,
            message: 'An error occurred',
            data: {},
          };
        }

        const { message, ...dataWithoutMessage } = response || {};

        return {
          success: true,
          statusCode: statusCode || 200,
          message: message || 'Request successful',
          data: dataWithoutMessage,
        };
      }),
    );
  }
}
