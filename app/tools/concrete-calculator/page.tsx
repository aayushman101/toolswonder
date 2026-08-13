import type { Metadata } from "next";
import ConcreteCalculator from "@/components/tools/ConcreteCalculator";
import JsonLd, { buildToolSchema, buildFaqSchema, buildBreadcrumbSchema } from "@/components/seo/JsonLd";
import Breadcrumb from "@/components/layout/Breadcrumb";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

const BASE_URL = "https://toolswonder.com";
const TOOL_URL = `${BASE_URL}/tools/concrete-calculator`;

export const metadata: Metadata = {
  title: "Concrete Calculator – How Many Bags Do I Need?",
  description: "Free concrete calculator to determine how many bags of concrete you need for your project. Calculate by area, depth, and bag size. Get instant results for driveways, patios, slabs.",
  keywords: [
    "concrete calculator",
    "how many bags of concrete do i need",
    "concrete bags calculator",
    "concrete calculator square feet",
    "bags of concrete needed",
    "concrete yardage calculator",
    "driveway concrete calculator",
    "patio concrete calculator",
    "concrete slab calculator",
    "concrete cost calculator",
  ],
  alternates: { canonical: TOOL_URL },
  openGraph: {
    title: "Concrete Calculator – How Many Bags of Concrete Do I Need?",
    description: "Calculate how many bags of concrete you need for driveways, patios, slabs, and more. Works with rectangular, circular, or irregular shapes.",
    url: TOOL_URL,
    type: "website",
  },
};

const faqs = [
  {
    question: "How many bags of concrete do I need for my project?",
    answer: "To calculate bags needed: (1) Measure your area in square feet (length × width). (2) Decide on concrete depth in inches (typical: 4-6 inches for driveways, 3-4 for patios). (3) Use the formula: Area (sq ft) × Depth (inches) ÷ 324 = cubic yards. (4) Multiply cubic yards by 60 (for 80-lb bags) or 54 (for 60-lb bags). Our calculator does this instantly and adds waste allowance (typically 5-15%).",
  },
  {
    question: "What concrete depth should I use?",
    answer: "Typical depths: Driveways: 4-6 inches (4 inches minimum, 6 if heavy traffic). Patios: 3-4 inches (4 inches for durability). Walkways: 3-4 inches. Footings: 12+ inches. Garden beds: 2-3 inches. Garage floors: 4-6 inches. Add ½-1 inch extra for grading and settling. Use the depths that match your project type.",
  },
  {
    question: "Should I use 60-lb or 80-lb concrete bags?",
    answer: "60-lb bags are easier to handle and pour for DIY projects. 80-lb bags are more economical (fewer bags = less material waste). For 1 cubic yard: 60-lb bags ≈ 54 bags, 80-lb bags ≈ 40 bags. Choose 80-lb for cost savings if you can handle the weight, or 60-lb for ease (especially for projects over a few cubic yards).",
  },
  {
    question: "What is waste percentage in concrete calculations?",
    answer: "Waste (5-15%) accounts for spillage, settling, and uneven surfaces. Use: 5% if experienced and grading is flat. 10% for standard DIY projects (most common). 15% for irregular shapes, poor grading, or inexperienced pouring. Always round up to whole bags—you can't order 43.5 bags. It's better to have extra concrete than to run short mid-pour.",
  },
  {
    question: "How long does concrete take to cure before I can use it?",
    answer: "Concrete reaches 70% strength in 7 days and 95% strength in 28 days. Timing: Light foot traffic (walking): 24-48 hours. Vehicle traffic on driveway: 7 days minimum. Full strength and ready for heavy use: 28 days. Weather affects curing—cold delays it, heat speeds it up. Keep concrete moist during curing for best results.",
  },
  {
    question: "Can I calculate concrete for circular or irregular areas?",
    answer: "Yes! For circles: Use πr² to get square footage, then enter that in the calculator's irregular shape option. For irregular shapes: Break it into rectangles/circles, calculate each separately, then add the results. Or estimate the total area and use the irregular shape option. Our calculator supports both rectangular and circular measurements.",
  },
  {
    question: "How much does a cubic yard of concrete cost?",
    answer: "Ready-mix concrete (delivered): $150-250 per cubic yard depending on location and mix (air-entrained, fiber-reinforced, etc.). Bagged concrete (DIY): $3.50-$8 per bag (80-lb), or $5.40-$12.30 per cubic yard depending on bag size and location. Ready-mix is cheaper for large projects (5+ cubic yards), bags are better for small projects. Prices vary by region and supplier.",
  },
];

export default function ConcreteCalculatorPage() {
  return (
    <>
      <JsonLd data={buildToolSchema({ name: "Concrete Calculator", description: "Calculate how many bags of concrete you need for any project. Enter area, depth, shape, and bag size to get instant results.", url: TOOL_URL, category: "Construction" })} />
      <JsonLd data={buildFaqSchema(faqs)} />
      <JsonLd data={buildBreadcrumbSchema([{ name: "Home", url: BASE_URL }, { name: "Tools", url: `${BASE_URL}/tools` }, { name: "Concrete Calculator", url: TOOL_URL }])} />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: "Tools", href: "/tools" }, { label: "Concrete Calculator" }]} />
        <div className="ad-slot my-4">Advertisement</div>

        <div className="lg:grid lg:grid-cols-[1fr_280px] lg:gap-8">
          <div className="space-y-8">
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 sm:text-4xl">
                  Concrete Calculator
                </h1>
                <span className="rounded-full bg-orange-100 dark:bg-orange-900 px-3 py-1 text-xs font-semibold text-orange-800 dark:text-orange-200">
                  Construction
                </span>
              </div>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Calculate how many bags of concrete you need for driveways, patios, slabs, and any concrete project. Enter dimensions, shape, and bag size to get instant results including cost estimates.
              </p>
            </div>

            <ConcreteCalculator />

            <div className="ad-slot">Advertisement</div>

            {/* Concrete coverage reference */}
            <section>
              <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">
                Concrete Coverage by Depth (per Cubic Yard)
              </h2>
              <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-300">Depth</th>
                      <th className="px-4 py-3 text-center font-semibold text-gray-700 dark:text-gray-300">Square Feet (1 yd³)</th>
                      <th className="px-4 py-3 text-center font-semibold text-gray-700 dark:text-gray-300">80-lb Bags</th>
                      <th className="px-4 py-3 text-center font-semibold text-gray-700 dark:text-gray-300">60-lb Bags</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                    {[
                      ["2 inches", "162 sq ft", "20 bags", "27 bags"],
                      ["3 inches", "108 sq ft", "30 bags", "40 bags"],
                      ["4 inches", "81 sq ft", "40 bags", "54 bags"],
                      ["5 inches", "65 sq ft", "51 bags", "68 bags"],
                      ["6 inches", "54 sq ft", "60 bags", "81 bags"],
                      ["8 inches", "41 sq ft", "81 bags", "108 bags"],
                    ].map(([depth, area, bags80, bags60]) => (
                      <tr key={depth} className="even:bg-gray-50/50 dark:even:bg-gray-800/30">
                        <td className="px-4 py-2.5 font-medium text-gray-800 dark:text-gray-200">{depth}</td>
                        <td className="px-4 py-2.5 text-center text-gray-600 dark:text-gray-400">{area}</td>
                        <td className="px-4 py-2.5 text-center text-gray-600 dark:text-gray-400">{bags80}</td>
                        <td className="px-4 py-2.5 text-center text-gray-600 dark:text-gray-400">{bags60}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">* 1 cubic yard = 27 cubic feet. Actual bags may vary based on bag weight and waste percentage.</p>
            </section>

            {/* Concrete cost & mix reference */}
            <section>
              <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">
                Concrete Mix Types & Typical Applications
              </h2>
              <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-300">Mix Type</th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-300">Strength (psi)</th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-300">Best For</th>
                      <th className="px-4 py-3 text-center font-semibold text-gray-700 dark:text-gray-300">Typical Cost</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                    {[
                      ["Standard (4000 psi)", "4000", "Driveways, patios, slabs", "$3.50-$5/bag"],
                      ["High Strength (5000 psi)", "5000", "Heavy traffic, foundations", "$4.50-$6/bag"],
                      ["Fiber Reinforced", "4000", "Reduces cracking, non-structural", "$4-$5.50/bag"],
                      ["Self-Consolidating", "4000", "Easy pour, complex shapes", "$6-$8/bag"],
                      ["Air-Entrained", "4000", "Freeze-thaw resistance (cold climates)", "$4-$5.50/bag"],
                    ].map(([type, psi, use, cost]) => (
                      <tr key={type} className="even:bg-gray-50/50 dark:even:bg-gray-800/30">
                        <td className="px-4 py-2.5 font-medium text-gray-800 dark:text-gray-200">{type}</td>
                        <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400">{psi}</td>
                        <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400">{use}</td>
                        <td className="px-4 py-2.5 text-center text-gray-600 dark:text-gray-400">{cost}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* FAQ */}
            <section>
              <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-gray-100">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {faqs.map((f, i) => (
                  <div key={i} className="card p-5">
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100">{f.question}</h3>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{f.answer}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="mt-8 space-y-5 lg:mt-0">
            <div className="ad-slot h-[250px]">Advertisement</div>

            <div className="card p-5">
              <h3 className="mb-3 font-semibold text-gray-900 dark:text-gray-100">Quick Tips</h3>
              <div className="space-y-3 text-xs">
                {[
                  ["Standard depth", "4 inches (driveways)"],
                  ["Bag weight", "80 lb standard, 60 lb for DIY"],
                  ["Cure time", "7 days for basic use"],
                  ["Full strength", "28 days"],
                  ["Waste buffer", "Add 10-15%"],
                  ["Temperature", "Avoid pouring below 50°F"],
                ].map(([tip, val]) => (
                  <div key={tip} className="flex justify-between gap-2">
                    <span className="text-gray-500 dark:text-gray-400">{tip}</span>
                    <span className="font-semibold text-orange-700 dark:text-orange-400 text-right">{val}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="card p-5">
              <h3 className="mb-3 font-semibold text-gray-900 dark:text-gray-100">Related Tools</h3>
              <div className="space-y-2">
                {[
                  { href: "/tools/tile-calculator", label: "Tile Calculator" },
                  { href: "/tools/paint-calculator", label: "Paint Calculator" },
                  { href: "/tools/brick-calculator", label: "Brick Calculator" },
                ].map((t) => (
                  <Link
                    key={t.href}
                    href={t.href}
                    className="flex items-center justify-between rounded-lg p-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    {t.label}
                    <ChevronRight className="h-4 w-4 text-gray-400" />
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
