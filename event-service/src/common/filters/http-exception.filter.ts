import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Catch() // Catch all exceptions
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    // Check if the exception is an instance of HttpException (NestJS built-in exception)
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    // Extract the message from the exception response
    const message =
      exception instanceof HttpException
        ? exception.getResponse()
        : 'Internal server error';

    // Uniform structure for all responses
    response.status(status).json({
      statusCode: status,
      message: typeof message === 'string' ? message : (message as any).message,
      data: null,
      error: {
        path: request.url,
        timestamp: new Date().toISOString(),
        details:
          exception instanceof HttpException
            ? (message as any).error || null
            : exception.stack || null,
      },
    });
  }
}
