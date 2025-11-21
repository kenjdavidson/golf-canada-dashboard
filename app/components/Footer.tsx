import { Link } from 'react-router';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-gray-200 dark:border-gray-700 shadow-sm mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Column 1: Profile */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Profile
            </h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/profile" 
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                >
                  Profile
                </Link>
              </li>
              <li>
                <Link 
                  to="/history" 
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                >
                  Round History
                </Link>
              </li>
              <li>
                <Link 
                  to="/friends" 
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                >
                  Friends
                </Link>
              </li>
              <li>
                <Link 
                  to="/account" 
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                >
                  Account Information
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Management */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Management
            </h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/courses" 
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                >
                  Courses
                </Link>
              </li>
              <li>
                <Link 
                  to="/handicap-lookup" 
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                >
                  Handicap Lookup
                </Link>
              </li>
              <li>
                <Link 
                  to="/member-lookup" 
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                >
                  Member Lookup
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Legal */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Legal
            </h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/privacy" 
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link 
                  to="/terms" 
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                >
                  Terms of Use
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Sub-footer */}
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 text-center text-sm text-gray-600 dark:text-gray-400">
          <p>
            © {currentYear} Golf Canada Dashboard | 
            <a 
              href="https://github.com/kenjdavidson/golf-canada-dashboard" 
              target="_blank" 
              rel="noopener noreferrer"
              className="ml-1 hover:text-gray-900 dark:hover:text-gray-100 transition-colors underline"
            >
              GitHub Project
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
