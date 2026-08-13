import type { Metadata } from "next";
import BrickCalculator from "@/components/tools/BrickCalculator";
import JsonLd, { buildToolSchema, buildFaqSchema, buildBreadcrumbSchema } from "@/components/seo/JsonLd";
import Breadcrumb from "@/components/layout/Breadcrumb";
import Link from "next/link";

const BASE_URL = "https://toolswonder.com";
const TOOL_URL = `${BASE_URL}/tools/paver-brick-calculator`;

export const metadata: Metadata = {
  title: "Paver Brick Calculator – Patio, Driveway & Walkway Bricks",
  description: "Calculate pavers needed for patio, driveway, walkway or garden path. Enter area in sq ft, choose paver size and pattern — get paver count, sand, and cost estimate.",
  keywords: ["paver brick calculator", "patio brick calculator", "brick calculator patio", "brick calculator for patio", "paving brick calculator", "driveway paver calculator"],
  alternates: { canonical: TOOL_URL },
};

const faqs = [
  { question: "How many pavers do I need for a patio?", answer: "Pavers needed = Patio area (sq ft) ÷ Paver area (sq ft) × 1.1 (10% waste). Example: 200 sq ft patio with 4×8 inch pavers (0.222 sq ft each): 200 ÷ 0.222 = 900 pavers × 1.1 = 990 pavers. For a herringbone or diagonal pattern, add 15% waste instead of 10%. Use the calculator with your patio length × width." },
  { question: "How many pavers per square foot?", answer: "Pavers per sq ft varies by paver size: 4×8 inch = 4.5 pavers/sq ft. 6×6 inch = 4 pavers/sq ft. 6×9 inch = 2.67 pavers/sq ft. 12×12 inch = 1 paver/sq ft. 16×16 inch = 0.56 pavers/sq ft. Always add 10% for straight patterns or 15% for diagonal/herringbone to account for cuts and breakage." },
  { question: "How deep should sand be under pavers?", answer: "Recommended bedding sand depth: 1 inch (25mm) of compacted bedding sand below pavers. Plus 4–6 inches of compacted gravel base. Total excavation depth = paver thickness + 1 inch sand + 4–6 inches gravel. For patios: 1 inch sand × area sq ft ÷ 12 = cubic ft of sand needed. Example: 200 sq ft patio: 200/12 = 16.7 cu ft bedding sand + polymeric joint sand separately." },
  { question: "What is the difference between pavers and bricks?", answer: "Bricks are used for walls (vertical). Pavers are designed for horizontal surfaces (patios, driveways, paths) and are manufactured thicker and denser to withstand vehicular/foot traffic loads. Paver thickness: 2–3.5 inches depending on application. Standard brick thickness: 2.25–3 inches. Pavers have lower water absorption and higher compressive strength than standard bricks." },
  { question: "How much does a paver patio cost?", answer: "Average paver patio cost: Concrete pavers: ₹60–120/sq ft installed. Natural stone pavers: ₹150–300/sq ft. DIY paver cost (materials only): ₹30–80/sq ft. 200 sq ft patio: Materials ₹6,000–16,000 + Labour ₹6,000–14,000 = Total ₹12,000–30,000. US rates: $10–25/sq ft materials, $15–25/sq ft labour. Our calculator gives material quantities and cost." },
];

export default function PaverBrickCalculatorPage() {
  return (
    <>
      <JsonLd data={buildToolSchema({ name: "Paver Brick Calculator", description: "Calculate pavers needed for patio, driveway, or walkway. Enter area and paver size to get count, sand, and cost.", url: TOOL_URL, category: "Construction" })} />
      <JsonLd data={buildFaqSchema(faqs)} />
      <JsonLd data={buildBreadcrumbSchema([{ name: "Home", url: BASE_URL }, { name: "Tools", url: `${BASE_URL}/tools` }, { name: "Brick Calculator", url: `${BASE_URL}/tools/brick-calculator` }, { name: "Paver Brick Calculator", url: TOOL_URL }])} />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: "Tools", href: "/tools" }, { label: "Brick Calculator", href: "/tools/brick-calculator" }, { label: "Paver Calculator" }]} />
        <div className="ad-slot my-4">Advertisement</div>
        <div className="lg:grid lg:grid-cols-[1fr_280px] lg:gap-8">
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 sm:text-4xl">Paver Brick Calculator</h1>
              <p className="mt-3 text-lg text-gray-600 dark:text-gray-400">Calculate how many pavers you need for a patio, driveway, walkway or garden path. Enter your area dimensions, choose paver/brick size — get paver count, sand needed, and material cost instantly.</p>
            </div>

            <div className="rounded-xl bg-orange-50 dark:bg-orange-950 border border-orange-200 dark:border-orange-800 p-5">
              <h2 className="font-semibold text-orange-900 dark:text-orange-100 mb-3">Pavers per Sq Ft by Size</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                {[["4×8 inch","4.5 pavers/sqft"],["6×6 inch","4.0 pavers/sqft"],["6×9 inch","2.67 pavers/sqft"],["8×8 inch","2.25 pavers/sqft"],["12×12 inch","1.0 pavers/sqft"],["16×16 inch","0.56 pavers/sqft"]].map(([s,v]) => (
                  <div key={s} className="flex justify-between bg-white dark:bg-gray-800 rounded p-2">
                    <span className="text-gray-600 dark:text-gray-400">{s}</span>
                    <span className="font-semibold text-orange-700 dark:text-orange-400">{v}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-orange-700 dark:text-orange-400 mt-2">Add 10% waste (straight pattern) or 15% (diagonal/herringbone)</p>
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
                {[["Brick Calculator (Wall)", "/tools/brick-calculator"],["Brick Calc – Square Feet", "/tools/brick-calculator-square-feet"],["Boundary Wall Calculator", "/tools/boundary-wall-brick-calculator"],["Tile Calculator", "/tools/tile-calculator"]].map(([t,h]) => (
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
