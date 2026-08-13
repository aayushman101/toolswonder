import type { Metadata } from "next";
import Link from "next/link";
import FertilizerCalculator from "@/components/tools/FertilizerCalculator";
import JsonLd, { buildToolSchema, buildFaqSchema, buildBreadcrumbSchema } from "@/components/seo/JsonLd";
import Breadcrumb from "@/components/layout/Breadcrumb";
import { ChevronRight } from "lucide-react";

const BASE_URL = "https://toolswonder.com";
const TOOL_URL = `${BASE_URL}/tools/fertilizer-per-hectare-calculator`;

export const metadata: Metadata = {
  title: "Fertilizer per Hectare Calculator – Urea, DAP, MOP Dose kg/ha",
  description:
    "Calculate total fertilizer quantity (Urea, DAP, MOP, SSP, NPK) for any number of hectares. Based on crop N, P, K requirements in kg/ha. Includes bag count and cost estimate.",
  keywords: [
    "fertilizer per hectare calculator",
    "fertilizer calculator per hectare",
    "urea per hectare",
    "dap per hectare",
    "mop per hectare",
    "fertilizer dose per hectare",
    "kg per hectare fertilizer",
    "fertilizer dose calculation per hectare",
    "fertilizer rate per hectare",
  ],
  alternates: { canonical: TOOL_URL },
  openGraph: {
    title: "Fertilizer per Hectare Calculator – Urea, DAP, MOP kg/ha | ToolsWonder",
    description: "Enter hectares and N-P-K requirement — get total Urea, DAP, MOP in kg and bags. Free fertilizer calculator.",
    url: TOOL_URL,
    type: "website",
  },
};

const faqs = [
  {
    question: "How do I calculate fertilizer for a given number of hectares?",
    answer: "Total fertilizer = Dose per hectare × Number of hectares. Enter N, P, K requirements per hectare and your total field area in hectares in the calculator above. For 5 hectares of rice needing 130 kg DAP/ha: Total DAP = 130 × 5 = 650 kg = 13 bags of 50 kg. The calculator handles this automatically for all fertilizer combinations.",
  },
  {
    question: "What is the standard fertilizer dose per hectare for cereals?",
    answer: "Standard doses (ICAR, medium soil fertility): Rice = 261 kg Urea + 130 kg DAP + 67 kg MOP per hectare. Wheat = 261 kg Urea + 130 kg DAP + 67 kg MOP per hectare. Maize = 326 kg Urea + 163 kg DAP + 83 kg MOP per hectare. These are the most commonly used figures before soil test results are available.",
  },
  {
    question: "How much fertilizer per hectare does sugarcane need?",
    answer: "Sugarcane (plant crop): 250 kg N + 100 kg P₂O₅ + 120 kg K₂O per hectare. Using DAP route: DAP = 217 kg/ha, Urea = 457 kg/ha, MOP = 200 kg/ha. Total = 874 kg fertilizer per hectare for one season. Ratoon crop needs 80% of this dose. Total fertilizer cost ≈ ₹20,000-25,000 per hectare.",
  },
  {
    question: "How many bags of Urea per hectare for rice?",
    answer: "Rice needs 261 kg Urea/ha. At 45 kg per bag: 261/45 = 5.8 bags — so 6 bags of Urea per hectare. These are split into 3 applications: 2-3 bags at transplanting, 1-2 bags at tillering (21-25 DAT), 1-2 bags at panicle initiation (45-50 DAT).",
  },
  {
    question: "Is fertilizer dose same for irrigated and rainfed crops?",
    answer: "No — irrigated crops receive higher fertilizer doses because they have higher yield potential and can use nutrients more efficiently. Rainfed crops get 60-75% of irrigated doses to avoid waste (nutrients may leach without controlled irrigation). The Crop Calculator tab has Low/Medium/High fertility options — choose 'Low' for rainfed dryland, 'High' for well-irrigated conditions.",
  },
  {
    question: "What is the cost of fertilizer per hectare for wheat?",
    answer: "Wheat per hectare (DAP route): DAP 130 kg × ₹27/kg = ₹3,510; Urea 261 kg × ₹6.5/kg = ₹1,697; MOP 67 kg × ₹17/kg = ₹1,139. Total ≈ ₹6,346 per hectare at MRP (2024). Market prices may be 10-20% higher. Use the Cost Optimizer tab to compare routes and enter actual local prices.",
  },
];

const perHaTable = [
  { crop: "Rice", urea: "261", dap: "130", mop: "67", totalKg: "458" },
  { crop: "Wheat", urea: "261", dap: "130", mop: "67", totalKg: "458" },
  { crop: "Maize", urea: "326", dap: "163", mop: "83", totalKg: "572" },
  { crop: "Sugarcane", urea: "457", dap: "217", mop: "200", totalKg: "874" },
  { crop: "Cotton", urea: "299", dap: "163", mop: "125", totalKg: "587" },
  { crop: "Potato", urea: "391", dap: "217", mop: "200", totalKg: "808" },
  { crop: "Soybean", urea: "65", dap: "130", mop: "67", totalKg: "262" },
  { crop: "Mustard", urea: "217", dap: "109", mop: "67", totalKg: "393" },
];

export default function FertilizerPerHectarePage() {
  return (
    <>
      <JsonLd data={buildToolSchema({ name: "Fertilizer per Hectare Calculator", description: "Calculate total fertilizer quantity (Urea, DAP, MOP) for any number of hectares based on crop NPK requirements.", url: TOOL_URL, category: "Agriculture" })} />
      <JsonLd data={buildFaqSchema(faqs)} />
      <JsonLd data={buildBreadcrumbSchema([
        { name: "Home", url: BASE_URL },
        { name: "Tools", url: `${BASE_URL}/tools` },
        { name: "Fertilizer Calculator", url: `${BASE_URL}/tools/fertilizer-calculator` },
        { name: "Fertilizer per Hectare Calculator", url: TOOL_URL },
      ])} />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumb items={[
          { label: "Tools", href: "/tools" },
          { label: "Fertilizer Calculator", href: "/tools/fertilizer-calculator" },
          { label: "Fertilizer per Hectare" },
        ]} />

        <div className="ad-slot my-4">Advertisement</div>

        <div className="lg:grid lg:grid-cols-[1fr_280px] lg:gap-8">
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">Fertilizer per Hectare Calculator</h1>
              <p className="mt-3 text-lg text-gray-600">
                Calculate total fertilizer for your field in hectares. Enter N, P, K requirements in
                kg/ha and total area — get exact Urea, DAP, MOP quantities in kg with bag count and
                cost. Switch to any other area unit (acre, bigha, guntha) in the dropdown.
              </p>
            </div>

            <FertilizerCalculator defaultTab="npk" />

            <div className="ad-slot">Advertisement</div>

            <section className="prose prose-gray max-w-none">
              <h2 className="text-2xl font-bold text-gray-900">Fertilizer Doses per Hectare — Standard Reference</h2>
              <p className="text-gray-600">Total fertilizer (DAP + Urea + MOP) per hectare for major crops at medium fertility (ICAR):</p>
              <div className="not-prose overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-green-50 text-left">
                      <th className="border border-gray-200 px-4 py-2.5 font-semibold">Crop</th>
                      <th className="border border-gray-200 px-4 py-2.5 font-semibold">Urea (kg/ha)</th>
                      <th className="border border-gray-200 px-4 py-2.5 font-semibold">DAP (kg/ha)</th>
                      <th className="border border-gray-200 px-4 py-2.5 font-semibold">MOP (kg/ha)</th>
                      <th className="border border-gray-200 px-4 py-2.5 font-semibold hidden sm:table-cell">Total (kg/ha)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {perHaTable.map(r => (
                      <tr key={r.crop} className="hover:bg-gray-50 border-b border-gray-100">
                        <td className="border-l border-r border-gray-200 px-4 py-2.5 font-medium">{r.crop}</td>
                        <td className="border-r border-gray-200 px-4 py-2.5">{r.urea}</td>
                        <td className="border-r border-gray-200 px-4 py-2.5">{r.dap}</td>
                        <td className="border-r border-gray-200 px-4 py-2.5">{r.mop}</td>
                        <td className="border-r border-gray-200 px-4 py-2.5 font-semibold text-green-700 hidden sm:table-cell">{r.totalKg}</td>
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
              <h3 className="mb-3 font-semibold text-gray-900">Bags per Hectare (Rice)</h3>
              <div className="space-y-2 text-sm">
                {[
                  { fert: "Urea (45 kg bag)", bags: "5.8 bags" },
                  { fert: "DAP (50 kg bag)", bags: "2.6 bags" },
                  { fert: "MOP (50 kg bag)", bags: "1.3 bags" },
                ].map(r => (
                  <div key={r.fert} className="flex justify-between">
                    <span className="text-gray-600">{r.fert}</span>
                    <span className="font-semibold text-gray-900">{r.bags}</span>
                  </div>
                ))}
                <p className="text-xs text-gray-400 pt-1">For rice 120-60-40 N-P-K at medium fertility</p>
              </div>
            </div>
            <div className="card p-5">
              <h3 className="mb-3 font-semibold text-gray-900">Related Tools</h3>
              <ul className="space-y-2 text-sm">
                {[
                  { title: "Fertilizer per Acre", href: "/tools/fertilizer-per-acre-calculator" },
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
