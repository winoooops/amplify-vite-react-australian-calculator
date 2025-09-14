function TaxRateInfo() {
  return (
    <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200/50">
      <h3 className="font-bold text-slate-900 mb-3">
        <span>How Marginal Tax Works</span>
      </h3>

      <p className="text-slate-700 leading-relaxed text-sm">
        <span>
          You only pay the higher tax rate on income above each threshold. For
          example, if you earn $50,000, you pay 0% on the first $18,200, then
          19% on the remaining $31,800.
        </span>
      </p>
    </div>
  );
}

export default TaxRateInfo;
