"use client";

import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";

type MulchType = "bark" | "wood" | "compost" | "pine" | "rubber";
type AreaUnit = "sqft" | "sqm";

const MULCH_TYPES: { [key in MulchType]: { label: string; density: number; notes: string } } = {
  bark: { label: "Bark Mulch", density: 400, notes: "Standard choice, good color, moderate lifespan" },
  wood: { label: "Wood Chips", density: 350, notes: "Budget-friendly, fades quickly" },
  compost: { label: "Compost Mulch", density: 600, notes: "Enriches soil, decomposes faster" },
  pine: { label: "Pine Straw", density: 80, notes: "Lightweight, good for acid-loving plants" },
  rubber: { label: "Rubber Mulch", density: 500, notes: "Long-lasting, no decomposition" },
};

export default function MulchCalculator() {
  const [areaInput, setAreaInput] = useState("100");
  const [areaUnit, setAreaUnit] = useState<AreaUnit>("sqft");
  const [depth, setDepth] = useState("3");
  const [mulchType, setMulchType] = useState<MulchType>("bark");
  const [pricePerCubicYard, setPricePerCubicYard] = useState("35");
  const [pricePerBag, setPricePerBag] = useState("4.50");
  const [bagsPerCubicYard, setBagsPerCubicYard] = useState("10");

  const result = useMemo(() => {
    // Convert area to square feet
    let sqft = parseFloat(areaInput) || 0;
    if (areaUnit === "sqm") {
      sqft = sqft * 10.764; // 1 sqm = 10.764 sqft
    }

    const depthInches = parseFloat(depth) || 0;
    const depthFeet = depthInches / 12;

    // Calculate cubic feet
    const cubicFeet = sqft * depthFeet;
    const cubicYards = cubicFeet / 27;

    // Calculate bags
    const bags = Math.ceil(cubicYards * (parseFloat(bagsPerCubicYard) || 10));

    // Calculate cost
    const costByYard = cubicYards * (parseFloat(pricePerCubicYard) || 0);
    const costByBags = bags * (parseFloat(pricePerBag) || 0);
    const avgCost = (costByYard + costByBags) / 2;

    // Calculate weight
    const mulchDensity = MULCH_TYPES[mulchType].density;
    const weightLbs = cubicYards * 27 * mulchDensity;
    const weightTons = weightLbs / 2000;

    return {
      sqft: sqft.toFixed(1),
      cubicFeet: cubicFeet.toFixed(2),
      cubicYards: cubicYards.toFixed(2),
      bags,
      costByYard: costByYard.toFixed(2),
      costByBags: costByBags.toFixed(2),
      avgCost: avgCost.toFixed(2),
      weightLbs: Math.round(weightLbs),
      weightTons: weightTons.toFixed(2),
    };
  }, [areaInput, areaUnit, depth, mulchType, pricePerCubicYard, pricePerBag, bagsPerCubicYard]);

  return (
    <div className="space-y-4">
      {/* Area Input */}
      <div className="card p-5 space-y-4">
        <h3 className="font-semibold text-gray-900 dark:text-gray-100">Garden Area</h3>
        <div className="grid grid-cols-3 gap-3">
          <div className="col-span-2">
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Area</label>
            <input
              type="number"
              value={areaInput}
              onChange={(e) => setAreaInput(e.target.value)}
              className="input-field"
              min="0"
              step="0.5"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Unit</label>
            <select value={areaUnit} onChange={(e) => setAreaUnit(e.target.value as AreaUnit)} className="input-field">
              <option value="sqft">Sq Feet</option>
              <option value="sqm">Sq Meters</option>
            </select>
          </div>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Depth (inches)</label>
          <select value={depth} onChange={(e) => setDepth(e.target.value)} className="input-field">
            <option value="1">1 inch (minimal coverage)</option>
            <option value="2">2 inches (light coverage)</option>
            <option value="3">3 inches (standard)</option>
            <option value="4">4 inches (heavy coverage)</option>
            <option value="5">5 inches (extra thick)</option>
            <option value="6">6 inches (premium look)</option>
          </select>
        </div>
      </div>

      {/* Mulch Type & Pricing */}
      <div className="card p-5 space-y-4">
        <h3 className="font-semibold text-gray-900 dark:text-gray-100">Mulch Type & Pricing</h3>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Mulch Type</label>
          <select
            value={mulchType}
            onChange={(e) => setMulchType(e.target.value as MulchType)}
            className="input-field"
          >
            {Object.entries(MULCH_TYPES).map(([key, val]) => (
              <option key={key} value={key}>{val.label}</option>
            ))}
          </select>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">{MULCH_TYPES[mulchType].notes}</p>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-700 dark:text-gray-300">Price/Cubic Yard</label>
            <input
              type="number"
              value={pricePerCubicYard}
              onChange={(e) => setPricePerCubicYard(e.target.value)}
              className="input-field"
              min="0"
              step="1"
              placeholder="$"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-700 dark:text-gray-300">Bags/Cubic Yard</label>
            <input
              type="number"
              value={bagsPerCubicYard}
              onChange={(e) => setBagsPerCubicYard(e.target.value)}
              className="input-field"
              min="1"
              step="1"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-700 dark:text-gray-300">Price/Bag</label>
            <input
              type="number"
              value={pricePerBag}
              onChange={(e) => setPricePerBag(e.target.value)}
              className="input-field"
              min="0"
              step="0.25"
              placeholder="$"
            />
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="card p-6 space-y-4">
        <h3 className="font-semibold text-gray-900 dark:text-gray-100">Results</h3>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              label: "Cubic Yards Needed",
              value: result.cubicYards,
              sub: `${result.cubicFeet} cubic feet`,
              color: "bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800 text-green-900 dark:text-green-100",
            },
            {
              label: "Bags Needed",
              value: result.bags,
              sub: `@ ${bagsPerCubicYard} bags/yd³`,
              color: "bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800 text-blue-900 dark:text-blue-100",
            },
            {
              label: "Estimated Cost",
              value: `$${result.avgCost}`,
              sub: `Range: $${result.costByBags}–$${result.costByYard}`,
              color: "bg-amber-50 dark:bg-amber-950 border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-100",
            },
            {
              label: "Total Weight",
              value: `${result.weightTons} tons`,
              sub: `${result.weightLbs.toLocaleString()} lbs`,
              color: "bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100",
            },
          ].map((r) => (
            <div key={r.label} className={cn("rounded-xl border p-4", r.color)}>
              <div className="text-xs font-medium opacity-70 mb-1">{r.label}</div>
              <div className="text-xl font-bold">{r.value}</div>
              <div className="text-xs opacity-60 mt-0.5">{r.sub}</div>
            </div>
          ))}
        </div>

        <div className="rounded-xl bg-gray-50 dark:bg-gray-800 p-4 text-sm text-gray-600 dark:text-gray-400 space-y-1.5">
          <div className="flex justify-between">
            <span>Area coverage:</span>
            <span className="font-medium">{result.sqft} sq ft @ {depth}″ depth</span>
          </div>
          <div className="flex justify-between">
            <span>Mulch type:</span>
            <span className="font-medium">{MULCH_TYPES[mulchType].label}</span>
          </div>
          <div className="flex justify-between">
            <span>Mulch density:</span>
            <span className="font-medium">{MULCH_TYPES[mulchType].density} lbs per cubic yard</span>
          </div>
          <div className="flex justify-between">
            <span>Cost per square foot:</span>
            <span className="font-medium">${(parseFloat(result.avgCost) / parseFloat(result.sqft)).toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
