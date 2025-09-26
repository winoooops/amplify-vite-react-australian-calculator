import { useEffect, useState } from "react";
import { useTaxConfigs } from "../../../shared/contexts/taxConfigsContext";
import { TaxBracket } from "../../../shared/types";
import TaxRateCard from "./TaxRateCard";

function TaxRateBracket() {
  const { activeConfig } = useTaxConfigs();
  const [brackets, setBrackets] = useState<TaxBracket[]>([]);

  useEffect(() => {
    if (activeConfig?.brackets) {
      const bracketCollection = [...activeConfig.brackets].sort(
        (a, b) => a.order - b.order
      );
      setBrackets(bracketCollection);
    } else {
      setBrackets([]);
    }
  }, [activeConfig]);

  if (brackets.length === 0) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-20 bg-slate-200 rounded-2xl"></div>
        <div className="h-20 bg-slate-200 rounded-2xl"></div>
        <div className="h-20 bg-slate-200 rounded-2xl"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {brackets.map((bracket: TaxBracket) => {
        return (
          <TaxRateCard
            key={bracket.id}
            lower={bracket.lower}
            upper={bracket.upper}
            taxRate={bracket.rate}
            maxTaxAmount={bracket.maxTaxAmount}
            colorRef={bracket.colorRef}
          />
        );
      })}
    </div>
  );
}

export default TaxRateBracket;
