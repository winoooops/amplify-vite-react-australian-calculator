import { V6Client } from "@aws-amplify/api-graphql";
import { Schema } from "../../../../amplify/data/resource";

export async function batchDeleteHandler(
  configId: string,
  brackets: Array<Schema["TaxBracket"]["type"]>,
  client: V6Client<Schema>
) {
  const deletePromises: Promise<unknown>[] = [];

  (brackets ?? []).forEach((bracket) => {
    if (bracket?.id) {
      deletePromises.push(client.models.TaxBracket.delete({ id: bracket.id }));
    }
  });

  await Promise.all(deletePromises);

  await client.models.TaxConfig.delete({ id: configId });
}
