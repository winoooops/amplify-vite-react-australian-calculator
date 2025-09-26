import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import Navbar from "../components/Navbar";
import { TaxConfigsProvider } from "../shared/contexts/taxConfigsContext.tsx";
import ErrorComponent from "../components/ErrorComponent.tsx";

export const Route = createRootRoute({
  component: RootComponent,
  errorComponent: ErrorComponent,
});

function RootComponent() {
  return (
    <div className="min-h-screen bg-white font-sans antialiased">
      <Navbar />
      <TaxConfigsProvider>
        <div className="flex-1">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
            <Outlet />
          </div>
        </div>
      </TaxConfigsProvider>
      <TanStackRouterDevtools />
    </div>
  );
}
