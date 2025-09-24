function TaxRateInfo({
  title,
  textContent,
}: {
  title: string;
  textContent: string;
}) {
  return (
    <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200/50">
      <h3 className="font-bold text-slate-900 mb-3">
        <span>{title}</span>
      </h3>

      <p className="text-slate-700 leading-relaxed text-sm">
        <span>{textContent}</span>
      </p>
    </div>
  );
}

export default TaxRateInfo;
