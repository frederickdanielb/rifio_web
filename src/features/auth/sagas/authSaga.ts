import { type PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLatest } from 'redux-saga/effects';
import axiosClient from '../../../core/api/axiosClient';
import { getApiErrorMessage } from '../../../core/api/getApiErrorMessage';
import type {
  LoginRequestDto,
  LoginResponseDto,
  RegisterRequestDto,
  RegisterResponseDto,
  VerifyEmailRequestDto,
} from '../types/authTypes';
import {
  loginFailure,
  loginRequest,
  loginSuccess,
  logoutRequest,
  logoutSuccess,
  registerFailure,
  registerRequest,
  registerSuccess,
  verifyEmailFailure,
  verifyEmailRequest,
  verifyEmailSuccess,
  googleLoginFailure,
  googleLoginRequest,
  googleLoginSuccess,
} from '../store/authSlice';

function* handleLogin(action: PayloadAction<LoginRequestDto>) {
  try {
    const response: { data: LoginResponseDto } = yield call(
      axiosClient.post,
      '/auth/login',
      action.payload
    );

    const { id, nombre, email, token } = response.data;
    localStorage.setItem('rifio_token', token);
    yield put(loginSuccess({ user: { id, email, name: nombre }, token }));
  } catch (error: unknown) {
    yield put(loginFailure(getApiErrorMessage(error)));
  }
}

function* handleRegister(action: PayloadAction<RegisterRequestDto>) {
  try {
    const response: { data: RegisterResponseDto } = yield call(
      axiosClient.post,
      '/auth/register',
      action.payload
    );

    const { mensaje } = response.data;
    yield put(registerSuccess({ message: mensaje ?? 'Registro exitoso. Revisa tu correo.' }));
  } catch (error: unknown) {
    yield put(registerFailure(getApiErrorMessage(error)));
  }
}

function* handleVerifyEmail(action: PayloadAction<VerifyEmailRequestDto>) {
  try {
    const response: { data: LoginResponseDto } = yield call(
      axiosClient.post,
      '/auth/verify-email',
      action.payload
    );

    const { id, nombre, email, token } = response.data;
    localStorage.setItem('rifio_token', token);
    yield put(verifyEmailSuccess({ user: { id, email, name: nombre }, token }));
  } catch (error: unknown) {
    yield put(verifyEmailFailure(getApiErrorMessage(error)));
  }
}

function* handleGoogleLogin(action: PayloadAction<string>) {
  try {
    const response: { data: LoginResponseDto } = yield call(
      axiosClient.post,
      '/auth/google',
      { idToken: action.payload }
    );

    const { id, nombre, email, token } = response.data;
    localStorage.setItem('rifio_token', token);
    yield put(googleLoginSuccess({ user: { id, email, name: nombre }, token }));
  } catch (error: unknown) {
    yield put(googleLoginFailure(getApiErrorMessage(error)));
  }
}

function* handleLogout() {
  localStorage.removeItem('rifio_token');
  localStorage.removeItem('rifio_user');
  yield put(logoutSuccess());
}

export function* authSaga() {
  yield takeLatest(loginRequest.type, handleLogin);
  yield takeLatest(registerRequest.type, handleRegister);
  yield takeLatest(verifyEmailRequest.type, handleVerifyEmail);
  yield takeLatest(googleLoginRequest.type, handleGoogleLogin);
  yield takeLatest(logoutRequest.type, handleLogout);
}
