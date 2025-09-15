import SectionTitle from "../../SectionTitle";
import { TrendingUp } from "lucide-react";
import TaxRateBrackets from "./TaxRateBrackets";
import TaxRateInfo from "./TaxRateInfo";

function TaxRateTable() {
  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20 h-fit">
      <SectionTitle title="Tax Calculator">
        <div className="p-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl">
          <TrendingUp color="white" />
        </div>
      </SectionTitle>

      <TaxRateBrackets />
      <TaxRateInfo />
    </div>
  );
}

export default TaxRateTable;
