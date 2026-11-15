# HTTP API response standard

This backend wraps ordinary successful controller results and normalizes exceptions. The standard applies to HTTP controllers unless a route explicitly opts out for a protocol-specific response.

## Success responses

```json
{
  "success": true,
  "data": { "id": "123", "name": "Ada" },
  "message": "Operation completed successfully"
}
```

`data` preserves the controller return value: objects, arrays, primitives, and `null` are all supported. The interceptor does not change the HTTP status selected by NestJS or `@HttpCode()`. Return the resource or result from a service; do not construct a second envelope in the service. Existing explicit success envelopes pass through unchanged.

No body is emitted for `204 No Content`. `StreamableFile` and responses with a `Content-Disposition` header are left untouched. Protocol-specific endpoints such as the Terminus health check use `@SkipResponseEnvelope()`; use this sparingly and document the compatibility need.

## Error responses

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation failed",
    "details": ["name must be a string"]
  }
}
```

The global filter preserves `HttpException` status codes. ValidationPipe errors with an array of constraint messages use `VALIDATION_ERROR`; `401` and `403` use `AUTHENTICATION_ERROR` and `AUTHORIZATION_ERROR`; other expected HTTP errors use `HTTP_<status>`. Unexpected errors use `500` and `INTERNAL_SERVER_ERROR`, with the generic message `Internal server error`. Their stack and internal message are written to the server logger and never returned to clients. `details` is an empty array when there are no safe, useful details.

Throw Nest exceptions from controllers/services for expected failures, for example `throw new NotFoundException('User not found')`. Do not send raw database errors or secrets in exception messages.

## Status codes

Use normal HTTP semantics: `200` for successful reads/updates, `201` for creation, `204` for successful operations with no representation, `400` for invalid input, `401` for missing/invalid authentication, `403` for authenticated callers without permission, `404` for missing resources, and `5xx` for server failures. Use `@HttpCode()` where Nest defaults do not match the operation. The envelope never replaces the status code.

## Validation

The global `ValidationPipe` runs before controllers. DTO constraints from `class-validator` produce a `400` response with a stable code and a `details` array of constraint messages. Add constraints to DTO properties; do not duplicate validation in controllers unless a rule depends on business state.

## Pagination

Return pagination as part of `data`, so clients get a consistent top-level contract:

```json
{
  "success": true,
  "data": {
    "items": [{ "id": "123" }],
    "pagination": { "page": 1, "limit": 20, "total": 42, "totalPages": 3 }
  },
  "message": "Operation completed successfully"
}
```

Use the shared `PaginatedData<T>` interface. Services should return the item list and pagination values; the interceptor wraps the complete object once.

## Controller and service example

```ts
@Get(':id')
@ApiStandardResponse(UserDto)
@ApiStandardErrorResponse(404)
getUser(@Param('id') id: string) {
  return this.usersService.getById(id);
}
```

```ts
async getById(id: string): Promise<UserDto> {
  const user = await this.repository.findById(id);
  if (!user) throw new NotFoundException('User not found');
  return user;
}
```

Services return domain results and throw typed Nest exceptions. The response interceptor is registered globally in `main.ts`; the filter is also global. `ApiStandardResponse` and `ApiStandardErrorResponse` document the envelope in Swagger while preserving endpoint-specific docs.

## Extending the standard

Add optional, backward-compatible envelope metadata only through a reviewed contract change. Keep `success`, `data`, and `message` stable, keep errors under `error`, and do not put request-specific business data into the envelope. Update the shared interfaces, interceptor/filter, Swagger decorators, tests, and this document together. For a protocol response that cannot use the envelope, apply `@SkipResponseEnvelope()` to the smallest possible controller or handler and explain why.

## Compatibility note

Enabling the global interceptor changes ordinary endpoint response bodies: clients that previously expected a raw root greeting or resource now receive the success envelope and must read `data`. This is an intentional API contract change for the standard. The existing `/health` Terminus response remains in its native format so current health probes continue to work.
