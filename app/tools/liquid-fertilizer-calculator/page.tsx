import type { Metadata } from "next";
import Link from "next/link";
import LiquidFertilizerCalculator from "@/components/tools/LiquidFertilizerCalculator";
import JsonLd, { buildToolSchema, buildFaqSchema, buildBreadcrumbSchema } from "@/components/seo/JsonLd";
import Breadcrumb from "@/components/layout/Breadcrumb";
import { ChevronRight } from "lucide-react";

const BASE_URL = "https://toolswonder.com";
const TOOL_URL = `${BASE_URL}/tools/liquid-fertilizer-calculator`;

export const metadata: Metadata = {
  title: "Liquid Fertilizer Calculator – Dilution, Tank Mix & Hose-End Sprayer",
  description:
    "Free liquid fertilizer calculator. Calculate oz per gallon, tank mixing ratios, and hose-end sprayer settings. Covers 20-20-20, Miracle-Gro, fish emulsion, kelp, Peters. Instant results.",
  keywords: [
    "liquid fertilizer calculator",
    "liquid fertilizer dilution calculator",
    "hose end sprayer fertilizer calculator",
    "tank mix fertilizer calculator",
    "how much liquid fertilizer per gallon",
    "miracle gro mixing calculator",
    "fertilizer oz per gallon",
    "water soluble fertilizer calculator",
    "liquid fertilizer rate calculator",
    "liquid fertilizer mixing chart",
  ],
  alternates: { canonical: TOOL_URL },
  openGraph: {
    title: "Liquid Fertilizer Calculator – Dilution, Tank Mix & Hose-End | ToolsWonder",
    description: "Calculate liquid fertilizer oz/gallon, tank mix ratios, and hose-end settings. 3 calculators in one. Free.",
    url: TOOL_URL,
    type: "website",
  },
};

const faqs = [
  {
    question: "How much liquid fertilizer per gallon of water?",
    answer: "It depends on the fertilizer and application rate. For Miracle-Gro 24-8-16 at 1 lb N per 1,000 sq ft: using density 9.0 lbs/gal → product needed per 1,000 sq ft = 1 ÷ 0.24 = 4.17 lbs = 4.17 ÷ 9.0 = 0.46 gallons = 59 oz. Divide by coverage rate to get oz per gallon. Typical hand-spray rates: 1-4 oz per gallon for foliar feeding.",
  },
  {
    question: "How do I calculate liquid fertilizer dilution?",
    answer: "Dilution formula: oz per gallon = (N rate × coverage) ÷ (N% × density × total water). For tank mixers: Product oz per tank = oz-per-gallon × tank size. Our Tank Mixing tab does this automatically — enter your fertilizer, area, and desired N rate to get oz per tank fill.",
  },
  {
    question: "What is the hose-end sprayer fertilizer calculator setting?",
    answer: "Hose-end sprayers have a concentrate dial (typically 1, 2, 3, 4 oz/gallon of output). To calculate: Total water needed (gal) = Area ÷ 1,000 × 100 gal (standard lawn rate). Concentrate needed (oz) = setting × total water. Example: 5,000 sq ft, 2 oz setting, 100 gal/1,000 sqft rate: Total water = 500 gal; Concentrate = 2 × 500 = 1,000 oz (7.8 gallons).",
  },
  {
    question: "How much liquid fertilizer per 1,000 square feet?",
    answer: "At 1 lb N per 1,000 sq ft with 20-20-20 fertilizer (density 9.6 lbs/gal): Product lbs = 1 ÷ 0.20 = 5 lbs. Product gallons = 5 ÷ 9.6 = 0.52 gal = 66 oz per 1,000 sq ft. At 0.5 lb N rate: 33 oz per 1,000 sq ft. Our 'How Much to Buy' tab calculates this with any fertilizer and any area.",
  },
  {
    question: "Can I mix different liquid fertilizers together?",
    answer: "Generally yes, but check compatibility first. N+K fertilizers (e.g. 20-0-20) can usually be mixed. Phosphorus-rich fertilizers sometimes precipitate with calcium or sulfur sources. Never mix concentrated products directly — add each to the tank water separately (wash, fill, fertilizer A, fertilizer B method). Our tank mix tab shows product oz per tank for safe application rates.",
  },
  {
    question: "What is the difference between 20-20-20 and Miracle-Gro 24-8-16?",
    answer: "20-20-20 (equal NPK) is a balanced all-purpose fertilizer — good for general garden use. Miracle-Gro 24-8-16 has high N and K with lower P — better for established plants and lawns that already have sufficient phosphorus. 20-20-20 has slightly higher density (9.6 vs 9.0 lbs/gal). For lawns where P is adequate, 20-0-20 or 24-0-0 is more appropriate.",
  },
  {
    question: "How do I convert liquid fertilizer lbs to gallons?",
    answer: "Gallons = lbs ÷ density (lbs/gal). Typical liquid fertilizer densities: water = 8.34, 20-20-20 ≈ 9.6, Miracle-Gro 24-8-16 ≈ 9.0, Peters 20-10-20 ≈ 9.5, fish emulsion 5-1-1 ≈ 8.8, kelp 2-0-4 ≈ 8.5. Then: oz = gal × 128. Our calculator uses actual density values for accurate volume calculations.",
  },
  {
    question: "What is fish emulsion fertilizer and how much do I use?",
    answer: "Fish emulsion (typically 5-1-1) is an organic liquid fertilizer made from fish processing byproducts. It's slow-release, gentle, and improves soil biology. For lawns: 0.5 lb N per 1,000 sq ft every 4-6 weeks. Product rate = 0.5 ÷ 0.05 = 10 lbs per 1,000 sqft = 1.14 gal = 146 oz. Dilute heavily (2-3 oz per gallon) and apply as drench. Has a strong smell that dissipates in 1-2 days.",
  },
];

export default function LiquidFertilizerCalculatorPage() {
  return (
    <>
      <JsonLd data={buildToolSchema({ name: "Liquid Fertilizer Calculator", description: "Calculate liquid fertilizer dilution, tank mixing ratios, and hose-end sprayer settings. Covers oz/gallon, gallons needed, and cost.", url: TOOL_URL, category: "Home & Garden" })} />
      <JsonLd data={buildFaqSchema(faqs)} />
      <JsonLd data={buildBreadcrumbSchema([
        { name: "Home", url: BASE_URL },
        { name: "Tools", url: `${BASE_URL}/tools` },
        { name: "Fertilizer Calculator", url: `${BASE_URL}/tools/fertilizer-calculator` },
        { name: "Liquid Fertilizer Calculator", url: TOOL_URL },
      ])} />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumb items={[
          { label: "Tools", href: "/tools" },
          { label: "Fertilizer Calculator", href: "/tools/fertilizer-calculator" },
          { label: "Liquid Fertilizer Calculator" },
        ]} />

        <div className="ad-slot my-4">Advertisement</div>

        <div className="lg:grid lg:grid-cols-[1fr_280px] lg:gap-8">
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">Liquid Fertilizer Calculator</h1>
              <p className="mt-3 text-lg text-gray-600">
                Three calculators in one: calculate how much liquid fertilizer to buy (oz and gallons),
                tank mixing ratios (oz per tank fill), and hose-end sprayer concentrate settings.
                Covers 20-20-20, Miracle-Gro, Peters, fish emulsion, kelp, and custom NPK.
              </p>
            </div>

            <LiquidFertilizerCalculator />

            <div className="ad-slot">Advertisement</div>

            <section className="prose prose-gray max-w-none">
              <h2 className="text-2xl font-bold text-gray-900">Liquid Fertilizer Dilution Guide</h2>
              <p className="text-gray-600">Converting from weight-based nutrient rates to volume-based mixing instructions requires density:</p>
              <div className="not-prose rounded-xl bg-gray-900 p-5 font-mono text-sm overflow-x-auto">
                <div className="text-gray-400 mb-1"># Step 1: Product weight needed</div>
                <div className="text-green-400">Product (lbs) = N rate (lbs) ÷ (N% ÷ 100)</div>
                <div className="text-gray-400 mt-3 mb-1"># Step 2: Convert to volume</div>
                <div className="text-green-400">Product (gal) = Product (lbs) ÷ density (lbs/gal)</div>
                <div className="text-green-400">Product (oz)  = Product (gal) × 128</div>
                <div className="text-gray-400 mt-3 mb-1"># Example: 5,000 sq ft, 20-20-20, 0.5 lb N</div>
                <div className="text-yellow-400">Product = 0.5 ÷ 0.20 = 2.5 lbs / 1,000 sqft</div>
                <div className="text-yellow-400">Total = 2.5 × 5 = 12.5 lbs</div>
                <div className="text-yellow-400">Gallons = 12.5 ÷ 9.6 = 1.30 gal = 166 oz</div>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mt-10">Common Liquid Fertilizer Mixing Rates</h2>
              <div className="not-prose overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-blue-50 text-left">
                      <th className="border border-gray-200 px-4 py-2.5 font-semibold">Fertilizer</th>
                      <th className="border border-gray-200 px-4 py-2.5 font-semibold">NPK</th>
                      <th className="border border-gray-200 px-4 py-2.5 font-semibold">Density</th>
                      <th className="border border-gray-200 px-4 py-2.5 font-semibold">Oz/1,000 sqft (0.5 lb N)</th>
                      <th className="border border-gray-200 px-4 py-2.5 font-semibold">Oz/1,000 sqft (1 lb N)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { name: "20-20-20", npk: "20-20-20", density: 9.6, oz05: 33.3, oz1: 66.7 },
                      { name: "10-10-10", npk: "10-10-10", density: 9.2, oz05: 69.6, oz1: 139.1 },
                      { name: "Miracle-Gro", npk: "24-8-16", density: 9.0, oz05: 27.8, oz1: 55.6 },
                      { name: "Peters 20-10-20", npk: "20-10-20", density: 9.5, oz05: 33.7, oz1: 67.5 },
                      { name: "Fish Emulsion", npk: "5-1-1", density: 8.8, oz05: 145.5, oz1: 290.9 },
                      { name: "Kelp 2-0-4", npk: "2-0-4", density: 8.5, oz05: 378.8, oz1: 757.6 },
                    ].map(r => (
                      <tr key={r.name} className="hover:bg-gray-50 border-b border-gray-100">
                        <td className="border-l border-r border-gray-200 px-4 py-2.5 font-medium">{r.name}</td>
                        <td className="border-r border-gray-200 px-4 py-2.5 text-blue-700 font-semibold">{r.npk}</td>
                        <td className="border-r border-gray-200 px-4 py-2.5">{r.density} lbs/gal</td>
                        <td className="border-r border-gray-200 px-4 py-2.5">{r.oz05.toFixed(0)} oz</td>
                        <td className="border-r border-gray-200 px-4 py-2.5">{r.oz1.toFixed(0)} oz</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2 className="mb-6 text-2xl font-bold text-gray-900">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {faqs.map((f, i) => (
                  <div key={i} className="card p-5">
                    <h3 className="font-semibold text-gray-900">{f.question}</h3>
                    <p className="mt-2 text-sm text-gray-600 leading-relaxed">{f.answer}</p>
                  </div>
                ))}
              </div>
            </section>

            <div className="ad-slot">Advertisement</div>
          </div>

          <aside className="mt-8 space-y-5 lg:mt-0">
            <div className="ad-slot h-[250px]">Advertisement</div>
            <div className="card p-5">
              <h3 className="mb-3 font-semibold text-gray-900">Fertilizer Densities</h3>
              <div className="space-y-2 text-xs">
                {[
                  { fert: "20-20-20", density: "9.6 lbs/gal" },
                  { fert: "10-10-10", density: "9.2 lbs/gal" },
                  { fert: "Miracle-Gro 24-8-16", density: "9.0 lbs/gal" },
                  { fert: "Peters 20-10-20", density: "9.5 lbs/gal" },
                  { fert: "Fish Emulsion 5-1-1", density: "8.8 lbs/gal" },
                  { fert: "Kelp 2-0-4", density: "8.5 lbs/gal" },
                  { fert: "Water (reference)", density: "8.34 lbs/gal" },
                ].map(g => (
                  <div key={g.fert} className="flex justify-between">
                    <span className="text-gray-600">{g.fert}</span>
                    <span className="font-medium text-gray-900">{g.density}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="card p-5">
              <h3 className="mb-3 font-semibold text-gray-900">Related Tools</h3>
              <ul className="space-y-2 text-sm">
                {[
                  { title: "Lawn Fertilizer Calculator", href: "/tools/lawn-fertilizer-calculator" },
                  { title: "Dry Fertilizer Calculator", href: "/tools/dry-fertilizer-calculator" },
                  { title: "NPK Calculator", href: "/tools/npk-calculator" },
                  { title: "Fertilizer Blend Calculator", href: "/tools/fertilizer-blend-calculator" },
                  { title: "Full Fertilizer Calculator", href: "/tools/fertilizer-calculator" },
                ].map(t => (
                  <li key={t.href}>
                    <Link href={t.href} className="flex items-center gap-1.5 text-blue-700 hover:text-blue-900">
                      <ChevronRight className="h-3.5 w-3.5" /> {t.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="ad-slot h-[250px]">Advertisement</div>
          </aside>
        </div>
      </div>
    </>
  );
}
