
import { useEffect } from "react";
import { Amplify } from "aws-amplify";
import outputs from "../amplify_outputs.json";
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
  useEffect(() => {
    // Initialize Amplify asynchronously with error handling
    const initAmplify = async () => {
      try {
        Amplify.configure(outputs);
        console.log('Amplify initialized successfully');
      } catch (error) {
        console.error('Failed to initialize Amplify:', error);
      }
    };

    initAmplify();
  }, []);

  return (
    <ErrorBoundary FallbackComponent={ErrorComponent}>
      <Authenticator socialProviders={["google", "amazon"]}>
        <RouterProvider router={router} />
      </Authenticator>
    </ErrorBoundary>
  );
}

export default App;
