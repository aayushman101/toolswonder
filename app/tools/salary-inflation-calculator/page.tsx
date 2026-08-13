import type { Metadata } from "next";
import InflationCalculator from "@/components/tools/InflationCalculator";
import JsonLd, { buildToolSchema, buildFaqSchema, buildBreadcrumbSchema } from "@/components/seo/JsonLd";
import Breadcrumb from "@/components/layout/Breadcrumb";
import Link from "next/link";

const BASE_URL = "https://toolswonder.com";
const TOOL_URL = `${BASE_URL}/tools/salary-inflation-calculator`;

export const metadata: Metadata = {
  title: "Salary Inflation Calculator – Is Your Pay Keeping Up with Inflation?",
  description: "Calculate if your salary is keeping up with inflation. Enter current salary, annual raise %, and years to see real vs nominal pay growth. Free salary inflation calculator.",
  keywords: ["salary inflation calculator", "calculate salary after inflation", "real salary calculator", "wage inflation calculator", "inflation adjusted salary", "is my salary keeping up with inflation", "real wage calculator"],
  alternates: { canonical: TOOL_URL },
};

const faqs = [
  { question: "How do I calculate if my salary is keeping up with inflation?", answer: "Use the Salary tab: enter your current salary, set From/To years, and enter your annual % raise. The calculator shows your nominal salary (what you earn), real salary (inflation-adjusted), and whether your purchasing power grew or shrank. If real salary > starting salary, you're ahead of inflation. If real salary < starting salary, inflation is outpacing your raises." },
  { question: "What salary increase keeps up with inflation?", answer: "To keep up with inflation, your salary raise must equal or exceed the inflation rate. US average inflation 2010–2024: ~2.5% annually. If you got 3% raises, your real salary grew ~0.5%/year. If you only got 1.5% raises during 2022 (when inflation hit 8%), you lost ~6.5% purchasing power that year. Use the calculator to check your specific years and raise percentages." },
  { question: "How much should my salary increase per year?", answer: "Rule of thumb: salary raise ≥ inflation rate to maintain purchasing power. For real growth: aim for raise = inflation + 1–2%. At 3% inflation, target 4–5% raise. At 6% inflation (like 2021–2022), you need 7%+ to stay ahead. Top performers typically get 5–10% raises in competitive markets. Anything below inflation is effectively a pay cut in real terms." },
  { question: "What is the difference between nominal and real salary?", answer: "Nominal salary: the dollar/rupee amount on your payslip. Real salary: purchasing power adjusted for inflation. Example: ₹10 lakh in 2014 at 7% average inflation → nominal salary in 2024 after 5% raises = ₹16.29 lakh. Real salary (inflation-adjusted) = ₹16.29L × (CPI 2014 / CPI 2024) ≈ ₹8.8 lakh. Your real pay actually fell — you earn less in true purchasing power than you did in 2014." },
  { question: "Which professions best beat salary inflation?", answer: "Professions with salaries outpacing inflation (2015–2024 in India): Software engineers (15–25% raises in peak years), data scientists (20%+), product managers (12–18%), healthcare professionals (8–12%), finance professionals (8–10%). Professions at risk of falling behind: government employees (DA revisions may lag), retail workers, clerical staff in traditional industries. The gap between high and low earners in beating inflation has widened significantly." },
  { question: "Does a 3% raise beat 6% inflation?", answer: "No — a 3% raise with 6% inflation means a 3% real pay cut. Your nominal salary grew from $50,000 to $51,500, but the same goods now cost $53,000. You are effectively $1,500 poorer in real terms. This happened to many workers in 2021–2022 when US inflation reached 7–8% while average raises stayed at 3–4%. The calculator shows this exact scenario in the Salary tab." },
];

const salaryExamples = [
  { salary: "$50,000", raise: "3%", years: "10", nominal: "$67,196", real: "$51,240", inflation: "2.5%" },
  { salary: "$50,000", raise: "5%", years: "10", nominal: "$81,445", real: "$62,040", inflation: "2.5%" },
  { salary: "₹8 Lakh", raise: "7%", years: "10", nominal: "₹15.7L", real: "₹10.2L", inflation: "5%" },
  { salary: "₹8 Lakh", raise: "5%", years: "10", nominal: "₹13.0L", real: "₹8.5L", inflation: "5%" },
];

export default function SalaryInflationCalculatorPage() {
  return (
    <>
      <JsonLd data={buildToolSchema({ name: "Salary Inflation Calculator", description: "Calculate whether your salary is keeping up with inflation. Compare nominal pay vs real purchasing power.", url: TOOL_URL, category: "Finance" })} />
      <JsonLd data={buildFaqSchema(faqs)} />
      <JsonLd data={buildBreadcrumbSchema([{ name: "Home", url: BASE_URL }, { name: "Tools", url: `${BASE_URL}/tools` }, { name: "Inflation Calculator", url: `${BASE_URL}/tools/inflation-calculator` }, { name: "Salary Inflation Calculator", url: TOOL_URL }])} />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: "Tools", href: "/tools" }, { label: "Inflation Calculator", href: "/tools/inflation-calculator" }, { label: "Salary" }]} />
        <div className="ad-slot my-4">Advertisement</div>
        <div className="lg:grid lg:grid-cols-[1fr_300px] lg:gap-8">
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 sm:text-4xl">Salary Inflation Calculator</h1>
              <p className="mt-3 text-lg text-gray-600 dark:text-gray-400">Find out if your salary is beating inflation. Enter your current salary and annual raise percentage — get real vs nominal pay comparison with year-by-year purchasing power breakdown. Use the <strong>Salary tab</strong> below.</p>
            </div>

            <div className="rounded-xl bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 p-5">
              <h2 className="font-semibold text-green-900 dark:text-green-100 mb-2">How to Use — Salary Tab</h2>
              <ol className="text-sm text-green-800 dark:text-green-300 space-y-1 list-decimal list-inside">
                <li>Click the <strong>Salary</strong> tab below</li>
                <li>Enter your current/starting salary in the Amount field</li>
                <li>Set From Year (when you started) and To Year (now)</li>
                <li>Enter your average Annual Raise %</li>
                <li>Click Calculate to see real vs nominal salary</li>
              </ol>
            </div>

            <InflationCalculator />

            <div className="ad-slot">Advertisement</div>

            <section>
              <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">Sample Salary vs Inflation Scenarios</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-gray-50 dark:bg-gray-800 text-left">
                      <th className="border border-gray-200 dark:border-gray-700 px-3 py-2 font-semibold">Starting Salary</th>
                      <th className="border border-gray-200 dark:border-gray-700 px-3 py-2 font-semibold">Annual Raise</th>
                      <th className="border border-gray-200 dark:border-gray-700 px-3 py-2 font-semibold">After 10 Years (Nominal)</th>
                      <th className="border border-gray-200 dark:border-gray-700 px-3 py-2 font-semibold">Real Value</th>
                      <th className="border border-gray-200 dark:border-gray-700 px-3 py-2 font-semibold">Inflation Used</th>
                    </tr>
                  </thead>
                  <tbody>
                    {salaryExamples.map((row, i) => (
                      <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                        <td className="border border-gray-200 dark:border-gray-700 px-3 py-2 font-medium">{row.salary}</td>
                        <td className="border border-gray-200 dark:border-gray-700 px-3 py-2">{row.raise}</td>
                        <td className="border border-gray-200 dark:border-gray-700 px-3 py-2 font-semibold">{row.nominal}</td>
                        <td className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-blue-600 dark:text-blue-400 font-semibold">{row.real}</td>
                        <td className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-gray-500 dark:text-gray-400">{row.inflation}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">Real value = inflation-adjusted purchasing power in today&apos;s money.</p>
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
              <h3 className="mb-3 font-semibold text-gray-900 dark:text-gray-100">Quick Reference</h3>
              <div className="space-y-2 text-sm">
                {[["Beat 2.5% inflation", "Need 3%+ raise"], ["Beat 5% inflation", "Need 6%+ raise"], ["Beat 8% inflation", "Need 9%+ raise"], ["US Avg Inflation", "~2.5% (2010–2024)"], ["India Avg Inflation", "~6% (2010–2024)"]].map(([l, v]) => (
                  <div key={l} className="flex justify-between gap-2">
                    <span className="text-gray-500 dark:text-gray-400">{l}</span>
                    <span className="font-semibold text-gray-900 dark:text-gray-100 text-right">{v}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="card p-5">
              <h3 className="mb-3 font-semibold text-gray-900 dark:text-gray-100">Related Tools</h3>
              <ul className="space-y-2 text-sm">
                {[["Inflation Calculator", "/tools/inflation-calculator"], ["India Inflation Calculator", "/tools/inflation-calculator-india"], ["Future Value Calculator", "/tools/future-value-inflation-calculator"], ["SIP Calculator", "/tools/sip-calculator"], ["EMI Calculator", "/tools/emi-calculator"]].map(([t, h]) => (
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
