export type Language = 'en' | 'id';

export enum CounterpartyType {
  INDIVIDUAL = 'Orang Pribadi',
  ENTITY = 'Badan Hukum',
}

export interface TaxFormData {
  counterpartyType: CounterpartyType;
  hasTaxId: boolean;
  description: string;
  grossUp: boolean;
}

export interface TaxResultData {
  taxType: string;
  ratePercentage: number;
  taxBase: number;
  taxAmount: number;
  explanation: string;
}