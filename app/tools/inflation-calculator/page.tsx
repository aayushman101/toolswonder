import type { Metadata } from "next";
import Link from "next/link";
import InflationCalculator from "@/components/tools/InflationCalculator";
import JsonLd, { buildToolSchema, buildFaqSchema, buildBreadcrumbSchema } from "@/components/seo/JsonLd";
import Breadcrumb from "@/components/layout/Breadcrumb";
import { ChevronRight, TrendingUp } from "lucide-react";

const BASE_URL = "https://toolswonder.com";
const TOOL_URL = `${BASE_URL}/tools/inflation-calculator`;

export const metadata: Metadata = {
  title: "Inflation Calculator – Adjust for CPI, Salary & Future Value",
  description:
    "Free inflation calculator using real US CPI data. Calculate purchasing power, salary inflation, future value, and year-by-year breakdowns from 1980 to 2025.",
  keywords: [
    "inflation calculator",
    "inflation calculator by year",
    "cpi inflation calculator",
    "us inflation calculator",
    "future inflation calculator",
    "salary inflation calculator",
    "purchasing power calculator",
    "inflation rate calculator",
    "money inflation calculator",
    "dollar inflation calculator",
  ],
  alternates: { canonical: TOOL_URL },
  openGraph: {
    title: "Inflation Calculator – Adjust for CPI, Salary & Future Value",
    description: "Calculate inflation impact using real BLS CPI data. Free, accurate, and instant.",
    url: TOOL_URL,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Inflation Calculator | ToolsWonder",
    description: "Adjust for inflation using real US CPI data. Free & instant.",
  },
};

const faqs = [
  {
    question: "How does the inflation calculator work?",
    answer:
      "The inflation calculator uses historical Consumer Price Index (CPI) data from the US Bureau of Labor Statistics. It calculates the equivalent purchasing power of a dollar amount between any two years using the formula: Adjusted Value = Original Amount × (CPI of End Year / CPI of Start Year).",
  },
  {
    question: "What is CPI and why does it matter?",
    answer:
      "The Consumer Price Index (CPI) measures the average change in prices over time for a basket of consumer goods and services. It is the most widely used measure of inflation in the United States, published monthly by the Bureau of Labor Statistics.",
  },
  {
    question: "How do I calculate inflation by year?",
    answer:
      "Select your start and end years in the 'General' tab, enter your amount, and click Calculate. The tool shows the total inflation rate, annual compound rate, and a full year-by-year breakdown with CPI values.",
  },
  {
    question: "How does inflation affect my salary?",
    answer:
      "Use the 'Salary' tab to compare your nominal salary increase to real inflation-adjusted growth. If your salary raises don't keep pace with inflation, your real purchasing power decreases — even if your nominal salary grows.",
  },
  {
    question: "What is a normal inflation rate?",
    answer:
      "The US Federal Reserve targets 2% annual inflation as healthy for the economy. Historical average US inflation is around 3.1% per year. Recent years (2021-2023) saw elevated inflation of 4-8% due to post-pandemic supply chain issues and monetary policy.",
  },
  {
    question: "How do I calculate future value adjusted for inflation?",
    answer:
      "Use the 'Future Value' tab. Enter today's amount, expected years, and estimated annual inflation rate. The calculator shows how much you'll need in the future to match today's purchasing power.",
  },
  {
    question: "Is this calculator accurate for India or other countries?",
    answer:
      "The CPI data used is US-based (BLS CPI-U). For other countries, the inflation rates differ. However, the formula and calculation method is the same — you can manually enter a custom inflation rate in the 'Future Value' tab for any country.",
  },
  {
    question: "What is purchasing power?",
    answer:
      "Purchasing power is the value of a currency expressed in terms of the quantity of goods or services that one unit of money can buy. Inflation decreases purchasing power — meaning the same amount of money buys fewer goods over time.",
  },
];

const relatedTools = [
  { title: "Inflation Calculator India", href: "/tools/inflation-calculator-india", desc: "Rupee purchasing power with India CPI" },
  { title: "Salary Inflation Calculator", href: "/tools/salary-inflation-calculator", desc: "Is your salary keeping up with inflation?" },
  { title: "Future Value Inflation Calculator", href: "/tools/future-value-inflation-calculator", desc: "What you'll need in the future" },
  { title: "Past Inflation Calculator", href: "/tools/past-inflation-calculator", desc: "What money was worth in any past year" },
  { title: "SIP Calculator", href: "/tools/sip-calculator", desc: "Systematic Investment Plan returns" },
];

export default function InflationCalculatorPage() {
  return (
    <>
      {/* JSON-LD Schemas */}
      <JsonLd data={buildToolSchema({ name: "Inflation Calculator", description: "Free inflation calculator using real US CPI data. Adjust purchasing power, salary, and future values.", url: TOOL_URL, category: "Finance" })} />
      <JsonLd data={buildFaqSchema(faqs)} />
      <JsonLd data={buildBreadcrumbSchema([
        { name: "Home", url: BASE_URL },
        { name: "Tools", url: `${BASE_URL}/tools` },
        { name: "Finance", url: `${BASE_URL}/tools?category=finance` },
        { name: "Inflation Calculator", url: TOOL_URL },
      ])} />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <Breadcrumb items={[
          { label: "Tools", href: "/tools" },
          { label: "Finance", href: "/tools?category=finance" },
          { label: "Inflation Calculator" },
        ]} />

        {/* Ad — Top */}
        <div className="ad-slot my-4">Advertisement</div>

        <div className="lg:grid lg:grid-cols-[1fr_300px] lg:gap-8">
          {/* Main Column */}
          <div className="space-y-8">
            {/* Header */}
            <div>
              <div className="mb-2 flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                  <TrendingUp className="h-3.5 w-3.5" /> Finance
                </span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                Inflation Calculator
              </h1>
              <p className="mt-3 text-lg text-gray-600">
                Calculate the real value of money over time using historical US CPI data.
                Adjust for salary growth, future purchasing power, and year-by-year inflation rates.
              </p>
            </div>

            {/* Calculator */}
            <InflationCalculator />

            {/* Ad — Mid */}
            <div className="ad-slot">Advertisement</div>

            {/* What is Inflation */}
            <section className="prose prose-gray max-w-none">
              <h2 className="text-2xl font-bold text-gray-900">What is Inflation?</h2>
              <p className="text-gray-600">
                Inflation is the rate at which the general level of prices for goods and services rises
                over time, resulting in a decrease in purchasing power. When inflation occurs, each unit
                of currency buys fewer goods and services.
              </p>
              <p className="text-gray-600">
                The US Federal Reserve targets a 2% annual inflation rate as ideal for economic growth.
                Too little inflation risks deflation (falling prices, reduced spending), while too much
                erodes consumer purchasing power.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8">Inflation Calculator Formula</h2>
              <div className="rounded-xl bg-gray-900 p-5 font-mono text-sm text-green-400 not-prose">
                <div className="text-gray-400 mb-1"># General Inflation Formula</div>
                <div>Adjusted Value = Original Amount × (CPI_End / CPI_Start)</div>
                <div className="mt-3 text-gray-400"># Example: $1,000 in 2010 → 2024</div>
                <div>= $1,000 × (314.2 / 218.1)</div>
                <div>= $1,000 × 1.4406</div>
                <div className="text-yellow-400">= $1,440.60</div>
                <div className="mt-3 text-gray-400"># Annual Compound Rate</div>
                <div>Rate = (CPI_End / CPI_Start)^(1/years) − 1</div>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mt-8">How to Use This Inflation Calculator</h2>
              <ol className="space-y-2 text-gray-600">
                <li><strong>General Tab:</strong> Enter any dollar amount, select start and end years, and get the inflation-adjusted equivalent.</li>
                <li><strong>Salary Tab:</strong> Enter your current salary and expected annual raises to see if your real purchasing power is growing or shrinking.</li>
                <li><strong>Future Value Tab:</strong> Enter today&apos;s amount and expected inflation rate to see how much you&apos;ll need in the future.</li>
                <li><strong>CPI History Tab:</strong> Browse the complete US Consumer Price Index from 1980 to 2025.</li>
              </ol>

              <h2 className="text-2xl font-bold text-gray-900 mt-8">US Inflation by Decade</h2>
              <div className="not-prose overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-gray-50 text-left">
                      <th className="border border-gray-200 px-4 py-2 font-semibold">Decade</th>
                      <th className="border border-gray-200 px-4 py-2 font-semibold">Avg. Annual Rate</th>
                      <th className="border border-gray-200 px-4 py-2 font-semibold">Key Events</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { decade: "1980s", rate: "5.6%", event: "Volcker shock, disinflation" },
                      { decade: "1990s", rate: "3.0%", event: "Tech boom, stable growth" },
                      { decade: "2000s", rate: "2.6%", event: "Housing crisis, financial crash" },
                      { decade: "2010s", rate: "1.8%", event: "Recovery, near-zero interest rates" },
                      { decade: "2020s", rate: "4.5%", event: "Pandemic, supply chain, Fed hikes" },
                    ].map((row) => (
                      <tr key={row.decade} className="hover:bg-gray-50">
                        <td className="border border-gray-200 px-4 py-2 font-medium">{row.decade}</td>
                        <td className="border border-gray-200 px-4 py-2 text-red-600 font-semibold">{row.rate}</td>
                        <td className="border border-gray-200 px-4 py-2 text-gray-600">{row.event}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* FAQ */}
            <section>
              <h2 className="mb-6 text-2xl font-bold text-gray-900">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {faqs.map((faq, i) => (
                  <div key={i} className="card p-5">
                    <h3 className="font-semibold text-gray-900">{faq.question}</h3>
                    <p className="mt-2 text-sm text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Ad — Bottom */}
            <div className="ad-slot">Advertisement</div>
          </div>

          {/* Sidebar */}
          <aside className="mt-8 space-y-6 lg:mt-0">
            {/* Sticky Ad */}
            <div className="ad-slot h-[250px]">Advertisement</div>

            {/* Related Tools */}
            <div className="card p-5">
              <h3 className="mb-4 font-semibold text-gray-900">Related Finance Tools</h3>
              <ul className="space-y-3">
                {relatedTools.map((t) => (
                  <li key={t.href}>
                    <Link href={t.href} className="group flex items-start gap-2">
                      <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-blue-500 group-hover:translate-x-0.5 transition-transform" />
                      <div>
                        <div className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors">{t.title}</div>
                        <div className="text-xs text-gray-500">{t.desc}</div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Facts */}
            <div className="card p-5 space-y-3">
              <h3 className="font-semibold text-gray-900">Inflation Quick Facts</h3>
              {[
                { label: "Fed Target Rate", value: "2.0%" },
                { label: "2024 US Inflation", value: "2.9%" },
                { label: "2022 Peak (US)", value: "8.0%" },
                { label: "Historical Avg (US)", value: "~3.1%" },
                { label: "CPI Base Year", value: "1982–84" },
              ].map((f) => (
                <div key={f.label} className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">{f.label}</span>
                  <span className="font-semibold text-gray-900">{f.value}</span>
                </div>
              ))}
            </div>

            {/* Ad */}
            <div className="ad-slot h-[250px]">Advertisement</div>
          </aside>
        </div>
      </div>
    </>
  );
}
