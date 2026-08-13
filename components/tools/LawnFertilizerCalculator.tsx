"use client";

import { useState, useMemo } from "react";
import { Copy, Check, Printer, Info } from "lucide-react";
import { cn } from "@/lib/utils";

type AreaUnit = "sqft" | "sqyards" | "acre";
type Tab = "calc" | "guide";

const FERTILIZERS = [
  { label: "30-0-10", n: 30, p: 0, k: 10, note: "High-N summer lawn" },
  { label: "16-4-8", n: 16, p: 4, k: 8, note: "Balanced complete feed" },
  { label: "24-0-6", n: 24, p: 0, k: 6, note: "Maintenance, low P" },
  { label: "15-0-15", n: 15, p: 0, k: 15, note: "High-K for drought stress" },
  { label: "32-0-6", n: 32, p: 0, k: 6, note: "Fast-release N" },
  { label: "46-0-0 Urea", n: 46, p: 0, k: 0, note: "Cheapest N source" },
  { label: "21-0-0 Amm. Sulfate", n: 21, p: 0, k: 0, note: "Acidifies, good for alkaline soil" },
  { label: "6-4-0 Milorganite", n: 6, p: 4, k: 0, note: "Organic slow-release" },
  { label: "12-12-12", n: 12, p: 12, k: 12, note: "Starter / renovation" },
  { label: "28-0-3", n: 28, p: 0, k: 3, note: "Scott's Turf Builder type" },
  { label: "Custom NPK", n: 0, p: 0, k: 0, note: "Enter your own" },
];

const toSqFt = (val: number, unit: AreaUnit): number => {
  if (unit === "sqyards") return val * 9;
  if (unit === "acre") return val * 43560;
  return val;
};

const GRASS_GUIDE = [
  { grass: "Kentucky Bluegrass", type: "Cool", spring: "0.5–0.75", summer: "0", fall: "0.75–1.0", annual: "2–4" },
  { grass: "Tall Fescue", type: "Cool", spring: "0.5", summer: "0", fall: "0.75–1.0", annual: "2–3" },
  { grass: "Perennial Ryegrass", type: "Cool", spring: "0.5–0.75", summer: "0.5", fall: "0.75–1.0", annual: "3–4" },
  { grass: "Bermudagrass", type: "Warm", spring: "1.0", summer: "1.0–1.5", fall: "0.5", annual: "4–6" },
  { grass: "Zoysia", type: "Warm", spring: "0.5", summer: "1.0", fall: "0", annual: "2–4" },
  { grass: "St. Augustine", type: "Warm", spring: "1.0", summer: "1.0", fall: "0.5", annual: "3–5" },
  { grass: "Centipede", type: "Warm", spring: "0.5", summer: "0.5", fall: "0", annual: "1–2" },
];

export default function LawnFertilizerCalculator() {
  const [tab, setTab] = useState<Tab>("calc");
  const [area, setArea] = useState("5000");
  const [areaUnit, setAreaUnit] = useState<AreaUnit>("sqft");
  const [fertIdx, setFertIdx] = useState(0);
  const [customN, setCustomN] = useState("20");
  const [customP, setCustomP] = useState("0");
  const [customK, setCustomK] = useState("10");
  const [nRate, setNRate] = useState("1.0");
  const [bagWeight, setBagWeight] = useState("40");
  const [price, setPrice] = useState("35");
  const [copied, setCopied] = useState(false);

  const isCustom = fertIdx === FERTILIZERS.length - 1;
  const fert = FERTILIZERS[fertIdx];
  const n = isCustom ? (parseFloat(customN) || 0) : fert.n;
  const p = isCustom ? (parseFloat(customP) || 0) : fert.p;
  const k = isCustom ? (parseFloat(customK) || 0) : fert.k;

  const result = useMemo(() => {
    const sqft = toSqFt(parseFloat(area) || 0, areaUnit);
    const nRateVal = parseFloat(nRate) || 0;
    const bagWt = parseFloat(bagWeight) || 40;
    const priceVal = parseFloat(price) || 0;
    if (n === 0 || nRateVal === 0 || sqft === 0) return null;
    const productPer1000 = nRateVal / (n / 100);
    const totalProduct = productPer1000 * (sqft / 1000);
    const bagsNeeded = Math.ceil(totalProduct / bagWt);
    return {
      sqft,
      productPer1000,
      totalProduct,
      bagsNeeded,
      nDelivered: totalProduct * (n / 100),
      pDelivered: totalProduct * (p / 100),
      kDelivered: totalProduct * (k / 100),
      totalCost: bagsNeeded * priceVal,
      nPer1000: nRateVal,
    };
  }, [area, areaUnit, n, p, k, nRate, bagWeight, price]);

  const handleCopy = () => {
    if (!result) return;
    const label = isCustom ? `Custom ${n}-${p}-${k}` : fert.label;
    navigator.clipboard.writeText(
      `Lawn Fertilizer Calculator — ToolsWonder.com\nArea: ${parseInt(area).toLocaleString()} ${areaUnit} (${Math.round(result.sqft).toLocaleString()} sq ft)\nFertilizer: ${label}\nN Rate: ${nRate} lbs N/1,000 sq ft\nProduct needed: ${result.totalProduct.toFixed(1)} lbs\nBags (${bagWeight} lb): ${result.bagsNeeded}\nTotal cost: $${result.totalCost.toFixed(2)}`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      {/* Tabs */}
      <div className="flex gap-1 rounded-xl bg-gray-100 p-1 w-fit">
        {([["calc", "Calculator"], ["guide", "Grass N Guide"]] as const).map(([t, label]) => (
          <button key={t} onClick={() => setTab(t)} className={cn("rounded-lg px-4 py-2 text-sm font-medium transition-colors", tab === t ? "bg-white shadow text-gray-900" : "text-gray-500 hover:text-gray-700")}>
            {label}
          </button>
        ))}
      </div>

      {tab === "calc" && (
        <>
          <div className="card p-6 space-y-5">
            {/* Area */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Lawn Area</label>
                <input type="number" value={area} onChange={e => setArea(e.target.value)} className="input-field" placeholder="5000" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Unit</label>
                <select value={areaUnit} onChange={e => setAreaUnit(e.target.value as AreaUnit)} className="input-field">
                  <option value="sqft">Square Feet (sq ft)</option>
                  <option value="sqyards">Square Yards</option>
                  <option value="acre">Acre</option>
                </select>
              </div>
            </div>

            {/* Fertilizer */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Fertilizer (N-P-K)</label>
              <select value={fertIdx} onChange={e => setFertIdx(parseInt(e.target.value))} className="input-field">
                {FERTILIZERS.map((f, i) => (
                  <option key={i} value={i}>{f.label}{i < FERTILIZERS.length - 1 ? ` — ${f.note}` : ""}</option>
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

            {/* N Rate */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Target N Rate — <span className="font-semibold text-green-600">{nRate} lbs N per 1,000 sq ft</span>
              </label>
              <div className="flex flex-wrap gap-2 mb-3">
                {([["Light", "0.5"], ["Standard", "1.0"], ["Heavy", "1.5"], ["Max", "2.0"]] as const).map(([label, val]) => (
                  <button key={val} onClick={() => setNRate(val)} className={cn("rounded-full px-3 py-1 text-xs font-medium transition-colors", nRate === val ? "bg-green-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200")}>
                    {label} ({val} lbs)
                  </button>
                ))}
              </div>
              <input type="range" min="0.25" max="2.5" step="0.25" value={nRate} onChange={e => setNRate(e.target.value)} className="w-full accent-green-600" />
              <div className="flex justify-between text-xs text-gray-400 mt-1"><span>0.25 lbs (light)</span><span>2.5 lbs (max)</span></div>
            </div>

            {/* Bag + Price */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Bag Size</label>
                <select value={bagWeight} onChange={e => setBagWeight(e.target.value)} className="input-field">
                  <option value="10">10 lb bag</option>
                  <option value="20">20 lb bag</option>
                  <option value="40">40 lb bag</option>
                  <option value="50">50 lb bag</option>
                </select>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Price per Bag ($)</label>
                <input type="number" value={price} onChange={e => setPrice(e.target.value)} className="input-field" placeholder="35" />
              </div>
            </div>
          </div>

          {/* Results */}
          {result && (
            <div className="card p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">Results</h3>
                <div className="flex gap-2">
                  <button onClick={handleCopy} className="btn-secondary py-1.5 px-3 text-xs flex items-center gap-1.5">
                    {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                    {copied ? "Copied!" : "Copy"}
                  </button>
                  <button onClick={() => window.print()} className="btn-secondary py-1.5 px-3 text-xs flex items-center gap-1.5">
                    <Printer className="h-3 w-3" /> Print
                  </button>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  { label: "Product Needed", value: `${result.totalProduct.toFixed(1)} lbs`, sub: `${result.productPer1000.toFixed(1)} lbs / 1,000 sq ft`, color: "bg-green-50 border-green-200 text-green-900" },
                  { label: "Bags to Buy", value: `${result.bagsNeeded} bags`, sub: `${bagWeight} lb bags`, color: "bg-blue-50 border-blue-200 text-blue-900" },
                  { label: "N Applied", value: `${result.nDelivered.toFixed(2)} lbs`, sub: `${result.nPer1000} lbs / 1,000 sq ft`, color: "bg-amber-50 border-amber-200 text-amber-900" },
                  { label: "Total Cost", value: `$${result.totalCost.toFixed(2)}`, sub: `$${(result.totalCost / (result.sqft / 1000)).toFixed(2)} / 1,000 sq ft`, color: "bg-purple-50 border-purple-200 text-purple-900" },
                ].map(r => (
                  <div key={r.label} className={cn("rounded-xl border p-4", r.color)}>
                    <div className="text-xs font-medium opacity-70 mb-1">{r.label}</div>
                    <div className="text-2xl font-bold">{r.value}</div>
                    <div className="text-xs opacity-60 mt-0.5">{r.sub}</div>
                  </div>
                ))}
              </div>

              {(p > 0 || k > 0) && (
                <div className="grid grid-cols-3 gap-3 rounded-xl bg-gray-50 border border-gray-200 p-4 text-center">
                  {[["N (Nitrogen)", result.nDelivered, "text-blue-700"], ["P (Phosphorus)", result.pDelivered, "text-orange-700"], ["K (Potassium)", result.kDelivered, "text-purple-700"]].map(([label, val, color]) => (
                    <div key={label as string}>
                      <div className={cn("text-xl font-bold", color as string)}>{(val as number).toFixed(2)} lbs</div>
                      <div className="text-xs text-gray-500 mt-0.5">{label as string}</div>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex items-start gap-3 rounded-lg bg-amber-50 border border-amber-200 p-4">
                <Info className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                <p className="text-sm text-amber-800">
                  <strong>Never apply more than 1 lb N per 1,000 sq ft</strong> in a single application. For higher rates, split into 2 applications 4–6 weeks apart. Water in within 24 hours.
                </p>
              </div>
            </div>
          )}
        </>
      )}

      {tab === "guide" && (
        <div className="card p-6 space-y-4">
          <h3 className="font-semibold text-gray-900">Recommended N Rates by Grass Type (lbs N / 1,000 sq ft)</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-green-50 text-left">
                  <th className="border border-gray-200 px-3 py-2.5 font-semibold">Grass</th>
                  <th className="border border-gray-200 px-3 py-2.5 font-semibold">Type</th>
                  <th className="border border-gray-200 px-3 py-2.5 font-semibold">Spring</th>
                  <th className="border border-gray-200 px-3 py-2.5 font-semibold">Summer</th>
                  <th className="border border-gray-200 px-3 py-2.5 font-semibold">Fall</th>
                  <th className="border border-gray-200 px-3 py-2.5 font-semibold">Annual Total</th>
                </tr>
              </thead>
              <tbody>
                {GRASS_GUIDE.map(r => (
                  <tr key={r.grass} className="hover:bg-gray-50 border-b border-gray-100">
                    <td className="border-l border-r border-gray-200 px-3 py-2.5 font-medium">{r.grass}</td>
                    <td className="border-r border-gray-200 px-3 py-2.5">
                      <span className={cn("rounded-full px-2 py-0.5 text-xs font-medium", r.type === "Cool" ? "bg-blue-100 text-blue-700" : "bg-orange-100 text-orange-700")}>{r.type}</span>
                    </td>
                    <td className="border-r border-gray-200 px-3 py-2.5 text-green-700">{r.spring}</td>
                    <td className="border-r border-gray-200 px-3 py-2.5 text-amber-700">{r.summer}</td>
                    <td className="border-r border-gray-200 px-3 py-2.5 text-blue-700">{r.fall}</td>
                    <td className="border-r border-gray-200 px-3 py-2.5 font-semibold">{r.annual} lbs/yr</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-400">Source: University Extension recommendations. Rates per 1,000 sq ft per application. 0 = dormant / don&apos;t fertilize.</p>
        </div>
      )}
    </div>
  );
}
