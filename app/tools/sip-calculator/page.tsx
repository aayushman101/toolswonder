import type { Metadata } from "next";
import SIPCalculator from "@/components/tools/SIPCalculator";
import JsonLd, { buildToolSchema, buildFaqSchema, buildBreadcrumbSchema } from "@/components/seo/JsonLd";
import Breadcrumb from "@/components/layout/Breadcrumb";

const BASE_URL = "https://toolswonder.com";
const TOOL_URL = `${BASE_URL}/tools/sip-calculator`;

export const metadata: Metadata = {
  title: "SIP Calculator – Systematic Investment Plan Returns Calculator",
  description: "Free SIP calculator. Calculate monthly SIP returns, total invested amount, estimated wealth gain and maturity value. Supports lump sum too. Instant results.",
  keywords: ["sip calculator", "sip return calculator", "monthly sip calculator", "sip maturity calculator", "systematic investment plan calculator", "mutual fund sip calculator"],
  alternates: { canonical: TOOL_URL },
};

const faqs = [
  { question: "What is SIP and how does it work?", answer: "SIP (Systematic Investment Plan) is a method of investing a fixed amount in mutual funds at regular intervals (monthly). Each month your money buys units at the prevailing NAV. Over time, you benefit from rupee cost averaging and compounding. A ₹5,000/month SIP at 12% for 10 years grows to ₹11.6 lakh — from just ₹6 lakh invested." },
  { question: "How is SIP return calculated?", answer: "SIP uses compound interest formula: M = P × [(1+r)^n – 1] / r × (1+r). Where P = monthly investment, r = monthly rate (annual rate ÷ 12), n = number of months. Example: ₹5,000/month, 12% p.a. (1% monthly), 120 months: M = 5000 × [(1.01)^120 – 1] / 0.01 × 1.01 = ₹11.6 lakh." },
  { question: "What return rate should I assume for SIP?", answer: "Equity mutual funds historically return 12–15% p.a. over long periods (10+ years). Use 12% for conservative planning, 15% for optimistic. Debt funds return 6–8%. For balanced funds, use 10%. Remember: past returns don't guarantee future performance." },
  { question: "Is SIP better than lump sum?", answer: "SIP is better for most salaried investors because: (1) No need to time the market, (2) Rupee cost averaging reduces risk, (3) Builds discipline with regular investing. Lump sum is better when you have a large amount and markets are at a low. For most people, SIP is the practical choice." },
  { question: "What is the minimum SIP amount?", answer: "Most mutual funds allow SIP starting from ₹100–₹500 per month. Popular starting points: ₹500 (beginner), ₹1,000–₹5,000 (regular investor), ₹10,000+ (aggressive wealth builder). Start small — the key is consistency over time." },
  { question: "How long should I invest in SIP?", answer: "The longer, the better — thanks to compounding. A ₹5,000 SIP at 12%: 5 years = ₹4.1L (from ₹3L), 10 years = ₹11.6L (from ₹6L), 20 years = ₹49.9L (from ₹12L). Your money grows 4x in wealth ratio from 5 to 20 years. Minimum recommended horizon: 5 years for equity funds." },
];

export default function SIPCalculatorPage() {
  return (
    <>
      <JsonLd data={buildToolSchema({ name: "SIP Calculator", description: "Calculate SIP returns, maturity value, and wealth gain for any monthly investment amount and time period.", url: TOOL_URL, category: "Finance" })} />
      <JsonLd data={buildFaqSchema(faqs)} />
      <JsonLd data={buildBreadcrumbSchema([{ name: "Home", url: BASE_URL }, { name: "Tools", url: `${BASE_URL}/tools` }, { name: "SIP Calculator", url: TOOL_URL }])} />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: "Tools", href: "/tools" }, { label: "SIP Calculator" }]} />
        <div className="ad-slot my-4">Advertisement</div>
        <div className="lg:grid lg:grid-cols-[1fr_280px] lg:gap-8">
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 sm:text-4xl">SIP Calculator</h1>
              <p className="mt-3 text-lg text-gray-600 dark:text-gray-400">Calculate how much your monthly SIP investment will grow. Enter amount, expected return, and investment period to get maturity value and wealth gain. Supports both SIP and lump sum.</p>
            </div>
            <SIPCalculator />
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
              <h3 className="mb-3 font-semibold text-gray-900 dark:text-gray-100">SIP Quick Reference</h3>
              <div className="space-y-2 text-xs">
                {[["₹1,000/mo @ 12% × 10yr","₹2.32 L"],["₹5,000/mo @ 12% × 10yr","₹11.6 L"],["₹10,000/mo @ 12% × 10yr","₹23.2 L"],["₹5,000/mo @ 12% × 20yr","₹49.9 L"],["₹5,000/mo @ 15% × 20yr","₹75.8 L"]].map(([s,v]) => (
                  <div key={s} className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">{s}</span>
                    <span className="font-semibold text-green-700 dark:text-green-400">{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
