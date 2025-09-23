import { useState } from "react";
import {
  useForm,
  useFieldArray,
  SubmitHandler,
  FormProvider,
} from "react-hook-form";
import MetaCard from "./MetaCard";
import ActionButtons from "./ActionButtons";
import BracketCards from "./BracketCards";
import {
  TaxConfigFormData,
  CreateTaxConfigWithBracketsInput,
  COLOR_REF_ENUM,
} from "../../shared/types";
import SectionTitle from "../SectionTitle";
import { Bolt } from "lucide-react";
import ConfigHistory from "./ConfigHistory";
import { useContext } from "react";
import { TaxConfigsContext } from "../../shared/contexts/taxConfigsContext";

const defaultValues: TaxConfigFormData = {
  financialYearStart: 2024,
  financialYearEnd: 2025,
  version: "0.1",
  lastUpdated: new Date().toISOString().split("T")[0],
  brackets: [],
  isActive: false,
};

const dummyValues: TaxConfigFormData = {
  financialYearStart: 2024,
  financialYearEnd: 2025,
  version: "0.1",
  lastUpdated: new Date().toISOString().split("T")[0],
  brackets: [
    {
      order: 1,
      lower: 0,
      upper: 18200,
      rate: 0,
      colorRef: COLOR_REF_ENUM.LEVEL_1,
    },
    {
      order: 2,
      lower: 18201,
      upper: 45000,
      rate: 19,
      colorRef: COLOR_REF_ENUM.LEVEL_2,
    },
    {
      order: 3,
      lower: 45001,
      upper: 120000,
      rate: 32.5,
      colorRef: COLOR_REF_ENUM.LEVEL_3,
    },
    {
      order: 4,
      lower: 120001,
      upper: 180000,
      rate: 37,
      colorRef: COLOR_REF_ENUM.LEVEL_4,
    },
    {
      order: 5,
      lower: 180001,
      upper: null,
      rate: 45,
      colorRef: COLOR_REF_ENUM.LEVEL_5,
    },
  ],
  isActive: true,
};

function TaxConfiguration() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const methods = useForm<TaxConfigFormData>({
    defaultValues: defaultValues,
  });

  const { control, handleSubmit, reset, getValues } = methods;

  const { fetchHistory, createTaxConfigWithBrackets } =
    useContext(TaxConfigsContext);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "brackets",
  });

  const onSubmit: SubmitHandler<TaxConfigFormData> = async (data) => {
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const payload: CreateTaxConfigWithBracketsInput = {
        financialYearStart: data.financialYearStart,
        financialYearEnd: data.financialYearEnd,
        version: data.version,
        lastUpdated: data.lastUpdated,
        isActive: data.isActive,
        brackets: data.brackets.map((bracket) => ({
          order: bracket.order,
          lower: bracket.lower,
          upper:
            bracket.upper === undefined || bracket.upper === null
              ? null
              : bracket.upper,
          rate: bracket.rate,
          colorRef: bracket.colorRef,
        })),
      };

      const createdConfig = await createTaxConfigWithBrackets(payload);

      if (!createdConfig?.id) {
        throw new Error("Failed to create tax configuration");
      }

      setSubmitStatus({
        type: "success",
        message: `Successfully created tax configuration for ${data.financialYearStart}-${data.financialYearEnd} with ${data.brackets.length} tax brackets`,
      });

      await fetchHistory();
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
    const brackets = getValues("brackets");
    const lastBracket = brackets[brackets.length - 1];
    const newOrder = lastBracket?.order ? lastBracket.order + 1 : 1;
    const lastUpper =
      typeof lastBracket?.upper === "number" ? lastBracket.upper : null;
    const newLower = lastUpper !== null ? lastUpper + 1 : 0;

    append({
      order: newOrder,
      lower: newLower,
      upper: newLower + 10000,
      rate: 0,
      colorRef: COLOR_REF_ENUM.DEFAULT,
    });
  };

  const loadTestData = () => {
    reset(dummyValues);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <SectionTitle title="Create Tax Configuration">
        <div className="p-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl">
          <Bolt color="white" />
        </div>
      </SectionTitle>

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

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Tax Configuration Details */}
          <MetaCard onLoadTestData={loadTestData} />

          {/* Tax Brackets */}
          <BracketCards
            fields={fields}
            onAddBracket={addBracket}
            onRemoveBracket={remove}
          />

          {/* Action buttons */}
          <ActionButtons isSubmitting={isSubmitting} />

          {/* Config History */}
          <ConfigHistory />
        </form>
      </FormProvider>
    </div>
  );
}

export default TaxConfiguration;
