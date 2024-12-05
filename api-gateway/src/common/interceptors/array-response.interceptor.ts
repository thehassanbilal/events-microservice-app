import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ArrayResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((response) => {
        if (
          response &&
          typeof response.data === 'object' &&
          !Array.isArray(response.data)
        ) {
          // If data is a plain object with numeric keys, convert it to an array
          const keys = Object.keys(response.data);
          if (keys.every((key) => !isNaN(Number(key)))) {
            response.data = Object.values(response.data);
          }
        }
        return response;
      }),
    );
  }
}
