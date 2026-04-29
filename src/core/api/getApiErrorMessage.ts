import { isAxiosError } from 'axios';
import type { ApiErrorResponse } from '../types';

const defaultMessage = 'Ocurrio un error inesperado. Intenta nuevamente.';

export function getApiErrorMessage(error: unknown): string {
  if (!isAxiosError(error)) {
    return defaultMessage;
  }

  const responseData = error.response?.data as ApiErrorResponse | undefined;

  if (responseData?.message) {
    return responseData.message;
  }

  if (responseData?.detail) {
    return responseData.detail;
  }

  if (responseData?.title) {
    return responseData.title;
  }

  return defaultMessage;
}
