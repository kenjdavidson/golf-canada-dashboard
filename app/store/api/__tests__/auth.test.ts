import { User } from '~/store/auth/types';
import { api } from '../index';
import { LoginResponse } from '../types';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { configureStore } from '@reduxjs/toolkit';
import { authApi } from '../auth';

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

// Setup MSW server for mocking API requests
const server = setupServer(
  http.post('https://scg.golfcanada.ca/connect/token', async ({ request }) => {
    // Test that request is properly formatted
    const body = await request.text();
    const params = new URLSearchParams(body);
    
    expect(params.get('grant_type')).toBe('password');
    expect(params.get('scope')).toBe('address email offline_access openid phone profile roles');
    expect(params.get('username')).toBe('testuser');
    expect(params.get('password')).toBe('testpass');
    
    expect(request.headers.get('Content-Type')).toBe('application/x-www-form-urlencoded');

    return HttpResponse.json(mockToken);
  })
);

describe('Auth API', () => {
  let store: ReturnType<typeof configureStore>;

  beforeAll(() => {
    server.listen();
  });

  afterAll(() => {
    server.close();
  });

  beforeEach(() => {
    store = configureStore({
      reducer: {
        [api.reducerPath]: api.reducer
      },
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware)
    }) as any; // Cast to any to avoid dispatch type errors in tests
  });

  afterEach(() => {
    server.resetHandlers();
  });

  describe('login', () => {
    it('formats the request correctly and transforms the response', async () => {
      // Todo
    });

    it('handles server errors', async () => {
      // Todo
    });
  });
});
