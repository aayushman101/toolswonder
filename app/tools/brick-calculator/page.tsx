import type { Metadata } from "next";
import BrickCalculator from "@/components/tools/BrickCalculator";
import JsonLd, { buildToolSchema, buildFaqSchema, buildBreadcrumbSchema } from "@/components/seo/JsonLd";
import Breadcrumb from "@/components/layout/Breadcrumb";
import AdUnit from "@/components/ads/AdUnit";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

const BASE_URL = "https://toolswonder.com";
const TOOL_URL = `${BASE_URL}/tools/brick-calculator`;

export const metadata: Metadata = {
  title: "Brick Calculator – How Many Bricks Do I Need?",
  description: "Free brick calculator. Enter wall dimensions to calculate number of bricks, cement bags, sand, and total material cost. Supports standard Indian brick, modular, and custom sizes.",
  keywords: ["brick calculator", "how many bricks do i need", "brick calculator india", "bricks per square foot", "brick wall calculator", "brick and mortar calculator"],
  alternates: { canonical: TOOL_URL },
};

const faqs = [
  { question: "How many bricks do I need per square foot?", answer: "For standard Indian brick (9×4.5×3 inches) with 0.5 inch mortar joint and 9-inch wall thickness: approximately 10–11 bricks per sq ft of wall area. For half-brick wall (4.5 inch thick): 4.5–5 bricks per sq ft. Our calculator works with exact wall volume to give precise counts including waste." },
  { question: "How many bricks in 100 sq ft wall?", answer: "9-inch wall: 100 sq ft × 10.8 bricks/sq ft = ~1,080 bricks (without waste). Add 10% waste = 1,188 bricks. 4.5-inch (half brick) wall: ~540 bricks + waste = ~594. Always add 5–15% for cuts, breakage, and irregular shapes. Our calculator auto-adds your chosen waste percentage." },
  { question: "How many cement bags per 1,000 bricks?", answer: "For standard brick masonry with 1:4 cement-sand ratio: approximately 8–10 bags of 50kg cement per 1,000 bricks. Sand: 1.5–2 cu ft (0.04–0.05 m³) per 100 bricks. These are approximate values — actual consumption depends on mortar joint thickness, brick absorption, and workmanship quality." },
  { question: "What is the standard Indian brick size?", answer: "Standard modular Indian brick: 190×90×90 mm (7.5×3.5×2.5 in). Traditional/standard size: 230×115×75 mm (9×4.5×3 in). With 10mm mortar joint, the nominal module size becomes 200×100×100mm. Most construction in India uses the 9×4.5×3 inch (230×115×75mm) size. Our calculator defaults to this size." },
  { question: "How thick should a brick wall be?", answer: "Half brick (4.5 inch / 115mm): Used for partition walls, compound walls, non-load bearing. Single brick (9 inch / 230mm): Most common for residential walls — load bearing. One & half brick (13.5 inch / 345mm): Heavy load bearing, basements. Double brick (18 inch / 460mm): Very heavy load, foundations, retaining walls. Most residential exterior walls are 9 inches." },
  { question: "How to calculate bricks for a room?", answer: "Measure each wall separately: Bricks = Wall area (sq ft) × bricks per sq ft. Subtract door/window openings from wall area. Sum all walls. Add 10% waste. Example: 12×10 ft room, 10 ft high, standard brick, 9-inch wall, 1 door (3×7 ft), 2 windows (3×4 ft each): Wall area = 2×(12+10)×10 = 440 sq ft. Openings = 21 + 24 = 45 sq ft. Net = 395 sq ft × 10.8 = 4,266 bricks + 10% = 4,693 bricks." },
];

export default function BrickCalculatorPage() {
  return (
    <>
      <JsonLd data={buildToolSchema({ name: "Brick Calculator", description: "Calculate number of bricks, cement bags, sand, and material cost for any wall size. Supports standard Indian brick and custom sizes.", url: TOOL_URL, category: "Construction" })} />
      <JsonLd data={buildFaqSchema(faqs)} />
      <JsonLd data={buildBreadcrumbSchema([{ name: "Home", url: BASE_URL }, { name: "Tools", url: `${BASE_URL}/tools` }, { name: "Brick Calculator", url: TOOL_URL }])} />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: "Tools", href: "/tools" }, { label: "Brick Calculator" }]} />
        <div className="my-4">
          <AdUnit slot="REPLACE_WITH_AD_SLOT" />
        </div>
        <div className="lg:grid lg:grid-cols-[1fr_280px] lg:gap-8">
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 sm:text-4xl">Brick Calculator</h1>
              <p className="mt-3 text-lg text-gray-600 dark:text-gray-400">Calculate exactly how many bricks, cement bags, and sand you need for your wall. Enter dimensions, choose brick size and mortar joint — get materials and cost instantly. Supports standard Indian, modular, and custom brick sizes.</p>
            </div>
            <BrickCalculator />
            <div>
              <AdUnit slot="REPLACE_WITH_AD_SLOT" />
            </div>
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
            <div className="h-[250px]">
              <AdUnit slot="REPLACE_WITH_AD_SLOT" format="vertical" />
            </div>
            <div className="card p-5">
              <h3 className="mb-3 font-semibold text-gray-900 dark:text-gray-100">Bricks per Sq Ft</h3>
              <div className="space-y-2 text-xs">
                {[["9-in wall (standard)","10–11 bricks/sq ft"],["4.5-in wall (half)","5–6 bricks/sq ft"],["13.5-in wall (1.5 brick)","15–16 bricks/sq ft"],["Cement per 1000 bricks","8–10 bags (50kg)"],["Sand per 1000 bricks","25–30 cu ft"]].map(([s,v]) => (
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
                {[
                  { title: "Brick Calculator – Square Feet", href: "/tools/brick-calculator-square-feet" },
                  { title: "Boundary Wall Brick Calculator", href: "/tools/boundary-wall-brick-calculator" },
                  { title: "Concrete Calculator", href: "/tools/concrete-calculator" },
                  { title: "Paver Brick Calculator", href: "/tools/paver-brick-calculator" },
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
