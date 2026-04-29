import axios, { type InternalAxiosRequestConfig, isAxiosError } from 'axios';
import { store } from '../../app/store';
import { openUpgradeModal } from '../../app/uiSlice';

const axiosClient = axios.create({
  baseURL: 'http://localhost:5249/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('rifio_token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      isAxiosError(error) &&
      error.response?.status === 400
    ) {
      const problem = error.response?.data as Record<string, unknown> | undefined;
      const detail = (problem?.detail ?? problem?.title ?? '') as string;
      const lowerDetail = detail.toLowerCase();

      if (
        lowerDetail.includes('límite') ||
        lowerDetail.includes('limite') ||
        lowerDetail.includes('plan') ||
        lowerDetail.includes('upgrade') ||
        lowerDetail.includes('máximo')
      ) {
        store.dispatch(openUpgradeModal(detail));
      }
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
