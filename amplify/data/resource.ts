import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

// Global tax dataset (shared per financial year)
// Public access via API key (read/write defaults to public; tighten if needed).
const schema = a.schema({
  TaxConfig: a
    .model({
      financialYearStart: a.integer(),
      financialYearEnd: a.integer(),
      version: a.string(),
      lastUpdated: a.string(),
      // Relationship: one TaxConfig has many TaxBrackets via TaxBracket.taxConfigId
      brackets: a.hasMany("TaxBracket", "taxConfigId"),
      isActive: a.boolean(),
    })
    .authorization((allow) => [allow.publicApiKey()]),

  // Normalized tax brackets belonging to a TaxConfig
  TaxBracket: a
    .model({
      taxConfigId: a.id(), // FK -> TaxConfig.id
      // Back-reference to parent TaxConfig
      taxConfig: a.belongsTo("TaxConfig", "taxConfigId"),
      order: a.integer(),
      lower: a.integer(),
      upper: a.integer(), // omit when open-ended
      rate: a.float(),
      styleRef: a.string(),
      label: a.string(),
    })
    .authorization((allow) => [allow.publicApiKey()]),

  // Per-user tax calculation record (inputs + computed KPIs)
  // Requires signed-in user; links back to a TaxConfig by id.
  UserTaxRecord: a
    .model({
      taxConfigId: a.string(),
      version: a.string(),
      createdAt: a.string(),
      // Inputs limited to income only (custom typed JSON)
      inputs: a.customType({
        income: a.float(),
      }),
      results: a.json(),
    })
    .authorization((allow) => [allow.owner()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    // API key for public access to TaxConfig
    defaultAuthorizationMode: "apiKey",
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});

/* Frontend usage (examples)
"use client"
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>();

// List tax configs (public)
// const { data: configs } = await client.models.TaxConfig.list();

// Create a user tax record (must be signed in)
// await client.models.UserTaxRecord.create({
//   taxConfigId: "<dataset-id>",
//   version: "1.0.0",
//   createdAt: new Date().toISOString(),
//   inputs: { income: 120000 },
//   results: { estimatedTax: 0, netIncome: 0, averageTaxRate: 0 },
// });
*/
