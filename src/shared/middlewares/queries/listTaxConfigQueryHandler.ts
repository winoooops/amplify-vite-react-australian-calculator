import { V6Client } from "@aws-amplify/api-graphql";
import { Schema } from "../../../../amplify/data/resource";
import listTaxBracketQueryHandler from "./listTaxBracketQueryHandler";

const listTaxConfigQueryHandler = async (client: V6Client<Schema>) => {
  const { data: configList, errors } = await client.models.TaxConfig.list();

  if (errors && errors.length > 0) {
    throw new Error(errors.map((error) => error.message).join(""));
  }

  if (!configList || configList.length === 0) {
    return [];
  }

  const configsWithBrackets = await Promise.all(
    configList.map(async (config) => {
      const brackets = await listTaxBracketQueryHandler(client, {
        configId: config.id,
      });

      return {
        ...config,
        brackets,
      };
    })
  );

  return configsWithBrackets;
};

export default listTaxConfigQueryHandler;
