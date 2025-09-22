import { UseFormRegister, UseFormWatch } from "react-hook-form";
import { ReactNode } from "react";
import {
  COLOR_REF_ENUM,
  RegisterFieldNames,
  TaxConfigFormData,
} from "../../../shared/types";
import BracketFieldGroup from "./FieldGroup/BracketFieldGroup";
import { Brackets, ChevronDown } from "lucide-react";
import BracketInputFieldGroup from "./FieldGroup/BracketInputFieldGroup";
import SectionTitle from "../../SectionTitle";

type Props = Readonly<{
  register: UseFormRegister<TaxConfigFormData>;
  index: number;
  watch: UseFormWatch<TaxConfigFormData>;
  children: ReactNode;
}>;

function BracketCard({ register, index, children }: Props) {
  const fields = [
    {
      label: "Order",
      fieldName: "order",
      index,
      options: {
        required: "Order is required",
        min: { value: 1, message: "Order must be at least 1" },
        valueAsNumber: true,
      },
    },
    {
      label: "Lower Bound ($)",
      fieldName: "lower",
      index,
      options: {
        required: "Lower bound is required",
        min: { value: 0, message: "Lower bound must be non-negative" },
        valueAsNumber: true,
      },
    },
    {
      label: "Upper Bound ($)",
      fieldName: "upper",
      index,
      options: {
        valueAsNumber: true,
      },
    },
    {
      label: "Tax Rate (0-100)",
      fieldName: "rate",
      index,
      step: "0.5",
      options: {
        required: "Tax rate is required",
        min: { value: 0, message: "Rate must be non-negative" },
        max: { value: 100, message: "Rate must not exceed 100" },
        valueAsNumber: true,
      },
    },
  ];

  return (
    <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-50 to-slate-100 border-2 border-slate-200/50 hover:shadow-md transition-all duration-300">
      <div className="flex justify-between items-start mb-6">
        <SectionTitle title={`Bracket ${index + 1}`}>
          <Brackets />
        </SectionTitle>
        {children}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {fields.map((field) => (
          <BracketInputFieldGroup
            key={field.fieldName}
            label={field.label}
            fieldName={field.fieldName as RegisterFieldNames}
            index={index}
            options={field.options}
            step={field.step ?? undefined}
          />
        ))}

        <BracketFieldGroup label="Style Reference" fieldName="colorRef">
          <div className="relative">
            <select
              {...register(`brackets.${index}.colorRef`, {
                required: "Style reference is required",
              })}
              className="w-full px-4 py-3 pr-10 text-lg font-medium text-slate-900 bg-gradient-to-r from-slate-50 to-white border-2 border-slate-200 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-300 outline-none appearance-none cursor-pointer"
            >
              <option value={COLOR_REF_ENUM.LEVEL_1}>🟢 Green</option>
              <option value={COLOR_REF_ENUM.LEVEL_2}>🔵 Blue</option>
              <option value={COLOR_REF_ENUM.LEVEL_3}>🟠 Orange</option>
              <option value={COLOR_REF_ENUM.LEVEL_4}>🔴 Red</option>
              <option value={COLOR_REF_ENUM.LEVEL_5}>🟣 Purple</option>
              <option value={COLOR_REF_ENUM.DEFAULT}>⚫ Default</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <ChevronDown />
            </div>
          </div>
        </BracketFieldGroup>
      </div>
    </div>
  );
}

export default BracketCard;
