import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { Button, IconButton } from '@material-tailwind/react';
import { useSelector, useDispatch } from 'react-redux';
import { selectIsAuthenticated, selectUser } from '../store/auth/selectors';
import { logout } from '../store/auth';

export function Navigation() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    // Initialize from localStorage if available
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('theme');
      return stored === 'dark';
    }
    return false;
  });

  useEffect(() => {
    // Apply theme on mount and when isDark changes
    const html = document.documentElement;
    if (isDark) {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    const html = document.documentElement;
    if (newIsDark) {
      html.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      html.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      {/* Primary Navigation Bar */}
      <nav className="flex items-center justify-between py-4" data-testid="primary-nav">
        <Link to="/" className="text-xl font-semibold text-gray-900 dark:text-gray-100 hover:opacity-80 transition-opacity">
          Golf Canada
        </Link>
        <div className="flex items-center gap-2">
          <IconButton
            variant="ghost"
            onClick={toggleTheme}
            data-testid="theme-toggle"
          >
            {isDark ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                />
              </svg>
            )}
          </IconButton>
          {isAuthenticated ? (
            <Button 
              variant="solid" 
              size="sm"
              onClick={handleLogout}
              data-testid="logout-button"
            >
              Logout
            </Button>
          ) : (
            <Link to="/login">
              <Button 
                variant="solid" 
                size="sm"
                data-testid="login-button"
              >
                Login
              </Button>
            </Link>
          )}
        </div>
      </nav>

      {/* Secondary Navigation Bar - Only shown when authenticated */}
      {isAuthenticated && user && (
        <nav 
          className="sticky top-0 z-50 bg-gray-100 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 -mx-4 px-4"
          data-testid="secondary-nav"
        >
          <div className="flex items-center justify-between py-3">
            {/* User Info - Left side */}
            <div className="flex flex-col">
              <div className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
                <span className="font-medium" data-testid="user-name">{user.fullName}</span>
                <span className="text-gray-500 dark:text-gray-400" data-testid="member-number">({user.golfCanadaCardId})</span>
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400" data-testid="user-handicap">
                Handicap: {user.handicap}
              </div>
            </div>

            {/* Hamburger Menu - Right side */}
            <div className="relative">
              <IconButton
                variant="ghost"
                onClick={toggleMenu}
                data-testid="hamburger-menu"
                aria-label="Toggle menu"
                aria-expanded={isMenuOpen}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  {isMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                    />
                  )}
                </svg>
              </IconButton>

              {/* Dropdown Menu */}
              {isMenuOpen && (
                <div 
                  className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-50"
                  data-testid="menu-dropdown"
                >
                  <Link
                    to="/"
                    className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Home
                  </Link>
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <Link
                    to="/privacy"
                    className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Privacy Policy
                  </Link>
                  <Link
                    to="/terms"
                    className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Terms of Service
                  </Link>
                </div>
              )}
            </div>
          </div>
        </nav>
      )}
    </>
  );
}
