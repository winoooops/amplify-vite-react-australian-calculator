import { Info } from "lucide-react";

function Footer() {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20">
      <div className="flex items-center gap-3 mb-6">
        <Info color="blue" />
        <h2 className="text-2xl font-bold text-slate-900">
          <span>Important Information</span>
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-6 text-slate-700"></div>
    </div>
  );
}

export default Footer;
