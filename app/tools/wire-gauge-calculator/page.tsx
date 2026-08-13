import type { Metadata } from "next";
import WireGaugeCalculator from "@/components/tools/WireGaugeCalculator";
import ShareButton from "@/components/tools/ShareButton";
import Breadcrumb from "@/components/layout/Breadcrumb";
import JsonLd, { buildToolSchema, buildFaqSchema, buildBreadcrumbSchema } from "@/components/seo/JsonLd";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

const BASE_URL = "https://toolswonder.com";
const TOOL_URL = `${BASE_URL}/tools/wire-gauge-calculator`;

export const metadata: Metadata = {
  title: "Wire Gauge Calculator – AWG Wire Size for Amps & Voltage",
  description: "Free wire gauge calculator. Calculate the correct AWG wire size for DC and AC circuits. Get recommended wire gauge for 12V, 24V, 120V, 240V systems based on current and distance.",
  keywords: [
    "wire gauge calculator",
    "awg calculator",
    "wire size calculator",
    "12v wire gauge calculator",
    "electrical wire gauge calculator",
    "speaker wire gauge calculator",
    "wire gauge for amps"
  ],
  alternates: { canonical: TOOL_URL },
  openGraph: {
    title: "Wire Gauge Calculator – AWG Wire Size for Amps & Voltage",
    description: "Calculate proper wire gauge (AWG) based on current, voltage, and distance. Supports 12V, 24V, 120V, 240V systems.",
    url: TOOL_URL,
    type: "website",
  },
};

const faqs = [
  {
    question: "What is AWG wire gauge?",
    answer: "AWG (American Wire Gauge) is a standard sizing system for electrical wires in North America. Lower numbers = thicker wires with lower resistance. Common sizes: 14 AWG (thin household), 10 AWG (heavy-duty circuits), 2 AWG (high current). Thicker wires carry more current with less voltage drop."
  },
  {
    question: "Why does wire gauge matter?",
    answer: "Using undersized wire causes excessive voltage drop, heat, and potential fire hazard. Oversized wire wastes money and space. Correct sizing ensures safe operation, efficiency, and meets electrical code. For DC systems (solar, auto), proper sizing is critical to maintain voltage at the load."
  },
  {
    question: "What's voltage drop and why is it important?",
    answer: "Voltage drop is the reduction in voltage from source to load due to wire resistance. A 12V system with 2V drop delivers only 10V to the device. For sensitive electronics, voltage drop causes poor performance or failure. Standard acceptable drop: 2-3% for branch circuits, 5% maximum for combined runs."
  },
  {
    question: "How do I choose between 12V, 24V, and 48V for solar/DC systems?",
    answer: "Higher voltage reduces current for the same power, allowing smaller wires over long distances. 12V: simple, cheap, short distances (<50 ft). 24V: moderate distances (50-200 ft). 48V: long distances (200+ ft). Trade-off: higher voltage requires different equipment."
  },
  {
    question: "What&apos;s the difference between copper and aluminum wire?",
    answer: "Copper is the standard: better conductivity, more reliable, lasts longer. Aluminum: cheaper but about 1.6x less conductive—requires 2-3 sizes larger (more expensive overall). Aluminum is used mainly in large commercial/utility applications. For most projects, copper is recommended."
  },
  {
    question: "Do I need to account for temperature?",
    answer: "Yes, wire ampacity decreases in high temperatures. If installing in hot environments (attics, direct sun), reduce ampacity by 10-20%. This calculator assumes standard 20°C (68°F). For critical installations, consult NEC (National Electrical Code) ampacity tables for temperature derating."
  },
];

export default function Page() {
  return (
    <>
      <JsonLd data={buildToolSchema({ name: "Wire Gauge Calculator", description: "Calculate AWG wire size for electrical circuits based on current, voltage, and distance.", url: TOOL_URL, category: "Electrical" })} />
      <JsonLd data={buildFaqSchema(faqs)} />
      <JsonLd data={buildBreadcrumbSchema([{ name: "Home", url: BASE_URL }, { name: "Tools", url: `${BASE_URL}/tools` }, { name: "Wire Gauge Calculator", url: TOOL_URL }])} />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: "Tools", href: "/tools" }, { label: "Wire Gauge Calculator" }]} />
        <div className="flex items-center gap-3 mt-6 mb-2">
          <h1 className="text-3xl font-bold">Wire Gauge Calculator</h1>
          <span className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300 rounded-full text-xs font-medium">Electrical</span>
        </div>
        <p className="text-gray-600 dark:text-gray-400 mb-6">Calculate the correct AWG wire gauge for your electrical circuit. Based on current (amps), voltage, and distance. Supports 12V, 24V, 120V, 240V and more.</p>

        {/* Table of Contents */}
        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-6">
          <h3 className="font-semibold mb-3 text-gray-900 dark:text-gray-100">On this page:</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#calculator" className="text-blue-600 dark:text-blue-400 hover:underline">Calculator</a></li>
            <li><a href="#what-is-awg" className="text-blue-600 dark:text-blue-400 hover:underline">What is AWG?</a></li>
            <li><a href="#wire-reference" className="text-blue-600 dark:text-blue-400 hover:underline">Wire Reference</a></li>
            <li><a href="#how-it-works" className="text-blue-600 dark:text-blue-400 hover:underline">How It Works</a></li>
            <li><a href="#faqs" className="text-blue-600 dark:text-blue-400 hover:underline">Frequently Asked Questions</a></li>
          </ul>
        </div>

        <div id="calculator" className="scroll-mt-8">
          <WireGaugeCalculator />
        </div>

        {/* Author Attribution */}
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-4">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400"><span className="font-medium">Created by:</span> ToolsWonder Team</p>
              <p className="text-sm text-gray-600 dark:text-gray-400"><span className="font-medium">Last Updated:</span> {new Date().toLocaleDateString()}</p>
            </div>
            <div className="flex gap-2 ml-auto">
              <ShareButton title="Wire Gauge Calculator" url={TOOL_URL} />
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mt-8">
          <div className="lg:col-span-2 space-y-8">
            {/* What is AWG */}
            <section id="what-is-awg" className="scroll-mt-8">
              <h2 className="text-2xl font-bold mb-4">What is AWG (American Wire Gauge)?</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">AWG is the standard wire sizing system used in North America for electrical conductors. The scale is inverse: lower numbers = thicker wire. A 2 AWG wire is much thicker than 14 AWG. Each step down reduces diameter and increases resistance.</p>
              <p className="text-gray-700 dark:text-gray-300 mb-4">Wire gauge affects how much current it can safely carry and how much voltage is lost over distance. Selecting the correct gauge is critical for safety, efficiency, and code compliance. Undersized wire overheats and creates fire hazard; oversized wire wastes money.</p>
            </section>

            {/* Wire Reference */}
            <section id="wire-reference" className="scroll-mt-8">
              <h2 className="text-2xl font-bold mb-4">Common Wire Gauges & Ampacity</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">Below are common copper wire gauges with their standard ampacity (safe current carrying capacity) at 60°C and 75°C. These are general guidelines; always consult NEC for your specific installation.</p>
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-yellow-50 dark:bg-yellow-950 border-b border-yellow-200 dark:border-yellow-800">
                    <th className="px-4 py-2 text-left font-semibold">AWG</th>
                    <th className="px-4 py-2 text-center font-semibold">Diameter (mm)</th>
                    <th className="px-4 py-2 text-center font-semibold">Ampacity @ 75°C</th>
                    <th className="px-4 py-2 text-left font-semibold">Common Use</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b dark:border-gray-700">
                    <td className="px-4 py-2 font-medium">14</td>
                    <td className="px-4 py-2 text-center">1.6</td>
                    <td className="px-4 py-2 text-center">15 A</td>
                    <td className="px-4 py-2">Household lighting, small devices</td>
                  </tr>
                  <tr className="border-b dark:border-gray-700">
                    <td className="px-4 py-2 font-medium">12</td>
                    <td className="px-4 py-2 text-center">2.1</td>
                    <td className="px-4 py-2 text-center">20 A</td>
                    <td className="px-4 py-2">Household circuits, kitchen outlets</td>
                  </tr>
                  <tr className="border-b dark:border-gray-700">
                    <td className="px-4 py-2 font-medium">10</td>
                    <td className="px-4 py-2 text-center">2.6</td>
                    <td className="px-4 py-2 text-center">30 A</td>
                    <td className="px-4 py-2">Dryer, water heater, heavy circuits</td>
                  </tr>
                  <tr className="border-b dark:border-gray-700">
                    <td className="px-4 py-2 font-medium">8</td>
                    <td className="px-4 py-2 text-center">3.3</td>
                    <td className="px-4 py-2 text-center">40 A</td>
                    <td className="px-4 py-2">Large appliances, main feeds</td>
                  </tr>
                  <tr className="border-b dark:border-gray-700">
                    <td className="px-4 py-2 font-medium">6</td>
                    <td className="px-4 py-2 text-center">4.1</td>
                    <td className="px-4 py-2 text-center">55 A</td>
                    <td className="px-4 py-2">Subpanels, high-current feeders</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-medium">4</td>
                    <td className="px-4 py-2 text-center">5.2</td>
                    <td className="px-4 py-2 text-center">70 A</td>
                    <td className="px-4 py-2">Service entrance, main panel</td>
                  </tr>
                </tbody>
              </table>
            </section>

            {/* How It Works */}
            <section id="how-it-works" className="scroll-mt-8">
              <h2 className="text-2xl font-bold mb-4">How Wire Gauge Calculation Works</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">Step 1: Determine Current & Distance</h3>
                  <p className="text-gray-700 dark:text-gray-300">Enter the circuit current (in amps) and the one-way distance from power source to load. The calculator doubles this for round-trip wire length (outgoing + return).</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">Step 2: Calculate Required Resistance</h3>
                  <p className="text-gray-700 dark:text-gray-300">Using Ohm&apos;s law and your allowed voltage drop, we calculate the resistance the wire can have without exceeding your voltage drop limit. Formula: R = V_drop / I</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">Step 3: Find Matching Wire Gauge</h3>
                  <p className="text-gray-700 dark:text-gray-300">We compare the required resistance against copper wire gauge resistance tables. We select the smallest gauge that meets your requirement while staying within safe ampacity limits.</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">Step 4: Verify Voltage Drop</h3>
                  <p className="text-gray-700 dark:text-gray-300">We calculate actual voltage drop with the recommended gauge and verify it stays within your specified limit. This ensures the device receives adequate voltage.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Wire Gauge by Application</h2>
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-blue-50 dark:bg-blue-950 border-b border-blue-200 dark:border-blue-800">
                    <th className="px-4 py-2 text-left font-semibold">Application</th>
                    <th className="px-4 py-2 text-left font-semibold">Voltage</th>
                    <th className="px-4 py-2 text-left font-semibold">Typical Gauge</th>
                    <th className="px-4 py-2 text-left font-semibold">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b dark:border-gray-700">
                    <td className="px-4 py-2 font-medium">Household Lighting</td>
                    <td className="px-4 py-2">120/240V AC</td>
                    <td className="px-4 py-2">14-12 AWG</td>
                    <td className="px-4 py-2">Short runs in walls, standard</td>
                  </tr>
                  <tr className="border-b dark:border-gray-700">
                    <td className="px-4 py-2 font-medium">Solar DC Array</td>
                    <td className="px-4 py-2">12-48V DC</td>
                    <td className="px-4 py-2">10-4 AWG</td>
                    <td className="px-4 py-2">Longer distances, voltage drop critical</td>
                  </tr>
                  <tr className="border-b dark:border-gray-700">
                    <td className="px-4 py-2 font-medium">Car Audio System</td>
                    <td className="px-4 py-2">12V DC</td>
                    <td className="px-4 py-2">8-4 AWG</td>
                    <td className="px-4 py-2">High current draws, short distances</td>
                  </tr>
                  <tr className="border-b dark:border-gray-700">
                    <td className="px-4 py-2 font-medium">Speaker Wiring</td>
                    <td className="px-4 py-2">Low Voltage</td>
                    <td className="px-4 py-2">16-12 AWG</td>
                    <td className="px-4 py-2">Lower current, impedance matching</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-medium">EV Charging</td>
                    <td className="px-4 py-2">240V AC</td>
                    <td className="px-4 py-2">6-2 AWG</td>
                    <td className="px-4 py-2">High current, code-compliant installation required</td>
                  </tr>
                </tbody>
              </table>
            </section>

            <section id="faqs" className="scroll-mt-8">
              <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {faqs.map((faq, idx) => (
                  <div key={idx} className="border-l-4 border-yellow-300 dark:border-yellow-700 pl-4">
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
                  { title: "Electrical Load Calculator", slug: "electrical-load-calculator" },
                  { title: "Ductwork Calculator", slug: "ductwork-calculator" },
                  { title: "AC Unit Size Calculator", slug: "ac-unit-calculator" },
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
