import { createFileRoute } from "@tanstack/react-router";
import Configuration from "../components/TaxConfiguration/Configuration";

export const Route = createFileRoute("/taxConfigs")({
  component: Configuration
});
