import { V6Client } from "@aws-amplify/api-graphql";
import { Schema } from "../../../../amplify/data/resource";
import listTaxBracketQueryHandler from "./listTaxBracketQueryHandler";

const getTaxConfigQueryHandler = async (
  client: V6Client<Schema>,
  id: string
) => {
  if (!id) {
    return null;
  }

  const { data: configData, errors } = await client.models.TaxConfig.get({
    id,
  });

  if (errors && errors.length > 0) {
    throw new Error(errors.map((error) => error.message).join(", "));
  }

  if (!configData) {
    return null;
  }

  const brackets = await listTaxBracketQueryHandler(client, { configId: id });

  return {
    ...configData,
    brackets: brackets,
  };
};

export default getTaxConfigQueryHandler;
