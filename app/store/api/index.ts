import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { selectAccessToken } from '../auth/selectors';
import type { RootState } from '../index';

export const api = createApi({
  reducerPath: 'golfCanadaApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://scg.golfcanada.ca',
    prepareHeaders: (headers, { getState }) => {
      const token = selectAccessToken(getState() as RootState);

      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      
      return headers;
    },
  }),
  endpoints: () => ({}), // We'll define endpoints in separate files
});

export const {
  // We'll add endpoint hooks here as we create them
} = api;
