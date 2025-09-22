import BracketFieldGroup from "./BracketFieldGroup";
import { RegisterOptions, useFormContext } from "react-hook-form";
import {
  TaxConfigFormData,
  RegisterFieldNames,
} from "../../../../shared/types";

type Props = Readonly<{
  label: string;
  index: number;
  fieldName: RegisterFieldNames;
  options: RegisterOptions<
    TaxConfigFormData,
    `brackets.${number}.${RegisterFieldNames}`
  >;
  step?: string;
}>;

function BracketInputFieldGroup({
  label,
  fieldName,
  index,
  options,
  step,
}: Props) {
  const {
    register,
    formState: { errors },
  } = useFormContext<TaxConfigFormData>();

  const hasError = errors.brackets?.[index]?.[fieldName] !== undefined;
  const message = errors.brackets?.[index]?.[fieldName]?.message;

  return (
    <BracketFieldGroup label={label} fieldName={fieldName}>
      <input
        type="number"
        step={step ?? undefined}
        className={`w-full px-4 py-3 text-lg font-medium text-slate-900 bg-gradient-to-r from-slate-50 to-white border-2 ${
          hasError ? "border-red-200" : "border-slate-200"
        } rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-300 outline-none`}
        {...register(`brackets.${index}.${fieldName}`, options)}
      />
      {hasError && (
        <p className="text-red-500 text-sm font-medium italic">{message}</p>
      )}
    </BracketFieldGroup>
  );
}

export default BracketInputFieldGroup;
