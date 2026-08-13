import type { Metadata } from "next";
import InflationCalculator from "@/components/tools/InflationCalculator";
import JsonLd, { buildToolSchema, buildFaqSchema, buildBreadcrumbSchema } from "@/components/seo/JsonLd";
import Breadcrumb from "@/components/layout/Breadcrumb";
import Link from "next/link";

const BASE_URL = "https://toolswonder.com";
const TOOL_URL = `${BASE_URL}/tools/future-value-inflation-calculator`;

export const metadata: Metadata = {
  title: "Future Value Inflation Calculator – Purchasing Power Over Time",
  description: "Calculate how much money you'll need in the future to match today's purchasing power. Enter amount, years and inflation rate. Free future value inflation calculator.",
  keywords: ["future inflation calculator", "future value calculator inflation", "calculate inflation adjusted value", "calculate inflation rate after 20 years", "inflation adjusted future value", "purchasing power calculator future", "what will money be worth in future"],
  alternates: { canonical: TOOL_URL },
};

const faqs = [
  { question: "How do I calculate inflation-adjusted future value?", answer: "Formula: Future Value = Present Value × (1 + inflation rate)^years. Example: ₹10 lakh today at 6% inflation for 20 years: FV = ₹10L × (1.06)^20 = ₹32.07 lakh. This means you will need ₹32 lakh in 20 years to buy what ₹10 lakh buys today. Use the Future Value tab — enter amount, years, and your expected inflation rate." },
  { question: "How much will ₹1 lakh be worth in 20 years?", answer: "At 6% inflation (India average): ₹1 lakh today will need ₹3.21 lakh in 20 years to have the same purchasing power. At 7% inflation: ₹3.87 lakh. At 4% inflation: ₹2.19 lakh. Conversely, ₹1 lakh sitting idle will be 'worth' just ₹31,000 in real purchasing power at 6% inflation over 20 years. This is why investing above the inflation rate is critical." },
  { question: "What will the value of money be in 40 years?", answer: "At 6% average annual inflation, ₹1 lakh today will need ₹10.29 lakh in 40 years to maintain purchasing power. At 7%: ₹14.97 lakh. If you invest ₹1 lakh at 12% annual returns for 40 years, you get ₹93.05 lakh — significantly outpacing inflation. The key: your investment return must beat the inflation rate to build real wealth." },
  { question: "How to calculate inflation adjusted return?", answer: "Real Return = ((1 + Nominal Return) / (1 + Inflation Rate)) – 1. Example: 12% investment return, 6% inflation: Real Return = (1.12 / 1.06) – 1 = 5.66% real return. This is what you actually gained in purchasing power terms. A fixed deposit at 7% with 6% inflation gives only 0.94% real return — barely above zero after tax." },
  { question: "How much money do I need for retirement adjusted for inflation?", answer: "Retirement corpus formula: Required = Annual Expenses × PVIFA(inflation-adjusted rate, years). Simpler: If you need ₹5 lakh/year in today's money, at 6% inflation for 25 years, you'll need ₹5L × (1.06)^25 = ₹21.4L/year at retirement. To sustain 30 years of retirement at 4% safe withdrawal: corpus = ₹21.4L ÷ 0.04 = ₹5.35 crore. Use our SIP calculator to plan your accumulation." },
  { question: "What inflation rate should I use for future calculations in India?", answer: "Recommended rates: Conservative (safe): 6–7% (India's CPI long-run average). Moderate: 5–6% (RBI target range). Optimistic: 4% (RBI's central target). For retirement planning, use 6–7%. For 1–5 year projections, use the current CPI rate (~4.8% in 2024). For US dollar projections, use 2.5–3%. Always run scenarios at multiple rates to stress-test your plan." },
];

const futureValueExamples = [
  { amount: "₹1 Lakh", rate: "4%", y10: "₹1.48L", y20: "₹2.19L", y30: "₹3.24L" },
  { amount: "₹1 Lakh", rate: "6%", y10: "₹1.79L", y20: "₹3.21L", y30: "₹5.74L" },
  { amount: "₹1 Lakh", rate: "8%", y10: "₹2.16L", y20: "₹4.66L", y30: "₹10.06L" },
  { amount: "$10,000", rate: "3%", y10: "$13,439", y20: "$18,061", y30: "$24,273" },
  { amount: "$10,000", rate: "5%", y10: "$16,289", y20: "$26,533", y30: "$43,219" },
];

export default function FutureValueInflationCalculatorPage() {
  return (
    <>
      <JsonLd data={buildToolSchema({ name: "Future Value Inflation Calculator", description: "Calculate how much money you will need in the future to match today's purchasing power.", url: TOOL_URL, category: "Finance" })} />
      <JsonLd data={buildFaqSchema(faqs)} />
      <JsonLd data={buildBreadcrumbSchema([{ name: "Home", url: BASE_URL }, { name: "Tools", url: `${BASE_URL}/tools` }, { name: "Inflation Calculator", url: `${BASE_URL}/tools/inflation-calculator` }, { name: "Future Value", url: TOOL_URL }])} />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: "Tools", href: "/tools" }, { label: "Inflation Calculator", href: "/tools/inflation-calculator" }, { label: "Future Value" }]} />
        <div className="ad-slot my-4">Advertisement</div>
        <div className="lg:grid lg:grid-cols-[1fr_300px] lg:gap-8">
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 sm:text-4xl">Future Value Inflation Calculator</h1>
              <p className="mt-3 text-lg text-gray-600 dark:text-gray-400">Calculate how much you will need in the future to maintain today&apos;s purchasing power. Enter your amount, expected years, and inflation rate — get the inflation-adjusted future value instantly. Use the <strong>Future Value tab</strong> below.</p>
            </div>

            <div className="rounded-xl bg-purple-50 dark:bg-purple-950 border border-purple-200 dark:border-purple-800 p-5">
              <h2 className="font-semibold text-purple-900 dark:text-purple-100 mb-2">Future Value Formula</h2>
              <div className="font-mono text-sm bg-gray-900 text-green-400 rounded-lg p-3 mt-2">
                <div>FV = PV × (1 + inflation rate)^years</div>
                <div className="text-gray-400 mt-1">₹1L × (1.06)^20 = ₹3.21 lakh at 6% inflation</div>
              </div>
              <p className="text-xs text-purple-700 dark:text-purple-400 mt-2">Use the <strong>Future Value</strong> tab in the calculator and enter your expected annual inflation rate.</p>
            </div>

            <InflationCalculator />

            <div className="ad-slot">Advertisement</div>

            <section>
              <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">Future Value Reference Table</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-gray-50 dark:bg-gray-800 text-left">
                      <th className="border border-gray-200 dark:border-gray-700 px-3 py-2 font-semibold">Amount Today</th>
                      <th className="border border-gray-200 dark:border-gray-700 px-3 py-2 font-semibold">Inflation</th>
                      <th className="border border-gray-200 dark:border-gray-700 px-3 py-2 font-semibold">In 10 Years</th>
                      <th className="border border-gray-200 dark:border-gray-700 px-3 py-2 font-semibold">In 20 Years</th>
                      <th className="border border-gray-200 dark:border-gray-700 px-3 py-2 font-semibold">In 30 Years</th>
                    </tr>
                  </thead>
                  <tbody>
                    {futureValueExamples.map((row, i) => (
                      <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                        <td className="border border-gray-200 dark:border-gray-700 px-3 py-2 font-medium">{row.amount}</td>
                        <td className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-red-600 font-semibold">{row.rate}</td>
                        <td className="border border-gray-200 dark:border-gray-700 px-3 py-2">{row.y10}</td>
                        <td className="border border-gray-200 dark:border-gray-700 px-3 py-2">{row.y20}</td>
                        <td className="border border-gray-200 dark:border-gray-700 px-3 py-2 font-semibold">{row.y30}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">Values show how much you need in the future to maintain today&apos;s purchasing power.</p>
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
          </div>

          <aside className="mt-8 space-y-5 lg:mt-0">
            <div className="ad-slot h-[250px]">Advertisement</div>
            <div className="card p-5">
              <h3 className="mb-3 font-semibold text-gray-900 dark:text-gray-100">Recommended Inflation Rates</h3>
              <div className="space-y-2 text-sm">
                {[["India (conservative)", "7%"], ["India (moderate)", "6%"], ["India (optimistic)", "4%"], ["US (historical avg)", "3%"], ["US (Fed target)", "2%"], ["Global average", "4–5%"]].map(([l, v]) => (
                  <div key={l} className="flex justify-between gap-2">
                    <span className="text-gray-500 dark:text-gray-400">{l}</span>
                    <span className="font-semibold text-red-600">{v}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="card p-5">
              <h3 className="mb-3 font-semibold text-gray-900 dark:text-gray-100">Related Tools</h3>
              <ul className="space-y-2 text-sm">
                {[["Inflation Calculator", "/tools/inflation-calculator"], ["India Inflation Calculator", "/tools/inflation-calculator-india"], ["Salary Inflation Calculator", "/tools/salary-inflation-calculator"], ["SIP Calculator", "/tools/sip-calculator"], ["EMI Calculator", "/tools/emi-calculator"]].map(([t, h]) => (
                  <li key={h}><Link href={h} className="text-blue-700 dark:text-blue-400 hover:underline">→ {t}</Link></li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
