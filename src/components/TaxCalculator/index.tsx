import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import SectionTitle from "../SectionTitle";
import TaxResults from "./TaxResults";
import TaxRateTable from "./TaxRateTable";
import { Info } from "lucide-react";
import { generateClient } from "aws-amplify/data";
import { Schema } from "../../../amplify/data/resource";
import { useEffect } from "react";


const client = generateClient<Schema>();

function TaxCalculator() {

  useEffect(() => {
    client.models.TaxConfig.observeQuery().subscribe({
      next: (data) => console.log(data.items)
    });
  }, []);


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
