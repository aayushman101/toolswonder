import type { Metadata } from "next";
import Link from "next/link";
import TariffCalculator from "@/components/tools/TariffCalculator";
import JsonLd, { buildToolSchema, buildFaqSchema, buildBreadcrumbSchema } from "@/components/seo/JsonLd";
import Breadcrumb from "@/components/layout/Breadcrumb";
import { ChevronRight, ExternalLink } from "lucide-react";

const BASE_URL = "https://toolswonder.com";
const TOOL_URL = `${BASE_URL}/tools/tariff-calculator`;

export const metadata: Metadata = {
  title: "Tariff Calculator – US & EU Import Duty and Landed Cost Estimator",
  description:
    "Free tariff calculator for US and EU imports. Estimate customs duty, import VAT, and total landed cost by product category and country of origin. Includes de minimis thresholds.",
  keywords: [
    "tariff calculator",
    "import duty calculator",
    "import duty calculator usa",
    "eu import duty calculator",
    "customs duty calculator",
    "landed cost calculator",
    "tariff calculator usa",
    "how much are tariffs",
    "import tax calculator",
    "china tariff calculator",
    "customs calculator",
    "duty and tax calculator",
  ],
  alternates: { canonical: TOOL_URL },
  openGraph: {
    title: "Tariff Calculator – US & EU Import Duty and Landed Cost Estimator | ToolsWonder",
    description: "Estimate customs duty, import VAT, and total landed cost for US and EU imports by product category and country of origin.",
    url: TOOL_URL,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tariff Calculator – US & EU Import Duty Estimator",
    description: "Estimate customs duty, VAT, and total landed cost for imports into the US or EU. Free and instant.",
  },
};

const faqs = [
  {
    question: "How do I calculate tariffs on imports?",
    answer:
      "Tariff amount = Dutiable value × duty rate. The US calculates duty on the merchandise (FOB) value; most other countries including the EU calculate duty on the CIF value (goods + shipping + insurance). The duty rate depends on the product's HTS code (US) or TARIC code (EU) and, for the US, its country of origin. Add any country-specific special tariffs (Section 301 China tariffs, Section 232 steel/aluminum tariffs, trade-policy surcharges) on top of the standard rate — these change frequently and should be checked separately.",
  },
  {
    question: "What is the US import duty de minimis threshold?",
    answer:
      "Historically, shipments valued at $800 or less could enter the US duty-free under Section 321 'de minimis' informal entry. This exemption has been narrowed for low-value parcels from certain countries under recent trade policy changes, so always confirm current eligibility on cbp.gov before assuming a shipment qualifies.",
  },
  {
    question: "What is the EU customs duty de minimis threshold?",
    answer:
      "Goods valued at €150 or less are generally exempt from customs duty when imported into the EU. However, import VAT applies from the first euro of value — the old €22 VAT exemption was abolished in July 2021. So a €50 parcel may owe VAT even though no customs duty is due.",
  },
  {
    question: "How is import VAT calculated in the EU?",
    answer:
      "EU import VAT is charged on the customs value plus any duty owed (and sometimes plus shipping), not just the product price. Formula: VAT = (CIF value + customs duty) × VAT rate. The standard VAT rate varies by member state — from 19% in Germany to 25.5% in Finland — select your destination country in the calculator for the correct rate.",
  },
  {
    question: "Why do tariff rates change so often?",
    answer:
      "Beyond the standard MFN (Most-Favored-Nation) or Common External Tariff base rates — which are relatively stable, WTO-bound rates — governments layer on additional tariffs for trade policy reasons: Section 301 tariffs (US, targeting specific countries like China), Section 232 tariffs (US, national security grounds for steel/aluminum/autos), anti-dumping and countervailing duties, and EU safeguard measures. These can change with little notice, which is why this calculator separates the stable base rate from an editable 'additional/special tariff' field.",
  },
  {
    question: "Where can I find the exact tariff rate for my product?",
    answer:
      "For the US, look up your product's HTS (Harmonized Tariff Schedule) code at hts.usitc.gov. For the EU, use the TARIC database at the European Commission's Taxation and Customs Union site. Both let you search by product description or code and show the current duty rate, including any active trade remedies.",
  },
  {
    question: "What is FOB vs CIF value for customs?",
    answer:
      "FOB (Free on Board) value is just the price of the goods, excluding international shipping and insurance. CIF (Cost, Insurance, Freight) value adds shipping and insurance to the goods price. The US generally assesses duty on FOB/merchandise value; the EU and most other countries assess duty on CIF value, which results in a slightly higher dutiable base.",
  },
];

const relatedTools = [
  { title: "Sales Tax Calculator", href: "/tools/sales-tax-calculator", desc: "Add or reverse calculate US sales tax" },
  { title: "Inflation Calculator", href: "/tools/inflation-calculator", desc: "Adjust money for inflation over time" },
  { title: "Mortgage Calculator", href: "/tools/mortgage-calculator", desc: "Monthly home loan payment" },
];

export default function TariffCalculatorPage() {
  return (
    <>
      <JsonLd data={buildToolSchema({ name: "Tariff Calculator", description: "Estimate customs duty, import VAT, and total landed cost for imports into the US or EU by product category and country of origin.", url: TOOL_URL, category: "Finance" })} />
      <JsonLd data={buildFaqSchema(faqs)} />
      <JsonLd data={buildBreadcrumbSchema([
        { name: "Home", url: BASE_URL },
        { name: "Tools", url: `${BASE_URL}/tools` },
        { name: "Tariff Calculator", url: TOOL_URL },
      ])} />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: "Tools", href: "/tools" }, { label: "Tariff Calculator" }]} />
        <div className="ad-slot my-4">Advertisement</div>

        <div className="lg:grid lg:grid-cols-[1fr_280px] lg:gap-8">
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 sm:text-4xl">Tariff Calculator – US &amp; EU Import Duty</h1>
              <p className="mt-3 text-lg text-gray-600 dark:text-gray-400">
                Estimate customs duty, import VAT, and total landed cost for shipments into the United
                States or European Union. Choose destination, product category, and country of origin —
                add any known special tariff on top of the standard rate.
              </p>
            </div>

            <TariffCalculator />

            <div className="ad-slot">Advertisement</div>

            <section className="prose prose-gray dark:prose-invert max-w-none">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">How Tariffs &amp; Landed Cost Are Calculated</h2>
              <p className="text-gray-600 dark:text-gray-400">
                Total landed cost is what an imported product actually costs once it clears customs —
                not just the price you paid the seller:
              </p>
              <div className="not-prose rounded-xl bg-gray-900 p-5 font-mono text-sm overflow-x-auto">
                <div className="text-gray-400 mb-1"># US imports</div>
                <div className="text-green-400">Dutiable value = Product value (FOB)</div>
                <div className="text-green-400">Duty = Dutiable value × (base rate + additional tariff)</div>
                <div className="text-green-400">Landed cost = Product value + Shipping + Duty</div>
                <div className="text-gray-400 mt-3 mb-1"># EU imports</div>
                <div className="text-yellow-400">Dutiable value = Product value + Shipping + Insurance (CIF)</div>
                <div className="text-yellow-400">Duty = Dutiable value × (base rate + additional tariff)</div>
                <div className="text-yellow-400">VAT = (Dutiable value + Duty) × VAT rate</div>
                <div className="text-yellow-400">Landed cost = Product value + Shipping + Duty + VAT</div>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mt-4">
                The category duty rates used here are broad, illustrative averages meant for early
                budgeting — not a substitute for a customs broker or the official tariff schedule. For
                the exact rate on your specific product, look it up by HTS code (US) or TARIC code (EU):
              </p>
              <ul className="text-gray-600 dark:text-gray-400">
                <li>
                  <a href="https://hts.usitc.gov/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-blue-600 hover:underline">
                    USITC Harmonized Tariff Schedule search <ExternalLink className="h-3 w-3" />
                  </a>
                </li>
                <li>
                  <a href="https://www.cbp.gov/trade" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-blue-600 hover:underline">
                    US Customs and Border Protection – Trade <ExternalLink className="h-3 w-3" />
                  </a>
                </li>
                <li>
                  <a href="https://taxation-customs.ec.europa.eu/customs-4/international-affairs/international-customs-cooperation_en" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-blue-600 hover:underline">
                    European Commission – Taxation and Customs Union <ExternalLink className="h-3 w-3" />
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
              <h3 className="mb-3 font-semibold text-gray-900 dark:text-gray-100">De Minimis Thresholds</h3>
              <div className="space-y-2 text-xs">
                {[
                  ["US (Section 321)", "$800 — narrowed for some origins"],
                  ["EU customs duty", "€150 exemption"],
                  ["EU import VAT", "No exemption (from €0)"],
                ].map(([s, v]) => (
                  <div key={s} className="flex justify-between gap-2">
                    <span className="text-gray-500 dark:text-gray-400">{s}</span>
                    <span className="font-semibold text-blue-700 dark:text-blue-400 text-right">{v}</span>
                  </div>
                ))}
                <p className="text-xs text-gray-400 pt-1">Rules change frequently — verify before shipping.</p>
              </div>
            </div>

            <div className="card p-5">
              <h3 className="mb-3 font-semibold text-gray-900 dark:text-gray-100">Related Finance Tools</h3>
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
