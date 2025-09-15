import { useFieldArray, useForm } from "react-hook-form";
import BracketCard from "./BracketCard";
import { TaxConfigFormData } from "..";

function BracketCards() {
  const { control, register, watch } = useForm<TaxConfigFormData>({
    defaultValues: {
      financialYearStart: 2024,
      financialYearEnd: 2025,
      version: "1.0.0",
      lastUpdated: new Date().toISOString().split("T")[0],
      brackets: [
        {
          order: 1,
          lower: 0,
          upper: 18200,
          rate: 0.0,
          styleRef: "green",
          label: "0% to $18,200",
        },
        {
          order: 2,
          lower: 18201,
          upper: 45000,
          rate: 0.19,
          styleRef: "blue",
          label: "19% to $45,000",
        },
        {
          order: 3,
          lower: 45001,
          upper: 120000,
          rate: 0.325,
          styleRef: "orange",
          label: "32.5% to $120,000",
        },
        {
          order: 4,
          lower: 120001,
          upper: 180000,
          rate: 0.37,
          styleRef: "red",
          label: "37% to $180,000",
        },
        {
          order: 5,
          lower: 180001,
          rate: 0.45,
          styleRef: "purple",
          label: "45%+",
        },
      ],
    },
  });

  const { fields, remove } = useFieldArray({
    control,
    name: "brackets",
  });

  const removeBracket = (index: number) => {
    if (fields.length > 1) {
      remove(index);
    }
  };

  return (
    <div className="space-y-6">
      {fields.map((field, index) => (
        <BracketCard
          key={field.id}
          register={register}
          index={index + 1}
          watch={watch}
        >
          {fields.length > 1 && (
            <button
              type="button"
              onClick={() => removeBracket(index)}
              className="px-4 py-2 bg-gradient-to-r from-red-50 to-red-100 text-red-600 font-semibold rounded-xl hover:from-red-100 hover:to-red-200 transition-all duration-300"
            >
              Remove
            </button>
          )}
        </BracketCard>
      ))}
    </div>
  );
}

export default BracketCards;
