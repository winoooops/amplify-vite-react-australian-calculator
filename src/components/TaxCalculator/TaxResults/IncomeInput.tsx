import { ChangeEvent, useState } from "react";

function IncomeInput() {
  const [value, setValue] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <div className="mb-8">
      <label
        htmlFor="income-input"
        className="block text-sm font-semibold text-slate-700 mb-3"
      >
        <span>Annual Taxable Income (AUD)</span>
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <span className="text-slate-500 text-lg font-medium">$</span>
        </div>
        <input
          type="number"
          id="income-input"
          name="income-input"
          placeholder="0"
          value={value}
          onChange={handleChange}
          aria-label="Enter your annual taxable income in Australian dollars"
          className="w-full pl-8 pr-4 py-4 text-2xl font-bold text-slate-900 bg-gradient-to-r from-slate-50 to-white border-2 border-slate-200 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-300 outline-none"
        />
      </div>
      <p className="text-slate-500 text-xs mt-2">
        Enter your gross annual income before tax deductions
      </p>
    </div>
  );
}

export default IncomeInput;
