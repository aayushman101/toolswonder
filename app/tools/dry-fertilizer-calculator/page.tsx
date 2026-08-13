import type { Metadata } from "next";
import Link from "next/link";
import DryFertilizerCalculator from "@/components/tools/DryFertilizerCalculator";
import JsonLd, { buildToolSchema, buildFaqSchema, buildBreadcrumbSchema } from "@/components/seo/JsonLd";
import Breadcrumb from "@/components/layout/Breadcrumb";
import { ChevronRight } from "lucide-react";

const BASE_URL = "https://toolswonder.com";
const TOOL_URL = `${BASE_URL}/tools/dry-fertilizer-calculator`;

export const metadata: Metadata = {
  title: "Dry Fertilizer Calculator – Granular Fertilizer Per Square Foot & Acre",
  description:
    "Free dry / granular fertilizer calculator. Enter area and NPK to get exact lbs, kg, bags needed, and cost. Supports 10-10-10, 46-0-0 Urea, DAP, MOP, TSP and more. US and metric units.",
  keywords: [
    "dry fertilizer calculator",
    "granular fertilizer calculator",
    "fertilizer calculator per square foot",
    "how much fertilizer per 1000 sq ft",
    "fertilizer calculator lbs per acre",
    "10-10-10 fertilizer calculator",
    "urea fertilizer calculator",
    "dap fertilizer calculator per acre",
    "how much granular fertilizer do i need",
    "fertilizer spreader calculator",
  ],
  alternates: { canonical: TOOL_URL },
  openGraph: {
    title: "Dry Fertilizer Calculator – Lbs, Bags & Cost | ToolsWonder",
    description: "Calculate granular fertilizer quantity in lbs/kg, bags needed, and cost. 12 presets + custom NPK. Free.",
    url: TOOL_URL,
    type: "website",
  },
};

const faqs = [
  {
    question: "How much granular fertilizer per 1,000 square feet?",
    answer: "Product per 1,000 sq ft = N rate ÷ (N% ÷ 100). For 10-10-10 (10% N) at 1 lb N: 1 ÷ 0.10 = 10 lbs/1,000 sq ft. For 46-0-0 Urea (46% N) at 1 lb N: 1 ÷ 0.46 = 2.17 lbs/1,000 sq ft. The lower the N%, the more product needed. Our calculator handles any NPK ratio and shows lbs and kg results.",
  },
  {
    question: "How much 10-10-10 fertilizer per 1,000 square feet?",
    answer: "At 1 lb N per 1,000 sq ft: 10 lbs of 10-10-10 per 1,000 sq ft (since N% = 10%). This also delivers 10 lbs P and 10 lbs K per 1,000 sq ft simultaneously. For a 5,000 sq ft lawn: 10 × 5 = 50 lbs total. A 40 lb bag covers 4,000 sq ft. You'd need 2 bags (80 lbs) to cover 5,000 sq ft at 1 lb N rate.",
  },
  {
    question: "How do I calculate dry fertilizer for an acre?",
    answer: "1 acre = 43,560 sq ft = 43.56 units of 1,000 sq ft. At 1 lb N per 1,000 sq ft with 10-10-10: 10 lbs/1,000 sqft × 43.56 = 435.6 lbs/acre. With 46-0-0 Urea: 2.17 × 43.56 = 94.5 lbs/acre. At the typical row-crop rate of 0.5 lb N/1,000 sqft: 217 lbs/acre of 10-10-10. Select 'Acre' in the area unit dropdown for direct calculation.",
  },
  {
    question: "What is the difference between 10-10-10, 12-12-12, and 16-4-8 fertilizer?",
    answer: "10-10-10 and 12-12-12 are balanced all-purpose fertilizers — equal parts N, P, and K. Good for establishing new lawns or vegetable gardens. 16-4-8 has high N, low P, moderate K — better for established lawns that already have sufficient phosphorus (most do after a few years). Use 12-12-12 when starting a new lawn or garden bed; switch to 16-4-8 or 30-0-10 for maintenance.",
  },
  {
    question: "How much Urea (46-0-0) fertilizer per acre?",
    answer: "Urea (46-0-0) is the most concentrated dry N fertilizer at 46% N. At 100 lbs N/acre (typical corn application): 100 ÷ 0.46 = 217 lbs Urea/acre. At 50 lbs N/acre (lawn application): 108.7 lbs Urea/acre. In kg/ha: 100 kg N/ha = 217 kg Urea/ha. Switch to 'kg/ha' rate unit in the calculator for metric calculations.",
  },
  {
    question: "What is the fertilizer spreader setting for granular fertilizer?",
    answer: "Spreader settings vary by brand (Scotts, Earthway, Agri-Fab). Always check the fertilizer bag for brand-specific settings. As a starting point: a standard broadcast spreader at setting 4-5 (out of 10) typically delivers 3-5 lbs/1,000 sq ft. Use the calculator to get your target application rate in lbs/1,000 sq ft, then calibrate your spreader by weighing product caught over a measured area.",
  },
  {
    question: "How do I convert fertilizer rate from kg/ha to lbs per 1,000 sq ft?",
    answer: "Formula: lbs/1,000 sqft = kg/ha × 0.009178. Example: 100 kg N/ha = 100 × 0.009178 = 0.92 lbs N per 1,000 sq ft. Reverse: kg/ha = lbs/1,000 sqft × 108.9. Our calculator has a built-in rate unit toggle — switch between lbs/1,000 sqft and kg/ha and it converts automatically.",
  },
  {
    question: "How much DAP (18-46-0) fertilizer per acre?",
    answer: "DAP (18-46-0) is a common starter fertilizer with high phosphorus. At a typical P rate of 40 lbs P₂O₅ per acre: Product = 40 ÷ 0.46 = 86.9 lbs DAP/acre. This also delivers 86.9 × 0.18 = 15.6 lbs N/acre as a bonus. For a balanced crop program, supplement remaining N with Urea. The calculator lets you set P as the primary nutrient to calculate DAP quantity.",
  },
];

export default function DryFertilizerCalculatorPage() {
  return (
    <>
      <JsonLd data={buildToolSchema({ name: "Dry Fertilizer Calculator", description: "Calculate granular fertilizer quantity in lbs and kg, bags needed, and total cost. Supports US and metric units with 12 common fertilizer presets.", url: TOOL_URL, category: "Agriculture" })} />
      <JsonLd data={buildFaqSchema(faqs)} />
      <JsonLd data={buildBreadcrumbSchema([
        { name: "Home", url: BASE_URL },
        { name: "Tools", url: `${BASE_URL}/tools` },
        { name: "Fertilizer Calculator", url: `${BASE_URL}/tools/fertilizer-calculator` },
        { name: "Dry Fertilizer Calculator", url: TOOL_URL },
      ])} />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumb items={[
          { label: "Tools", href: "/tools" },
          { label: "Fertilizer Calculator", href: "/tools/fertilizer-calculator" },
          { label: "Dry Fertilizer Calculator" },
        ]} />

        <div className="ad-slot my-4">Advertisement</div>

        <div className="lg:grid lg:grid-cols-[1fr_280px] lg:gap-8">
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">Dry / Granular Fertilizer Calculator</h1>
              <p className="mt-3 text-lg text-gray-600">
                Calculate exactly how much granular fertilizer you need. Enter your area (sq ft to hectare),
                select a fertilizer (10-10-10, Urea, DAP, MOP, SSP, or custom NPK), and set your
                target nutrient rate. Get results in lbs and kg, bags to buy, and total cost.
              </p>
            </div>

            <DryFertilizerCalculator />

            <div className="ad-slot">Advertisement</div>

            <section className="prose prose-gray max-w-none">
              <h2 className="text-2xl font-bold text-gray-900">Granular Fertilizer Application Rates</h2>
              <div className="not-prose overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-amber-50 text-left">
                      <th className="border border-gray-200 px-4 py-2.5 font-semibold">Fertilizer</th>
                      <th className="border border-gray-200 px-4 py-2.5 font-semibold">N-P-K</th>
                      <th className="border border-gray-200 px-4 py-2.5 font-semibold">Primary Use</th>
                      <th className="border border-gray-200 px-4 py-2.5 font-semibold">Lbs/1,000 sqft (1 lb N)</th>
                      <th className="border border-gray-200 px-4 py-2.5 font-semibold">Lbs/Acre (1 lb N)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { name: "46-0-0 Urea", npk: "46-0-0", use: "Pure N source", per1k: 2.17, perAcre: 94.5 },
                      { name: "21-0-0 Amm. Sulfate", npk: "21-0-0", use: "Acidifying N", per1k: 4.76, perAcre: 207.4 },
                      { name: "18-46-0 DAP", npk: "18-46-0", use: "Starter / High P", per1k: 5.56, perAcre: 242.0 },
                      { name: "0-46-0 TSP", npk: "0-46-0", use: "Pure P source", per1k: "—", perAcre: "—" },
                      { name: "0-0-60 MOP", npk: "0-0-60", use: "Pure K source", per1k: "—", perAcre: "—" },
                      { name: "10-10-10 All Purpose", npk: "10-10-10", use: "Balanced garden", per1k: 10.0, perAcre: 435.6 },
                      { name: "12-12-12 Starter", npk: "12-12-12", use: "New lawns/beds", per1k: 8.33, perAcre: 362.9 },
                      { name: "16-4-8 Lawn", npk: "16-4-8", use: "Established lawn", per1k: 6.25, perAcre: 272.3 },
                    ].map(r => (
                      <tr key={r.name} className="hover:bg-gray-50 border-b border-gray-100">
                        <td className="border-l border-r border-gray-200 px-4 py-2.5 font-medium">{r.name}</td>
                        <td className="border-r border-gray-200 px-4 py-2.5 text-amber-700 font-semibold">{r.npk}</td>
                        <td className="border-r border-gray-200 px-4 py-2.5 text-gray-500">{r.use}</td>
                        <td className="border-r border-gray-200 px-4 py-2.5">{typeof r.per1k === "number" ? `${r.per1k} lbs` : r.per1k}</td>
                        <td className="border-r border-gray-200 px-4 py-2.5">{typeof r.perAcre === "number" ? `${r.perAcre} lbs` : r.perAcre}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-gray-400 mt-2">Rates at 1 lb N per 1,000 sq ft (109 kg N/ha). TSP and MOP rates depend on P/K target, not N.</p>

              <h2 className="text-2xl font-bold text-gray-900 mt-10">Unit Conversion Reference</h2>
              <div className="not-prose rounded-xl bg-gray-900 p-5 font-mono text-sm overflow-x-auto">
                <div className="text-gray-400 mb-1"># Rate conversions</div>
                <div className="text-green-400">1 lb/1,000 sqft  =  108.9 kg/ha</div>
                <div className="text-green-400">1 kg/ha          =  0.00918 lbs/1,000 sqft</div>
                <div className="text-gray-400 mt-3 mb-1"># Area conversions</div>
                <div className="text-blue-400">1 acre  =  43,560 sq ft  =  0.4047 ha</div>
                <div className="text-blue-400">1 ha    =  10,000 m²    =  107,639 sq ft</div>
                <div className="text-gray-400 mt-3 mb-1"># Weight conversions</div>
                <div className="text-yellow-400">1 lb  =  0.4536 kg</div>
                <div className="text-yellow-400">1 kg  =  2.2046 lbs</div>
              </div>
            </section>

            <section>
              <h2 className="mb-6 text-2xl font-bold text-gray-900">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {faqs.map((f, i) => (
                  <div key={i} className="card p-5">
                    <h3 className="font-semibold text-gray-900">{f.question}</h3>
                    <p className="mt-2 text-sm text-gray-600 leading-relaxed">{f.answer}</p>
                  </div>
                ))}
              </div>
            </section>

            <div className="ad-slot">Advertisement</div>
          </div>

          <aside className="mt-8 space-y-5 lg:mt-0">
            <div className="ad-slot h-[250px]">Advertisement</div>
            <div className="card p-5">
              <h3 className="mb-3 font-semibold text-gray-900">Quick Formula</h3>
              <div className="space-y-3 text-xs font-mono">
                <div className="rounded bg-gray-50 p-3">
                  <div className="text-gray-500 mb-1">Rate (lbs/1k sqft):</div>
                  <div className="text-gray-900 font-semibold">N target ÷ (N% ÷ 100)</div>
                </div>
                <div className="rounded bg-gray-50 p-3">
                  <div className="text-gray-500 mb-1">Total lbs:</div>
                  <div className="text-gray-900 font-semibold">Rate × (Sqft ÷ 1000)</div>
                </div>
                <div className="rounded bg-gray-50 p-3">
                  <div className="text-gray-500 mb-1">Bags needed:</div>
                  <div className="text-gray-900 font-semibold">⌈Total ÷ Bag weight⌉</div>
                </div>
              </div>
            </div>
            <div className="card p-5">
              <h3 className="mb-3 font-semibold text-gray-900">Related Tools</h3>
              <ul className="space-y-2 text-sm">
                {[
                  { title: "Lawn Fertilizer Calculator", href: "/tools/lawn-fertilizer-calculator" },
                  { title: "Liquid Fertilizer Calculator", href: "/tools/liquid-fertilizer-calculator" },
                  { title: "Fertilizer per Acre", href: "/tools/fertilizer-per-acre-calculator" },
                  { title: "NPK Calculator", href: "/tools/npk-calculator" },
                  { title: "Full Fertilizer Calculator", href: "/tools/fertilizer-calculator" },
                ].map(t => (
                  <li key={t.href}>
                    <Link href={t.href} className="flex items-center gap-1.5 text-amber-700 hover:text-amber-900">
                      <ChevronRight className="h-3.5 w-3.5" /> {t.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="ad-slot h-[250px]">Advertisement</div>
          </aside>
        </div>
      </div>
    </>
  );
}
