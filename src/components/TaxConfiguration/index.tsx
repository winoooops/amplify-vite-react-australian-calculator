import { useState } from "react";
import { generateClient } from "aws-amplify/data";
import {
  useForm,
  useFieldArray,
  SubmitHandler,
  FormProvider,
} from "react-hook-form";
import { Schema } from "../../../amplify/data/resource";
import MetaCard from "./MetaCard";
import ActionButtons from "./ActionButtons";
import BracketCards from "./BracketCards";
import {
  TaxConfigFormData,
  CreateTaxConfigWithBracketsInput,
} from "../../shared/types";
import SectionTitle from "../SectionTitle";
import { Bolt } from "lucide-react";
import ConfigHistory from "./ConfigHistory";
import { useContext } from "react";
import { TaxConfigsContext } from "../../shared/contexts/taxConfigsContext";
import createTaxConfigMutationHandler from "../../shared/middlewares/mutations/createTaxConfigMutationHandler";

const client = generateClient<Schema>();

const defaultValues: TaxConfigFormData = {
  financialYearStart: 2024,
  financialYearEnd: 2025,
  version: "0.1",
  lastUpdated: new Date().toISOString().split("T")[0],
  brackets: [],
  isActive: false,
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

  const { fetchHistory } = useContext(TaxConfigsContext);

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
          styleRef: bracket.styleRef,
        })),
      };

      const createdConfig = await createTaxConfigMutationHandler(
        client,
        payload
      );

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
      styleRef: "default",
    });
  };

  const loadTestData = () => {
    reset(defaultValues);
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
