import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { AuthUser, LoginRequestDto, RegisterRequestDto, VerifyEmailRequestDto } from '../types/authTypes';
import { type DecodedClaims, decodeJwt } from '../../../core/api/jwtDecoder';

export interface AuthState {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  claims: DecodedClaims | null;
  verificationMessage: string | null;
}

function loadUserFromStorage(): AuthUser | null {
  try {
    const raw = localStorage.getItem('rifio_user');
    return raw ? (JSON.parse(raw) as AuthUser) : null;
  } catch {
    return null;
  }
}

function saveUserToStorage(user: AuthUser) {
  localStorage.setItem('rifio_user', JSON.stringify(user));
}

function clearUserFromStorage() {
  localStorage.removeItem('rifio_user');
}

const tokenFromStorage = localStorage.getItem('rifio_token');
const initialClaims = tokenFromStorage ? decodeJwt(tokenFromStorage) : null;
const userFromStorage = loadUserFromStorage();

const initialState: AuthState = {
  user: userFromStorage,
  token: tokenFromStorage,
  isAuthenticated: Boolean(tokenFromStorage),
  loading: false,
  error: null,
  claims: initialClaims,
  verificationMessage: null,
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
      state.claims = decodeJwt(action.payload.token);
      state.error = null;
      state.verificationMessage = null;
      saveUserToStorage(action.payload.user);
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.error = action.payload;
    },
    registerRequest: (state, _action: PayloadAction<RegisterRequestDto>) => {
      state.loading = true;
      state.error = null;
      state.verificationMessage = null;
    },
    registerSuccess: (state, action: PayloadAction<{ message: string }>) => {
      state.loading = false;
      state.error = null;
      state.verificationMessage = action.payload.message;
    },
    registerFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
      state.verificationMessage = null;
    },
    verifyEmailRequest: (state, _action: PayloadAction<VerifyEmailRequestDto>) => {
      state.loading = true;
      state.error = null;
    },
    verifyEmailSuccess: (state, action: PayloadAction<{ user: AuthUser; token: string }>) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.claims = decodeJwt(action.payload.token);
      state.error = null;
      saveUserToStorage(action.payload.user);
    },
    verifyEmailFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    googleLoginRequest: (state, _action: PayloadAction<string>) => {
      state.loading = true;
      state.error = null;
    },
    googleLoginSuccess: (state, action: PayloadAction<{ user: AuthUser; token: string }>) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.claims = decodeJwt(action.payload.token);
      state.error = null;
      saveUserToStorage(action.payload.user);
    },
    googleLoginFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    logoutRequest: (state) => {
      state.loading = true;
    },
    logoutSuccess: () => {
      clearUserFromStorage();
      return {
        ...initialState,
        user: null,
        token: null,
        isAuthenticated: false,
        claims: null,
        verificationMessage: null,
      };
    },
  },
});

export const {
  loginRequest,
  loginSuccess,
  loginFailure,
  registerRequest,
  registerSuccess,
  registerFailure,
  verifyEmailRequest,
  verifyEmailSuccess,
  verifyEmailFailure,
  googleLoginRequest,
  googleLoginSuccess,
  googleLoginFailure,
  logoutRequest,
  logoutSuccess,
} = authSlice.actions;
export default authSlice.reducer;
