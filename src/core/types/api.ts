export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  items: T[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface ApiErrorResponse {
  message?: string;
  detail?: string;
  title?: string;
  statusCode?: number;
  errors?: Record<string, string[]>;
}
