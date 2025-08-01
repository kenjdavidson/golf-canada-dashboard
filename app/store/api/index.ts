import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { RootState } from '../index';

export const api = createApi({
  reducerPath: 'golfCanadaApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://scg.golfcanada.ca',
    prepareHeaders: (headers, { getState }) => {
      // Get the token from the auth state
      const token = (getState() as RootState).auth.token?.access_token;
      
      // If we have a token, add it to the headers
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: () => ({}), // We'll define endpoints in separate files
});

// Export hooks for usage in functional components
export const {
  // We'll add endpoint hooks here as we create them
} = api;
