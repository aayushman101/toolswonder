import type { Metadata } from "next";
import InsulationCalculator from "@/components/tools/InsulationCalculator";
import Breadcrumb from "@/components/layout/Breadcrumb";
import JsonLd, { buildToolSchema, buildFaqSchema, buildBreadcrumbSchema } from "@/components/seo/JsonLd";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

const BASE_URL = "https://toolswonder.com";
const TOOL_URL = `${BASE_URL}/tools/insulation-calculator`;

export const metadata: Metadata = {
  title: "Insulation Calculator – How Much Insulation Do I Need?",
  description: "Free insulation calculator. Calculate how many batts, rolls, or bags of fiberglass, cellulose, or spray foam insulation you need for walls, attics, and basements.",
  keywords: [
    "insulation calculator",
    "how much insulation do i need",
    "blown in insulation calculator",
    "fiberglass insulation calculator",
    "spray foam insulation calculator",
    "attic insulation calculator",
    "cellulose insulation calculator"
  ],
  alternates: { canonical: TOOL_URL },
  openGraph: {
    title: "Insulation Calculator – How Much Insulation Do I Need?",
    description: "Calculate insulation batts, rolls, and bags needed for your project with cost estimates.",
    url: TOOL_URL,
    type: "website",
  },
};

const faqs = [
  {
    question: "What R-value do I need for my walls?",
    answer: "Wall insulation typically requires R-13 to R-15 depending on your climate zone. Consult your local building codes for specific requirements. The U.S. Department of Energy provides climate zone recommendations based on your location."
  },
  {
    question: "What R-value do I need for my attic?",
    answer: "Attic insulation needs vary by climate: R-30 to R-38 for moderate climates, R-38 to R-49 for cold climates, and R-49 to R-60 for very cold climates. Check your region's building code for exact requirements."
  },
  {
    question: "What is the difference between fiberglass, cellulose, and spray foam insulation?",
    answer: "Fiberglass batts are affordable and DIY-friendly with R-3.2 per inch. Cellulose (blown-in) offers R-3.6 per inch and fills gaps better but requires equipment. Spray foam provides R-6 to R-7 per inch, best air sealing, but is more expensive and requires professional installation."
  },
  {
    question: "How do I calculate how much insulation I need?",
    answer: "Measure the square footage of the area to be insulated and determine the required R-value for your climate zone. Divide the area by the coverage rate per unit (batt, roll, or bag) to find the number of units needed. This calculator automates that process."
  },
  {
    question: "Can I install insulation myself?",
    answer: "Fiberglass batts and rolls can be installed as a DIY project. Cellulose loose-fill and spray foam typically require professional equipment and installation. Always wear protective gear, follow manufacturer instructions, and ensure proper ventilation."
  },
  {
    question: "What is the cost of insulation?",
    answer: "Fiberglass batts cost $0.30–$0.60 per sq ft. Cellulose costs $0.40–$0.70 per sq ft. Spray foam is most expensive at $1.50–$2.50 per sq ft. Prices vary by region and material quality. Our calculator helps you estimate total project costs based on current pricing."
  }
];

export default function Page() {
  return (
    <>
      <JsonLd data={buildToolSchema({ name: "Insulation Calculator", description: "Calculate how many batts, rolls, or bags of insulation you need for walls, attics, and basements. Supports fiberglass, cellulose, spray foam, and mineral wool with R-value guidance.", url: TOOL_URL, category: "Home & HVAC" })} />
      <JsonLd data={buildFaqSchema(faqs)} />
      <JsonLd data={buildBreadcrumbSchema([{ name: "Home", url: BASE_URL }, { name: "Tools", url: `${BASE_URL}/tools` }, { name: "Insulation Calculator", url: TOOL_URL }])} />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumb items={[{ label: "Tools", href: "/tools" }, { label: "Insulation Calculator" }]} />
      <div className="flex items-center gap-3 mt-6 mb-2">
        <h1 className="text-3xl font-bold">Insulation Calculator</h1>
        <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-xs font-medium">Home & HVAC</span>
      </div>
      <p className="text-gray-600 dark:text-gray-400 mb-6">Calculate how many batts, rolls, or bags of insulation you need for walls, attics, and basements. Supports fiberglass, cellulose, spray foam, and mineral wool.</p>
      <InsulationCalculator />

      <div className="grid lg:grid-cols-3 gap-8 mt-8">
        <div className="lg:col-span-2 space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-4">Understanding Insulation R-Values</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">R-value measures insulation&apos;s resistance to heat flow. Higher R-values provide better insulation but cost more. Your location&apos;s climate zone determines the recommended R-value for walls, attics, and basements.</p>
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-blue-50 dark:bg-blue-950 border-b border-blue-200 dark:border-blue-800">
                  <th className="px-4 py-2 text-left font-semibold">Location</th>
                  <th className="px-4 py-2 text-left font-semibold">Mild Climate (R-)</th>
                  <th className="px-4 py-2 text-left font-semibold">Cold Climate (R-)</th>
                  <th className="px-4 py-2 text-left font-semibold">Very Cold (R-)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b dark:border-gray-700">
                  <td className="px-4 py-2">Wall Cavities</td>
                  <td className="px-4 py-2">13</td>
                  <td className="px-4 py-2">15–19</td>
                  <td className="px-4 py-2">21</td>
                </tr>
                <tr className="border-b dark:border-gray-700">
                  <td className="px-4 py-2">Attics</td>
                  <td className="px-4 py-2">30–38</td>
                  <td className="px-4 py-2">38–49</td>
                  <td className="px-4 py-2">49–60</td>
                </tr>
                <tr className="border-b dark:border-gray-700">
                  <td className="px-4 py-2">Basements</td>
                  <td className="px-4 py-2">13</td>
                  <td className="px-4 py-2">15–19</td>
                  <td className="px-4 py-2">21</td>
                </tr>
                <tr>
                  <td className="px-4 py-2">Crawl Spaces</td>
                  <td className="px-4 py-2">19</td>
                  <td className="px-4 py-2">19–30</td>
                  <td className="px-4 py-2">30</td>
                </tr>
              </tbody>
            </table>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Insulation Types Comparison</h2>
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-green-50 dark:bg-green-950 border-b border-green-200 dark:border-green-800">
                  <th className="px-4 py-2 text-left font-semibold">Type</th>
                  <th className="px-4 py-2 text-left font-semibold">R-Value/inch</th>
                  <th className="px-4 py-2 text-left font-semibold">Cost/Sq Ft</th>
                  <th className="px-4 py-2 text-left font-semibold">Installation</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b dark:border-gray-700">
                  <td className="px-4 py-2 font-medium">Fiberglass Batts</td>
                  <td className="px-4 py-2">3.2–3.8</td>
                  <td className="px-4 py-2">$0.30–$0.60</td>
                  <td className="px-4 py-2">DIY</td>
                </tr>
                <tr className="border-b dark:border-gray-700">
                  <td className="px-4 py-2 font-medium">Cellulose (Blown)</td>
                  <td className="px-4 py-2">3.6–3.8</td>
                  <td className="px-4 py-2">$0.40–$0.70</td>
                  <td className="px-4 py-2">Professional</td>
                </tr>
                <tr className="border-b dark:border-gray-700">
                  <td className="px-4 py-2 font-medium">Spray Foam</td>
                  <td className="px-4 py-2">6–7</td>
                  <td className="px-4 py-2">$1.50–$2.50</td>
                  <td className="px-4 py-2">Professional</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium">Mineral Wool</td>
                  <td className="px-4 py-2">3.8–4.0</td>
                  <td className="px-4 py-2">$0.50–$0.80</td>
                  <td className="px-4 py-2">DIY</td>
                </tr>
              </tbody>
            </table>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">How to Use This Calculator</h2>
            <ol className="space-y-3 text-gray-700 dark:text-gray-300 list-decimal list-inside">
              <li>Enter the square footage of the area you&apos;re insulating</li>
              <li>Select the required R-value based on your climate zone and location (wall, attic, basement)</li>
              <li>Choose your insulation type (fiberglass, cellulose, spray foam, or mineral wool)</li>
              <li>Enter the average cost per square foot for your material</li>
              <li>The calculator will show units needed and total estimated cost</li>
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <div key={idx} className="border-l-4 border-blue-300 dark:border-blue-700 pl-4">
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
                { title: "AC Unit Size Calculator", slug: "ac-unit-calculator" },
                { title: "TDEE Calculator", slug: "tdee-calculator" },
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
