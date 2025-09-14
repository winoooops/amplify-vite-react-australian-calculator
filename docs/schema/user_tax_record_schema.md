# User Tax Record Schema (User-Owned)

This schema defines per-user tax calculation records for a given financial year. It captures inputs and computed KPI results per request.

## Goals
- Persist each user’s calculation (inputs + outputs) per financial year.
- Link records to the global tax dataset used for calculation.
- Owner-only access; records are only visible to the creator.

## Entity: UserTaxRecord
- id: string (random UUID)
- taxConfigId: string (foreign key to global tax dataset id)
- version: string (semver of record schema)
- createdAt: string (ISO‑8601)
- inputs:
  - income: number (AUD per year)
- results:
  - estimatedTax: number
  - netIncome: number
  - averageTaxRate: number (0..1)
  - breakdown?: object (optional details)

## Example
```json
{
  "id": "b6b1d3d8-5c6a-4b2b-8e10-3b6f9b4b1b2c",
  "taxConfigId": "d290f1ee-6c54-4b01-90e6-d701748f0851-20242025",
  "version": "1.0.0",
  "createdAt": "2024-09-15T10:00:00Z",
  "inputs": { "income": 120000 },
  "results": { "estimatedTax": 31200, "netIncome": 88800, "averageTaxRate": 0.26 }
}
```

## Amplify Data (Gen 2) Sketch
```ts
import { a } from "@aws-amplify/backend";

const schema = a.schema({
  UserTaxRecord: a
    .model({
      taxConfigId: a.string(),
      version: a.string(),
      createdAt: a.string(),
      inputs: a.customType({ income: a.float() }),
      results: a.json(),
    })
    .authorization((allow) => [allow.owner()]),
});
```

## Notes
- Denormalize financial year fields on the record if you need faster filtering.
- For id generation, append the computed yearSuffix to a v4 UUID at creation.
- Validate that taxConfigId exists before saving the record.

## See Also
- Global Tax Data: ./tax_dataset_schema.md
- UI Style Mapping: ../ui/ui_style_mapping.md
