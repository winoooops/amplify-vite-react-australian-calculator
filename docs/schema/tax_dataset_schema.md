# Tax Dataset Schema (Global)

## Goals
- Single source of truth for a financial year’s tax data.
- Data-only (no UI), stable across users, versioned per year.

## Shape
- id: string (random UUID with financial year suffix, e.g., "<uuid>-20242025")
- meta
  - financialYear: { start: number, end: number }
  - version: string (semver)
  - lastUpdated: string (ISO‑8601)
- taxBrackets: TaxBracket[]
  - id: string (UUID with optional year suffix, e.g., "<uuid>-20242025")
  - taxConfigId: string (FK to dataset `id`)
  - order: number (for stable sorting)
  - lower: number (inclusive, AUD)
  - upper?: number (exclusive when present; omit when open-ended)
  - rate: number (0..1)
  - styleRef: string (opaque UI style token, e.g., "green" or "blue-indigo"). See UI Style Mapping.
  - label?: string (e.g., "0% to $18,200")

## Validation Rules
- taxBrackets sorted ascending by lower; no overlaps; first lower = 0; last omits upper.
- rate in [0,1].
- styleRef unique across taxBrackets.
- Dataset id format: "<uuid>-<yearSuffix>", where yearSuffix = `${meta.financialYear.start}${meta.financialYear.end}`; suffix must match financialYear.
- Each taxBrackets[i].taxConfigId must equal the dataset `id` in this document.
- Bracket id recommended format: same as dataset ("<uuid>-<yearSuffix>").

## Example
```json
{
  "id": "d290f1ee-6c54-4b01-90e6-d701748f0851-20242025",
  "meta": {
    "financialYear": { "start": 2024, "end": 2025 },
    "version": "1.0.0",
    "lastUpdated": "2024-09-01"
  },
  "taxBrackets": [
    {
      "id": "b6b1d3d8-5c6a-4b2b-8e10-3b6f9b4b1b2c",
      "taxConfigId": "d290f1ee-6c54-4b01-90e6-d701748f0851-20242025",
      "order": 1,
      "lower": 0,
      "upper": 18200,
      "rate": 0.0,
      "styleRef": "green"
    },
    {
      "id": "b6b1d3d8-5c6a-4b2b-8e10-3b6f9b4b1b2c",
      "taxConfigId": "d290f1ee-6c54-4b01-90e6-d701748f0851-20242025",
      "order": 2,
      "lower": 18201,
      "upper": 45000,
      "rate": 0.19,
      "styleRef": "blue"
    },
    {
      "id": "b6b1d3d8-5c6a-4b2b-8e10-3b6f9b4b1b2c",
      "taxConfigId": "d290f1ee-6c54-4b01-90e6-d701748f0851-20242025",
      "order": 3,
      "lower": 45001,
      "upper": 120000,
      "rate": 0.325,
      "styleRef": "orange"
    },
    {
      "id": "b6b1d3d8-5c6a-4b2b-8e10-3b6f9b4b1b2c",
      "taxConfigId": "d290f1ee-6c54-4b01-90e6-d701748f0851-20242025",
      "order": 4,
      "lower": 120001,
      "upper": 180000,
      "rate": 0.37,
      "styleRef": "red"
    },
    {
      "id": "b6b1d3d8-5c6a-4b2b-8e10-3b6f9b4b1b2c",
      "taxConfigId": "d290f1ee-6c54-4b01-90e6-d701748f0851-20242025",
      "order": 5,
      "lower": 180001,
      "rate": 0.45,
      "styleRef": "purple"
    }
  ]
}
```

## See Also
- User Tax Record Schema: ./user_tax_record_schema.md
- UI Style Mapping: ../ui/ui_style_mapping.md
