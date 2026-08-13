import type { Metadata } from "next";
import DuctworkCalculator from "@/components/tools/DuctworkCalculator";
import ShareButton from "@/components/tools/ShareButton";
import Breadcrumb from "@/components/layout/Breadcrumb";
import JsonLd, { buildToolSchema, buildFaqSchema, buildBreadcrumbSchema } from "@/components/seo/JsonLd";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

const BASE_URL = "https://toolswonder.com";
const TOOL_URL = `${BASE_URL}/tools/ductwork-calculator`;

export const metadata: Metadata = {
  title: "Ductwork Calculator – Calculate Duct Size & Airflow (CFM)",
  description: "Free HVAC ductwork calculator. Calculate duct diameter, size, and CFM airflow for round and rectangular ducts. Get duct sizing for residential and commercial HVAC systems.",
  keywords: [
    "ductwork calculator",
    "duct size calculator",
    "cfm calculator",
    "hvac ductwork calculator",
    "duct diameter calculator",
    "rectangular duct calculator",
    "ductwork sizing"
  ],
  alternates: { canonical: TOOL_URL },
  openGraph: {
    title: "Ductwork Calculator – Calculate Duct Size & Airflow (CFM)",
    description: "Calculate HVAC duct sizing based on CFM and velocity. Supports round and rectangular ducts with friction loss calculations.",
    url: TOOL_URL,
    type: "website",
  },
};

const faqs = [
  {
    question: "What is CFM in HVAC?",
    answer: "CFM stands for Cubic Feet per Minute. It measures the volume of air flowing through your ductwork. Typical residential HVAC systems handle 400-1,200 CFM depending on home size and climate. Higher CFM means more cooling/heating capacity."
  },
  {
    question: "What's the difference between round and rectangular ductwork?",
    answer: "Round ducts are more efficient, require less material, and have lower friction loss. Rectangular ducts are easier to fit in walls and ceilings, making them common in residential construction. For the same CFM, rectangular ducts are typically taller and narrower."
  },
  {
    question: "What velocity should I use?",
    answer: "Residential systems typically use 600-800 FPM (feet per minute) to minimize noise. Commercial systems may use 1,000-1,200 FPM for compact ductwork. Higher velocity increases friction loss and noise. Lower velocity requires larger ducts but operates quieter."
  },
  {
    question: "What is friction loss in ductwork?",
    answer: "Friction loss is the pressure drop as air moves through ducts. Measured in inches of water column per 100 feet of duct. Higher friction loss requires a more powerful fan to maintain airflow. Smooth, larger ducts reduce friction loss. This calculator provides an approximation."
  },
  {
    question: "How do I calculate duct size for my HVAC system?",
    answer: "Divide your system's CFM by the desired velocity and multiply by 144 to get cross-sectional area in square inches. For round ducts, convert area to diameter. For rectangular, calculate width and height. Our calculator does this automatically—just enter CFM and velocity."
  },
  {
    question: "What are standard ductwork sizes?",
    answer: "Common round duct diameters: 4&quot;, 5&quot;, 6&quot;, 7&quot;, 8&quot;, 10&quot;, 12&quot;, 14&quot;, 16&quot;. Rectangular ducts come in widths/heights like 3×4&quot;, 4×8&quot;, 6×8&quot;, 8×10&quot;. Always round up to the nearest standard size for proper airflow."
  },
];

export default function Page() {
  return (
    <>
      <JsonLd data={buildToolSchema({ name: "Ductwork Calculator", description: "Calculate HVAC duct size and airflow based on CFM and velocity.", url: TOOL_URL, category: "HVAC & Climate" })} />
      <JsonLd data={buildFaqSchema(faqs)} />
      <JsonLd data={buildBreadcrumbSchema([{ name: "Home", url: BASE_URL }, { name: "Tools", url: `${BASE_URL}/tools` }, { name: "Ductwork Calculator", url: TOOL_URL }])} />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: "Tools", href: "/tools" }, { label: "Ductwork Calculator" }]} />
        <div className="flex items-center gap-3 mt-6 mb-2">
          <h1 className="text-3xl font-bold">Ductwork Calculator</h1>
          <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-xs font-medium">HVAC & Climate</span>
        </div>
        <p className="text-gray-600 dark:text-gray-400 mb-6">Calculate HVAC duct size, diameter, and airflow (CFM) for round and rectangular ductwork. Get friction loss estimates and proper duct sizing for your system.</p>

        {/* Table of Contents */}
        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-6">
          <h3 className="font-semibold mb-3 text-gray-900 dark:text-gray-100">On this page:</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#calculator" className="text-blue-600 dark:text-blue-400 hover:underline">Calculator</a></li>
            <li><a href="#what-is-cfm" className="text-blue-600 dark:text-blue-400 hover:underline">What is CFM?</a></li>
            <li><a href="#duct-sizing" className="text-blue-600 dark:text-blue-400 hover:underline">Duct Sizing Guide</a></li>
            <li><a href="#how-it-works" className="text-blue-600 dark:text-blue-400 hover:underline">How It Works</a></li>
            <li><a href="#faqs" className="text-blue-600 dark:text-blue-400 hover:underline">Frequently Asked Questions</a></li>
          </ul>
        </div>

        <div id="calculator" className="scroll-mt-8">
          <DuctworkCalculator />
        </div>

        {/* Author Attribution */}
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-4">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400"><span className="font-medium">Created by:</span> ToolsWonder Team</p>
              <p className="text-sm text-gray-600 dark:text-gray-400"><span className="font-medium">Last Updated:</span> {new Date().toLocaleDateString()}</p>
            </div>
            <div className="flex gap-2 ml-auto">
              <ShareButton title="Ductwork Calculator" url={TOOL_URL} />
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mt-8">
          <div className="lg:col-span-2 space-y-8">
            {/* What is CFM */}
            <section id="what-is-cfm" className="scroll-mt-8">
              <h2 className="text-2xl font-bold mb-4">What is CFM?</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">CFM (Cubic Feet per Minute) measures the volume of air that flows through your HVAC system. It&apos;s the primary metric for sizing ducts, fans, and air handlers. Higher CFM means more air circulation for larger spaces or more aggressive heating/cooling.</p>
              <p className="text-gray-700 dark:text-gray-300">A typical residential home requires 300-1,200 CFM depending on square footage and climate. Commercial HVAC systems can handle 5,000+ CFM. Proper ductwork sizing ensures your system delivers the designed CFM without excessive noise or energy loss.</p>
            </section>

            {/* Duct Sizing Guide */}
            <section id="duct-sizing" className="scroll-mt-8">
              <h2 className="text-2xl font-bold mb-4">Duct Sizing Guide</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">Undersized ducts restrict airflow and reduce system efficiency. Oversized ducts waste space and money. The right size balances airflow velocity, noise, and system performance.</p>
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-blue-50 dark:bg-blue-950 border-b border-blue-200 dark:border-blue-800">
                    <th className="px-4 py-2 text-left font-semibold">Velocity (FPM)</th>
                    <th className="px-4 py-2 text-left font-semibold">Application</th>
                    <th className="px-4 py-2 text-left font-semibold">Noise Level</th>
                    <th className="px-4 py-2 text-left font-semibold">Duct Size</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b dark:border-gray-700">
                    <td className="px-4 py-2 font-medium">600 FPM</td>
                    <td className="px-4 py-2">Quiet residential (bedrooms, libraries)</td>
                    <td className="px-4 py-2">Very Low</td>
                    <td className="px-4 py-2">Larger</td>
                  </tr>
                  <tr className="border-b dark:border-gray-700">
                    <td className="px-4 py-2 font-medium">800 FPM</td>
                    <td className="px-4 py-2">Standard residential (common spaces)</td>
                    <td className="px-4 py-2">Low</td>
                    <td className="px-4 py-2">Standard</td>
                  </tr>
                  <tr className="border-b dark:border-gray-700">
                    <td className="px-4 py-2 font-medium">1,000 FPM</td>
                    <td className="px-4 py-2">Commercial / High-capacity systems</td>
                    <td className="px-4 py-2">Medium</td>
                    <td className="px-4 py-2">Compact</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-medium">1,200+ FPM</td>
                    <td className="px-4 py-2">High-velocity systems (tight spaces)</td>
                    <td className="px-4 py-2">High</td>
                    <td className="px-4 py-2">Very Compact</td>
                  </tr>
                </tbody>
              </table>
            </section>

            {/* How It Works */}
            <section id="how-it-works" className="scroll-mt-8">
              <h2 className="text-2xl font-bold mb-4">How We Calculate Duct Size</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">Step 1: Calculate Required Area</h3>
                  <p className="text-gray-700 dark:text-gray-300">We divide CFM by velocity (FPM) to get the cross-sectional area needed. Formula: Area (sq in) = (CFM ÷ Velocity) × 144</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">Step 2: Convert to Duct Diameter/Size</h3>
                  <p className="text-gray-700 dark:text-gray-300">For round ducts, we use the area to calculate diameter. For rectangular, we calculate width and height. You then round to the nearest standard size (4&quot;, 5&quot;, 6&quot;, 8&quot;, etc.)</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">Step 3: Estimate Friction Loss</h3>
                  <p className="text-gray-700 dark:text-gray-300">Friction loss represents pressure drop in the duct. Higher velocity and smaller ducts increase friction loss. Rougher ducts (fiberglass) have more loss than smooth metal ducts.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Standard Ductwork Sizes</h2>
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-green-50 dark:bg-green-950 border-b border-green-200 dark:border-green-800">
                    <th className="px-4 py-2 text-left font-semibold">Round Duct Diameter</th>
                    <th className="px-4 py-2 text-center font-semibold">Area (sq in)</th>
                    <th className="px-4 py-2 text-left font-semibold">Typical Use</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b dark:border-gray-700">
                    <td className="px-4 py-2 font-medium">4&quot;</td>
                    <td className="px-4 py-2 text-center">12.6</td>
                    <td className="px-4 py-2">Small supply branches</td>
                  </tr>
                  <tr className="border-b dark:border-gray-700">
                    <td className="px-4 py-2 font-medium">6&quot;</td>
                    <td className="px-4 py-2 text-center">28.3</td>
                    <td className="px-4 py-2">Main supply ducts</td>
                  </tr>
                  <tr className="border-b dark:border-gray-700">
                    <td className="px-4 py-2 font-medium">8&quot;</td>
                    <td className="px-4 py-2 text-center">50.3</td>
                    <td className="px-4 py-2">Medium systems</td>
                  </tr>
                  <tr className="border-b dark:border-gray-700">
                    <td className="px-4 py-2 font-medium">10&quot;</td>
                    <td className="px-4 py-2 text-center">78.5</td>
                    <td className="px-4 py-2">Large residential</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-medium">12&quot;</td>
                    <td className="px-4 py-2 text-center">113</td>
                    <td className="px-4 py-2">Commercial systems</td>
                  </tr>
                </tbody>
              </table>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Duct Material Comparison</h2>
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-orange-50 dark:bg-orange-950 border-b border-orange-200 dark:border-orange-800">
                    <th className="px-4 py-2 text-left font-semibold">Material</th>
                    <th className="px-4 py-2 text-left font-semibold">Durability</th>
                    <th className="px-4 py-2 text-left font-semibold">Friction Loss</th>
                    <th className="px-4 py-2 text-left font-semibold">Cost</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b dark:border-gray-700">
                    <td className="px-4 py-2 font-medium">Galvanized Steel</td>
                    <td className="px-4 py-2">Excellent</td>
                    <td className="px-4 py-2">Low (smooth)</td>
                    <td className="px-4 py-2">Medium</td>
                  </tr>
                  <tr className="border-b dark:border-gray-700">
                    <td className="px-4 py-2 font-medium">Fiberglass Lined</td>
                    <td className="px-4 py-2">Good</td>
                    <td className="px-4 py-2">Medium (rough)</td>
                    <td className="px-4 py-2">Low</td>
                  </tr>
                  <tr className="border-b dark:border-gray-700">
                    <td className="px-4 py-2 font-medium">Aluminum</td>
                    <td className="px-4 py-2">Good</td>
                    <td className="px-4 py-2">Low (smooth)</td>
                    <td className="px-4 py-2">High</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-medium">Flex Duct</td>
                    <td className="px-4 py-2">Fair</td>
                    <td className="px-4 py-2">High (wrinkled)</td>
                    <td className="px-4 py-2">Low</td>
                  </tr>
                </tbody>
              </table>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">How to Use This Calculator</h2>
              <ol className="space-y-3 text-gray-700 dark:text-gray-300 list-decimal list-inside">
                <li>Enter your HVAC system&apos;s CFM (find this on your system specs)</li>
                <li>Choose desired velocity (800 FPM typical for quiet residential)</li>
                <li>Select duct type (round or rectangular)</li>
                <li>Get recommended duct size and friction loss estimate</li>
                <li>Round up to the nearest standard duct size available</li>
                <li>Consult an HVAC professional for final design and installation</li>
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
                  { title: "Furnace BTU Calculator", slug: "furnace-btu-calculator" },
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
