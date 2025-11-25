import { describe, it, expect, vi, beforeEach } from 'vitest';
import Home from '../home';

// Mock react-router
const mockNavigate = vi.fn();
vi.mock('react-router', () => ({
  useNavigate: () => mockNavigate,
}));

// Mock react-redux with importOriginal to preserve other exports
vi.mock('react-redux', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-redux')>();
  return {
    ...actual,
    useSelector: vi.fn(),
  };
});

// Import after mocking
import { AuthStatus } from '../../store/auth/types';
import { useSelector } from 'react-redux';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../../store/auth';
import { api } from '../../store/api';
import React from 'react';

describe('Home Page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('component is defined and exportable', () => {
    expect(Home).toBeDefined();
    expect(typeof Home).toBe('function');
  });

  it('default export is the Home component', () => {
    expect(Home.name).toBe('Home');
  });

  it('navigates to /login when user is unauthenticated', () => {
    vi.mocked(useSelector).mockReturnValue(AuthStatus.UNAUTHENTICATED);
    
    const store = configureStore({
      reducer: {
        auth: authReducer,
        [api.reducerPath]: api.reducer,
      },
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware),
      preloadedState: {
        auth: {
          user: null,
          token: null,
          status: AuthStatus.UNAUTHENTICATED,
        },
      },
    });

    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    expect(mockNavigate).toHaveBeenCalledWith('/login', { replace: true });
  });

  it('navigates to /profile when user is authenticated', () => {
    vi.mocked(useSelector).mockReturnValue(AuthStatus.AUTHENTICATED);
    
    const store = configureStore({
      reducer: {
        auth: authReducer,
        [api.reducerPath]: api.reducer,
      },
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware),
      preloadedState: {
        auth: {
          user: { id: 1, username: 'test' } as any,
          token: { access_token: 'test-token' } as any,
          status: AuthStatus.AUTHENTICATED,
        },
      },
    });

    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    expect(mockNavigate).toHaveBeenCalledWith('/profile', { replace: true });
  });

  it('does not navigate while authenticating', () => {
    vi.mocked(useSelector).mockReturnValue(AuthStatus.AUTHENTICATING);
    
    const store = configureStore({
      reducer: {
        auth: authReducer,
        [api.reducerPath]: api.reducer,
      },
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware),
      preloadedState: {
        auth: {
          user: null,
          token: null,
          status: AuthStatus.AUTHENTICATING,
        },
      },
    });

    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    expect(mockNavigate).not.toHaveBeenCalled();
  });
});

