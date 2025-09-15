import { createFileRoute } from "@tanstack/react-router";
import TaxCalculator from "../components/TaxCalculator";

export const Route = createFileRoute("/taxCalculator")({
  component: TaxCalculator,
});
