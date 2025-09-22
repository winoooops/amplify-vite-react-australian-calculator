import { Calculator } from "lucide-react";
import { TaxConfigMetaData } from "..";

function Header({ meta }: { meta: TaxConfigMetaData }) {
  console.log(meta);
  return (
    <header className="flex-col text-center mb-12">
      <div className="flex justify-center items-center gap-3 mb-4">
        <div className="bg-indigo-600 rounded-2xl shadow-lg p-3">
          <Calculator color="white" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-900 to-indigo-900 bg-clip-text text-transparent">
          <span>Australian Tax Calculator</span>
        </h1>
      </div>
      <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
        Calculate your individual income tax for the {meta.financialYearStart}-
        {meta.financialYearEnd} financial year with our comprehensive Australian
        tax calculator
      </p>
    </header>
  );
}

export default Header;
