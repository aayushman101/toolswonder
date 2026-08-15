"use client";

import { useState, useMemo } from "react";

type RenoType = "kitchen" | "bathroom" | "whole_house" | "basement" | "room";
type Quality = "budget" | "mid" | "high";
type Region = "low" | "average" | "high";

interface RenoRates {
  budget: number;
  mid: number;
  high: number;
}

// National-average cost-per-sq-ft estimates by renovation type and finish tier (USD).
// Broad planning figures, not a substitute for local contractor quotes.
const RATES: Record<RenoType, RenoRates> = {
  kitchen: { budget: 100, mid: 200, high: 400 },
  bathroom: { budget: 150, mid: 250, high: 450 },
  whole_house: { budget: 20, mid: 50, high: 100 },
  basement: { budget: 25, mid: 50, high: 90 },
  room: { budget: 20, mid: 40, high: 80 },
};

const RENO_LABELS: Record<RenoType, string> = {
  kitchen: "Kitchen",
  bathroom: "Bathroom",
  whole_house: "Whole House",
  basement: "Basement",
  room: "Living Room / General Room",
};

const REGION_MULTIPLIER: Record<Region, number> = {
  low: 0.85,
  average: 1.0,
  high: 1.3,
};

const REGION_LABELS: Record<Region, string> = {
  low: "Lower Cost-of-Living Area",
  average: "National Average",
  high: "Higher Cost-of-Living Area (e.g. major metro)",
};

export default function RenovationCostCalculator() {
  const [renoType, setRenoType] = useState<RenoType>("kitchen");
  const [sqft, setSqft] = useState("150");
  const [quality, setQuality] = useState<Quality>("mid");
  const [region, setRegion] = useState<Region>("average");

  const result = useMemo(() => {
    const area = parseFloat(sqft) || 0;
    const rates = RATES[renoType];
    const multiplier = REGION_MULTIPLIER[region];

    const budgetTotal = area * rates.budget * multiplier;
    const midTotal = area * rates.mid * multiplier;
    const highTotal = area * rates.high * multiplier;

    const selectedRate = rates[quality] * multiplier;
    const selectedTotal = area * selectedRate;

    const materialsShare = 0.45;
    const laborShare = 0.55;

    return {
      budgetTotal,
      midTotal,
      highTotal,
      selectedRate,
      selectedTotal,
      materials: selectedTotal * materialsShare,
      labor: selectedTotal * laborShare,
    };
  }, [renoType, sqft, quality, region]);

  return (
    <div className="space-y-4">
      <div className="card p-5 space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Renovation Type</label>
          <select value={renoType} onChange={(e) => setRenoType(e.target.value as RenoType)} className="input-field">
            {(Object.keys(RENO_LABELS) as RenoType[]).map((t) => (
              <option key={t} value={t}>{RENO_LABELS[t]}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Area (sq ft)</label>
            <input type="number" value={sqft} onChange={(e) => setSqft(e.target.value)} className="input-field" min="0" step="10" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Finish Quality</label>
            <select value={quality} onChange={(e) => setQuality(e.target.value as Quality)} className="input-field">
              <option value="budget">Budget / Basic</option>
              <option value="mid">Mid-Range / Standard</option>
              <option value="high">High-End / Luxury</option>
            </select>
          </div>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Region Cost Level</label>
          <select value={region} onChange={(e) => setRegion(e.target.value as Region)} className="input-field">
            {(Object.keys(REGION_LABELS) as Region[]).map((r) => (
              <option key={r} value={r}>{REGION_LABELS[r]}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="card p-6 space-y-4">
        <h3 className="font-semibold text-gray-900 dark:text-gray-100">Estimated Renovation Cost</h3>

        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-lg bg-blue-50 dark:bg-blue-950 p-4">
            <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Cost per Sq Ft</div>
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">${result.selectedRate.toFixed(0)}</div>
          </div>
          <div className="rounded-lg bg-green-50 dark:bg-green-950 p-4">
            <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Estimated Total Cost</div>
            <div className="text-3xl font-bold text-green-600 dark:text-green-400">
              ${result.selectedTotal.toLocaleString(undefined, { maximumFractionDigits: 0 })}
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-gray-50 dark:bg-gray-800 p-4 text-sm space-y-2">
          <div className="text-gray-700 dark:text-gray-300 font-medium mb-1">Typical Cost Split</div>
          <div className="flex justify-between"><span className="text-gray-600 dark:text-gray-400">Materials (~45%)</span><span className="font-medium">${result.materials.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span></div>
          <div className="flex justify-between"><span className="text-gray-600 dark:text-gray-400">Labor (~55%)</span><span className="font-medium">${result.labor.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span></div>
        </div>

        <div className="rounded-lg bg-gray-50 dark:bg-gray-800 p-4 text-sm space-y-2">
          <div className="text-gray-700 dark:text-gray-300 font-medium mb-1">Cost by Finish Tier ({sqft || 0} sq ft)</div>
          <div className="flex justify-between"><span className="text-gray-600 dark:text-gray-400">Budget / Basic</span><span className="font-medium">${result.budgetTotal.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span></div>
          <div className="flex justify-between"><span className="text-gray-600 dark:text-gray-400">Mid-Range / Standard</span><span className="font-medium">${result.midTotal.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span></div>
          <div className="flex justify-between"><span className="text-gray-600 dark:text-gray-400">High-End / Luxury</span><span className="font-medium">${result.highTotal.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span></div>
        </div>

        <div className="rounded-lg border border-amber-200 bg-amber-50 dark:border-amber-900 dark:bg-amber-950/40 p-3 text-xs text-amber-800 dark:text-amber-200">
          National-average estimate for planning purposes only. Get quotes from local licensed
          contractors — permits, structural changes, and local labor rates can shift actual cost
          significantly.
        </div>
      </div>
    </div>
  );
}
