export interface CountryEnergyPrice {
  code: string;
  name: string;
  electricityUsdPerKwh: number; // residential rate, USD/kWh
  gasolineUsdPerLiter: number; // Octane-95 equivalent, USD/liter
}

// Sourced from national electricity/fuel pricing data (compiled from utility regulators
// and national statistical agencies), snapshot as of August 2026. Rates change over time
// and vary by region/utility within a country — treat as a planning estimate, not a quote.
export const countryEnergyPrices: CountryEnergyPrice[] = [
  { code: "US", name: "United States", electricityUsdPerKwh: 0.188, gasolineUsdPerLiter: 1.38 },
  { code: "CN", name: "China", electricityUsdPerKwh: 0.076, gasolineUsdPerLiter: 1.07 },
  { code: "DE", name: "Germany", electricityUsdPerKwh: 0.406, gasolineUsdPerLiter: 2.07 },
  { code: "FR", name: "France", electricityUsdPerKwh: 0.276, gasolineUsdPerLiter: 1.87 },
  { code: "GB", name: "United Kingdom", electricityUsdPerKwh: 0.402, gasolineUsdPerLiter: 1.85 },
  { code: "NL", name: "Netherlands", electricityUsdPerKwh: 0.286, gasolineUsdPerLiter: 2.03 },
  { code: "NO", name: "Norway", electricityUsdPerKwh: 0.165, gasolineUsdPerLiter: 2.19 },
  { code: "SE", name: "Sweden", electricityUsdPerKwh: 0.243, gasolineUsdPerLiter: 1.54 },
  { code: "IT", name: "Italy", electricityUsdPerKwh: 0.414, gasolineUsdPerLiter: 1.84 },
  { code: "ES", name: "Spain", electricityUsdPerKwh: 0.255, gasolineUsdPerLiter: 1.73 },
  { code: "PL", name: "Poland", electricityUsdPerKwh: 0.236, gasolineUsdPerLiter: 1.66 },
  { code: "RU", name: "Russia", electricityUsdPerKwh: 0.069, gasolineUsdPerLiter: 0.86 },
  { code: "JP", name: "Japan", electricityUsdPerKwh: 0.227, gasolineUsdPerLiter: 1.14 },
  { code: "KR", name: "South Korea", electricityUsdPerKwh: 0.127, gasolineUsdPerLiter: 1.25 },
  { code: "CA", name: "Canada", electricityUsdPerKwh: 0.123, gasolineUsdPerLiter: 1.35 },
  { code: "AU", name: "Australia", electricityUsdPerKwh: 0.259, gasolineUsdPerLiter: 1.37 },
  { code: "IN", name: "India", electricityUsdPerKwh: 0.077, gasolineUsdPerLiter: 1.05 },
  { code: "BR", name: "Brazil", electricityUsdPerKwh: 0.164, gasolineUsdPerLiter: 1.19 },
];

export const LITERS_PER_GALLON = 3.78541;
export const KM_PER_MILE = 1.60934;
