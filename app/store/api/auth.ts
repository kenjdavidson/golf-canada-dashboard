import { api } from './index';
import type { LoginRequest, LoginResponse } from './types';

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: ({ username, password }) => ({
        url: '/connect/token',
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          grant_type: 'password',
          username,
          password,
          scope: 'address email offline_access openid phone profile roles'
        }).toString(),
      }),
      transformResponse: (response: LoginResponse) => {
        // Add expire_date to the token response based on expires_in
        const expireDate = new Date();
        expireDate.setSeconds(expireDate.getSeconds() + response.expires_in);
        
        return {
          ...response,
          expire_date: expireDate.toISOString()
        };
      },
    }),
  }),
  overrideExisting: false,
});

export const { useLoginMutation } = authApi;
