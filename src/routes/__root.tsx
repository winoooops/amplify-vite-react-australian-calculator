import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import Navbar from "../components/Navbar";

export const Route = createRootRoute({
  component: RootComponent
});

function RootComponent() {
  return (
    <div className="min-h-screen bg-white font-sans antialiased">
      <Navbar />
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <Outlet />
        </div>
      </main>
      <TanStackRouterDevtools />
    </div>
  );
}
