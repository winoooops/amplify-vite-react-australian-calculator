import { useCallback, useEffect, useState } from "react";
import { useTaxConfigs } from "../../../shared/contexts/taxConfigsContext";
import MetricCard from "./MetricCard";
import { Calculator, TrendingDown, Percent } from "lucide-react";

function MetricCards({ income }: { income: number }) {
  const { activeConfig } = useTaxConfigs();
  const brackets = activeConfig?.brackets;
  const [totalTax, setTotalTax] = useState(0);

  const calculateTotalTax = useCallback(
    (income: number) => {
      if (!brackets || brackets.length === 0 || income <= 0) return 0;

      let totalTax = 0;
      let remainingIncome = income;

      // Sort brackets by lower bound
      const sortedBrackets = [...brackets].sort((a, b) => a.lower - b.lower);

      for (const bracket of sortedBrackets) {
        if (remainingIncome <= 0) break;

        const bracketUpper = bracket.upper ?? Infinity;
        const taxableInThisBracket = Math.min(
          remainingIncome,
          bracketUpper - bracket.lower
        );

        if (taxableInThisBracket > 0) {
          totalTax += (taxableInThisBracket * bracket.rate) / 100;
          remainingIncome -= taxableInThisBracket;
        }
      }

      return Math.round(totalTax * 100) / 100; // Round to 2 decimal places
    },
    [brackets]
  );

  useEffect(() => {
    setTotalTax(calculateTotalTax(income));
  }, [income, calculateTotalTax]);

  const netIncome = income - totalTax;
  const effectiveRate =
    income > 0 ? Math.round((totalTax / income) * 100 * 100) / 100 : 0;

  const metrics = [
    {
      name: "Total Tax",
      value: totalTax,
      ui: {
        bgColor: "red" as const,
      },
      icon: <Calculator color="white" />,
    },
    {
      name: "Net Income",
      value: netIncome,
      ui: {
        bgColor: "green" as const,
      },
      icon: <TrendingDown color="white" />,
    },
    {
      name: "Effective Rate",
      value: effectiveRate,
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
