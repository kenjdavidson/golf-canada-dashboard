import { describe, it, expect } from 'vitest'
import {
  selectAuthState,
  selectUser,
  selectToken,
  selectAuthStatus,
  selectIsAuthenticated,
  selectAccessToken,
  selectAuthHeaders
} from '../selectors'
import { AuthStatus } from '../types'

describe('Auth Selectors', () => {
  const mockUser = {
    id: 1538533,
    authUserId: 1673106,
    networkId: 3234132,
    golfCanadaCardId: "5200043264",
    username: "TESTUSER",
    fullName: "Test User",
    firstName: "Test",
    lastName: "User",
    handicap: "8.5",
    pcc: "",
    email: "test@example.com",
    isAdmin: false,
    isNationalAdmin: false,
    isNationalLookupAdmin: false,
    isAssociationAdmin: false,
    isSystemAdmin: false,
    isTournamentAdmin: false,
    isHandicapChair: false,
    isLimitedClubAdmin: false,
    isPending: false,
    membershipLevel: "Gold",
    expirationDate: "2026-02-01T00:00:00",
    clubManagementGroupId: 8,
    termsAndConditionsDate: "2025-06-25T11:42:54",
    isClubManagingUpgrades: true,
    allowScorePosting: true,
    subscriptionRenewsOn: null,
    scoreDefaults: {
      nationalAssociation: "RCGA",
      facilityId: 20598,
      facilityName: "Test Golf Club",
      courseId: 20599,
      teeId: 83281,
      postHoleByHole: true
    }
  };

  const mockToken = {
    token_type: "Bearer",
    access_token: "test-access-token",
    expires_in: 3600,
    refresh_token: "test-refresh-token",
    id_token: "test-id-token",
    expire_date: "2025-08-01T20:47:37.7376272Z"
  };

  const mockState = {
    auth: {
      user: mockUser,
      token: mockToken,
      status: AuthStatus.AUTHENTICATED
    }
  };

  it('should select the entire auth state', () => {
    expect(selectAuthState(mockState as any)).toEqual(mockState.auth);
  });

  it('should select the user', () => {
    expect(selectUser(mockState as any)).toEqual(mockUser);
  });

  it('should select the token', () => {
    expect(selectToken(mockState as any)).toEqual(mockToken);
  });

  it('should select the auth status', () => {
    expect(selectAuthStatus(mockState as any)).toEqual(AuthStatus.AUTHENTICATED);
  });

  it('should determine if user is authenticated', () => {
    expect(selectIsAuthenticated(mockState as any)).toBe(true);

    const unauthenticatedState = {
      auth: {
        ...mockState.auth,
        token: null
      }
    };
    expect(selectIsAuthenticated(unauthenticatedState as any)).toBe(false);
  });

  it('should select the access token', () => {
    expect(selectAccessToken(mockState as any)).toBe('test-access-token');
  });

  it('should return auth headers when token exists', () => {
    expect(selectAuthHeaders(mockState as any)).toEqual({
      Authorization: 'Bearer test-access-token'
    });
  });

  it('should return empty headers when no token exists', () => {
    const noTokenState = {
      auth: {
        ...mockState.auth,
        token: null
      }
    };
    expect(selectAuthHeaders(noTokenState as any)).toEqual({});
  });
});
