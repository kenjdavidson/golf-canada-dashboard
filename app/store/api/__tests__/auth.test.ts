import { describe, it, expect, beforeEach } from 'vitest'
import type { User } from '~/store/auth/types'
import { api } from '../index'
import type { LoginResponse } from '../types'
import { http, HttpResponse } from 'msw'
import { configureStore } from '@reduxjs/toolkit'
import { authApi } from '../auth'
import { server } from '~/test/server'

const mockUser: User = {
    id: 123,
    authUserId: 123,
    networkId: 1,
    username: 'testuser',
    email: 'test@example.com',
    firstName: 'Test',
    lastName: 'User',
    fullName: 'Test User',
    golfCanadaCardId: 'GC123',
    handicap: '12.4',
    pcc: '',
    isAdmin: false,
    isNationalAdmin: false,
    isNationalLookupAdmin: false,
    isAssociationAdmin: false,
    isSystemAdmin: false,
    isTournamentAdmin: false,
    isHandicapChair: false,
    isLimitedClubAdmin: false,
    isPending: false,
    membershipLevel: '',
    expirationDate: '',
    clubManagementGroupId: 0,
    termsAndConditionsDate: '',
    isClubManagingUpgrades: false,
    allowScorePosting: false,
    subscriptionRenewsOn: null,
    scoreDefaults: undefined
};

const mockToken: Omit<LoginResponse, 'expire_date'> = {
  access_token: 'mock_access_token',
  token_type: 'Bearer',
  expires_in: 3600,
  refresh_token: 'mock_refresh_token',
  id_token: 'mock_id_token',
  user: mockUser
};

describe('Auth API', () => {
  let store: ReturnType<typeof configureStore>;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        [api.reducerPath]: api.reducer,
        auth: authApi.reducer
      },
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware)
    });
  });

  describe('login', () => {
    it('formats the request correctly and transforms the response', async () => {
      server.use(
        http.post('https://scg.golfcanada.ca/connect/token', async (req) => {
          const response: LoginResponse = {
            ...mockToken,
            expire_date: new Date(Date.now() + mockToken.expires_in * 1000).toISOString()
          };

          return HttpResponse.json(response);
        })
      );

      const result = await store.dispatch(
        authApi.endpoints.login.initiate({
          username: 'testuser',
          password: 'testpass'
        }) as any
      ).unwrap()

      expect(result.access_token).toBe(mockToken.access_token)
      expect(result.user).toEqual(mockToken.user)
      expect(new Date(result.expire_date).getTime()).toBeGreaterThan(Date.now())
    })
  })

  it('handles server invalid user error', async () => {
    server.use(
      http.post('https://scg.golfcanada.ca/connect/token', () => {
        return HttpResponse.json(
          {
            error: "invalid_grant",
            error_description: "The specified user does not exist."
          },
          { status: 401 }
        )
      })
    )

    await expect(
      store.dispatch(
        authApi.endpoints.login.initiate({
          username: 'baduser',
          password: 'badpass'
        }) as any
      ).unwrap()
    ).rejects.toEqual(
      expect.objectContaining({
        data: {
          error: "invalid_grant",
          error_description: "The specified user does not exist."
        },
        status: 401
      })
    )
  })

  it('handles server invalid password error', async () => {
    server.use(
      http.post('https://scg.golfcanada.ca/connect/token', () => {
        return HttpResponse.json(
          {
            error: "invalid_grant",
            error_description: "The specified password is invalid."
          },
          { status: 401 }
        )
      })
    )

    await expect(
      store.dispatch(
        authApi.endpoints.login.initiate({
          username: 'baduser',
          password: 'badpass'
        }) as any
      ).unwrap()
    ).rejects.toEqual(
      expect.objectContaining({
        data: {
          error: "invalid_grant",
          error_description: "The specified password is invalid."
        },
        status: 401
      })
    )
  })
});