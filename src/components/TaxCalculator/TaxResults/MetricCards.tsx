import { useCallback, useEffect, useState } from "react";
import { useTaxConfigs } from "../../../shared/contexts/taxConfigsContext";
import MetricCard from "./MetricCard";
import { Calculator, TrendingDown, Percent } from "lucide-react";
import TaxRateInfo from "../TaxRateInfo";

function MetricCards({ income }: { income: number }) {
  const { activeConfig } = useTaxConfigs();
  const brackets = activeConfig?.brackets;
  const [totalTax, setTotalTax] = useState(0);
  const [taxCap, setTaxCap] = useState(0);

  const calculateTotalTax = useCallback(
    (income: number) => {
      if (!brackets || brackets.length === 0 || income <= 0) return 0;

      let totalTax = 0;
      let remainingIncome = income;
      let bracketAt = 0;

      for (const bracket of brackets) {
        if (remainingIncome <= 0) break;

        const bracketUpper = bracket.upper ?? Infinity;
        const taxableInThisBracket = Math.min(
          remainingIncome,
          bracketUpper - bracket.lower
        );

        if (taxableInThisBracket > 0) {
          bracketAt++;
          totalTax += (taxableInThisBracket * bracket.rate) / 100;
          remainingIncome -= taxableInThisBracket;
        }
      }

      const indexAt = Math.max(bracketAt - 1, 0);

      setTaxCap(() => brackets?.[indexAt].rate);

      return totalTax;
    },
    [brackets]
  );

  useEffect(() => {
    setTotalTax(calculateTotalTax(income));
  }, [income, calculateTotalTax]);

  const netIncome = income - totalTax;
  const effectiveRate = income > 0 ? Math.round((totalTax / income) * 100) : 0;

  const metrics = [
    {
      name: "Total Tax",
      value: `$${Math.round(totalTax)}`,
      ui: {
        bgColor: "red" as const,
      },
      icon: <Calculator color="white" />,
    },
    {
      name: "Net Income",
      value: `$${Math.round(netIncome)}`,
      ui: {
        bgColor: "green" as const,
      },
      icon: <TrendingDown color="white" />,
    },
    {
      name: "Effective Rate",
      value: effectiveRate.toFixed(1) + "%",
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

      {taxCap > 0 && (
        <TaxRateInfo
          title="Your Marginal Tax Rate"
          textContent={`Your next dollar of income will be taxed at ${taxCap}%`}
        />
      )}
    </div>
  );
}

export default MetricCards;
