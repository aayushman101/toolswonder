import type { Metadata } from "next";
import Link from "next/link";
import MortgageCalculator from "@/components/tools/MortgageCalculator";
import JsonLd, { buildToolSchema, buildFaqSchema, buildBreadcrumbSchema } from "@/components/seo/JsonLd";
import Breadcrumb from "@/components/layout/Breadcrumb";
import { ChevronRight } from "lucide-react";

const BASE_URL = "https://toolswonder.com";
const TOOL_URL = `${BASE_URL}/tools/mortgage-calculator`;

export const metadata: Metadata = {
  title: "Mortgage Calculator – Monthly Payment, Interest & Amortization",
  description:
    "Free mortgage calculator. Calculate monthly payments, total interest, and full amortization schedule. Includes property tax, homeowners insurance, PMI, and HOA fees.",
  keywords: [
    "mortgage calculator",
    "home loan calculator",
    "monthly payment calculator",
    "mortgage calculator with taxes and insurance",
    "mortgage amortization calculator",
    "pmi calculator",
    "mortgage payment calculator",
  ],
  alternates: { canonical: TOOL_URL },
  openGraph: {
    title: "Mortgage Calculator – Monthly Payment, Interest & Amortization | ToolsWonder",
    description: "Calculate your monthly mortgage payment including principal, interest, taxes, insurance, PMI, and HOA. Free, instant amortization schedule.",
    url: TOOL_URL,
    type: "website",
  },
};

const faqs = [
  {
    question: "How is a mortgage payment calculated?",
    answer:
      "Monthly principal & interest uses the formula: M = P × [r(1+r)^n] / [(1+r)^n – 1]. Where P = loan amount, r = monthly interest rate (annual rate ÷ 12), n = number of payments (years × 12). Example: $300,000 loan at 6.5% for 30 years: r = 0.065/12 = 0.00542, n = 360, M ≈ $1,896/month for principal and interest alone.",
  },
  {
    question: "What is included in a monthly mortgage payment (PITI)?",
    answer:
      "PITI stands for Principal, Interest, Taxes, and Insurance — the four components of a typical monthly mortgage payment. Property tax and homeowners insurance are often collected monthly into an escrow account and paid on your behalf. PMI (Private Mortgage Insurance) and HOA fees may add to this if applicable.",
  },
  {
    question: "What is PMI and when do I need it?",
    answer:
      "PMI (Private Mortgage Insurance) is typically required when your down payment is less than 20% of the home price. It protects the lender if you default. PMI usually costs 0.5–1.5% of the loan amount per year and can be removed once you reach 20% equity.",
  },
  {
    question: "How much down payment do I need for a mortgage?",
    answer:
      "Conventional loans typically require 5–20% down. FHA loans allow as little as 3.5% down. VA and USDA loans can offer 0% down for eligible borrowers. A 20%+ down payment avoids PMI and reduces your monthly payment and total interest paid.",
  },
  {
    question: "How does loan term affect my mortgage payment?",
    answer:
      "A 15-year mortgage has a higher monthly payment than a 30-year mortgage for the same loan amount, but you pay significantly less total interest and build equity faster. Example: $300,000 at 6.5% — 30-year term is about $1,896/month with ~$382,000 total interest; 15-year term is about $2,613/month with ~$170,000 total interest.",
  },
  {
    question: "What is an amortization schedule?",
    answer:
      "An amortization schedule shows how each monthly payment splits between principal and interest over the life of the loan. Early payments are interest-heavy; later payments are principal-heavy. Our calculator generates the full year-by-year (and month-by-month) breakdown automatically.",
  },
];

const relatedTools = [
  { title: "Real Estate Commission Calculator", href: "/tools/real-estate-commission-calculator", desc: "Agent commission and net proceeds when selling" },
  { title: "EMI Calculator", href: "/tools/emi-calculator", desc: "Home, car, and personal loan EMI" },
  { title: "SIP Calculator", href: "/tools/sip-calculator", desc: "Systematic Investment Plan returns" },
  { title: "Inflation Calculator", href: "/tools/inflation-calculator", desc: "Adjust money for inflation over time" },
];

export default function MortgageCalculatorPage() {
  return (
    <>
      <JsonLd data={buildToolSchema({ name: "Mortgage Calculator", description: "Calculate monthly mortgage payments including principal, interest, property tax, insurance, PMI, and HOA fees with full amortization breakdown.", url: TOOL_URL, category: "Finance" })} />
      <JsonLd data={buildFaqSchema(faqs)} />
      <JsonLd data={buildBreadcrumbSchema([
        { name: "Home", url: BASE_URL },
        { name: "Tools", url: `${BASE_URL}/tools` },
        { name: "Mortgage Calculator", url: TOOL_URL },
      ])} />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: "Tools", href: "/tools" }, { label: "Mortgage Calculator" }]} />
        <div className="ad-slot my-4">Advertisement</div>

        <div className="lg:grid lg:grid-cols-[1fr_280px] lg:gap-8">
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 sm:text-4xl">Mortgage Calculator</h1>
              <p className="mt-3 text-lg text-gray-600 dark:text-gray-400">
                Calculate your monthly mortgage payment including principal, interest, property tax, insurance,
                PMI, and HOA fees. Get a full amortization schedule instantly.
              </p>
            </div>

            <MortgageCalculator />

            <div className="ad-slot">Advertisement</div>

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
              <h3 className="mb-3 font-semibold text-gray-900 dark:text-gray-100">Payment Quick Reference</h3>
              <div className="space-y-2 text-xs">
                {[
                  ["$200,000 @ 6.5% × 30yr", "$1,264/mo"],
                  ["$300,000 @ 6.5% × 30yr", "$1,896/mo"],
                  ["$400,000 @ 6.5% × 30yr", "$2,528/mo"],
                  ["$300,000 @ 6.5% × 15yr", "$2,613/mo"],
                  ["$300,000 @ 7% × 30yr", "$1,996/mo"],
                ].map(([s, v]) => (
                  <div key={s} className="flex justify-between gap-2">
                    <span className="text-gray-500 dark:text-gray-400">{s}</span>
                    <span className="font-semibold text-blue-700 dark:text-blue-400 text-right">{v}</span>
                  </div>
                ))}
                <p className="text-xs text-gray-400 pt-1">Principal &amp; interest only, taxes/insurance extra.</p>
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
