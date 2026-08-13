"use client";

import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";

type ShapeType = "rectangle" | "circle" | "irregular";
type BagSize = "40" | "50" | "60" | "80";

const BAG_WEIGHTS = {
  "40": { label: "40 lb bag", weight: 40 },
  "50": { label: "50 lb bag", weight: 50 },
  "60": { label: "60 lb bag", weight: 60 },
  "80": { label: "80 lb bag", weight: 80 },
};

const CONCRETE_DENSITY = 150; // lbs per cubic foot

export default function ConcreteCalculator() {
  const [shape, setShape] = useState<ShapeType>("rectangle");
  const [length, setLength] = useState("10");
  const [width, setWidth] = useState("10");
  const [depth, setDepth] = useState("4");
  const [radius, setRadius] = useState("5");
  const [bagSize, setBagSize] = useState<BagSize>("80");
  const [pricePerBag, setPricePerBag] = useState("5.50");
  const [waste, setWaste] = useState("10");

  const result = useMemo(() => {
    let squareFeet = 0;

    if (shape === "rectangle") {
      const l = parseFloat(length) || 0;
      const w = parseFloat(width) || 0;
      squareFeet = l * w;
    } else if (shape === "circle") {
      const r = parseFloat(radius) || 0;
      squareFeet = Math.PI * r * r;
    }

    const depthInches = parseFloat(depth) || 0;
    const depthFeet = depthInches / 12;

    const cubicFeet = squareFeet * depthFeet;
    const cubicYards = cubicFeet / 27;
    const wastePercent = (parseFloat(waste) || 0) / 100;
    const cubicYardsWithWaste = cubicYards * (1 + wastePercent);

    // Convert cubic yards to pounds
    const poundsNeeded = cubicYardsWithWaste * 27 * CONCRETE_DENSITY;
    const bagWeight = parseInt(bagSize);
    const bagsNeeded = Math.ceil(poundsNeeded / bagWeight);
    const bagsStandard = Math.ceil(cubicYards * 27 * CONCRETE_DENSITY / bagWeight);

    const cost = bagsNeeded * (parseFloat(pricePerBag) || 0);

    return {
      squareFeet,
      cubicFeet,
      cubicYards,
      cubicYardsWithWaste,
      pounds: poundsNeeded,
      bagsNeeded,
      bagsStandard,
      cost,
    };
  }, [shape, length, width, depth, radius, bagSize, pricePerBag, waste]);

  return (
    <div className="space-y-4">
      {/* Shape Selection */}
      <div className="card p-5 space-y-4">
        <div className="flex gap-2 flex-wrap">
          {(["rectangle", "circle", "irregular"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setShape(s)}
              className={cn(
                "rounded-full px-4 py-1.5 text-sm font-medium capitalize transition-colors",
                shape === s
                  ? "bg-orange-600 text-white"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
              )}
            >
              {s === "rectangle" ? "Rectangular" : s === "circle" ? "Circular" : "Irregular (Square Feet)"}
            </button>
          ))}
        </div>
      </div>

      {/* Dimensions Input */}
      <div className="card p-5 space-y-4">
        <h3 className="font-semibold text-gray-900 dark:text-gray-100">Dimensions</h3>

        {shape === "rectangle" && (
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-700 dark:text-gray-300">Length (ft)</label>
              <input type="number" value={length} onChange={(e) => setLength(e.target.value)} className="input-field" min="0" step="0.5" />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-700 dark:text-gray-300">Width (ft)</label>
              <input type="number" value={width} onChange={(e) => setWidth(e.target.value)} className="input-field" min="0" step="0.5" />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-700 dark:text-gray-300">Depth (inches)</label>
              <input type="number" value={depth} onChange={(e) => setDepth(e.target.value)} className="input-field" min="0" step="0.25" />
            </div>
          </div>
        )}

        {shape === "circle" && (
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-700 dark:text-gray-300">Radius (ft)</label>
              <input type="number" value={radius} onChange={(e) => setRadius(e.target.value)} className="input-field" min="0" step="0.5" />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-700 dark:text-gray-300">Depth (inches)</label>
              <input type="number" value={depth} onChange={(e) => setDepth(e.target.value)} className="input-field" min="0" step="0.25" />
            </div>
          </div>
        )}

        {shape === "irregular" && (
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-700 dark:text-gray-300">Area (square feet)</label>
            <input type="number" value={length} onChange={(e) => setLength(e.target.value)} className="input-field" min="0" step="0.5" placeholder="Enter total area in sq ft" />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Enter your irregular area in square feet, then specify depth</p>
            <div className="mt-3">
              <label className="mb-1 block text-xs font-medium text-gray-700 dark:text-gray-300">Depth (inches)</label>
              <input type="number" value={depth} onChange={(e) => setDepth(e.target.value)} className="input-field" min="0" step="0.25" />
            </div>
          </div>
        )}
      </div>

      {/* Concrete Settings */}
      <div className="card p-5 space-y-4">
        <h3 className="font-semibold text-gray-900 dark:text-gray-100">Concrete Settings</h3>
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-700 dark:text-gray-300">Bag Size</label>
            <select value={bagSize} onChange={(e) => setBagSize(e.target.value as BagSize)} className="input-field">
              {Object.entries(BAG_WEIGHTS).map(([size, info]) => (
                <option key={size} value={size}>{info.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-700 dark:text-gray-300">Price per Bag ($)</label>
            <input type="number" value={pricePerBag} onChange={(e) => setPricePerBag(e.target.value)} className="input-field" min="0" step="0.25" />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-700 dark:text-gray-300">Waste %</label>
            <select value={waste} onChange={(e) => setWaste(e.target.value)} className="input-field">
              <option value="5">5% (Professional)</option>
              <option value="10">10% (Standard)</option>
              <option value="15">15% (Irregular)</option>
            </select>
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
              value: `${(result.cubicYardsWithWaste as number).toFixed(2)}`,
              sub: `${(result.cubicYards as number).toFixed(2)} (base) + ${waste}% waste`,
              color: "bg-orange-50 dark:bg-orange-950 border-orange-200 dark:border-orange-800 text-orange-900 dark:text-orange-100",
            },
            {
              label: "Bags Needed",
              value: `${result.bagsNeeded}`,
              sub: `${result.bagsStandard} base + waste allowance`,
              color: "bg-amber-50 dark:bg-amber-950 border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-100",
            },
            {
              label: "Total Weight",
              value: `${((result.pounds as number) / 2000).toFixed(1)} tons`,
              sub: `${Math.round(result.pounds as number).toLocaleString()} lbs`,
              color: "bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800 text-blue-900 dark:text-blue-100",
            },
            {
              label: "Estimated Cost",
              value: `$${(result.cost as number).toFixed(2)}`,
              sub: `@ $${pricePerBag} per ${bagSize}lb bag`,
              color: "bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800 text-green-900 dark:text-green-100",
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
            <span>Area:</span>
            <span className="font-medium">{(result.squareFeet as number).toFixed(1)} sq ft</span>
          </div>
          <div className="flex justify-between">
            <span>Volume:</span>
            <span className="font-medium">{(result.cubicFeet as number).toFixed(2)} cubic ft</span>
          </div>
          <div className="flex justify-between">
            <span>Coverage per bag:</span>
            <span className="font-medium">{((result.squareFeet as number) / result.bagsNeeded).toFixed(1)} sq ft @ {depth}″ depth</span>
          </div>
        </div>
      </div>
    </div>
  );
}
