import type { Metadata } from "next";
import Link from "next/link";
import FertilizerCalculator from "@/components/tools/FertilizerCalculator";
import JsonLd, { buildToolSchema, buildFaqSchema, buildBreadcrumbSchema } from "@/components/seo/JsonLd";
import Breadcrumb from "@/components/layout/Breadcrumb";
import { ChevronRight } from "lucide-react";

const BASE_URL = "https://toolswonder.com";
const TOOL_URL = `${BASE_URL}/tools/dap-calculator`;

export const metadata: Metadata = {
  title: "DAP Calculator – Di-ammonium Phosphate Dose per Hectare & Acre",
  description:
    "Free DAP fertilizer calculator. Calculate Di-ammonium Phosphate (18-46-0) dose per hectare, acre, or bigha. Includes N contribution from DAP and Urea balance calculation.",
  keywords: [
    "dap calculator",
    "dap fertilizer calculator",
    "di-ammonium phosphate calculator",
    "dap per hectare calculator",
    "dap per acre calculator",
    "dap dose for rice",
    "dap dose for wheat",
    "how much dap per acre",
    "18-46-0 fertilizer calculator",
  ],
  alternates: { canonical: TOOL_URL },
  openGraph: {
    title: "DAP Calculator – Di-ammonium Phosphate Dose | ToolsWonder",
    description: "Calculate DAP dose and nitrogen contribution for any crop and area. Free, instant, Indian units supported.",
    url: TOOL_URL,
    type: "website",
  },
};

const faqs = [
  {
    question: "What is DAP fertilizer and its NPK content?",
    answer: "DAP (Di-ammonium Phosphate) is a compound fertilizer with 18% Nitrogen and 46% Phosphorus (as P₂O₅). It is the most widely used phosphatic fertilizer in India. DAP is water-soluble, quick-acting, and suitable for basal application. Its high P₂O₅ concentration (46%) means fewer bags are needed compared to SSP (16% P₂O₅).",
  },
  {
    question: "How is DAP dose calculated per hectare?",
    answer: "DAP (kg/ha) = P₂O₅ required (kg/ha) ÷ 0.46. Example: Rice needs 60 kg P₂O₅/ha → DAP = 60/0.46 = 130 kg/ha. Important: DAP also supplies N — at 130 kg/ha DAP, N contributed = 130 × 0.18 = 23.4 kg N. This must be subtracted from total N requirement before calculating Urea.",
  },
  {
    question: "How much DAP per acre?",
    answer: "1 acre = 0.4047 hectares. DAP per acre = DAP per ha × 0.4047. Example: If 130 kg DAP/ha needed → 130 × 0.4047 = 52.6 kg DAP per acre = 1.05 bags of 50 kg. For wheat (60 kg P₂O₅/ha): 52.6 kg DAP/acre. For sugarcane (100 kg P₂O₅/ha): 87.7 kg DAP/acre.",
  },
  {
    question: "Should I use DAP or SSP?",
    answer: "DAP: Higher P content (46%), fewer bags, no sulphur. Preferred for cereals, vegetables. SSP: Lower P content (16%) but also contains 11% sulphur and 19% calcium. Preferred for oilseeds (mustard, groundnut, sunflower), pulses (soybean, chickpea), and on sulphur-deficient soils. SSP is cheaper per kg but more bags are needed. Our cost optimizer compares both.",
  },
  {
    question: "When should DAP be applied?",
    answer: "DAP should be applied as a basal dose (at sowing or transplanting) because P is relatively immobile in soil and needs to be placed near the root zone before the crop is established. P uptake is highest in the early growth stages. Applying DAP at tillering or later has much lower efficiency. N from DAP is also available early, which is beneficial for plant establishment.",
  },
  {
    question: "What is the DAP calculation for wheat per bigha?",
    answer: "Wheat needs 60 kg P₂O₅/ha. DAP = 60/0.46 = 130 kg/ha. Per bigha (UP/Rajasthan, 0.2529 ha): 130 × 0.2529 = 32.9 kg DAP. Per bigha (MP/CG, 0.3307 ha): 130 × 0.3307 = 43 kg DAP. Per bigha (WB, 0.1338 ha): 130 × 0.1338 = 17.4 kg DAP. Use the area unit dropdown above to select your regional bigha.",
  },
];

const dapDoses = [
  { crop: "Rice", p: "60", dap: "130", nFromDap: "23.4" },
  { crop: "Wheat", p: "60", dap: "130", nFromDap: "23.4" },
  { crop: "Maize", p: "75", dap: "163", nFromDap: "29.3" },
  { crop: "Sugarcane", p: "100", dap: "217", nFromDap: "39.1" },
  { crop: "Cotton", p: "75", dap: "163", nFromDap: "29.3" },
  { crop: "Potato", p: "100", dap: "217", nFromDap: "39.1" },
  { crop: "Soybean", p: "60", dap: "130", nFromDap: "23.4" },
  { crop: "Groundnut", p: "50", dap: "109", nFromDap: "19.6" },
];

export default function DAPCalculatorPage() {
  return (
    <>
      <JsonLd data={buildToolSchema({ name: "DAP Calculator", description: "Calculate DAP (Di-ammonium Phosphate 18-46-0) dose per hectare, acre, or bigha for any crop.", url: TOOL_URL, category: "Agriculture" })} />
      <JsonLd data={buildFaqSchema(faqs)} />
      <JsonLd data={buildBreadcrumbSchema([
        { name: "Home", url: BASE_URL },
        { name: "Tools", url: `${BASE_URL}/tools` },
        { name: "Fertilizer Calculator", url: `${BASE_URL}/tools/fertilizer-calculator` },
        { name: "DAP Calculator", url: TOOL_URL },
      ])} />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumb items={[
          { label: "Tools", href: "/tools" },
          { label: "Fertilizer Calculator", href: "/tools/fertilizer-calculator" },
          { label: "DAP Calculator" },
        ]} />

        <div className="ad-slot my-4">Advertisement</div>

        <div className="lg:grid lg:grid-cols-[1fr_280px] lg:gap-8">
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">DAP Calculator</h1>
              <p className="mt-3 text-lg text-gray-600">
                Calculate DAP (Di-ammonium Phosphate, 18-46-0) dose for your field. Enter phosphorus
                requirement and area — get DAP in kg and bags, plus nitrogen contribution from DAP
                and remaining Urea dose. Supports Indian units (bigha, guntha, kattha).
              </p>
            </div>

            <FertilizerCalculator defaultTab="npk" />

            <div className="ad-slot">Advertisement</div>

            <section className="prose prose-gray max-w-none">
              <h2 className="text-2xl font-bold text-gray-900">DAP Dose Reference by Crop</h2>
              <p className="text-gray-600">Standard DAP dose and nitrogen contribution at medium soil fertility:</p>
              <div className="not-prose overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-orange-50 text-left">
                      <th className="border border-gray-200 px-4 py-2.5 font-semibold">Crop</th>
                      <th className="border border-gray-200 px-4 py-2.5 font-semibold text-orange-700">P₂O₅ (kg/ha)</th>
                      <th className="border border-gray-200 px-4 py-2.5 font-semibold">DAP (kg/ha)</th>
                      <th className="border border-gray-200 px-4 py-2.5 font-semibold text-blue-700">N from DAP (kg/ha)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dapDoses.map(r => (
                      <tr key={r.crop} className="hover:bg-gray-50 border-b border-gray-100">
                        <td className="border-l border-r border-gray-200 px-4 py-2.5 font-medium">{r.crop}</td>
                        <td className="border-r border-gray-200 px-4 py-2.5 text-orange-700 font-semibold">{r.p}</td>
                        <td className="border-r border-gray-200 px-4 py-2.5 font-semibold">{r.dap}</td>
                        <td className="border-r border-gray-200 px-4 py-2.5 text-blue-700">{r.nFromDap}</td>
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
              <h3 className="mb-3 font-semibold text-gray-900">DAP Quick Facts</h3>
              <div className="space-y-2 text-sm">
                {[
                  { label: "Full name", value: "Di-ammonium Phosphate" },
                  { label: "NPK", value: "18-46-0" },
                  { label: "N content", value: "18%" },
                  { label: "P₂O₅ content", value: "46%" },
                  { label: "Bag size (India)", value: "50 kg" },
                  { label: "MRP per bag", value: "₹1,350" },
                  { label: "Apply as", value: "Basal dose" },
                ].map(f => (
                  <div key={f.label} className="flex justify-between">
                    <span className="text-gray-500">{f.label}</span>
                    <span className="font-semibold text-gray-900 text-right">{f.value}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="card p-5">
              <h3 className="mb-3 font-semibold text-gray-900">Related Tools</h3>
              <ul className="space-y-2 text-sm">
                {[
                  { title: "Urea Calculator", href: "/tools/urea-calculator" },
                  { title: "NPK Calculator", href: "/tools/npk-calculator" },
                  { title: "Crop Fertilizer Calculator", href: "/tools/crop-fertilizer-calculator" },
                  { title: "Fertilizer Blend Calculator", href: "/tools/fertilizer-blend-calculator" },
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
