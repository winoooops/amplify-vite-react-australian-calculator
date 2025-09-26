
import { ErrorBoundary } from "react-error-boundary";
import { Authenticator } from "@aws-amplify/ui-react";
import { RouterProvider } from "@tanstack/react-router";
import ErrorComponent from "./components/ErrorComponent";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";


const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorComponent}>
      <Authenticator socialProviders={["google", "amazon"]}>
        <RouterProvider router={router} />
      </Authenticator>
    </ErrorBoundary>
  );
}

export default App;
