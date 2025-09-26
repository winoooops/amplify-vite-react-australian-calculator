import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import Skeleton from "../components/TaxCalculator/skeleton";

// Lazy load the heavy TaxCalculator component
const TaxCalculator = lazy(() => import("../components/TaxCalculator"));

function TaxCalculatorWithSuspense() {
  return (
    <Suspense fallback={<Skeleton />}>
      <TaxCalculator />
    </Suspense>
  );
}

export const Route = createFileRoute("/taxCalculator")({
  component: TaxCalculatorWithSuspense,
});
