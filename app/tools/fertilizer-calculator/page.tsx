import type { Metadata } from "next";
import Link from "next/link";
import FertilizerCalculator from "@/components/tools/FertilizerCalculator";
import JsonLd, { buildToolSchema, buildFaqSchema, buildBreadcrumbSchema } from "@/components/seo/JsonLd";
import Breadcrumb from "@/components/layout/Breadcrumb";
import { ChevronRight, Sprout, Info } from "lucide-react";

const BASE_URL = "https://toolswonder.com";
const TOOL_URL = `${BASE_URL}/tools/fertilizer-calculator`;

export const metadata: Metadata = {
  title: "Fertilizer Calculator – NPK, Urea, DAP, Crop & Cost Optimizer",
  description:
    "Free fertilizer calculator with crop-wise NPK recommendations, Urea/DAP/MOP doses, cost optimizer, blend analyzer, and Indian area units (bigha, guntha, kattha). Supports 25+ crops and 20+ fertilizers.",
  keywords: [
    "fertilizer calculator",
    "npk calculator",
    "fertilizer calculator formula",
    "fertilizer calculator per acre",
    "fertilizer per hectare calculator",
    "urea calculator",
    "dap calculator",
    "crop fertilizer calculator",
    "fertilizer blend calculator",
    "fertilizer cost calculator",
    "lawn fertilizer calculator",
    "nitrogen fertilizer calculator",
    "liquid fertilizer calculator",
    "dry fertilizer calculator",
    "how much fertilizer calculator",
    "fertilizer dose calculator India",
    "bigha fertilizer calculator",
    "rice fertilizer calculator",
    "wheat fertilizer calculator",
  ],
  alternates: { canonical: TOOL_URL },
  openGraph: {
    title: "Fertilizer Calculator – NPK, Urea, DAP, Crop & Cost Optimizer | ToolsWonder",
    description:
      "25+ crops, 20+ fertilizers, Indian area units, split application schedule, cost optimizer. The most complete free fertilizer calculator online.",
    url: TOOL_URL,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fertilizer Calculator – NPK, Urea, DAP, Crop Recommendations",
    description: "25+ crops, 20+ fertilizers, Indian area units, cost optimizer. Free.",
  },
};

const faqs = [
  {
    question: "How do I calculate fertilizer dose per hectare?",
    answer:
      "To calculate fertilizer per hectare: 1) Determine the nutrient requirement (e.g., Rice needs 120 kg N, 60 kg P₂O₅, 40 kg K₂O per ha). 2) For Urea (46% N): Urea = 120/0.46 = 261 kg/ha. 3) For DAP (18% N, 46% P₂O₅): DAP = 60/0.46 = 130 kg/ha (also provides 130 × 0.18 = 23.4 kg N). 4) Remaining N from Urea = (120-23.4)/0.46 = 209 kg/ha. 5) For MOP (60% K₂O): MOP = 40/0.60 = 67 kg/ha. Our calculator does all this automatically for 25+ crops.",
  },
  {
    question: "How much Urea is needed per acre for wheat?",
    answer:
      "Wheat typically needs 120 kg N per hectare (medium fertility soil). 1 hectare = 2.47 acres, so that is 120/2.47 = 48.6 kg N per acre. Urea (46% N) needed = 48.6/0.46 = 105.6 kg Urea per acre. This is usually split: 50% at sowing + 25% at first irrigation + 25% at second irrigation. Use the Crop Calculator tab above, select Wheat, enter area in acres, and the split schedule is generated automatically.",
  },
  {
    question: "How is DAP fertilizer dose calculated?",
    answer:
      "DAP (Di-ammonium Phosphate) contains 18% N and 46% P₂O₅. To meet a phosphorus requirement: DAP (kg/ha) = P₂O₅ required (kg/ha) ÷ 0.46. Example: Need 60 kg/ha P₂O₅ → 60/0.46 = 130 kg DAP/ha. DAP also contributes 130 × 0.18 = 23.4 kg N, which reduces the Urea needed. Full formula is handled in the NPK Calculator tab.",
  },
  {
    question: "What are N-P-K numbers on fertilizer bags?",
    answer:
      "The three numbers (e.g., 46-0-0, 18-46-0, 0-0-60) represent the percentage by weight of: N = Nitrogen (promotes leafy growth), P = Phosphorus as P₂O₅ (promotes root development, flowering), K = Potassium as K₂O (promotes disease resistance, fruit quality). A 50 kg bag of Urea (46-0-0) contains 50 × 0.46 = 23 kg of actual nitrogen.",
  },
  {
    question: "What is the fertilizer calculation formula?",
    answer:
      "The universal formula is: Fertilizer quantity (kg) = Nutrient required (kg) ÷ Nutrient content (%). For compound fertilizers: Calculate the limiting nutrient (usually P or K from complex fertilizer), apply that, then top-up N with Urea. Example for DAP route: DAP (kg/ha) = P/0.46; N from DAP = DAP × 0.18; Extra Urea = (N required – N from DAP)/0.46; MOP (kg/ha) = K/0.60.",
  },
  {
    question: "How to convert fertilizer per hectare to per acre?",
    answer:
      "1 hectare = 2.47105 acres, so divide by 2.47 to convert kg/ha to kg/acre. Multiply by 2.47 to convert kg/acre to kg/ha. Example: 261 kg Urea/ha = 261/2.47 = 105.7 kg Urea/acre. To convert to lbs/acre: multiply kg/acre by 2.205. Use the Unit Converter tab for quick conversions between all Indian and international area units.",
  },
  {
    question: "How much fertilizer per bigha of land?",
    answer:
      "Bigha varies by region: 1 Bigha (UP/Rajasthan) = 0.2529 ha, 1 Bigha (MP/CG) = 0.3307 ha, 1 Bigha (WB) = 0.1338 ha. Select your regional bigha in the area unit dropdown. Example: Rice needing 261 kg Urea/ha → 261 × 0.2529 = 66 kg Urea per bigha (UP). The calculator handles all regional bigha variants automatically.",
  },
  {
    question: "What is the difference between DAP route and SSP route fertilizer?",
    answer:
      "DAP route: Uses DAP (18-46-0) for phosphorus + Urea (46-0-0) for nitrogen + MOP (0-0-60) for potassium. DAP is concentrated (46% P), fewer bags needed. SSP route: Uses SSP (0-16-0) for phosphorus + Urea for N + MOP for K. SSP has only 16% P so more bags are needed BUT SSP also provides 11% Sulphur and 19% Calcium — making it ideal for oilseeds (mustard, groundnut), pulses, and sulphur-deficient soils. The cost optimizer tab compares both routes for your inputs.",
  },
  {
    question: "How much fertilizer is needed for rice per hectare?",
    answer:
      "ICAR recommendation for paddy rice: 120 kg N + 60 kg P₂O₅ + 40 kg K₂O per hectare under medium soil fertility. Using DAP route: DAP = 130 kg/ha, Urea = 209 kg/ha, MOP = 67 kg/ha. Total: 406 kg fertilizer per hectare. Split: Full DAP + MOP at transplanting, 50% Urea at transplanting, 25% Urea at tillering, 25% Urea at panicle initiation.",
  },
  {
    question: "Can I use this calculator for lawn fertilizer in the US?",
    answer:
      "Yes — the NPK Calculator tab accepts any N, P, K values and any area unit (sq ft, acre, sq meter, hectare). For US lawn fertilizer: Select 'sq ft' or 'acre', enter N/P/K needs in kg/ha (convert your lbs/1000 sqft × 100 to get kg/ha), and pick any fertilizer combination. The Unit Converter tab also helps convert between kg/ha, kg/acre, and lbs/acre.",
  },
  {
    question: "What is the NPK requirement for wheat?",
    answer:
      "Standard wheat NPK (medium fertility): 120-60-40 kg/ha (N-P₂O₅-K₂O). High-yielding varieties: 150-60-40 kg/ha. Low fertility soils: 90-60-40 kg/ha. Application: At sowing — all P+K (as DAP+MOP) + 50% N (as Urea). At first irrigation (21 DAS) — 25% N. At second irrigation (42 DAS) — 25% N. Our Crop Calculator auto-fills wheat NPK and generates the split schedule.",
  },
  {
    question: "How much fertilizer per kattha / guntha / dismil?",
    answer:
      "These are common Indian area units: 1 Kattha = 0.013378 ha (approx 1/75 acre), 1 Guntha = 0.010117 ha (1/40 acre), 1 Dismil = 0.040468 ha (1/100 acre), 1 Cent = 0.004047 ha (1/100 acre). Select your unit in the area dropdown and the calculator converts automatically. For 5 katthas of wheat needing 261 kg Urea/ha: 261 × 5 × 0.013378 = 17.5 kg Urea.",
  },
  {
    question: "How does the fertilizer cost optimizer work?",
    answer:
      "The Cost Optimizer tab compares all available fertilizer combinations side-by-side for your N, P, K requirements. You can enter current local prices (₹/kg) for each fertilizer — the calculator ranks all combinations from cheapest to most expensive for your field area. SSP route is often cheapest for sulphur-rich soils; DAP route is most popular. The cheapest option is highlighted in green.",
  },
  {
    question: "What is the fertilizer split application schedule?",
    answer:
      "Split application means dividing the total fertilizer into multiple doses applied at different crop growth stages. Example for Rice: Basal (at transplanting) — 100% P, 100% K, 50% N. Tillering (21-25 DAT) — 25% N. Panicle initiation (45-50 DAT) — 25% N. Splitting nitrogen reduces losses due to volatilization and leaching, and increases nutrient use efficiency by 15-30%. The Crop Calculator generates exact split quantities per application.",
  },
  {
    question: "Is Urea or DAP better for rice?",
    answer:
      "Both are used together. DAP provides phosphorus (P) — essential for root development and tillering in rice. Urea provides the bulk of nitrogen (N) — for vegetative growth and grain filling. The most common combination for rice is: DAP 130 kg/ha (basal) + Urea 209 kg/ha (split 3 times) + MOP 67 kg/ha (basal). DAP alone cannot supply enough N for rice.",
  },
  {
    question: "How to calculate fertilizer for 1 acre of sugarcane?",
    answer:
      "Sugarcane has high NPK requirements: 250-100-120 kg/ha (N-P₂O₅-K₂O). For 1 acre = 0.4047 ha: N = 250×0.4047 = 101 kg, P = 100×0.4047 = 40 kg, K = 120×0.4047 = 49 kg. DAP route: DAP = 40/0.46 = 87 kg, Urea = (101-87×0.18)/0.46 = 185 kg, MOP = 49/0.60 = 82 kg. Select Sugarcane in Crop Calculator with area = 1 acre for automatic calculation.",
  },
];

const programmaticPages = [
  { title: "NPK Calculator", href: "/tools/npk-calculator", desc: "Calculate exact fertilizer quantities from N, P, K requirements" },
  { title: "Urea Calculator", href: "/tools/urea-calculator", desc: "Urea dose per hectare, acre, or bigha for any crop" },
  { title: "DAP Calculator", href: "/tools/dap-calculator", desc: "DAP dose + nitrogen contribution for any crop area" },
  { title: "Crop Fertilizer Calculator", href: "/tools/crop-fertilizer-calculator", desc: "ICAR-based NPK for 25+ crops with split schedule" },
  { title: "Fertilizer per Acre", href: "/tools/fertilizer-per-acre-calculator", desc: "Convert kg/ha dose to per-acre quantities and bags" },
  { title: "Fertilizer per Hectare", href: "/tools/fertilizer-per-hectare-calculator", desc: "Calculate total fertilizer for any hectare area" },
  { title: "Fertilizer Blend Calculator", href: "/tools/fertilizer-blend-calculator", desc: "Analyze NPK from custom fertilizer blends" },
  { title: "Fertilizer Cost Calculator", href: "/tools/fertilizer-cost-calculator", desc: "Compare fertilizer options by total cost" },
];

const npkTable = [
  { crop: "Rice (Paddy)", n: "120", p: "60", k: "40", note: "ICAR recommendation, medium fertility" },
  { crop: "Wheat", n: "120", p: "60", k: "40", note: "HYV varieties; split N 3 times" },
  { crop: "Maize (Corn)", n: "150", p: "75", k: "50", note: "Hybrid varieties; 3-4 splits" },
  { crop: "Sugarcane", n: "250", p: "100", k: "120", note: "High nutrient crop; 4 splits" },
  { crop: "Cotton", n: "150", p: "75", k: "75", note: "Critical at boll formation" },
  { crop: "Potato", n: "180", p: "100", k: "120", note: "High K for tuber quality" },
  { crop: "Tomato", n: "150", p: "100", k: "100", note: "Foliar spray beneficial" },
  { crop: "Mustard", n: "100", p: "50", k: "40", note: "SSP preferred (sulphur)" },
  { crop: "Soybean", n: "30", p: "60", k: "40", note: "Fixes N; low N rate" },
  { crop: "Banana", n: "200", p: "60", k: "200", note: "High K for fruit filling" },
  { crop: "Chickpea (Chana)", n: "25", p: "50", k: "25", note: "Legume; minimal N" },
  { crop: "Groundnut", n: "25", p: "50", k: "50", note: "SSP provides Ca for peg dev." },
];

const fertilizerRef = [
  { name: "Urea", npk: "46-0-0", priceKg: "₹6.5", bags50: "46 kg N per 100 kg" },
  { name: "DAP", npk: "18-46-0", priceKg: "₹27", bags50: "46 kg P₂O₅ per 100 kg" },
  { name: "MOP", npk: "0-0-60", priceKg: "₹17", bags50: "60 kg K₂O per 100 kg" },
  { name: "SSP", npk: "0-16-0", priceKg: "₹7", bags50: "+11% S, +19% Ca" },
  { name: "10-26-26", npk: "10-26-26", priceKg: "₹28", bags50: "Complex NPK" },
  { name: "17-17-17", npk: "17-17-17", priceKg: "₹25", bags50: "Balanced complex" },
];

export default function FertilizerCalculatorPage() {
  return (
    <>
      <JsonLd data={buildToolSchema({
        name: "Fertilizer Calculator",
        description: "Free fertilizer calculator with crop-wise NPK recommendations, Urea/DAP/MOP doses, cost optimizer, blend analyzer, and Indian area units for 25+ crops.",
        url: TOOL_URL,
        category: "Agriculture",
      })} />
      <JsonLd data={buildFaqSchema(faqs)} />
      <JsonLd data={buildBreadcrumbSchema([
        { name: "Home", url: BASE_URL },
        { name: "Tools", url: `${BASE_URL}/tools` },
        { name: "Agriculture", url: `${BASE_URL}/tools?category=agriculture` },
        { name: "Fertilizer Calculator", url: TOOL_URL },
      ])} />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumb items={[
          { label: "Tools", href: "/tools" },
          { label: "Agriculture", href: "/tools?category=agriculture" },
          { label: "Fertilizer Calculator" },
        ]} />

        <div className="ad-slot my-4">Advertisement</div>

        <div className="lg:grid lg:grid-cols-[1fr_300px] lg:gap-8">
          <div className="space-y-8">
            {/* Hero */}
            <div>
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
                  <Sprout className="h-3.5 w-3.5" /> Agriculture
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                  25+ Crops
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700">
                  Indian Units
                </span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                Fertilizer Calculator
              </h1>
              <p className="mt-3 text-lg text-gray-600">
                Calculate the exact fertilizer dose for your crop, field size, and soil type.
                Supports 25+ crops (rice, wheat, sugarcane, potato, tomato, cotton and more),
                20+ fertilizers (Urea, DAP, MOP, SSP, NPK complexes), Indian area units
                (bigha, guntha, kattha, dismil), split application schedule, and cost optimizer.
              </p>
            </div>

            <FertilizerCalculator />

            <div className="ad-slot">Advertisement</div>

            {/* How to use */}
            <section className="prose prose-gray max-w-none">
              <h2 className="text-2xl font-bold text-gray-900">How to Use This Fertilizer Calculator</h2>
              <div className="not-prose grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  { step: "1", title: "NPK Calculator", body: "Enter N, P, K requirements (kg/ha) and field area. Get 4 fertilizer combinations side-by-side with cost comparison." },
                  { step: "2", title: "Crop Calculator", body: "Select your crop (rice, wheat, maize, potato...) and soil fertility. NPK is auto-filled from ICAR data. Get split application schedule." },
                  { step: "3", title: "Blend Analyzer", body: "Add any mix of fertilizers with quantities. See total N, P, K contributed and cost per hectare." },
                  { step: "4", title: "Cost Optimizer", body: "Enter current fertilizer prices in your area. Calculator ranks all combinations from cheapest to most expensive." },
                  { step: "5", title: "Unit Converter", body: "Convert area (hectare, acre, bigha, guntha, kattha) and nutrient rates (kg/ha, kg/acre, lbs/acre) instantly." },
                  { step: "✓", title: "Print / Copy", body: "Use the Copy or Print button to save your fertilizer recommendation for field use." },
                ].map(s => (
                  <div key={s.step} className="rounded-xl border border-gray-200 p-4">
                    <div className="mb-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-green-600 text-sm font-bold text-white">{s.step}</div>
                    <h3 className="font-semibold text-gray-900 mb-1">{s.title}</h3>
                    <p className="text-sm text-gray-600">{s.body}</p>
                  </div>
                ))}
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mt-10">Fertilizer Calculation Formula (NPK Method)</h2>
              <p className="text-gray-600">
                The standard method to calculate fertilizer quantity from nutrient requirements:
              </p>
              <div className="not-prose rounded-xl bg-gray-900 p-5 font-mono text-sm overflow-x-auto">
                <div className="text-gray-400 mb-2"># Step 1: Calculate DAP for Phosphorus</div>
                <div className="text-green-400">DAP (kg/ha) = P₂O₅ required (kg/ha) ÷ 0.46</div>
                <div className="text-gray-400 mt-3 mb-2"># Step 2: N contributed by DAP</div>
                <div className="text-green-400">N from DAP = DAP qty × 0.18</div>
                <div className="text-gray-400 mt-3 mb-2"># Step 3: Calculate Urea for remaining N</div>
                <div className="text-green-400">Urea (kg/ha) = (N required – N from DAP) ÷ 0.46</div>
                <div className="text-gray-400 mt-3 mb-2"># Step 4: Calculate MOP for Potassium</div>
                <div className="text-green-400">MOP (kg/ha) = K₂O required (kg/ha) ÷ 0.60</div>
                <div className="text-gray-400 mt-4 mb-2"># Example: Rice 120-60-40 N-P-K per ha</div>
                <div className="text-yellow-400">DAP = 60/0.46 = 130 kg/ha</div>
                <div className="text-yellow-400">N from DAP = 130×0.18 = 23.4 kg/ha</div>
                <div className="text-yellow-400">Urea = (120-23.4)/0.46 = 210 kg/ha</div>
                <div className="text-yellow-400">MOP = 40/0.60 = 67 kg/ha</div>
                <div className="text-blue-400 mt-2">Total: 130 DAP + 210 Urea + 67 MOP = 407 kg/ha</div>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mt-10">ICAR-Recommended NPK Doses for Major Crops</h2>
              <p className="text-gray-600">
                Standard fertilizer recommendations from the Indian Council of Agricultural Research (ICAR)
                for medium fertility soils. Adjust up by 20-25% for low fertility soils and down by 15-20%
                for high fertility or soil test-based recommendations.
              </p>
              <div className="not-prose overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-green-50 text-left">
                      <th className="border border-gray-200 px-4 py-2.5 font-semibold text-gray-900">Crop</th>
                      <th className="border border-gray-200 px-4 py-2.5 font-semibold text-blue-700">N (kg/ha)</th>
                      <th className="border border-gray-200 px-4 py-2.5 font-semibold text-orange-700">P₂O₅ (kg/ha)</th>
                      <th className="border border-gray-200 px-4 py-2.5 font-semibold text-purple-700">K₂O (kg/ha)</th>
                      <th className="border border-gray-200 px-4 py-2.5 font-semibold text-gray-600 hidden sm:table-cell">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {npkTable.map(row => (
                      <tr key={row.crop} className="hover:bg-gray-50 border-b border-gray-100">
                        <td className="border-l border-r border-gray-200 px-4 py-2.5 font-medium text-gray-900">{row.crop}</td>
                        <td className="border-r border-gray-200 px-4 py-2.5 text-blue-700 font-semibold">{row.n}</td>
                        <td className="border-r border-gray-200 px-4 py-2.5 text-orange-700 font-semibold">{row.p}</td>
                        <td className="border-r border-gray-200 px-4 py-2.5 text-purple-700 font-semibold">{row.k}</td>
                        <td className="border-r border-gray-200 px-4 py-2.5 text-gray-500 text-xs hidden sm:table-cell">{row.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mt-10">Common Fertilizer NPK Reference</h2>
              <div className="not-prose overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-gray-50 text-left">
                      <th className="border border-gray-200 px-4 py-2 font-semibold">Fertilizer</th>
                      <th className="border border-gray-200 px-4 py-2 font-semibold">N-P-K (%)</th>
                      <th className="border border-gray-200 px-4 py-2 font-semibold">Price (approx)</th>
                      <th className="border border-gray-200 px-4 py-2 font-semibold">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {fertilizerRef.map(f => (
                      <tr key={f.name} className="hover:bg-gray-50">
                        <td className="border border-gray-200 px-4 py-2 font-semibold text-gray-900">{f.name}</td>
                        <td className="border border-gray-200 px-4 py-2 font-mono text-green-700">{f.npk}</td>
                        <td className="border border-gray-200 px-4 py-2 text-gray-700">{f.priceKg}/kg</td>
                        <td className="border border-gray-200 px-4 py-2 text-gray-500 text-xs">{f.bags50}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="not-prose mt-4 rounded-lg bg-amber-50 border border-amber-200 p-4 flex gap-3">
                <Info className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="text-sm text-amber-800">
                  <strong>Pro Tip:</strong> Always conduct a soil test before applying fertilizer.
                  Krishi Vigyan Kendras (KVKs) and State Agriculture Departments provide soil testing
                  at nominal cost (₹100–₹300). A soil test reduces over-application and saves ₹2,000–₹5,000
                  per hectare per season.
                </div>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mt-10">Indian Area Unit Conversion Guide</h2>
              <p className="text-gray-600">
                Fertilizer recommendations are published per hectare, but farmers in India commonly
                measure land in local units. Our calculator supports all regional variants:
              </p>
              <div className="not-prose overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-gray-50 text-left">
                      <th className="border border-gray-200 px-3 py-2 font-semibold">Unit</th>
                      <th className="border border-gray-200 px-3 py-2 font-semibold">Region</th>
                      <th className="border border-gray-200 px-3 py-2 font-semibold">= Hectares</th>
                      <th className="border border-gray-200 px-3 py-2 font-semibold">= Acres</th>
                      <th className="border border-gray-200 px-3 py-2 font-semibold">Urea for Rice (120N)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { unit: "1 Bigha", region: "UP / Rajasthan", ha: "0.2529", acre: "0.625", urea: "55 kg" },
                      { unit: "1 Bigha", region: "MP / CG", ha: "0.3307", acre: "0.817", urea: "71 kg" },
                      { unit: "1 Bigha", region: "West Bengal", ha: "0.1338", acre: "0.330", urea: "29 kg" },
                      { unit: "1 Guntha", region: "Maharashtra", ha: "0.0101", acre: "0.025", urea: "2.2 kg" },
                      { unit: "1 Kattha", region: "Bihar / UP", ha: "0.0134", acre: "0.033", urea: "2.9 kg" },
                      { unit: "1 Dismil", region: "Bihar / WB", ha: "0.0405", acre: "0.100", urea: "8.7 kg" },
                      { unit: "1 Cent", region: "South India", ha: "0.0040", acre: "0.010", urea: "0.9 kg" },
                      { unit: "1 Acre", region: "All India", ha: "0.4047", acre: "1.000", urea: "87 kg" },
                    ].map(r => (
                      <tr key={r.unit + r.region} className="hover:bg-gray-50 border-b border-gray-100">
                        <td className="border-l border-r border-gray-200 px-3 py-2 font-semibold text-gray-900">{r.unit}</td>
                        <td className="border-r border-gray-200 px-3 py-2 text-gray-600">{r.region}</td>
                        <td className="border-r border-gray-200 px-3 py-2 text-green-700">{r.ha}</td>
                        <td className="border-r border-gray-200 px-3 py-2 text-blue-700">{r.acre}</td>
                        <td className="border-r border-gray-200 px-3 py-2 text-gray-700">{r.urea}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* FAQ */}
            <section>
              <h2 className="mb-6 text-2xl font-bold text-gray-900">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {faqs.map((faq, i) => (
                  <div key={i} className="card p-5">
                    <h3 className="font-semibold text-gray-900">{faq.question}</h3>
                    <p className="mt-2 text-sm text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Programmatic SEO links */}
            <section className="card p-6">
              <h2 className="mb-4 text-lg font-semibold text-gray-900">Specialized Fertilizer Calculators</h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {programmaticPages.map(p => (
                  <Link key={p.href} href={p.href} className="group flex items-start gap-3 rounded-lg border border-gray-200 p-3 hover:border-green-300 hover:bg-green-50 transition-colors">
                    <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-green-500 group-hover:translate-x-0.5 transition-transform" />
                    <div>
                      <div className="text-sm font-semibold text-gray-900 group-hover:text-green-700">{p.title}</div>
                      <div className="text-xs text-gray-500">{p.desc}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            <div className="ad-slot">Advertisement</div>
          </div>

          {/* Sidebar */}
          <aside className="mt-8 space-y-6 lg:mt-0">
            <div className="ad-slot h-[250px]">Advertisement</div>

            <div className="card p-5">
              <h3 className="mb-4 font-semibold text-gray-900">Quick NPK Reference</h3>
              <div className="space-y-2">
                {[
                  { crop: "Rice", npk: "120-60-40" },
                  { crop: "Wheat", npk: "120-60-40" },
                  { crop: "Maize", npk: "150-75-50" },
                  { crop: "Sugarcane", npk: "250-100-120" },
                  { crop: "Cotton", npk: "150-75-75" },
                  { crop: "Potato", npk: "180-100-120" },
                  { crop: "Soybean", npk: "30-60-40" },
                ].map(c => (
                  <div key={c.crop} className="flex items-center justify-between text-sm">
                    <span className="text-gray-700 font-medium">{c.crop}</span>
                    <span className="font-mono text-xs bg-gray-100 px-2 py-0.5 rounded text-gray-900">{c.npk}</span>
                  </div>
                ))}
                <p className="text-xs text-gray-400 pt-1">N-P₂O₅-K₂O in kg/ha (medium soil)</p>
              </div>
            </div>

            <div className="card p-5">
              <h3 className="mb-4 font-semibold text-gray-900">Fertilizer Prices (India 2024)</h3>
              <div className="space-y-2">
                {[
                  { name: "Urea (45 kg bag)", price: "₹266.50" },
                  { name: "DAP (50 kg bag)", price: "₹1,350" },
                  { name: "MOP (50 kg bag)", price: "₹850" },
                  { name: "SSP (50 kg bag)", price: "₹350" },
                  { name: "10-26-26 (50 kg)", price: "₹1,400" },
                  { name: "17-17-17 (50 kg)", price: "₹1,250" },
                ].map(f => (
                  <div key={f.name} className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">{f.name}</span>
                    <span className="font-semibold text-gray-900">{f.price}</span>
                  </div>
                ))}
                <p className="text-xs text-gray-400 pt-1">MRP as per GoI. Market prices may vary.</p>
              </div>
            </div>

            <div className="card p-5">
              <h3 className="mb-3 font-semibold text-gray-900">Area Conversions</h3>
              <div className="space-y-1.5 text-xs text-gray-600">
                {[
                  "1 ha = 2.471 acres",
                  "1 acre = 0.4047 ha",
                  "1 Bigha (UP) = 0.2529 ha",
                  "1 Bigha (MP) = 0.3307 ha",
                  "1 Guntha = 0.0101 ha",
                  "1 Kattha = 0.0134 ha",
                  "1 Dismil = 0.0405 ha",
                  "1 Cent = 0.00405 ha",
                ].map(s => <div key={s} className="flex gap-2"><span className="text-green-500 shrink-0">•</span>{s}</div>)}
              </div>
            </div>

            <div className="ad-slot h-[250px]">Advertisement</div>
          </aside>
        </div>
      </div>
    </>
  );
}
