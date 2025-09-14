# Backend Schemas Index

Quick overview of the schemas used by this app. See the linked docs for full details and rationale.

- Tax Dataset Schema (Global): `docs/schema/tax_dataset_schema.md`
- User Tax Record Schema (User-Owned): `docs/schema/user_tax_record_schema.md`
- UI Style Mapping (App Layer): `docs/ui/ui_style_mapping.md`

Quick pointers
- Shape: `{ id, meta, taxBrackets }`.
- id format: `<uuid>-<yearSuffix>` where `yearSuffix = start + end` (e.g., 20242025).
- taxBrackets include `{ lower, upper, rate, styleRef }`; `styleRef` is a UI token resolved by the app.
- User records store inputs and computed KPIs, linked via `taxConfigId` to the dataset.
