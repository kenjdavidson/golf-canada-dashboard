import authReducer from '../index';
import { AuthStatus } from '../types';

describe('auth reducer', () => {
  it('should handle initial state', () => {
    expect(authReducer(undefined, { type: 'unknown' })).toEqual({
      user: null,
      token: null,
      status: AuthStatus.UNAUTHENTICATED,
    });
  });
});
