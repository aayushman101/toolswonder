import type { Metadata } from "next";
import FlooringCalculator from "@/components/tools/FlooringCalculator";
import Breadcrumb from "@/components/layout/Breadcrumb";
import JsonLd, { buildToolSchema, buildFaqSchema, buildBreadcrumbSchema } from "@/components/seo/JsonLd";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

const BASE_URL = "https://toolswonder.com";
const TOOL_URL = `${BASE_URL}/tools/flooring-calculator`;

export const metadata: Metadata = {
  title: "Flooring Calculator – How Many Boxes of Flooring Do I Need?",
  description: "Free flooring calculator. Calculate how many boxes of laminate, vinyl, hardwood, tile, or carpet you need for your room. Includes waste allowance and cost estimates.",
  keywords: [
    "flooring calculator",
    "flooring calculator square feet",
    "laminate flooring calculator",
    "vinyl flooring calculator",
    "hardwood flooring calculator",
    "how many boxes of flooring",
    "flooring cost calculator",
    "vinyl plank calculator"
  ],
  alternates: { canonical: TOOL_URL },
  openGraph: {
    title: "Flooring Calculator – How Many Boxes of Flooring Do I Need?",
    description: "Calculate flooring materials, boxes, and project costs for any room size.",
    url: TOOL_URL,
    type: "website",
  },
};

const faqs = [
  {
    question: "How do I calculate how many boxes of flooring I need?",
    answer: "Measure your room length and width in feet, multiply to get square footage, add waste percentage (typically 10%), then divide by coverage per box. For a 20x15 ft room (300 sq ft) with 10% waste = 330 sq ft. If each box covers 10 sq ft, you need 33 boxes. This calculator does it automatically."
  },
  {
    question: "What waste percentage should I use?",
    answer: "Use 5-10% for simple rectangular rooms with few cuts. Use 10-15% for rooms with irregular shapes, doorways, or closets. Use 15-20% for complex layouts with many angles or for materials like hardwood that show grain patterns. Always round up to whole boxes—you can return unused boxes but can&apos;t always reorder exact quantities."
  },
  {
    question: "How much flooring coverage is in a box?",
    answer: "Coverage varies by material: Laminate typically 10 sq ft per box. Vinyl Plank (LVP) typically 9 sq ft per box. Hardwood typically 20 sq ft per box. Tile typically 7-10 sq ft per box. Carpet typically 50-60 sq ft per roll (12 ft wide). Check your product&apos;s packaging for exact coverage—it varies by plank/tile size."
  },
  {
    question: "What&apos;s the difference between laminate, vinyl, and hardwood flooring?",
    answer: "Laminate is affordable ($1-3 per sq ft), durable, and water-resistant (not waterproof). Vinyl/LVP is waterproof ($2-5 per sq ft), very durable, and good for kitchens/bathrooms. Hardwood is premium ($5-15+ per sq ft), beautiful, but requires maintenance. Choose based on budget, style, moisture exposure, and durability needs."
  },
  {
    question: "How long does flooring installation take?",
    answer: "DIY installation: 1-2 days for a 200-400 sq ft room (laminate, vinyl, or tile). Professional installation: 1-3 days depending on material and complexity. Hardwood and tile take longer. Carpet usually takes 1-2 days. Factor in time for removing old flooring and preparing the subfloor."
  },
  {
    question: "Do I need underlayment for my flooring?",
    answer: "Laminate requires underlayment (moisture barrier). Vinyl and luxury vinyl plank (LVP) have built-in underlayment but benefit from additional moisture protection in wet areas. Hardwood requires underlayment for moisture protection. Tile and carpet typically don&apos;t need underlayment unless on concrete. Check product requirements and subfloor condition."
  },
];

export default function Page() {
  return (
    <>
      <JsonLd data={buildToolSchema({ name: "Flooring Calculator", description: "Calculate how many boxes of flooring materials you need for any room. Supports laminate, vinyl, hardwood, tile, and carpet with waste allowance.", url: TOOL_URL, category: "Home & Construction" })} />
      <JsonLd data={buildFaqSchema(faqs)} />
      <JsonLd data={buildBreadcrumbSchema([{ name: "Home", url: BASE_URL }, { name: "Tools", url: `${BASE_URL}/tools` }, { name: "Flooring Calculator", url: TOOL_URL }])} />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: "Tools", href: "/tools" }, { label: "Flooring Calculator" }]} />
        <div className="flex items-center gap-3 mt-6 mb-2">
          <h1 className="text-3xl font-bold">Flooring Calculator</h1>
          <span className="px-3 py-1 bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300 rounded-full text-xs font-medium">Home & Construction</span>
        </div>
        <p className="text-gray-600 dark:text-gray-400 mb-6">Calculate flooring material quantity and project cost. Accounts for room size, material type, and waste allowance.</p>
        <FlooringCalculator />

        <div className="grid lg:grid-cols-3 gap-8 mt-8">
          <div className="lg:col-span-2 space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-4">Flooring Material Comparison</h2>
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-orange-50 dark:bg-orange-950 border-b border-orange-200 dark:border-orange-800">
                    <th className="px-4 py-2 text-left font-semibold">Material</th>
                    <th className="px-4 py-2 text-center font-semibold">Cost/Sq Ft</th>
                    <th className="px-4 py-2 text-center font-semibold">Durability</th>
                    <th className="px-4 py-2 text-left font-semibold">Best For</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b dark:border-gray-700">
                    <td className="px-4 py-2 font-medium">Laminate</td>
                    <td className="px-4 py-2 text-center">$1.00–$3.00</td>
                    <td className="px-4 py-2 text-center">7–10 years</td>
                    <td className="px-4 py-2">Budget-friendly, durable</td>
                  </tr>
                  <tr className="border-b dark:border-gray-700">
                    <td className="px-4 py-2 font-medium">Vinyl/LVP</td>
                    <td className="px-4 py-2 text-center">$2.00–$5.00</td>
                    <td className="px-4 py-2 text-center">10–20 years</td>
                    <td className="px-4 py-2">Waterproof, kitchens/baths</td>
                  </tr>
                  <tr className="border-b dark:border-gray-700">
                    <td className="px-4 py-2 font-medium">Hardwood</td>
                    <td className="px-4 py-2 text-center">$5.00–$15.00</td>
                    <td className="px-4 py-2 text-center">25–50 years</td>
                    <td className="px-4 py-2">Premium, long-lasting</td>
                  </tr>
                  <tr className="border-b dark:border-gray-700">
                    <td className="px-4 py-2 font-medium">Tile</td>
                    <td className="px-4 py-2 text-center">$2.00–$10.00</td>
                    <td className="px-4 py-2 text-center">30+ years</td>
                    <td className="px-4 py-2">Waterproof, heavy-duty</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-medium">Carpet</td>
                    <td className="px-4 py-2 text-center">$1.50–$5.00</td>
                    <td className="px-4 py-2 text-center">5–10 years</td>
                    <td className="px-4 py-2">Comfort, bedrooms</td>
                  </tr>
                </tbody>
              </table>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Flooring Coverage per Box</h2>
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-blue-50 dark:bg-blue-950 border-b border-blue-200 dark:border-blue-800">
                    <th className="px-4 py-2 text-left font-semibold">Material</th>
                    <th className="px-4 py-2 text-center font-semibold">Typical Box Coverage</th>
                    <th className="px-4 py-2 text-left font-semibold">Planks/Tiles per Box</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b dark:border-gray-700">
                    <td className="px-4 py-2 font-medium">Laminate</td>
                    <td className="px-4 py-2 text-center">10 sq ft</td>
                    <td className="px-4 py-2">8–12 planks</td>
                  </tr>
                  <tr className="border-b dark:border-gray-700">
                    <td className="px-4 py-2 font-medium">Vinyl Plank (LVP)</td>
                    <td className="px-4 py-2 text-center">9 sq ft</td>
                    <td className="px-4 py-2">10–15 planks</td>
                  </tr>
                  <tr className="border-b dark:border-gray-700">
                    <td className="px-4 py-2 font-medium">Hardwood</td>
                    <td className="px-4 py-2 text-center">20 sq ft</td>
                    <td className="px-4 py-2">15–20 planks</td>
                  </tr>
                  <tr className="border-b dark:border-gray-700">
                    <td className="px-4 py-2 font-medium">Ceramic Tile</td>
                    <td className="px-4 py-2 text-center">7–10 sq ft</td>
                    <td className="px-4 py-2">Varies by tile size</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-medium">Carpet</td>
                    <td className="px-4 py-2 text-center">50–60 sq ft</td>
                    <td className="px-4 py-2">Per 12 ft wide roll</td>
                  </tr>
                </tbody>
              </table>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">How to Use This Calculator</h2>
              <ol className="space-y-3 text-gray-700 dark:text-gray-300 list-decimal list-inside">
                <li>Measure your room length and width in feet</li>
                <li>Select your flooring material type</li>
                <li>Enter waste percentage (typically 10%)</li>
                <li>Enter material cost per square foot (check retail prices in your area)</li>
                <li>The calculator shows boxes needed and total project cost</li>
              </ol>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {faqs.map((faq, idx) => (
                  <div key={idx} className="border-l-4 border-orange-300 dark:border-orange-700 pl-4">
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
                  { title: "Renovation Cost Calculator", slug: "renovation-cost-calculator" },
                  { title: "Roofing Calculator", slug: "roofing-calculator" },
                  { title: "Concrete Calculator", slug: "concrete-calculator" },
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
