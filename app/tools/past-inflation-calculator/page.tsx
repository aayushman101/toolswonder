import type { Metadata } from "next";
import InflationCalculator from "@/components/tools/InflationCalculator";
import JsonLd, { buildToolSchema, buildFaqSchema, buildBreadcrumbSchema } from "@/components/seo/JsonLd";
import Breadcrumb from "@/components/layout/Breadcrumb";
import Link from "next/link";

const BASE_URL = "https://toolswonder.com";
const TOOL_URL = `${BASE_URL}/tools/past-inflation-calculator`;

export const metadata: Metadata = {
  title: "Past Inflation Calculator – What Was Money Worth in the Past?",
  description: "Find out what a dollar or rupee was worth in a past year. Calculate historical purchasing power and value of money from 1980 to 2025 using CPI data.",
  keywords: ["past inflation calculator", "inflation calculator by year", "what was 100 dollars worth in 1990", "historical inflation calculator", "money value in past", "reverse inflation calculator", "what was money worth calculator"],
  alternates: { canonical: TOOL_URL },
};

const faqs = [
  { question: "What was $100 worth in 1990?", answer: "$100 in 1990 is equivalent to approximately $230–240 in 2024. Total inflation from 1990–2024 was about 134%. This means prices have more than doubled since 1990. Alternatively: $100 in 2024 is worth about $43 in 1990 dollars — you could buy much more with $100 in 1990 than today. Enter 1990 as start year and 2024 as end year in the calculator above." },
  { question: "How do I calculate what money was worth in a past year?", answer: "Use the General tab: enter the dollar/rupee amount, set the start year as the past year (e.g. 1985), and end year as today (2025). The calculator shows what that past amount equals in today's money. Reverse it by setting start = today and end = past year to find today's value in old money terms. Formula: Past Equivalent = Today's Amount × (CPI_Past / CPI_Today)." },
  { question: "What was $1,000 worth in 2000?", answer: "$1,000 in 2000 equals about $1,822 in 2024. Total inflation from 2000–2024 was ~82.2%, or about 2.5% per year compounded. So $1,000 from 2000 has lost about 45% of its purchasing power in today's money — it would only buy what $549 buys in 2000 dollars. Enter 2000 as start and 2024 as end year to see the full year-by-year breakdown." },
  { question: "Which decade had the highest inflation in the US?", answer: "1970s had the highest inflation: 7.1% annual average (1970–1979). Cause: oil embargo, loose monetary policy. 1980–1981 was the peak with ~13–14% inflation. The Volcker shock (aggressive Fed rate hikes to 20%) broke the inflation spiral by 1983. Since then, US inflation has averaged 2.5–3% annually. 2022 was the recent spike at 8% — highest since 1981." },
  { question: "What is the inflation rate from 1985 to 2025?", answer: "Total cumulative inflation from 1985 to 2025: approximately 215–220%. Annual average: ~3.0% compounded. Meaning $100 in 1985 = ~$315 in 2025. Or: $100 in 2025 = ~$32 in 1985 purchasing power. The CPI went from ~107.6 in 1985 to ~317.3 in 2025. Enter 1985→2025 in the calculator to get the precise figure and year-by-year breakdown." },
  { question: "How to use a reverse inflation calculator?", answer: "A reverse inflation calculation answers: 'What amount in year X equals $Y today?' Set your start year as the recent year (today) and end year as the past year. Example: What amount in 1990 equals $1,000 today? Set From: 2024, To: 1990, Amount: $1,000 → result ≈ $432. This is useful for historical comparisons, legal settlements, salary negotiations, and understanding the real value of past prices." },
];

const historicalExamples = [
  { then: "$100 in 1980", now: "≈ $390 in 2025", change: "+290%", rate: "3.4%/yr" },
  { then: "$100 in 1990", now: "≈ $243 in 2025", change: "+143%", rate: "2.5%/yr" },
  { then: "$100 in 2000", now: "≈ $184 in 2025", change: "+84%", rate: "2.5%/yr" },
  { then: "$100 in 2010", now: "≈ $145 in 2025", change: "+45%", rate: "2.5%/yr" },
  { then: "$1,000 in 2020", now: "≈ $1,226 in 2025", change: "+22.6%", rate: "4.2%/yr" },
];

export default function PastInflationCalculatorPage() {
  return (
    <>
      <JsonLd data={buildToolSchema({ name: "Past Inflation Calculator", description: "Calculate what money was worth in a past year. Find historical purchasing power using CPI data from 1980 to 2025.", url: TOOL_URL, category: "Finance" })} />
      <JsonLd data={buildFaqSchema(faqs)} />
      <JsonLd data={buildBreadcrumbSchema([{ name: "Home", url: BASE_URL }, { name: "Tools", url: `${BASE_URL}/tools` }, { name: "Inflation Calculator", url: `${BASE_URL}/tools/inflation-calculator` }, { name: "Past Inflation", url: TOOL_URL }])} />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: "Tools", href: "/tools" }, { label: "Inflation Calculator", href: "/tools/inflation-calculator" }, { label: "Past Value" }]} />
        <div className="ad-slot my-4">Advertisement</div>
        <div className="lg:grid lg:grid-cols-[1fr_300px] lg:gap-8">
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 sm:text-4xl">Past Inflation Calculator</h1>
              <p className="mt-3 text-lg text-gray-600 dark:text-gray-400">Find out what money was worth in any past year, or what today&apos;s amount would have been in old dollars. Enter start and end years — get purchasing power change, total inflation, and year-by-year CPI breakdown from 1980 to 2025.</p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="rounded-xl bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 p-4">
                <h2 className="font-semibold text-amber-900 dark:text-amber-100 mb-1 text-sm">Past → Present</h2>
                <p className="text-xs text-amber-800 dark:text-amber-300">Set From = past year, To = 2025. Shows what old money equals today.</p>
                <div className="font-mono text-xs bg-gray-900 text-green-400 rounded p-2 mt-2">$100 (1990) → $243 (2025)</div>
              </div>
              <div className="rounded-xl bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 p-4">
                <h2 className="font-semibold text-blue-900 dark:text-blue-100 mb-1 text-sm">Present → Past (Reverse)</h2>
                <p className="text-xs text-blue-800 dark:text-blue-300">Set From = 2025, To = past year. Shows what today&apos;s money was worth then.</p>
                <div className="font-mono text-xs bg-gray-900 text-green-400 rounded p-2 mt-2">$243 (2025) → $100 (1990)</div>
              </div>
            </div>

            <InflationCalculator />

            <div className="ad-slot">Advertisement</div>

            <section>
              <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">Historical Value Examples (US $)</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-gray-50 dark:bg-gray-800 text-left">
                      <th className="border border-gray-200 dark:border-gray-700 px-3 py-2 font-semibold">Then</th>
                      <th className="border border-gray-200 dark:border-gray-700 px-3 py-2 font-semibold">Equals Now</th>
                      <th className="border border-gray-200 dark:border-gray-700 px-3 py-2 font-semibold">Total Change</th>
                      <th className="border border-gray-200 dark:border-gray-700 px-3 py-2 font-semibold">Avg Annual</th>
                    </tr>
                  </thead>
                  <tbody>
                    {historicalExamples.map((row, i) => (
                      <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                        <td className="border border-gray-200 dark:border-gray-700 px-3 py-2 font-medium">{row.then}</td>
                        <td className="border border-gray-200 dark:border-gray-700 px-3 py-2 font-semibold text-blue-600 dark:text-blue-400">{row.now}</td>
                        <td className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-red-600">{row.change}</td>
                        <td className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-gray-600 dark:text-gray-400">{row.rate}</td>
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
          </div>

          <aside className="mt-8 space-y-5 lg:mt-0">
            <div className="ad-slot h-[250px]">Advertisement</div>
            <div className="card p-5">
              <h3 className="mb-3 font-semibold text-gray-900 dark:text-gray-100">CPI Quick Reference</h3>
              <div className="space-y-2 text-sm">
                {[["1980", "82.4"], ["1990", "130.7"], ["2000", "172.2"], ["2010", "218.1"], ["2020", "258.8"], ["2025", "317.3"]].map(([y, c]) => (
                  <div key={y} className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">CPI {y}</span>
                    <span className="font-semibold text-gray-900 dark:text-gray-100">{c}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="card p-5">
              <h3 className="mb-3 font-semibold text-gray-900 dark:text-gray-100">Related Tools</h3>
              <ul className="space-y-2 text-sm">
                {[["Inflation Calculator (Main)", "/tools/inflation-calculator"], ["India Inflation Calculator", "/tools/inflation-calculator-india"], ["Salary Inflation Calculator", "/tools/salary-inflation-calculator"], ["Future Value Calculator", "/tools/future-value-inflation-calculator"], ["SIP Calculator", "/tools/sip-calculator"]].map(([t, h]) => (
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
