import type { Metadata } from "next";
import Link from "next/link";
import FertilizerCalculator from "@/components/tools/FertilizerCalculator";
import JsonLd, { buildToolSchema, buildFaqSchema, buildBreadcrumbSchema } from "@/components/seo/JsonLd";
import Breadcrumb from "@/components/layout/Breadcrumb";
import { ChevronRight } from "lucide-react";

const BASE_URL = "https://toolswonder.com";
const TOOL_URL = `${BASE_URL}/tools/fertilizer-blend-calculator`;

export const metadata: Metadata = {
  title: "Fertilizer Blend Calculator – Analyze NPK from Any Fertilizer Mix",
  description:
    "Free fertilizer blend calculator. Mix any combination of fertilizers and instantly see total N, P, K supplied, cost per hectare, and nutrient balance. Supports Urea, DAP, MOP, SSP, complexes, and organics.",
  keywords: [
    "fertilizer blend calculator",
    "fertilizer mix calculator",
    "custom fertilizer blend",
    "fertilizer blending calculator",
    "npk blend calculator",
    "fertilizer mixture calculator",
    "fertilizer combination calculator",
    "custom fertilizer ratio calculator",
  ],
  alternates: { canonical: TOOL_URL },
  openGraph: {
    title: "Fertilizer Blend Calculator – Analyze NPK from Any Mix | ToolsWonder",
    description: "Enter any fertilizer combination and quantities — see total N, P, K and cost instantly. Free blend analyzer.",
    url: TOOL_URL,
    type: "website",
  },
};

const faqs = [
  {
    question: "What is a fertilizer blend calculator?",
    answer: "A fertilizer blend calculator computes the total N, P, K nutrients you get when mixing different fertilizers in specific quantities. For example: if you apply 100 kg Urea + 50 kg DAP + 30 kg MOP per hectare, the blend calculator shows total N = 100×0.46 + 50×0.18 = 55 kg, total P = 50×0.46 = 23 kg, total K = 30×0.60 = 18 kg — and the total cost.",
  },
  {
    question: "How do I create a custom fertilizer blend?",
    answer: "In the Fertilizer Blend tab: 1) Click 'Add Fertilizer' to add rows. 2) Select a fertilizer from the dropdown (Urea, DAP, MOP, SSP, 10-26-26, etc.). 3) Enter quantity in kg per hectare. 4) Add as many fertilizers as needed. 5) The calculator shows total N, P, K supplied and cost in real time. Compare against your crop's requirements to check adequacy.",
  },
  {
    question: "What is a bulk blend fertilizer?",
    answer: "Bulk blend fertilizer (BB fertilizer) is a physical mixture of granular single-nutrient or compound fertilizers to achieve a specific NPK ratio for a crop or region. Common blends: 10-26-26 (cereals, basal), 12-32-16 (high-P crops), 14-35-14, 17-17-17 (balanced). Blending at the local level allows customization for soil test results and reduces cost compared to buying pre-made complex fertilizers.",
  },
  {
    question: "Can I blend DAP + Urea?",
    answer: "Yes, DAP + Urea is the most common blend in Indian agriculture. However, do not physically mix them before applying as this can cause nitrogen losses (ammonia volatilization). Apply DAP as basal, then Urea in splits. If mixing is unavoidable, apply the blend immediately without storage. Never blend Urea with SSP as this causes chemical reaction and nutrient loss.",
  },
  {
    question: "What is the best NPK blend for vegetable gardens?",
    answer: "For vegetable gardens: A balanced 14-14-14 or 17-17-17 complex is a good starting point. Tomatoes and fruiting vegetables need higher K (10-10-20 type or add extra MOP). Leafy vegetables need higher N (add Urea or CAN). Root vegetables need higher P and K. Use the blend calculator to check your mix against vegetable NPK needs (typically 150-100-100 kg/ha).",
  },
  {
    question: "How do I calculate NPK in a fertilizer blend?",
    answer: "For each fertilizer in the blend: N contributed = Quantity (kg) × N% / 100. P contributed = Quantity (kg) × P% / 100. K contributed = Quantity (kg) × K% / 100. Sum all contributions. Example: 200 kg Urea (46%N) + 130 kg DAP (18%N, 46%P) = N: 200×0.46 + 130×0.18 = 92+23.4 = 115.4 kg; P: 130×0.46 = 59.8 kg; K: 0.",
  },
];

const commonBlends = [
  { name: "Rice standard", mix: "130 DAP + 210 Urea + 67 MOP", n: "120", p: "59.8", k: "40.2" },
  { name: "Wheat standard", mix: "130 DAP + 261 Urea + 67 MOP", n: "143.8", p: "59.8", k: "40.2" },
  { name: "Balanced veg", mix: "200 17-17-17 + 50 Urea + 30 MOP", n: "57", p: "34", k: "52" },
  { name: "Oilseed SSP route", mix: "312 SSP + 200 Urea + 80 MOP", n: "92", p: "49.9", k: "48" },
  { name: "Sugarcane", mix: "217 DAP + 457 Urea + 200 MOP", n: "249.5", p: "99.8", k: "120" },
];

export default function FertilizerBlendCalculatorPage() {
  return (
    <>
      <JsonLd data={buildToolSchema({ name: "Fertilizer Blend Calculator", description: "Analyze total N, P, K from any custom fertilizer combination and calculate cost per hectare.", url: TOOL_URL, category: "Agriculture" })} />
      <JsonLd data={buildFaqSchema(faqs)} />
      <JsonLd data={buildBreadcrumbSchema([
        { name: "Home", url: BASE_URL },
        { name: "Tools", url: `${BASE_URL}/tools` },
        { name: "Fertilizer Calculator", url: `${BASE_URL}/tools/fertilizer-calculator` },
        { name: "Fertilizer Blend Calculator", url: TOOL_URL },
      ])} />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumb items={[
          { label: "Tools", href: "/tools" },
          { label: "Fertilizer Calculator", href: "/tools/fertilizer-calculator" },
          { label: "Fertilizer Blend Calculator" },
        ]} />

        <div className="ad-slot my-4">Advertisement</div>

        <div className="lg:grid lg:grid-cols-[1fr_280px] lg:gap-8">
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">Fertilizer Blend Calculator</h1>
              <p className="mt-3 text-lg text-gray-600">
                Mix any combination of fertilizers and instantly analyze total Nitrogen, Phosphorus,
                and Potassium supplied per hectare — plus total cost. Supports 20+ fertilizers
                including Urea, DAP, MOP, SSP, TSP, SOP, NPK complexes, and organic manures.
              </p>
            </div>

            <FertilizerCalculator defaultTab="blend" />

            <div className="ad-slot">Advertisement</div>

            <section className="prose prose-gray max-w-none">
              <h2 className="text-2xl font-bold text-gray-900">Common Fertilizer Blends — NPK Analysis</h2>
              <div className="not-prose overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-green-50 text-left">
                      <th className="border border-gray-200 px-4 py-2.5 font-semibold">Blend Name</th>
                      <th className="border border-gray-200 px-4 py-2.5 font-semibold text-gray-500 text-xs hidden sm:table-cell">Mix (kg/ha)</th>
                      <th className="border border-gray-200 px-4 py-2.5 font-semibold text-blue-700">N (kg/ha)</th>
                      <th className="border border-gray-200 px-4 py-2.5 font-semibold text-orange-700">P (kg/ha)</th>
                      <th className="border border-gray-200 px-4 py-2.5 font-semibold text-purple-700">K (kg/ha)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {commonBlends.map(b => (
                      <tr key={b.name} className="hover:bg-gray-50 border-b border-gray-100">
                        <td className="border-l border-r border-gray-200 px-4 py-2.5 font-medium">{b.name}</td>
                        <td className="border-r border-gray-200 px-4 py-2.5 text-xs text-gray-500 hidden sm:table-cell">{b.mix}</td>
                        <td className="border-r border-gray-200 px-4 py-2.5 text-blue-700 font-semibold">{b.n}</td>
                        <td className="border-r border-gray-200 px-4 py-2.5 text-orange-700 font-semibold">{b.p}</td>
                        <td className="border-r border-gray-200 px-4 py-2.5 text-purple-700 font-semibold">{b.k}</td>
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
              <h3 className="mb-3 font-semibold text-gray-900">Fertilizer NPK Quick Ref</h3>
              <div className="space-y-1.5 text-xs">
                {[
                  { name: "Urea", npk: "46-0-0" },
                  { name: "DAP", npk: "18-46-0" },
                  { name: "MOP", npk: "0-0-60" },
                  { name: "SSP", npk: "0-16-0 (+11% S)" },
                  { name: "TSP", npk: "0-46-0" },
                  { name: "SOP", npk: "0-0-50" },
                  { name: "10-26-26", npk: "10-26-26" },
                  { name: "17-17-17", npk: "17-17-17" },
                  { name: "FYM", npk: "0.5-0.25-0.5" },
                ].map(f => (
                  <div key={f.name} className="flex justify-between">
                    <span className="text-gray-600">{f.name}</span>
                    <span className="font-mono font-medium text-gray-900">{f.npk}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="card p-5">
              <h3 className="mb-3 font-semibold text-gray-900">Related Tools</h3>
              <ul className="space-y-2 text-sm">
                {[
                  { title: "NPK Calculator", href: "/tools/npk-calculator" },
                  { title: "Crop Fertilizer Calculator", href: "/tools/crop-fertilizer-calculator" },
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
