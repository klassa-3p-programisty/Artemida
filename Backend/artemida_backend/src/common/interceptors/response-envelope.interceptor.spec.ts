import { HttpStatus, StreamableFile } from '@nestjs/common';
import { of } from 'rxjs';
import { ResponseEnvelopeInterceptor } from './response-envelope.interceptor.js';

describe('ResponseEnvelopeInterceptor', () => {
  const reflector = { getAllAndOverride: vi.fn().mockReturnValue(false) };
  const interceptor = new ResponseEnvelopeInterceptor(reflector as never);
  const context = (statusCode = HttpStatus.OK) => ({
    getHandler: vi.fn(),
    getClass: vi.fn(),
    switchToHttp: () => ({ getResponse: () => ({ statusCode }) }),
  }) as never;

  it('wraps objects, arrays, primitives, and null without changing status', async () => {
    for (const data of [{ id: 1 }, [1, 2], null]) {
      const result = await new Promise((resolve) =>
        interceptor.intercept(context(), { handle: () => of(data) } as never).subscribe(resolve),
      );
      expect(result).toEqual({ success: true, data, message: 'Operation completed successfully' });
    }
  });

  it('does not wrap 204 responses, streams, explicit envelopes, or opted-out handlers', async () => {
    const file = { pipe: vi.fn() };
    const cases = [
      [context(HttpStatus.NO_CONTENT), 'ignored'],
      [context(), { success: true, data: 'already wrapped', message: 'ok' }],
      [context(), new StreamableFile(Buffer.from('file'))],
    ] as const;
    for (const [ctx, data] of cases) {
      const result = await new Promise((resolve) =>
        interceptor.intercept(ctx, { handle: () => of(data) } as never).subscribe(resolve),
      );
      expect(result).toBe(data);
    }
    reflector.getAllAndOverride.mockReturnValueOnce(true);
    const skipped = await new Promise((resolve) =>
      interceptor.intercept(context(), { handle: () => of(file) } as never).subscribe(resolve),
    );
    expect(skipped).toBe(file);
  });
});
