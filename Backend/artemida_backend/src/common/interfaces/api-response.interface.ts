export interface ApiSuccessResponse<T> {
  success: true;
  data: T;
  message: string;
}

export interface ApiErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details: unknown[];
  };
}

export interface PaginatedData<T> {
  items: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
