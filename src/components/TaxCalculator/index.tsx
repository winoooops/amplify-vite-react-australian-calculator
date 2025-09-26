import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import SectionTitle from "../SectionTitle";
import TaxResults from "./TaxResults";
import TaxRateTable from "./TaxRateTable";
import { Info } from "lucide-react";
import { useEffect, useState } from "react";
import { useTaxConfigs } from "../../shared/contexts/taxConfigsContext";
import Skeleton from "./skeleton";

export type TaxConfigMetaData = {
  financialYearStart: number;
  financialYearEnd: number;
  createdAt: string;
  version: string;
};

const defaultMeta: TaxConfigMetaData = {
  financialYearStart: 2000,
  financialYearEnd: 2001,
  createdAt: "2000-09-20",
  version: "-1",
};

function TaxCalculator() {
  const { activeConfig } = useTaxConfigs();
  const [metaData, setMetaData] = useState<TaxConfigMetaData>(defaultMeta);

  useEffect(() => {
    if (activeConfig) {
      setMetaData({
        financialYearStart: activeConfig.financialYearStart,
        financialYearEnd: activeConfig.financialYearEnd,
        createdAt: activeConfig.lastUpdated || "2000-09-20", // Use lastUpdated as fallback
        version: activeConfig.version,
      });
    }

    return () => setMetaData(defaultMeta);
  }, [activeConfig]);

  if (!activeConfig || activeConfig.version === "-1") {
    return (
      <Skeleton />
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <Header meta={metaData} />
      <main className="grid lg:grid-cols-2 gap-8 mb-12">
        <TaxRateTable />
        <TaxResults />
      </main>
      <Footer meta={metaData}>
        <SectionTitle title="Important Information">
          <Info color="blue" />
        </SectionTitle>
      </Footer>
    </div>
  );
}

export default TaxCalculator;
