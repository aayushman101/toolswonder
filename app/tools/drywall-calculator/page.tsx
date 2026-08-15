import type { Metadata } from "next";
import Link from "next/link";
import DrywallCalculator from "@/components/tools/DrywallCalculator";
import JsonLd, { buildToolSchema, buildFaqSchema, buildBreadcrumbSchema } from "@/components/seo/JsonLd";
import Breadcrumb from "@/components/layout/Breadcrumb";
import { ChevronRight } from "lucide-react";

const BASE_URL = "https://toolswonder.com";
const TOOL_URL = `${BASE_URL}/tools/drywall-calculator`;

export const metadata: Metadata = {
  title: "Drywall Calculator – How Many Sheets of Drywall Do I Need?",
  description:
    "Free drywall calculator. Calculate sheets, joint compound, and tape needed for your room. Includes waste allowance and cost estimates.",
  keywords: [
    "drywall calculator",
    "how many sheets of drywall do i need",
    "drywall cost calculator",
    "drywall sheets calculator",
    "sheetrock calculator",
    "joint compound calculator",
  ],
  alternates: { canonical: TOOL_URL },
  openGraph: {
    title: "Drywall Calculator – Sheets, Compound & Tape | ToolsWonder",
    description: "Calculate drywall sheets, joint compound, and tape needed for your project. Free, instant, with waste allowance and cost estimate.",
    url: TOOL_URL,
    type: "website",
  },
};

const faqs = [
  {
    question: "How many sheets of drywall do I need?",
    answer:
      "Calculate total wall and ceiling area in sq ft, then divide by the sheet size (typically 32 sq ft for a 4×8 sheet or 48 sq ft for a 4×12 sheet). Add 10–15% for waste and cuts. Example: 1,000 sq ft of surface area ÷ 32 sq ft per sheet = 31.25, plus 10% waste = ~35 sheets of 4×8 drywall.",
  },
  {
    question: "What size drywall sheets are standard?",
    answer:
      "The most common size is 4×8 ft (32 sq ft), widely available and easy to handle. 4×12 ft (48 sq ft) sheets reduce the number of seams on larger walls but are heavier and harder to maneuver. Standard thickness is 1/2 inch for walls and 5/8 inch for ceilings or fire-rated walls.",
  },
  {
    question: "How much joint compound do I need per sheet of drywall?",
    answer:
      "Roughly 1 gallon (about 4.5 lbs dry-mix equivalent) of joint compound per 2–3 sheets of drywall for a standard 3-coat finish. A 4.5-gallon bucket typically covers about 800–1,000 sq ft of drywall seams and screw holes across all coats.",
  },
  {
    question: "How much drywall tape do I need?",
    answer:
      "Estimate roughly 370 linear feet of joint tape per 1,000 sq ft of drywall (covering seams, corners, and butt joints). A standard 250 ft roll of paper tape covers about 3–4 sheets of drywall seams; buy extra for inside/outside corners.",
  },
  {
    question: "How many screws do I need per sheet of drywall?",
    answer:
      "Use about 32 screws per 4×8 sheet on walls (screws spaced 16 inches on ceiling joists/wall studs, roughly 12 inches apart along each stud). Ceilings need slightly more due to tighter spacing requirements — closer to 40–48 screws per sheet.",
  },
  {
    question: "Should I use 1/2 inch or 5/8 inch drywall?",
    answer:
      "1/2 inch drywall is standard for most interior walls with studs 16–24 inches on-center. 5/8 inch (Type X, fire-rated) is required by code for garage walls adjoining living space, and is preferred for ceilings to reduce sagging, and for sound-dampening applications.",
  },
];

const relatedTools = [
  { title: "Renovation Cost Calculator", href: "/tools/renovation-cost-calculator", desc: "Total cost estimate by room type" },
  { title: "Paint Calculator", href: "/tools/paint-calculator", desc: "Litres of paint for any room" },
  { title: "Insulation Calculator", href: "/tools/insulation-calculator", desc: "Batts, rolls, and bags needed" },
  { title: "Lumber Calculator", href: "/tools/lumber-calculator", desc: "Board feet for framing and joists" },
];

export default function DrywallCalculatorPage() {
  return (
    <>
      <JsonLd data={buildToolSchema({ name: "Drywall Calculator", description: "Calculate drywall sheets, joint compound, and tape needed for your project with waste allowance and cost estimates.", url: TOOL_URL, category: "Construction" })} />
      <JsonLd data={buildFaqSchema(faqs)} />
      <JsonLd data={buildBreadcrumbSchema([
        { name: "Home", url: BASE_URL },
        { name: "Tools", url: `${BASE_URL}/tools` },
        { name: "Drywall Calculator", url: TOOL_URL },
      ])} />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: "Tools", href: "/tools" }, { label: "Drywall Calculator" }]} />
        <div className="ad-slot my-4">Advertisement</div>

        <div className="lg:grid lg:grid-cols-[1fr_280px] lg:gap-8">
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 sm:text-4xl">Drywall Calculator</h1>
              <p className="mt-3 text-lg text-gray-600 dark:text-gray-400">
                Calculate drywall sheets, joint compound, and tape needed for your project with waste
                allowance and cost estimates.
              </p>
            </div>

            <DrywallCalculator />

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
              <h3 className="mb-3 font-semibold text-gray-900 dark:text-gray-100">Quick Reference</h3>
              <div className="space-y-2 text-xs">
                {[
                  ["4×8 sheet", "32 sq ft"],
                  ["4×12 sheet", "48 sq ft"],
                  ["Compound per 2–3 sheets", "~1 gallon"],
                  ["Tape per 1,000 sq ft", "~370 ft"],
                  ["Screws per 4×8 sheet (wall)", "~32"],
                ].map(([s, v]) => (
                  <div key={s} className="flex justify-between gap-2">
                    <span className="text-gray-500 dark:text-gray-400">{s}</span>
                    <span className="font-semibold text-orange-700 dark:text-orange-400 text-right">{v}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="card p-5">
              <h3 className="mb-3 font-semibold text-gray-900 dark:text-gray-100">Related Construction Tools</h3>
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
