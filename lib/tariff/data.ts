export interface TariffCategory {
  value: string;
  label: string;
  usRate: number; // Standard/average US MFN (Most-Favored-Nation) duty rate, %
  euRate: number; // Standard/average EU Common External Tariff duty rate, %
}

// Standard MFN / Common External Tariff base rates are broad category averages for
// planning purposes only. Actual duty depends on the specific HTS (US) / TARIC (EU) code.
// They exclude country-specific special tariffs (Section 301, Section 232, EU safeguards,
// anti-dumping duties, trade-war "reciprocal" tariffs, etc.) — those change frequently and
// must be added via the "Additional / special tariff" field.
export const tariffCategories: TariffCategory[] = [
  { value: "electronics", label: "Electronics & Computers", usRate: 1.5, euRate: 2.5 },
  { value: "apparel", label: "Apparel & Textiles", usRate: 14, euRate: 12 },
  { value: "footwear", label: "Footwear", usRate: 11, euRate: 12 },
  { value: "machinery", label: "Machinery & Industrial Equipment", usRate: 1.5, euRate: 2 },
  { value: "automobiles", label: "Automobiles & Parts", usRate: 2.5, euRate: 10 },
  { value: "furniture", label: "Furniture", usRate: 0, euRate: 2.5 },
  { value: "toys", label: "Toys & Games", usRate: 0, euRate: 4.7 },
  { value: "jewelry", label: "Jewelry & Watches", usRate: 5.5, euRate: 2.5 },
  { value: "food", label: "Food & Beverages", usRate: 5, euRate: 10 },
  { value: "chemicals", label: "Chemicals & Cosmetics", usRate: 3, euRate: 5 },
  { value: "steel_aluminum", label: "Steel & Aluminum Products", usRate: 2, euRate: 3 },
  { value: "books_media", label: "Books, Media & Printed Matter", usRate: 0, euRate: 0 },
  { value: "general", label: "Other / General Merchandise", usRate: 3.5, euRate: 2.5 },
];

export interface OriginCountry {
  value: string;
  label: string;
}

export const originCountries: OriginCountry[] = [
  { value: "china", label: "China" },
  { value: "mexico", label: "Mexico" },
  { value: "canada", label: "Canada" },
  { value: "vietnam", label: "Vietnam" },
  { value: "india", label: "India" },
  { value: "eu", label: "European Union" },
  { value: "uk", label: "United Kingdom" },
  { value: "japan", label: "Japan" },
  { value: "south_korea", label: "South Korea" },
  { value: "taiwan", label: "Taiwan" },
  { value: "usa", label: "United States" },
  { value: "other", label: "Other" },
];

export interface EUCountry {
  value: string;
  label: string;
  vatRate: number; // Standard VAT rate, %
}

// Standard (not reduced) VAT rates applied to imports, by destination EU member state.
export const euCountries: EUCountry[] = [
  { value: "DE", label: "Germany", vatRate: 19 },
  { value: "FR", label: "France", vatRate: 20 },
  { value: "IT", label: "Italy", vatRate: 22 },
  { value: "ES", label: "Spain", vatRate: 21 },
  { value: "NL", label: "Netherlands", vatRate: 21 },
  { value: "BE", label: "Belgium", vatRate: 21 },
  { value: "IE", label: "Ireland", vatRate: 23 },
  { value: "PL", label: "Poland", vatRate: 23 },
  { value: "SE", label: "Sweden", vatRate: 25 },
  { value: "DK", label: "Denmark", vatRate: 25 },
  { value: "AT", label: "Austria", vatRate: 20 },
  { value: "PT", label: "Portugal", vatRate: 23 },
  { value: "FI", label: "Finland", vatRate: 25.5 },
  { value: "GR", label: "Greece", vatRate: 24 },
  { value: "other_eu", label: "Other EU Country (avg.)", vatRate: 21 },
];

export const US_DUTY_DE_MINIMIS = 800; // USD, Section 321 informal entry threshold
export const EU_DUTY_DE_MINIMIS = 150; // EUR, customs-duty-free threshold (VAT still applies from €0)
