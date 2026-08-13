"use client";

import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";

export default function GoatFarmCalculator() {
  const [numDoes, setNumDoes] = useState("20");
  const [numBucks, setNumBucks] = useState("2");
  const [kidsPerDoe, setKidsPerDoe] = useState("1.8");
  const [mortalityRate, setMortalityRate] = useState("5");

  const [meatEnabled, setMeatEnabled] = useState(true);
  const [avgWeightKg, setAvgWeightKg] = useState("25");
  const [meatPriceKg, setMeatPriceKg] = useState("400");

  const [milkEnabled, setMilkEnabled] = useState(false);
  const [milkPerDayL, setMilkPerDayL] = useState("1.5");
  const [milkPriceL, setMilkPriceL] = useState("60");
  const [lactationDays, setLactationDays] = useState("240");

  const [feedCostPerGoatMonth, setFeedCostPerGoatMonth] = useState("500");
  const [vetCostPerGoatYear, setVetCostPerGoatYear] = useState("300");
  const [laborCostMonth, setLaborCostMonth] = useState("8000");

  const [goatPurchasePrice, setGoatPurchasePrice] = useState("5000");
  const [housingCost, setHousingCost] = useState("100000");

  const result = useMemo(() => {
    const does = parseFloat(numDoes) || 0;
    const bucks = parseFloat(numBucks) || 0;
    const totalGoats = does + bucks;
    const kpd = parseFloat(kidsPerDoe) || 0;
    const mort = (parseFloat(mortalityRate) || 0) / 100;
    const kidsPerYear = does * kpd * (1 - mort);

    const meatRevYear = meatEnabled ? kidsPerYear * (parseFloat(avgWeightKg) || 0) * (parseFloat(meatPriceKg) || 0) : 0;
    const milkRevYear = milkEnabled ? does * (parseFloat(milkPerDayL) || 0) * (parseFloat(lactationDays) || 0) * (parseFloat(milkPriceL) || 0) : 0;
    const totalRevYear = meatRevYear + milkRevYear;

    const feedCostYear = totalGoats * (parseFloat(feedCostPerGoatMonth) || 0) * 12;
    const vetCostYear = totalGoats * (parseFloat(vetCostPerGoatYear) || 0);
    const laborCostYear = (parseFloat(laborCostMonth) || 0) * 12;
    const totalOpCostYear = feedCostYear + vetCostYear + laborCostYear;

    const netProfitYear = totalRevYear - totalOpCostYear;
    const netProfitMonth = netProfitYear / 12;

    const initialInvestment = totalGoats * (parseFloat(goatPurchasePrice) || 0) + (parseFloat(housingCost) || 0);
    const roiYears = initialInvestment > 0 && netProfitYear > 0 ? initialInvestment / netProfitYear : 0;

    return { totalGoats, kidsPerYear, meatRevYear, milkRevYear, totalRevYear, feedCostYear, vetCostYear, laborCostYear, totalOpCostYear, netProfitYear, netProfitMonth, initialInvestment, roiYears };
  }, [numDoes, numBucks, kidsPerDoe, mortalityRate, meatEnabled, avgWeightKg, meatPriceKg, milkEnabled, milkPerDayL, milkPriceL, lactationDays, feedCostPerGoatMonth, vetCostPerGoatYear, laborCostMonth, goatPurchasePrice, housingCost]);

  const fmt = (n: number) => `₹${Math.round(Math.abs(n)).toLocaleString("en-IN")}`;

  return (
    <div className="space-y-4">
      <div className="card p-6 space-y-5">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Herd Size</label>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400">Does (females)</label>
              <input type="number" value={numDoes} onChange={e => setNumDoes(e.target.value)} className="input-field" min="1" />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400">Bucks (males)</label>
              <input type="number" value={numBucks} onChange={e => setNumBucks(e.target.value)} className="input-field" min="0" />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400">Kids / Doe / Year</label>
              <input type="number" value={kidsPerDoe} onChange={e => setKidsPerDoe(e.target.value)} className="input-field" step="0.1" />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400">Mortality Rate (%)</label>
              <input type="number" value={mortalityRate} onChange={e => setMortalityRate(e.target.value)} className="input-field" />
            </div>
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Revenue Sources</label>
          <div className="flex gap-2 mb-3">
            <button onClick={() => setMeatEnabled(!meatEnabled)} className={cn("rounded-full px-4 py-1.5 text-sm font-medium transition-colors", meatEnabled ? "bg-green-700 text-white" : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400")}>
              Meat
            </button>
            <button onClick={() => setMilkEnabled(!milkEnabled)} className={cn("rounded-full px-4 py-1.5 text-sm font-medium transition-colors", milkEnabled ? "bg-green-700 text-white" : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400")}>
              Milk
            </button>
          </div>
          {meatEnabled && (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400">Avg Weight at Sale (kg)</label>
                <input type="number" value={avgWeightKg} onChange={e => setAvgWeightKg(e.target.value)} className="input-field" />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400">Live Weight Price (₹/kg)</label>
                <input type="number" value={meatPriceKg} onChange={e => setMeatPriceKg(e.target.value)} className="input-field" />
              </div>
            </div>
          )}
          {milkEnabled && (
            <div className="grid grid-cols-3 gap-3 mt-3">
              <div>
                <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400">Milk / Doe / Day (L)</label>
                <input type="number" value={milkPerDayL} onChange={e => setMilkPerDayL(e.target.value)} className="input-field" step="0.1" />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400">Milk Price (₹/L)</label>
                <input type="number" value={milkPriceL} onChange={e => setMilkPriceL(e.target.value)} className="input-field" />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400">Lactation Days / Year</label>
                <input type="number" value={lactationDays} onChange={e => setLactationDays(e.target.value)} className="input-field" />
              </div>
            </div>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Operating Costs</label>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400">Feed / Goat / Month (₹)</label>
              <input type="number" value={feedCostPerGoatMonth} onChange={e => setFeedCostPerGoatMonth(e.target.value)} className="input-field" />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400">Vet / Goat / Year (₹)</label>
              <input type="number" value={vetCostPerGoatYear} onChange={e => setVetCostPerGoatYear(e.target.value)} className="input-field" />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400">Labor / Month (₹)</label>
              <input type="number" value={laborCostMonth} onChange={e => setLaborCostMonth(e.target.value)} className="input-field" />
            </div>
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Initial Investment</label>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400">Goat Purchase Price (₹/goat)</label>
              <input type="number" value={goatPurchasePrice} onChange={e => setGoatPurchasePrice(e.target.value)} className="input-field" />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400">Housing & Equipment (₹)</label>
              <input type="number" value={housingCost} onChange={e => setHousingCost(e.target.value)} className="input-field" />
            </div>
          </div>
        </div>
      </div>

      <div className="card p-6 space-y-4">
        <h3 className="font-semibold text-gray-900 dark:text-gray-100">Annual Summary</h3>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Kids per Year", value: `${Math.round(result.kidsPerYear)}`, sub: `${result.totalGoats} goats total`, color: "bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800 text-green-900 dark:text-green-100" },
            { label: "Annual Revenue", value: fmt(result.totalRevYear), sub: [meatEnabled && "Meat", milkEnabled && "Milk"].filter(Boolean).join(" + ") || "—", color: "bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800 text-blue-900 dark:text-blue-100" },
            { label: "Annual Costs", value: fmt(result.totalOpCostYear), sub: "Feed + Vet + Labor", color: "bg-yellow-50 dark:bg-yellow-950 border-yellow-200 dark:border-yellow-800 text-yellow-900 dark:text-yellow-100" },
            { label: "Net Profit / Year", value: (result.netProfitYear < 0 ? "−" : "") + fmt(result.netProfitYear), sub: `${result.netProfitMonth < 0 ? "−" : ""}${fmt(result.netProfitMonth)}/month`, color: result.netProfitYear >= 0 ? "bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800 text-green-900 dark:text-green-100" : "bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800 text-red-900 dark:text-red-100" },
          ].map(r => (
            <div key={r.label} className={cn("rounded-xl border p-4", r.color)}>
              <div className="text-xs font-medium opacity-70 mb-1">{r.label}</div>
              <div className="text-xl font-bold">{r.value}</div>
              <div className="text-xs opacity-60 mt-0.5">{r.sub}</div>
            </div>
          ))}
        </div>
        <div className="rounded-xl bg-gray-50 dark:bg-gray-800 p-4 text-sm text-gray-600 dark:text-gray-400 space-y-1">
          {meatEnabled && <div className="flex justify-between"><span>Meat revenue / year:</span><span className="font-medium">{fmt(result.meatRevYear)}</span></div>}
          {milkEnabled && <div className="flex justify-between"><span>Milk revenue / year:</span><span className="font-medium">{fmt(result.milkRevYear)}</span></div>}
          <div className="flex justify-between"><span>Feed cost / year:</span><span className="font-medium">{fmt(result.feedCostYear)}</span></div>
          <div className="flex justify-between"><span>Vet cost / year:</span><span className="font-medium">{fmt(result.vetCostYear)}</span></div>
          <div className="flex justify-between"><span>Labor cost / year:</span><span className="font-medium">{fmt(result.laborCostYear)}</span></div>
          <div className="flex justify-between"><span>Initial investment:</span><span className="font-medium">{fmt(result.initialInvestment)}</span></div>
          <div className="flex justify-between font-semibold pt-1 border-t border-gray-200 dark:border-gray-600">
            <span>Payback period:</span>
            <span>{result.roiYears > 0 ? `${result.roiYears.toFixed(1)} years` : "—"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
