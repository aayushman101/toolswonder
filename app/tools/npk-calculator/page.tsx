import type { Metadata } from "next";
import Link from "next/link";
import FertilizerCalculator from "@/components/tools/FertilizerCalculator";
import JsonLd, { buildToolSchema, buildFaqSchema, buildBreadcrumbSchema } from "@/components/seo/JsonLd";
import Breadcrumb from "@/components/layout/Breadcrumb";
import { ChevronRight } from "lucide-react";

const BASE_URL = "https://toolswonder.com";
const TOOL_URL = `${BASE_URL}/tools/npk-calculator`;

export const metadata: Metadata = {
  title: "NPK Calculator – Calculate Fertilizer from N, P, K Requirements",
  description:
    "Free NPK calculator: enter Nitrogen, Phosphorus, and Potassium requirements and get exact fertilizer quantities for Urea, DAP, MOP, SSP and complex NPKs. Supports all area units.",
  keywords: [
    "npk calculator",
    "npk fertilizer calculator",
    "nitrogen phosphorus potassium calculator",
    "npk ratio calculator",
    "fertilizer npk calculator",
    "npk calculation formula",
    "npk per hectare calculator",
  ],
  alternates: { canonical: TOOL_URL },
  openGraph: {
    title: "NPK Calculator – Fertilizer from N, P, K Requirements | ToolsWonder",
    description: "Enter N, P, K requirements and get Urea + DAP + MOP doses instantly. Free, accurate, supports all area units.",
    url: TOOL_URL,
    type: "website",
  },
};

const faqs = [
  {
    question: "What is an NPK calculator?",
    answer: "An NPK calculator converts nutrient requirements (how many kg of Nitrogen, Phosphorus, and Potassium you need per hectare or acre) into the actual fertilizer quantities to purchase and apply. For example, a requirement of 120-60-40 N-P-K translates to: Urea (46% N) = 261 kg/ha, DAP (46% P₂O₅) = 130 kg/ha, MOP (60% K₂O) = 67 kg/ha.",
  },
  {
    question: "How do I calculate NPK fertilizer doses?",
    answer: "NPK calculation formula: N fertilizer (kg/ha) = N required ÷ N%. P fertilizer (kg/ha) = P₂O₅ required ÷ P%. K fertilizer (kg/ha) = K₂O required ÷ K%. For DAP route: DAP = P/0.46; then remaining N from Urea = (N total – DAP qty × 0.18)/0.46; MOP = K/0.60.",
  },
  {
    question: "What does 14-14-14 NPK mean?",
    answer: "14-14-14 NPK fertilizer contains 14% Nitrogen, 14% Phosphorus (as P₂O₅), and 14% Potassium (as K₂O) by weight. A 50 kg bag contains 7 kg N + 7 kg P₂O₅ + 7 kg K₂O = 21 kg total nutrients (the rest is carrier/filler). It is a balanced complex fertilizer suitable for mixed crops.",
  },
  {
    question: "What is the best NPK ratio for crops?",
    answer: "The optimal NPK ratio varies by crop: Rice = 120:60:40 (3:1.5:1), Wheat = 120:60:40 (3:1.5:1), Maize = 150:75:50 (3:1.5:1), Sugarcane = 250:100:120 (2.5:1:1.2), Potato = 180:100:120 (1.8:1:1.2). Legumes (soybean, chickpea) need low N since they fix nitrogen from the air.",
  },
  {
    question: "How to calculate NPK for 1 acre of land?",
    answer: "1 acre = 0.4047 hectares. Multiply your kg/ha NPK requirement by 0.4047. Example: Rice needs 120 kg N/ha × 0.4047 = 48.6 kg N per acre. Urea needed = 48.6/0.46 = 105.6 kg Urea per acre. DAP = 60 × 0.4047 / 0.46 = 52.7 kg per acre. MOP = 40 × 0.4047 / 0.60 = 27 kg per acre. Use the calculator above for instant results.",
  },
  {
    question: "Is NPK in kg/ha or kg/acre?",
    answer: "Most crop science publications and government recommendations (ICAR, state agriculture departments) publish NPK requirements in kg per hectare (kg/ha). The calculator accepts kg/ha by default but you can switch to kg/acre in the Rate Unit dropdown. The area can be entered in any unit — the calculator handles all conversions.",
  },
];

export default function NPKCalculatorPage() {
  return (
    <>
      <JsonLd data={buildToolSchema({ name: "NPK Calculator", description: "Calculate fertilizer quantities from N, P, K nutrient requirements for any crop and area.", url: TOOL_URL, category: "Agriculture" })} />
      <JsonLd data={buildFaqSchema(faqs)} />
      <JsonLd data={buildBreadcrumbSchema([
        { name: "Home", url: BASE_URL },
        { name: "Tools", url: `${BASE_URL}/tools` },
        { name: "Fertilizer Calculator", url: `${BASE_URL}/tools/fertilizer-calculator` },
        { name: "NPK Calculator", url: TOOL_URL },
      ])} />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumb items={[
          { label: "Tools", href: "/tools" },
          { label: "Fertilizer Calculator", href: "/tools/fertilizer-calculator" },
          { label: "NPK Calculator" },
        ]} />

        <div className="ad-slot my-4">Advertisement</div>

        <div className="lg:grid lg:grid-cols-[1fr_280px] lg:gap-8">
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">NPK Calculator</h1>
              <p className="mt-3 text-lg text-gray-600">
                Enter Nitrogen (N), Phosphorus (P₂O₅), and Potassium (K₂O) requirements for your
                crop and area. Get exact quantities of Urea, DAP, MOP, SSP, and NPK complex
                fertilizers — with cost comparison across 4 combinations.
              </p>
            </div>

            <FertilizerCalculator defaultTab="npk" />

            <div className="ad-slot">Advertisement</div>

            <section className="prose prose-gray max-w-none">
              <h2 className="text-2xl font-bold text-gray-900">NPK Calculation Formula</h2>
              <p className="text-gray-600">The formula to convert nutrient requirements into fertilizer quantities:</p>
              <div className="not-prose rounded-xl bg-gray-900 p-5 font-mono text-sm overflow-x-auto">
                <div className="text-gray-400 mb-1"># Generic formula</div>
                <div className="text-green-400">Fertilizer qty (kg/ha) = Nutrient required (kg/ha) ÷ Nutrient% in fertilizer</div>
                <div className="text-gray-400 mt-3 mb-1"># DAP Route Example (N=120, P=60, K=40)</div>
                <div className="text-yellow-400">DAP = 60/0.46 = 130.4 kg/ha  [provides 130.4×0.18 = 23.5 kg N]</div>
                <div className="text-yellow-400">Urea = (120-23.5)/0.46 = 209.8 kg/ha</div>
                <div className="text-yellow-400">MOP = 40/0.60 = 66.7 kg/ha</div>
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
              <h3 className="mb-3 font-semibold text-gray-900">Related Tools</h3>
              <ul className="space-y-3 text-sm">
                {[
                  { title: "Urea Calculator", href: "/tools/urea-calculator" },
                  { title: "DAP Calculator", href: "/tools/dap-calculator" },
                  { title: "Crop Fertilizer Calculator", href: "/tools/crop-fertilizer-calculator" },
                  { title: "Fertilizer Blend Calculator", href: "/tools/fertilizer-blend-calculator" },
                  { title: "Fertilizer Cost Calculator", href: "/tools/fertilizer-cost-calculator" },
                  { title: "Full Fertilizer Calculator", href: "/tools/fertilizer-calculator" },
                ].map(t => (
                  <li key={t.href}>
                    <Link href={t.href} className="flex items-center gap-2 text-green-700 hover:text-green-900">
                      <ChevronRight className="h-3.5 w-3.5 shrink-0" /> {t.title}
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
