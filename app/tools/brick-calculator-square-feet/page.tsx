import type { Metadata } from "next";
import BrickCalculator from "@/components/tools/BrickCalculator";
import JsonLd, { buildToolSchema, buildFaqSchema, buildBreadcrumbSchema } from "@/components/seo/JsonLd";
import Breadcrumb from "@/components/layout/Breadcrumb";
import Link from "next/link";

const BASE_URL = "https://toolswonder.com";
const TOOL_URL = `${BASE_URL}/tools/brick-calculator-square-feet`;

export const metadata: Metadata = {
  title: "Brick Calculator Square Feet – Bricks per Sq Ft Calculator",
  description: "Calculate how many bricks per square foot for any wall. Enter wall area in sq ft to get total bricks, cement bags, and cost. Standard Indian brick and custom sizes.",
  keywords: ["brick calculator square feet", "bricks per square foot", "bricks calculation formula in feet", "how many bricks per square foot", "brick calculator sq ft"],
  alternates: { canonical: TOOL_URL },
};

const faqs = [
  { question: "How many bricks per square foot of wall?", answer: "For a 9-inch thick wall with standard Indian brick (9×4.5×3 in) and 0.5 inch mortar joint: approximately 10.8 bricks per sq ft. For a 4.5-inch (half brick) wall: approximately 5.4 bricks per sq ft. For a 13.5-inch wall: approximately 16 bricks per sq ft. Always add 10% for waste." },
  { question: "What is the bricks calculation formula in feet?", answer: "Volume method: Bricks = Wall volume (cu ft) ÷ Brick volume (cu ft, including mortar). Brick volume = (L+joint) × (H+joint) × thickness ÷ 1728. For standard brick (9×3×4.5in) + 0.5in joint, 9in wall: brick vol = 9.5×3.5×9÷1728 = 0.174 cu ft. Bricks per cu ft = 5.75. Wall 20×10 ft = 200 sq ft × 0.75 ft thick = 150 cu ft × 5.75 = 862 bricks + 10% waste = 949 bricks." },
  { question: "How many bricks in 100 square feet wall?", answer: "9-inch wall: 100 × 10.8 = 1,080 bricks + 10% waste = 1,188 bricks. 4.5-inch wall: 100 × 5.4 = 540 + waste = 594 bricks. 100 sq ft needs approximately 8–10 bags of cement for mortar (1:4 mix, 9-inch wall). Our calculator converts sq ft area automatically — select your area unit." },
  { question: "How to calculate bricks for a boundary wall in square feet?", answer: "Measure boundary wall total length × height to get sq ft. Multiply by bricks per sq ft for your wall thickness. Example: 100 ft long, 6 ft high boundary wall = 600 sq ft. At 9-inch thickness: 600 × 10.8 = 6,480 bricks + 10% = 7,128 bricks. Add pillar bricks separately. The calculator handles this in the area input — just enter your total wall area." },
];

export default function BrickCalculatorSqFtPage() {
  return (
    <>
      <JsonLd data={buildToolSchema({ name: "Brick Calculator Square Feet", description: "Calculate bricks per square foot for any wall thickness. Get total bricks, cement, sand, and cost.", url: TOOL_URL, category: "Construction" })} />
      <JsonLd data={buildFaqSchema(faqs)} />
      <JsonLd data={buildBreadcrumbSchema([{ name: "Home", url: BASE_URL }, { name: "Tools", url: `${BASE_URL}/tools` }, { name: "Brick Calculator", url: `${BASE_URL}/tools/brick-calculator` }, { name: "Brick Calculator Square Feet", url: TOOL_URL }])} />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: "Tools", href: "/tools" }, { label: "Brick Calculator", href: "/tools/brick-calculator" }, { label: "Square Feet" }]} />
        <div className="ad-slot my-4">Advertisement</div>
        <div className="lg:grid lg:grid-cols-[1fr_280px] lg:gap-8">
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 sm:text-4xl">Brick Calculator – Square Feet</h1>
              <p className="mt-3 text-lg text-gray-600 dark:text-gray-400">Calculate bricks per square foot for any wall. Enter wall length and height in feet, choose wall thickness and brick size — get exact brick count, cement bags, sand, and material cost instantly.</p>
            </div>

            <div className="rounded-xl bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 p-5">
              <h2 className="font-semibold text-amber-900 dark:text-amber-100 mb-3">Bricks per Sq Ft Quick Reference</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
                {[["4.5-in wall","5–6 bricks/sq ft"],["9-in wall","10–11 bricks/sq ft"],["13.5-in wall","15–17 bricks/sq ft"],["Standard brick","9×4.5×3 inches"],["Modular brick","7.5×3.5×2.5 inches"],["Mortar joint","0.5 inch standard"]].map(([l,v]) => (
                  <div key={l} className="text-center p-2 bg-white dark:bg-gray-800 rounded-lg">
                    <div className="text-xs text-amber-700 dark:text-amber-400 font-medium">{l}</div>
                    <div className="font-bold text-gray-900 dark:text-gray-100 mt-0.5">{v}</div>
                  </div>
                ))}
              </div>
            </div>

            <BrickCalculator />

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
              <h3 className="mb-3 font-semibold text-gray-900 dark:text-gray-100">Related Tools</h3>
              <ul className="space-y-2 text-sm">
                {[["Brick Calculator (Main)", "/tools/brick-calculator"],["Boundary Wall Calculator", "/tools/boundary-wall-brick-calculator"],["Paver Brick Calculator", "/tools/paver-brick-calculator"],["Paint Calculator", "/tools/paint-calculator"],["Tile Calculator", "/tools/tile-calculator"]].map(([t, h]) => (
                  <li key={h}><Link href={h} className="text-orange-700 dark:text-orange-400 hover:underline">→ {t}</Link></li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
