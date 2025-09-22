import { V6Client } from "@aws-amplify/api-graphql";
import { Schema } from "../../../../amplify/data/resource";
import { CreateTaxBracketInput } from "../../types";

const createTaxBracketMutationHandler = async (
  client: V6Client<Schema>,
  input: CreateTaxBracketInput
) => {
  console.log(input);
  const { data, errors } = await client.models.TaxBracket.create(input, {
    selectionSet: [
      "id",
      "taxConfigId",
      "order",
      "lower",
      "upper",
      "rate",
      "colorRef",
      "label",
      "createdAt",
      "updatedAt",
    ],
  });

  if (errors && errors.length > 0) {
    throw new Error(errors.map((error) => error.message).join(", "));
  }

  console.log(data);

  return data;
};

export default createTaxBracketMutationHandler;
