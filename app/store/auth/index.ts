import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { AuthStatus, type AuthState } from './types';
import { authApi } from '../api/auth';
import type { LoginResponse } from '../api/types';

const initialState: AuthState = {
  user: null,
  token: null,
  status: AuthStatus.UNAUTHENTICATED
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.status = AuthStatus.UNAUTHENTICATED;
    }
  },
  extraReducers: (builder) => {
    builder
      // Handle login request lifecycle
      .addMatcher(
        authApi.endpoints.login.matchPending,
        (state) => {
          state.status = AuthStatus.AUTHENTICATING;
        }
      )
      .addMatcher(
        authApi.endpoints.login.matchFulfilled,
        (state, { payload }) => {
          state.status = AuthStatus.AUTHENTICATED;
          state.user = payload.user;
          state.token = {
            token_type: payload.token_type,
            access_token: payload.access_token,
            expires_in: payload.expires_in,
            refresh_token: payload.refresh_token,
            id_token: payload.id_token,
            expire_date: payload.expire_date
          };
        }
      )
      .addMatcher(
        authApi.endpoints.login.matchRejected,
        (state, { error }) => {
          state.status = AuthStatus.UNAUTHENTICATED;
          state.user = null;
          state.token = null;
        }
      );
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
