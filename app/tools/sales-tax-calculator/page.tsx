import type { Metadata } from "next";
import Link from "next/link";
import SalesTaxCalculator from "@/components/tools/SalesTaxCalculator";
import JsonLd, { buildToolSchema, buildFaqSchema, buildBreadcrumbSchema } from "@/components/seo/JsonLd";
import Breadcrumb from "@/components/layout/Breadcrumb";
import { ChevronRight } from "lucide-react";

const BASE_URL = "https://toolswonder.com";
const TOOL_URL = `${BASE_URL}/tools/sales-tax-calculator`;

export const metadata: Metadata = {
  title: "Sales Tax Calculator – Add or Reverse Calculate Sales Tax by State",
  description:
    "Free sales tax calculator for all 50 US states. Add sales tax to a price, or reverse calculate the pre-tax price from a tax-included total. Includes state-by-state rates and a local tax field.",
  keywords: [
    "sales tax calculator",
    "reverse sales tax calculator",
    "nj sales tax calculator",
    "sales tax calculator by state",
    "reverse sales tax calculator by state",
    "sales tax calculator usa",
    "calculate sales tax",
    "sales tax rate calculator",
  ],
  alternates: { canonical: TOOL_URL },
  openGraph: {
    title: "Sales Tax Calculator – Add or Reverse Calculate Sales Tax by State | ToolsWonder",
    description: "Add sales tax to a price or reverse calculate the pre-tax amount, for all 50 US states. Free and instant.",
    url: TOOL_URL,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sales Tax Calculator",
    description: "Add or reverse calculate sales tax for any US state. Free and instant.",
  },
};

const faqs = [
  {
    question: "How do I calculate sales tax on a price?",
    answer:
      "Sales tax = Price × Tax rate. Total price = Price + Sales tax. Example: a $100 item in New Jersey (6.625% state rate) has $6.63 in sales tax, for a total of $106.63. Use the 'Add Sales Tax' mode above and select your state to auto-fill the rate.",
  },
  {
    question: "How do I reverse calculate sales tax (find the pre-tax price)?",
    answer:
      "If you only know the total (tax-included) price, use: Pre-tax price = Total ÷ (1 + tax rate). Example: a $106.63 receipt at 6.625% tax means Pre-tax price = 106.63 ÷ 1.06625 = $100.00, so the tax was $6.63. Use the 'Reverse (Remove Tax)' mode above — just enter the total you paid.",
  },
  {
    question: "Why does sales tax vary by state?",
    answer:
      "Sales tax is set at the state level in the US, and five states (Alaska, Delaware, Montana, New Hampshire, Oregon) have no statewide sales tax at all. On top of the state rate, many states allow counties and cities to add their own local sales tax, so the actual rate you pay can be higher than the base state rate shown here — always check your local combined rate for exact totals.",
  },
  {
    question: "What is New Jersey's sales tax rate?",
    answer:
      "New Jersey has a statewide sales tax rate of 6.625%, and unlike many states it does not generally permit additional local sales tax on top of that (with limited exceptions like Urban Enterprise Zones, which have a reduced rate). This makes NJ one of the simpler states to calculate — select New Jersey in the calculator above for the correct default rate.",
  },
  {
    question: "Which US states have no sales tax?",
    answer:
      "Five states have no statewide sales tax: Alaska, Delaware, Montana, New Hampshire, and Oregon. Alaska and Montana do allow certain local jurisdictions to charge their own local sales tax, so purchases there aren't always tax-free — but there's no state-level rate to add.",
  },
  {
    question: "Is sales tax the same as VAT?",
    answer:
      "No. Sales tax (used in the US) is charged only once, at the final point of sale to the consumer. VAT (Value Added Tax, used in the EU and most other countries) is charged at every stage of production and distribution, with businesses reclaiming the VAT they paid on inputs. The two aren't directly interchangeable in calculations.",
  },
];

const relatedTools = [
  { title: "Tariff Calculator", href: "/tools/tariff-calculator", desc: "US & EU import duty and landed cost" },
  { title: "EMI Calculator", href: "/tools/emi-calculator", desc: "Home, car, and personal loan EMI" },
  { title: "Mortgage Calculator", href: "/tools/mortgage-calculator", desc: "Monthly home loan payment" },
];

export default function SalesTaxCalculatorPage() {
  return (
    <>
      <JsonLd data={buildToolSchema({ name: "Sales Tax Calculator", description: "Add sales tax to a price or reverse calculate the pre-tax price from a tax-included total, for all 50 US states.", url: TOOL_URL, category: "Finance" })} />
      <JsonLd data={buildFaqSchema(faqs)} />
      <JsonLd data={buildBreadcrumbSchema([
        { name: "Home", url: BASE_URL },
        { name: "Tools", url: `${BASE_URL}/tools` },
        { name: "Sales Tax Calculator", url: TOOL_URL },
      ])} />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: "Tools", href: "/tools" }, { label: "Sales Tax Calculator" }]} />
        <div className="ad-slot my-4">Advertisement</div>

        <div className="lg:grid lg:grid-cols-[1fr_280px] lg:gap-8">
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 sm:text-4xl">Sales Tax Calculator</h1>
              <p className="mt-3 text-lg text-gray-600 dark:text-gray-400">
                Add sales tax to a price, or reverse calculate the pre-tax price from a total you
                already paid. Select any US state for its default rate, or enter a custom combined
                rate including local tax.
              </p>
            </div>

            <SalesTaxCalculator />

            <div className="ad-slot">Advertisement</div>

            <section className="prose prose-gray dark:prose-invert max-w-none">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Sales Tax Formulas</h2>
              <div className="not-prose rounded-xl bg-gray-900 p-5 font-mono text-sm overflow-x-auto">
                <div className="text-gray-400 mb-1"># Add sales tax to a price</div>
                <div className="text-green-400">Sales Tax = Price × Tax Rate</div>
                <div className="text-green-400">Total = Price + Sales Tax</div>
                <div className="text-gray-400 mt-3 mb-1"># Reverse calculate (find pre-tax price from a total)</div>
                <div className="text-yellow-400">Pre-Tax Price = Total ÷ (1 + Tax Rate)</div>
                <div className="text-yellow-400">Sales Tax = Total − Pre-Tax Price</div>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mt-4">
                State rates shown are base statewide rates. Many counties and cities layer on
                additional local sales tax — enter your known local rate in the &ldquo;Local /
                Additional Tax&rdquo; field for an accurate combined total.
              </p>
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

          <aside className="mt-8 space-y-5 lg:mt-0">
            <div className="ad-slot h-[250px]">Advertisement</div>

            <div className="card p-5">
              <h3 className="mb-3 font-semibold text-gray-900 dark:text-gray-100">Sample State Rates</h3>
              <div className="space-y-2 text-xs">
                {[
                  ["California", "7.25%"],
                  ["New Jersey", "6.625%"],
                  ["Texas", "6.25%"],
                  ["New York", "4.0%"],
                  ["Oregon", "0% (no sales tax)"],
                ].map(([s, v]) => (
                  <div key={s} className="flex justify-between gap-2">
                    <span className="text-gray-500 dark:text-gray-400">{s}</span>
                    <span className="font-semibold text-blue-700 dark:text-blue-400 text-right">{v}</span>
                  </div>
                ))}
                <p className="text-xs text-gray-400 pt-1">Base state rate; local tax may add more.</p>
              </div>
            </div>

            <div className="card p-5">
              <h3 className="mb-3 font-semibold text-gray-900 dark:text-gray-100">Related Finance Tools</h3>
              <ul className="space-y-3 text-sm">
                {relatedTools.map((t) => (
                  <li key={t.href}>
                    <Link href={t.href} className="group flex items-start gap-2">
                      <ChevronRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-blue-500 group-hover:translate-x-0.5 transition-transform" />
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-gray-100 group-hover:text-blue-600 transition-colors">{t.title}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">{t.desc}</div>
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
