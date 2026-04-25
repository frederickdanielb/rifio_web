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

  return defaultMessage;
}
