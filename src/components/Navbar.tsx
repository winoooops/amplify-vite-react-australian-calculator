import { useAuthenticator } from "@aws-amplify/ui-react";
import { Link } from "@tanstack/react-router";

function Navbar() {
  const { signOut } = useAuthenticator();

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link to="/" className="mr-6 flex items-center space-x-2">
            <span className="hidden font-bold sm:inline-block">
              Tax Calculator
            </span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link
              to="/taxConfigs"
              className="text-gray-600 hover:text-gray-900 transition-colors [&.active]:text-blue-600"
            >
              Tax Configurations
            </Link>
            <Link
              to="/taxCalculator"
              className="text-gray-600 hover:text-gray-900 transition-colors [&.active]:text-blue-600"
            >
              Tax Calculator
            </Link>
          </nav>
        </div>

        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="flex items-center">
            <button
              onClick={signOut}
              className="inline-flex items-center justify-center rounded-md h-9 w-9 px-0 text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 md:flex"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              <span className="sr-only">Sign Out</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
