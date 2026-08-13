import type { Metadata } from "next";
import MulchCalculator from "@/components/tools/MulchCalculator";
import JsonLd, { buildToolSchema, buildFaqSchema, buildBreadcrumbSchema } from "@/components/seo/JsonLd";
import Breadcrumb from "@/components/layout/Breadcrumb";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

const BASE_URL = "https://toolswonder.com";
const TOOL_URL = `${BASE_URL}/tools/mulch-calculator`;

export const metadata: Metadata = {
  title: "Mulch Calculator – How Much Mulch Do I Need?",
  description: "Free mulch calculator to determine how many cubic yards, bags, and tons of mulch you need for landscaping. Supports bark, wood chips, compost, pine straw, and rubber mulch.",
  keywords: [
    "mulch calculator",
    "how much mulch do i need",
    "mulch calculator cubic yards",
    "mulch calculator bags",
    "landscape mulch calculator",
    "bark mulch calculator",
    "wood chips calculator",
    "topsoil calculator",
    "mulch cost calculator",
  ],
  alternates: { canonical: TOOL_URL },
  openGraph: {
    title: "Mulch Calculator – How Much Mulch Do I Need?",
    description: "Calculate mulch needed for landscaping projects by area, depth, and mulch type. Get instant cost and weight estimates.",
    url: TOOL_URL,
    type: "website",
  },
};

const faqs = [
  {
    question: "How much mulch do I need for my garden?",
    answer: "Calculate: Area (sq ft) × Depth (inches) ÷ 324 = cubic yards. Example: 100 sq ft garden × 3 inches deep ÷ 324 = 0.93 cubic yards. Most mulch bags are 2-3 cubic feet, so 1 cubic yard ≈ 10-13 bags. Our calculator automatically handles unit conversions and gives you both cubic yards and bag counts.",
  },
  {
    question: "How deep should I apply mulch?",
    answer: "Typical depths: 1-2 inches for refresher applications. 2-3 inches for new beds (standard recommendation). 3-4 inches for weed suppression. 4-6 inches for decorative/premium look. Avoid mounding against tree trunks (can cause rot). Mulch settles over time, so add 10-15% extra.",
  },
  {
    question: "What's the best mulch type for my garden?",
    answer: "Bark/wood chips: Most common, good color, lasts 2-3 years. Compost: Enriches soil, needs replacement annually. Pine straw: Lightweight, good for acid-loving plants (blueberries, azaleas). Rubber mulch: Long-lasting, best for playgrounds/landscaping. Cedar/hardwood: Premium, lasts longer, more expensive.",
  },
  {
    question: "When should I apply or refresh mulch?",
    answer: "Best time: Spring (April-May) before summer heat and after last frost. You can also apply in fall (August-September). Refresh annually if using organic mulch (breaks down). Rubber mulch lasts 8-10 years. Always remove old mulch before applying fresh (don't just layer).",
  },
  {
    question: "How much does mulch cost?",
    answer: "Bulk (by cubic yard): $20-$50 per yard. Bagged: $3-$8 per 2-3 cubic foot bag ($40-$120 per cubic yard). Premium mulches (cedar, hardwood) cost more. Buy in bulk for large projects (5+ yards). Check local suppliers and garden centers for best prices.",
  },
  {
    question: "Does mulch prevent weeds?",
    answer: "2-3 inches of mulch blocks ~80% of weeds by blocking sunlight. For maximum weed prevention, use landscape fabric under mulch. Organic mulch (bark, compost) breaks down and must be refreshed annually. Inorganic mulch (rubber, rock) lasts longer but doesn't improve soil.",
  },
];

export default function MulchCalculatorPage() {
  return (
    <>
      <JsonLd data={buildToolSchema({ name: "Mulch Calculator", description: "Calculate how much mulch, topsoil, compost, or bark chips you need for landscaping. Enter area, depth, and mulch type for instant results.", url: TOOL_URL, category: "DIY & Landscaping" })} />
      <JsonLd data={buildFaqSchema(faqs)} />
      <JsonLd data={buildBreadcrumbSchema([{ name: "Home", url: BASE_URL }, { name: "Tools", url: `${BASE_URL}/tools` }, { name: "Mulch Calculator", url: TOOL_URL }])} />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: "Tools", href: "/tools" }, { label: "Mulch Calculator" }]} />
        <div className="ad-slot my-4">Advertisement</div>

        <div className="lg:grid lg:grid-cols-[1fr_280px] lg:gap-8">
          <div className="space-y-8">
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 sm:text-4xl">
                  Mulch Calculator
                </h1>
                <span className="rounded-full bg-green-100 dark:bg-green-900 px-3 py-1 text-xs font-semibold text-green-800 dark:text-green-200">
                  Landscaping
                </span>
              </div>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Calculate how many cubic yards and bags of mulch you need for garden beds, landscaping projects, and outdoor spaces. Supports all mulch types including bark, wood chips, compost, pine straw, and rubber mulch. Get instant cost and weight estimates.
              </p>
            </div>

            <MulchCalculator />

            <div className="ad-slot">Advertisement</div>

            {/* Mulch type comparison */}
            <section>
              <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">
                Mulch Type Comparison
              </h2>
              <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-300">Mulch Type</th>
                      <th className="px-4 py-3 text-center font-semibold text-gray-700 dark:text-gray-300">Lifespan</th>
                      <th className="px-4 py-3 text-center font-semibold text-gray-700 dark:text-gray-300">Cost</th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-300">Best For</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                    {[
                      ["Bark Mulch", "2-3 years", "$30-$45/yd³", "General landscaping, flower beds"],
                      ["Wood Chips", "2-3 years", "$20-$30/yd³", "Budget-friendly, pathways"],
                      ["Compost Mulch", "1 year", "$40-$60/yd³", "Soil enrichment, gardens"],
                      ["Pine Straw", "3-4 years", "$35-$50/yd³", "Acid-loving plants, southern gardens"],
                      ["Rubber Mulch", "8-10 years", "$50-$80/yd³", "Playgrounds, low maintenance"],
                      ["Cedar/Hardwood", "3-4 years", "$60-$100/yd³", "Premium look, aromatic, pest deterrent"],
                    ].map(([type, life, cost, use]) => (
                      <tr key={type} className="even:bg-gray-50/50 dark:even:bg-gray-800/30">
                        <td className="px-4 py-2.5 font-medium text-gray-800 dark:text-gray-200">{type}</td>
                        <td className="px-4 py-2.5 text-center text-gray-600 dark:text-gray-400">{life}</td>
                        <td className="px-4 py-2.5 text-center text-gray-600 dark:text-gray-400">{cost}</td>
                        <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400">{use}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Seasonal planning */}
            <section>
              <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">
                Mulch Application Guide by Season
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  {
                    season: "Spring (Apr-May)",
                    tips: "Best time for new mulch. Apply 2-3 inches after soil warms. Prevents summer weeds.",
                  },
                  {
                    season: "Summer (Jun-Aug)",
                    tips: "Maintains moisture, regulates soil temperature. Refresh if needed. Check for compaction.",
                  },
                  {
                    season: "Fall (Sep-Oct)",
                    tips: "Secondary application time. Protects roots before winter. Mix in fallen leaves.",
                  },
                  {
                    season: "Winter (Nov-Mar)",
                    tips: "Protects root zones from freeze-thaw cycles. Provides organic matter as it breaks down.",
                  },
                ].map((item) => (
                  <div key={item.season} className="card p-4 border-l-4 border-green-500">
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">{item.season}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{item.tips}</p>
                  </div>
                ))}
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
              <h3 className="mb-3 font-semibold text-gray-900 dark:text-gray-100">Pro Tips</h3>
              <div className="space-y-3 text-xs">
                {[
                  ["Depth", "3 inches is standard"],
                  ["Refresh", "Annually for organic mulch"],
                  ["Best season", "Spring & fall"],
                  ["Weed control", "Pair with landscape fabric"],
                  ["Avoid piling", "Don't mound against trees"],
                  ["Buy bulk", "Cubic yards cheaper than bags"],
                ].map(([tip, val]) => (
                  <div key={tip} className="flex justify-between gap-2">
                    <span className="text-gray-500 dark:text-gray-400">{tip}</span>
                    <span className="font-semibold text-green-700 dark:text-green-400 text-right">{val}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="card p-5">
              <h3 className="mb-3 font-semibold text-gray-900 dark:text-gray-100">Related Tools</h3>
              <div className="space-y-2">
                {[
                  { href: "/tools/concrete-calculator", label: "Concrete Calculator" },
                  { href: "/tools/tile-calculator", label: "Tile Calculator" },
                  { href: "/tools/paint-calculator", label: "Paint Calculator" },
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
