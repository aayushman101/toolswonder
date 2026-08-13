import type { Metadata } from "next";
import Link from "next/link";
import TileCalculator from "@/components/tools/TileCalculator";
import JsonLd, { buildToolSchema, buildFaqSchema, buildBreadcrumbSchema } from "@/components/seo/JsonLd";
import Breadcrumb from "@/components/layout/Breadcrumb";
import { ChevronRight, Grid3x3 } from "lucide-react";

const BASE_URL = "https://toolswonder.com";
const TOOL_URL = `${BASE_URL}/tools/tile-calculator`;

export const metadata: Metadata = {
  title: "Tile Calculator – Floor, Wall, Shower, Ceiling & Backsplash",
  description:
    "Free tile calculator for floor, wall, shower, ceiling, and backsplash projects. Calculate tiles needed, boxes, grout, and cost. Supports sq ft, sq m, and inch/cm tile sizes.",
  keywords: [
    "tile calculator",
    "tile calculator square feet",
    "shower tile calculator",
    "floor tile calculator",
    "ceiling tile calculator",
    "wall tile calculator",
    "backsplash tile calculator",
    "flooring tile calculator",
    "tile calculator shower",
    "how many tiles do i need calculator",
    "bathroom tile calculator",
    "kitchen tile calculator",
  ],
  alternates: { canonical: TOOL_URL },
  openGraph: {
    title: "Tile Calculator – Floor, Wall, Shower & Backsplash | ToolsWonder",
    description: "Calculate exactly how many tiles you need. Includes waste factor, grout, and cost estimate.",
    url: TOOL_URL,
    type: "website",
  },
};

const faqs = [
  {
    question: "How do I calculate how many tiles I need?",
    answer:
      "To calculate tiles needed: 1) Measure the area in sq ft (Length × Width). 2) Calculate tile area (Tile Width × Tile Height ÷ 144 to convert to sq ft). 3) Divide area by tile area. 4) Add 10-15% for waste. 5) Round up to the nearest whole tile.",
  },
  {
    question: "How many tiles do I need for a 10×12 room?",
    answer:
      "A 10×12 room is 120 sq ft. With 12×12 inch tiles (1 sq ft each), you'd need 120 tiles plus waste. At 10% waste, that's 132 tiles. The exact count depends on tile size — use our calculator above for any tile size.",
  },
  {
    question: "How many tiles do I need for a shower?",
    answer:
      "Use the 'Shower' tab. Measure all walls (height × width for each wall) and the floor separately. For a standard 36×36 inch shower floor with 4-foot walls, you'd typically need 400-500 tiles depending on tile size. Add 15% waste for shower areas due to more cuts around fixtures.",
  },
  {
    question: "How many tiles do I need for a kitchen backsplash?",
    answer:
      "Measure your backsplash area in square feet (typically the area between your countertop and upper cabinets, usually 18 inches high). Multiply length by height and add 10% waste. Use the 'Backsplash' tab for the calculation.",
  },
  {
    question: "What waste percentage should I use for tiles?",
    answer:
      "Straight lay on a simple floor: 10%. Diagonal or herringbone pattern: 15-20% extra. Shower or complex cuts: 15%. Backsplash with outlets and windows: 10-15%. When in doubt, order 15% extra — leftover tiles can be saved for future repairs.",
  },
  {
    question: "How do I calculate tile in square feet?",
    answer:
      "Multiply the room's length by width to get square footage. For example, a 10-foot × 12-foot room is 120 sq ft. For irregular rooms, break them into rectangles, calculate each, and add together. Subtract any areas that won't be tiled (cabinets, islands).",
  },
  {
    question: "How many square feet are in a box of tiles?",
    answer:
      "It varies by tile size and brand. Most tile boxes list sq ft on the label. Common values: 6×6 tiles: 5-10 sq ft/box. 12×12 tiles: 10-15 sq ft/box. 24×24 tiles: 8-16 sq ft/box. Enter your specific 'tiles per box' value in the calculator above.",
  },
  {
    question: "How much extra tile should I buy?",
    answer:
      "Always buy at least 10% extra (15% for diagonal patterns or complex rooms). This accounts for breakage, future repairs, and cuts. Tile colors and dye lots can vary between batches — buy everything you need in one purchase.",
  },
];

const relatedTools = [
  { title: "Paint Calculator", href: "/tools/paint-calculator", desc: "Gallons of paint needed for any room" },
  { title: "Cement Calculator", href: "/tools/cement-calculator", desc: "Concrete and cement quantities" },
  { title: "Brick Calculator", href: "/tools/brick-calculator", desc: "Bricks and mortar estimator" },
  { title: "Flooring Calculator", href: "/tools/flooring-calculator", desc: "Hardwood, laminate, and carpet" },
];

export default function TileCalculatorPage() {
  return (
    <>
      <JsonLd data={buildToolSchema({ name: "Tile Calculator", description: "Free tile calculator for floor, wall, shower, ceiling, and backsplash. Calculate tiles, boxes, grout, and cost.", url: TOOL_URL, category: "Construction" })} />
      <JsonLd data={buildFaqSchema(faqs)} />
      <JsonLd data={buildBreadcrumbSchema([
        { name: "Home", url: BASE_URL },
        { name: "Tools", url: `${BASE_URL}/tools` },
        { name: "Construction", url: `${BASE_URL}/tools?category=construction` },
        { name: "Tile Calculator", url: TOOL_URL },
      ])} />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumb items={[
          { label: "Tools", href: "/tools" },
          { label: "Construction", href: "/tools?category=construction" },
          { label: "Tile Calculator" },
        ]} />

        <div className="ad-slot my-4">Advertisement</div>

        <div className="lg:grid lg:grid-cols-[1fr_300px] lg:gap-8">
          <div className="space-y-8">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-50 px-3 py-1 text-xs font-medium text-orange-700">
                  <Grid3x3 className="h-3.5 w-3.5" /> Construction
                </span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                Tile Calculator
              </h1>
              <p className="mt-3 text-lg text-gray-600">
                Calculate exactly how many tiles you need for any project — floor, wall, shower,
                ceiling, or backsplash. Includes waste factor, grout estimate, box count, and cost.
              </p>
            </div>

            <TileCalculator />

            <div className="ad-slot">Advertisement</div>

            {/* Content */}
            <section className="prose prose-gray max-w-none">
              <h2 className="text-2xl font-bold text-gray-900">How to Calculate Tiles Needed</h2>
              <p className="text-gray-600">
                Calculating tiles is straightforward but getting it right matters — under-buying means a
                second trip to the store (where the new batch may not match), and over-buying wastes money.
                Our tile calculator handles all of this automatically.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8">Tile Calculator Formula</h2>
              <div className="rounded-xl bg-gray-900 p-5 font-mono text-sm text-green-400 not-prose">
                <div className="text-gray-400 mb-1"># Step 1: Calculate area</div>
                <div>Area (sq ft) = Length (ft) × Width (ft)</div>
                <div className="mt-2 text-gray-400"># Step 2: Calculate tile area</div>
                <div>Tile Area (sq ft) = (Tile W × Tile H) / 144  [if dimensions in inches]</div>
                <div className="mt-2 text-gray-400"># Step 3: Calculate tiles needed</div>
                <div>Tiles = Area / Tile Area × (1 + Waste% / 100)</div>
                <div className="mt-2 text-gray-400"># Example: 10×12 ft room with 12×12 in tiles, 10% waste</div>
                <div>Area = 10 × 12 = 120 sq ft</div>
                <div>Tile Area = (12 × 12) / 144 = 1 sq ft</div>
                <div>Tiles = 120 / 1 × 1.10</div>
                <div className="text-yellow-400">= 132 tiles (rounded up)</div>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mt-8">Tile Waste Factor Guide</h2>
              <div className="not-prose overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-gray-50 text-left">
                      <th className="border border-gray-200 px-4 py-2 font-semibold">Project Type</th>
                      <th className="border border-gray-200 px-4 py-2 font-semibold">Recommended Waste</th>
                      <th className="border border-gray-200 px-4 py-2 font-semibold">Reason</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { type: "Simple rectangular floor", waste: "10%", reason: "Minimal cuts required" },
                      { type: "Wall tiling", waste: "10%", reason: "Some cuts at edges" },
                      { type: "Shower surround", waste: "15%", reason: "More cuts around fixtures" },
                      { type: "Diagonal / 45° pattern", waste: "20–25%", reason: "Many angled cuts needed" },
                      { type: "Irregular room shapes", waste: "15–20%", reason: "More cuts, complex layout" },
                      { type: "Small mosaic tiles", waste: "10%", reason: "Pre-mounted, fewer cuts" },
                      { type: "Outdoor / Pool", waste: "15%", reason: "Cuts around drains, steps" },
                    ].map((row) => (
                      <tr key={row.type} className="hover:bg-gray-50">
                        <td className="border border-gray-200 px-4 py-2 font-medium">{row.type}</td>
                        <td className="border border-gray-200 px-4 py-2 text-orange-700 font-semibold">{row.waste}</td>
                        <td className="border border-gray-200 px-4 py-2 text-gray-600">{row.reason}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mt-8">Popular Tile Sizes & Coverage</h2>
              <div className="not-prose overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-gray-50 text-left">
                      <th className="border border-gray-200 px-4 py-2 font-semibold">Tile Size</th>
                      <th className="border border-gray-200 px-4 py-2 font-semibold">Tiles per Sq Ft</th>
                      <th className="border border-gray-200 px-4 py-2 font-semibold">Best For</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { size: "4×4 inch", ppsf: "9", use: "Backsplash, small walls" },
                      { size: "6×6 inch", ppsf: "4", use: "Kitchen backsplash, bathroom" },
                      { size: "12×12 inch", ppsf: "1", use: "Most popular, floors & walls" },
                      { size: "18×18 inch", ppsf: "~0.44", use: "Large rooms, commercial" },
                      { size: "24×24 inch", ppsf: "~0.25", use: "Modern large-format floors" },
                      { size: "3×6 inch (Subway)", ppsf: "~8", use: "Kitchen backsplash, shower" },
                    ].map((row) => (
                      <tr key={row.size} className="hover:bg-gray-50">
                        <td className="border border-gray-200 px-4 py-2 font-medium">{row.size}</td>
                        <td className="border border-gray-200 px-4 py-2 font-semibold text-orange-700">{row.ppsf}</td>
                        <td className="border border-gray-200 px-4 py-2 text-gray-600">{row.use}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* FAQ */}
            <section>
              <h2 className="mb-6 text-2xl font-bold text-gray-900">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {faqs.map((faq, i) => (
                  <div key={i} className="card p-5">
                    <h3 className="font-semibold text-gray-900">{faq.question}</h3>
                    <p className="mt-2 text-sm text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </section>

            <div className="ad-slot">Advertisement</div>
          </div>

          {/* Sidebar */}
          <aside className="mt-8 space-y-6 lg:mt-0">
            <div className="ad-slot h-[250px]">Advertisement</div>

            <div className="card p-5">
              <h3 className="mb-4 font-semibold text-gray-900">Related Construction Tools</h3>
              <ul className="space-y-3">
                {relatedTools.map((t) => (
                  <li key={t.href}>
                    <Link href={t.href} className="group flex items-start gap-2">
                      <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-orange-500 group-hover:translate-x-0.5 transition-transform" />
                      <div>
                        <div className="text-sm font-medium text-gray-900 group-hover:text-orange-600 transition-colors">{t.title}</div>
                        <div className="text-xs text-gray-500">{t.desc}</div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="card p-5 space-y-3">
              <h3 className="font-semibold text-gray-900">Quick Reference</h3>
              {[
                { label: "1 sq ft = ", value: "144 sq in" },
                { label: "1 sq m = ", value: "10.76 sq ft" },
                { label: "Standard Grout Joint", value: "1/8 inch" },
                { label: "Min Waste (Straight)", value: "10%" },
                { label: "Min Waste (Diagonal)", value: "20%" },
              ].map((f) => (
                <div key={f.label} className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">{f.label}</span>
                  <span className="font-semibold text-gray-900">{f.value}</span>
                </div>
              ))}
            </div>

            <div className="ad-slot h-[250px]">Advertisement</div>
          </aside>
        </div>
      </div>
    </>
  );
}
