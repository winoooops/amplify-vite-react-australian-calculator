import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import IncomeInput from "./TaxResults/IncomeInput";
import TaxRateBracket from "./TaxRateTable/TaxRateBrackets";
import TaxRateInfo from "./TaxRateTable/TaxRateInfo";
import TaxResults from "./TaxResults/MetricCards";
import SectionTitle from "./SectionTitle";
import { DollarSign, TrendingUp, Info } from "lucide-react";

function Calculator() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <Header />
      <main className="grid lg:grid-cols-2 gap-8 mb-12">
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20 h-fit">
          <SectionTitle title="Tax Calculator">
            <div className="p-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl">
              <TrendingUp color="white" />
            </div>
          </SectionTitle>

          <TaxRateBracket />
          <TaxRateInfo />
        </div>

        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20 h-fit">
          <SectionTitle title="Tax Calculator">
            <div className="p-2 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl">
              <DollarSign color="white" />
            </div>
          </SectionTitle>
          <IncomeInput />
          <TaxResults />
        </div>
      </main>
      <Footer>
        <SectionTitle title="Important Information">
          <Info color="blue" />
        </SectionTitle>
      </Footer>
    </div>
  );
}

export default Calculator;
