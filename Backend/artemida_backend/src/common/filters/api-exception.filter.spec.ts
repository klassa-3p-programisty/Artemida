import { ArgumentsHost, BadRequestException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { ApiExceptionFilter } from './api-exception.filter.js';

describe('ApiExceptionFilter', () => {
  const filter = new ApiExceptionFilter();
  const response = { status: vi.fn().mockReturnThis(), json: vi.fn() };
  const host = {
    switchToHttp: () => ({
      getResponse: () => response,
      getRequest: () => ({ method: 'GET', url: '/resource' }),
    }),
  } as unknown as ArgumentsHost;

  beforeEach(() => vi.clearAllMocks());

  it('formats validation errors while preserving 400', () => {
    filter.catch(new BadRequestException({ message: ['name must be a string'], error: 'Bad Request' }), host);
    expect(response.status).toHaveBeenCalledWith(400);
    expect(response.json).toHaveBeenCalledWith({ success: false, error: {
      code: 'VALIDATION_ERROR', message: 'Validation failed', details: ['name must be a string'],
    } });
  });

  it('maps authentication and authorization errors and preserves other HTTP exceptions', () => {
    filter.catch(new NotFoundException('Resource missing'), host);
    expect(response.status).toHaveBeenCalledWith(404);
    expect(response.json).toHaveBeenCalledWith({ success: false, error: {
      code: 'HTTP_404', message: 'Resource missing', details: [],
    } });
  });

  it('hides internal exception messages and logs unexpected errors', () => {
    const error = new InternalServerErrorException('database password=secret');
    filter.catch(error, host);
    expect(response.status).toHaveBeenCalledWith(500);
    expect(response.json).toHaveBeenCalledWith({ success: false, error: {
      code: 'INTERNAL_SERVER_ERROR', message: 'Internal server error', details: [],
    } });
    expect(JSON.stringify(response.json.mock.calls)).not.toContain('secret');
  });
});
