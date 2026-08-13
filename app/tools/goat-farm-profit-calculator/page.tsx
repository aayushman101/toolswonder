import type { Metadata } from "next";
import Link from "next/link";
import GoatFarmCalculator from "@/components/tools/GoatFarmCalculator";
import JsonLd, { buildToolSchema, buildFaqSchema, buildBreadcrumbSchema } from "@/components/seo/JsonLd";
import Breadcrumb from "@/components/layout/Breadcrumb";
import { ChevronRight, Sprout } from "lucide-react";

const BASE_URL = "https://toolswonder.com";
const TOOL_URL = `${BASE_URL}/tools/goat-farm-profit-calculator`;

export const metadata: Metadata = {
  title: "Goat Farm Profit Calculator – Cost & Income of Starting a Goat Farm",
  description: "Free goat farm profit calculator. Enter herd size, meat/milk prices, feed and labor costs to calculate annual revenue, expenses, net profit, and payback period for your goat farm.",
  keywords: ["goat farm profit calculator", "goat farming profit", "how to start a goat farm", "goat farm income calculator", "goat farming cost calculator", "goat farm business plan"],
  alternates: { canonical: TOOL_URL },
  openGraph: {
    title: "Goat Farm Profit Calculator – Cost & Income of Starting a Goat Farm | ToolsWonder",
    description: "Calculate annual profit, costs, and payback period for goat farming. Supports meat, milk, or mixed goat farms.",
    url: TOOL_URL,
    type: "website",
  },
};

const faqs = [
  { question: "How much does it cost to start a goat farm?", answer: "Starting a small goat farm with 20 does and 2 bucks in India typically costs: Goats (₹5,000 × 22) = ₹1,10,000, housing and fencing = ₹80,000–₹1,50,000, equipment = ₹20,000–₹40,000. Total initial investment: ₹2–3 lakh for a small farm. A medium farm with 50 does can cost ₹5–8 lakh. Costs vary significantly by breed (local breeds are cheaper; Boer or Sirohi cost more) and region." },
  { question: "How profitable is goat farming?", answer: "A 20-doe meat goat farm producing 1.8 kids per doe per year (36 kids) at 25 kg and ₹400/kg earns ₹3,60,000/year in meat revenue. Annual operating costs for feed (₹500/goat/month × 22 × 12 = ₹1,32,000), vet (₹300 × 22 = ₹6,600), and labor (₹8,000 × 12 = ₹96,000) total ~₹2,35,000, leaving a net profit of ~₹1,25,000/year. Returns improve significantly with better breeds and dual-purpose (meat + milk) production." },
  { question: "How many kids does a goat produce per year?", answer: "Most goat breeds kid once or twice a year. Indian breeds like Jamunapari, Barbari, and Beetal typically produce 1–2 kids per kidding, with 1–2 kiddings/year. Average is 1.5–2 kids per doe per year accounting for mortality. With good management and improved breeds, some farms achieve 2.0–2.5 surviving kids per doe per year. Our calculator defaults to 1.8, which is realistic for managed small farms." },
  { question: "What is the best breed of goat for profit?", answer: "For meat: Boer (fast-growing, 40–50 kg at 6 months), Black Bengal (hardy, prolific, good meat quality), Sirohi, and Osmanabadi are popular in India. For milk: Saanen (2–4 L/day), Jamunapari (1.5–2.5 L/day), Alpine. For dual purpose: Beetal and Barbari are widely recommended. Local cross-bred goats typically give the best ROI for small farmers due to lower purchase price and disease resistance." },
  { question: "How much milk does a goat produce per day?", answer: "Milk production varies greatly by breed: Saanen/Alpine: 2–4 L/day over 240–300 day lactation. Jamunapari: 1.5–2.5 L/day, 250 days. Beetal: 1–2 L/day. Local breeds: 0.5–1 L/day. Goat milk sells for ₹50–100/L in India depending on location, compared to cow milk at ₹35–45/L. Our calculator defaults to 1.5 L/doe/day for 240 days, which is conservative for improved breeds." },
  { question: "What are the main costs in goat farming?", answer: "Feed is typically the largest cost at 50–60% of operating expenses. A goat needs 2–4% of body weight in dry matter daily. For a 20 kg goat: 400–800 g of concentrate + green fodder. At ₹500/goat/month, a 22-goat farm spends ₹11,000/month on feed. Other costs include veterinary and medication (₹300–500/goat/year), labor (₹6,000–12,000/month for one worker), and infrastructure maintenance (5–10% of initial cost per year)." },
];

const relatedTools = [
  { title: "Cattle Record Keeping", href: "/tools/cattle-record-keeping", desc: "Track herd and calculate dairy or beef farm profit" },
  { title: "Pig Farm Profit Calculator", href: "/tools/pig-farm-profit-calculator", desc: "Pig farm revenue, FCR, costs, and profit per pig" },
  { title: "Crop Fertilizer Calculator", href: "/tools/crop-fertilizer-calculator", desc: "ICAR-recommended NPK doses for 25+ crops" },
  { title: "Fertilizer Calculator", href: "/tools/fertilizer-calculator", desc: "Complete fertilizer planner for any crop and area" },
];

export default function GoatFarmProfitCalculatorPage() {
  return (
    <>
      <JsonLd data={buildToolSchema({ name: "Goat Farm Profit Calculator", description: "Calculate annual profit, costs, and payback period for a goat farm. Enter herd size, meat/milk prices, feed and labor costs.", url: TOOL_URL, category: "Agriculture" })} />
      <JsonLd data={buildFaqSchema(faqs)} />
      <JsonLd data={buildBreadcrumbSchema([
        { name: "Home", url: BASE_URL },
        { name: "Tools", url: `${BASE_URL}/tools` },
        { name: "Agriculture", url: `${BASE_URL}/tools?category=agriculture` },
        { name: "Goat Farm Profit Calculator", url: TOOL_URL },
      ])} />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumb items={[
          { label: "Tools", href: "/tools" },
          { label: "Agriculture", href: "/tools?category=agriculture" },
          { label: "Goat Farm Profit Calculator" },
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
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 sm:text-4xl">Goat Farm Profit Calculator</h1>
              <p className="mt-3 text-lg text-gray-600 dark:text-gray-400">Calculate the profitability of starting or running a goat farm. Enter your herd size, meat and milk prices, feed, vet and labor costs — get annual revenue, expenses, net profit, and payback period for your investment.</p>
            </div>

            <GoatFarmCalculator />

            <div className="ad-slot">Advertisement</div>

            <section className="prose prose-gray max-w-none dark:prose-invert">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">How Much Does It Cost to Start a Goat Farm?</h2>
              <p className="text-gray-600 dark:text-gray-400">Initial investment is the biggest hurdle for new goat farmers. Here is a realistic breakdown for small and medium farms in India, which you can use alongside the calculator above to plan your business.</p>
              <div className="not-prose overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-gray-50 dark:bg-gray-800 text-left">
                      <th className="border border-gray-200 dark:border-gray-700 px-4 py-2 font-semibold">Cost Item</th>
                      <th className="border border-gray-200 dark:border-gray-700 px-4 py-2 font-semibold">Small Farm (20 does)</th>
                      <th className="border border-gray-200 dark:border-gray-700 px-4 py-2 font-semibold">Medium Farm (50 does)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["Goat purchase", "₹1,10,000", "₹2,60,000"],
                      ["Housing & fencing", "₹80,000–1,50,000", "₹2,00,000–3,50,000"],
                      ["Equipment & feeders", "₹20,000–40,000", "₹50,000–80,000"],
                      ["Initial feed stock", "₹15,000–25,000", "₹35,000–50,000"],
                      ["Veterinary setup", "₹5,000–10,000", "₹10,000–20,000"],
                      ["Total estimate", "₹2.3–3.3 lakh", "₹5.5–8 lakh"],
                    ].map(([item, small, medium]) => (
                      <tr key={item} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-2 font-medium">{item}</td>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-2 text-green-700 dark:text-green-400 font-medium">{small}</td>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-2 text-green-700 dark:text-green-400 font-medium">{medium}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-8">Best Goat Breeds for Profit in India</h2>
              <div className="not-prose overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-gray-50 dark:bg-gray-800 text-left">
                      <th className="border border-gray-200 dark:border-gray-700 px-4 py-2 font-semibold">Breed</th>
                      <th className="border border-gray-200 dark:border-gray-700 px-4 py-2 font-semibold">Type</th>
                      <th className="border border-gray-200 dark:border-gray-700 px-4 py-2 font-semibold">Kids / Year</th>
                      <th className="border border-gray-200 dark:border-gray-700 px-4 py-2 font-semibold">Key Strength</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["Barbari", "Dual purpose", "2.0–2.5", "Prolific, compact, city-friendly"],
                      ["Beetal", "Dual purpose", "1.5–2.0", "Good milk, large frame, Punjab/Haryana"],
                      ["Jamunapari", "Dairy + meat", "1.0–1.5", "Highest milk yield (2–3 L/day)"],
                      ["Sirohi", "Meat", "1.5–2.0", "Hardy, heat-tolerant, fast-growing"],
                      ["Black Bengal", "Meat", "2.0–3.0", "Triplets common, excellent meat quality"],
                      ["Boer (exotic)", "Meat", "1.5–2.0", "Fastest growth, 40–50 kg at 6 months"],
                    ].map(([breed, type, kids, strength]) => (
                      <tr key={breed} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-2 font-medium">{breed}</td>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-2">{type}</td>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-2 text-green-700 dark:text-green-400 font-medium">{kids}</td>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-2 text-gray-600 dark:text-gray-400">{strength}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-8">Goat Farming Profit Formula</h2>
              <div className="not-prose rounded-xl bg-gray-900 p-5 font-mono text-sm text-green-400">
                <div className="text-gray-400 mb-1"># Annual meat revenue</div>
                <div>Kids/Year = Does × Kids/Doe × (1 − Mortality%)</div>
                <div>Meat Revenue = Kids × Avg Weight (kg) × Price (₹/kg)</div>
                <div className="mt-2 text-gray-400"># Annual operating costs</div>
                <div>Feed Cost = Total Goats × Feed/Month × 12</div>
                <div>Vet Cost = Total Goats × Annual Vet Cost</div>
                <div className="mt-2 text-gray-400"># Net profit</div>
                <div className="text-yellow-400">Profit = (Meat + Milk Revenue) − (Feed + Vet + Labor)</div>
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
              <h3 className="mb-3 font-semibold text-gray-900 dark:text-gray-100">Goat Farm Benchmarks</h3>
              <div className="space-y-2 text-xs">
                {[
                  ["Kids / doe / year (avg)", "1.5–2.0"],
                  ["Meat goat sell weight", "20–35 kg"],
                  ["Live weight price", "₹350–500/kg"],
                  ["Milk (dairy breeds)", "1–3 L/day"],
                  ["Feed / goat / month", "₹400–700"],
                  ["Initial cost (20 does)", "₹2–3 lakh"],
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
