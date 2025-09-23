import { generateClient } from "aws-amplify/data";
import { Schema } from "../../../../amplify/data/resource";
import { useEffect, useState } from "react";
import { TaxBracket } from "../../../shared/types";
import TaxRateCard from "./TaxRateCard";

const client = generateClient<Schema>();

function TaxRateBracket() {
  const [brackets, setBrackets] = useState<TaxBracket[]>([]);

  const getBrackets = async () => {
    const { data, errors } = await client.models.TaxConfig.list({
      filter: {
        isActive: {
          eq: true,
        },
      },
      selectionSet: ["brackets.*"],
    });
    if (errors) {
      throw new Error(errors.map((err) => err.message).join(", "));
    }

    if (data && data.length === 0) {
      setBrackets([]);
    }

    const bracketCollection = (data[0].brackets as TaxBracket[]).sort(
      (a, b) => a.order - b.order
    );

    setBrackets(bracketCollection);
  };

  useEffect(() => {
    getBrackets();
  }, []);

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
