import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../../store/auth';
import { api } from '../../store/api';
import { AuthStatus } from '../../store/auth/types';
import { Navigation } from '../Navigation';

// Mock animate function for jsdom (Material Tailwind ripple effects)
Element.prototype.animate = vi.fn().mockReturnValue({
  finished: Promise.resolve(),
  cancel: vi.fn(),
});

// Mock react-router
vi.mock('react-router', () => ({
  Link: ({ to, children, onClick }: { to: string; children: React.ReactNode; onClick?: () => void }) => (
    <a href={to} onClick={onClick}>{children}</a>
  ),
}));

describe('Navigation', () => {
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

  const createStore = (preloadedState = {}) => {
    return configureStore({
      reducer: {
        auth: authReducer,
        [api.reducerPath]: api.reducer,
      },
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware),
      preloadedState,
    });
  };

  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  describe('Logged Out State', () => {
    it('renders Golf Canada link', () => {
      const store = createStore({
        auth: {
          user: null,
          token: null,
          status: AuthStatus.UNAUTHENTICATED,
        },
      });

      render(
        <Provider store={store}>
          <Navigation />
        </Provider>
      );

      expect(screen.getByText('Golf Canada')).toBeTruthy();
    });

    it('renders Login button when not authenticated', () => {
      const store = createStore({
        auth: {
          user: null,
          token: null,
          status: AuthStatus.UNAUTHENTICATED,
        },
      });

      render(
        <Provider store={store}>
          <Navigation />
        </Provider>
      );

      expect(screen.getByTestId('login-button')).toBeTruthy();
      expect(screen.queryByTestId('logout-button')).toBeNull();
    });

    it('renders theme toggle button', () => {
      const store = createStore({
        auth: {
          user: null,
          token: null,
          status: AuthStatus.UNAUTHENTICATED,
        },
      });

      render(
        <Provider store={store}>
          <Navigation />
        </Provider>
      );

      expect(screen.getByTestId('theme-toggle')).toBeTruthy();
    });

    it('does not render secondary navbar when logged out', () => {
      const store = createStore({
        auth: {
          user: null,
          token: null,
          status: AuthStatus.UNAUTHENTICATED,
        },
      });

      render(
        <Provider store={store}>
          <Navigation />
        </Provider>
      );

      expect(screen.queryByTestId('secondary-nav')).toBeNull();
    });
  });

  describe('Logged In State', () => {
    it('renders Logout button when authenticated', () => {
      const store = createStore({
        auth: {
          user: mockUser,
          token: mockToken,
          status: AuthStatus.AUTHENTICATED,
        },
      });

      render(
        <Provider store={store}>
          <Navigation />
        </Provider>
      );

      expect(screen.getByTestId('logout-button')).toBeTruthy();
      expect(screen.queryByTestId('login-button')).toBeNull();
    });

    it('renders secondary navbar when authenticated', () => {
      const store = createStore({
        auth: {
          user: mockUser,
          token: mockToken,
          status: AuthStatus.AUTHENTICATED,
        },
      });

      render(
        <Provider store={store}>
          <Navigation />
        </Provider>
      );

      expect(screen.getByTestId('secondary-nav')).toBeTruthy();
    });

    it('displays user full name in secondary navbar', () => {
      const store = createStore({
        auth: {
          user: mockUser,
          token: mockToken,
          status: AuthStatus.AUTHENTICATED,
        },
      });

      render(
        <Provider store={store}>
          <Navigation />
        </Provider>
      );

      expect(screen.getByTestId('user-name').textContent).toBe('Test User');
    });

    it('displays member number in secondary navbar', () => {
      const store = createStore({
        auth: {
          user: mockUser,
          token: mockToken,
          status: AuthStatus.AUTHENTICATED,
        },
      });

      render(
        <Provider store={store}>
          <Navigation />
        </Provider>
      );

      expect(screen.getByTestId('member-number').textContent).toContain('5200043264');
    });

    it('displays handicap in secondary navbar', () => {
      const store = createStore({
        auth: {
          user: mockUser,
          token: mockToken,
          status: AuthStatus.AUTHENTICATED,
        },
      });

      render(
        <Provider store={store}>
          <Navigation />
        </Provider>
      );

      expect(screen.getByTestId('user-handicap').textContent).toContain('Handicap:');
      expect(screen.getByTestId('user-handicap').textContent).toContain('8.5');
    });

    it('secondary navbar has sticky positioning', () => {
      const store = createStore({
        auth: {
          user: mockUser,
          token: mockToken,
          status: AuthStatus.AUTHENTICATED,
        },
      });

      render(
        <Provider store={store}>
          <Navigation />
        </Provider>
      );

      const secondaryNav = screen.getByTestId('secondary-nav');
      expect(secondaryNav.className).toContain('sticky');
      expect(secondaryNav.className).toContain('top-0');
    });

    it('renders hamburger menu when authenticated', () => {
      const store = createStore({
        auth: {
          user: mockUser,
          token: mockToken,
          status: AuthStatus.AUTHENTICATED,
        },
      });

      render(
        <Provider store={store}>
          <Navigation />
        </Provider>
      );

      expect(screen.getByTestId('hamburger-menu')).toBeTruthy();
    });

    it('toggles menu dropdown when hamburger is clicked', () => {
      const store = createStore({
        auth: {
          user: mockUser,
          token: mockToken,
          status: AuthStatus.AUTHENTICATED,
        },
      });

      render(
        <Provider store={store}>
          <Navigation />
        </Provider>
      );

      // Initially menu should be closed
      expect(screen.queryByTestId('menu-dropdown')).toBeNull();

      // Click hamburger to open menu
      fireEvent.click(screen.getByTestId('hamburger-menu'));
      expect(screen.getByTestId('menu-dropdown')).toBeTruthy();

      // Click hamburger again to close menu
      fireEvent.click(screen.getByTestId('hamburger-menu'));
      expect(screen.queryByTestId('menu-dropdown')).toBeNull();
    });

    it('displays navigation links in dropdown menu', () => {
      const store = createStore({
        auth: {
          user: mockUser,
          token: mockToken,
          status: AuthStatus.AUTHENTICATED,
        },
      });

      render(
        <Provider store={store}>
          <Navigation />
        </Provider>
      );

      // Open menu
      fireEvent.click(screen.getByTestId('hamburger-menu'));

      const dropdown = screen.getByTestId('menu-dropdown');
      expect(dropdown.textContent).toContain('Home');
      expect(dropdown.textContent).toContain('Profile');
      expect(dropdown.textContent).toContain('Privacy Policy');
      expect(dropdown.textContent).toContain('Terms of Service');
    });

    it('closes menu when a link is clicked', () => {
      const store = createStore({
        auth: {
          user: mockUser,
          token: mockToken,
          status: AuthStatus.AUTHENTICATED,
        },
      });

      render(
        <Provider store={store}>
          <Navigation />
        </Provider>
      );

      // Open menu
      fireEvent.click(screen.getByTestId('hamburger-menu'));
      expect(screen.getByTestId('menu-dropdown')).toBeTruthy();

      // Click a link
      fireEvent.click(screen.getByText('Home'));
      expect(screen.queryByTestId('menu-dropdown')).toBeNull();
    });

    it('dispatches logout action when logout button is clicked', () => {
      const store = createStore({
        auth: {
          user: mockUser,
          token: mockToken,
          status: AuthStatus.AUTHENTICATED,
        },
      });

      render(
        <Provider store={store}>
          <Navigation />
        </Provider>
      );

      // Click logout
      fireEvent.click(screen.getByTestId('logout-button'));

      // Check that state was updated
      const state = store.getState();
      expect(state.auth.user).toBeNull();
      expect(state.auth.token).toBeNull();
      expect(state.auth.status).toBe(AuthStatus.UNAUTHENTICATED);
    });
  });

  describe('Theme Toggle', () => {
    it('toggles theme when theme button is clicked', () => {
      const store = createStore({
        auth: {
          user: null,
          token: null,
          status: AuthStatus.UNAUTHENTICATED,
        },
      });

      render(
        <Provider store={store}>
          <Navigation />
        </Provider>
      );

      const themeToggle = screen.getByTestId('theme-toggle');
      fireEvent.click(themeToggle);
      
      expect(localStorage.getItem('theme')).toBe('dark');
    });
  });
});
