"use client";

import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";

type Unit = "ft" | "m";
type Surface = "walls" | "ceiling" | "both";

export default function PaintCalculator() {
  const [unit, setUnit] = useState<Unit>("ft");
  const [length, setLength] = useState("12");
  const [width, setWidth]   = useState("10");
  const [height, setHeight] = useState("9");
  const [doors, setDoors]   = useState("1");
  const [windows, setWindows] = useState("2");
  const [surface, setSurface] = useState<Surface>("walls");
  const [coats, setCoats]   = useState("2");
  const [coverage, setCoverage] = useState("350"); // sq ft per litre
  const [pricePerLitre, setPricePerLitre] = useState("300");

  const result = useMemo(() => {
    const toFt = unit === "m" ? 10.7639 : 1;
    const l = (parseFloat(length) || 0) * (unit === "m" ? 3.28084 : 1);
    const w = (parseFloat(width) || 0) * (unit === "m" ? 3.28084 : 1);
    const h = (parseFloat(height) || 0) * (unit === "m" ? 3.28084 : 1);
    const d = parseInt(doors) || 0;
    const win = parseInt(windows) || 0;
    const c = parseInt(coats) || 1;
    const cov = parseFloat(coverage) || 350;
    const price = parseFloat(pricePerLitre) || 0;

    const wallArea = 2 * (l + w) * h;
    const ceilArea = l * w;
    const doorArea = d * 21;   // standard door 3x7 ft
    const winArea  = win * 15; // standard window 3x5 ft

    let paintableArea = 0;
    if (surface === "walls") paintableArea = wallArea - doorArea - winArea;
    else if (surface === "ceiling") paintableArea = ceilArea;
    else paintableArea = wallArea + ceilArea - doorArea - winArea;

    const totalArea = paintableArea * c;
    const litresNeeded = totalArea / cov;
    const litresWithWaste = litresNeeded * 1.1; // 10% waste

    // Common can sizes
    const cans1L  = Math.ceil(litresWithWaste);
    const cans4L  = Math.ceil(litresWithWaste / 4);
    const cans10L = Math.ceil(litresWithWaste / 10);
    const totalCost = litresWithWaste * price;

    return { paintableArea, totalArea, litresNeeded, litresWithWaste, cans1L, cans4L, cans10L, totalCost, wallArea, ceilArea };
  }, [unit, length, width, height, doors, windows, surface, coats, coverage, pricePerLitre]);

  return (
    <div className="space-y-4">
      <div className="card p-6 space-y-5">
        {/* Unit toggle */}
        <div className="flex gap-2">
          {([["ft", "Feet (ft)"], ["m", "Meters (m)"]] as const).map(([v, l]) => (
            <button key={v} onClick={() => setUnit(v)} className={cn("rounded-full px-4 py-1.5 text-sm font-medium transition-colors", unit === v ? "bg-orange-600 text-white" : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400")}>
              {l}
            </button>
          ))}
        </div>

        {/* Room dimensions */}
        <div className="grid grid-cols-3 gap-3">
          {([["Length", length, setLength], ["Width", width, setWidth], ["Height", height, setHeight]] as [string, string, (v: string) => void][]).map(([label, val, setter]) => (
            <div key={label}>
              <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400">{label} ({unit})</label>
              <input type="number" value={val} onChange={e => setter(e.target.value)} className="input-field" min="1" />
            </div>
          ))}
        </div>

        {/* Doors & Windows */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Doors</label>
            <select value={doors} onChange={e => setDoors(e.target.value)} className="input-field">
              {["0","1","2","3","4"].map(v => <option key={v} value={v}>{v}</option>)}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Windows</label>
            <select value={windows} onChange={e => setWindows(e.target.value)} className="input-field">
              {["0","1","2","3","4","5","6"].map(v => <option key={v} value={v}>{v}</option>)}
            </select>
          </div>
        </div>

        {/* Surface */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Surface to Paint</label>
          <div className="flex gap-2">
            {([["walls","Walls Only"],["ceiling","Ceiling Only"],["both","Walls + Ceiling"]] as const).map(([v, l]) => (
              <button key={v} onClick={() => setSurface(v)} className={cn("rounded-full px-3 py-1.5 text-xs font-medium transition-colors", surface === v ? "bg-orange-600 text-white" : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400")}>
                {l}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Number of Coats</label>
            <select value={coats} onChange={e => setCoats(e.target.value)} className="input-field">
              {["1","2","3"].map(v => <option key={v} value={v}>{v}</option>)}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Coverage (sq ft/litre)</label>
            <select value={coverage} onChange={e => setCoverage(e.target.value)} className="input-field">
              <option value="150">150 – Texture/Primer</option>
              <option value="250">250 – Economy Emulsion</option>
              <option value="350">350 – Standard Emulsion</option>
              <option value="450">450 – Premium Emulsion</option>
            </select>
          </div>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Price per Litre (₹)</label>
          <input type="number" value={pricePerLitre} onChange={e => setPricePerLitre(e.target.value)} className="input-field" />
        </div>
      </div>

      <div className="card p-6 space-y-4">
        <h3 className="font-semibold text-gray-900 dark:text-gray-100">Results</h3>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Paintable Area", value: `${result.paintableArea.toFixed(1)} sq ft`, sub: `${(result.paintableArea / 10.764).toFixed(1)} m²`, color: "bg-orange-50 dark:bg-orange-950 border-orange-200 dark:border-orange-800 text-orange-900 dark:text-orange-100" },
            { label: "Paint Needed", value: `${result.litresWithWaste.toFixed(1)} L`, sub: "incl. 10% waste", color: "bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800 text-blue-900 dark:text-blue-100" },
            { label: "4L Cans", value: `${result.cans4L} cans`, sub: `or ${result.cans10L} × 10L`, color: "bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800 text-green-900 dark:text-green-100" },
            { label: "Estimated Cost", value: `₹${Math.round(result.totalCost).toLocaleString("en-IN")}`, sub: `@ ₹${pricePerLitre}/L`, color: "bg-purple-50 dark:bg-purple-950 border-purple-200 dark:border-purple-800 text-purple-900 dark:text-purple-100" },
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
          <div className="flex justify-between"><span>Ceiling area:</span><span className="font-medium">{result.ceilArea.toFixed(1)} sq ft</span></div>
          <div className="flex justify-between"><span>Total with {coats} coat(s):</span><span className="font-medium">{result.totalArea.toFixed(1)} sq ft</span></div>
          <div className="flex justify-between"><span>1L cans option:</span><span className="font-medium">{result.cans1L} × 1L cans</span></div>
        </div>
      </div>
    </div>
  );
}
