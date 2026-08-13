import type { Metadata } from "next";
import Link from "next/link";
import CattleRecordKeeping from "@/components/tools/CattleRecordKeeping";
import JsonLd, { buildToolSchema, buildFaqSchema, buildBreadcrumbSchema } from "@/components/seo/JsonLd";
import Breadcrumb from "@/components/layout/Breadcrumb";
import { ChevronRight, Sprout } from "lucide-react";

const BASE_URL = "https://toolswonder.com";
const TOOL_URL = `${BASE_URL}/tools/cattle-record-keeping`;

export const metadata: Metadata = {
  title: "Cattle Record Keeping – Track Herd & Calculate Farm Profit",
  description: "Free cattle record keeping calculator. Track your herd size, milk production, beef sales, feed and labor costs. Get monthly and annual profit summary for your dairy or beef farm.",
  keywords: ["cattle record keeping", "cattle record keeping app", "beef cattle record keeping", "dairy farm profit calculator", "cattle farm income calculator", "cow farm profit"],
  alternates: { canonical: TOOL_URL },
  openGraph: {
    title: "Cattle Record Keeping – Track Herd & Calculate Farm Profit | ToolsWonder",
    description: "Track herd size, milk production, beef sales, and costs. Get monthly and annual profit for your dairy, beef, or mixed cattle farm.",
    url: TOOL_URL,
    type: "website",
  },
};

const faqs = [
  { question: "How do I keep records for cattle?", answer: "Good cattle records should cover herd composition (number of cows, bulls, heifers, calves), milk production for dairy farms, cattle sold per year with weight and price, monthly feed costs per animal, veterinary expenses, and labor costs. Our calculator lets you enter all these details and instantly shows your monthly and annual profit." },
  { question: "How many litres of milk does a cow produce per day?", answer: "A typical Indian crossbred cow (HF/Jersey cross) produces 10–20 litres per day. High-yielding Holstein Friesian cows can produce 25–35 litres/day. Indigenous breeds like Gir or Sahiwal give 8–15 litres/day. The national average in India is about 7–8 litres/day. Our calculator defaults to 15 litres/day for a crossbred herd." },
  { question: "What is the average profit from a dairy farm in India?", answer: "For a 10-cow dairy farm selling milk at ₹35/litre, with each cow producing 15 litres/day, monthly milk revenue is about ₹1,57,500. After feed (₹2,500/animal/month = ₹25,000), vet (₹500/animal/year ≈ ₹417/month), and one full-time laborer (₹15,000/month), net profit is roughly ₹1,17,000/month or ₹14 lakh/year. Actual results vary by herd quality and local prices." },
  { question: "How much feed does a cow eat per day?", answer: "A lactating dairy cow needs 2.5–3 kg of dry matter per 100 kg of body weight. A 400 kg cow eating 12 kg dry matter needs roughly 50–60 kg of green fodder or 8–10 kg of dry fodder plus 3–4 kg of concentrate feed. Monthly feed cost in India typically ranges from ₹2,000–₹3,500 per animal depending on fodder availability and concentrate prices." },
  { question: "What records should a beef cattle farm maintain?", answer: "Beef cattle records should include: purchase weight and date for each animal, monthly weight gains, feed consumed, vaccination dates and vet bills, and final sale weight and price. Key performance indicators are average daily gain (target 0.8–1.2 kg/day for crossbreds), feed conversion ratio, and cost per kg of gain. Our calculator estimates annual revenue from cattle sales based on number sold, average weight, and price per kg." },
  { question: "How profitable is cattle farming?", answer: "Profitability depends heavily on herd type and scale. Dairy farming with 10 milking cows at ₹35/litre typically yields ₹10–15 lakh/year net profit. Beef/bullock farming is less predictable — buy young animals at ₹20,000, fatten for 12–18 months, sell at 300+ kg for ₹45,000+, netting ₹8,000–15,000 per animal after feed and vet costs. Mixed farms often perform better by diversifying income." },
];

const relatedTools = [
  { title: "Goat Farm Profit Calculator", href: "/tools/goat-farm-profit-calculator", desc: "Annual profit and payback period for goat farming" },
  { title: "Pig Farm Profit Calculator", href: "/tools/pig-farm-profit-calculator", desc: "Pig farm revenue, costs, and profit per pig" },
  { title: "Crop Fertilizer Calculator", href: "/tools/crop-fertilizer-calculator", desc: "ICAR-recommended NPK doses for 25+ crops" },
  { title: "Fertilizer Calculator", href: "/tools/fertilizer-calculator", desc: "Complete fertilizer planner with split schedule" },
];

export default function CattleRecordKeepingPage() {
  return (
    <>
      <JsonLd data={buildToolSchema({ name: "Cattle Record Keeping", description: "Track herd size, milk production, beef sales, and costs. Get monthly and annual profit for dairy, beef, or mixed cattle farms.", url: TOOL_URL, category: "Agriculture" })} />
      <JsonLd data={buildFaqSchema(faqs)} />
      <JsonLd data={buildBreadcrumbSchema([
        { name: "Home", url: BASE_URL },
        { name: "Tools", url: `${BASE_URL}/tools` },
        { name: "Agriculture", url: `${BASE_URL}/tools?category=agriculture` },
        { name: "Cattle Record Keeping", url: TOOL_URL },
      ])} />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumb items={[
          { label: "Tools", href: "/tools" },
          { label: "Agriculture", href: "/tools?category=agriculture" },
          { label: "Cattle Record Keeping" },
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
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 sm:text-4xl">Cattle Record Keeping</h1>
              <p className="mt-3 text-lg text-gray-600 dark:text-gray-400">Track your cattle herd and calculate farm profitability. Enter herd size, milk production, beef sales, feed, vet, and labor costs — get monthly and annual profit for dairy, beef, or mixed farms instantly.</p>
            </div>

            <CattleRecordKeeping />

            <div className="ad-slot">Advertisement</div>

            <section className="prose prose-gray max-w-none dark:prose-invert">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Why Keep Cattle Farm Records?</h2>
              <p className="text-gray-600 dark:text-gray-400">Systematic cattle record keeping is the difference between a profitable farm and one that looks busy but loses money. Records help you identify which animals produce the most, track whether feed costs are eating your margins, and plan herd expansions with real numbers instead of guesswork.</p>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-8">Key Records Every Cattle Farm Needs</h2>
              <div className="not-prose overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-gray-50 dark:bg-gray-800 text-left">
                      <th className="border border-gray-200 dark:border-gray-700 px-4 py-2 font-semibold">Record Type</th>
                      <th className="border border-gray-200 dark:border-gray-700 px-4 py-2 font-semibold">What to Track</th>
                      <th className="border border-gray-200 dark:border-gray-700 px-4 py-2 font-semibold">Why It Matters</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["Herd register", "Animal ID, breed, age, sex, date acquired", "Inventory control, insurance, compliance"],
                      ["Milk production", "Litres per cow per day, monthly totals", "Identify top/low producers, calculate revenue"],
                      ["Feed consumption", "Kg feed per animal per month, feed cost", "Largest expense — key to margin management"],
                      ["Health & vet", "Vaccination dates, illnesses, vet costs", "Disease control, government subsidy claims"],
                      ["Cattle sales/purchases", "Animal, weight, price, buyer/seller", "Income tracking, herd performance over time"],
                      ["Reproduction", "Breeding dates, calving, calf mortality", "Calving interval, lifetime productivity"],
                    ].map(([type, track, why]) => (
                      <tr key={type} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-2 font-medium">{type}</td>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-2 text-gray-600 dark:text-gray-400">{track}</td>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-2 text-gray-600 dark:text-gray-400">{why}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-8">Cattle Farm Profit Formula</h2>
              <div className="not-prose rounded-xl bg-gray-900 p-5 font-mono text-sm text-green-400">
                <div className="text-gray-400 mb-1"># Monthly dairy revenue</div>
                <div>Milk Revenue = No. of Cows × Litres/Day × 30 × Milk Price (₹/L)</div>
                <div className="mt-2 text-gray-400"># Monthly costs</div>
                <div>Feed Cost = Total Animals × Feed Cost per Animal per Month</div>
                <div>Vet Cost = Total Animals × Annual Vet Cost ÷ 12</div>
                <div className="mt-2 text-gray-400"># Monthly profit</div>
                <div className="text-yellow-400">Profit = (Milk + Beef Revenue) − (Feed + Vet + Labor)</div>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-8">Typical Cattle Farm Benchmarks (India)</h2>
              <div className="not-prose overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-gray-50 dark:bg-gray-800 text-left">
                      <th className="border border-gray-200 dark:border-gray-700 px-4 py-2 font-semibold">Metric</th>
                      <th className="border border-gray-200 dark:border-gray-700 px-4 py-2 font-semibold">Dairy Farm</th>
                      <th className="border border-gray-200 dark:border-gray-700 px-4 py-2 font-semibold">Beef / Mixed Farm</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["Milk yield (crossbred)", "12–20 L/cow/day", "—"],
                      ["Milk price", "₹30–40/L", "—"],
                      ["Feed cost", "₹2,000–3,500/animal/month", "₹1,500–2,500/animal/month"],
                      ["Vet cost", "₹400–700/animal/year", "₹300–500/animal/year"],
                      ["Sell weight (beef)", "—", "250–400 kg"],
                      ["Sell price (live wt.)", "—", "₹130–180/kg"],
                    ].map(([metric, dairy, beef]) => (
                      <tr key={metric} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-2 font-medium">{metric}</td>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-2 text-green-700 dark:text-green-400 font-medium">{dairy}</td>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-2 text-green-700 dark:text-green-400 font-medium">{beef}</td>
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
              <h3 className="mb-3 font-semibold text-gray-900 dark:text-gray-100">Typical Benchmarks</h3>
              <div className="space-y-2 text-xs">
                {[
                  ["Milk / cow / day (crossbred)", "12–18 L"],
                  ["Milk price (India avg)", "₹30–40/L"],
                  ["Feed / dairy cow / month", "₹2,000–3,500"],
                  ["Beef sell weight", "250–400 kg"],
                  ["Beef price (live weight)", "₹130–180/kg"],
                  ["Vet cost / animal / year", "₹400–700"],
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
