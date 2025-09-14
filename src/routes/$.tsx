import { createFileRoute } from "@tanstack/react-router";
import Calculator from "../components/TaxCalculator/Calculator";

export const Route = createFileRoute("/$")({
  component: Calculator
});
