import type { Metadata } from "next";
import PaintCalculator from "@/components/tools/PaintCalculator";
import JsonLd, { buildToolSchema, buildFaqSchema, buildBreadcrumbSchema } from "@/components/seo/JsonLd";
import Breadcrumb from "@/components/layout/Breadcrumb";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

const BASE_URL = "https://toolswonder.com";
const TOOL_URL = `${BASE_URL}/tools/paint-calculator`;

export const metadata: Metadata = {
  title: "Paint Calculator – How Much Paint Do I Need for a Room?",
  description: "Free paint calculator. Enter room dimensions to calculate litres of paint needed, number of cans, coats, and total cost. Covers walls, ceiling, doors and windows deduction.",
  keywords: ["paint calculator", "how much paint do i need", "paint calculator for room", "wall paint calculator", "paint litre calculator", "asian paints calculator"],
  alternates: { canonical: TOOL_URL },
};

const faqs = [
  { question: "How much paint do I need for a room?", answer: "Calculate wall area = 2 × (length + width) × height. Subtract doors (21 sq ft each) and windows (15 sq ft each). Divide by paint coverage (sq ft per litre). Add 10% for waste. Example: 12×10×9 ft room, 1 door, 2 windows, standard emulsion (350 sq ft/L): Wall area = 2×22×9 = 396 sq ft. Net = 396 – 21 – 30 = 345 sq ft. Litres = 345/350 = 1 litre per coat × 2 coats = 2 litres + 10% waste = 2.2 litres." },
  { question: "How many coats of paint does a room need?", answer: "Typically 2 coats for most interior painting projects. 1 coat for touch-up or same/similar colour. 3 coats when covering dark colours with light paint, painting over bare plaster/primer, or using low-quality paint. Most premium emulsions give excellent coverage in 2 coats." },
  { question: "What is the coverage of Asian Paints / Berger / Nerolac?", answer: "Coverage varies by product: Economy emulsion: 150–200 sq ft/L (Tractor Emulsion). Standard emulsion: 300–350 sq ft/L (Royale, Silk, Impressions). Premium emulsion: 400–450 sq ft/L (Apex, WeatherCoat). Texture paints: 10–15 sq ft/L. Always check the product datasheet — coverage on the label is for smooth surfaces with 2 coats." },
  { question: "How to calculate paint for exterior walls?", answer: "Same formula as interior but: (1) Measure total exterior wall area, subtract door and window openings; (2) Add 15% waste (irregular surfaces, spraying); (3) Use exterior-grade paint; (4) Typical exterior coverage: 80–120 sq ft/L for textured, 250–300 sq ft/L for smooth. You usually need 3 coats for exterior (primer + 2 finish coats)." },
  { question: "Should I paint ceiling the same colour as walls?", answer: "Ceiling and walls can be same or different. Typically ceilings are painted white or a lighter shade. Ceiling paint is usually more viscous (doesn't drip) and has higher hiding power. Calculate ceiling area separately (length × width) and add to wall area if using the same paint. Our calculator has a toggle for walls only, ceiling only, or both." },
];

export default function PaintCalculatorPage() {
  return (
    <>
      <JsonLd data={buildToolSchema({ name: "Paint Calculator", description: "Calculate how many litres of paint you need for walls, ceiling, or full room. Includes door and window deductions, coats, and cost.", url: TOOL_URL, category: "Construction" })} />
      <JsonLd data={buildFaqSchema(faqs)} />
      <JsonLd data={buildBreadcrumbSchema([{ name: "Home", url: BASE_URL }, { name: "Tools", url: `${BASE_URL}/tools` }, { name: "Paint Calculator", url: TOOL_URL }])} />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: "Tools", href: "/tools" }, { label: "Paint Calculator" }]} />
        <div className="ad-slot my-4">Advertisement</div>
        <div className="lg:grid lg:grid-cols-[1fr_280px] lg:gap-8">
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 sm:text-4xl">Paint Calculator</h1>
              <p className="mt-3 text-lg text-gray-600 dark:text-gray-400">Calculate exactly how much paint you need. Enter room length, width, height, number of doors and windows, coats, and paint coverage — get litres needed, can count, and total cost instantly.</p>
            </div>
            <PaintCalculator />
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
              <h3 className="mb-3 font-semibold text-gray-900 dark:text-gray-100">Paint Coverage Guide</h3>
              <div className="space-y-2 text-xs">
                {[["Primer / Putty","80–120 sq ft/L"],["Economy Emulsion","150–250 sq ft/L"],["Standard Emulsion","300–350 sq ft/L"],["Premium Emulsion","400–450 sq ft/L"],["Texture Paint","10–15 sq ft/L"],["Exterior Paint","250–300 sq ft/L"]].map(([s,v]) => (
                  <div key={s} className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">{s}</span>
                    <span className="font-semibold text-orange-700 dark:text-orange-400">{v}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="card p-5">
              <h3 className="mb-3 font-semibold text-gray-900 dark:text-gray-100">Related Construction Tools</h3>
              <ul className="space-y-3 text-sm">
                {[
                  { title: "Renovation Cost Calculator", href: "/tools/renovation-cost-calculator" },
                  { title: "Tile Calculator", href: "/tools/tile-calculator" },
                  { title: "Drywall Calculator", href: "/tools/drywall-calculator" },
                  { title: "Brick Calculator", href: "/tools/brick-calculator" },
                ].map((t) => (
                  <li key={t.href}>
                    <Link href={t.href} className="flex items-center gap-2 text-orange-700 dark:text-orange-400 hover:text-orange-900 dark:hover:text-orange-300">
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
