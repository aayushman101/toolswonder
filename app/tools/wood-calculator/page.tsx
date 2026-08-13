import type { Metadata } from "next";
import WoodCalculator from "@/components/tools/WoodCalculator";
import Breadcrumb from "@/components/layout/Breadcrumb";
import JsonLd, { buildToolSchema, buildFaqSchema, buildBreadcrumbSchema } from "@/components/seo/JsonLd";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

const BASE_URL = "https://toolswonder.com";
const TOOL_URL = `${BASE_URL}/tools/wood-calculator`;

export const metadata: Metadata = {
  title: "Wood Calculator – Cubic Feet, Board Feet & Cord Calculator",
  description: "Free wood calculator. Calculate cubic feet, board feet, cords, and weight of lumber. Supports softwood, hardwood, plywood, and firewood calculations.",
  keywords: [
    "wood calculator",
    "cord of wood calculator",
    "board feet calculator",
    "cubic feet wood calculator",
    "wood weight calculator",
    "lumber calculator",
    "firewood calculator",
    "cord wood calculator"
  ],
  alternates: { canonical: TOOL_URL },
  openGraph: {
    title: "Wood Calculator – Cubic Feet, Board Feet & Cord Calculator",
    description: "Calculate wood volume, board feet, cords, and weight for lumber, firewood, and woodworking projects.",
    url: TOOL_URL,
    type: "website",
  },
};

const faqs = [
  {
    question: "What is board feet?",
    answer: "Board feet (BF) is a unit of measurement for lumber. One board foot equals 144 cubic inches or a 1-inch thick piece of wood 1 foot long and 1 foot wide. Formula: (Thickness in inches × Width in inches × Length in feet) ÷ 12 = Board Feet. It&apos;s the standard measurement for pricing lumber in the US."
  },
  {
    question: "What is a cord of wood?",
    answer: "A cord is a unit of volume for stacked firewood. One cord equals 128 cubic feet, typically 4 feet high × 4 feet deep × 8 feet long. A cord weighs 2,000–3,000 lbs depending on wood type and moisture. Green (freshly cut) wood is heavier than seasoned wood. Used primarily for firewood and pulpwood sales."
  },
  {
    question: "How do I calculate cubic feet of wood?",
    answer: "Cubic feet = Length (ft) × Width (ft) × Height/Thickness (ft). For example, a 10 ft long × 8 ft wide × 1 ft thick piece = 80 cubic feet. If dimensions are in inches, convert to feet first by dividing by 12. This calculator does the conversion automatically."
  },
  {
    question: "What is the difference between softwood and hardwood?",
    answer: "Softwood (pine, fir, spruce) comes from coniferous trees, costs less, and is lighter ($0.50–$2/board foot). Hardwood (oak, maple, walnut) comes from deciduous trees, costs more, and is heavier ($3–$15+/board foot). Hardwood is more durable and better for furniture; softwood is standard for framing and construction."
  },
  {
    question: "How much does wood weigh per cubic foot?",
    answer: "Weight varies by type: Softwood (lumber): 25–35 lbs/cu ft. Hardwood: 35–50 lbs/cu ft. Firewood (green): 40–50 lbs/cu ft. Firewood (seasoned): 30–40 lbs/cu ft. Plywood: 30–50 lbs/cu ft. Green wood weighs more due to moisture content. Seasoned/kiln-dried wood weighs significantly less after water is removed."
  },
  {
    question: "How do I measure wood thickness?",
    answer: "Lumber is typically sold in nominal sizes (2×4, 2×6, etc.). Actual dimensions are slightly smaller: a 2×4 is actually 1.5 inches thick and 3.5 inches wide. Plywood comes in 1/4, 3/8, 1/2, 5/8, 3/4, and 1-inch thicknesses. Measure actual thickness with a ruler for accurate calculations. This calculator uses actual dimensions."
  },
];

export default function Page() {
  return (
    <>
      <JsonLd data={buildToolSchema({ name: "Wood Calculator", description: "Calculate wood volume in cubic feet, board feet, and cords. Supports lumber, hardwood, plywood, and firewood with weight estimation.", url: TOOL_URL, category: "DIY & Landscaping" })} />
      <JsonLd data={buildFaqSchema(faqs)} />
      <JsonLd data={buildBreadcrumbSchema([{ name: "Home", url: BASE_URL }, { name: "Tools", url: `${BASE_URL}/tools` }, { name: "Wood Calculator", url: TOOL_URL }])} />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: "Tools", href: "/tools" }, { label: "Wood Calculator" }]} />
        <div className="flex items-center gap-3 mt-6 mb-2">
          <h1 className="text-3xl font-bold">Wood Calculator</h1>
          <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-full text-xs font-medium">DIY & Landscaping</span>
        </div>
        <p className="text-gray-600 dark:text-gray-400 mb-6">Calculate wood volume in cubic feet, board feet, cords, and weight. Perfect for lumber orders, firewood, and woodworking projects.</p>
        <WoodCalculator />

        <div className="grid lg:grid-cols-3 gap-8 mt-8">
          <div className="lg:col-span-2 space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-4">Wood Measurement Units</h2>
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-green-50 dark:bg-green-950 border-b border-green-200 dark:border-green-800">
                    <th className="px-4 py-2 text-left font-semibold">Unit</th>
                    <th className="px-4 py-2 text-center font-semibold">Volume</th>
                    <th className="px-4 py-2 text-left font-semibold">Used For</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b dark:border-gray-700">
                    <td className="px-4 py-2 font-medium">Cubic Foot (cu ft)</td>
                    <td className="px-4 py-2 text-center">1 ft³</td>
                    <td className="px-4 py-2">Volume calculations, general measurements</td>
                  </tr>
                  <tr className="border-b dark:border-gray-700">
                    <td className="px-4 py-2 font-medium">Board Foot (BF)</td>
                    <td className="px-4 py-2 text-center">144 cu in (1/12 cu ft)</td>
                    <td className="px-4 py-2">Lumber pricing and sales (US standard)</td>
                  </tr>
                  <tr className="border-b dark:border-gray-700">
                    <td className="px-4 py-2 font-medium">Cord</td>
                    <td className="px-4 py-2 text-center">128 cu ft</td>
                    <td className="px-4 py-2">Firewood and pulpwood sales</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-medium">Pallet</td>
                    <td className="px-4 py-2 text-center">Varies</td>
                    <td className="px-4 py-2">Industrial wood shipping</td>
                  </tr>
                </tbody>
              </table>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Wood Types & Weight</h2>
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-blue-50 dark:bg-blue-950 border-b border-blue-200 dark:border-blue-800">
                    <th className="px-4 py-2 text-left font-semibold">Wood Type</th>
                    <th className="px-4 py-2 text-center font-semibold">lbs per Cu Ft</th>
                    <th className="px-4 py-2 text-left font-semibold">Common Uses</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b dark:border-gray-700">
                    <td className="px-4 py-2 font-medium">Softwood (Pine, Fir)</td>
                    <td className="px-4 py-2 text-center">25–35</td>
                    <td className="px-4 py-2">Framing, construction, budget lumber</td>
                  </tr>
                  <tr className="border-b dark:border-gray-700">
                    <td className="px-4 py-2 font-medium">Hardwood (Oak, Maple)</td>
                    <td className="px-4 py-2 text-center">35–50</td>
                    <td className="px-4 py-2">Flooring, furniture, cabinetry</td>
                  </tr>
                  <tr className="border-b dark:border-gray-700">
                    <td className="px-4 py-2 font-medium">Firewood (Green)</td>
                    <td className="px-4 py-2 text-center">40–50</td>
                    <td className="px-4 py-2">Burning (higher moisture)</td>
                  </tr>
                  <tr className="border-b dark:border-gray-700">
                    <td className="px-4 py-2 font-medium">Firewood (Seasoned)</td>
                    <td className="px-4 py-2 text-center">30–40</td>
                    <td className="px-4 py-2">Burning (dried 6–12 months)</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-medium">Plywood</td>
                    <td className="px-4 py-2 text-center">30–50</td>
                    <td className="px-4 py-2">Sheathing, subfloors, structural</td>
                  </tr>
                </tbody>
              </table>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">How to Use This Calculator</h2>
              <ol className="space-y-3 text-gray-700 dark:text-gray-300 list-decimal list-inside">
                <li>Select your measurement unit (feet or inches)</li>
                <li>Enter the length, width, and thickness of your wood</li>
                <li>Select the wood type for weight estimation</li>
                <li>Get instant results in cubic feet, board feet, cords, and weight</li>
              </ol>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {faqs.map((faq, idx) => (
                  <div key={idx} className="border-l-4 border-green-300 dark:border-green-700 pl-4">
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">{faq.question}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="space-y-6">
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h3 className="font-semibold mb-3 text-gray-900 dark:text-gray-100">Related Tools</h3>
              <div className="space-y-2">
                {[
                  { title: "Flooring Calculator", slug: "flooring-calculator" },
                  { title: "Roofing Calculator", slug: "roofing-calculator" },
                ].map((tool) => (
                  <Link key={tool.slug} href={`/tools/${tool.slug}`} className="flex items-center justify-between p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors">
                    <span className="text-sm text-gray-700 dark:text-gray-300">{tool.title}</span>
                    <ChevronRight size={16} className="text-gray-400" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
