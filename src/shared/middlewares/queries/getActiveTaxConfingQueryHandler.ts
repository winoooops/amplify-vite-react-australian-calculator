import { V6Client } from "@aws-amplify/api-graphql";
import { Schema } from "../../../../amplify/data/resource";
import listTaxBracketQueryHandler from "./listTaxBracketQueryHandler";

const getActiveTaxConfigQueryHandler = async (
  client: V6Client<Schema>,
  payload: { isActive: boolean }
) => {
  const { data, errors } = await client.models.TaxConfig.list({
    filter: {
      isActive: {
        eq: payload.isActive,
      },
    },
  });

  if (errors && errors.length) {
    throw new Error(errors.map((error) => error.message).join(""));
  }

  if (data.length === 0) return null;

  const activeConfig = data[0];
  const configId = activeConfig.id;

  const brackets = listTaxBracketQueryHandler(client, { configId });

  return {
    ...data[0],
    brackets,
  };
};

export default getActiveTaxConfigQueryHandler;
