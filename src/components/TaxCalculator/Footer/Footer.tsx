import { ReactNode } from "react";
import FooterSection from "./FooterSection";
import { TaxConfigMetaData } from "..";

type Props = {
  meta: TaxConfigMetaData;
  children: ReactNode;
};

function Footer({ meta, children }: Props) {
  const range = `${meta?.financialYearStart ?? "2024"}-${meta?.financialYearEnd ?? "2025"}`;
  const title = `Tax Year ${range}`;

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20">
      {children}
      <div className="grid md:grid-cols-2 gap-6 text-slate-700">
        <FooterSection title={title}>
          <p className="leading-relaxed">
            This calculator uses the ${range} Australian individual income tax
            rates for residents. Rates are subject to change and this tool is
            for estimation purposes only.
          </p>
        </FooterSection>

        <FooterSection title="Medicare Levy">
          <p className="leading-relaxed">
            This calculator does not include the Medicare Levy (2%) or Medicare
            Levy Surcharge. Additional taxes and offsets may apply to your
            specific situation.
          </p>
        </FooterSection>
      </div>
    </div>
  );
}

export default Footer;
