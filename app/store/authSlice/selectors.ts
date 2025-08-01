import type { RootState } from '../index';

// Basic selectors
export const selectAuthState = (state: RootState) => state.auth;
export const selectUser = (state: RootState) => state.auth.user;
export const selectToken = (state: RootState) => state.auth.token;
export const selectAuthStatus = (state: RootState) => state.auth.status;

// Derived selectors
export const selectIsAuthenticated = (state: RootState) => 
  Boolean(state.auth.token?.access_token && state.auth.user);

export const selectAccessToken = (state: RootState) => 
  state.auth.token?.access_token;

export const selectAuthHeaders = (state: RootState) => {
  const token = selectAccessToken(state);
  return token ? { Authorization: `Bearer ${token}` } : {};
};
