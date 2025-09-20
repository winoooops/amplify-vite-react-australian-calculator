export interface TaxBracket {
  id: string;
  order: number;
  lower: number;
  upper: number | null;
  rate: number;
  styleRef: string;
  taxConfig?: string;
}

export type TaxBracketFormData = Omit<TaxBracket, "id" | "taxConfig">;

export type CreateTaxBracketInput = {
  order: number;
  lower: number;
  upper: number | null;
  rate: number;
  styleRef: string;
  taxConfigId: string;
};
