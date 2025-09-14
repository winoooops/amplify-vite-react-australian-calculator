# UI Style Mapping

This document defines how the frontend supplies presentation styles for tax brackets without storing them in the data schema.

## Purpose
- Keep the data file focused on calculations (rates and thresholds).
- Resolve `styleRef` tokens from the dataset to concrete UI styles in the app layer (Context or Redux).

## Contract
- Each `taxBrackets[i].styleRef` in the dataset must have exactly one corresponding style in the UI registry.
- `styleRef` values are unique across all brackets.
- Styles can vary by theme; `styleRef` remains stable.

## Suggested Type
```ts
export type BracketStyle = {
  colorToken: string;        // e.g., "green", "red"
  gradientToken?: string;    // e.g., "emerald", "rose"
};

export type BracketStyleRegistry = Record<string, BracketStyle>; // key = styleRef
```

## Example Registry
```ts
export const bracketStyles: BracketStyleRegistry = {
  green:  { colorToken: "green",  gradientToken: "emerald" },
  blue:   { colorToken: "blue",   gradientToken: "indigo" },
  orange: { colorToken: "orange", gradientToken: "amber" },
  red:    { colorToken: "red",    gradientToken: "rose" },
  purple: { colorToken: "purple", gradientToken: "violet" }
};
```

## React Context Sketch
```tsx
import React, { createContext, useContext } from "react";
import type { BracketStyleRegistry } from "./styles";

const StyleContext = createContext<BracketStyleRegistry>({});
export const useBracketStyles = () => useContext(StyleContext);

export function StyleProvider({ registry, children }: { registry: BracketStyleRegistry; children: React.ReactNode }) {
  return <StyleContext.Provider value={registry}>{children}</StyleContext.Provider>;
}
```

## Redux Slice Sketch
```ts
import { createSlice } from "@reduxjs/toolkit";
import type { BracketStyleRegistry } from "./styles";

const initialState: BracketStyleRegistry = {};
export const styleSlice = createSlice({
  name: "styles",
  initialState,
  reducers: {
    setRegistry: (_state, action: { payload: BracketStyleRegistry }) => action.payload,
  },
});
export const { setRegistry } = styleSlice.actions;
```

## Usage
- Read `styleRef` from a tax bracket and look up `registry[styleRef]`.
- Validate at startup that every `styleRef` in the dataset exists in the registry and none are unused.

## Reference
- Tax Dataset Schema: ../schema/tax_dataset_schema.md
