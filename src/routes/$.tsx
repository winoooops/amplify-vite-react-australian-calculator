import { createFileRoute } from "@tanstack/react-router";
import TaxCalculator from "../components/TaxCalculator";

export const Route = createFileRoute("/$")({
  component: TaxCalculator,
});
