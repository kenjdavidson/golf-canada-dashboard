import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { AuthStatus, type AuthState } from './types';

const initialState: AuthState = {
  user: null,
  token: null,
  status: AuthStatus.UNAUTHENTICATED
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // We'll add synchronous reducers here later
    // Example structure for future implementation:
    /*
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    */
  },
  extraReducers: (builder) => {
    // We'll add async reducers here later when we implement the thunks
    // Example structure for future implementation:
    /*
    builder
      .addCase(login.pending, (state) => {
        state.status = AuthStatus.AUTHENTICATING;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = AuthStatus.AUTHENTICATED;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      */
  },
});

export const { 
  // We'll export action creators here later
} = authSlice.actions;

export default authSlice.reducer;
