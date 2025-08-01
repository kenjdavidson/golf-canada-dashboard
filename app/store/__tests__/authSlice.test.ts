import authReducer from '../authSlice';
import { AuthStatus } from '../authSlice/types';

describe('auth reducer', () => {
  it('should handle initial state', () => {
    expect(authReducer(undefined, { type: 'unknown' })).toEqual({
      user: null,
      token: null,
      status: AuthStatus.UNAUTHENTICATED,
    });
  });
});
