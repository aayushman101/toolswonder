import type { Metadata } from "next";
import EMICalculator from "@/components/tools/EMICalculator";
import JsonLd, { buildToolSchema, buildFaqSchema, buildBreadcrumbSchema } from "@/components/seo/JsonLd";
import Breadcrumb from "@/components/layout/Breadcrumb";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

const BASE_URL = "https://toolswonder.com";
const TOOL_URL = `${BASE_URL}/tools/emi-calculator`;

export const metadata: Metadata = {
  title: "EMI Calculator – Home Loan, Car Loan & Personal Loan EMI",
  description: "Free EMI calculator for home loan, car loan, personal loan and education loan. Calculate monthly EMI, total interest, and total payment instantly. Indian rupee (₹).",
  keywords: ["emi calculator", "home loan emi calculator", "car loan emi calculator", "personal loan emi calculator", "loan emi calculator india", "monthly emi calculator"],
  alternates: { canonical: TOOL_URL },
};

const faqs = [
  { question: "What is EMI and how is it calculated?", answer: "EMI (Equated Monthly Instalment) is the fixed monthly payment for a loan. Formula: EMI = P × r × (1+r)^n / [(1+r)^n – 1]. Where P = principal, r = monthly interest rate (annual rate ÷ 12 ÷ 100), n = tenure in months. Example: ₹10L home loan at 8.5% for 20 years: r = 8.5/12/100 = 0.00708; n = 240; EMI = ₹8,678/month." },
  { question: "What is a good EMI to income ratio?", answer: "Financial advisors recommend keeping total EMI below 40–50% of take-home salary. For home loans specifically, EMI should be under 30–35% of salary. Example: If take-home is ₹50,000/month, total EMIs should not exceed ₹20,000–25,000. Higher EMI-to-income ratio means less money for savings and emergencies." },
  { question: "How to reduce home loan EMI?", answer: "4 ways: (1) Higher down payment — borrow less, (2) Longer tenure — spreads payments but increases total interest, (3) Lower interest rate — negotiate or switch lenders, (4) Part prepayment — reduces principal and future EMIs. Paying even 1 extra EMI per year can cut 3–4 years off a 20-year loan." },
  { question: "What is the difference between flat rate and reducing balance?", answer: "Flat rate: Interest calculated on original principal throughout. 10% flat on ₹10L = ₹1L/year. Reducing balance (most bank loans): Interest calculated on outstanding principal, which decreases each month. 10% reducing on ₹10L is equivalent to ~18% flat rate. Always check which method your lender uses." },
  { question: "How much home loan can I get on my salary?", answer: "General rule: banks offer 60× monthly salary as home loan. Salary ₹30,000 → ₹18L. Salary ₹50,000 → ₹30L. Salary ₹1L → ₹60L. Actual amount depends on: existing EMIs, credit score (750+ for best rates), age, job stability. FOIR (Fixed Obligation to Income Ratio) should be under 50%." },
  { question: "Is it better to increase EMI or tenure for prepayment?", answer: "Increasing EMI is better — you pay off faster, saving significantly on total interest. Example: ₹30L loan at 8.5% for 20 years (EMI ₹26,035). Increasing EMI by ₹5,000 saves ~₹8L in interest and cuts tenure by ~5 years. Increasing tenure only reduces monthly burden without saving on interest." },
];

export default function EMICalculatorPage() {
  return (
    <>
      <JsonLd data={buildToolSchema({ name: "EMI Calculator", description: "Calculate home loan, car loan, and personal loan EMI, total interest, and payment breakdown instantly.", url: TOOL_URL, category: "Finance" })} />
      <JsonLd data={buildFaqSchema(faqs)} />
      <JsonLd data={buildBreadcrumbSchema([{ name: "Home", url: BASE_URL }, { name: "Tools", url: `${BASE_URL}/tools` }, { name: "EMI Calculator", url: TOOL_URL }])} />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: "Tools", href: "/tools" }, { label: "EMI Calculator" }]} />
        <div className="ad-slot my-4">Advertisement</div>
        <div className="lg:grid lg:grid-cols-[1fr_280px] lg:gap-8">
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 sm:text-4xl">EMI Calculator</h1>
              <p className="mt-3 text-lg text-gray-600 dark:text-gray-400">Calculate your monthly EMI for home loan, car loan, personal loan or education loan. Enter loan amount, interest rate, and tenure to get EMI, total interest, and full payment breakdown.</p>
            </div>
            <EMICalculator />
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
          </div>
          <aside className="mt-8 space-y-5 lg:mt-0">
            <div className="ad-slot h-[250px]">Advertisement</div>
            <div className="card p-5">
              <h3 className="mb-3 font-semibold text-gray-900 dark:text-gray-100">EMI Quick Reference</h3>
              <div className="space-y-2 text-xs">
                {[["₹20L @ 8.5% × 20yr","₹17,356/mo"],["₹30L @ 8.5% × 20yr","₹26,035/mo"],["₹50L @ 8.5% × 20yr","₹43,391/mo"],["₹5L @ 9% × 5yr (car)","₹10,381/mo"],["₹3L @ 14% × 3yr (personal)","₹10,249/mo"]].map(([s,v]) => (
                  <div key={s} className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">{s}</span>
                    <span className="font-semibold text-blue-700 dark:text-blue-400">{v}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="card p-5">
              <h3 className="mb-3 font-semibold text-gray-900 dark:text-gray-100">Related Finance Tools</h3>
              <ul className="space-y-3 text-sm">
                {[
                  { title: "Mortgage Calculator", href: "/tools/mortgage-calculator" },
                  { title: "Real Estate Commission Calculator", href: "/tools/real-estate-commission-calculator" },
                  { title: "SIP Calculator", href: "/tools/sip-calculator" },
                  { title: "Inflation Calculator", href: "/tools/inflation-calculator" },
                ].map((t) => (
                  <li key={t.href}>
                    <Link href={t.href} className="flex items-center gap-2 text-blue-700 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300">
                      <ChevronRight className="h-3.5 w-3.5 shrink-0" /> {t.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
