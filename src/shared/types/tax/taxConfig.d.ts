import { TaxBracket, TaxBracketFormData } from "./taxBracket";

export interface TaxConfig {
    financialYearStart: number;
    financialYearEnd: number;
    version: string;
    lastUpdated: string;
    brackets: TaxBracket[];
}

export type TaxConfigFormData = {
    financialYearStart: number;
    financialYearEnd: number;
    version: string;
    lastUpdated: string;
    brackets: TaxBracketFormData[];
};