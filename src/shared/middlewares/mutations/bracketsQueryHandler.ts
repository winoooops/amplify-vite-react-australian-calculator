import { V6Client } from "@aws-amplify/api-graphql";
import { Schema } from "../../../../amplify/data/resource";
import { TaxBracket } from "../../types";

export async function bracketsQueryHandler(
  client: V6Client<Schema>,
  taxConfigId: string
) {
  const { data, errors } = await client.models.TaxBracket.list({
    filter: {
      taxConfigId: {
        eq: taxConfigId,
      },
    },
    selectionSet: [
      "colorRef",
      "createdAt",
      "id",
      "lower",
      "upper",
      "maxTaxAmount",
      "rate",
      "order",
    ],
  });

  if (errors && errors.length > 0) {
    throw new Error(errors.map((err) => err.message).join(", "));
  }

  return data as TaxBracket[];
}
