export enum AuthStatus {
  UNAUTHENTICATED = 'UNAUTHENTICATED',
  AUTHENTICATING = 'AUTHENTICATING',
  AUTHENTICATED = 'AUTHENTICATED'
}

export interface ScoreDefaults {
  nationalAssociation: string;
  facilityId: number;
  facilityName: string;
  courseId: number;
  teeId: number;
  postHoleByHole: boolean;
}

export interface User {
  id: number;
  authUserId: number;
  networkId: number;
  golfCanadaCardId: string;
  username: string;
  fullName: string;
  firstName: string;
  lastName: string;
  handicap: string;
  pcc: string;
  email: string;
  isAdmin: boolean;
  isNationalAdmin: boolean;
  isNationalLookupAdmin: boolean;
  isAssociationAdmin: boolean;
  isSystemAdmin: boolean;
  isTournamentAdmin: boolean;
  isHandicapChair: boolean;
  isLimitedClubAdmin: boolean;
  isPending: boolean;
  membershipLevel: string;
  expirationDate: string;
  clubManagementGroupId: number;
  termsAndConditionsDate: string;
  isClubManagingUpgrades: boolean;
  allowScorePosting: boolean;
  subscriptionRenewsOn: string | null;
  scoreDefaults?: ScoreDefaults;
}

export interface Token {
  token_type: string;
  access_token: string;
  expires_in: number;
  refresh_token: string;
  id_token: string;
  expire_date: string;
}

export interface AuthState {
  user: User | null;
  token: Token | null;
  status: AuthStatus;
}
