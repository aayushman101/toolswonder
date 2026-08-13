import type { Metadata } from "next";
import Link from "next/link";
import FertilizerCalculator from "@/components/tools/FertilizerCalculator";
import JsonLd, { buildToolSchema, buildFaqSchema, buildBreadcrumbSchema } from "@/components/seo/JsonLd";
import Breadcrumb from "@/components/layout/Breadcrumb";
import { ChevronRight } from "lucide-react";

const BASE_URL = "https://toolswonder.com";
const TOOL_URL = `${BASE_URL}/tools/fertilizer-cost-calculator`;

export const metadata: Metadata = {
  title: "Fertilizer Cost Calculator – Compare Fertilizer Costs per Acre & Hectare",
  description:
    "Free fertilizer cost calculator. Compare cost of DAP route vs SSP route vs NPK complex fertilizers for your crop. Enter local prices and field area to find the cheapest fertilizer combination.",
  keywords: [
    "fertilizer cost calculator",
    "fertilizer price calculator",
    "fertilizer cost per acre",
    "fertilizer cost per hectare",
    "cheapest fertilizer combination",
    "fertilizer expense calculator",
    "dap vs ssp cost comparison",
    "fertilizer budget calculator",
    "fertilizer cost India",
  ],
  alternates: { canonical: TOOL_URL },
  openGraph: {
    title: "Fertilizer Cost Calculator – Find Cheapest Fertilizer Combination | ToolsWonder",
    description: "Enter local fertilizer prices and find the cheapest N-P-K combination for your crop. Compare 4 fertilizer routes side by side.",
    url: TOOL_URL,
    type: "website",
  },
};

const faqs = [
  {
    question: "How do I calculate the total fertilizer cost per acre?",
    answer: "Total fertilizer cost per acre = Sum of (fertilizer qty per acre × price per kg) for each fertilizer used. Example for rice, 1 acre: DAP 52.6 kg × ₹27 = ₹1,420 + Urea 84.8 kg × ₹6.5 = ₹551 + MOP 27 kg × ₹17 = ₹459. Total = ₹2,430 per acre. Enter your local prices in the Cost Optimizer tab above for an accurate comparison.",
  },
  {
    question: "Which is cheaper — DAP route or SSP route for wheat?",
    answer: "SSP route is often cheaper per rupee of P₂O₅ supplied. Example for wheat (60 kg P₂O₅/ha): DAP route: 130 kg DAP × ₹27 = ₹3,510 (P cost). SSP route: 375 kg SSP × ₹7 = ₹2,625 (P cost) but requires more bags and labour. However SSP also provides 11% sulphur which has real value (~₹500/ha). The net cost difference is often minimal, but SSP wins on sulphur-deficient soils where extra sulphur dose would otherwise be needed.",
  },
  {
    question: "How much does fertilizer cost per hectare for rice in India?",
    answer: "At 2024 government MRP prices (medium fertility, DAP route): DAP 130 kg × ₹27 = ₹3,510 + Urea 261 kg × ₹6.5 = ₹1,697 + MOP 67 kg × ₹17 = ₹1,139. Total = ₹6,346/ha. Market prices are typically 10-25% higher than MRP, so actual cost is ₹7,000-8,000/ha. High-input irrigated rice can reach ₹9,000-12,000/ha including micronutrients.",
  },
  {
    question: "How to reduce fertilizer costs without reducing yield?",
    answer: "1) Get a soil test — avoid applying P or K if already adequate. 2) Use SSP instead of DAP where sulphur is also needed. 3) Apply 20-25% of N as organic (FYM, vermicompost) — reduces Urea need. 4) Use split application to improve NUE and reduce total dose. 5) Use nano-Urea (1 bottle = 500 ml replaces 1 bag of Urea for top-dressing). 6) Use government subsidy channels (e-PoS) to buy at MRP.",
  },
  {
    question: "What is the subsidized price of Urea, DAP, and MOP in India?",
    answer: "As of 2024, Government of India MRP: Urea = ₹266.50 per 45 kg bag (≈₹5.92/kg); DAP = ₹1,350 per 50 kg bag (₹27/kg); MOP = ₹1,700 per 50 kg bag (₹34/kg for imported); SSP = ₹350 per 50 kg bag (₹7/kg). All prices are heavily subsidized — actual cost to government is 2-4x higher. Prices at retail shops may include margins up to 5-8% above MRP legally.",
  },
  {
    question: "Is 10-26-26 NPK cheaper than separate DAP+MOP?",
    answer: "For crops needing high P and K (e.g., potato, cotton): 10-26-26 at ₹28/kg can sometimes match the DAP+MOP combo in per-nutrient cost. For 1 ha rice (60P + 40K): DAP 130 kg×₹27 + MOP 67kg×₹17 = ₹3,510+₹1,139 = ₹4,649. vs 10-26-26: 154 kg × ₹28 = ₹4,312 (but 10-26-26 only gives 15.4 kg N vs 23.4 kg N from DAP). Use the Cost Optimizer to compare all routes for your specific NPK requirement.",
  },
];

const costTable = [
  { crop: "Rice (1 ha)", dap: "₹6,346", ssp: "₹5,890", npk1026: "₹5,670", note: "SSP route incl. sulphur benefit" },
  { crop: "Wheat (1 ha)", dap: "₹6,346", ssp: "₹6,120", npk1026: "₹5,890", note: "Urea at ₹6.5/kg subsidy" },
  { crop: "Potato (1 ha)", dap: "₹11,200", ssp: "₹10,800", npk1026: "₹10,400", note: "High K cost dominates" },
  { crop: "Sugarcane (1 ha)", dap: "₹18,500", ssp: "₹17,200", npk1026: "₹17,800", note: "Over full season" },
  { crop: "Cotton (1 ha)", dap: "₹8,100", ssp: "₹7,800", npk1026: "₹7,600", note: "Medium season crop" },
];

export default function FertilizerCostCalculatorPage() {
  return (
    <>
      <JsonLd data={buildToolSchema({ name: "Fertilizer Cost Calculator", description: "Compare fertilizer costs across DAP, SSP, and NPK complex routes for any crop and area. Enter local prices for accurate comparison.", url: TOOL_URL, category: "Agriculture" })} />
      <JsonLd data={buildFaqSchema(faqs)} />
      <JsonLd data={buildBreadcrumbSchema([
        { name: "Home", url: BASE_URL },
        { name: "Tools", url: `${BASE_URL}/tools` },
        { name: "Fertilizer Calculator", url: `${BASE_URL}/tools/fertilizer-calculator` },
        { name: "Fertilizer Cost Calculator", url: TOOL_URL },
      ])} />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumb items={[
          { label: "Tools", href: "/tools" },
          { label: "Fertilizer Calculator", href: "/tools/fertilizer-calculator" },
          { label: "Fertilizer Cost Calculator" },
        ]} />

        <div className="ad-slot my-4">Advertisement</div>

        <div className="lg:grid lg:grid-cols-[1fr_280px] lg:gap-8">
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">Fertilizer Cost Calculator</h1>
              <p className="mt-3 text-lg text-gray-600">
                Find the cheapest fertilizer combination for your crop. Enter your N, P, K requirements,
                field area, and current local prices — the calculator ranks all fertilizer routes from
                cheapest to most expensive so you can save money without compromising on nutrition.
              </p>
            </div>

            <FertilizerCalculator defaultTab="cost" />

            <div className="ad-slot">Advertisement</div>

            <section className="prose prose-gray max-w-none">
              <h2 className="text-2xl font-bold text-gray-900">Fertilizer Cost Comparison by Crop</h2>
              <p className="text-gray-600">Approximate total fertilizer cost per hectare at 2024 MRP for different routes:</p>
              <div className="not-prose overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-amber-50 text-left">
                      <th className="border border-gray-200 px-4 py-2.5 font-semibold">Crop</th>
                      <th className="border border-gray-200 px-4 py-2.5 font-semibold">DAP+Urea+MOP</th>
                      <th className="border border-gray-200 px-4 py-2.5 font-semibold">SSP+Urea+MOP</th>
                      <th className="border border-gray-200 px-4 py-2.5 font-semibold">10-26-26 Route</th>
                      <th className="border border-gray-200 px-4 py-2.5 font-semibold hidden sm:table-cell">Note</th>
                    </tr>
                  </thead>
                  <tbody>
                    {costTable.map(r => (
                      <tr key={r.crop} className="hover:bg-gray-50 border-b border-gray-100">
                        <td className="border-l border-r border-gray-200 px-4 py-2.5 font-medium">{r.crop}</td>
                        <td className="border-r border-gray-200 px-4 py-2.5 font-semibold text-red-600">{r.dap}</td>
                        <td className="border-r border-gray-200 px-4 py-2.5 font-semibold text-green-700">{r.ssp}</td>
                        <td className="border-r border-gray-200 px-4 py-2.5 font-semibold text-blue-700">{r.npk1026}</td>
                        <td className="border-r border-gray-200 px-4 py-2.5 text-xs text-gray-500 hidden sm:table-cell">{r.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-gray-400 mt-1">Costs at GoI MRP (Urea ₹6.5/kg, DAP ₹27/kg, MOP ₹17/kg, SSP ₹7/kg). Enter your local prices above for accurate comparison.</p>
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
              <h3 className="mb-3 font-semibold text-gray-900">2024 Fertilizer MRP (India)</h3>
              <div className="space-y-2 text-sm">
                {[
                  { name: "Urea", price: "₹266.50/bag (45 kg)" },
                  { name: "DAP", price: "₹1,350/bag (50 kg)" },
                  { name: "MOP", price: "₹850/bag (50 kg)" },
                  { name: "SSP", price: "₹350/bag (50 kg)" },
                  { name: "10-26-26", price: "₹1,400/bag (50 kg)" },
                  { name: "17-17-17", price: "₹1,250/bag (50 kg)" },
                ].map(f => (
                  <div key={f.name} className="flex justify-between gap-2">
                    <span className="text-gray-600 shrink-0">{f.name}</span>
                    <span className="font-medium text-gray-900 text-right text-xs">{f.price}</span>
                  </div>
                ))}
                <p className="text-xs text-gray-400 pt-1">GoI notified MRP. Market may vary ±10%.</p>
              </div>
            </div>
            <div className="card p-5">
              <h3 className="mb-3 font-semibold text-gray-900">Related Tools</h3>
              <ul className="space-y-2 text-sm">
                {[
                  { title: "NPK Calculator", href: "/tools/npk-calculator" },
                  { title: "Fertilizer Blend Calculator", href: "/tools/fertilizer-blend-calculator" },
                  { title: "Crop Fertilizer Calculator", href: "/tools/crop-fertilizer-calculator" },
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
