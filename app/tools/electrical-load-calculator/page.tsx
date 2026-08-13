import type { Metadata } from "next";
import ElectricalLoadCalculator from "@/components/tools/ElectricalLoadCalculator";
import JsonLd, { buildToolSchema, buildFaqSchema, buildBreadcrumbSchema } from "@/components/seo/JsonLd";
import Breadcrumb from "@/components/layout/Breadcrumb";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

const BASE_URL = "https://toolswonder.com";
const TOOL_URL = `${BASE_URL}/tools/electrical-load-calculator`;

export const metadata: Metadata = {
  title: "Electrical Load Calculator – kW, kVA & Monthly Bill",
  description: "Free electrical load calculator for home and commercial use. Add appliances, get total load in kW and kVA, circuit breaker size, monthly units, and electricity bill estimate. Works for India single-phase and three-phase supply.",
  keywords: [
    "electrical load calculator",
    "electrical load calculator india",
    "residential electrical load calculator",
    "house electrical load calculator",
    "home electrical load calculator",
    "electricity load calculator in kw for home",
    "electrical load calculator kva",
    "commercial electrical load calculator",
    "circuit breaker size calculator",
    "monthly electricity bill calculator",
  ],
  alternates: { canonical: TOOL_URL },
  openGraph: {
    title: "Electrical Load Calculator – kW, kVA & Monthly Bill",
    description: "Calculate home or office electrical load instantly. Get kW, kVA, breaker size, and monthly electricity bill estimate.",
    url: TOOL_URL,
    type: "website",
  },
};

const faqs = [
  {
    question: "How do I calculate the electrical load of my house?",
    answer: "List every appliance with its wattage and daily usage hours. Multiply watts × quantity × hours to get Wh/day per appliance. Sum all appliances to get total daily energy (Wh/day). Divide by 1000 for kWh/day (units). Multiply by 30 for monthly units and by your electricity rate to get the monthly bill. Our calculator does this automatically — just enter each appliance.",
  },
  {
    question: "What is the difference between kW and kVA?",
    answer: "kW (kilowatt) is real power — the actual power consumed to do work. kVA (kilo-volt-ampere) is apparent power — the total power drawn from the supply. They are related by the power factor (PF): kVA = kW ÷ PF. For resistive loads like heaters and incandescent bulbs, PF ≈ 1 so kW ≈ kVA. For motors, ACs, and inductive loads, PF is typically 0.8–0.9, meaning kVA > kW. Utilities and transformer sizing use kVA; energy billing uses kWh (kW × hours).",
  },
  {
    question: "What size circuit breaker do I need for my home?",
    answer: "Calculate your total load in kVA, then find the full load current: I (A) = kVA × 1000 ÷ Voltage (230V for single phase, 415V×√3 for three phase). Multiply by 1.25 (NEC 80% continuous load rule) and select the next standard breaker size (6, 10, 16, 20, 25, 32, 40, 50, 63, 80, 100 A). Example: 5 kW home, PF 0.85 → 5.88 kVA → 25.6 A full load → 32 A after 1.25× → use 32 A MCB. Always consult a licensed electrician for final selection.",
  },
  {
    question: "How many units of electricity does a typical Indian home use per month?",
    answer: "A small 2BHK flat (2–3 fans, refrigerator, TV, washing machine, no AC) typically uses 100–150 units/month. A 3BHK with 1 AC (6 hrs/day) uses 200–350 units/month. A 3BHK with 2 ACs uses 400–600 units/month. Usage varies by season — AC usage in summer can triple electricity consumption. Use our calculator to get a precise estimate for your specific appliance mix.",
  },
  {
    question: "What is power factor and what value should I use?",
    answer: "Power factor (PF) is the ratio of real power (kW) to apparent power (kVA). It measures how efficiently electrical power is used. For a typical residential home with fans, ACs, and motors, use PF = 0.80–0.85. For fully resistive loads (only heaters, bulbs), PF = 1. Commercial offices with many computers and motors: PF = 0.75–0.85. Most Indian DISCOMs require consumers to maintain PF ≥ 0.85 to avoid penalty surcharges.",
  },
  {
    question: "How do I calculate my monthly electricity bill?",
    answer: "Monthly Bill = Monthly Units × Rate per Unit. Monthly Units = (Sum of all appliance watts × qty × daily hours) ÷ 1000 × 30. Example: 3 fans (75W × 8h) + 1 AC (1500W × 6h) + 1 fridge (150W × 24h) + 6 LEDs (10W × 6h) = 1800 + 9000 + 3600 + 360 = 14,760 Wh/day = 14.76 kWh/day × 30 = 442.8 units. At ₹8/unit = ₹3,542/month.",
  },
  {
    question: "What is the electrical load for a 1.5 ton AC?",
    answer: "A 1.5 ton non-inverter AC draws approximately 1,500–1,800W. A 5-star inverter 1.5 ton AC draws 800–1,200W depending on ambient temperature and load. For load calculation purposes, use 1,500W for a standard AC and 1,000W for a 5-star inverter model. Running 8 hours/day, a 1.5T AC consumes 12 kWh/day (360 units/month) for non-inverter and 8 kWh/day (240 units/month) for inverter.",
  },
];

export default function ElectricalLoadCalculatorPage() {
  return (
    <>
      <JsonLd data={buildToolSchema({ name: "Electrical Load Calculator", description: "Calculate total home or office electrical load in kW and kVA. Get circuit breaker size and monthly electricity bill estimate.", url: TOOL_URL, category: "Electrical" })} />
      <JsonLd data={buildFaqSchema(faqs)} />
      <JsonLd data={buildBreadcrumbSchema([{ name: "Home", url: BASE_URL }, { name: "Tools", url: `${BASE_URL}/tools` }, { name: "Electrical Load Calculator", url: TOOL_URL }])} />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: "Tools", href: "/tools" }, { label: "Electrical Load Calculator" }]} />
        <div className="ad-slot my-4">Advertisement</div>

        <div className="lg:grid lg:grid-cols-[1fr_280px] lg:gap-8">
          <div className="space-y-8">
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 sm:text-4xl">
                  Electrical Load Calculator
                </h1>
                <span className="rounded-full bg-yellow-100 dark:bg-yellow-900 px-3 py-1 text-xs font-semibold text-yellow-800 dark:text-yellow-200">
                  Electrical
                </span>
              </div>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Calculate total electrical load for your home or office in kW and kVA. Add appliances, set daily usage hours, and instantly get circuit breaker size recommendation, monthly units consumed, and estimated electricity bill. Supports single-phase (230V) and three-phase (415V) supply.
              </p>
            </div>

            <ElectricalLoadCalculator />

            <div className="ad-slot">Advertisement</div>

            {/* Reference table */}
            <section>
              <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">
                Common Appliance Wattage Reference
              </h2>
              <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-300">Appliance</th>
                      <th className="px-4 py-3 text-center font-semibold text-gray-700 dark:text-gray-300">Typical Wattage</th>
                      <th className="px-4 py-3 text-center font-semibold text-gray-700 dark:text-gray-300">Units/Day (8h use)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                    {[
                      ["Ceiling Fan", "60–80 W", "0.5–0.6 kWh"],
                      ["LED Bulb", "7–15 W", "0.06–0.12 kWh"],
                      ["LED Tube Light", "18–22 W", "0.14–0.18 kWh"],
                      ["Refrigerator (200L)", "100–180 W", "0.8–1.4 kWh"],
                      ["Television (43\" LED)", "60–90 W", "0.5–0.72 kWh"],
                      ["Air Conditioner (1.5T)", "1,200–1,800 W", "9.6–14.4 kWh"],
                      ["Washing Machine", "400–600 W", "0.4–0.6 kWh (1h/day)"],
                      ["Geyser / Water Heater", "1,500–3,000 W", "1.5–3 kWh (1h/day)"],
                      ["Water Pump (0.5HP)", "350–400 W", "0.7–0.8 kWh (2h/day)"],
                      ["Microwave Oven", "800–1,500 W", "0.4–0.75 kWh (30m/day)"],
                      ["Induction Cooktop", "1,500–2,000 W", "1.5–2 kWh"],
                      ["Desktop Computer", "200–400 W", "1.6–3.2 kWh"],
                      ["Laptop", "40–80 W", "0.32–0.64 kWh"],
                    ].map(([app, watts, units]) => (
                      <tr key={app} className="even:bg-gray-50/50 dark:even:bg-gray-800/30">
                        <td className="px-4 py-2.5 font-medium text-gray-800 dark:text-gray-200">{app}</td>
                        <td className="px-4 py-2.5 text-center text-gray-600 dark:text-gray-400">{watts}</td>
                        <td className="px-4 py-2.5 text-center text-gray-600 dark:text-gray-400">{units}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Circuit breaker reference */}
            <section>
              <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">
                Circuit Breaker Size Guide (Single Phase, 230V)
              </h2>
              <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-300">MCB Rating</th>
                      <th className="px-4 py-3 text-center font-semibold text-gray-700 dark:text-gray-300">Max Load (kW, PF 0.85)</th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-300">Typical Use</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                    {[
                      ["6 A", "≤ 1.1 kW", "Single light/fan circuit"],
                      ["10 A", "≤ 1.8 kW", "Lighting sub-circuit"],
                      ["16 A", "≤ 2.9 kW", "Power sockets, small AC"],
                      ["20 A", "≤ 3.6 kW", "Small home (2BHK, no AC)"],
                      ["25 A", "≤ 4.5 kW", "2BHK with 1 AC"],
                      ["32 A", "≤ 5.8 kW", "3BHK with 1–2 ACs"],
                      ["40 A", "≤ 7.2 kW", "Large 3BHK / small office"],
                      ["63 A", "≤ 11.4 kW", "Commercial / large bungalow"],
                      ["100 A", "≤ 18 kW", "Heavy commercial load"],
                    ].map(([rating, load, use]) => (
                      <tr key={rating} className="even:bg-gray-50/50 dark:even:bg-gray-800/30">
                        <td className="px-4 py-2.5 font-semibold text-yellow-700 dark:text-yellow-400">{rating}</td>
                        <td className="px-4 py-2.5 text-center text-gray-600 dark:text-gray-400">{load}</td>
                        <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400">{use}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{f.answer}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="mt-8 space-y-5 lg:mt-0">
            <div className="ad-slot h-[250px]">Advertisement</div>

            <div className="card p-5">
              <h3 className="mb-3 font-semibold text-gray-900 dark:text-gray-100">Quick Reference</h3>
              <div className="space-y-2 text-xs">
                {[
                  ["1.5T AC (8h/day)", "~360 units/month"],
                  ["Refrigerator (24h)", "~108 units/month"],
                  ["Geyser (1h/day)", "~60 units/month"],
                  ["3 Fans (8h/day)", "~54 units/month"],
                  ["Typical 2BHK", "150–250 units/month"],
                  ["Typical 3BHK + AC", "300–500 units/month"],
                ].map(([item, val]) => (
                  <div key={item} className="flex justify-between gap-2">
                    <span className="text-gray-500 dark:text-gray-400">{item}</span>
                    <span className="font-semibold text-yellow-700 dark:text-yellow-400 text-right">{val}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="card p-5">
              <h3 className="mb-3 font-semibold text-gray-900 dark:text-gray-100">Related Tools</h3>
              <div className="space-y-2">
                {[
                  { href: "/tools/tile-calculator", label: "Tile Calculator" },
                  { href: "/tools/brick-calculator", label: "Brick Calculator" },
                  { href: "/tools/paint-calculator", label: "Paint Calculator" },
                  { href: "/tools/emi-calculator", label: "EMI Calculator" },
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
