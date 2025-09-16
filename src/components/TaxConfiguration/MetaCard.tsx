import { useFormContext } from "react-hook-form";
import { TaxConfigFormData } from "../../shared/types";
import SectionTitle from "../SectionTitle";
import { CalendarRange } from "lucide-react";

function MetaCard({ onLoadTestData }: { onLoadTestData: () => void }) {
  const { register, formState: { errors } } = useFormContext<TaxConfigFormData>();

  return (
    <div className="p-8 rounded-2xl bg-gradient-to-r from-slate-50 to-white border-2 border-slate-200/50 hover:shadow-lg transition-all duration-300">
      <div className="flex justify-between items-center mb-6">
        <SectionTitle title="Tax Configuration Details">
          <CalendarRange />
        </SectionTitle>
        <button type="button" onClick={onLoadTestData}
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-2xl hover:from-blue-600 hover:to-blue-700 hover:shadow-lg transition-all duration-300"
        >Add Test Data</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <label className="block text-sm font-semibold text-slate-700 h-12">
            Financial Year Start
          </label>
          <input
            type="number"
            {...register("financialYearStart", {
              required: "Financial year start is required",
              min: { value: 2000, message: "Year must be 2000 or later" },
            })}
            className="w-full px-4 py-3 text-lg font-medium text-slate-900 bg-gradient-to-r from-slate-50 to-white border-2 border-slate-200 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-300 outline-none"
          />
          {errors.financialYearStart && (
            <p className="text-red-500 text-sm font-medium">
              {errors.financialYearStart.message}
            </p>
          )}
        </div>

        <div className="space-y-3">
          <label className="block text-sm font-semibold text-slate-700 h-12">
            Financial Year End
          </label>
          <input
            type="number"
            {...register("financialYearEnd", {
              required: "Financial year end is required",
              min: { value: 2000, message: "Year must be 2000 or later" },
            })}
            className="w-full px-4 py-3 text-lg font-medium text-slate-900 bg-gradient-to-r from-slate-50 to-white border-2 border-slate-200 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-300 outline-none"
          />
          {errors.financialYearEnd && (
            <p className="text-red-500 text-sm font-medium">
              {errors.financialYearEnd.message}
            </p>
          )}
        </div>

        <div className="space-y-3">
          <label className="block text-sm font-semibold text-slate-700 h-12">
            Version
          </label>
          <input
            type="text"
            {...register("version", { required: "Version is required" })}
            className="w-full px-4 py-3 text-lg font-medium text-slate-900 bg-gradient-to-r from-slate-50 to-white border-2 border-slate-200 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-300 outline-none"
          />
          {errors.version && (
            <p className="text-red-500 text-sm font-medium">
              {errors.version.message}
            </p>
          )}
        </div>

        <div className="space-y-3">
          <label className="block text-sm font-semibold text-slate-700 h-12">
            Last Updated
          </label>
          <input
            type="date"
            {...register("lastUpdated", {
              required: "Last updated date is required",
            })}
            className="w-full px-4 py-3 text-lg font-medium text-slate-900 bg-gradient-to-r from-slate-50 to-white border-2 border-slate-200 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-300 outline-none"
          />
          {errors.lastUpdated && (
            <p className="text-red-500 text-sm font-medium">
              {errors.lastUpdated.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default MetaCard;
