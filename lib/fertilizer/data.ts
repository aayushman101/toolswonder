// ─── Fertilizer Database ─────────────────────────────────────────────────────

export interface Fertilizer {
  id: string;
  name: string;
  shortName: string;
  n: number;   // % Nitrogen
  p: number;   // % P₂O₅
  k: number;   // % K₂O
  s?: number;  // % Sulfur
  ca?: number; // % Calcium
  pricePerKg: number; // INR default
  category: "straight" | "complex" | "organic";
  description?: string;
}

export const FERTILIZERS: Fertilizer[] = [
  // ── Straight Fertilizers ──────────────────────────────────────────────────
  {
    id: "urea", name: "Urea", shortName: "Urea",
    n: 46, p: 0, k: 0, s: 0, pricePerKg: 6.5, category: "straight",
    description: "Most common nitrogen fertilizer. Apply in 3 splits for best efficiency.",
  },
  {
    id: "dap", name: "DAP (Di-Ammonium Phosphate)", shortName: "DAP",
    n: 18, p: 46, k: 0, s: 0, pricePerKg: 27, category: "straight",
    description: "Most popular phosphorus fertilizer. Also supplies 18% N.",
  },
  {
    id: "mop", name: "MOP (Muriate of Potash)", shortName: "MOP",
    n: 0, p: 0, k: 60, s: 0, pricePerKg: 17, category: "straight",
    description: "Most economical potassium source. Use with caution in saline soils.",
  },
  {
    id: "ssp", name: "SSP (Single Super Phosphate)", shortName: "SSP",
    n: 0, p: 16, k: 0, s: 11, ca: 19, pricePerKg: 7, category: "straight",
    description: "Also supplies 11% sulphur. Ideal for oilseeds, pulses, and potatoes.",
  },
  {
    id: "tsp", name: "TSP (Triple Super Phosphate)", shortName: "TSP",
    n: 0, p: 46, k: 0, s: 0, pricePerKg: 24, category: "straight",
    description: "High-analysis phosphate without nitrogen. Good for legumes at planting.",
  },
  {
    id: "sop", name: "SOP (Sulphate of Potash)", shortName: "SOP",
    n: 0, p: 0, k: 50, s: 18, pricePerKg: 55, category: "straight",
    description: "Chloride-free potassium with sulphur. Ideal for tobacco, tea, and fruit crops.",
  },
  {
    id: "can", name: "CAN (Calcium Ammonium Nitrate)", shortName: "CAN",
    n: 25, p: 0, k: 0, ca: 8, pricePerKg: 15, category: "straight",
    description: "Fast-acting nitrogen. Less acidifying than urea. Good for alkaline soils.",
  },
  {
    id: "as", name: "Ammonium Sulphate", shortName: "AS",
    n: 21, p: 0, k: 0, s: 24, pricePerKg: 18, category: "straight",
    description: "Nitrogen + sulphur. Slightly acidifying; ideal for alkaline/calcareous soils.",
  },
  {
    id: "an", name: "Ammonium Nitrate", shortName: "AN",
    n: 33.5, p: 0, k: 0, pricePerKg: 22, category: "straight",
    description: "High nitrogen content. Fast acting, suitable for top-dressing.",
  },
  // ── Complex Fertilizers ───────────────────────────────────────────────────
  {
    id: "npk_10_26_26", name: "NPK 10-26-26", shortName: "10-26-26",
    n: 10, p: 26, k: 26, pricePerKg: 28, category: "complex",
    description: "Balanced P&K complex. Popular in India for basal application.",
  },
  {
    id: "npk_12_32_16", name: "NPK 12-32-16", shortName: "12-32-16",
    n: 12, p: 32, k: 16, pricePerKg: 30, category: "complex",
    description: "High-phosphorus complex. Popular for transplanted crops.",
  },
  {
    id: "npk_14_35_14", name: "NPK 14-35-14", shortName: "14-35-14",
    n: 14, p: 35, k: 14, pricePerKg: 30, category: "complex",
    description: "High-phosphorus complex. Good for root crops and row crops.",
  },
  {
    id: "npk_17_17_17", name: "NPK 17-17-17", shortName: "17-17-17",
    n: 17, p: 17, k: 17, pricePerKg: 25, category: "complex",
    description: "Equal-ratio complex. Good all-purpose fertilizer for balanced nutrition.",
  },
  {
    id: "npk_19_19_19", name: "NPK 19-19-19 (Water Soluble)", shortName: "19-19-19",
    n: 19, p: 19, k: 19, pricePerKg: 70, category: "complex",
    description: "Fully water-soluble. Ideal for fertigation/drip irrigation.",
  },
  {
    id: "npk_20_20_20", name: "NPK 20-20-20 (Water Soluble)", shortName: "20-20-20",
    n: 20, p: 20, k: 20, pricePerKg: 80, category: "complex",
    description: "Fully water-soluble. Premium foliar and fertigation grade.",
  },
  {
    id: "npk_28_28_0", name: "NPK 28-28-0", shortName: "28-28-0",
    n: 28, p: 28, k: 0, pricePerKg: 27, category: "complex",
    description: "High N+P without K. Used when soil K is adequate.",
  },
  // ── Organic Fertilizers ───────────────────────────────────────────────────
  {
    id: "fym", name: "FYM (Farm Yard Manure)", shortName: "FYM",
    n: 0.5, p: 0.25, k: 0.5, pricePerKg: 1, category: "organic",
    description: "Improves soil health and water-holding capacity. Apply 10–20 t/ha.",
  },
  {
    id: "vermicompost", name: "Vermicompost", shortName: "Vermi",
    n: 1.5, p: 1.0, k: 0.75, pricePerKg: 8, category: "organic",
    description: "High-quality organic fertilizer rich in micronutrients. Apply 3–5 t/ha.",
  },
  {
    id: "poultry", name: "Poultry Manure", shortName: "Poultry",
    n: 2.0, p: 1.5, k: 0.9, pricePerKg: 5, category: "organic",
    description: "High-nitrogen organic. Fast-acting compared to FYM. Apply 5–10 t/ha.",
  },
  {
    id: "neem_cake", name: "Neem Cake", shortName: "Neem",
    n: 5.0, p: 1.0, k: 1.5, pricePerKg: 15, category: "organic",
    description: "Organic nitrogen with nitrification inhibitor effect. 200–400 kg/ha.",
  },
  {
    id: "compost", name: "Compost", shortName: "Compost",
    n: 0.8, p: 0.4, k: 0.8, pricePerKg: 3, category: "organic",
    description: "Balanced slow-release organic matter. Apply 5–10 t/ha at planting.",
  },
];

// ─── Crop Database ────────────────────────────────────────────────────────────

export interface CropNPK {
  low: [number, number, number];    // [N, P, K] kg/ha for low fertility soil
  medium: [number, number, number]; // [N, P, K] kg/ha for medium fertility
  high: [number, number, number];   // [N, P, K] kg/ha for high fertility
}

export interface Crop {
  id: string;
  name: string;
  nameHi?: string; // Hindi name
  category: string;
  npkPerHa: CropNPK;
  seasons: string[];
  splitSchedule: {
    label: string;        // "Basal" | "1st Top-dress" etc.
    nPct: number;         // % of total N
    pPct: number;
    kPct: number;
    timing: string;       // "At sowing" | "21–25 days after sowing" etc.
  }[];
  notes?: string;
  yieldTarget?: string;  // e.g. "5–6 t/ha"
}

export const CROPS: Crop[] = [
  // ── Cereals ──────────────────────────────────────────────────────────────
  {
    id: "rice", name: "Rice (Paddy)", nameHi: "धान", category: "Cereals",
    npkPerHa: { low: [120, 60, 60], medium: [100, 50, 50], high: [80, 40, 40] },
    seasons: ["Kharif"],
    splitSchedule: [
      { label: "Basal (at transplanting)", nPct: 50, pPct: 100, kPct: 50, timing: "At transplanting" },
      { label: "1st Top-dress", nPct: 25, pPct: 0, kPct: 0, timing: "Active tillering (21–25 DAT)" },
      { label: "2nd Top-dress", nPct: 25, pPct: 0, kPct: 50, timing: "Panicle initiation (45–50 DAT)" },
    ],
    notes: "Always apply N in 3 splits; deep placement increases efficiency. Use LCC for N timing.",
    yieldTarget: "5–7 t/ha",
  },
  {
    id: "wheat", name: "Wheat", nameHi: "गेहूं", category: "Cereals",
    npkPerHa: { low: [150, 75, 60], medium: [120, 60, 40], high: [100, 50, 30] },
    seasons: ["Rabi"],
    splitSchedule: [
      { label: "Basal (at sowing)", nPct: 50, pPct: 100, kPct: 100, timing: "At sowing" },
      { label: "1st Top-dress (CRI)", nPct: 25, pPct: 0, kPct: 0, timing: "Crown Root Initiation (21 DAS)" },
      { label: "2nd Top-dress", nPct: 25, pPct: 0, kPct: 0, timing: "Tillering (45 DAS)" },
    ],
    notes: "Sow in 3rd week of October–November. Apply P and K fully at sowing.",
    yieldTarget: "4–5 t/ha",
  },
  {
    id: "maize", name: "Maize (Corn)", nameHi: "मक्का", category: "Cereals",
    npkPerHa: { low: [150, 75, 75], medium: [120, 60, 60], high: [100, 50, 50] },
    seasons: ["Kharif", "Rabi"],
    splitSchedule: [
      { label: "Basal (at sowing)", nPct: 33, pPct: 100, kPct: 50, timing: "At sowing" },
      { label: "1st Top-dress", nPct: 33, pPct: 0, kPct: 0, timing: "Knee height (30–35 DAS)" },
      { label: "2nd Top-dress", nPct: 34, pPct: 0, kPct: 50, timing: "Tasseling (50–55 DAS)" },
    ],
    yieldTarget: "6–8 t/ha",
  },
  {
    id: "barley", name: "Barley", nameHi: "जौ", category: "Cereals",
    npkPerHa: { low: [100, 50, 40], medium: [80, 40, 30], high: [60, 30, 20] },
    seasons: ["Rabi"],
    splitSchedule: [
      { label: "Basal", nPct: 50, pPct: 100, kPct: 100, timing: "At sowing" },
      { label: "Top-dress", nPct: 50, pPct: 0, kPct: 0, timing: "Tillering (30–35 DAS)" },
    ],
    yieldTarget: "3–4 t/ha",
  },
  {
    id: "sorghum", name: "Sorghum (Jowar)", nameHi: "ज्वार", category: "Cereals",
    npkPerHa: { low: [100, 50, 40], medium: [80, 40, 30], high: [60, 30, 20] },
    seasons: ["Kharif"],
    splitSchedule: [
      { label: "Basal", nPct: 50, pPct: 100, kPct: 100, timing: "At sowing" },
      { label: "Top-dress", nPct: 50, pPct: 0, kPct: 0, timing: "30 DAS" },
    ],
    yieldTarget: "2.5–4 t/ha",
  },
  // ── Cash Crops ────────────────────────────────────────────────────────────
  {
    id: "sugarcane", name: "Sugarcane", nameHi: "गन्ना", category: "Cash Crops",
    npkPerHa: { low: [300, 100, 150], medium: [250, 80, 120], high: [200, 60, 100] },
    seasons: ["Annual"],
    splitSchedule: [
      { label: "Basal (at planting)", nPct: 25, pPct: 100, kPct: 50, timing: "At planting" },
      { label: "1st Ratoon", nPct: 25, pPct: 0, kPct: 0, timing: "60–75 days" },
      { label: "2nd Ratoon", nPct: 25, pPct: 0, kPct: 25, timing: "120–150 days" },
      { label: "3rd Ratoon", nPct: 25, pPct: 0, kPct: 25, timing: "180–210 days" },
    ],
    notes: "Apply N in 4 splits to minimize losses. Trash mulching conserves moisture.",
    yieldTarget: "80–100 t/ha",
  },
  {
    id: "cotton", name: "Cotton", nameHi: "कपास", category: "Cash Crops",
    npkPerHa: { low: [150, 75, 75], medium: [120, 60, 60], high: [100, 50, 50] },
    seasons: ["Kharif"],
    splitSchedule: [
      { label: "Basal", nPct: 50, pPct: 100, kPct: 50, timing: "At sowing" },
      { label: "1st Top-dress", nPct: 25, pPct: 0, kPct: 0, timing: "45 DAS (squaring)" },
      { label: "2nd Top-dress", nPct: 25, pPct: 0, kPct: 50, timing: "75 DAS (boll formation)" },
    ],
    yieldTarget: "2–3 t/ha (seed cotton)",
  },
  {
    id: "tobacco", name: "Tobacco", category: "Cash Crops",
    npkPerHa: { low: [120, 60, 150], medium: [100, 50, 120], high: [80, 40, 100] },
    seasons: ["Rabi"],
    splitSchedule: [
      { label: "Basal", nPct: 50, pPct: 100, kPct: 100, timing: "At transplanting" },
      { label: "Top-dress", nPct: 50, pPct: 0, kPct: 0, timing: "3–4 weeks after transplanting" },
    ],
    notes: "Use SOP (sulphate of potash); MOP causes quality issues in tobacco.",
    yieldTarget: "1.5–2.5 t/ha",
  },
  // ── Pulses & Oilseeds ─────────────────────────────────────────────────────
  {
    id: "soybean", name: "Soybean", nameHi: "सोयाबीन", category: "Pulses/Oilseeds",
    npkPerHa: { low: [30, 80, 40], medium: [20, 60, 30], high: [0, 40, 20] },
    seasons: ["Kharif"],
    splitSchedule: [
      { label: "Basal (only)", nPct: 100, pPct: 100, kPct: 100, timing: "At sowing" },
    ],
    notes: "Inoculate seeds with Bradyrhizobium japonicum to fix atmospheric N. Reduces N requirement significantly.",
    yieldTarget: "2–3 t/ha",
  },
  {
    id: "groundnut", name: "Groundnut (Peanut)", nameHi: "मूंगफली", category: "Pulses/Oilseeds",
    npkPerHa: { low: [25, 75, 75], medium: [20, 50, 50], high: [0, 25, 25] },
    seasons: ["Kharif", "Rabi"],
    splitSchedule: [
      { label: "Basal (only)", nPct: 100, pPct: 100, kPct: 100, timing: "At sowing" },
    ],
    notes: "Apply gypsum 250–500 kg/ha at pegging for calcium. Rhizobium inoculation recommended.",
    yieldTarget: "2–3 t/ha (pods)",
  },
  {
    id: "mustard", name: "Mustard / Rapeseed", nameHi: "सरसों", category: "Pulses/Oilseeds",
    npkPerHa: { low: [120, 60, 40], medium: [100, 50, 30], high: [80, 40, 20] },
    seasons: ["Rabi"],
    splitSchedule: [
      { label: "Basal", nPct: 50, pPct: 100, kPct: 100, timing: "At sowing" },
      { label: "Top-dress", nPct: 50, pPct: 0, kPct: 0, timing: "30–35 DAS" },
    ],
    notes: "Apply sulphur via SSP or gypsum. SSP as phosphorus source is preferred for mustard.",
    yieldTarget: "1.5–2 t/ha",
  },
  {
    id: "chickpea", name: "Chickpea (Gram)", nameHi: "चना", category: "Pulses/Oilseeds",
    npkPerHa: { low: [20, 60, 30], medium: [15, 45, 20], high: [0, 30, 15] },
    seasons: ["Rabi"],
    splitSchedule: [
      { label: "Basal (only)", nPct: 100, pPct: 100, kPct: 100, timing: "At sowing" },
    ],
    notes: "Rhizobium inoculation essential. Moderate N requirement due to N-fixation.",
    yieldTarget: "1.5–2 t/ha",
  },
  {
    id: "lentil", name: "Lentil (Masoor)", nameHi: "मसूर", category: "Pulses/Oilseeds",
    npkPerHa: { low: [20, 50, 20], medium: [15, 40, 15], high: [0, 30, 10] },
    seasons: ["Rabi"],
    splitSchedule: [
      { label: "Basal (only)", nPct: 100, pPct: 100, kPct: 100, timing: "At sowing" },
    ],
    notes: "Inoculate with Rhizobium. Low N starter dose only.",
    yieldTarget: "1–1.5 t/ha",
  },
  // ── Vegetables ────────────────────────────────────────────────────────────
  {
    id: "potato", name: "Potato", nameHi: "आलू", category: "Vegetables",
    npkPerHa: { low: [200, 100, 200], medium: [180, 80, 150], high: [150, 60, 120] },
    seasons: ["Rabi"],
    splitSchedule: [
      { label: "Basal (at planting)", nPct: 50, pPct: 100, kPct: 50, timing: "At planting" },
      { label: "1st Earthing-up", nPct: 25, pPct: 0, kPct: 25, timing: "30–35 days" },
      { label: "2nd Earthing-up", nPct: 25, pPct: 0, kPct: 25, timing: "50–60 days" },
    ],
    notes: "Apply K in full at planting; K affects tuber quality. SSP preferred for S supply.",
    yieldTarget: "25–35 t/ha",
  },
  {
    id: "onion", name: "Onion", nameHi: "प्याज", category: "Vegetables",
    npkPerHa: { low: [120, 60, 80], medium: [100, 50, 60], high: [80, 40, 50] },
    seasons: ["Rabi", "Kharif"],
    splitSchedule: [
      { label: "Basal", nPct: 33, pPct: 100, kPct: 50, timing: "At transplanting" },
      { label: "1st Top-dress", nPct: 33, pPct: 0, kPct: 0, timing: "30–35 days" },
      { label: "2nd Top-dress", nPct: 34, pPct: 0, kPct: 50, timing: "45–50 days (bulb initiation)" },
    ],
    notes: "Avoid excess N after bulb initiation; causes poor storage. FYM 20–25 t/ha recommended.",
    yieldTarget: "25–30 t/ha",
  },
  {
    id: "tomato", name: "Tomato", nameHi: "टमाटर", category: "Vegetables",
    npkPerHa: { low: [180, 90, 120], medium: [150, 75, 100], high: [120, 60, 80] },
    seasons: ["All seasons"],
    splitSchedule: [
      { label: "Basal", nPct: 33, pPct: 100, kPct: 33, timing: "At transplanting" },
      { label: "1st Top-dress", nPct: 33, pPct: 0, kPct: 33, timing: "30–35 days" },
      { label: "2nd Top-dress", nPct: 34, pPct: 0, kPct: 34, timing: "Flowering (60 days)" },
    ],
    notes: "Fertigation gives 30–40% better yield. Apply micronutrients (boron, zinc) foliar.",
    yieldTarget: "40–60 t/ha",
  },
  {
    id: "brinjal", name: "Brinjal (Eggplant)", nameHi: "बैंगन", category: "Vegetables",
    npkPerHa: { low: [150, 75, 75], medium: [120, 60, 60], high: [100, 50, 50] },
    seasons: ["All seasons"],
    splitSchedule: [
      { label: "Basal", nPct: 33, pPct: 100, kPct: 50, timing: "At transplanting" },
      { label: "1st Top-dress", nPct: 33, pPct: 0, kPct: 25, timing: "30–40 days" },
      { label: "2nd Top-dress", nPct: 34, pPct: 0, kPct: 25, timing: "60–70 days" },
    ],
    yieldTarget: "25–35 t/ha",
  },
  {
    id: "chilli", name: "Chilli / Pepper", nameHi: "मिर्च", category: "Vegetables",
    npkPerHa: { low: [150, 60, 60], medium: [120, 50, 50], high: [100, 40, 40] },
    seasons: ["All seasons"],
    splitSchedule: [
      { label: "Basal", nPct: 33, pPct: 100, kPct: 50, timing: "At transplanting" },
      { label: "1st Top-dress", nPct: 33, pPct: 0, kPct: 25, timing: "40–45 days" },
      { label: "2nd Top-dress", nPct: 34, pPct: 0, kPct: 25, timing: "At flowering" },
    ],
    yieldTarget: "2.5–4 t/ha (dry)",
  },
  {
    id: "cabbage", name: "Cabbage", nameHi: "पत्तागोभी", category: "Vegetables",
    npkPerHa: { low: [150, 75, 60], medium: [120, 60, 50], high: [100, 50, 40] },
    seasons: ["Rabi"],
    splitSchedule: [
      { label: "Basal", nPct: 33, pPct: 100, kPct: 100, timing: "At transplanting" },
      { label: "1st Top-dress", nPct: 33, pPct: 0, kPct: 0, timing: "3 weeks after transplanting" },
      { label: "2nd Top-dress", nPct: 34, pPct: 0, kPct: 0, timing: "Head initiation" },
    ],
    yieldTarget: "30–40 t/ha",
  },
  // ── Fruits ────────────────────────────────────────────────────────────────
  {
    id: "banana", name: "Banana", nameHi: "केला", category: "Fruits",
    npkPerHa: { low: [250, 75, 300], medium: [200, 60, 250], high: [150, 50, 200] },
    seasons: ["Annual"],
    splitSchedule: [
      { label: "Basal", nPct: 12, pPct: 50, kPct: 12, timing: "At planting" },
      { label: "2nd Month", nPct: 12, pPct: 12, kPct: 12, timing: "2 months" },
      { label: "3rd Month", nPct: 12, pPct: 12, kPct: 12, timing: "3 months" },
      { label: "4th Month", nPct: 13, pPct: 13, kPct: 13, timing: "4 months" },
      { label: "5th Month", nPct: 13, pPct: 13, kPct: 13, timing: "5 months" },
      { label: "6th–9th Month", nPct: 38, pPct: 0, kPct: 38, timing: "6–9 months (4 doses)" },
    ],
    notes: "Fertigation via drip highly recommended. High K requirement for quality.",
    yieldTarget: "50–70 t/ha",
  },
  {
    id: "mango", name: "Mango", nameHi: "आम", category: "Fruits",
    npkPerHa: { low: [100, 50, 100], medium: [80, 40, 80], high: [60, 30, 60] },
    seasons: ["Annual"],
    splitSchedule: [
      { label: "Post-harvest / Pre-flower", nPct: 50, pPct: 100, kPct: 50, timing: "June–July" },
      { label: "Pre-fruiting", nPct: 50, pPct: 0, kPct: 50, timing: "October–November" },
    ],
    notes: "Apply based on tree age. Young trees: reduce by 50%. Older trees: increase accordingly.",
    yieldTarget: "10–15 t/ha",
  },
  {
    id: "grapes", name: "Grapes", nameHi: "अंगूर", category: "Fruits",
    npkPerHa: { low: [200, 100, 200], medium: [150, 75, 150], high: [100, 50, 100] },
    seasons: ["Annual"],
    splitSchedule: [
      { label: "Pruning time", nPct: 25, pPct: 50, kPct: 25, timing: "At pruning" },
      { label: "Bud burst", nPct: 25, pPct: 25, kPct: 25, timing: "Bud burst" },
      { label: "Berry set", nPct: 25, pPct: 25, kPct: 25, timing: "Berry set" },
      { label: "Pre-harvest", nPct: 25, pPct: 0, kPct: 25, timing: "Pre-harvest" },
    ],
    notes: "Fertigation essential. Water-soluble fertilizers only for drip application.",
    yieldTarget: "15–20 t/ha",
  },
  // ── Garden & Lawn ─────────────────────────────────────────────────────────
  {
    id: "lawn", name: "Lawn / Turf Grass", category: "Garden",
    npkPerHa: { low: [150, 50, 75], medium: [120, 40, 60], high: [100, 30, 50] },
    seasons: ["All seasons"],
    splitSchedule: [
      { label: "Spring (March–April)", nPct: 30, pPct: 50, kPct: 25, timing: "March–April" },
      { label: "Early Summer (May–June)", nPct: 25, pPct: 0, kPct: 25, timing: "May–June" },
      { label: "Late Summer (Aug)", nPct: 25, pPct: 25, kPct: 25, timing: "August" },
      { label: "Autumn (Oct–Nov)", nPct: 20, pPct: 25, kPct: 25, timing: "October–November" },
    ],
    notes: "Avoid heavy N in peak summer heat. Use slow-release urea for even greening.",
    yieldTarget: "Dense, healthy turf",
  },
  {
    id: "flowers", name: "Flowers / Ornamentals", category: "Garden",
    npkPerHa: { low: [100, 80, 80], medium: [80, 60, 60], high: [60, 50, 50] },
    seasons: ["All seasons"],
    splitSchedule: [
      { label: "Basal", nPct: 50, pPct: 100, kPct: 50, timing: "At planting" },
      { label: "Top-dress", nPct: 50, pPct: 0, kPct: 50, timing: "At bud formation" },
    ],
    yieldTarget: "Quality blooms",
  },
];

// ─── Area Unit Conversions ────────────────────────────────────────────────────

export interface AreaUnit {
  label: string;
  symbol: string;
  toHectare: number;  // multiply by this to get hectares
  region?: string;
}

export const AREA_UNITS: Record<string, AreaUnit> = {
  hectare:         { label: "Hectare",            symbol: "ha",    toHectare: 1,           region: "International" },
  acre:            { label: "Acre",                symbol: "ac",    toHectare: 0.404686,    region: "International" },
  sqm:             { label: "Square Meter",        symbol: "m²",    toHectare: 0.0001,      region: "International" },
  sqft:            { label: "Square Feet",         symbol: "sq ft", toHectare: 0.0000929,   region: "International" },
  bigha_up:        { label: "Bigha (UP/Bihar)",    symbol: "Bigha", toHectare: 0.2529,      region: "North India" },
  bigha_mp:        { label: "Bigha (MP/CG)",       symbol: "Bigha", toHectare: 0.3307,      region: "Central India" },
  bigha_rajasthan: { label: "Bigha (Rajasthan)",   symbol: "Bigha", toHectare: 0.2529,      region: "Rajasthan" },
  bigha_wb:        { label: "Bigha (West Bengal)", symbol: "Bigha", toHectare: 0.1338,      region: "East India" },
  guntha:          { label: "Guntha / Gunta",      symbol: "Gnt",   toHectare: 0.010117,    region: "South India" },
  kattha:          { label: "Kattha (Bihar/WB)",   symbol: "Ktha",  toHectare: 0.013378,    region: "East India" },
  dismil:          { label: "Dismil (Bihar)",      symbol: "Dis",   toHectare: 0.040468,    region: "Bihar" },
  marla:           { label: "Marla (Punjab/HP)",   symbol: "Marla", toHectare: 0.002529,    region: "Punjab" },
  cent:            { label: "Cent (TN/Kerala)",    symbol: "Cent",  toHectare: 0.004047,    region: "South India" },
  ground:          { label: "Ground (Chennai)",    symbol: "Grd",   toHectare: 0.022297,    region: "Chennai" },
};
