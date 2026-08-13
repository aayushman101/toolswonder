"use client";

import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";

export default function PigFarmCalculator() {
  const [numSows, setNumSows] = useState("10");
  const [littersPerSowYear, setLittersPerSowYear] = useState("2.2");
  const [pigletsPerLitter, setPigletsPerLitter] = useState("10");
  const [mortalityRate, setMortalityRate] = useState("8");

  const [marketWeightKg, setMarketWeightKg] = useState("100");
  const [sellingPriceKg, setSellingPriceKg] = useState("150");
  const [daysToMarket, setDaysToMarket] = useState("170");

  const [feedConversionRatio, setFeedConversionRatio] = useState("2.8");
  const [feedPriceKg, setFeedPriceKg] = useState("25");
  const [vetCostPerPig, setVetCostPerPig] = useState("300");
  const [laborCostMonth, setLaborCostMonth] = useState("12000");

  const [sowPurchasePrice, setSowPurchasePrice] = useState("15000");
  const [housingCost, setHousingCost] = useState("200000");

  const result = useMemo(() => {
    const sows = parseFloat(numSows) || 0;
    const litters = parseFloat(littersPerSowYear) || 0;
    const ppLitter = parseFloat(pigletsPerLitter) || 0;
    const mort = (parseFloat(mortalityRate) || 0) / 100;
    const pigsPerYear = sows * litters * ppLitter * (1 - mort);

    const mktWeight = parseFloat(marketWeightKg) || 0;
    const sellPrice = parseFloat(sellingPriceKg) || 0;
    const revenuePerPig = mktWeight * sellPrice;
    const totalRevenueYear = pigsPerYear * revenuePerPig;

    const feedPerPigKg = mktWeight * (parseFloat(feedConversionRatio) || 0);
    const feedCostPerPig = feedPerPigKg * (parseFloat(feedPriceKg) || 0);
    const feedCostYear = pigsPerYear * feedCostPerPig;

    const vetCostYear = pigsPerYear * (parseFloat(vetCostPerPig) || 0);
    const laborCostYear = (parseFloat(laborCostMonth) || 0) * 12;
    const totalCostYear = feedCostYear + vetCostYear + laborCostYear;

    const netProfitYear = totalRevenueYear - totalCostYear;
    const profitPerPig = pigsPerYear > 0 ? netProfitYear / pigsPerYear : 0;

    const initialInvestment = sows * (parseFloat(sowPurchasePrice) || 0) + (parseFloat(housingCost) || 0);
    const roiYears = initialInvestment > 0 && netProfitYear > 0 ? initialInvestment / netProfitYear : 0;

    return { pigsPerYear, revenuePerPig, totalRevenueYear, feedCostPerPig, feedCostYear, vetCostYear, laborCostYear, totalCostYear, netProfitYear, profitPerPig, initialInvestment, roiYears };
  }, [numSows, littersPerSowYear, pigletsPerLitter, mortalityRate, marketWeightKg, sellingPriceKg, feedConversionRatio, feedPriceKg, vetCostPerPig, laborCostMonth, sowPurchasePrice, housingCost]);

  const fmt = (n: number) => `₹${Math.round(Math.abs(n)).toLocaleString("en-IN")}`;

  return (
    <div className="space-y-4">
      <div className="card p-6 space-y-5">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Breeding Stock</label>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400">Number of Sows</label>
              <input type="number" value={numSows} onChange={e => setNumSows(e.target.value)} className="input-field" min="1" />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400">Litters / Sow / Year</label>
              <input type="number" value={littersPerSowYear} onChange={e => setLittersPerSowYear(e.target.value)} className="input-field" step="0.1" />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400">Piglets per Litter</label>
              <input type="number" value={pigletsPerLitter} onChange={e => setPigletsPerLitter(e.target.value)} className="input-field" />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400">Mortality Rate (%)</label>
              <input type="number" value={mortalityRate} onChange={e => setMortalityRate(e.target.value)} className="input-field" />
            </div>
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Market Parameters</label>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400">Market Weight (kg)</label>
              <input type="number" value={marketWeightKg} onChange={e => setMarketWeightKg(e.target.value)} className="input-field" />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400">Selling Price (₹/kg)</label>
              <input type="number" value={sellingPriceKg} onChange={e => setSellingPriceKg(e.target.value)} className="input-field" />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400">Days to Market</label>
              <input type="number" value={daysToMarket} onChange={e => setDaysToMarket(e.target.value)} className="input-field" />
            </div>
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Feed & Production Costs</label>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400">Feed Conv. Ratio (FCR)</label>
              <input type="number" value={feedConversionRatio} onChange={e => setFeedConversionRatio(e.target.value)} className="input-field" step="0.1" />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400">Feed Price (₹/kg)</label>
              <input type="number" value={feedPriceKg} onChange={e => setFeedPriceKg(e.target.value)} className="input-field" />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400">Vet Cost / Pig (₹)</label>
              <input type="number" value={vetCostPerPig} onChange={e => setVetCostPerPig(e.target.value)} className="input-field" />
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
              <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400">Sow Purchase Price (₹/sow)</label>
              <input type="number" value={sowPurchasePrice} onChange={e => setSowPurchasePrice(e.target.value)} className="input-field" />
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
            { label: "Pigs Marketed / Year", value: `${Math.round(result.pigsPerYear)}`, sub: `${fmt(result.revenuePerPig)}/pig revenue`, color: "bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800 text-green-900 dark:text-green-100" },
            { label: "Annual Revenue", value: fmt(result.totalRevenueYear), sub: "Meat sales", color: "bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800 text-blue-900 dark:text-blue-100" },
            { label: "Annual Costs", value: fmt(result.totalCostYear), sub: "Feed + Vet + Labor", color: "bg-yellow-50 dark:bg-yellow-950 border-yellow-200 dark:border-yellow-800 text-yellow-900 dark:text-yellow-100" },
            { label: "Net Profit / Year", value: (result.netProfitYear < 0 ? "−" : "") + fmt(result.netProfitYear), sub: `${result.profitPerPig < 0 ? "−" : ""}${fmt(result.profitPerPig)}/pig`, color: result.netProfitYear >= 0 ? "bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800 text-green-900 dark:text-green-100" : "bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800 text-red-900 dark:text-red-100" },
          ].map(r => (
            <div key={r.label} className={cn("rounded-xl border p-4", r.color)}>
              <div className="text-xs font-medium opacity-70 mb-1">{r.label}</div>
              <div className="text-xl font-bold">{r.value}</div>
              <div className="text-xs opacity-60 mt-0.5">{r.sub}</div>
            </div>
          ))}
        </div>
        <div className="rounded-xl bg-gray-50 dark:bg-gray-800 p-4 text-sm text-gray-600 dark:text-gray-400 space-y-1">
          <div className="flex justify-between"><span>Feed per pig:</span><span className="font-medium">{fmt(result.feedCostPerPig)}</span></div>
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
