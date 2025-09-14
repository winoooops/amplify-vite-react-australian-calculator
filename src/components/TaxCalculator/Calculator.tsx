import Footer from "./Footer";
import Header from "./Header";
import TaxRateBracket from "./TaxRateBrackets";
import TaxRateInfo from "./TaxRateInfo";
import TaxResults from "./TaxResults";

function Calculator() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <Header />
      <main className="grid lg:grid-cols-2 gap-8 mb-1">
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20 h-fit">
          <TaxRateBracket />
          <TaxRateInfo />
        </div>

        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20 h-fit">
          <TaxResults />
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Calculator;
