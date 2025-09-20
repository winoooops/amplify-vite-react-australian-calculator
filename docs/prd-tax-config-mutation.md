# Feature Design – Server-Side Tax Config Creation

## Problem / Context
Creating a tax configuration (config metadata + bracket rows) currently happens entirely in the React client. The browser makes multiple `client.models.*` calls in sequence, so a partial failure can leave dangling data, and we have no centralized validation or audit trail. We need a backend-owned API that atomically persists a config and its brackets using Amplify Data’s custom business logic capabilities.

## Goals
- Provide a single custom GraphQL mutation that validates input and writes both the `TaxConfig` item and all associated `TaxBracket` items in one request.
- Ensure the write is transactional (all-or-nothing) and uses AppSync JS resolver primitives that comply with [Amplify custom business logic](https://docs.amplify.aws/react/build-a-backend/data/custom-business-logic/).
- Keep client shape stable (same fields the UI already uses), but let the frontend call one mutation instead of orchestrating multiple model operations.
- Maintain the existing public API-key auth model (mutation stays open to the UI; we’ll add input validation server-side).

## Out of Scope / Non-Goals
- Revisiting overall data model (the `TaxConfig`/`TaxBracket` schemas stay as-is).
- Implementing comprehensive history/audit trails or role-based access control.
- Building automated tests right now (no test framework configured), but we’ll outline manual verification.

## User Stories
1. As an internal user, when I submit the “Create Tax Configuration” form, the backend should persist the config and all brackets atomically.
2. As an operator, I need the mutation to reject invalid payloads (missing required fields, non-numeric numbers) with clear errors so the UI can display them.
3. As a developer, I want the mutation response to include the inserted config and its brackets so the UI can update local state without re-fetching everything.

## Functional Requirements
- GraphQL schema gains `createTaxConfigWithBrackets` mutation (custom operation on `Mutation`).
- Input shape:
  ```ts
  type CreateTaxConfigWithBracketsInput = {
    financialYearStart: number;
    financialYearEnd: number;
    version: string;
    lastUpdated: string; // ISO date
    isActive?: boolean;
    brackets: Array<{
      order: number;
      lower: number;
      upper?: number | null;
      rate: number;
      styleRef?: string;
      label?: string;
    }>;
  };
  ```
- Mutation response returns the created `TaxConfig` with a nested `brackets { items, nextToken }`.
- Resolver validation: ensure required strings provided, numeric fields are finite numbers, and bracket array length matches expectations.
- Persistence: use AppSync JS resolver best practices (`ctx.db.transactWrite` or equivalent supported structure) to write the config and brackets to DynamoDB within a single transaction.
- Error handling: respond with descriptive `BadRequest` errors when validation fails.
- Maintain current public API key auth rule (protect later if needed).

## Technical Approach
1. **Schema update** – in `amplify/data/resource.ts`, add the custom mutation definition (using the supported builder methods and, if necessary, custom types for input).
2. **Resolver handlers** – Create handler file(s) under `amplify/data/tax/` following the docs:
   - `request` function: parse/validate input, build `ctx.db.transactWrite` payload, store sanitized config/brackets in `ctx.stash`.
   - `response` function: return a plain JS object with the config plus bracket items.
   - Use only syntax supported by the AppSync JS runtime.
3. **Frontend integration** – Update `TaxConfiguration/onSubmit` to call `client.mutations.createTaxConfigWithBrackets({ input })` with the existing form data. Handle errors and success as before.
4. **History context** – Optionally reuse the mutation response to refresh local history state without refetching.

## Baby-Step Implementation Plan
1. Ensure working tree state is understood (`git status`).
2. Update schema in `resource.ts` to declare the new mutation (no resolver code yet) and run `npx ampx sandbox --once` locally to confirm it synthesizes.
3. Add resolver file `create-tax-config.js` implementing request/response with validation and transactional write.
4. Redeploy (`npx ampx sandbox --once`) and confirm CloudFormation accepts the function.
5. Adjust frontend form submission to call the new mutation and surface errors.
6. Manually test via UI or GraphiQL.
7. Run `npm run build` to ensure compilation succeeds.
8. Document manual verification steps and prepare PR.

## Testing & Validation Plan
- Manual GraphiQL mutation to ensure resolver writes config + brackets atomically.
- Manual UI run-through (form submission, error messaging).
- DynamoDB table inspection via Amplify sandbox logs or AWS console.
- `npm run build` / `npm run lint` for regression detection.

## Risks & Mitigations
- AppSync JS runtime rejects unsupported syntax → adhere strictly to documented request/response shapes and syntax.
- Transaction size limit (25 actions) → validate bracket count and enforce a practical limit (or split work later).
- Public mutation could be abused → note follow-up to tighten auth once requirements are clear.

## Dependencies / References
- Amplify custom business logic guide: https://docs.amplify.aws/react/build-a-backend/data/custom-business-logic/
- Frontend form `src/components/TaxConfiguration/index.tsx`
- Amplify `ctx.db` helpers and DynamoDB transactional write docs.
