import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { AuthUser, LoginRequestDto } from '../types/authTypes';

export interface AuthState {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const tokenFromStorage = localStorage.getItem('rifio_token');

const initialState: AuthState = {
  user: null,
  token: tokenFromStorage,
  isAuthenticated: Boolean(tokenFromStorage),
  loading: false,
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginRequest: (state, _action: PayloadAction<LoginRequestDto>) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action: PayloadAction<{ user: AuthUser; token: string }>) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.error = null;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.error = action.payload;
    },
    logoutRequest: (state) => {
      state.loading = true;
    },
    logoutSuccess: () => ({
      ...initialState,
      token: null,
      isAuthenticated: false,
    }),
  },
});

export const { loginRequest, loginSuccess, loginFailure, logoutRequest, logoutSuccess } =
  authSlice.actions;
export default authSlice.reducer;
