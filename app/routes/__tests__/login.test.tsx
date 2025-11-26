import { describe, it, expect, vi, beforeEach } from 'vitest';
import Login from '../login';

// Mock react-router
const mockNavigate = vi.fn();
vi.mock('react-router', () => ({
  useNavigate: () => mockNavigate,
  Link: ({ to, children }: { to: string; children: React.ReactNode }) => (
    <a href={to}>{children}</a>
  ),
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
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../../store/auth';
import { api } from '../../store/api';
import React from 'react';

describe('Login Page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('component is defined and exportable', () => {
    expect(Login).toBeDefined();
    expect(typeof Login).toBe('function');
  });

  it('default export is the Login component', () => {
    expect(Login.name).toBe('Login');
  });

  it('renders with reversed column order on mobile (form first, content second)', () => {
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

    const { container } = render(
      <Provider store={store}>
        <Login />
      </Provider>
    );

    // Get the main flex container
    const flexContainer = container.querySelector('.flex');
    expect(flexContainer).toBeTruthy();
    
    // Verify flex-col-reverse is applied for mobile layout (form on top)
    // and lg:flex-row is applied for desktop layout (side by side)
    expect(flexContainer?.className).toContain('flex-col-reverse');
    expect(flexContainer?.className).toContain('lg:flex-row');
  });

  it('renders login form column with full width on mobile and constrained on desktop', () => {
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

    const { container } = render(
      <Provider store={store}>
        <Login />
      </Provider>
    );

    // Get the login form column (parent of the "Sign In" heading)
    const signInHeading = screen.getByText('Sign In');
    const formCard = signInHeading.closest('.bg-white');
    const formColumn = formCard?.parentElement;
    
    expect(formColumn).toBeTruthy();
    
    // Verify w-full is applied for full width on mobile
    expect(formColumn?.className).toContain('w-full');
    // Verify lg:max-w-md is applied for constrained width on desktop only
    expect(formColumn?.className).toContain('lg:max-w-md');
    // Verify max-w-md without the lg: prefix is NOT applied (would constrain mobile width)
    expect(formColumn?.className).not.toMatch(/(?<![a-z]:)max-w-md/);
  });
});
