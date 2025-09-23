import SectionTitle from "../../SectionTitle";
import { DollarSign } from "lucide-react";
import IncomeInput from "./IncomeInput";
import MetricCards from "./MetricCards";
import { useState } from "react";

function TaxResults() {
  const [income, setIncome] = useState<number>(0);

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20 h-fit">
      <SectionTitle title="Tax Calculator">
        <div className="p-2 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl">
          <DollarSign color="white" />
        </div>
      </SectionTitle>
      <IncomeInput income={income} setIncome={setIncome} />
      <MetricCards income={income} />
    </div>
  );
}

export default TaxResults;
