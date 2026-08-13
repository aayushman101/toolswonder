import type { Metadata } from "next";
import LumberCalculator from "@/components/tools/LumberCalculator";
import Breadcrumb from "@/components/layout/Breadcrumb";
import JsonLd, { buildToolSchema, buildFaqSchema, buildBreadcrumbSchema } from "@/components/seo/JsonLd";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

const BASE_URL = "https://toolswonder.com";
const TOOL_URL = `${BASE_URL}/tools/lumber-calculator`;

export const metadata: Metadata = {
  title: "Lumber Calculator – Board Feet Calculator for Decks, Framing & Fencing",
  description: "Free lumber calculator. Calculate board feet and cost for decks, framing, joists, and fencing. Supports various lumber sizes and spacing options.",
  keywords: [
    "lumber calculator",
    "board feet calculator",
    "deck lumber calculator",
    "framing lumber calculator",
    "lumber calculator for deck",
    "lumber calculator for framing",
    "lumber cost calculator",
    "how much lumber do I need calculator"
  ],
  alternates: { canonical: TOOL_URL },
  openGraph: {
    title: "Lumber Calculator – Board Feet Calculator for Decks, Framing & Fencing",
    description: "Calculate lumber and board feet needed for your construction project.",
    url: TOOL_URL,
    type: "website",
  },
};

const faqs = [
  {
    question: "How do I calculate board feet for a deck?",
    answer: "For a deck, measure the length and width in feet, then decide on joist/board spacing (typically 16 inches). Use the formula: (Number of boards × length × width in inches ÷ 12). For example, a 12×10 ft deck with 2×6 boards 16 inches apart needs roughly 120 board feet. This calculator does it automatically."
  },
  {
    question: "What&apos;s the difference between nominal and actual lumber sizes?",
    answer: "Nominal size is what lumber is sold as (2×4, 2×6, etc.). Actual size is smaller: a 2×4 is really 1.5×3.5 inches, a 2×6 is 1.5×5.5 inches. A 2×8 is 1.5×7.25 inches. Always use actual dimensions for accurate board foot calculations. This affects strength calculations and spacing."
  },
  {
    question: "How much spacing should I use for joists or studs?",
    answer: "Common spacing: 12 inches (tighter, more support). 16 inches (standard for residential). 24 inches (maximum for most applications). Closer spacing = more lumber needed but better support. Building codes specify minimum spacing based on joist size and load. Always check local codes for your project."
  },
  {
    question: "How do I calculate lumber for framing walls?",
    answer: "For wall framing: measure wall length in feet, assume 8 ft wall height. Studs are typically 2×4 or 2×6 spaced 16 inches apart. Calculate: (wall length ÷ 1.33) = number of studs. Multiply by stud length and board foot value. Include top and bottom plates. This calculator estimates the total for you."
  },
  {
    question: "What is the cost of lumber per board foot?",
    answer: "Lumber prices vary by type and market: Softwood 2×4/2×6: $1.00–$2.50/BF. Treated lumber: $1.50–$3.50/BF. Hardwood: $3.00–$8.00/BF. Prices fluctuate based on supply. Check local lumber yards for current pricing. This calculator lets you enter your regional prices for accurate estimates."
  },
  {
    question: "How do I calculate lumber needed for a fence?",
    answer: "Fence calculation: measure total length in feet, decide on picket spacing (typically 5–6 inches). A 6 ft fence section with 5 inch spacing needs about 14–15 pickets. For 100 ft of fence at 6 inch spacing: roughly 200 linear feet of 1×4 pickets = about 67 board feet. Add posts every 6 ft."
  },
];

export default function Page() {
  return (
    <>
      <JsonLd data={buildToolSchema({ name: "Lumber Calculator", description: "Calculate board feet and lumber quantity needed for decks, framing, joists, and fencing projects.", url: TOOL_URL, category: "Home & Construction" })} />
      <JsonLd data={buildFaqSchema(faqs)} />
      <JsonLd data={buildBreadcrumbSchema([{ name: "Home", url: BASE_URL }, { name: "Tools", url: `${BASE_URL}/tools` }, { name: "Lumber Calculator", url: TOOL_URL }])} />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: "Tools", href: "/tools" }, { label: "Lumber Calculator" }]} />
        <div className="flex items-center gap-3 mt-6 mb-2">
          <h1 className="text-3xl font-bold">Lumber Calculator</h1>
          <span className="px-3 py-1 bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300 rounded-full text-xs font-medium">Home & Construction</span>
        </div>
        <p className="text-gray-600 dark:text-gray-400 mb-6">Calculate board feet and lumber cost for decks, framing, joists, fencing, and other construction projects.</p>
        <LumberCalculator />

        <div className="grid lg:grid-cols-3 gap-8 mt-8">
          <div className="lg:col-span-2 space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-4">Lumber Sizing Guide</h2>
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-orange-50 dark:bg-orange-950 border-b border-orange-200 dark:border-orange-800">
                    <th className="px-4 py-2 text-left font-semibold">Nominal Size</th>
                    <th className="px-4 py-2 text-center font-semibold">Actual Size</th>
                    <th className="px-4 py-2 text-left font-semibold">Common Uses</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b dark:border-gray-700">
                    <td className="px-4 py-2 font-medium">2×4</td>
                    <td className="px-4 py-2 text-center">1.5″ × 3.5″</td>
                    <td className="px-4 py-2">Framing, studs, posts</td>
                  </tr>
                  <tr className="border-b dark:border-gray-700">
                    <td className="px-4 py-2 font-medium">2×6</td>
                    <td className="px-4 py-2 text-center">1.5″ × 5.5″</td>
                    <td className="px-4 py-2">Deck boards, joists</td>
                  </tr>
                  <tr className="border-b dark:border-gray-700">
                    <td className="px-4 py-2 font-medium">2×8</td>
                    <td className="px-4 py-2 text-center">1.5″ × 7.25″</td>
                    <td className="px-4 py-2">Floor/roof joists</td>
                  </tr>
                  <tr className="border-b dark:border-gray-700">
                    <td className="px-4 py-2 font-medium">2×10</td>
                    <td className="px-4 py-2 text-center">1.5″ × 9.25″</td>
                    <td className="px-4 py-2">Large spans, beams</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-medium">1×4 / 1×6</td>
                    <td className="px-4 py-2 text-center">0.75″ × 3.5/5.5″</td>
                    <td className="px-4 py-2">Pickets, trim, sheathing</td>
                  </tr>
                </tbody>
              </table>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Standard Lumber Spacing</h2>
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-blue-50 dark:bg-blue-950 border-b border-blue-200 dark:border-blue-800">
                    <th className="px-4 py-2 text-left font-semibold">Application</th>
                    <th className="px-4 py-2 text-center font-semibold">Typical Spacing</th>
                    <th className="px-4 py-2 text-left font-semibold">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b dark:border-gray-700">
                    <td className="px-4 py-2 font-medium">Wall Studs</td>
                    <td className="px-4 py-2 text-center">16″ on center</td>
                    <td className="px-4 py-2">Standard residential</td>
                  </tr>
                  <tr className="border-b dark:border-gray-700">
                    <td className="px-4 py-2 font-medium">Floor Joists</td>
                    <td className="px-4 py-2 text-center">16″ on center</td>
                    <td className="px-4 py-2">Typical residential spans</td>
                  </tr>
                  <tr className="border-b dark:border-gray-700">
                    <td className="px-4 py-2 font-medium">Roof Rafters</td>
                    <td className="px-4 py-2 text-center">16″ or 24″</td>
                    <td className="px-4 py-2">24″ if 2×8 or larger</td>
                  </tr>
                  <tr className="border-b dark:border-gray-700">
                    <td className="px-4 py-2 font-medium">Deck Boards</td>
                    <td className="px-4 py-2 text-center">16″ on center</td>
                    <td className="px-4 py-2">2×6 or 2×8 boards</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-medium">Fence Pickets</td>
                    <td className="px-4 py-2 text-center">4″–6″</td>
                    <td className="px-4 py-2">Varies by aesthetic</td>
                  </tr>
                </tbody>
              </table>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">How to Use This Calculator</h2>
              <ol className="space-y-3 text-gray-700 dark:text-gray-300 list-decimal list-inside">
                <li>Select your project type (deck, framing, joists, or fence)</li>
                <li>Enter length and width in feet</li>
                <li>Specify spacing (typically 12″, 16″, or 24″)</li>
                <li>Choose lumber size (2×4, 2×6, etc.)</li>
                <li>Enter current lumber cost per board foot</li>
                <li>Get instant board feet and cost estimate</li>
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
                  { title: "Wood Calculator", slug: "wood-calculator" },
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
