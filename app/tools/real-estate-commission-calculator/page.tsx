import type { Metadata } from "next";
import Link from "next/link";
import CommissionCalculator from "@/components/tools/CommissionCalculator";
import JsonLd, { buildToolSchema, buildFaqSchema, buildBreadcrumbSchema } from "@/components/seo/JsonLd";
import Breadcrumb from "@/components/layout/Breadcrumb";
import { ChevronRight } from "lucide-react";

const BASE_URL = "https://toolswonder.com";
const TOOL_URL = `${BASE_URL}/tools/real-estate-commission-calculator`;

export const metadata: Metadata = {
  title: "Real Estate Commission Calculator – Agent, Broker Split & Sales Commission",
  description:
    "Free real estate commission calculator. Calculate listing and buyer's agent commission, net proceeds to seller, and agent take-home after brokerage split. Also includes a general sales commission calculator.",
  keywords: [
    "real estate commission calculator",
    "realtor commission calculator",
    "real estate agent commission calculator",
    "commission calculator",
    "sales commission calculator",
    "real estate commission split calculator",
    "how much is real estate commission",
    "agent commission calculator",
    "broker commission split calculator",
  ],
  alternates: { canonical: TOOL_URL },
  openGraph: {
    title: "Real Estate Commission Calculator – Agent, Broker Split & Sales Commission | ToolsWonder",
    description: "Calculate real estate commission, net proceeds to seller, and agent take-home after brokerage split. Free, instant.",
    url: TOOL_URL,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Real Estate Commission Calculator",
    description: "Calculate real estate commission, net proceeds, and agent take-home. Free and instant.",
  },
};

const faqs = [
  {
    question: "How do you calculate real estate commission?",
    answer:
      "Real estate commission = Sale price × Commission rate. Total commission is typically 5–6% of the sale price, usually split evenly between the listing agent's side and the buyer's agent's side (e.g., 3% + 3%). Example: a $400,000 home at 6% total commission = $24,000, split as $12,000 to each side before any brokerage split.",
  },
  {
    question: "Who pays real estate agent commission?",
    answer:
      "Traditionally the seller pays the full commission out of sale proceeds, which is then split between the listing brokerage and the buyer's brokerage. Following the 2024 NAR settlement, buyer's agent commission is no longer required to be offered through the MLS in the US — buyers may now negotiate and pay their agent directly in some transactions, so terms vary by deal and state.",
  },
  {
    question: "What is a typical real estate commission split with a broker?",
    answer:
      "Agents don't keep their entire side of the commission — they split it with their brokerage. Common splits range from 50/50 (new agents) to 70/30, 80/20, or even 100% with a monthly desk fee (high-producing agents on a 'cap' plan). A 70/30 split means the agent keeps 70% of their side's commission and the brokerage keeps 30%.",
  },
  {
    question: "How much commission does a real estate agent make on a $500,000 house?",
    answer:
      "At a typical 6% total commission, the full commission is $30,000, split roughly $15,000 to the listing side and $15,000 to the buyer's side. If the listing agent is on a 70/30 split with their brokerage, they personally take home 70% of $15,000 = $10,500 before taxes and expenses.",
  },
  {
    question: "Is real estate commission negotiable?",
    answer:
      "Yes. Commission rates are not fixed by law and can be negotiated between the seller and their listing agent. Rates commonly range from 4% to 6% total, though they can be lower for high-value homes or higher for difficult-to-sell properties. Always get the rate in writing in your listing agreement.",
  },
  {
    question: "How is sales commission calculated for non-real-estate sales?",
    answer:
      "General sales commission = Sale amount × Commission rate, often summed across multiple deals in a period. Structures vary: flat percentage (most common), tiered rates that increase after hitting quota, or a base salary plus commission (OTE). Use the 'Sales Commission' tab above for a straightforward flat-rate calculation across any number of deals.",
  },
];

const relatedTools = [
  { title: "Mortgage Calculator", href: "/tools/mortgage-calculator", desc: "Monthly home loan payment" },
  { title: "EMI Calculator", href: "/tools/emi-calculator", desc: "Home, car, and personal loan EMI" },
  { title: "SIP Calculator", href: "/tools/sip-calculator", desc: "Systematic Investment Plan returns" },
];

export default function RealEstateCommissionCalculatorPage() {
  return (
    <>
      <JsonLd data={buildToolSchema({ name: "Real Estate Commission Calculator", description: "Calculate real estate agent commission, net proceeds to seller, brokerage split, and general sales commission.", url: TOOL_URL, category: "Finance" })} />
      <JsonLd data={buildFaqSchema(faqs)} />
      <JsonLd data={buildBreadcrumbSchema([
        { name: "Home", url: BASE_URL },
        { name: "Tools", url: `${BASE_URL}/tools` },
        { name: "Real Estate Commission Calculator", url: TOOL_URL },
      ])} />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: "Tools", href: "/tools" }, { label: "Real Estate Commission Calculator" }]} />
        <div className="ad-slot my-4">Advertisement</div>

        <div className="lg:grid lg:grid-cols-[1fr_280px] lg:gap-8">
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 sm:text-4xl">Real Estate Commission Calculator</h1>
              <p className="mt-3 text-lg text-gray-600 dark:text-gray-400">
                Calculate listing and buyer&apos;s agent commission, net proceeds to seller, and agent
                take-home after brokerage split. Also includes a general sales commission calculator
                for any deal-based commission structure.
              </p>
            </div>

            <CommissionCalculator />

            <div className="ad-slot">Advertisement</div>

            <section className="prose prose-gray dark:prose-invert max-w-none">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Real Estate Commission Formula</h2>
              <div className="not-prose rounded-xl bg-gray-900 p-5 font-mono text-sm overflow-x-auto">
                <div className="text-gray-400 mb-1"># Total commission</div>
                <div className="text-green-400">Total Commission = Sale Price × (Listing Rate % + Buyer&apos;s Rate %)</div>
                <div className="text-gray-400 mt-3 mb-1"># Net proceeds to seller</div>
                <div className="text-yellow-400">Net Proceeds = Sale Price − Total Commission</div>
                <div className="text-gray-400 mt-3 mb-1"># Agent take-home after brokerage split</div>
                <div className="text-yellow-400">Agent Take-Home = Side&apos;s Commission × Agent Split %</div>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mt-4">
                Commission rates and structures vary by market, brokerage, and negotiation — the
                figures above are for planning purposes. Always confirm exact rates and splits in your
                listing agreement or brokerage agreement.
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
              <h3 className="mb-3 font-semibold text-gray-900 dark:text-gray-100">Typical Commission Rates</h3>
              <div className="space-y-2 text-xs">
                {[
                  ["Total (US average)", "5–6%"],
                  ["Listing agent side", "2.5–3%"],
                  ["Buyer's agent side", "2.5–3%"],
                  ["New agent broker split", "50/50"],
                  ["Experienced agent split", "70/30 – 90/10"],
                ].map(([s, v]) => (
                  <div key={s} className="flex justify-between gap-2">
                    <span className="text-gray-500 dark:text-gray-400">{s}</span>
                    <span className="font-semibold text-blue-700 dark:text-blue-400 text-right">{v}</span>
                  </div>
                ))}
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
