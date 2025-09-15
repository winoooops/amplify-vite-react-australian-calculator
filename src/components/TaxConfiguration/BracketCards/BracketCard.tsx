import { UseFormRegister, UseFormWatch } from "react-hook-form";
import { TaxConfigFormData } from "..";
import { ReactNode } from "react";

function BracketCard({
  register,
  index,
  watch,
  children,
}: {
  register: UseFormRegister<TaxConfigFormData>;
  index: number;
  watch: UseFormWatch<TaxConfigFormData>;
  children: ReactNode;
}) {
  return (
    <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-50 to-slate-100 border-2 border-slate-200/50 hover:shadow-md transition-all duration-300">
      <div className="flex justify-between items-start mb-6">
        <h4 className="text-lg font-semibold text-slate-800">
          Bracket {index}
        </h4>
        {children}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="space-y-3">
          <label className="block text-sm font-semibold text-slate-700 h-12">
            Order
          </label>
          <input
            type="number"
            {...register(`brackets.${index}.order`, {
              required: "Order is required",
              min: { value: 1, message: "Order must be at least 1" },
            })}
            className="w-full px-4 py-3 text-lg font-medium text-slate-900 bg-gradient-to-r from-slate-50 to-white border-2 border-slate-200 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-300 outline-none"
          />
        </div>

        <div className="space-y-3">
          <label className="block text-sm font-semibold text-slate-700 h-12">
            Lower Bound ($)
          </label>
          <input
            type="number"
            {...register(`brackets.${index}.lower`, {
              required: "Lower bound is required",
              min: {
                value: 0,
                message: "Lower bound must be non-negative",
              },
            })}
            className="w-full px-4 py-3 text-lg font-medium text-slate-900 bg-gradient-to-r from-slate-50 to-white border-2 border-slate-200 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-300 outline-none"
          />
        </div>

        <div className="space-y-3">
          <label className="block text-sm font-semibold text-slate-700 h-12">
            Upper Bound ($) (leave empty for last bracket)
          </label>
          <input
            type="number"
            {...register(`brackets.${index}.upper`)}
            className="w-full px-4 py-3 text-lg font-medium text-slate-900 bg-gradient-to-r from-slate-50 to-white border-2 border-slate-200 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-300 outline-none"
          />
        </div>

        <div className="space-y-3">
          <label className="block text-sm font-semibold text-slate-700 h-12">
            Tax Rate (0-1)
          </label>
          <input
            type="number"
            step="0.01"
            {...register(`brackets.${index}.rate`, {
              required: "Tax rate is required",
              min: { value: 0, message: "Rate must be non-negative" },
              max: { value: 1, message: "Rate must not exceed 1" },
            })}
            className="w-full px-4 py-3 text-lg font-medium text-slate-900 bg-gradient-to-r from-slate-50 to-white border-2 border-slate-200 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-300 outline-none"
          />
        </div>

        <div className="space-y-3">
          <label className="block text-sm font-semibold text-slate-700 h-12">
            Style Reference
          </label>
          <div className="relative">
            <select
              {...register(`brackets.${index}.styleRef`, {
                required: "Style reference is required",
              })}
              className="w-full px-4 py-3 pr-10 text-lg font-medium text-slate-900 bg-gradient-to-r from-slate-50 to-white border-2 border-slate-200 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-300 outline-none appearance-none cursor-pointer"
            >
              <option value="green">🟢 Green</option>
              <option value="blue">🔵 Blue</option>
              <option value="orange">🟠 Orange</option>
              <option value="red">🔴 Red</option>
              <option value="purple">🟣 Purple</option>
              <option value="default">⚫ Default</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-slate-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="block text-sm font-semibold text-slate-700 h-12">
              Generated Label Preview
            </label>
            <span className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded-full">
              Demo
            </span>
          </div>
          <div className="px-4 py-3 bg-gradient-to-r from-slate-100 to-slate-50 border-2 border-slate-200 rounded-2xl text-slate-700 font-medium">
            {watch(`brackets.${index}.rate`) !== undefined
              ? `${(Number(watch(`brackets.${index}.rate`)) * 100).toFixed(
                  1
                )}% tax bracket`
              : "Enter rate to see preview"}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BracketCard;
