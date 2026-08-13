import type { Metadata } from "next";
import DripIrrigationCalculator from "@/components/tools/DripIrrigationCalculator";
import JsonLd, { buildToolSchema, buildFaqSchema, buildBreadcrumbSchema } from "@/components/seo/JsonLd";
import Breadcrumb from "@/components/layout/Breadcrumb";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

const BASE_URL = "https://toolswonder.com";
const TOOL_URL = `${BASE_URL}/tools/drip-irrigation-calculator`;

export const metadata: Metadata = {
  title: "Drip Irrigation Calculator – Water Requirement & Dripper Count",
  description: "Free drip irrigation calculator for farmers. Calculate daily water requirement, number of drippers, irrigation duration, and lateral pipe length for any crop. Supports acres, hectares, and bigha. India-specific crops included.",
  keywords: [
    "drip irrigation calculator",
    "drip irrigation calculator india",
    "drip irrigation calculator square feet",
    "drip irrigation flow rate calculator",
    "drip irrigation water requirement calculator",
    "number of drippers calculator",
    "drip irrigation system design",
    "micro irrigation calculator",
    "subsurface drip irrigation calculator",
    "irrigation water requirement calculator",
  ],
  alternates: { canonical: TOOL_URL },
  openGraph: {
    title: "Drip Irrigation Calculator – Water Requirement & Dripper Count",
    description: "Calculate drip irrigation water requirement, dripper count, flow rate, and irrigation duration for any crop and area size.",
    url: TOOL_URL,
    type: "website",
  },
};

const faqs = [
  {
    question: "How do I calculate the water requirement for drip irrigation?",
    answer: "Water Requirement (L/day) = Area (m²) × Crop ET (mm/day) ÷ Irrigation Efficiency. Crop ET = ETo (reference ET) × Kc (crop coefficient). For example, tomato in summer: ET ≈ 5 mm/day, 1 acre (4047 m²) field, 90% efficiency → 4047 × 5 ÷ 0.90 = 22,483 L/day (22.5 m³/day). Our calculator uses FAO-56 Kc values and seasonal adjustments for accurate results.",
  },
  {
    question: "How many drippers do I need per acre?",
    answer: "It depends on plant spacing. For tomato (row 1.5m × plant 0.6m): Plants per acre = 4047 ÷ (1.5 × 0.6) = 4,497 plants. At 2 drippers/plant = 8,994 drippers/acre. For wider-spaced crops like mango (5m × 5m): 4047 ÷ 25 = 162 plants × 2 drippers = 324 drippers/acre. Use our calculator — enter your crop, spacing, and area to get the exact count.",
  },
  {
    question: "What is the ideal dripper flow rate for vegetables?",
    answer: "For vegetables (tomato, chilli, onion) with 0.6–1.0m plant spacing: use 2–4 LPH drippers. For fruit orchards (mango, citrus) with 4–6m spacing and deep-rooted plants: use 4–8 LPH drippers. For sandy soils, use lower flow rates and longer durations to prevent runoff. For clay soils, use lower flow rates to prevent waterlogging. 4 LPH is the most commonly used dripper in India.",
  },
  {
    question: "How long should I run drip irrigation per day?",
    answer: "Irrigation Duration = Daily Water Requirement (L) ÷ Total Flow Rate (LPH). Example: 10,000 L/day needed, 5000 LPH total flow → 2 hours irrigation. In summer, vegetables may need 1.5–3 hours/day. In winter, 0.5–1.5 hours/day. In monsoon season, skip irrigation when rainfall exceeds crop ET. Split into 2 sessions (morning + evening) for better uptake.",
  },
  {
    question: "How much water does drip irrigation save compared to flood irrigation?",
    answer: "Flood irrigation efficiency is 40–50%. Drip irrigation efficiency is 85–95%. Water savings = 40–50% compared to flood/furrow irrigation. For 1 acre of tomato in summer: flood may use 50,000 L/day vs drip using ~22,500 L/day — saving 27,500 L (55%) daily. Over a 120-day crop season: 3,300,000 L (3,300 m³) of water saved per acre.",
  },
  {
    question: "What is the drip irrigation calculation formula?",
    answer: "Key formulas: (1) Plants/acre = 43,560 ÷ (row spacing ft × plant spacing ft). (2) Drippers = Plants × drippers per plant. (3) Water req. (L/day) = Area (m²) × ET (mm/day) ÷ efficiency. (4) Irrigation time (hrs) = Water req. (L) ÷ Total flow (LPH). (5) Lateral length (m) = Area (m²) ÷ row spacing (m). (6) Water saved = [(Flood water - Drip water) ÷ Flood water] × 100%.",
  },
  {
    question: "What is a good drip irrigation schedule for tomatoes in India?",
    answer: "Tomato (1.5m × 0.6m spacing, 1 acre): ~4,500 plants, 2 drippers/plant at 4 LPH = 36,000 LPH total flow. Summer water need: ~22,500 L/day. Irrigation time: 22,500 ÷ 36,000 = 0.625 hrs = 37 minutes/day. Run 6:00–6:37 AM. Winter: ~15,000 L/day → 25 minutes/day. Fertilizer (fertigation) can be applied through the drip system during irrigation.",
  },
];

export default function DripIrrigationCalculatorPage() {
  return (
    <>
      <JsonLd data={buildToolSchema({ name: "Drip Irrigation Calculator", description: "Calculate drip irrigation water requirement, number of drippers, flow rate, and irrigation duration for any crop and field size.", url: TOOL_URL, category: "Agriculture" })} />
      <JsonLd data={buildFaqSchema(faqs)} />
      <JsonLd data={buildBreadcrumbSchema([{ name: "Home", url: BASE_URL }, { name: "Tools", url: `${BASE_URL}/tools` }, { name: "Agriculture", url: `${BASE_URL}/tools#agriculture` }, { name: "Drip Irrigation Calculator", url: TOOL_URL }])} />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: "Tools", href: "/tools" }, { label: "Drip Irrigation Calculator" }]} />
        <div className="ad-slot my-4">Advertisement</div>

        <div className="lg:grid lg:grid-cols-[1fr_280px] lg:gap-8">
          <div className="space-y-8">
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 sm:text-4xl">
                  Drip Irrigation Calculator
                </h1>
                <span className="rounded-full bg-green-100 dark:bg-green-900 px-3 py-1 text-xs font-semibold text-green-800 dark:text-green-200">
                  Agriculture
                </span>
              </div>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Calculate daily water requirement, number of drippers, total flow rate, and irrigation duration for your field. Enter crop type, area or plant count, and spacing — get a complete drip system design estimate instantly. Supports acres, hectares, and bigha with 18 crops.
              </p>
            </div>

            <DripIrrigationCalculator />

            <div className="ad-slot">Advertisement</div>

            {/* Crop water reference table */}
            <section>
              <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">
                Crop Water Requirement Reference (India)
              </h2>
              <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-300">Crop</th>
                      <th className="px-4 py-3 text-center font-semibold text-gray-700 dark:text-gray-300">ET (mm/day)</th>
                      <th className="px-4 py-3 text-center font-semibold text-gray-700 dark:text-gray-300">Typical Spacing</th>
                      <th className="px-4 py-3 text-center font-semibold text-gray-700 dark:text-gray-300">Drippers/Plant</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                    {[
                      ["Tomato",        "4.5–6.0", "1.5m × 0.6m", "2"],
                      ["Chilli",        "3.5–5.0", "1.5m × 0.45m","2"],
                      ["Onion",         "3.0–4.5", "0.3m × 0.15m","1–2 (inline)"],
                      ["Sugarcane",     "5.0–8.0", "0.9m row",    "Inline drip"],
                      ["Banana",        "6.0–8.0", "1.8m × 1.5m", "3–4"],
                      ["Grapes",        "3.5–5.5", "3m × 1.5m",   "2–4"],
                      ["Cotton",        "4.5–6.5", "0.9m × 0.6m", "2"],
                      ["Mango / Citrus","5.0–7.0", "6m × 6m",     "4–8"],
                      ["Pomegranate",   "4.0–6.0", "5m × 3m",     "4"],
                      ["Cucumber",      "4.0–6.0", "1.5m × 0.6m", "1–2"],
                    ].map(([crop, et, spacing, drip]) => (
                      <tr key={crop} className="even:bg-gray-50/50 dark:even:bg-gray-800/30">
                        <td className="px-4 py-2.5 font-medium text-gray-800 dark:text-gray-200">{crop}</td>
                        <td className="px-4 py-2.5 text-center text-gray-600 dark:text-gray-400">{et}</td>
                        <td className="px-4 py-2.5 text-center text-gray-600 dark:text-gray-400">{spacing}</td>
                        <td className="px-4 py-2.5 text-center text-gray-600 dark:text-gray-400">{drip}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Dripper flow rate guide */}
            <section>
              <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">
                Dripper Flow Rate Selection Guide
              </h2>
              <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-300">Flow Rate</th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-300">Best For</th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-300">Soil Type</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                    {[
                      ["1–2 LPH", "Closely spaced crops (onion, garlic), sandy soils", "Sandy / Light"],
                      ["4 LPH",   "Most vegetables (tomato, chilli, cucumber), most common in India", "Loamy / Medium"],
                      ["8 LPH",   "Orchards (mango, citrus), widely spaced crops", "Clay / Heavy"],
                      ["12–16 LPH","Large trees, deep-rooted plants, high-demand crops", "Clay / Sandy loam"],
                    ].map(([rate, use, soil]) => (
                      <tr key={rate} className="even:bg-gray-50/50 dark:even:bg-gray-800/30">
                        <td className="px-4 py-2.5 font-semibold text-green-700 dark:text-green-400">{rate}</td>
                        <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400">{use}</td>
                        <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400">{soil}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* FAQ */}
            <section>
              <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-gray-100">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {faqs.map((f, i) => (
                  <div key={i} className="card p-5">
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100">{f.question}</h3>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{f.answer}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="mt-8 space-y-5 lg:mt-0">
            <div className="ad-slot h-[250px]">Advertisement</div>

            <div className="card p-5">
              <h3 className="mb-3 font-semibold text-gray-900 dark:text-gray-100">Quick Reference</h3>
              <div className="space-y-2 text-xs">
                {[
                  ["1 acre", "4,047 m²"],
                  ["1 hectare", "10,000 m²"],
                  ["1 bigha (India)", "~2,529 m²"],
                  ["Drip efficiency", "85–95%"],
                  ["Flood efficiency", "40–50%"],
                  ["Water saved by drip", "40–50%"],
                  ["1 mm ET = ", "1 L/m²/day"],
                ].map(([item, val]) => (
                  <div key={item} className="flex justify-between gap-2">
                    <span className="text-gray-500 dark:text-gray-400">{item}</span>
                    <span className="font-semibold text-green-700 dark:text-green-400 text-right">{val}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="card p-5">
              <h3 className="mb-3 font-semibold text-gray-900 dark:text-gray-100">Related Tools</h3>
              <div className="space-y-2">
                {[
                  { href: "/tools/fertilizer-calculator", label: "Fertilizer Calculator" },
                  { href: "/tools/crop-fertilizer-calculator", label: "Crop Fertilizer Calculator" },
                  { href: "/tools/fertilizer-per-acre-calculator", label: "Fertilizer per Acre" },
                  { href: "/tools/goat-farm-profit-calculator", label: "Goat Farm Calculator" },
                ].map((t) => (
                  <Link
                    key={t.href}
                    href={t.href}
                    className="flex items-center justify-between rounded-lg p-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    {t.label}
                    <ChevronRight className="h-4 w-4 text-gray-400" />
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
