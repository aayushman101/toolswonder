import type { Metadata } from "next";
import Link from "next/link";
import ACUnitCalculator from "@/components/tools/ACUnitCalculator";
import JsonLd, { buildToolSchema, buildFaqSchema, buildBreadcrumbSchema } from "@/components/seo/JsonLd";
import Breadcrumb from "@/components/layout/Breadcrumb";
import { ChevronRight } from "lucide-react";

const BASE_URL = "https://toolswonder.com";
const TOOL_URL = `${BASE_URL}/tools/ac-unit-calculator`;

export const metadata: Metadata = {
  title: "AC Unit Size Calculator – What Size Air Conditioner Do I Need?",
  description:
    "Free AC size calculator. Determine the correct air conditioner tonnage and BTU for your room or home based on square footage, climate zone, and insulation quality.",
  keywords: [
    "ac calculator",
    "air conditioner size calculator",
    "hvac calculator",
    "ac unit size calculator",
    "what size ac do i need",
    "btu calculator for room",
    "ac tonnage calculator",
  ],
  alternates: { canonical: TOOL_URL },
  openGraph: {
    title: "AC Unit Size Calculator – Tonnage & BTU Calculator | ToolsWonder",
    description: "Find the correct air conditioner size for your space. Free, instant, based on square footage, climate, and insulation.",
    url: TOOL_URL,
    type: "website",
  },
};

const faqs = [
  {
    question: "How do I calculate what size AC I need?",
    answer:
      "A common rule of thumb is 20 BTU per square foot for average conditions. Multiply your room's square footage by 20 to get base BTU, then adjust for ceiling height, insulation, sun exposure, and climate zone. Example: a 300 sq ft room needs roughly 6,000 BTU under average conditions, more in hot climates or poorly insulated rooms.",
  },
  {
    question: "How many square feet does a 1-ton AC cool?",
    answer:
      "A 1-ton (12,000 BTU) AC unit typically cools 400–600 sq ft depending on climate, insulation, and ceiling height. In hot climates or poorly insulated spaces, coverage drops toward the lower end. In mild climates with good insulation, it can cover closer to 600 sq ft.",
  },
  {
    question: "What size AC do I need for a 1,500 sq ft house?",
    answer:
      "A 1,500 sq ft home typically needs a 2.5 to 3-ton central AC unit (30,000–36,000 BTU), depending on climate zone, insulation quality, ceiling height, and number of windows. Homes in hotter climates or with poor insulation may need to size up.",
  },
  {
    question: "Is it bad to oversize an AC unit?",
    answer:
      "Yes. An oversized AC cools the room quickly but shuts off before properly removing humidity, leading to a clammy feeling and higher energy bills from frequent on/off cycling (short-cycling). It's better to size accurately or slightly undersize than to oversize.",
  },
  {
    question: "How does insulation affect AC sizing?",
    answer:
      "Poor insulation lets more heat in, increasing the cooling load — you may need 10–20% more BTU capacity than the base calculation. Good insulation, low-E windows, and shading can reduce the required tonnage. Our calculator lets you adjust for insulation quality.",
  },
  {
    question: "What size AC do I need for a bedroom?",
    answer:
      "A typical 150–250 sq ft bedroom needs about 5,000–8,000 BTU under average conditions. Adjust upward for high ceilings, direct sun exposure, or hot climates, and downward for well-shaded, well-insulated rooms.",
  },
];

const relatedTools = [
  { title: "Furnace BTU Calculator", href: "/tools/furnace-btu-calculator", desc: "Heating capacity for your home" },
  { title: "Insulation Calculator", href: "/tools/insulation-calculator", desc: "Batts, rolls, and R-value needed" },
  { title: "Ductwork Calculator", href: "/tools/ductwork-calculator", desc: "Duct size, diameter, and CFM" },
];

export default function ACUnitCalculatorPage() {
  return (
    <>
      <JsonLd data={buildToolSchema({ name: "AC Unit Size Calculator", description: "Calculate the correct air conditioner tonnage and BTU needed for your space based on square footage, climate, and insulation.", url: TOOL_URL, category: "HVAC" })} />
      <JsonLd data={buildFaqSchema(faqs)} />
      <JsonLd data={buildBreadcrumbSchema([
        { name: "Home", url: BASE_URL },
        { name: "Tools", url: `${BASE_URL}/tools` },
        { name: "AC Unit Calculator", url: TOOL_URL },
      ])} />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: "Tools", href: "/tools" }, { label: "AC Unit Calculator" }]} />
        <div className="ad-slot my-4">Advertisement</div>

        <div className="lg:grid lg:grid-cols-[1fr_280px] lg:gap-8">
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 sm:text-4xl">AC Unit Size Calculator</h1>
              <p className="mt-3 text-lg text-gray-600 dark:text-gray-400">
                Find the correct air conditioner size for your space based on square footage, climate zone,
                and insulation quality. Get tonnage and BTU recommendations instantly.
              </p>
            </div>

            <ACUnitCalculator />

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
              <h3 className="mb-3 font-semibold text-gray-900 dark:text-gray-100">BTU Sizing Guide</h3>
              <div className="space-y-2 text-xs">
                {[
                  ["150 sq ft", "5,000–6,000 BTU"],
                  ["300 sq ft", "6,000–8,000 BTU"],
                  ["500 sq ft", "10,000–12,000 BTU"],
                  ["700 sq ft", "14,000 BTU"],
                  ["1,500 sq ft", "30,000–36,000 BTU"],
                ].map(([s, v]) => (
                  <div key={s} className="flex justify-between gap-2">
                    <span className="text-gray-500 dark:text-gray-400">{s}</span>
                    <span className="font-semibold text-blue-700 dark:text-blue-400 text-right">{v}</span>
                  </div>
                ))}
                <p className="text-xs text-gray-400 pt-1">Average conditions; adjust for climate and insulation.</p>
              </div>
            </div>

            <div className="card p-5">
              <h3 className="mb-3 font-semibold text-gray-900 dark:text-gray-100">Related HVAC Tools</h3>
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
