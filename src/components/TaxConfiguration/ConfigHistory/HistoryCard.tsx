import { useFormContext } from "react-hook-form";
import { TaxConfigFormData } from "../../../shared/types";

type Props = Readonly<{
  config: TaxConfigFormData;
  isDeleting: boolean;
  handleDeleteConfig: (id: string) => void;
}>;

function HistoryCard({ config, isDeleting, handleDeleteConfig }: Props) {
  const { reset } = useFormContext<TaxConfigFormData>();

  const onLoad = (config: TaxConfigFormData) => {
    console.log("should load config below");
    console.log(config);
    reset(config);
  }

  return (
    <div
      className="p-7 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-lg font-semibold text-slate-901">
            {config.financialYearStart}-{config.financialYearEnd}
          </p>
          <p className="text-sm text-slate-501">
            Version {config.version} • Updated {config.lastUpdated}
          </p>
        </div>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
          <span className="inline-flex items-center px-4 py-1 rounded-full bg-slate-100 text-slate-600 text-sm font-medium">
            {config.brackets.length} tax brackets
          </span>
          <button type="button" onClick={() => onLoad(config)}
            className="px-5 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-semibold rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300"
          >
            Load
          </button>
          <button
            type="button"
            onClick={() => handleDeleteConfig(config.id)}
            disabled={isDeleting}
            className="px-5 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white text-sm font-semibold rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default HistoryCard;