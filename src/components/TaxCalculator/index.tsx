import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import SectionTitle from "./SectionTitle";
import TaxResults from "./TaxResults";
import TaxRateTable from "./TaxRateTable";
import { Info } from "lucide-react";

function TaxCalculator() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <Header />
      <main className="grid lg:grid-cols-2 gap-8 mb-12">
        <TaxRateTable />
        <TaxResults />
      </main>
      <Footer>
        <SectionTitle title="Important Information">
          <Info color="blue" />
        </SectionTitle>
      </Footer>
    </div>
  );
}

export default TaxCalculator;
