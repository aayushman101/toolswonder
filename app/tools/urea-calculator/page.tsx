import type { Metadata } from "next";
import Link from "next/link";
import FertilizerCalculator from "@/components/tools/FertilizerCalculator";
import JsonLd, { buildToolSchema, buildFaqSchema, buildBreadcrumbSchema } from "@/components/seo/JsonLd";
import Breadcrumb from "@/components/layout/Breadcrumb";
import { ChevronRight } from "lucide-react";

const BASE_URL = "https://toolswonder.com";
const TOOL_URL = `${BASE_URL}/tools/urea-calculator`;

export const metadata: Metadata = {
  title: "Urea Calculator – Urea Dose per Hectare, Acre & Bigha",
  description:
    "Free Urea fertilizer calculator. Calculate kg of Urea needed per hectare, acre, bigha, or kattha based on nitrogen (N) requirement. Covers rice, wheat, maize, sugarcane, and 20+ crops.",
  keywords: [
    "urea calculator",
    "urea fertilizer calculator",
    "urea per hectare calculator",
    "urea per acre calculator",
    "urea dose for rice",
    "urea dose for wheat",
    "how much urea per acre",
    "urea requirement calculator",
    "nitrogen from urea calculator",
  ],
  alternates: { canonical: TOOL_URL },
  openGraph: {
    title: "Urea Calculator – Dose per Hectare, Acre & Bigha | ToolsWonder",
    description: "Calculate exact Urea dose for any crop, area, and nitrogen requirement. Supports Indian area units.",
    url: TOOL_URL,
    type: "website",
  },
};

const faqs = [
  {
    question: "How much Urea is needed per hectare for rice?",
    answer: "Rice (paddy) requires 120 kg N/ha under medium soil fertility. Urea contains 46% N, so: Urea = 120/0.46 = 261 kg/ha. Applied in 3 splits: 87 kg at transplanting, 65 kg at tillering (21-25 DAT), 109 kg at panicle initiation (45-50 DAT). High-yielding varieties in irrigated conditions may need up to 150 kg N/ha = 326 kg Urea/ha.",
  },
  {
    question: "What is the formula for Urea calculation?",
    answer: "Urea (kg/ha) = Nitrogen required (kg/ha) ÷ 0.46. Since Urea is 46% N: if you need 60 kg N/ha, you need 60/0.46 = 130.4 kg Urea/ha. Total for your area: Urea (kg) = Urea per ha × Area in hectares. 1 bag of Urea = 45 kg in India (contains 20.7 kg N per bag).",
  },
  {
    question: "How much Urea per acre for wheat?",
    answer: "Wheat needs 120 kg N/ha = 48.6 kg N/acre (since 1 acre = 0.4047 ha). Urea per acre = 48.6/0.46 = 105.7 kg Urea/acre = about 2.3 bags of 45 kg Urea per acre. Split: 53 kg at sowing + 26 kg at first irrigation + 26 kg at second irrigation.",
  },
  {
    question: "What is Urea percentage of nitrogen?",
    answer: "Urea (CO(NH₂)₂) contains 46% nitrogen by weight — the highest nitrogen concentration of any solid nitrogen fertilizer. It is also the cheapest per kg of N. 1 kg Urea = 0.46 kg N. Reverse: To supply 1 kg N, you need 1/0.46 = 2.17 kg Urea.",
  },
  {
    question: "How many kg Urea per bigha?",
    answer: "Depends on your bigha size: 1 Bigha (UP/Raj) = 0.2529 ha → 261×0.2529 = 66 kg Urea per bigha. 1 Bigha (MP/CG) = 0.3307 ha → 261×0.3307 = 86 kg Urea per bigha. 1 Bigha (WB) = 0.1338 ha → 261×0.1338 = 35 kg Urea per bigha. Select your regional bigha in the area unit dropdown above.",
  },
  {
    question: "Can I apply Urea at any time?",
    answer: "Urea should not be applied just before rain (it washes away) or in hot midday sun (ammonia volatilizes). Best applied early morning or evening when soil is moist. Always incorporate Urea into soil or apply with irrigation water. Top-dressing Urea on flooded rice fields is effective as the flooded soil slows leaching.",
  },
];

const ureaDoses = [
  { crop: "Rice (Paddy)", nKgHa: "120", ureaTotalHa: "261", split: "3 splits" },
  { crop: "Wheat", nKgHa: "120", ureaTotalHa: "261", split: "3 splits" },
  { crop: "Maize (Hybrid)", nKgHa: "150", ureaTotalHa: "326", split: "3-4 splits" },
  { crop: "Sugarcane", nKgHa: "250", ureaTotalHa: "543", split: "4-5 splits" },
  { crop: "Cotton", nKgHa: "150", ureaTotalHa: "326", split: "3 splits" },
  { crop: "Potato", nKgHa: "180", ureaTotalHa: "391", split: "2-3 splits" },
  { crop: "Tomato", nKgHa: "150", ureaTotalHa: "326", split: "3-4 splits" },
  { crop: "Banana", nKgHa: "200", ureaTotalHa: "435", split: "6+ splits" },
];

export default function UreaCalculatorPage() {
  return (
    <>
      <JsonLd data={buildToolSchema({ name: "Urea Calculator", description: "Calculate Urea fertilizer dose per hectare, acre, or bigha based on nitrogen requirement for any crop.", url: TOOL_URL, category: "Agriculture" })} />
      <JsonLd data={buildFaqSchema(faqs)} />
      <JsonLd data={buildBreadcrumbSchema([
        { name: "Home", url: BASE_URL },
        { name: "Tools", url: `${BASE_URL}/tools` },
        { name: "Fertilizer Calculator", url: `${BASE_URL}/tools/fertilizer-calculator` },
        { name: "Urea Calculator", url: TOOL_URL },
      ])} />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumb items={[
          { label: "Tools", href: "/tools" },
          { label: "Fertilizer Calculator", href: "/tools/fertilizer-calculator" },
          { label: "Urea Calculator" },
        ]} />

        <div className="ad-slot my-4">Advertisement</div>

        <div className="lg:grid lg:grid-cols-[1fr_280px] lg:gap-8">
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">Urea Calculator</h1>
              <p className="mt-3 text-lg text-gray-600">
                Calculate exactly how much Urea fertilizer you need for your field. Enter nitrogen
                requirement and area in any unit (hectare, acre, bigha, guntha, kattha). Get Urea
                quantity in kg, number of bags, and cost. Works for rice, wheat, maize, sugarcane,
                cotton, and 20+ more crops.
              </p>
            </div>

            <FertilizerCalculator defaultTab="npk" />

            <div className="ad-slot">Advertisement</div>

            <section className="prose prose-gray max-w-none">
              <h2 className="text-2xl font-bold text-gray-900">Urea Dose Reference Table</h2>
              <p className="text-gray-600">Urea required per hectare for major crops at medium soil fertility (N requirement ÷ 0.46):</p>
              <div className="not-prose overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-green-50 text-left">
                      <th className="border border-gray-200 px-4 py-2.5 font-semibold">Crop</th>
                      <th className="border border-gray-200 px-4 py-2.5 font-semibold">N (kg/ha)</th>
                      <th className="border border-gray-200 px-4 py-2.5 font-semibold">Urea (kg/ha)</th>
                      <th className="border border-gray-200 px-4 py-2.5 font-semibold">Application</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ureaDoses.map(r => (
                      <tr key={r.crop} className="hover:bg-gray-50 border-b border-gray-100">
                        <td className="border-l border-r border-gray-200 px-4 py-2.5 font-medium">{r.crop}</td>
                        <td className="border-r border-gray-200 px-4 py-2.5 text-blue-700 font-semibold">{r.nKgHa}</td>
                        <td className="border-r border-gray-200 px-4 py-2.5 font-semibold">{r.ureaTotalHa}</td>
                        <td className="border-r border-gray-200 px-4 py-2.5 text-gray-500">{r.split}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-gray-400 mt-1">Source: ICAR recommendations. Values are for medium fertility soils. Always base on soil test where possible.</p>
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
              <h3 className="mb-3 font-semibold text-gray-900">Urea Quick Facts</h3>
              <div className="space-y-2 text-sm">
                {[
                  { label: "N content", value: "46%" },
                  { label: "Formula", value: "CO(NH₂)₂" },
                  { label: "Bag size (India)", value: "45 kg" },
                  { label: "N per bag", value: "20.7 kg" },
                  { label: "MRP per bag", value: "₹266.50" },
                  { label: "Per kg N cost", value: "₹12.9" },
                  { label: "Best applied", value: "In splits" },
                ].map(f => (
                  <div key={f.label} className="flex justify-between">
                    <span className="text-gray-500">{f.label}</span>
                    <span className="font-semibold text-gray-900">{f.value}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="card p-5">
              <h3 className="mb-3 font-semibold text-gray-900">Related Tools</h3>
              <ul className="space-y-2 text-sm">
                {[
                  { title: "DAP Calculator", href: "/tools/dap-calculator" },
                  { title: "NPK Calculator", href: "/tools/npk-calculator" },
                  { title: "Crop Fertilizer Calculator", href: "/tools/crop-fertilizer-calculator" },
                  { title: "Fertilizer Cost Calculator", href: "/tools/fertilizer-cost-calculator" },
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
