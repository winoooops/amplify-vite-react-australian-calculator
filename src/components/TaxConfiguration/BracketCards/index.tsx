import { FieldArrayWithId, useFormContext } from "react-hook-form";
import BracketCard from "./BracketCard";
import { TaxConfigFormData } from "../../../shared/types";

type Props = Readonly<{
  fields: FieldArrayWithId<TaxConfigFormData, "brackets", "id">[];
  onAddBracket: () => void;
  onRemoveBracket: (index: number) => void;
}>;

function BracketCards({ fields, onAddBracket, onRemoveBracket }: Props) {
  const { register, watch } = useFormContext<TaxConfigFormData>();

  return (
    <div className="p-8 rounded-2xl bg-gradient-to-r from-slate-50 to-white border-2 border-slate-200/50 hover:shadow-lg transition-all duration-300">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-slate-800">
          Tax Brackets
        </h3>
        <button
          type="button"
          onClick={onAddBracket}
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-2xl hover:from-blue-600 hover:to-blue-700 hover:shadow-lg transition-all duration-300"
        >
          Add Bracket
        </button>
      </div>

      <div className="space-y-6">
        {fields.map((field, index) => (
          <BracketCard
            key={field.id}
            register={register}
            index={index}
            watch={watch}
          >
            {fields.length > 1 && (
              <button
                type="button"
                onClick={() => onRemoveBracket(index)}
                className="px-4 py-2 bg-gradient-to-r from-red-50 to-red-100 text-red-600 font-semibold rounded-xl hover:from-red-100 hover:to-red-200 transition-all duration-300"
              >
                Remove
              </button>
            )}
          </BracketCard>
        ))}
      </div>
    </div>
  );
}

export default BracketCards;
