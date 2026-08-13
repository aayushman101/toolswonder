import type { Metadata } from "next";
import FurnaceBtuCalculator from "@/components/tools/FurnaceBtuCalculator";
import ShareButton from "@/components/tools/ShareButton";
import Breadcrumb from "@/components/layout/Breadcrumb";
import JsonLd, { buildToolSchema, buildFaqSchema, buildBreadcrumbSchema } from "@/components/seo/JsonLd";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

const BASE_URL = "https://toolswonder.com";
const TOOL_URL = `${BASE_URL}/tools/furnace-btu-calculator`;

export const metadata: Metadata = {
  title: "Furnace BTU Calculator – What Size Furnace Do I Need?",
  description: "Free furnace BTU calculator. Calculate the heating capacity needed for your home based on square footage, climate zone, and insulation level. Find your ideal furnace size.",
  keywords: [
    "furnace btu calculator",
    "furnace size calculator",
    "what size furnace do I need",
    "heating btu calculator",
    "furnace btu for square feet",
    "gas furnace calculator",
    "heating capacity calculator"
  ],
  alternates: { canonical: TOOL_URL },
  openGraph: {
    title: "Furnace BTU Calculator – What Size Furnace Do I Need?",
    description: "Calculate the correct furnace BTU and size for your home based on climate and insulation.",
    url: TOOL_URL,
    type: "website",
  },
};

const faqs = [
  {
    question: "What BTU do I need for my home?",
    answer: "BTU requirement depends on square footage, climate zone, and insulation. General guidelines: Mild climates need 25 BTU/sq ft, moderate climates need 35 BTU/sq ft, cold climates need 45 BTU/sq ft, and very cold climates need 60 BTU/sq ft. Multiply your square footage by the climate factor, then adjust for insulation. This calculator does it automatically."
  },
  {
    question: "How does insulation affect furnace size?",
    answer: "Good insulation means less heat escapes, so you need a smaller furnace. Poor insulation means more heat loss, requiring a larger furnace. A well-insulated home can reduce BTU requirements by 15-30%. Excellent insulation (new construction, sealed) can reduce by up to 30%. This calculator adjusts for insulation level."
  },
  {
    question: "What&apos;s the difference between input BTU and output BTU?",
    answer: "Input BTU is the fuel burned (gas input). Output BTU is the heating delivered to your home (actual heat). Modern furnaces are 80-95% efficient, so a 100,000 BTU input furnace delivers 80,000-95,000 BTU of heat. Always size based on heating requirement (output needed), and the furnace&apos;s efficiency determines input BTU rating."
  },
  {
    question: "What climate zone am I in?",
    answer: "Mild: Southern US (South Carolina, Georgia, Florida, Texas, Arizona). Moderate: Mid-Atlantic and Midwest (New York, Pennsylvania, Ohio, Illinois). Cold: Upper Midwest and Northeast (Minnesota, Wisconsin, Maine, Vermont). Very Cold: Northern climates and mountains (Alaska, Montana, high elevations). Check your state and typical winter temperatures."
  },
  {
    question: "Can I use an oversized furnace?",
    answer: "An oversized furnace (too much BTU) cycles on and off frequently, reducing efficiency and lifespan. It also creates temperature swings and wastes energy. Undersized furnaces can&apos;t meet heating needs on cold days. The best practice is to size furnaces within 10-15% of your actual heating requirement."
  },
  {
    question: "How often should I replace my furnace?",
    answer: "Furnaces typically last 15-20 years with proper maintenance. Annual inspections extend lifespan. Signs it&apos;s time to replace: constant repairs, uneven heating, rising energy bills, furnace older than 15 years, or strange noises. A new, properly-sized furnace improves efficiency by 15-20% compared to older units."
  },
];

export default function Page() {
  return (
    <>
      <JsonLd data={buildToolSchema({ name: "Furnace BTU Calculator", description: "Calculate the furnace size and BTU needed for your home based on climate zone and insulation.", url: TOOL_URL, category: "Home & HVAC" })} />
      <JsonLd data={buildFaqSchema(faqs)} />
      <JsonLd data={buildBreadcrumbSchema([{ name: "Home", url: BASE_URL }, { name: "Tools", url: `${BASE_URL}/tools` }, { name: "Furnace BTU Calculator", url: TOOL_URL }])} />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: "Tools", href: "/tools" }, { label: "Furnace BTU Calculator" }]} />
        <div className="flex items-center gap-3 mt-6 mb-2">
          <h1 className="text-3xl font-bold">Furnace BTU Calculator</h1>
          <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-xs font-medium">Home & HVAC</span>
        </div>
        <p className="text-gray-600 dark:text-gray-400 mb-6">Calculate the furnace size and heating capacity needed for your home based on square footage, climate zone, and insulation level.</p>

        {/* Table of Contents */}
        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-6">
          <h3 className="font-semibold mb-3 text-gray-900 dark:text-gray-100">On this page:</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#calculator" className="text-blue-600 dark:text-blue-400 hover:underline">Calculator</a></li>
            <li><a href="#what-are-btus" className="text-blue-600 dark:text-blue-400 hover:underline">What Are BTUs</a></li>
            <li><a href="#climate-zones" className="text-blue-600 dark:text-blue-400 hover:underline">Climate Zones Guide</a></li>
            <li><a href="#how-it-works" className="text-blue-600 dark:text-blue-400 hover:underline">How It Works</a></li>
            <li><a href="#faqs" className="text-blue-600 dark:text-blue-400 hover:underline">Frequently Asked Questions</a></li>
          </ul>
        </div>

        <div id="calculator" className="scroll-mt-8">
          <FurnaceBtuCalculator />
        </div>

        {/* Author Attribution */}
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-4">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400"><span className="font-medium">Created by:</span> ToolsWonder Team</p>
              <p className="text-sm text-gray-600 dark:text-gray-400"><span className="font-medium">Last Updated:</span> {new Date().toLocaleDateString()}</p>
            </div>
            <div className="flex gap-2 ml-auto">
              <ShareButton title="Furnace BTU Calculator" url={TOOL_URL} />
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mt-8">
          <div className="lg:col-span-2 space-y-8">
            {/* What Are BTUs Section */}
            <section id="what-are-btus" className="scroll-mt-8">
              <h2 className="text-2xl font-bold mb-4">What Are BTUs?</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">A BTU (British Thermal Unit) is the amount of heat energy required to raise the temperature of one pound of water by one degree Fahrenheit. In the context of heating systems, it measures the heating output of a furnace. The higher the BTU rating, the more heat the furnace can produce.</p>
              <p className="text-gray-700 dark:text-gray-300">For homes, furnaces typically range from 40,000 to 120,000+ BTU/hr. Choosing the right size is critical: an oversized furnace wastes energy and money, while an undersized one won&apos;t heat your home adequately.</p>
            </section>

            {/* Climate Zones Guide */}
            <section id="climate-zones" className="scroll-mt-8">
              <h2 className="text-2xl font-bold mb-4">Climate Zones Guide</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">The amount of BTU needed varies significantly by your region&apos;s climate. Colder climates require higher BTU outputs to maintain comfortable temperatures.</p>
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-blue-50 dark:bg-blue-950 border-b border-blue-200 dark:border-blue-800">
                    <th className="px-4 py-2 text-left font-semibold">Zone</th>
                    <th className="px-4 py-2 text-center font-semibold">BTU/Sq Ft</th>
                    <th className="px-4 py-2 text-left font-semibold">Climate Type</th>
                    <th className="px-4 py-2 text-left font-semibold">Regions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b dark:border-gray-700">
                    <td className="px-4 py-2 font-medium">Zone 1</td>
                    <td className="px-4 py-2 text-center">25</td>
                    <td className="px-4 py-2">Mild (Hot)</td>
                    <td className="px-4 py-2">South, Southwest</td>
                  </tr>
                  <tr className="border-b dark:border-gray-700">
                    <td className="px-4 py-2 font-medium">Zone 2</td>
                    <td className="px-4 py-2 text-center">35</td>
                    <td className="px-4 py-2">Moderate</td>
                    <td className="px-4 py-2">Mid-Atlantic, Midwest</td>
                  </tr>
                  <tr className="border-b dark:border-gray-700">
                    <td className="px-4 py-2 font-medium">Zone 3</td>
                    <td className="px-4 py-2 text-center">45</td>
                    <td className="px-4 py-2">Cold</td>
                    <td className="px-4 py-2">Northeast, Upper Midwest</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-medium">Zone 4</td>
                    <td className="px-4 py-2 text-center">60</td>
                    <td className="px-4 py-2">Very Cold</td>
                    <td className="px-4 py-2">Northern areas, mountains</td>
                  </tr>
                </tbody>
              </table>
            </section>

            {/* How It Works */}
            <section id="how-it-works" className="scroll-mt-8">
              <h2 className="text-2xl font-bold mb-4">How We Calculate Furnace Size</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">Step 1: Base Calculation</h3>
                  <p className="text-gray-700 dark:text-gray-300">We start with your square footage and multiply it by the climate zone factor (25-60 BTU per square foot). This gives us your baseline heating requirement.</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">Step 2: Insulation Adjustment</h3>
                  <p className="text-gray-700 dark:text-gray-300">Home insulation significantly affects heating needs. Well-insulated homes lose less heat and need less BTU output. We adjust your requirement up to 30% based on insulation quality.</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">Step 3: Standard Sizing</h3>
                  <p className="text-gray-700 dark:text-gray-300">Furnaces come in standard sizes (40K, 60K, 80K, 100K, 120K BTU). We round your calculated requirement to the nearest standard size for accurate recommendations.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">BTU Requirements by Climate Zone</h2>
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-blue-50 dark:bg-blue-950 border-b border-blue-200 dark:border-blue-800">
                    <th className="px-4 py-2 text-left font-semibold">Climate Zone</th>
                    <th className="px-4 py-2 text-center font-semibold">BTU/Sq Ft</th>
                    <th className="px-4 py-2 text-left font-semibold">Typical Regions</th>
                    <th className="px-4 py-2 text-left font-semibold">Example: 1,500 Sq Ft</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b dark:border-gray-700">
                    <td className="px-4 py-2 font-medium">Mild</td>
                    <td className="px-4 py-2 text-center">25</td>
                    <td className="px-4 py-2">South, Southwest (warm winters)</td>
                    <td className="px-4 py-2">37,500 BTU</td>
                  </tr>
                  <tr className="border-b dark:border-gray-700">
                    <td className="px-4 py-2 font-medium">Moderate</td>
                    <td className="px-4 py-2 text-center">35</td>
                    <td className="px-4 py-2">Mid-Atlantic, Midwest (standard)</td>
                    <td className="px-4 py-2">52,500 BTU</td>
                  </tr>
                  <tr className="border-b dark:border-gray-700">
                    <td className="px-4 py-2 font-medium">Cold</td>
                    <td className="px-4 py-2 text-center">45</td>
                    <td className="px-4 py-2">Northeast, Upper Midwest</td>
                    <td className="px-4 py-2">67,500 BTU</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-medium">Very Cold</td>
                    <td className="px-4 py-2 text-center">60</td>
                    <td className="px-4 py-2">Northern areas, mountains, far north</td>
                    <td className="px-4 py-2">90,000 BTU</td>
                  </tr>
                </tbody>
              </table>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Standard Furnace Sizes</h2>
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-green-50 dark:bg-green-950 border-b border-green-200 dark:border-green-800">
                    <th className="px-4 py-2 text-center font-semibold">BTU Output</th>
                    <th className="px-4 py-2 text-center font-semibold">Approx. Sq Ft (Moderate)</th>
                    <th className="px-4 py-2 text-left font-semibold">Home Type</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b dark:border-gray-700">
                    <td className="px-4 py-2 text-center font-medium">40,000</td>
                    <td className="px-4 py-2 text-center">1,000–1,200</td>
                    <td className="px-4 py-2">Small apartment, condo</td>
                  </tr>
                  <tr className="border-b dark:border-gray-700">
                    <td className="px-4 py-2 text-center font-medium">60,000</td>
                    <td className="px-4 py-2 text-center">1,500–1,800</td>
                    <td className="px-4 py-2">Small home, townhouse</td>
                  </tr>
                  <tr className="border-b dark:border-gray-700">
                    <td className="px-4 py-2 text-center font-medium">80,000</td>
                    <td className="px-4 py-2 text-center">2,000–2,400</td>
                    <td className="px-4 py-2">Average home</td>
                  </tr>
                  <tr className="border-b dark:border-gray-700">
                    <td className="px-4 py-2 text-center font-medium">100,000</td>
                    <td className="px-4 py-2 text-center">2,500–3,000</td>
                    <td className="px-4 py-2">Large home</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 text-center font-medium">120,000+</td>
                    <td className="px-4 py-2 text-center">3,000+</td>
                    <td className="px-4 py-2">Very large home, multi-zone</td>
                  </tr>
                </tbody>
              </table>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Furnace Efficiency & Sizing</h2>
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-orange-50 dark:bg-orange-950 border-b border-orange-200 dark:border-orange-800">
                    <th className="px-4 py-2 text-left font-semibold">Furnace Type</th>
                    <th className="px-4 py-2 text-center font-semibold">Efficiency (AFUE)</th>
                    <th className="px-4 py-2 text-left font-semibold">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b dark:border-gray-700">
                    <td className="px-4 py-2 font-medium">Standard (old)</td>
                    <td className="px-4 py-2 text-center">65–75%</td>
                    <td className="px-4 py-2">Outdated, high energy bills</td>
                  </tr>
                  <tr className="border-b dark:border-gray-700">
                    <td className="px-4 py-2 font-medium">Mid-Efficiency</td>
                    <td className="px-4 py-2 text-center">80–85%</td>
                    <td className="px-4 py-2">Common replacement choice</td>
                  </tr>
                  <tr className="border-b dark:border-gray-700">
                    <td className="px-4 py-2 font-medium">High-Efficiency</td>
                    <td className="px-4 py-2 text-center">90–95%</td>
                    <td className="px-4 py-2">Premium, lowest operating costs</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-medium">Variable-Speed</td>
                    <td className="px-4 py-2 text-center">95%+</td>
                    <td className="px-4 py-2">Most efficient, smart control</td>
                  </tr>
                </tbody>
              </table>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">How to Use This Calculator</h2>
              <ol className="space-y-3 text-gray-700 dark:text-gray-300 list-decimal list-inside">
                <li>Enter your home&apos;s total heated square footage</li>
                <li>Select your climate zone (based on your region&apos;s winters)</li>
                <li>Choose your insulation level (assess your home&apos;s condition)</li>
                <li>Get your calculated BTU requirement and recommended furnace size</li>
                <li>Consult with a professional HVAC technician for final sizing</li>
              </ol>
            </section>

            <section id="faqs" className="scroll-mt-8">
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
                  { title: "Insulation Calculator", slug: "insulation-calculator" },
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
