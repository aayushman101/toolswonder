import type { Metadata } from "next";
import Link from "next/link";
import RenovationCostCalculator from "@/components/tools/RenovationCostCalculator";
import JsonLd, { buildToolSchema, buildFaqSchema, buildBreadcrumbSchema } from "@/components/seo/JsonLd";
import Breadcrumb from "@/components/layout/Breadcrumb";
import { ChevronRight } from "lucide-react";

const BASE_URL = "https://toolswonder.com";
const TOOL_URL = `${BASE_URL}/tools/renovation-cost-calculator`;

export const metadata: Metadata = {
  title: "Renovation Cost Calculator – Kitchen, Bathroom & Whole House",
  description:
    "Free renovation cost calculator. Estimate kitchen, bathroom, whole house, basement, or room renovation cost by square footage, finish quality, and region. Get a materials vs labor breakdown instantly.",
  keywords: [
    "renovation cost calculator",
    "home renovation cost calculator",
    "kitchen renovation cost calculator",
    "bathroom renovation cost calculator",
    "whole house renovation cost calculator",
    "house renovation cost calculator",
    "remodel cost calculator",
    "renovation budget calculator",
  ],
  alternates: { canonical: TOOL_URL },
  openGraph: {
    title: "Renovation Cost Calculator – Kitchen, Bathroom & Whole House | ToolsWonder",
    description: "Estimate renovation cost by room type, square footage, and finish quality. Free, instant, with materials vs labor breakdown.",
    url: TOOL_URL,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Renovation Cost Calculator",
    description: "Estimate kitchen, bathroom, or whole house renovation cost. Free and instant.",
  },
};

const faqs = [
  {
    question: "How do you calculate renovation cost?",
    answer:
      "Renovation cost = Area (sq ft) × Cost per sq ft for your renovation type and finish quality. Cost per sq ft varies widely by room: kitchens and bathrooms cost far more per sq ft than living rooms or whole-house renovations because of plumbing, electrical, cabinetry, and fixtures packed into a small footprint. Multiply by a regional cost factor to adjust for your local labor market.",
  },
  {
    question: "How much does a kitchen renovation cost?",
    answer:
      "A kitchen renovation typically runs $100–$400+ per sq ft depending on finish level. A 150 sq ft kitchen at a mid-range finish (~$200/sq ft) costs roughly $30,000, while the same kitchen at a budget finish (~$100/sq ft) costs around $15,000, and at a high-end/luxury finish (~$400/sq ft) can exceed $60,000.",
  },
  {
    question: "How much does a bathroom renovation cost?",
    answer:
      "Bathroom renovations run roughly $150–$450 per sq ft — often the highest cost-per-sq-ft of any room because of plumbing, waterproofing, tile, and fixtures in a small space. A typical 50 sq ft bathroom at mid-range finish (~$250/sq ft) costs around $12,500.",
  },
  {
    question: "How much does it cost to renovate a whole house?",
    answer:
      "Whole-house renovations typically cost $20–$100 per sq ft on average, much lower per sq ft than kitchens or bathrooms since most of the space (bedrooms, living areas, hallways) is far cheaper to renovate. A 2,000 sq ft home at a mid-range finish (~$50/sq ft) runs approximately $100,000, though gut renovations with structural work can run considerably higher.",
  },
  {
    question: "What percentage of renovation cost is labor vs materials?",
    answer:
      "As a general rule, labor accounts for roughly 55% of renovation cost and materials about 45%, though this shifts based on project type — high-end material choices (marble, custom cabinetry) push the materials share higher, while structural or plumbing-heavy work pushes the labor share higher.",
  },
  {
    question: "What factors affect renovation cost the most?",
    answer:
      "Finish quality (budget vs luxury fixtures/materials) has the biggest swing — often 3-4x between tiers. Other major factors: your region's labor cost, whether plumbing or electrical needs to be relocated, structural changes (moving walls), permit requirements, and whether you're doing a cosmetic refresh vs a full gut renovation.",
  },
];

const relatedTools = [
  { title: "Paint Calculator", href: "/tools/paint-calculator", desc: "Litres of paint for any room" },
  { title: "Flooring Calculator", href: "/tools/flooring-calculator", desc: "Boxes of flooring materials needed" },
  { title: "Drywall Calculator", href: "/tools/drywall-calculator", desc: "Sheets, compound, and tape needed" },
  { title: "Mortgage Calculator", href: "/tools/mortgage-calculator", desc: "Monthly home loan payment" },
];

export default function RenovationCostCalculatorPage() {
  return (
    <>
      <JsonLd data={buildToolSchema({ name: "Renovation Cost Calculator", description: "Estimate kitchen, bathroom, whole house, basement, or room renovation cost by square footage, finish quality, and region.", url: TOOL_URL, category: "Construction" })} />
      <JsonLd data={buildFaqSchema(faqs)} />
      <JsonLd data={buildBreadcrumbSchema([
        { name: "Home", url: BASE_URL },
        { name: "Tools", url: `${BASE_URL}/tools` },
        { name: "Renovation Cost Calculator", url: TOOL_URL },
      ])} />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: "Tools", href: "/tools" }, { label: "Renovation Cost Calculator" }]} />
        <div className="ad-slot my-4">Advertisement</div>

        <div className="lg:grid lg:grid-cols-[1fr_280px] lg:gap-8">
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 sm:text-4xl">Renovation Cost Calculator</h1>
              <p className="mt-3 text-lg text-gray-600 dark:text-gray-400">
                Estimate kitchen, bathroom, whole house, basement, or room renovation cost. Enter
                square footage, finish quality, and region to get a total cost estimate with a
                materials vs labor breakdown.
              </p>
            </div>

            <RenovationCostCalculator />

            <div className="ad-slot">Advertisement</div>

            <section className="prose prose-gray dark:prose-invert max-w-none">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Average Renovation Cost per Sq Ft</h2>
              <p className="text-gray-600 dark:text-gray-400">National-average estimates used in this calculator, by finish tier:</p>
              <div className="not-prose overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700 text-left">
                      <th className="py-2 pr-4 font-semibold text-gray-900 dark:text-gray-100">Room Type</th>
                      <th className="py-2 pr-4 font-semibold text-gray-900 dark:text-gray-100">Budget</th>
                      <th className="py-2 pr-4 font-semibold text-gray-900 dark:text-gray-100">Mid-Range</th>
                      <th className="py-2 font-semibold text-gray-900 dark:text-gray-100">High-End</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-600 dark:text-gray-400">
                    {[
                      ["Kitchen", "$100/sq ft", "$200/sq ft", "$400/sq ft"],
                      ["Bathroom", "$150/sq ft", "$250/sq ft", "$450/sq ft"],
                      ["Whole House", "$20/sq ft", "$50/sq ft", "$100/sq ft"],
                      ["Basement", "$25/sq ft", "$50/sq ft", "$90/sq ft"],
                      ["Living Room / General Room", "$20/sq ft", "$40/sq ft", "$80/sq ft"],
                    ].map((row) => (
                      <tr key={row[0]} className="border-b border-gray-100 dark:border-gray-800">
                        {row.map((cell, i) => <td key={i} className="py-2 pr-4">{cell}</td>)}
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

            <div className="ad-slot">Advertisement</div>
          </div>

          <aside className="mt-8 space-y-5 lg:mt-0">
            <div className="ad-slot h-[250px]">Advertisement</div>

            <div className="card p-5">
              <h3 className="mb-3 font-semibold text-gray-900 dark:text-gray-100">Cost Range Examples</h3>
              <div className="space-y-2 text-xs">
                {[
                  ["150 sq ft kitchen, mid-range", "~$30,000"],
                  ["50 sq ft bathroom, mid-range", "~$12,500"],
                  ["2,000 sq ft whole house, mid", "~$100,000"],
                  ["300 sq ft basement, budget", "~$7,500"],
                ].map(([s, v]) => (
                  <div key={s} className="flex justify-between gap-2">
                    <span className="text-gray-500 dark:text-gray-400">{s}</span>
                    <span className="font-semibold text-orange-700 dark:text-orange-400 text-right">{v}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="card p-5">
              <h3 className="mb-3 font-semibold text-gray-900 dark:text-gray-100">Related Tools</h3>
              <ul className="space-y-3 text-sm">
                {relatedTools.map((t) => (
                  <li key={t.href}>
                    <Link href={t.href} className="group flex items-start gap-2">
                      <ChevronRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-orange-500 group-hover:translate-x-0.5 transition-transform" />
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-gray-100 group-hover:text-orange-600 transition-colors">{t.title}</div>
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
