import { createFileRoute } from "@tanstack/react-router";
import TaxConfiguration from "../components/TaxConfiguration";

export const Route = createFileRoute("/taxConfigs")({
  component: TaxConfiguration,
});
