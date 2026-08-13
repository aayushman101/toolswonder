import type { Metadata } from "next";
import InflationCalculator from "@/components/tools/InflationCalculator";
import JsonLd, { buildToolSchema, buildFaqSchema, buildBreadcrumbSchema } from "@/components/seo/JsonLd";
import Breadcrumb from "@/components/layout/Breadcrumb";
import Link from "next/link";

const BASE_URL = "https://toolswonder.com";
const TOOL_URL = `${BASE_URL}/tools/inflation-calculator-india`;

export const metadata: Metadata = {
  title: "Inflation Calculator India – Rupee Value & CPI Calculator",
  description: "Calculate the inflation-adjusted value of ₹ in India. Check purchasing power of the Indian rupee from 1980 to 2025. Free India inflation calculator with year-by-year breakdown.",
  keywords: ["inflation calculator india", "inflation calculator in india", "property inflation calculator india", "reverse inflation calculator india", "india inflation rate calculator", "rupee inflation calculator", "indian rupee purchasing power"],
  alternates: { canonical: TOOL_URL },
};

const faqs = [
  { question: "What is the current inflation rate in India?", answer: "India's retail inflation (CPI) was approximately 4.8% in 2024, within the RBI's 2–6% target band. The long-run average inflation rate in India since 1990 is around 7–8% annually. India uses Consumer Price Index (CPI) as the primary inflation measure, published monthly by the Ministry of Statistics." },
  { question: "How to calculate inflation in India?", answer: "Formula: Adjusted Value = Original Amount × (CPI_New / CPI_Old). Example: ₹1,00,000 in 2010 → 2024: CPI 2010 ≈ 130, CPI 2024 ≈ 240. Adjusted = ₹1,00,000 × (240/130) = ₹1,84,615. This means ₹1 lakh in 2010 has the same purchasing power as ₹1.85 lakh in 2024. Use the calculator above and select INR as your currency." },
  { question: "What will the value of 1 lakh be after 40 years?", answer: "At 6% average annual inflation (India's long-run average), ₹1 lakh today will need ₹10.28 lakh in 40 years to maintain the same purchasing power. Use the Future Value tab: enter ₹1,00,000, 40 years, 6% annual inflation. At 7% inflation: ₹14.97 lakh. This is why investing to beat inflation is essential for long-term financial planning." },
  { question: "What is the value of 5000 rupees in 1985?", answer: "₹5,000 in 1985 is equivalent to approximately ₹1,60,000–1,80,000 in 2024, depending on the exact CPI data used. India's average inflation from 1985–2024 is roughly 7.5% annually. Using that rate: ₹5,000 × (1.075)^39 ≈ ₹1,70,000 in 2024 money. Select 1985 as start year and 2024 as end year in the calculator." },
  { question: "How does property inflation differ from general inflation in India?", answer: "Property/real estate inflation in India typically runs 2–3× faster than CPI inflation in major cities. While CPI averaged ~7% annually, property prices in Mumbai, Delhi, and Bengaluru rose 10–15% annually in the 2000s–2010s. Use the calculator to check the general inflation baseline, then compare to local property price growth. RBI's House Price Index (HPI) tracks residential property inflation separately." },
  { question: "What is RBI's inflation target for India?", answer: "The Reserve Bank of India (RBI) targets 4% CPI inflation, with a tolerance band of ±2% (range: 2%–6%). This target was set under the flexible inflation targeting (FIT) framework adopted in 2016. RBI adjusts the repo rate (currently 6.5% in 2024) to control inflation. When inflation rises above 6%, RBI typically raises rates to cool demand." },
];

const indiaInflationTable = [
  { period: "1990s", avg: "9.5%", note: "Liberalisation, currency crisis" },
  { period: "2000s", avg: "5.3%", note: "IT boom, moderate inflation" },
  { period: "2010–2014", avg: "9.8%", note: "Supply shocks, food inflation" },
  { period: "2015–2019", avg: "4.2%", note: "RBI FIT target adopted" },
  { period: "2020–2021", avg: "6.2%", note: "COVID supply disruptions" },
  { period: "2022–2024", avg: "5.5%", note: "Global commodity spike" },
];

export default function InflationCalculatorIndiaPage() {
  return (
    <>
      <JsonLd data={buildToolSchema({ name: "Inflation Calculator India", description: "Calculate inflation-adjusted value of Indian Rupee. Check purchasing power from 1980–2025 with year-by-year CPI breakdown.", url: TOOL_URL, category: "Finance" })} />
      <JsonLd data={buildFaqSchema(faqs)} />
      <JsonLd data={buildBreadcrumbSchema([{ name: "Home", url: BASE_URL }, { name: "Tools", url: `${BASE_URL}/tools` }, { name: "Inflation Calculator", url: `${BASE_URL}/tools/inflation-calculator` }, { name: "India", url: TOOL_URL }])} />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: "Tools", href: "/tools" }, { label: "Inflation Calculator", href: "/tools/inflation-calculator" }, { label: "India" }]} />
        <div className="ad-slot my-4">Advertisement</div>
        <div className="lg:grid lg:grid-cols-[1fr_300px] lg:gap-8">
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 sm:text-4xl">Inflation Calculator India</h1>
              <p className="mt-3 text-lg text-gray-600 dark:text-gray-400">Calculate the inflation-adjusted value of the Indian Rupee (₹). Select INR as currency, enter an amount and years — get the real purchasing power change. Useful for property valuation, salary comparison, and retirement planning in India.</p>
            </div>

            <div className="rounded-xl bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 p-5">
              <h2 className="font-semibold text-blue-900 dark:text-blue-100 mb-1">How to use for India</h2>
              <p className="text-sm text-blue-800 dark:text-blue-300">Select <strong>INR – Indian Rupee</strong> as currency. The CPI data is US-based (for exact ratios), but you can use the <strong>Future Value tab</strong> with India&apos;s 6% average inflation rate for Indian projections.</p>
            </div>

            <InflationCalculator />

            <div className="ad-slot">Advertisement</div>

            <section className="prose prose-gray max-w-none dark:prose-invert">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">India Inflation Rate by Period</h2>
              <div className="not-prose overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-gray-50 dark:bg-gray-800 text-left">
                      <th className="border border-gray-200 dark:border-gray-700 px-4 py-2 font-semibold">Period</th>
                      <th className="border border-gray-200 dark:border-gray-700 px-4 py-2 font-semibold">Avg CPI Inflation</th>
                      <th className="border border-gray-200 dark:border-gray-700 px-4 py-2 font-semibold">Context</th>
                    </tr>
                  </thead>
                  <tbody>
                    {indiaInflationTable.map((row) => (
                      <tr key={row.period} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-2 font-medium">{row.period}</td>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-2 text-red-600 font-semibold">{row.avg}</td>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-2 text-gray-600 dark:text-gray-400">{row.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-8">Inflation Formula for India</h2>
              <div className="not-prose rounded-xl bg-gray-900 p-5 font-mono text-sm text-green-400">
                <div className="text-gray-400 mb-1"># Purchasing Power Formula</div>
                <div>Adjusted Amount = Original × (CPI_New / CPI_Old)</div>
                <div className="mt-3 text-gray-400"># Example: ₹1,00,000 in 2010 → 2024</div>
                <div>= ₹1,00,000 × (240 / 130) = ₹1,84,615</div>
                <div className="mt-3 text-gray-400"># Future Value (India avg 6% inflation)</div>
                <div>= ₹1,00,000 × (1.06)^10 = ₹1,79,085</div>
                <div className="text-yellow-400">→ ₹1 lakh today needs ₹1.79 lakh in 10 years</div>
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
              <h3 className="mb-3 font-semibold text-gray-900 dark:text-gray-100">India Inflation Facts</h3>
              <div className="space-y-2 text-sm">
                {[["RBI Target", "4% CPI (±2%)"], ["2024 CPI", "~4.8%"], ["Long-run Avg", "~7–8% (1990–2024)"], ["Inflation Index", "CPI (Base 2012=100)"], ["Published by", "MOSPI, monthly"]].map(([l, v]) => (
                  <div key={l} className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">{l}</span>
                    <span className="font-semibold text-gray-900 dark:text-gray-100">{v}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="card p-5">
              <h3 className="mb-3 font-semibold text-gray-900 dark:text-gray-100">Related Tools</h3>
              <ul className="space-y-2 text-sm">
                {[["Inflation Calculator (Main)", "/tools/inflation-calculator"], ["Salary Inflation Calculator", "/tools/salary-inflation-calculator"], ["Future Value Calculator", "/tools/future-value-inflation-calculator"], ["SIP Calculator", "/tools/sip-calculator"], ["EMI Calculator", "/tools/emi-calculator"]].map(([t, h]) => (
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
