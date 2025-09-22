import { TaxBracket, TaxBracketFormData } from "./taxBracket";

export interface TaxConfig {
  id: string;
  financialYearStart: number;
  financialYearEnd: number;
  version: string;
  lastUpdated: string;
  brackets: TaxBracket[];
  isActive: boolean;
}

export type TaxConfigFormData = {
  financialYearStart: number;
  financialYearEnd: number;
  version: string;
  lastUpdated: string;
  brackets: TaxBracketFormData[];
  isActive: boolean;
};

export type CreateTaxConfigWithBracketsInput = {
  financialYearStart: number;
  financialYearEnd: number;
  version: string;
  lastUpdated: string;
  isActive?: boolean;
  brackets: TaxBracketFormData[];
};

export type RegisterFieldNames =
  | "rate"
  | "order"
  | "lower"
  | "upper"
  | "colorRef";
