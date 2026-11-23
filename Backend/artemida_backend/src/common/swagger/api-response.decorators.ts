import { applyDecorators, HttpStatus, Type } from '@nestjs/common';
import { ApiExtraModels, ApiResponse, getSchemaPath } from '@nestjs/swagger';

export class ApiSuccessEnvelopeDto<T> {
  success!: true;
  data!: T;
  message!: string;
}

export class ApiErrorEnvelopeDto {
  success!: false;
  error!: { code: string; message: string; details: unknown[] };
}

export const ApiStandardResponse = <TModel extends Type<unknown>>(
  model: TModel,
  status = HttpStatus.OK,
) =>
  applyDecorators(
    ApiExtraModels(ApiSuccessEnvelopeDto, model),
    ApiResponse({
      status,
      schema: {
        allOf: [
          { $ref: getSchemaPath(ApiSuccessEnvelopeDto) },
          {
            properties: {
              data: { $ref: getSchemaPath(model) },
            },
          },
        ],
      },
    }),
  );

export const ApiStandardErrorResponse = (status = HttpStatus.BAD_REQUEST) =>
  applyDecorators(ApiExtraModels(ApiErrorEnvelopeDto), ApiResponse({ status, type: ApiErrorEnvelopeDto }));
