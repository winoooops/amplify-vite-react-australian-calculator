import { V6Client } from "@aws-amplify/api-graphql";
import { Schema } from "../../../../amplify/data/resource";

const listTaxBracketQueryHandler = async (
  client: V6Client<Schema>,
  { configId }: { configId: string }
) => {
  const { data, errors } = await client.models.TaxConfig.get(
    { id: configId },
    {
      selectionSet: [
        "id",
        "brackets.id",
        "brackets.taxConfigId",
        "brackets.order",
        "brackets.lower",
        "brackets.upper",
        "brackets.rate",
        "brackets.colorRef",
        "brackets.label",
      ],
    }
  );

  if (errors && errors.length > 0) {
    throw new Error(errors.map((error) => error.message).join(""));
  }

  if (!data?.brackets || data.brackets.length === 0) {
    return [];
  }

  return data?.brackets as Array<Schema["TaxBracket"]["type"]>;
};

export default listTaxBracketQueryHandler;
