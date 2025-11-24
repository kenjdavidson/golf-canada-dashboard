import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import * as MaterialTailwind from '@material-tailwind/react';
const { Button, IconButton } = MaterialTailwind;

export function Navigation() {
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

  return (
    <nav className="flex items-center justify-between py-4">
      <Link to="/" className="text-xl font-semibold text-gray-900 dark:text-gray-100 hover:opacity-80 transition-opacity">
        Golf Canada
      </Link>
      <div className="flex items-center gap-2">
        <IconButton
          variant="text"
          onClick={toggleTheme}
          className="rounded-full p-2 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
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
        <Button 
          variant="text" 
          size="sm"
          className="px-4 py-2 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          Login
        </Button>
      </div>
    </nav>
  );
}
