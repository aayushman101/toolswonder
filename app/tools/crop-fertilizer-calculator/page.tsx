import type { Metadata } from "next";
import Link from "next/link";
import FertilizerCalculator from "@/components/tools/FertilizerCalculator";
import JsonLd, { buildToolSchema, buildFaqSchema, buildBreadcrumbSchema } from "@/components/seo/JsonLd";
import Breadcrumb from "@/components/layout/Breadcrumb";
import { ChevronRight } from "lucide-react";

const BASE_URL = "https://toolswonder.com";
const TOOL_URL = `${BASE_URL}/tools/crop-fertilizer-calculator`;

export const metadata: Metadata = {
  title: "Crop Fertilizer Calculator – ICAR NPK for Rice, Wheat, Maize & 25+ Crops",
  description:
    "Crop-specific fertilizer calculator with ICAR-recommended NPK doses for 25+ crops (rice, wheat, maize, sugarcane, cotton, potato, tomato, banana). Get split application schedule, Urea+DAP+MOP quantities, and cost estimate.",
  keywords: [
    "crop fertilizer calculator",
    "crop specific fertilizer calculator",
    "rice fertilizer calculator",
    "wheat fertilizer calculator",
    "maize fertilizer calculator",
    "sugarcane fertilizer calculator",
    "potato fertilizer calculator",
    "fertilizer dose for crops India",
    "icar fertilizer recommendation",
    "fertilizer schedule for crops",
  ],
  alternates: { canonical: TOOL_URL },
  openGraph: {
    title: "Crop Fertilizer Calculator – ICAR NPK for 25+ Crops | ToolsWonder",
    description: "ICAR-based fertilizer doses for rice, wheat, maize, sugarcane, cotton, potato, and 20+ more crops with split application schedule.",
    url: TOOL_URL,
    type: "website",
  },
};

const faqs = [
  {
    question: "How do I calculate fertilizer for a specific crop?",
    answer: "Select your crop from the dropdown in the Crop Recommendation tab. The calculator auto-fills ICAR-recommended N, P₂O₅, and K₂O values for medium soil fertility. Enter your field area in any unit (hectare, acre, bigha, guntha). You get exact Urea, DAP, MOP quantities in kg and bags, plus a split application schedule showing what to apply at each crop growth stage.",
  },
  {
    question: "What is the fertilizer recommendation for rice per hectare?",
    answer: "ICAR recommendation for paddy rice under medium soil fertility: 120 kg N + 60 kg P₂O₅ + 40 kg K₂O per hectare. Translates to: DAP 130 kg/ha (basal) + Urea 210 kg/ha (3 splits: 50% at transplanting, 25% at tillering, 25% at panicle initiation) + MOP 67 kg/ha (basal). For high-yielding varieties or transplanted irrigated rice, doses may increase to 150-60-40.",
  },
  {
    question: "What fertilizer is recommended for wheat?",
    answer: "Wheat (HYV varieties, irrigated): 120-60-40 kg/ha N-P-K. Apply at sowing: All DAP (130 kg/ha) + All MOP (67 kg/ha) + 50% Urea (130 kg/ha). At first irrigation (Crown root initiation, 20-25 DAS): 25% Urea (65 kg/ha). At second irrigation (Jointing, 40-45 DAS): 25% Urea (65 kg/ha). Rainfed wheat: 80-40-20 kg/ha N-P-K.",
  },
  {
    question: "How much fertilizer does sugarcane need?",
    answer: "Sugarcane is a high-nutrient crop needing 250-100-120 kg/ha N-P₂O₅-K₂O for a 12-month crop. Using DAP route: DAP 217 kg/ha (basal) + Urea 456 kg/ha (4-5 splits over the season) + MOP 200 kg/ha (2 splits). Cost per hectare is significantly higher than cereals. Ratoon sugarcane requires 80% of plant crop dose.",
  },
  {
    question: "What is the fertilizer dose for potato?",
    answer: "Potato: 180-100-120 kg/ha N-P₂O₅-K₂O. Potato has high potassium requirement for tuber quality and starch content. Half the N + full P + full K at planting; remaining N at earthing up (30-35 days). Recommended fertilizers: DAP 217 kg/ha + Urea 310 kg/ha + MOP 200 kg/ha. Total fertilizer cost ~₹25,000-35,000/ha.",
  },
  {
    question: "Is this calculator based on ICAR recommendations?",
    answer: "Yes — crop NPK values in this calculator are based on ICAR (Indian Council of Agricultural Research) recommendations for major Indian crops under medium soil fertility. These are the same recommendations published by state agriculture departments and Krishi Vigyan Kendras (KVKs). Always adjust based on your specific soil test report — soil test-based fertilization can save 20-30% on fertilizer costs.",
  },
  {
    question: "What is split application of fertilizers?",
    answer: "Split application means dividing the total fertilizer dose into 2-4 smaller doses applied at different crop growth stages instead of applying all at once. Benefits: (1) Reduces N losses via leaching and volatilization by 15-30%. (2) Matches nutrient supply with crop demand. (3) Reduces toxicity risk. (4) Increases nutrient use efficiency (NUE). Phosphorus and Potassium are usually applied fully as basal; Nitrogen is always split.",
  },
];

const cropTable = [
  { crop: "Rice (Transplanted)", n: "120", p: "60", k: "40", season: "Kharif" },
  { crop: "Wheat (HYV irrigated)", n: "120", p: "60", k: "40", season: "Rabi" },
  { crop: "Maize (Hybrid)", n: "150", p: "75", k: "50", season: "Kharif/Rabi" },
  { crop: "Sugarcane (plant)", n: "250", p: "100", k: "120", season: "Annual" },
  { crop: "Cotton (Hybrid)", n: "150", p: "75", k: "75", season: "Kharif" },
  { crop: "Soybean", n: "30", p: "60", k: "40", season: "Kharif" },
  { crop: "Potato", n: "180", p: "100", k: "120", season: "Rabi" },
  { crop: "Tomato", n: "150", p: "100", k: "100", season: "Year-round" },
  { crop: "Mustard", n: "100", p: "50", k: "40", season: "Rabi" },
  { crop: "Groundnut", n: "25", p: "50", k: "50", season: "Kharif" },
  { crop: "Banana", n: "200", p: "60", k: "200", season: "Annual" },
  { crop: "Onion", n: "120", p: "60", k: "60", season: "Rabi" },
];

export default function CropFertilizerCalculatorPage() {
  return (
    <>
      <JsonLd data={buildToolSchema({ name: "Crop Fertilizer Calculator", description: "ICAR-recommended fertilizer doses for 25+ crops with split application schedule and cost estimate.", url: TOOL_URL, category: "Agriculture" })} />
      <JsonLd data={buildFaqSchema(faqs)} />
      <JsonLd data={buildBreadcrumbSchema([
        { name: "Home", url: BASE_URL },
        { name: "Tools", url: `${BASE_URL}/tools` },
        { name: "Fertilizer Calculator", url: `${BASE_URL}/tools/fertilizer-calculator` },
        { name: "Crop Fertilizer Calculator", url: TOOL_URL },
      ])} />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumb items={[
          { label: "Tools", href: "/tools" },
          { label: "Fertilizer Calculator", href: "/tools/fertilizer-calculator" },
          { label: "Crop Fertilizer Calculator" },
        ]} />

        <div className="ad-slot my-4">Advertisement</div>

        <div className="lg:grid lg:grid-cols-[1fr_280px] lg:gap-8">
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">Crop Fertilizer Calculator</h1>
              <p className="mt-3 text-lg text-gray-600">
                Get ICAR-recommended NPK fertilizer doses for 25+ crops — rice, wheat, maize, sugarcane,
                cotton, potato, tomato, banana, mustard, soybean, and more. Select your crop, soil
                fertility level, and field area to get exact Urea + DAP + MOP quantities with a
                complete split application schedule.
              </p>
            </div>

            <FertilizerCalculator defaultTab="crop" />

            <div className="ad-slot">Advertisement</div>

            <section className="prose prose-gray max-w-none">
              <h2 className="text-2xl font-bold text-gray-900">ICAR Fertilizer Dose Chart for Major Crops</h2>
              <p className="text-gray-600">Standard NPK recommendations (kg/ha) for medium soil fertility — the most common starting point across Indian agro-climatic zones:</p>
              <div className="not-prose overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-green-50 text-left">
                      <th className="border border-gray-200 px-4 py-2.5 font-semibold">Crop</th>
                      <th className="border border-gray-200 px-4 py-2.5 font-semibold text-blue-700">N (kg/ha)</th>
                      <th className="border border-gray-200 px-4 py-2.5 font-semibold text-orange-700">P₂O₅ (kg/ha)</th>
                      <th className="border border-gray-200 px-4 py-2.5 font-semibold text-purple-700">K₂O (kg/ha)</th>
                      <th className="border border-gray-200 px-4 py-2.5 font-semibold text-gray-500 hidden sm:table-cell">Season</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cropTable.map(r => (
                      <tr key={r.crop} className="hover:bg-gray-50 border-b border-gray-100">
                        <td className="border-l border-r border-gray-200 px-4 py-2.5 font-medium text-gray-900">{r.crop}</td>
                        <td className="border-r border-gray-200 px-4 py-2.5 text-blue-700 font-semibold">{r.n}</td>
                        <td className="border-r border-gray-200 px-4 py-2.5 text-orange-700 font-semibold">{r.p}</td>
                        <td className="border-r border-gray-200 px-4 py-2.5 text-purple-700 font-semibold">{r.k}</td>
                        <td className="border-r border-gray-200 px-4 py-2.5 text-gray-500 text-xs hidden sm:table-cell">{r.season}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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
              <h3 className="mb-3 font-semibold text-gray-900">Crops Available</h3>
              <div className="flex flex-wrap gap-1.5">
                {["Rice","Wheat","Maize","Barley","Sorghum","Sugarcane","Cotton","Soybean","Groundnut","Mustard","Chickpea","Lentil","Potato","Onion","Tomato","Brinjal","Chilli","Banana","Mango","Grapes","Lawn","Flowers"].map(c => (
                  <span key={c} className="rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-medium text-green-700">{c}</span>
                ))}
              </div>
            </div>
            <div className="card p-5">
              <h3 className="mb-3 font-semibold text-gray-900">Related Tools</h3>
              <ul className="space-y-2 text-sm">
                {[
                  { title: "NPK Calculator", href: "/tools/npk-calculator" },
                  { title: "Urea Calculator", href: "/tools/urea-calculator" },
                  { title: "DAP Calculator", href: "/tools/dap-calculator" },
                  { title: "Fertilizer Cost Calculator", href: "/tools/fertilizer-cost-calculator" },
                  { title: "Full Fertilizer Calculator", href: "/tools/fertilizer-calculator" },
                ].map(t => (
                  <li key={t.href}>
                    <Link href={t.href} className="flex items-center gap-1.5 text-green-700 hover:text-green-900">
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
