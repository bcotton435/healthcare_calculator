export interface ProcedureData {
  title: string;
  cptCode: string;
  outOfNetworkPrice: number;
  inNetworkPrice: number;
  baseCharge: number;
}

export interface RelatedCost {
  id: number;
  name: string;
  cptCode: string;
  outOfNetworkPrice: number;
  inNetworkPrice: number;
  oonName?: string;
  oonCptCode?: string;
  baseCharge: number;
  outOfNetworkPrices: Record<number, number>;
  inNetworkPrices: Record<number, number>;
}

export interface FacilityCharge {
  name: string;
  multiplier: number;
  outOfNetworkPrice: number;
  inNetworkPrice: number;
  outOfNetworkPrices: Record<number, number>;
  inNetworkPrices: Record<number, number>;
}

export interface ZipCodeData {
  avgInNetwork: number;
  avgOutOfNetwork: number;
}

export interface CalculationResult {
  total: number;
  deductiblePortion: number;
  insurancePays: number;
  youPay: number;
  coveragePercent: number;
}