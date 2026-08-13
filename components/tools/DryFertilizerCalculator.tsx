"use client";

import { useState, useMemo } from "react";
import { Copy, Check, Printer } from "lucide-react";
import { cn } from "@/lib/utils";

type AreaUnit = "sqft" | "1000sqft" | "acre" | "sqm" | "hectare";
type RateUnit = "lbsPer1000sqft" | "kgPerHa";

const FERTILIZERS = [
  { label: "10-10-10 All Purpose", n: 10, p: 10, k: 10 },
  { label: "12-12-12 Starter", n: 12, p: 12, k: 12 },
  { label: "46-0-0 Urea", n: 46, p: 0, k: 0 },
  { label: "21-0-0 Ammonium Sulfate", n: 21, p: 0, k: 0 },
  { label: "0-46-0 TSP", n: 0, p: 46, k: 0 },
  { label: "0-20-0 SSP", n: 0, p: 20, k: 0 },
  { label: "0-0-60 MOP/Potash", n: 0, p: 0, k: 60 },
  { label: "18-46-0 DAP", n: 18, p: 46, k: 0 },
  { label: "16-4-8 Lawn Blend", n: 16, p: 4, k: 8 },
  { label: "20-10-10 Veg Garden", n: 20, p: 10, k: 10 },
  { label: "5-10-10 Root/Bloom", n: 5, p: 10, k: 10 },
  { label: "Custom", n: 0, p: 0, k: 0 },
];

const AREA_TO_SQFT: Record<AreaUnit, number> = {
  sqft: 1,
  "1000sqft": 1000,
  acre: 43560,
  sqm: 10.7639,
  hectare: 107639,
};

export default function DryFertilizerCalculator() {
  const [area, setArea] = useState("10000");
  const [areaUnit, setAreaUnit] = useState<AreaUnit>("sqft");
  const [fertIdx, setFertIdx] = useState(0);
  const [customN, setCustomN] = useState("20");
  const [customP, setCustomP] = useState("10");
  const [customK, setCustomK] = useState("10");
  const [nTarget, setNTarget] = useState("1.0");
  const [pTarget, setPTarget] = useState("0");
  const [kTarget, setKTarget] = useState("0");
  const [rateUnit, setRateUnit] = useState<RateUnit>("lbsPer1000sqft");
  const [bagWeight, setBagWeight] = useState("40");
  const [price, setPrice] = useState("30");
  const [nutrient, setNutrient] = useState<"n" | "p" | "k">("n");
  const [copied, setCopied] = useState(false);

  const isCustom = fertIdx === FERTILIZERS.length - 1;
  const fert = FERTILIZERS[fertIdx];
  const fn = isCustom ? (parseFloat(customN) || 0) : fert.n;
  const fp = isCustom ? (parseFloat(customP) || 0) : fert.p;
  const fk = isCustom ? (parseFloat(customK) || 0) : fert.k;

  const result = useMemo(() => {
    const sqft = (parseFloat(area) || 0) * AREA_TO_SQFT[areaUnit];
    const ha = sqft / 107639;
    const bagWt = parseFloat(bagWeight) || 40;
    const priceVal = parseFloat(price) || 0;

    // Convert targets to lbs/1000sqft
    const toLbsPer1000 = (v: string) => {
      const val = parseFloat(v) || 0;
      if (rateUnit === "kgPerHa") return val * 0.0091827; // kg/ha → lbs/1000sqft
      return val;
    };

    const nRateL = toLbsPer1000(nTarget);
    const pRateL = toLbsPer1000(pTarget);
    const kRateL = toLbsPer1000(kTarget);

    // Figure out limiting nutrient — the one in the fertilizer
    // Determine qty needed based on selected limiting nutrient
    const primaryPct = nutrient === "n" ? fn : nutrient === "p" ? fp : fk;
    const primaryRate = nutrient === "n" ? nRateL : nutrient === "p" ? pRateL : kRateL;

    if (primaryPct === 0 || primaryRate === 0 || sqft === 0) return null;

    const productPer1000 = primaryRate / (primaryPct / 100);
    const totalProduct = productPer1000 * (sqft / 1000);
    const totalProductKg = totalProduct * 0.453592;
    const bagsNeeded = Math.ceil(totalProduct / bagWt);
    const totalCost = bagsNeeded * priceVal;

    return {
      sqft, ha,
      productPer1000,
      productPer1000kg: productPer1000 * 0.453592,
      totalProduct,
      totalProductKg,
      bagsNeeded,
      totalCost,
      nDelivered: totalProduct * (fn / 100),
      pDelivered: totalProduct * (fp / 100),
      kDelivered: totalProduct * (fk / 100),
      nPerHa: (totalProduct * (fn / 100) / ha) * 0.453592,
      pPerHa: (totalProduct * (fp / 100) / ha) * 0.453592,
      kPerHa: (totalProduct * (fk / 100) / ha) * 0.453592,
    };
  }, [area, areaUnit, fn, fp, fk, nTarget, pTarget, kTarget, rateUnit, bagWeight, price, nutrient]);

  return (
    <div className="space-y-4">
      <div className="card p-6 space-y-5">
        {/* Area */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Area</label>
            <input type="number" value={area} onChange={e => setArea(e.target.value)} className="input-field" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Area Unit</label>
            <select value={areaUnit} onChange={e => setAreaUnit(e.target.value as AreaUnit)} className="input-field">
              <option value="sqft">Square Feet (sq ft)</option>
              <option value="1000sqft">1,000 sq ft</option>
              <option value="acre">Acre</option>
              <option value="sqm">Square Meters (m²)</option>
              <option value="hectare">Hectare (ha)</option>
            </select>
          </div>
        </div>

        {/* Fertilizer */}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Fertilizer (N-P-K)</label>
          <select value={fertIdx} onChange={e => setFertIdx(parseInt(e.target.value))} className="input-field">
            {FERTILIZERS.map((f, i) => (
              <option key={i} value={i}>{f.label}</option>
            ))}
          </select>
          {!isCustom && <p className="mt-1 text-xs text-gray-400">{fert.n}% N · {fert.p}% P · {fert.k}% K</p>}
        </div>
        {isCustom && (
          <div className="grid grid-cols-3 gap-3">
            {([["N %", customN, setCustomN], ["P %", customP, setCustomP], ["K %", customK, setCustomK]] as [string, string, (v: string) => void][]).map(([label, val, setter]) => (
              <div key={label}>
                <label className="mb-1 block text-xs font-medium text-gray-600">{label}</label>
                <input type="number" value={val} onChange={e => setter(e.target.value)} className="input-field" min="0" max="100" />
              </div>
            ))}
          </div>
        )}

        {/* Rate Unit */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">Nutrient Rate Unit</label>
          <div className="flex gap-2">
            {([["lbsPer1000sqft", "lbs / 1,000 sq ft"], ["kgPerHa", "kg / hectare"]] as const).map(([val, label]) => (
              <button key={val} onClick={() => setRateUnit(val)} className={cn("rounded-full px-4 py-1.5 text-sm font-medium transition-colors", rateUnit === val ? "bg-green-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200")}>
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Target rates */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-700">
            Target Nutrient Rates ({rateUnit === "lbsPer1000sqft" ? "lbs / 1,000 sq ft" : "kg / ha"})
          </label>
          <div className="grid grid-cols-3 gap-3">
            {([["N (Nitrogen)", nTarget, setNTarget, "n"], ["P (Phosphorus)", pTarget, setPTarget, "p"], ["K (Potassium)", kTarget, setKTarget, "k"]] as [string, string, (v: string) => void, "n" | "p" | "k"][]).map(([label, val, setter, key]) => (
              <div key={key}>
                <label className="mb-1 block text-xs font-medium text-gray-600">{label}</label>
                <input type="number" value={val} onChange={e => setter(e.target.value)} className={cn("input-field", nutrient === key && "ring-2 ring-green-500")} step="0.1" min="0" onClick={() => setNutrient(key)} />
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-400">Click a field to set it as the primary nutrient for product calculation. Other nutrients are shown as targets.</p>
        </div>

        {/* Bag + Price */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Bag Size (lbs)</label>
            <select value={bagWeight} onChange={e => setBagWeight(e.target.value)} className="input-field">
              {["10", "20", "40", "50", "80"].map(v => <option key={v} value={v}>{v} lb bag</option>)}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Price per Bag ($)</label>
            <input type="number" value={price} onChange={e => setPrice(e.target.value)} className="input-field" />
          </div>
        </div>
      </div>

      {/* Results */}
      {result && (
        <div className="card p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-900">Results</h3>
            <div className="flex gap-2">
              <button onClick={() => { const label = isCustom ? `Custom ${fn}-${fp}-${fk}` : fert.label; navigator.clipboard.writeText(`Dry Fertilizer Calculator — ToolsWonder.com\nFertilizer: ${label}\nProduct: ${result.totalProduct.toFixed(1)} lbs (${result.totalProductKg.toFixed(1)} kg)\nBags (${bagWeight} lb): ${result.bagsNeeded}\nCost: $${result.totalCost.toFixed(2)}`); setCopied(true); setTimeout(() => setCopied(false), 2000); }} className="btn-secondary py-1.5 px-3 text-xs flex items-center gap-1.5">
                {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />} {copied ? "Copied!" : "Copy"}
              </button>
              <button onClick={() => window.print()} className="btn-secondary py-1.5 px-3 text-xs flex items-center gap-1.5">
                <Printer className="h-3 w-3" /> Print
              </button>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Product (lbs)", value: `${result.totalProduct.toFixed(1)} lbs`, sub: `${result.productPer1000.toFixed(2)} lbs/1,000 sqft`, color: "bg-green-50 border-green-200 text-green-900" },
              { label: "Product (kg)", value: `${result.totalProductKg.toFixed(1)} kg`, sub: `${(result.totalProductKg / result.ha).toFixed(1)} kg/ha`, color: "bg-teal-50 border-teal-200 text-teal-900" },
              { label: "Bags Needed", value: `${result.bagsNeeded}`, sub: `${bagWeight} lb bags`, color: "bg-blue-50 border-blue-200 text-blue-900" },
              { label: "Total Cost", value: `$${result.totalCost.toFixed(2)}`, sub: `$${(result.totalCost / result.bagsNeeded).toFixed(2)}/bag`, color: "bg-purple-50 border-purple-200 text-purple-900" },
            ].map(r => (
              <div key={r.label} className={cn("rounded-xl border p-4", r.color)}>
                <div className="text-xs font-medium opacity-70 mb-1">{r.label}</div>
                <div className="text-2xl font-bold">{r.value}</div>
                <div className="text-xs opacity-60 mt-0.5">{r.sub}</div>
              </div>
            ))}
          </div>

          {/* Nutrient delivery */}
          <div className="rounded-xl bg-gray-50 border border-gray-200 p-4">
            <h4 className="text-sm font-semibold text-gray-700 mb-3">Nutrients Delivered</h4>
            <div className="grid grid-cols-3 gap-4 text-center">
              {[
                { label: "Nitrogen (N)", lbs: result.nDelivered, kgha: result.nPerHa, color: "text-blue-700" },
                { label: "Phosphorus (P)", lbs: result.pDelivered, kgha: result.pPerHa, color: "text-orange-700" },
                { label: "Potassium (K)", lbs: result.kDelivered, kgha: result.kPerHa, color: "text-purple-700" },
              ].map(r => (
                <div key={r.label}>
                  <div className={cn("text-xl font-bold", r.color)}>{r.lbs.toFixed(2)} lbs</div>
                  <div className="text-xs text-gray-500">{r.kgha.toFixed(1)} kg/ha</div>
                  <div className="text-xs text-gray-400 mt-0.5">{r.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
