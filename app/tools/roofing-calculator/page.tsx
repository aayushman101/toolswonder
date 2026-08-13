import type { Metadata } from "next";
import RoofingCalculator from "@/components/tools/RoofingCalculator";
import Breadcrumb from "@/components/layout/Breadcrumb";
import JsonLd, { buildToolSchema, buildFaqSchema, buildBreadcrumbSchema } from "@/components/seo/JsonLd";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

const BASE_URL = "https://toolswonder.com";
const TOOL_URL = `${BASE_URL}/tools/roofing-calculator`;

export const metadata: Metadata = {
  title: "Roofing Calculator – How Many Roofing Squares Do I Need?",
  description: "Free roofing calculator. Calculate roofing squares, materials, and cost needed for your project. Includes asphalt, metal, tile, wood, and composite roofing materials.",
  keywords: [
    "roofing calculator",
    "roofing calculator square feet",
    "roof calculator",
    "asphalt shingles calculator",
    "metal roofing calculator",
    "roof cost calculator",
    "shingles calculator",
    "roofing squares calculator"
  ],
  alternates: { canonical: TOOL_URL },
  openGraph: {
    title: "Roofing Calculator – How Many Roofing Squares Do I Need?",
    description: "Calculate roofing materials, squares, and costs for any roof replacement or repair project.",
    url: TOOL_URL,
    type: "website",
  },
};

const faqs = [
  {
    question: "What is a roofing square?",
    answer: "A roofing square is a unit of measurement equal to 100 square feet of roof area. Roofers use squares to measure and price roofing materials. For example, a 1,000 sq ft roof requires 10 squares of material. This calculator automatically converts your roof dimensions into squares."
  },
  {
    question: "How do I measure roof pitch?",
    answer: "Roof pitch is expressed as rise:run (e.g., 6:12). This means for every 12 inches of horizontal distance, the roof rises 6 inches. You can measure pitch using a level and measuring tape, or consult your home&apos;s blueprints. Common pitches: 4:12 (low), 6:12 (standard), 8:12 (steep), 12:12 (very steep)."
  },
  {
    question: "How does roof pitch affect material needed?",
    answer: "A steeper pitch increases the actual roof surface area compared to the ground footprint. For example, a 6:12 pitch roof covering 1,000 sq ft requires about 1,118 sq ft of materials. A 12:12 pitch requires about 1,415 sq ft. This calculator accounts for pitch automatically using the Pythagorean theorem."
  },
  {
    question: "What is waste percentage in roofing?",
    answer: "Waste accounts for cutting, trimming, overlaps, and damaged materials during installation. Typical waste is 5-15%. Use 5% for experienced installers with simple roof designs. Use 10% for standard projects. Use 15% for complex roofs with many valleys, dormers, or skylights. Always round up your material orders."
  },
  {
    question: "How much does roofing cost per square?",
    answer: "Asphalt shingles: $80-150 per square. Metal roofing: $150-300 per square. Tile: $200-400 per square. Wood shakes: $250-500 per square. Composite: $200-350 per square. Prices vary by region, quality, and material brand. Labor adds $75-150 per square depending on complexity and location."
  },
  {
    question: "How long does a roof replacement take?",
    answer: "A typical 20-square roof takes 1-3 days with a professional crew of 3-4 people. Small repairs may take hours. Large or complex roofs (multiple slopes, many penetrations) may take 5-7 days. Weather significantly impacts timing. Always use licensed, insured contractors for safety and warranty compliance."
  },
];

export default function Page() {
  return (
    <>
      <JsonLd data={buildToolSchema({ name: "Roofing Calculator", description: "Calculate roofing squares, materials, and costs for replacement or repair projects. Supports multiple roof pitches and material types.", url: TOOL_URL, category: "Home & Construction" })} />
      <JsonLd data={buildFaqSchema(faqs)} />
      <JsonLd data={buildBreadcrumbSchema([{ name: "Home", url: BASE_URL }, { name: "Tools", url: `${BASE_URL}/tools` }, { name: "Roofing Calculator", url: TOOL_URL }])} />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: "Tools", href: "/tools" }, { label: "Roofing Calculator" }]} />
        <div className="flex items-center gap-3 mt-6 mb-2">
          <h1 className="text-3xl font-bold">Roofing Calculator</h1>
          <span className="px-3 py-1 bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300 rounded-full text-xs font-medium">Home & Construction</span>
        </div>
        <p className="text-gray-600 dark:text-gray-400 mb-6">Calculate roofing squares, material quantity, and project costs. Accounts for roof pitch, material type, and waste allowance.</p>
        <RoofingCalculator />

        <div className="grid lg:grid-cols-3 gap-8 mt-8">
          <div className="lg:col-span-2 space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-4">Understanding Roof Pitch</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">Roof pitch affects both the amount of material needed and the installation difficulty. A higher pitch means more surface area and typically higher labor costs.</p>
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-orange-50 dark:bg-orange-950 border-b border-orange-200 dark:border-orange-800">
                    <th className="px-4 py-2 text-left font-semibold">Pitch</th>
                    <th className="px-4 py-2 text-left font-semibold">Description</th>
                    <th className="px-4 py-2 text-center font-semibold">Area Multiplier</th>
                    <th className="px-4 py-2 text-left font-semibold">Common For</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b dark:border-gray-700">
                    <td className="px-4 py-2 font-medium">2:12</td>
                    <td className="px-4 py-2">Shallow/Flat</td>
                    <td className="px-4 py-2 text-center">1.02</td>
                    <td className="px-4 py-2">Commercial, modern homes</td>
                  </tr>
                  <tr className="border-b dark:border-gray-700">
                    <td className="px-4 py-2 font-medium">4:12</td>
                    <td className="px-4 py-2">Low</td>
                    <td className="px-4 py-2 text-center">1.05</td>
                    <td className="px-4 py-2">Transitional, ranch homes</td>
                  </tr>
                  <tr className="border-b dark:border-gray-700">
                    <td className="px-4 py-2 font-medium">6:12</td>
                    <td className="px-4 py-2">Standard</td>
                    <td className="px-4 py-2 text-center">1.12</td>
                    <td className="px-4 py-2">Most residential homes</td>
                  </tr>
                  <tr className="border-b dark:border-gray-700">
                    <td className="px-4 py-2 font-medium">8:12</td>
                    <td className="px-4 py-2">Medium Steep</td>
                    <td className="px-4 py-2 text-center">1.20</td>
                    <td className="px-4 py-2">Colonial, traditional styles</td>
                  </tr>
                  <tr className="border-b dark:border-gray-700">
                    <td className="px-4 py-2 font-medium">10:12</td>
                    <td className="px-4 py-2">Steep</td>
                    <td className="px-4 py-2 text-center">1.30</td>
                    <td className="px-4 py-2">Steep roofs, heavy snow areas</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-medium">12:12</td>
                    <td className="px-4 py-2">Very Steep</td>
                    <td className="px-4 py-2 text-center">1.41</td>
                    <td className="px-4 py-2">Steep architectural designs</td>
                  </tr>
                </tbody>
              </table>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Roofing Materials Comparison</h2>
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-blue-50 dark:bg-blue-950 border-b border-blue-200 dark:border-blue-800">
                    <th className="px-4 py-2 text-left font-semibold">Material</th>
                    <th className="px-4 py-2 text-center font-semibold">Lifespan</th>
                    <th className="px-4 py-2 text-center font-semibold">Cost/Sq</th>
                    <th className="px-4 py-2 text-left font-semibold">Best For</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b dark:border-gray-700">
                    <td className="px-4 py-2 font-medium">Asphalt Shingles</td>
                    <td className="px-4 py-2 text-center">15-25 years</td>
                    <td className="px-4 py-2 text-center">$80-150</td>
                    <td className="px-4 py-2">Most affordable option</td>
                  </tr>
                  <tr className="border-b dark:border-gray-700">
                    <td className="px-4 py-2 font-medium">Metal Roofing</td>
                    <td className="px-4 py-2 text-center">30-50 years</td>
                    <td className="px-4 py-2 text-center">$150-300</td>
                    <td className="px-4 py-2">Energy efficient, long-lasting</td>
                  </tr>
                  <tr className="border-b dark:border-gray-700">
                    <td className="px-4 py-2 font-medium">Tile Roofing</td>
                    <td className="px-4 py-2 text-center">50+ years</td>
                    <td className="px-4 py-2 text-center">$200-400</td>
                    <td className="px-4 py-2">Mediterranean, southwest styles</td>
                  </tr>
                  <tr className="border-b dark:border-gray-700">
                    <td className="px-4 py-2 font-medium">Wood Shakes</td>
                    <td className="px-4 py-2 text-center">20-40 years</td>
                    <td className="px-4 py-2 text-center">$250-500</td>
                    <td className="px-4 py-2">High-end, rustic look</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-medium">Composite</td>
                    <td className="px-4 py-2 text-center">25-40 years</td>
                    <td className="px-4 py-2 text-center">$200-350</td>
                    <td className="px-4 py-2">Eco-friendly, durable</td>
                  </tr>
                </tbody>
              </table>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">How to Use This Calculator</h2>
              <ol className="space-y-3 text-gray-700 dark:text-gray-300 list-decimal list-inside">
                <li>Measure or find your roof&apos;s length and width in feet</li>
                <li>Determine your roof pitch (typically 4:12, 6:12, or 8:12)</li>
                <li>Select your roofing material type</li>
                <li>Enter waste percentage (typically 10%)</li>
                <li>Enter material cost per square foot (varies by material and region)</li>
                <li>The calculator shows total squares, cost, and labor estimate</li>
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
                  { title: "Insulation Calculator", slug: "insulation-calculator" },
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
