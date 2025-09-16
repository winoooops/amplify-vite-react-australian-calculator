export interface TaxBracket {
    id: string;
    order: number;
    lower: number;
    upper: number;
    rate: number;
    styleRef: string;
    taxConfig?: string;
}

export type TaxBracketFormData = Omit<TaxBracket, "id" | "label">;