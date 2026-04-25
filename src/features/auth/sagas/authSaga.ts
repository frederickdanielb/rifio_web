import { type PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLatest } from 'redux-saga/effects';
import axiosClient from '../../../core/api/axiosClient';
import { getApiErrorMessage } from '../../../core/api/getApiErrorMessage';
import type { ApiResponse } from '../../../core/types';
import type { LoginRequestDto, LoginResponseDto } from '../types/authTypes';
import {
  loginFailure,
  loginRequest,
  loginSuccess,
  logoutRequest,
  logoutSuccess,
} from '../store/authSlice';

function* handleLogin(action: PayloadAction<LoginRequestDto>) {
  try {
    const response: { data: ApiResponse<LoginResponseDto> } = yield call(
      axiosClient.post,
      '/auth/login',
      action.payload
    );

    const { user, token } = response.data.data;
    localStorage.setItem('rifio_token', token);
    yield put(loginSuccess({ user, token }));
  } catch (error: unknown) {
    yield put(loginFailure(getApiErrorMessage(error)));
  }
}

function* handleLogout() {
  localStorage.removeItem('rifio_token');
  yield put(logoutSuccess());
}

export function* authSaga() {
  yield takeLatest(loginRequest.type, handleLogin);
  yield takeLatest(logoutRequest.type, handleLogout);
}
