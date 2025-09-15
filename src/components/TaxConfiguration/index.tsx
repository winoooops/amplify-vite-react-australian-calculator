import { useState } from "react";
import { generateClient } from "aws-amplify/data";
import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import { Schema } from "../../../amplify/data/resource";
import MetaCard from "./MetaCard";
import ActionButtons from "./ActionButtons";
import BracketCards from "./BracketCards";

const client = generateClient<Schema>();

export interface TaxBracketFormData {
  id?: string;
  order: number;
  lower: number;
  upper?: number;
  rate: number;
  styleRef: string;
  label?: string;
}

export interface TaxConfigFormData {
  financialYearStart: number;
  financialYearEnd: number;
  version: string;
  lastUpdated: string;
  brackets: TaxBracketFormData[];
}

function TaxConfiguration() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<TaxConfigFormData>({
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

  const { append } = useFieldArray({
    control,
    name: "brackets",
  });

  const onSubmit: SubmitHandler<TaxConfigFormData> = async (data) => {
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Create TaxConfig first
      const taxConfig = await client.models.TaxConfig.create({
        financialYearStart: data.financialYearStart,
        financialYearEnd: data.financialYearEnd,
        version: data.version,
        lastUpdated: data.lastUpdated,
      });

      const taxConfigId = taxConfig.data?.id;
      if (!taxConfigId) {
        throw new Error("Failed to create TaxConfig");
      }

      // Create TaxBrackets
      const bracketPromises = data.brackets.map((bracket) =>
        client.models.TaxBracket.create({
          taxConfigId,
          order: bracket.order,
          lower: bracket.lower,
          upper: bracket.upper,
          rate: bracket.rate,
          styleRef: bracket.styleRef,
          label: bracket.label || `${bracket.rate * 100}% tax bracket`,
        })
      );

      await Promise.all(bracketPromises);

      setSubmitStatus({
        type: "success",
        message: `Successfully created tax configuration for ${data.financialYearStart}-${data.financialYearEnd} with ${data.brackets.length} tax brackets`,
      });
    } catch (error) {
      console.error("Error creating tax configuration:", error);
      setSubmitStatus({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Failed to create tax configuration",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const addBracket = () => {
    const lastBracket = watch("brackets")[watch("brackets").length - 1];
    const newOrder = lastBracket ? lastBracket.order + 1 : 1;
    const newLower =
      lastBracket && lastBracket.upper ? lastBracket.upper + 1 : 0;

    append({
      order: newOrder,
      lower: newLower,
      upper: newLower + 10000,
      rate: 0.1,
      styleRef: "default",
      label: `${(0.1 * 100).toFixed(0)}% tax bracket`,
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <h2 className="text-3xl font-bold text-slate-900 mb-8">
        Create Tax Configuration
      </h2>

      {submitStatus && (
        <div
          className={`p-6 mb-8 rounded-2xl border-l-4 ${
            submitStatus.type === "success"
              ? "bg-gradient-to-r from-green-50 to-green-100 border-green-500 text-green-800"
              : "bg-gradient-to-r from-red-50 to-red-100 border-red-500 text-red-800"
          }`}
        >
          <p className="font-semibold">{submitStatus.message}</p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Tax Configuration Details */}
        <MetaCard register={register} errors={errors} />

        {/* Tax Brackets */}
        <div className="p-8 rounded-2xl bg-gradient-to-r from-slate-50 to-white border-2 border-slate-200/50 hover:shadow-lg transition-all duration-300">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-slate-800">
              Tax Brackets
            </h3>
            <button
              type="button"
              onClick={addBracket}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-2xl hover:from-blue-600 hover:to-blue-700 hover:shadow-lg transition-all duration-300"
            >
              Add Bracket
            </button>
          </div>

          <BracketCards />
        </div>

        <ActionButtons isSubmitting={isSubmitting} />
      </form>
    </div>
  );
}

export default TaxConfiguration;
