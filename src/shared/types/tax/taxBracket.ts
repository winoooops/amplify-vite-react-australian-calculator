export enum COLOR_REF_ENUM {
  DEFAULT = "DEFAULT",
  LEVEL_1 = "LEVEL_1",
  LEVEL_2 = "LEVEL_2",
  LEVEL_3 = "LEVEL_3",
  LEVEL_4 = "LEVEL_4",
  LEVEL_5 = "LEVEL_5",
}

export type ColorKey = "gray" | "green" | "blue" | "orange" | "red" | "purple";

export const colorRefMap: Record<COLOR_REF_ENUM, ColorKey> = {
  [COLOR_REF_ENUM.DEFAULT]: "gray",
  [COLOR_REF_ENUM.LEVEL_1]: "green",
  [COLOR_REF_ENUM.LEVEL_2]: "blue",
  [COLOR_REF_ENUM.LEVEL_3]: "orange",
  [COLOR_REF_ENUM.LEVEL_4]: "red",
  [COLOR_REF_ENUM.LEVEL_5]: "purple",
} as const;

export interface TaxBracket {
  id: string;
  order: number;
  lower: number;
  upper: number | null;
  rate: number;
  colorRef: COLOR_REF_ENUM;
  taxConfig?: string;
}

export type TaxBracketFormData = Omit<TaxBracket, "id" | "taxConfig">;

export type CreateTaxBracketInput = {
  order: number;
  lower: number;
  upper: number | null;
  rate: number;
  colorRef: COLOR_REF_ENUM;
  taxConfigId: string;
};
