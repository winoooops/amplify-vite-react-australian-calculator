import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import SectionTitle from "../SectionTitle";
import TaxResults from "./TaxResults";
import TaxRateTable from "./TaxRateTable";
import { Info } from "lucide-react";
import { generateClient } from "aws-amplify/data";
import { Schema } from "../../../amplify/data/resource";
import { useEffect, useState } from "react";

const client = generateClient<Schema>();

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
  const [metaData, setMetaData] = useState<TaxConfigMetaData>(defaultMeta);

  const getMetaData = async () => {
    const { data, errors } = await client.models.TaxConfig.list({
      filter: {
        isActive: {
          eq: true,
        },
      },
      selectionSet: [
        "financialYearStart",
        "financialYearEnd",
        "createdAt",
        "version",
      ],
    });

    if (errors && errors.length > 0) {
      throw new Error(errors.map((err) => err.message).join(", "));
    }

    if (data && data.length === 0) {
      console.error("plz contact admin to set up an active Tax configuration.");
    }

    setMetaData(data[0] as TaxConfigMetaData);
  };

  useEffect(() => {
    getMetaData();

    return () => setMetaData(defaultMeta);
  }, []);

  if (metaData.version === "-1") {
    return (
      <div className="animate-pulse flex-col text-center mb-12">
        <div className="flex justify-center items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-slate-200 rounded-2xl"></div>
          <div className="h-12 w-80 bg-slate-200 rounded-lg"></div>
        </div>
        <div className="h-6 w-96 bg-slate-200 rounded-lg mx-auto"></div>
      </div>
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
