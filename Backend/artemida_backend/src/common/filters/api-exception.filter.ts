import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import type { Request, Response } from 'express';
import type { ApiErrorResponse } from '../interfaces/api-response.interface.js';

@Catch()
export class ApiExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(ApiExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const http = host.switchToHttp();
    const response = http.getResponse<Response>();
    const request = http.getRequest<Request>();
    const isHttpException = exception instanceof HttpException;
    const status = isHttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    const payload = isHttpException ? exception.getResponse() : undefined;
    const validation = status === HttpStatus.BAD_REQUEST && hasMessageArray(payload);

    if (!isHttpException || status >= HttpStatus.INTERNAL_SERVER_ERROR) {
      this.logger.error(
        `Unhandled exception for ${request.method} ${request.url}`,
        exception instanceof Error ? exception.stack : String(exception),
      );
    }

    const body: ApiErrorResponse = {
      success: false,
      error: {
        code: errorCode(status, validation),
        message: validation ? 'Validation failed' : publicMessage(status, payload),
        details: validation ? payload.message : [],
      },
    };

    response.status(status).json(body);
  }
}

function hasMessageArray(payload: unknown): payload is { message: string[] } {
  return typeof payload === 'object' && payload !== null && 'message' in payload && Array.isArray(payload.message);
}

function errorCode(status: number, validation: boolean): string {
  if (validation) return 'VALIDATION_ERROR';
  if (status === HttpStatus.UNAUTHORIZED) return 'AUTHENTICATION_ERROR';
  if (status === HttpStatus.FORBIDDEN) return 'AUTHORIZATION_ERROR';
  if (status >= HttpStatus.INTERNAL_SERVER_ERROR) return 'INTERNAL_SERVER_ERROR';
  return `HTTP_${status}`;
}

function publicMessage(status: number, payload: unknown): string {
  if (status >= HttpStatus.INTERNAL_SERVER_ERROR) return 'Internal server error';
  if (typeof payload === 'string') return payload;
  if (typeof payload === 'object' && payload !== null && 'message' in payload) {
    const message = payload.message;
    if (typeof message === 'string') return message;
  }
  return status === HttpStatus.UNAUTHORIZED
    ? 'Authentication required'
    : status === HttpStatus.FORBIDDEN
      ? 'Access denied'
      : 'Request failed';
}
