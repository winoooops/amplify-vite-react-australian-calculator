import { ReactNode } from "react";
import FooterSection from "./FooterSection";

function Footer({ children }: { children: ReactNode }) {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20">
      {children}
      <div className="grid md:grid-cols-2 gap-6 text-slate-700">
        <FooterSection title="Tax Year 20XX">
          <p className="leading-relaxed">
            This calculator uses the 20XX Australian individual income tax rates
            for residents. Rates are subject to change and this tool is for
            estimation purposes only.
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
