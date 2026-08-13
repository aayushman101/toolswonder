import type { Metadata } from "next";
import Link from "next/link";
import PigFarmCalculator from "@/components/tools/PigFarmCalculator";
import JsonLd, { buildToolSchema, buildFaqSchema, buildBreadcrumbSchema } from "@/components/seo/JsonLd";
import Breadcrumb from "@/components/layout/Breadcrumb";
import { ChevronRight, Sprout } from "lucide-react";

const BASE_URL = "https://toolswonder.com";
const TOOL_URL = `${BASE_URL}/tools/pig-farm-profit-calculator`;

export const metadata: Metadata = {
  title: "Pig Farm Profit Calculator – Cost & Income of Starting a Pig Farm",
  description: "Free pig farm profit calculator. Enter number of sows, piglets per litter, market weight, feed conversion ratio, and costs to calculate annual revenue, profit per pig, and payback period.",
  keywords: ["pig farm profit calculator", "pig farming profit", "how to start a pig farm", "pig farming cost calculator", "pig farm income", "swine farm calculator"],
  alternates: { canonical: TOOL_URL },
  openGraph: {
    title: "Pig Farm Profit Calculator – Cost & Income of Starting a Pig Farm | ToolsWonder",
    description: "Calculate pig farm annual profit, cost per pig, and payback period. Enter sows, litter size, FCR, market weight, and prices.",
    url: TOOL_URL,
    type: "website",
  },
};

const faqs = [
  { question: "How much does it cost to start a pig farm?", answer: "Starting a small pig farm with 10 sows in India costs roughly: Sows (₹15,000 × 10) = ₹1,50,000, a boar or AI fees = ₹20,000–₹30,000, housing and pens (₹1,000–2,000 per pig capacity) = ₹2,00,000+, equipment = ₹30,000–₹50,000. Total: ₹4–6 lakh for 10 sows. Feed cost is the largest ongoing expense — budget ₹25–30/kg for commercial pig feed." },
  { question: "How profitable is pig farming?", answer: "A 10-sow farm producing 2.2 litters/year at 10 piglets each with 8% mortality yields ~202 pigs/year. Sold at 100 kg × ₹150/kg = ₹15,000/pig, total revenue is ₹30,30,000/year. Feed cost (FCR 2.8, ₹25/kg per pig) = ₹7,00,000, vet ₹60,600, labor ₹1,44,000 — net profit ~₹22,25,000/year, about ₹1.85 lakh/month. Pig farming is one of the fastest-return livestock businesses due to high litter sizes." },
  { question: "How many piglets does a sow produce per year?", answer: "A well-managed sow produces 2–2.5 litters/year. Average litter size is 8–12 piglets (improved breeds like Large White × Landrace can reach 12–14). With an 8% pre-weaning mortality, a sow averages 18–22 pigs marketed per year. Our calculator defaults to 2.2 litters × 10 piglets × 92% survival = ~20 pigs/sow/year, which is achievable with good management." },
  { question: "What is the FCR (Feed Conversion Ratio) for pigs?", answer: "FCR measures kg of feed needed per kg of live weight gain. For commercial pigs: starter (0–25 kg): FCR 1.4–1.8, grower (25–60 kg): FCR 2.2–2.6, finisher (60–100 kg): FCR 2.8–3.2. Overall FCR from weaning to 100 kg market weight is typically 2.5–3.0. Our calculator defaults to 2.8. Lower FCR means better feed efficiency — good genetics and feed quality can achieve 2.4–2.6 FCR." },
  { question: "What is the best pig breed for profit in India?", answer: "Large White Yorkshire × Landrace cross is most popular — fast-growing, good FCR, 10–12 piglets/litter. Hampshire is good for lean meat. Duroc crosses are valued for meat quality. Indigenous breeds like Ghungroo (Assam) and Niang Megha (Meghalaya) are hardy and disease-resistant, better for low-input farming. For maximum profit, cross-bred pigs (improved × desi) balance growth performance with adaptability to local conditions." },
  { question: "How long does it take a pig to reach market weight?", answer: "From weaning (3–4 weeks old, ~8 kg) to 100 kg market weight takes 140–180 days on commercial diets. Total from birth to market: 5.5–7 months. Improved breeds reach 100 kg faster (140–160 days), local breeds take 200–240 days. To reach 90 kg in 170 days, pigs need average daily gain (ADG) of around 530–560 g/day. Our calculator uses 170 days as the default, which is achievable with crossbred pigs on quality feed." },
];

const relatedTools = [
  { title: "Cattle Record Keeping", href: "/tools/cattle-record-keeping", desc: "Track herd and calculate dairy or beef farm profit" },
  { title: "Goat Farm Profit Calculator", href: "/tools/goat-farm-profit-calculator", desc: "Annual profit and payback period for goat farming" },
  { title: "Crop Fertilizer Calculator", href: "/tools/crop-fertilizer-calculator", desc: "ICAR-recommended NPK doses for 25+ crops" },
  { title: "Fertilizer Calculator", href: "/tools/fertilizer-calculator", desc: "Complete fertilizer planner for any crop and area" },
];

export default function PigFarmProfitCalculatorPage() {
  return (
    <>
      <JsonLd data={buildToolSchema({ name: "Pig Farm Profit Calculator", description: "Calculate annual profit, cost per pig, and payback period for a pig farm. Enter sows, litter size, FCR, market weight, and prices.", url: TOOL_URL, category: "Agriculture" })} />
      <JsonLd data={buildFaqSchema(faqs)} />
      <JsonLd data={buildBreadcrumbSchema([
        { name: "Home", url: BASE_URL },
        { name: "Tools", url: `${BASE_URL}/tools` },
        { name: "Agriculture", url: `${BASE_URL}/tools?category=agriculture` },
        { name: "Pig Farm Profit Calculator", url: TOOL_URL },
      ])} />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumb items={[
          { label: "Tools", href: "/tools" },
          { label: "Agriculture", href: "/tools?category=agriculture" },
          { label: "Pig Farm Profit Calculator" },
        ]} />
        <div className="ad-slot my-4">Advertisement</div>
        <div className="lg:grid lg:grid-cols-[1fr_300px] lg:gap-8">
          <div className="space-y-8">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
                  <Sprout className="h-3.5 w-3.5" /> Agriculture
                </span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 sm:text-4xl">Pig Farm Profit Calculator</h1>
              <p className="mt-3 text-lg text-gray-600 dark:text-gray-400">Calculate the profitability of starting or running a pig farm. Enter number of sows, litter size, feed conversion ratio, market weight, and selling price — get annual revenue, profit per pig, and payback period for your investment.</p>
            </div>

            <PigFarmCalculator />

            <div className="ad-slot">Advertisement</div>

            <section className="prose prose-gray max-w-none dark:prose-invert">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">How to Calculate Pig Farm Profit</h2>
              <p className="text-gray-600 dark:text-gray-400">Pig farming profitability comes down to two key numbers: the number of pigs you can market per year, and the margin per pig (selling price minus cost to raise). Feed typically makes up 65–70% of total costs, so FCR — how efficiently your pigs convert feed to weight — is the most important metric to manage.</p>
              <div className="not-prose rounded-xl bg-gray-900 p-5 font-mono text-sm text-green-400">
                <div className="text-gray-400 mb-1"># Annual pigs marketed</div>
                <div>Pigs/Year = Sows × Litters/Sow × Piglets/Litter × (1 − Mortality%)</div>
                <div className="mt-2 text-gray-400"># Revenue per pig</div>
                <div>Revenue/Pig = Market Weight (kg) × Selling Price (₹/kg)</div>
                <div className="mt-2 text-gray-400"># Feed cost per pig</div>
                <div>Feed Cost/Pig = Market Weight × FCR × Feed Price (₹/kg)</div>
                <div className="mt-2 text-gray-400"># Net profit</div>
                <div className="text-yellow-400">Profit = Total Revenue − (Feed + Vet + Labor)</div>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-8">Feed Conversion Ratio (FCR) Guide</h2>
              <p className="text-gray-600 dark:text-gray-400">FCR is the kg of feed required to produce 1 kg of live weight gain. A lower FCR means more efficient feed use and higher margins. Commercial pig FCR typically ranges from 2.5 to 3.2 overall.</p>
              <div className="not-prose overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-gray-50 dark:bg-gray-800 text-left">
                      <th className="border border-gray-200 dark:border-gray-700 px-4 py-2 font-semibold">FCR Range</th>
                      <th className="border border-gray-200 dark:border-gray-700 px-4 py-2 font-semibold">Performance Level</th>
                      <th className="border border-gray-200 dark:border-gray-700 px-4 py-2 font-semibold">Typical Context</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["< 2.5", "Excellent", "Premium genetics, optimized diet, controlled environment"],
                      ["2.5–2.8", "Good", "Improved crossbreds, commercial feed, good management"],
                      ["2.8–3.2", "Average", "Standard crossbreds, local commercial feed"],
                      ["3.2–3.8", "Below average", "Local breeds, inconsistent feed quality"],
                      ["> 3.8", "Poor", "Backyard feeding, kitchen waste-based diet"],
                    ].map(([fcr, level, context]) => (
                      <tr key={fcr} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-2 font-semibold text-green-700 dark:text-green-400">{fcr}</td>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-2 font-medium">{level}</td>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-2 text-gray-600 dark:text-gray-400">{context}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-8">Pig Farming Startup Cost in India</h2>
              <div className="not-prose overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-gray-50 dark:bg-gray-800 text-left">
                      <th className="border border-gray-200 dark:border-gray-700 px-4 py-2 font-semibold">Cost Item</th>
                      <th className="border border-gray-200 dark:border-gray-700 px-4 py-2 font-semibold">Small (10 sows)</th>
                      <th className="border border-gray-200 dark:border-gray-700 px-4 py-2 font-semibold">Medium (25 sows)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["Sow purchase", "₹1,50,000", "₹3,75,000"],
                      ["Housing & pens", "₹2,00,000–3,00,000", "₹4,50,000–6,00,000"],
                      ["Equipment & feeders", "₹40,000–60,000", "₹80,000–1,20,000"],
                      ["Initial feed stock", "₹30,000–50,000", "₹70,000–1,00,000"],
                      ["Total estimate", "₹4.2–6 lakh", "₹9.5–12 lakh"],
                    ].map(([item, small, med]) => (
                      <tr key={item} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-2 font-medium">{item}</td>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-2 text-green-700 dark:text-green-400 font-medium">{small}</td>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-2 text-green-700 dark:text-green-400 font-medium">{med}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-gray-100">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {faqs.map((f, i) => (
                  <div key={i} className="card p-5">
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100">{f.question}</h3>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{f.answer}</p>
                  </div>
                ))}
              </div>
            </section>

            <div className="ad-slot">Advertisement</div>
          </div>

          <aside className="mt-8 space-y-6 lg:mt-0">
            <div className="ad-slot h-[250px]">Advertisement</div>
            <div className="card p-5">
              <h3 className="mb-3 font-semibold text-gray-900 dark:text-gray-100">Pig Farm Benchmarks</h3>
              <div className="space-y-2 text-xs">
                {[
                  ["Litters / sow / year", "2.0–2.5"],
                  ["Piglets per litter (improved)", "10–14"],
                  ["Days to 100 kg market wt.", "160–180 days"],
                  ["FCR (weaning to market)", "2.5–3.0"],
                  ["Selling price (live wt.)", "₹130–180/kg"],
                  ["Feed cost", "₹22–30/kg"],
                ].map(([s, v]) => (
                  <div key={s} className="flex justify-between gap-2">
                    <span className="text-gray-500 dark:text-gray-400">{s}</span>
                    <span className="font-semibold text-green-700 dark:text-green-400 text-right">{v}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="card p-5">
              <h3 className="mb-4 font-semibold text-gray-900 dark:text-gray-100">Related Agriculture Tools</h3>
              <ul className="space-y-3">
                {relatedTools.map((t) => (
                  <li key={t.href}>
                    <Link href={t.href} className="group flex items-start gap-2">
                      <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-green-500 group-hover:translate-x-0.5 transition-transform" />
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-gray-100 group-hover:text-green-600 transition-colors">{t.title}</div>
                        <div className="text-xs text-gray-500">{t.desc}</div>
                      </div>
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
