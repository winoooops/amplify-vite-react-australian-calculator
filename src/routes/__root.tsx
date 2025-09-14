import * as React from "react";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import Navbar from "../components/Navbar";

export const Route = createRootRoute({
  component: RootComponent
});

function RootComponent() {
  return (
    <React.Fragment>
      <Navbar />
      <Outlet />
      <TanStackRouterDevtools />
    </React.Fragment>
  );
}
