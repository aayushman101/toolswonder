import type { Metadata } from "next";
import BrickCalculator from "@/components/tools/BrickCalculator";
import JsonLd, { buildToolSchema, buildFaqSchema, buildBreadcrumbSchema } from "@/components/seo/JsonLd";
import Breadcrumb from "@/components/layout/Breadcrumb";
import Link from "next/link";

const BASE_URL = "https://toolswonder.com";
const TOOL_URL = `${BASE_URL}/tools/boundary-wall-brick-calculator`;

export const metadata: Metadata = {
  title: "Boundary Wall Brick Calculator – India | Bricks, Cement & Cost",
  description: "Calculate bricks, cement bags, sand and cost for boundary wall construction. Supports 9-inch and 4.5-inch walls. Standard Indian brick. Instant results in ₹.",
  keywords: ["boundary wall brick calculator", "brick calculator india", "brick calculator for house", "compound wall brick calculator", "brick calculator civil engineering", "brick wall calculator india"],
  alternates: { canonical: TOOL_URL },
};

const faqs = [
  { question: "How many bricks are needed for a boundary wall?", answer: "Example: 100 ft long, 6 ft high, 9-inch thick boundary wall: Wall area = 600 sq ft. Bricks = 600 × 10.8 = 6,480 + 10% waste = 7,128 bricks. Add pillar bricks separately (each pillar = ~300–500 bricks depending on size). Cement bags = ~55–60 bags. Sand = ~150 cu ft. Use the calculator above with your exact dimensions." },
  { question: "What is the standard boundary wall thickness in India?", answer: "Standard boundary wall thicknesses: 4.5 inch (half brick) — low compound walls, garden boundaries, residential plots. 9 inch (single brick) — most common for residential boundary walls, moderate security. 13.5 inch (1.5 brick) — heavy compound walls, industrial properties, high-security. Most residential boundary walls in India use 9-inch (one brick) thickness." },
  { question: "How many bricks per running foot of compound wall?", answer: "9-inch boundary wall, 6 ft high: 6 sq ft per running foot × 10.8 bricks/sq ft = 65 bricks per running foot. 4.5-inch wall, 6 ft high: 6 × 5.4 = 32 bricks per running foot. Example: 100-ft compound = 6,500 bricks (9-in) or 3,200 bricks (4.5-in). Add 10–15% for pillars and waste." },
  { question: "What is the cost of building a boundary wall per foot in India?", answer: "Approximate 2024 rates per running foot of 9-inch boundary wall (6 ft high): Bricks: ₹500–700, Cement+Sand: ₹300–400, Labour: ₹400–600, Plaster+finishing: ₹300–500. Total: ₹1,500–2,200 per running foot. 100-ft boundary wall costs approximately ₹1.5–2.2 lakh including materials and labour. Varies by city and quality." },
  { question: "How to calculate bricks for a house boundary wall?", answer: "Step 1: Measure total perimeter of plot (L+W+L+W). Step 2: Subtract gate openings. Step 3: Multiply by wall height to get sq ft. Step 4: Multiply by 10.8 (9-inch wall) for brick count. Step 5: Add 10–15% waste. Step 6: Cement = bricks ÷ 120. Enter your perimeter and height in the calculator for instant results." },
];

export default function BoundaryWallBrickCalculatorPage() {
  return (
    <>
      <JsonLd data={buildToolSchema({ name: "Boundary Wall Brick Calculator", description: "Calculate bricks, cement, sand and cost for boundary/compound wall construction in India.", url: TOOL_URL, category: "Construction" })} />
      <JsonLd data={buildFaqSchema(faqs)} />
      <JsonLd data={buildBreadcrumbSchema([{ name: "Home", url: BASE_URL }, { name: "Tools", url: `${BASE_URL}/tools` }, { name: "Brick Calculator", url: `${BASE_URL}/tools/brick-calculator` }, { name: "Boundary Wall", url: TOOL_URL }])} />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: "Tools", href: "/tools" }, { label: "Brick Calculator", href: "/tools/brick-calculator" }, { label: "Boundary Wall" }]} />
        <div className="ad-slot my-4">Advertisement</div>
        <div className="lg:grid lg:grid-cols-[1fr_280px] lg:gap-8">
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 sm:text-4xl">Boundary Wall Brick Calculator India</h1>
              <p className="mt-3 text-lg text-gray-600 dark:text-gray-400">Calculate exactly how many bricks, cement bags and sand you need for your compound or boundary wall. Enter wall length and height, choose wall thickness (4.5 or 9 inch) — get materials and ₹ cost instantly.</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {[["4.5-inch wall","Half brick, garden/low walls","5–6 bricks/sqft"],["9-inch wall","Standard residential compound","10–11 bricks/sqft"],["13.5-inch wall","Heavy security/industrial","15–17 bricks/sqft"]].map(([t,d,r]) => (
                <div key={t} className="card p-4 text-center">
                  <div className="font-bold text-gray-900 dark:text-gray-100">{t}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{d}</div>
                  <div className="text-orange-600 font-semibold mt-2 text-sm">{r}</div>
                </div>
              ))}
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
                {[["Brick Calculator (Main)", "/tools/brick-calculator"],["Brick Calc – Square Feet", "/tools/brick-calculator-square-feet"],["Paint Calculator", "/tools/paint-calculator"],["Tile Calculator", "/tools/tile-calculator"]].map(([t,h]) => (
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
