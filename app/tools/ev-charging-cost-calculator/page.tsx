import type { Metadata } from "next";
import Link from "next/link";
import EVChargingCostCalculator from "@/components/tools/EVChargingCostCalculator";
import JsonLd, { buildToolSchema, buildFaqSchema, buildBreadcrumbSchema } from "@/components/seo/JsonLd";
import Breadcrumb from "@/components/layout/Breadcrumb";
import { ChevronRight, ExternalLink } from "lucide-react";
import { countryEnergyPrices } from "@/lib/evcharging/data";

const BASE_URL = "https://toolswonder.com";
const TOOL_URL = `${BASE_URL}/tools/ev-charging-cost-calculator`;

export const metadata: Metadata = {
  title: "EV Charging Cost Calculator – 18 Countries, Home vs Public, vs Gas",
  description:
    "Free EV charging cost calculator with electricity and gas prices for the USA, China, Russia, EU top 10, Japan, South Korea, Canada, Australia, India, and Brazil. Compare home vs public charging cost and EV vs gas car savings.",
  keywords: [
    "ev charging cost calculator",
    "ev charging cost calculator vs gas",
    "home ev charging cost calculator",
    "electric car charging cost calculator",
    "ev charging cost by country",
    "cost to charge electric car at home",
    "ev vs gas cost calculator",
  ],
  alternates: { canonical: TOOL_URL },
  openGraph: {
    title: "EV Charging Cost Calculator – 18 Countries, Home vs Public, vs Gas | ToolsWonder",
    description: "Compare EV charging cost across 18 countries, home vs public charging, and EV vs gas car savings. Free and instant.",
    url: TOOL_URL,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "EV Charging Cost Calculator",
    description: "Electricity and gas prices for 18 countries. Compare EV charging cost vs a gas car. Free and instant.",
  },
};

const faqs = [
  {
    question: "How do I calculate EV charging cost?",
    answer:
      "EV charging cost = (Distance driven ÷ 100) × EV efficiency (kWh per 100 miles/km) × Electricity price per kWh. Example: driving 1,000 miles/month in an EV using 30 kWh per 100 miles, at the US average residential rate of $0.188/kWh: (1,000/100) × 30 × $0.188 = $56.40/month.",
  },
  {
    question: "How much does it cost to charge an EV at home vs a public charger?",
    answer:
      "Home charging uses your regular residential electricity rate. Public and DC fast chargers typically add a markup — commonly 40–100% above the home rate — to cover network fees, faster hardware, and demand charges. This calculator lets you apply a public charging markup on top of your country's base electricity rate.",
  },
  {
    question: "Is charging an EV cheaper than buying gas?",
    answer:
      "In almost every country, yes — electricity costs significantly less per mile/km than gasoline, even in countries with expensive electricity like Germany or the UK, because EVs are far more energy-efficient than combustion engines. The exact savings depend on local electricity and gas prices, which vary widely by country — use the 'Compare against a gas car' option above for your specific market.",
  },
  {
    question: "Why do electricity prices vary so much between countries?",
    answer:
      "Electricity prices reflect each country's generation mix (hydro and nuclear tend to be cheaper than imported gas), taxes and environmental levies, grid infrastructure costs, and subsidy policy. European countries like Germany and Italy have some of the highest household electricity prices in the world due to high taxes and reliance on imported energy, while countries with abundant domestic power generation like China, Russia, and India have among the lowest.",
  },
  {
    question: "What EV efficiency (kWh per 100 miles) should I use?",
    answer:
      "Most modern EVs use roughly 25–35 kWh per 100 miles (about 15.5–21.7 kWh per 100 km) in real-world driving, with smaller/more efficient EVs at the low end and larger SUVs/trucks at the high end. 30 kWh per 100 miles is a reasonable default; check your specific vehicle's EPA/WLTP efficiency rating for a more accurate figure.",
  },
  {
    question: "Where does this calculator's country data come from?",
    answer:
      "Electricity and gasoline prices are compiled from national electricity regulators and statistical agencies (e.g., the U.S. Energy Information Administration for the USA, Eurostat for EU countries) via aggregated pricing data as of August 2026. Rates change over time and vary by region/utility within a country, so treat these as planning estimates — check your local utility bill for your exact rate.",
  },
];

const relatedTools = [
  { title: "Electrical Load Calculator", href: "/tools/electrical-load-calculator", desc: "Home electrical load in kW/kVA" },
  { title: "Sales Tax Calculator", href: "/tools/sales-tax-calculator", desc: "Add or reverse calculate US sales tax" },
  { title: "Tariff Calculator", href: "/tools/tariff-calculator", desc: "US & EU import duty and landed cost" },
];

export default function EVChargingCostCalculatorPage() {
  return (
    <>
      <JsonLd data={buildToolSchema({ name: "EV Charging Cost Calculator", description: "Calculate EV charging cost across 18 countries, home vs public charging, and compare against an equivalent gas car.", url: TOOL_URL, category: "Automotive" })} />
      <JsonLd data={buildFaqSchema(faqs)} />
      <JsonLd data={buildBreadcrumbSchema([
        { name: "Home", url: BASE_URL },
        { name: "Tools", url: `${BASE_URL}/tools` },
        { name: "EV Charging Cost Calculator", url: TOOL_URL },
      ])} />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: "Tools", href: "/tools" }, { label: "EV Charging Cost Calculator" }]} />
        <div className="ad-slot my-4">Advertisement</div>

        <div className="lg:grid lg:grid-cols-[1fr_280px] lg:gap-8">
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 sm:text-4xl">EV Charging Cost Calculator</h1>
              <p className="mt-3 text-lg text-gray-600 dark:text-gray-400">
                Calculate how much it costs to charge an electric vehicle in 18 major markets —
                the USA, China, Russia, the EU&apos;s top 10 economies, Japan, South Korea, Canada,
                Australia, India, and Brazil. Compare home vs public charging, and see savings
                versus an equivalent gas car.
              </p>
            </div>

            <EVChargingCostCalculator />

            <div className="ad-slot">Advertisement</div>

            <section className="prose prose-gray dark:prose-invert max-w-none">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Electricity &amp; Gasoline Prices by Country (August 2026)</h2>
              <p className="text-gray-600 dark:text-gray-400">
                Residential electricity rate and gasoline price used as the default for each
                country, compiled from national electricity regulators and statistical agencies:
              </p>
              <div className="not-prose overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700 text-left">
                      <th className="py-2 pr-4 font-semibold text-gray-900 dark:text-gray-100">Country</th>
                      <th className="py-2 pr-4 font-semibold text-gray-900 dark:text-gray-100">Electricity ($/kWh)</th>
                      <th className="py-2 font-semibold text-gray-900 dark:text-gray-100">Gasoline ($/liter)</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-600 dark:text-gray-400">
                    {countryEnergyPrices.map((c) => (
                      <tr key={c.code} className="border-b border-gray-100 dark:border-gray-800">
                        <td className="py-2 pr-4">{c.name}</td>
                        <td className="py-2 pr-4">${c.electricityUsdPerKwh.toFixed(3)}</td>
                        <td className="py-2">${c.gasolineUsdPerLiter.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mt-4">
                Europe has some of the world&apos;s highest household electricity prices (Germany
                and Italy both above $0.40/kWh) due to high taxes and reliance on imported energy,
                while countries with abundant domestic generation — China, Russia, India — sit
                well under $0.10/kWh. Despite this spread, EVs remain cheaper to run than gas cars
                in nearly every market because they convert energy so much more efficiently.
              </p>
              <ul className="text-gray-600 dark:text-gray-400">
                <li>
                  <a href="https://www.eia.gov/electricity/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-blue-600 hover:underline">
                    U.S. Energy Information Administration – Electricity <ExternalLink className="h-3 w-3" />
                  </a>
                </li>
                <li>
                  <a href="https://ec.europa.eu/eurostat/web/energy/database" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-blue-600 hover:underline">
                    Eurostat – Energy Statistics Database <ExternalLink className="h-3 w-3" />
                  </a>
                </li>
                <li>
                  <a href="https://www.iea.org/reports/electricity-2026/prices" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-blue-600 hover:underline">
                    International Energy Agency – Electricity 2026 Prices <ExternalLink className="h-3 w-3" />
                  </a>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-gray-100">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {faqs.map((f, i) => (
                  <div key={i} className="card p-5">
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100">{f.question}</h3>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{f.answer}</p>
                  </div>
                ))}
              </div>
            </section>

            <div className="ad-slot">Advertisement</div>
          </div>

          <aside className="mt-8 space-y-5 lg:mt-0">
            <div className="ad-slot h-[250px]">Advertisement</div>

            <div className="card p-5">
              <h3 className="mb-3 font-semibold text-gray-900 dark:text-gray-100">Cheapest &amp; Priciest to Charge</h3>
              <div className="space-y-2 text-xs">
                {[
                  ["Cheapest: Russia", "$0.069/kWh"],
                  ["Cheapest: China", "$0.076/kWh"],
                  ["Cheapest: India", "$0.077/kWh"],
                  ["Priciest: Italy", "$0.414/kWh"],
                  ["Priciest: Germany", "$0.406/kWh"],
                  ["Priciest: UK", "$0.402/kWh"],
                ].map(([s, v]) => (
                  <div key={s} className="flex justify-between gap-2">
                    <span className="text-gray-500 dark:text-gray-400">{s}</span>
                    <span className="font-semibold text-blue-700 dark:text-blue-400 text-right">{v}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="card p-5">
              <h3 className="mb-3 font-semibold text-gray-900 dark:text-gray-100">Related Tools</h3>
              <ul className="space-y-3 text-sm">
                {relatedTools.map((t) => (
                  <li key={t.href}>
                    <Link href={t.href} className="group flex items-start gap-2">
                      <ChevronRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-blue-500 group-hover:translate-x-0.5 transition-transform" />
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-gray-100 group-hover:text-blue-600 transition-colors">{t.title}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">{t.desc}</div>
                      </div>
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
