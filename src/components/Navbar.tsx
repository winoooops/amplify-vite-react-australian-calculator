import { useAuthenticator } from "@aws-amplify/ui-react";
import { useDisplayName } from "../hooks/useDisplayName";
import { Link } from "@tanstack/react-router";
import { LogOut } from "lucide-react";

function Navbar() {
  const { signOut, user } = useAuthenticator();
  const displayName = useDisplayName();

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
            {(displayName || user?.username) && (
              <h1>Hello, {displayName || user?.username}</h1>
            )}
            <button
              onClick={signOut}
              className="cursor-pointer inline-flex items-center justify-center rounded-md h-9 w-9 px-0 text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 md:flex"
            >
              <LogOut />
              <span className="sr-only">Sign Out</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
