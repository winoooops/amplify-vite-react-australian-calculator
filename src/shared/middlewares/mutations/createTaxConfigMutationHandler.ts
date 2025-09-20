import { V6Client } from "@aws-amplify/api-graphql";
import { Schema } from "../../../../amplify/data/resource";
import { CreateTaxConfigWithBracketsInput } from "../../types";
import createTaxBracketMutationHandler from "./createTaxBracketMutationHandler";

export const createTaxConfigMutationHandler = async (
  client: V6Client<Schema>,
  input: CreateTaxConfigWithBracketsInput
) => {
  const { data: createdConfig, errors: configErrors } =
    await client.models.TaxConfig.create({
      financialYearStart: input.financialYearStart,
      financialYearEnd: input.financialYearEnd,
      version: input.version,
      lastUpdated: input.lastUpdated,
      isActive: input.isActive ?? false,
    });

  if (configErrors && configErrors.length > 0) {
    throw new Error(configErrors.map((error) => error.message).join(", "));
  }

  if (!createdConfig) {
    throw new Error("Failed to create tax configuration");
  }

  const brackets = [];

  for (let index = 0; index < input.brackets.length; index += 1) {
    const createdBracket = createTaxBracketMutationHandler(client, {
      ...input.brackets[index],
      taxConfigId: createdConfig.id,
    });
    brackets.push(createdBracket);
  }

  return {
    ...createdConfig,
    brackets,
  };
};

export default createTaxConfigMutationHandler;
