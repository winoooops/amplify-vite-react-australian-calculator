import { V6Client } from "@aws-amplify/api-graphql";

import {
  CreateTaxConfigWithBracketsInput,
  TaxBracketFormData,
} from "../../types";
import { Schema } from "../../../../amplify/data/resource";

export function bracketsPreHandler(input: CreateTaxConfigWithBracketsInput) {
  const brackets = input.brackets;

  const computedBrackets = brackets.reduce(
    (accumulative: TaxBracketFormData[], current: TaxBracketFormData) => {
      if (accumulative.length === 0) {
        current.maxTaxAmount = 0;
      } else if (current.upper === null) {
        current.maxTaxAmount = -1;
      } else {
        const prev = accumulative[accumulative.length - 1];
        current.maxTaxAmount =
          prev.maxTaxAmount! +
          (current.upper - prev.upper!) * (current.rate! / 100);
      }
      accumulative.push(current);
      return accumulative;
    },
    []
  );

  return {
    ...input,
    brackets: computedBrackets,
  };
}

export async function bracketPostHandler(
  client: V6Client<Schema>,
  taxConfigId: string,
  brackets: TaxBracketFormData[]
) {
  const promises: Promise<unknown>[] = [];

  for (const bracket of brackets) {
    promises.push(
      client.models.TaxBracket.create({
        ...bracket,
        taxConfigId,
      })
    );
  }

  await Promise.all(promises);
}
