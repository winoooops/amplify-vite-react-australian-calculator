import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import Skeleton from "../components/TaxCalculator/skeleton";

// Lazy load the heavy TaxConfiguration component
const TaxConfiguration = lazy(() => import("../components/TaxConfiguration"));

function TaxConfigurationWithSuspense() {
  return (
    <Suspense fallback={<Skeleton />}>
      <TaxConfiguration />
    </Suspense>
  );
}

export const Route = createFileRoute("/taxConfigs")({
  component: TaxConfigurationWithSuspense,
});
