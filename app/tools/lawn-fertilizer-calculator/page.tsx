import type { Metadata } from "next";
import Link from "next/link";
import LawnFertilizerCalculator from "@/components/tools/LawnFertilizerCalculator";
import JsonLd, { buildToolSchema, buildFaqSchema, buildBreadcrumbSchema } from "@/components/seo/JsonLd";
import Breadcrumb from "@/components/layout/Breadcrumb";
import { ChevronRight } from "lucide-react";

const BASE_URL = "https://toolswonder.com";
const TOOL_URL = `${BASE_URL}/tools/lawn-fertilizer-calculator`;

export const metadata: Metadata = {
  title: "Lawn Fertilizer Calculator – How Much Fertilizer for Your Lawn",
  description:
    "Free lawn fertilizer calculator. Enter lawn area and fertilizer NPK to get exact lbs needed, bag count, and cost. Covers 30-0-10, 16-4-8, Milorganite, Urea and more. US units (sq ft, acre).",
  keywords: [
    "lawn fertilizer calculator",
    "how much fertilizer for lawn",
    "lawn fertilizer amount calculator",
    "fertilizer calculator per square foot",
    "how much fertilizer per 1000 sq ft",
    "scotts fertilizer calculator",
    "lawn fertilizer schedule",
    "how much 20 10 10 fertilizer per acre",
    "lawn fertilizer calculator app",
    "how much fertilizer for lawn calculator",
  ],
  alternates: { canonical: TOOL_URL },
  openGraph: {
    title: "Lawn Fertilizer Calculator – Exact Lbs, Bags & Cost | ToolsWonder",
    description: "Calculate exactly how much lawn fertilizer you need. Enter sq ft and NPK — get lbs, bags, cost. Free.",
    url: TOOL_URL,
    type: "website",
  },
};

const faqs = [
  {
    question: "How much fertilizer do I need for my lawn?",
    answer: "It depends on your lawn size, the fertilizer's N%, and your target N rate. Formula: Product (lbs) = Area (sq ft) ÷ 1,000 × N rate (lbs/1,000 sq ft) ÷ (N% ÷ 100). Example: 5,000 sq ft lawn, 30-0-10 fertilizer (30% N), 1 lb N rate: Product = 5 × 1 ÷ 0.30 = 16.7 lbs. Our calculator does this instantly — enter your area and fertilizer above.",
  },
  {
    question: "How much fertilizer per 1,000 square feet?",
    answer: "With a 30-0-10 fertilizer (30% N) at 1 lb N per 1,000 sq ft: 1 ÷ 0.30 = 3.33 lbs product per 1,000 sq ft. With 16-4-8 (16% N) at 1 lb N: 1 ÷ 0.16 = 6.25 lbs per 1,000 sq ft. The lower the N%, the more product you need. Never exceed 1 lb actual N per 1,000 sq ft per application.",
  },
  {
    question: "What is the fertilizer calculation formula for lawns?",
    answer: "Product needed (lbs/1,000 sq ft) = N rate (lbs) ÷ N% (decimal). Total product (lbs) = Rate × Area ÷ 1,000. Bags = Total ÷ bag weight (round up). For 10,000 sq ft at 1 lb N/1,000 sqft using 30-0-10: Rate = 1÷0.30 = 3.33 lbs/1,000; Total = 3.33 × 10 = 33.3 lbs; Bags (40 lb bag) = ⌈33.3/40⌉ = 1 bag.",
  },
  {
    question: "How much 20-10-10 fertilizer per acre?",
    answer: "1 acre = 43,560 sq ft = 43.56 units of 1,000 sq ft. At 1 lb N per 1,000 sq ft: Product = 1 ÷ 0.20 = 5 lbs/1,000 sqft. Total per acre = 5 × 43.56 = 217.8 lbs/acre. At a lighter 0.5 lb N rate: 108.9 lbs/acre. The calculator handles acres directly — select 'Acre' in the unit dropdown.",
  },
  {
    question: "How often should I fertilize my lawn?",
    answer: "Cool-season grasses (fescue, bluegrass, ryegrass): 3-4 times/year — early spring (Mar-Apr), late spring (May), early fall (Sep), late fall (Nov). Skip summer. Warm-season grasses (bermuda, zoysia, St. Augustine): 3-5 times during growing season (May-Sep). Never fertilize warm-season grass in fall — it reduces winter hardiness.",
  },
  {
    question: "What is the best fertilizer for lawns?",
    answer: "Depends on your goal: Quick green-up → 32-0-6 or 30-0-10 (high N, fast release). Balanced season feeding → 16-4-8 or 12-12-12. Slow-release organic → Milorganite 6-4-0 (safe, won't burn). High potassium for stress/drought → 15-0-15. Budget N source → 46-0-0 Urea. Always do a soil test first — if P is adequate, use N-only fertilizers.",
  },
  {
    question: "What does 30-0-10 fertilizer mean?",
    answer: "30-0-10 means 30% Nitrogen (N), 0% Phosphorus (P₂O₅), 10% Potassium (K₂O) by weight. A 40 lb bag contains 40×0.30 = 12 lbs N and 40×0.10 = 4 lbs K. At 1 lb N per 1,000 sq ft, one 40 lb bag covers 12,000 sq ft. At 0.5 lb N rate, it covers 24,000 sq ft.",
  },
  {
    question: "Can I over-fertilize my lawn?",
    answer: "Yes — over-fertilizing causes fertilizer burn (brown streaks), excessive thatch buildup, nutrient runoff into waterways, and wasted money. Max safe rate is 1 lb actual N per 1,000 sq ft per application. Slow-release fertilizers (organic or polymer-coated) are more forgiving. Water immediately after applying granular fertilizer to prevent leaf burn.",
  },
];

export default function LawnFertilizerCalculatorPage() {
  return (
    <>
      <JsonLd data={buildToolSchema({ name: "Lawn Fertilizer Calculator", description: "Calculate exact lawn fertilizer quantity in lbs and bags. Enter area and NPK — get instant results for any grass type.", url: TOOL_URL, category: "Home & Garden" })} />
      <JsonLd data={buildFaqSchema(faqs)} />
      <JsonLd data={buildBreadcrumbSchema([
        { name: "Home", url: BASE_URL },
        { name: "Tools", url: `${BASE_URL}/tools` },
        { name: "Fertilizer Calculator", url: `${BASE_URL}/tools/fertilizer-calculator` },
        { name: "Lawn Fertilizer Calculator", url: TOOL_URL },
      ])} />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumb items={[
          { label: "Tools", href: "/tools" },
          { label: "Fertilizer Calculator", href: "/tools/fertilizer-calculator" },
          { label: "Lawn Fertilizer Calculator" },
        ]} />

        <div className="ad-slot my-4">Advertisement</div>

        <div className="lg:grid lg:grid-cols-[1fr_280px] lg:gap-8">
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">Lawn Fertilizer Calculator</h1>
              <p className="mt-3 text-lg text-gray-600">
                Calculate exactly how much fertilizer your lawn needs. Enter your lawn area (sq ft or acre),
                pick a fertilizer (30-0-10, 16-4-8, Milorganite, Urea, or custom NPK), and set your
                nitrogen rate. Get exact product weight, bags to buy, and total cost — instantly.
              </p>
            </div>

            <LawnFertilizerCalculator />

            <div className="ad-slot">Advertisement</div>

            <section className="prose prose-gray max-w-none">
              <h2 className="text-2xl font-bold text-gray-900">Lawn Fertilizer Formula Explained</h2>
              <p className="text-gray-600">The key calculation is working backwards from how much nitrogen (N) you want to apply:</p>
              <div className="not-prose rounded-xl bg-gray-900 p-5 font-mono text-sm overflow-x-auto">
                <div className="text-gray-400 mb-1"># Step 1: Product rate per 1,000 sq ft</div>
                <div className="text-green-400">Product (lbs/1000 sqft) = N rate (lbs) ÷ (N% ÷ 100)</div>
                <div className="text-gray-400 mt-3 mb-1"># Step 2: Total product for your lawn</div>
                <div className="text-green-400">Total (lbs) = Rate × (Lawn sq ft ÷ 1,000)</div>
                <div className="text-gray-400 mt-3 mb-1"># Step 3: Bags needed</div>
                <div className="text-green-400">Bags = ⌈Total lbs ÷ Bag weight⌉  (round up)</div>
                <div className="text-gray-400 mt-4 mb-1"># Example: 5,000 sq ft, 30-0-10, 1 lb N rate</div>
                <div className="text-yellow-400">Rate = 1 ÷ 0.30 = 3.33 lbs/1,000 sq ft</div>
                <div className="text-yellow-400">Total = 3.33 × 5 = 16.7 lbs</div>
                <div className="text-yellow-400">Bags (40 lb) = ⌈16.7/40⌉ = 1 bag</div>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mt-10">Common Fertilizer Coverage per Bag</h2>
              <div className="not-prose overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-green-50 text-left">
                      <th className="border border-gray-200 px-4 py-2.5 font-semibold">Fertilizer</th>
                      <th className="border border-gray-200 px-4 py-2.5 font-semibold">N%</th>
                      <th className="border border-gray-200 px-4 py-2.5 font-semibold">Bag Size</th>
                      <th className="border border-gray-200 px-4 py-2.5 font-semibold">Coverage @ 1 lb N</th>
                      <th className="border border-gray-200 px-4 py-2.5 font-semibold">Coverage @ 0.5 lb N</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { fert: "30-0-10", n: 30, bag: "40 lb", cov1: "12,000 sq ft", cov05: "24,000 sq ft" },
                      { fert: "16-4-8", n: 16, bag: "40 lb", cov1: "6,400 sq ft", cov05: "12,800 sq ft" },
                      { fert: "24-0-6", n: 24, bag: "40 lb", cov1: "9,600 sq ft", cov05: "19,200 sq ft" },
                      { fert: "46-0-0 Urea", n: 46, bag: "50 lb", cov1: "23,000 sq ft", cov05: "46,000 sq ft" },
                      { fert: "6-4-0 Milorganite", n: 6, bag: "36 lb", cov1: "2,160 sq ft", cov05: "4,320 sq ft" },
                      { fert: "12-12-12", n: 12, bag: "40 lb", cov1: "4,800 sq ft", cov05: "9,600 sq ft" },
                    ].map(r => (
                      <tr key={r.fert} className="hover:bg-gray-50 border-b border-gray-100">
                        <td className="border-l border-r border-gray-200 px-4 py-2.5 font-medium">{r.fert}</td>
                        <td className="border-r border-gray-200 px-4 py-2.5 text-green-700 font-semibold">{r.n}%</td>
                        <td className="border-r border-gray-200 px-4 py-2.5">{r.bag}</td>
                        <td className="border-r border-gray-200 px-4 py-2.5">{r.cov1}</td>
                        <td className="border-r border-gray-200 px-4 py-2.5">{r.cov05}</td>
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
              <h3 className="mb-3 font-semibold text-gray-900">N Rates by Grass</h3>
              <div className="space-y-2 text-xs">
                {[
                  { grass: "Kentucky Bluegrass", rate: "2–4 lbs N/yr" },
                  { grass: "Tall Fescue", rate: "2–3 lbs N/yr" },
                  { grass: "Bermudagrass", rate: "4–6 lbs N/yr" },
                  { grass: "St. Augustine", rate: "3–5 lbs N/yr" },
                  { grass: "Zoysia", rate: "2–4 lbs N/yr" },
                  { grass: "Centipede", rate: "1–2 lbs N/yr" },
                ].map(g => (
                  <div key={g.grass} className="flex justify-between">
                    <span className="text-gray-600">{g.grass}</span>
                    <span className="font-medium text-gray-900">{g.rate}</span>
                  </div>
                ))}
                <p className="text-gray-400 pt-1">lbs N per 1,000 sq ft per year</p>
              </div>
            </div>
            <div className="card p-5">
              <h3 className="mb-3 font-semibold text-gray-900">Related Tools</h3>
              <ul className="space-y-2 text-sm">
                {[
                  { title: "Liquid Fertilizer Calculator", href: "/tools/liquid-fertilizer-calculator" },
                  { title: "Dry Fertilizer Calculator", href: "/tools/dry-fertilizer-calculator" },
                  { title: "Fertilizer per Acre", href: "/tools/fertilizer-per-acre-calculator" },
                  { title: "NPK Calculator", href: "/tools/npk-calculator" },
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
