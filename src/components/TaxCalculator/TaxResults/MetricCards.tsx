import MetricCard from "./MetricCard";
import { Calculator, TrendingDown, Percent } from "lucide-react";

function MetricCards() {
  const metrics = [
    {
      name: "Total Tax",
      value: 0,
      ui: {
        bgColor: "red" as const,
      },
      icon: <Calculator color="white" />,
    },
    {
      name: "Net Income",
      value: 0,
      ui: {
        bgColor: "green" as const,
      },
      icon: <TrendingDown color="white" />,
    },
    {
      name: "Effective Rate",
      value: 0,
      ui: {
        bgColor: "blue" as const,
      },
      icon: <Percent color="white" />,
    },
  ];

  return (
    <div className="space-y-4">
      {metrics.map((metric) => (
        <MetricCard
          key={metric.name}
          name={metric.name}
          value={metric.value}
          ui={metric.ui}
        >
          {metric.icon}
        </MetricCard>
      ))}
    </div>
  );
}

export default MetricCards;
