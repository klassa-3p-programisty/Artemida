import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  StreamableFile,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable, map } from 'rxjs';
import type { ApiSuccessResponse } from '../interfaces/api-response.interface.js';
import { SKIP_RESPONSE_ENVELOPE } from '../decorators/skip-response-envelope.decorator.js';

@Injectable()
export class ResponseEnvelopeInterceptor<T>
  implements NestInterceptor<T, T | ApiSuccessResponse<T>>
{
  constructor(private readonly reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler<T>): Observable<T | ApiSuccessResponse<T>> {
    const skip = this.reflector.getAllAndOverride<boolean>(SKIP_RESPONSE_ENVELOPE, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (skip) return next.handle();

    const response = context.switchToHttp().getResponse<{ statusCode: number; getHeader?: (name: string) => unknown }>();

    return next.handle().pipe(
      map((data): T | ApiSuccessResponse<T> => {
        if (
          response.statusCode === 204 ||
          data instanceof StreamableFile ||
          response.getHeader?.('content-disposition')
        ) {
          return data;
        }

        // An explicit envelope is passed through to prevent accidental double wrapping.
        if (isSuccessEnvelope(data)) return data as T;

        return {
          success: true,
          data,
          message: 'Operation completed successfully',
        };
      }),
    );
  }
}

function isSuccessEnvelope(value: unknown): value is ApiSuccessResponse<unknown> {
  return typeof value === 'object' && value !== null && 'success' in value && value.success === true && 'data' in value;
}
