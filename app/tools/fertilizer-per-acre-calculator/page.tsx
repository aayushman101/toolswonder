import type { Metadata } from "next";
import Link from "next/link";
import FertilizerCalculator from "@/components/tools/FertilizerCalculator";
import JsonLd, { buildToolSchema, buildFaqSchema, buildBreadcrumbSchema } from "@/components/seo/JsonLd";
import Breadcrumb from "@/components/layout/Breadcrumb";
import { ChevronRight } from "lucide-react";

const BASE_URL = "https://toolswonder.com";
const TOOL_URL = `${BASE_URL}/tools/fertilizer-per-acre-calculator`;

export const metadata: Metadata = {
  title: "Fertilizer per Acre Calculator – Urea, DAP, MOP per Acre",
  description:
    "Calculate fertilizer per acre for any crop. Convert N, P, K doses from kg/ha to kg/acre and total bags needed. Free calculator for Urea, DAP, MOP, SSP and NPK complex fertilizers.",
  keywords: [
    "fertilizer per acre calculator",
    "fertilizer calculator per acre",
    "urea per acre",
    "dap per acre",
    "mop per acre",
    "how much fertilizer per acre",
    "fertilizer bags per acre",
    "kg per acre fertilizer calculator",
    "lbs per acre fertilizer",
  ],
  alternates: { canonical: TOOL_URL },
  openGraph: {
    title: "Fertilizer per Acre Calculator – Urea, DAP, MOP | ToolsWonder",
    description: "Enter acres and crop NPK needs — get exact Urea, DAP, MOP quantities in kg/acre and number of bags. Free.",
    url: TOOL_URL,
    type: "website",
  },
};

const faqs = [
  {
    question: "How much fertilizer per acre for rice?",
    answer: "Rice (medium fertility, irrigated): 120-60-40 kg/ha N-P-K. Per acre (×0.4047): N = 48.6 kg, P₂O₅ = 24.3 kg, K₂O = 16.2 kg. Fertilizer per acre: DAP = 52.8 kg (≈1 bag of 50 kg), Urea = 84.8 kg (≈2 bags of 45 kg), MOP = 27 kg (≈0.5 bag). Total per acre ≈ 165 kg fertilizer.",
  },
  {
    question: "How do I convert kg/ha to kg/acre?",
    answer: "1 hectare = 2.47105 acres, so 1 acre = 0.40468 ha. To convert kg/ha to kg/acre: multiply by 0.40468. Example: 261 kg Urea/ha × 0.40468 = 105.6 kg Urea/acre. To convert lbs/acre to kg/ha: multiply by 1.12085. Our Unit Converter tab handles all these conversions instantly.",
  },
  {
    question: "How many bags of DAP per acre?",
    answer: "For rice or wheat (60 kg P₂O₅/ha → 130 kg DAP/ha → 52.6 kg DAP/acre). One 50 kg bag of DAP per acre is sufficient for most cereals. For potato or sugarcane (100 kg P₂O₅/ha → 217 kg DAP/ha → 87.8 kg DAP/acre = 1.75 bags/acre). Use the calculator above for your specific crop and area.",
  },
  {
    question: "How much Urea per acre for wheat?",
    answer: "Wheat requires 120 kg N/ha = 48.6 kg N/acre. Urea (46% N) = 48.6/0.46 = 105.7 kg/acre. That is approximately 2.3 bags of 45 kg Urea per acre. Applied in 3 splits: 53 kg at sowing + 26 kg at crown root initiation + 26 kg at jointing.",
  },
  {
    question: "What is the fertilizer recommendation per acre for cotton?",
    answer: "Cotton (Hybrid): 150-75-75 kg/ha N-P₂O₅-K₂O = 60.7-30.4-30.4 kg/acre. Fertilizer per acre: DAP = 66 kg, Urea = 121 kg, MOP = 50.7 kg. Apply: DAP + MOP + 30% Urea at sowing; 35% Urea at first irrigation (30-35 DAS); 35% Urea at second irrigation (55-60 DAS). Cost per acre ≈ ₹4,000-5,000.",
  },
  {
    question: "How do I calculate fertilizer bags needed per acre?",
    answer: "Bags needed = Total fertilizer (kg) ÷ Bag size (kg). Standard bag sizes in India: Urea = 45 kg, DAP = 50 kg, MOP = 50 kg, SSP = 50 kg. Example for 1 acre rice: Urea bags = 84.8 kg ÷ 45 = 1.9 bags (round up to 2 bags). DAP bags = 52.6 kg ÷ 50 = 1.05 bags (round up to 1-2 bags). Our calculator shows exact bags for 45 kg and 50 kg bag sizes.",
  },
];

const perAcreTable = [
  { crop: "Rice", urea: "84.8", dap: "52.6", mop: "27.0", cost: "~₹3,800" },
  { crop: "Wheat", urea: "105.6", dap: "52.6", mop: "27.0", cost: "~₹4,200" },
  { crop: "Maize", urea: "132.0", dap: "65.8", mop: "33.7", cost: "~₹5,200" },
  { crop: "Sugarcane", urea: "219.7", dap: "87.7", mop: "81.0", cost: "~₹11,000" },
  { crop: "Cotton", urea: "121.0", dap: "66.0", mop: "50.7", cost: "~₹5,000" },
  { crop: "Potato", urea: "158.2", dap: "87.7", mop: "81.0", cost: "~₹7,500" },
  { crop: "Soybean", urea: "28.6", dap: "52.6", mop: "27.0", cost: "~₹2,800" },
  { crop: "Mustard", urea: "96.1", dap: "43.9", mop: "27.0", cost: "~₹3,500" },
];

export default function FertilizerPerAcrePage() {
  return (
    <>
      <JsonLd data={buildToolSchema({ name: "Fertilizer per Acre Calculator", description: "Calculate Urea, DAP, MOP and other fertilizer quantities per acre for any crop with bag count.", url: TOOL_URL, category: "Agriculture" })} />
      <JsonLd data={buildFaqSchema(faqs)} />
      <JsonLd data={buildBreadcrumbSchema([
        { name: "Home", url: BASE_URL },
        { name: "Tools", url: `${BASE_URL}/tools` },
        { name: "Fertilizer Calculator", url: `${BASE_URL}/tools/fertilizer-calculator` },
        { name: "Fertilizer per Acre Calculator", url: TOOL_URL },
      ])} />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumb items={[
          { label: "Tools", href: "/tools" },
          { label: "Fertilizer Calculator", href: "/tools/fertilizer-calculator" },
          { label: "Fertilizer per Acre" },
        ]} />

        <div className="ad-slot my-4">Advertisement</div>

        <div className="lg:grid lg:grid-cols-[1fr_280px] lg:gap-8">
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">Fertilizer per Acre Calculator</h1>
              <p className="mt-3 text-lg text-gray-600">
                Enter your field area in acres and crop nutrient requirements to get exact fertilizer
                quantities (Urea, DAP, MOP, SSP, NPK complex) in kg per acre and number of bags.
                Select the acre unit in the area dropdown below.
              </p>
            </div>

            <FertilizerCalculator defaultTab="npk" />

            <div className="ad-slot">Advertisement</div>

            <section className="prose prose-gray max-w-none">
              <h2 className="text-2xl font-bold text-gray-900">Fertilizer per Acre Reference Table</h2>
              <p className="text-gray-600">Approximate fertilizer quantities per acre for major crops at medium soil fertility (1 acre = 0.4047 ha):</p>
              <div className="not-prose overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-green-50 text-left">
                      <th className="border border-gray-200 px-4 py-2.5 font-semibold">Crop</th>
                      <th className="border border-gray-200 px-4 py-2.5 font-semibold">Urea (kg/ac)</th>
                      <th className="border border-gray-200 px-4 py-2.5 font-semibold">DAP (kg/ac)</th>
                      <th className="border border-gray-200 px-4 py-2.5 font-semibold">MOP (kg/ac)</th>
                      <th className="border border-gray-200 px-4 py-2.5 font-semibold hidden sm:table-cell">Est. Cost/Acre</th>
                    </tr>
                  </thead>
                  <tbody>
                    {perAcreTable.map(r => (
                      <tr key={r.crop} className="hover:bg-gray-50 border-b border-gray-100">
                        <td className="border-l border-r border-gray-200 px-4 py-2.5 font-medium">{r.crop}</td>
                        <td className="border-r border-gray-200 px-4 py-2.5">{r.urea}</td>
                        <td className="border-r border-gray-200 px-4 py-2.5">{r.dap}</td>
                        <td className="border-r border-gray-200 px-4 py-2.5">{r.mop}</td>
                        <td className="border-r border-gray-200 px-4 py-2.5 text-gray-500 hidden sm:table-cell">{r.cost}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-gray-400 mt-1">Using DAP+Urea+MOP route at current GoI MRP prices. Market prices vary by region.</p>
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
              <h3 className="mb-3 font-semibold text-gray-900">Area Conversions</h3>
              <div className="space-y-1.5 text-sm">
                {[
                  { from: "1 acre", to: "0.4047 ha" },
                  { from: "1 acre", to: "43,560 sq ft" },
                  { from: "1 acre", to: "4,047 sq m" },
                  { from: "1 acre (UP)", to: "≈ 1.6 Bigha" },
                  { from: "1 acre", to: "40 Guntha" },
                  { from: "1 acre", to: "100 Cent" },
                ].map(r => (
                  <div key={r.from} className="flex justify-between text-xs">
                    <span className="text-gray-500">{r.from}</span>
                    <span className="font-medium text-gray-900">{r.to}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="card p-5">
              <h3 className="mb-3 font-semibold text-gray-900">Related Tools</h3>
              <ul className="space-y-2 text-sm">
                {[
                  { title: "Fertilizer per Hectare", href: "/tools/fertilizer-per-hectare-calculator" },
                  { title: "Crop Fertilizer Calculator", href: "/tools/crop-fertilizer-calculator" },
                  { title: "NPK Calculator", href: "/tools/npk-calculator" },
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
