"use client";

import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";

type Unit = "ft" | "m" | "inch";
type BrickSize = "standard" | "modular" | "jumbo" | "custom";

const BRICK_SIZES: Record<BrickSize, { l: number; h: number; w: number; label: string }> = {
  standard: { l: 9,   h: 3,   w: 4.5,  label: "Standard Indian (9×4.5×3 in)" },
  modular:  { l: 7.5, h: 2.5, w: 3.5,  label: "Modular (7.5×3.5×2.5 in)" },
  jumbo:    { l: 11.5,h: 3.5, w: 5.5,  label: "Jumbo (11.5×5.5×3.5 in)" },
  custom:   { l: 9,   h: 3,   w: 4.5,  label: "Custom" },
};

export default function BrickCalculator() {
  const [unit, setUnit] = useState<"ft" | "m">("ft");
  const [wallL, setWallL] = useState("20");
  const [wallH, setWallH] = useState("10");
  const [wallT, setWallT] = useState("9"); // thickness in inches
  const [brickSize, setBrickSize] = useState<BrickSize>("standard");
  const [customL, setCustomL] = useState("9");
  const [customH, setCustomH] = useState("3");
  const [customW, setCustomW] = useState("4.5");
  const [joint, setJoint] = useState("0.5"); // mortar joint in inches
  const [waste, setWaste] = useState("10");
  const [pricePerBrick, setPricePerBrick] = useState("8");
  const [cementBagPrice, setCementBagPrice] = useState("400");

  const result = useMemo(() => {
    const toFt = unit === "m" ? 3.28084 : 1;
    const l = (parseFloat(wallL) || 0) * toFt;
    const h = (parseFloat(wallH) || 0) * toFt;
    const thickIn = parseFloat(wallT) || 9;
    const j = parseFloat(joint) || 0.5;
    const w = parseFloat(waste) || 10;

    const bs = brickSize === "custom"
      ? { l: parseFloat(customL) || 9, h: parseFloat(customH) || 3, w: parseFloat(customW) || 4.5 }
      : BRICK_SIZES[brickSize];

    const wallArea = l * h; // sq ft
    const wallVolume = wallArea * (thickIn / 12); // cubic ft

    // Brick volume including mortar joint
    const brickVolume = ((bs.l + j) * (bs.h + j) * (thickIn)) / 1728; // cubic ft
    const bricksPerCuFt = 1 / brickVolume;
    const bricksNeeded = Math.ceil(wallVolume * bricksPerCuFt);
    const bricksWithWaste = Math.ceil(bricksNeeded * (1 + w / 100));

    // Mortar estimation: ~0.3 cubic ft per brick (standard)
    const mortarVolume = wallVolume * 0.25; // rough 25% of wall volume is mortar
    const cementBags = Math.ceil(mortarVolume * 1.5); // ~1 bag per 0.67 cu ft
    const sandCuFt = mortarVolume * 4; // 1:4 mix

    const brickCost = bricksWithWaste * parseFloat(pricePerBrick || "0");
    const cementCost = cementBags * parseFloat(cementBagPrice || "0");
    const totalCost = brickCost + cementCost;

    return { wallArea, wallVolume, bricksNeeded, bricksWithWaste, mortarVolume, cementBags, sandCuFt, brickCost, cementCost, totalCost };
  }, [unit, wallL, wallH, wallT, brickSize, customL, customH, customW, joint, waste, pricePerBrick, cementBagPrice]);

  return (
    <div className="space-y-4">
      <div className="card p-6 space-y-5">
        {/* Unit */}
        <div className="flex gap-2">
          {([["ft","Feet"],["m","Meters"]] as const).map(([v,l]) => (
            <button key={v} onClick={() => setUnit(v)} className={cn("rounded-full px-4 py-1.5 text-sm font-medium transition-colors", unit === v ? "bg-orange-700 text-white" : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400")}>
              {l}
            </button>
          ))}
        </div>

        {/* Wall dimensions */}
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400">Length ({unit})</label>
            <input type="number" value={wallL} onChange={e => setWallL(e.target.value)} className="input-field" />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400">Height ({unit})</label>
            <input type="number" value={wallH} onChange={e => setWallH(e.target.value)} className="input-field" />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400">Thickness (inches)</label>
            <select value={wallT} onChange={e => setWallT(e.target.value)} className="input-field">
              <option value="4.5">4.5 in – Half brick</option>
              <option value="9">9 in – Single brick</option>
              <option value="13.5">13.5 in – One & half</option>
              <option value="18">18 in – Double brick</option>
            </select>
          </div>
        </div>

        {/* Brick size */}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Brick Size</label>
          <select value={brickSize} onChange={e => setBrickSize(e.target.value as BrickSize)} className="input-field">
            {(Object.entries(BRICK_SIZES) as [BrickSize, typeof BRICK_SIZES[BrickSize]][]).map(([k, v]) => (
              <option key={k} value={k}>{v.label}</option>
            ))}
          </select>
        </div>
        {brickSize === "custom" && (
          <div className="grid grid-cols-3 gap-3">
            {([["Length", customL, setCustomL], ["Height", customH, setCustomH], ["Width", customW, setCustomW]] as [string, string, (v: string) => void][]).map(([label, val, setter]) => (
              <div key={label}>
                <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400">{label} (in)</label>
                <input type="number" value={val} onChange={e => setter(e.target.value)} className="input-field" step="0.5" />
              </div>
            ))}
          </div>
        )}

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Mortar Joint (inches)</label>
            <select value={joint} onChange={e => setJoint(e.target.value)} className="input-field">
              <option value="0.375">3/8 in (thin)</option>
              <option value="0.5">1/2 in (standard)</option>
              <option value="0.75">3/4 in (thick)</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Waste %</label>
            <select value={waste} onChange={e => setWaste(e.target.value)} className="input-field">
              <option value="5">5% – Experienced mason</option>
              <option value="10">10% – Standard</option>
              <option value="15">15% – Complex layout</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Price per Brick (₹)</label>
            <input type="number" value={pricePerBrick} onChange={e => setPricePerBrick(e.target.value)} className="input-field" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Cement Bag Price (₹)</label>
            <input type="number" value={cementBagPrice} onChange={e => setCementBagPrice(e.target.value)} className="input-field" />
          </div>
        </div>
      </div>

      <div className="card p-6 space-y-4">
        <h3 className="font-semibold text-gray-900 dark:text-gray-100">Results</h3>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Bricks Needed", value: result.bricksWithWaste.toLocaleString("en-IN"), sub: `${result.bricksNeeded.toLocaleString("en-IN")} + ${waste}% waste`, color: "bg-orange-50 dark:bg-orange-950 border-orange-200 dark:border-orange-800 text-orange-900 dark:text-orange-100" },
            { label: "Cement Bags", value: `${result.cementBags}`, sub: "50kg bags (1:4 mix)", color: "bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100" },
            { label: "Sand Required", value: `${result.sandCuFt.toFixed(1)} cu ft`, sub: `${(result.sandCuFt / 100).toFixed(2)} brass`, color: "bg-yellow-50 dark:bg-yellow-950 border-yellow-200 dark:border-yellow-800 text-yellow-900 dark:text-yellow-100" },
            { label: "Estimated Cost", value: `₹${Math.round(result.totalCost).toLocaleString("en-IN")}`, sub: "Bricks + Cement", color: "bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800 text-green-900 dark:text-green-100" },
          ].map(r => (
            <div key={r.label} className={cn("rounded-xl border p-4", r.color)}>
              <div className="text-xs font-medium opacity-70 mb-1">{r.label}</div>
              <div className="text-xl font-bold">{r.value}</div>
              <div className="text-xs opacity-60 mt-0.5">{r.sub}</div>
            </div>
          ))}
        </div>
        <div className="rounded-xl bg-gray-50 dark:bg-gray-800 p-4 text-sm text-gray-600 dark:text-gray-400 space-y-1">
          <div className="flex justify-between"><span>Wall area:</span><span className="font-medium">{result.wallArea.toFixed(1)} sq ft</span></div>
          <div className="flex justify-between"><span>Wall volume:</span><span className="font-medium">{result.wallVolume.toFixed(2)} cu ft</span></div>
          <div className="flex justify-between"><span>Brick cost:</span><span className="font-medium">₹{Math.round(result.brickCost).toLocaleString("en-IN")}</span></div>
          <div className="flex justify-between"><span>Cement cost:</span><span className="font-medium">₹{Math.round(result.cementCost).toLocaleString("en-IN")}</span></div>
        </div>
      </div>
    </div>
  );
}
