"use client";

import { useState, useMemo } from "react";
import { Copy, Check, Info } from "lucide-react";
import { cn } from "@/lib/utils";

type AreaUnit = "sqft" | "1000sqft" | "acre" | "sqm";
type Tab = "volume" | "mixing" | "hose";

const LIQUID_FERTILIZERS = [
  { label: "20-20-20 All Purpose", n: 20, p: 20, k: 20, density: 9.6 },
  { label: "10-10-10 General", n: 10, p: 10, k: 10, density: 9.2 },
  { label: "Miracle-Gro 24-8-16", n: 24, p: 8, k: 16, density: 9.0 },
  { label: "Peters 20-10-20", n: 20, p: 10, k: 20, density: 9.5 },
  { label: "Fish Emulsion 5-1-1", n: 5, p: 1, k: 1, density: 8.8 },
  { label: "Kelp / Seaweed 2-0-4", n: 2, p: 0, k: 4, density: 8.5 },
  { label: "Custom Liquid", n: 0, p: 0, k: 0, density: 9.0 },
];

const AREA_SQFT: Record<AreaUnit, number> = {
  sqft: 1,
  "1000sqft": 1000,
  acre: 43560,
  sqm: 10.7639,
};

export default function LiquidFertilizerCalculator() {
  const [tab, setTab] = useState<Tab>("volume");
  const [fertIdx, setFertIdx] = useState(0);
  const [customN, setCustomN] = useState("20");
  const [customP, setCustomP] = useState("10");
  const [customK, setCustomK] = useState("20");
  const [customDensity, setCustomDensity] = useState("9.0");
  // Volume tab
  const [area, setArea] = useState("5000");
  const [areaUnit, setAreaUnit] = useState<AreaUnit>("sqft");
  const [nRate, setNRate] = useState("0.5");
  // Mixing tab
  const [tankGal, setTankGal] = useState("2");
  const [mixOzPerGal, setMixOzPerGal] = useState("1");
  const [mixCoverageGalPer1000, setMixCoverageGalPer1000] = useState("1");
  // Hose-end tab
  const [hoseSetting, setHoseSetting] = useState("1"); // oz product per gallon from hose
  const [hoseArea, setHoseArea] = useState("2000");
  const [hoseFlowGalPer1000, setHoseFlowGalPer1000] = useState("20"); // water applied per 1000 sqft
  const [copied, setCopied] = useState(false);

  const isCustom = fertIdx === LIQUID_FERTILIZERS.length - 1;
  const fert = LIQUID_FERTILIZERS[fertIdx];
  const n = isCustom ? (parseFloat(customN) || 0) : fert.n;
  const p = isCustom ? (parseFloat(customP) || 0) : fert.p;
  const k = isCustom ? (parseFloat(customK) || 0) : fert.k;
  const density = isCustom ? (parseFloat(customDensity) || 9.0) : fert.density; // lbs/gal

  // Volume tab calc
  const volumeResult = useMemo(() => {
    const sqft = (parseFloat(area) || 0) * AREA_SQFT[areaUnit];
    const nRateVal = parseFloat(nRate) || 0;
    if (n === 0 || nRateVal === 0 || sqft === 0) return null;
    const nNeeded = nRateVal * (sqft / 1000); // lbs N
    const productLbs = nNeeded / (n / 100);
    const productGal = productLbs / density;
    const productOz = productGal * 128;
    const nPer1000Sqft = nRateVal;
    return { sqft, nNeeded, productLbs, productGal, productOz, nPer1000Sqft, pDelivered: productLbs * (p / 100), kDelivered: productLbs * (k / 100) };
  }, [area, areaUnit, n, p, k, nRate, density]);

  // Mixing tab calc
  const mixResult = useMemo(() => {
    const tankGalVal = parseFloat(tankGal) || 0;
    const ozPerGal = parseFloat(mixOzPerGal) || 0;
    const covGalPer1000 = parseFloat(mixCoverageGalPer1000) || 0;
    if (tankGalVal === 0 || ozPerGal === 0 || covGalPer1000 === 0) return null;
    const productOzPerTank = ozPerGal * tankGalVal;
    const coverageSqFt = (tankGalVal / covGalPer1000) * 1000;
    const productLbsPerTank = (productOzPerTank / 128) * density;
    const nPerTank = productLbsPerTank * (n / 100);
    const nPer1000SqFt = n > 0 ? (nPerTank / coverageSqFt) * 1000 : 0;
    return { productOzPerTank, coverageSqFt, nPerTank, nPer1000SqFt };
  }, [tankGal, mixOzPerGal, mixCoverageGalPer1000, n, density]);

  // Hose-end tab calc
  const hoseResult = useMemo(() => {
    const settingOz = parseFloat(hoseSetting) || 0; // oz of concentrate per gallon of water dispensed
    const areaSqFt = parseFloat(hoseArea) || 0;
    const waterGalPer1000 = parseFloat(hoseFlowGalPer1000) || 0;
    if (settingOz === 0 || areaSqFt === 0 || waterGalPer1000 === 0) return null;
    const totalWaterGal = (areaSqFt / 1000) * waterGalPer1000;
    const concentrateOz = settingOz * totalWaterGal;
    const concentrateGal = concentrateOz / 128;
    const concentrateLbs = concentrateGal * density;
    const nDelivered = concentrateLbs * (n / 100);
    const nPer1000 = areaSqFt > 0 ? (nDelivered / areaSqFt) * 1000 : 0;
    return { concentrateOz, concentrateGal, nDelivered, nPer1000 };
  }, [hoseSetting, hoseArea, hoseFlowGalPer1000, n, density]);

  const FertSelector = () => (
    <div className="space-y-3">
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">Liquid Fertilizer</label>
        <select value={fertIdx} onChange={e => setFertIdx(parseInt(e.target.value))} className="input-field">
          {LIQUID_FERTILIZERS.map((f, i) => (
            <option key={i} value={i}>{f.label}</option>
          ))}
        </select>
        {!isCustom && <p className="mt-1 text-xs text-gray-400">{fert.n}% N · {fert.p}% P · {fert.k}% K · density {fert.density} lbs/gal</p>}
      </div>
      {isCustom && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {([["N %", customN, setCustomN], ["P %", customP, setCustomP], ["K %", customK, setCustomK], ["Density (lbs/gal)", customDensity, setCustomDensity]] as [string, string, (v: string) => void][]).map(([label, val, setter]) => (
            <div key={label}>
              <label className="mb-1 block text-xs font-medium text-gray-600">{label}</label>
              <input type="number" value={val} onChange={e => setter(e.target.value)} className="input-field" step="0.1" min="0" />
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-4">
      {/* Tabs */}
      <div className="flex flex-wrap gap-1 rounded-xl bg-gray-100 p-1 w-fit">
        {([["volume", "How Much to Buy"], ["mixing", "Tank Mixing"], ["hose", "Hose-End Sprayer"]] as const).map(([t, label]) => (
          <button key={t} onClick={() => setTab(t)} className={cn("rounded-lg px-3 py-2 text-sm font-medium transition-colors", tab === t ? "bg-white shadow text-gray-900" : "text-gray-500 hover:text-gray-700")}>
            {label}
          </button>
        ))}
      </div>

      {/* Volume Tab */}
      {tab === "volume" && (
        <>
          <div className="card p-6 space-y-5">
            <FertSelector />
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Area</label>
                <input type="number" value={area} onChange={e => setArea(e.target.value)} className="input-field" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Unit</label>
                <select value={areaUnit} onChange={e => setAreaUnit(e.target.value as AreaUnit)} className="input-field">
                  <option value="sqft">Square Feet</option>
                  <option value="1000sqft">1,000 sq ft</option>
                  <option value="acre">Acre</option>
                  <option value="sqm">Square Meters</option>
                </select>
              </div>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Target N Rate — <span className="font-semibold text-green-600">{nRate} lbs N / 1,000 sq ft</span>
              </label>
              <div className="flex flex-wrap gap-2 mb-2">
                {([["Light", "0.25"], ["Standard", "0.5"], ["Heavy", "1.0"]] as const).map(([label, val]) => (
                  <button key={val} onClick={() => setNRate(val)} className={cn("rounded-full px-3 py-1 text-xs font-medium transition-colors", nRate === val ? "bg-green-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200")}>
                    {label} ({val})
                  </button>
                ))}
              </div>
              <input type="range" min="0.1" max="1.5" step="0.1" value={nRate} onChange={e => setNRate(e.target.value)} className="w-full accent-green-600" />
            </div>
          </div>

          {volumeResult && (
            <div className="card p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">Results</h3>
                <button onClick={() => { navigator.clipboard.writeText(`Liquid Fertilizer: ${LIQUID_FERTILIZERS[fertIdx].label}\nArea: ${parseInt(area).toLocaleString()} ${areaUnit}\nProduct needed: ${volumeResult.productOz.toFixed(1)} oz (${volumeResult.productGal.toFixed(2)} gallons)\nN delivered: ${volumeResult.nNeeded.toFixed(2)} lbs`); setCopied(true); setTimeout(() => setCopied(false), 2000); }} className="btn-secondary py-1.5 px-3 text-xs flex items-center gap-1.5">
                  {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />} {copied ? "Copied!" : "Copy"}
                </button>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  { label: "Product (oz)", value: `${volumeResult.productOz.toFixed(1)} oz`, sub: `${volumeResult.productGal.toFixed(2)} gallons`, color: "bg-green-50 border-green-200 text-green-900" },
                  { label: "N Delivered", value: `${volumeResult.nNeeded.toFixed(2)} lbs`, sub: `${nRate} lbs / 1,000 sq ft`, color: "bg-blue-50 border-blue-200 text-blue-900" },
                  { label: "Area Covered", value: `${Math.round(volumeResult.sqft).toLocaleString()} sq ft`, sub: `${(volumeResult.sqft / 43560).toFixed(3)} acres`, color: "bg-amber-50 border-amber-200 text-amber-900" },
                ].map(r => (
                  <div key={r.label} className={cn("rounded-xl border p-4", r.color)}>
                    <div className="text-xs font-medium opacity-70 mb-1">{r.label}</div>
                    <div className="text-xl font-bold">{r.value}</div>
                    <div className="text-xs opacity-60 mt-0.5">{r.sub}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {/* Mixing Tab */}
      {tab === "mixing" && (
        <>
          <div className="card p-6 space-y-5">
            <FertSelector />
            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Tank Size (gallons)</label>
                <input type="number" value={tankGal} onChange={e => setTankGal(e.target.value)} className="input-field" placeholder="2" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Dilution (oz / gallon water)</label>
                <input type="number" value={mixOzPerGal} onChange={e => setMixOzPerGal(e.target.value)} className="input-field" placeholder="1" step="0.25" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Coverage (gal mix / 1,000 sq ft)</label>
                <input type="number" value={mixCoverageGalPer1000} onChange={e => setMixCoverageGalPer1000(e.target.value)} className="input-field" placeholder="1" step="0.25" />
              </div>
            </div>
          </div>
          {mixResult && (
            <div className="card p-6 space-y-4">
              <h3 className="font-semibold text-gray-900">Mixing Results</h3>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  { label: "Concentrate / Tank", value: `${mixResult.productOzPerTank.toFixed(1)} oz`, sub: `Mix into ${tankGal} gal water` },
                  { label: "Coverage / Tank", value: `${Math.round(mixResult.coverageSqFt).toLocaleString()} sq ft`, sub: `${(mixResult.coverageSqFt / 43560).toFixed(3)} acres` },
                  { label: "N / Tank", value: `${mixResult.nPerTank.toFixed(3)} lbs`, sub: `${n}% N product` },
                  { label: "N Rate", value: `${mixResult.nPer1000SqFt.toFixed(3)} lbs`, sub: `per 1,000 sq ft` },
                ].map(r => (
                  <div key={r.label} className="rounded-xl bg-gray-50 border border-gray-200 p-4">
                    <div className="text-xs text-gray-500 mb-1">{r.label}</div>
                    <div className="text-xl font-bold text-gray-900">{r.value}</div>
                    <div className="text-xs text-gray-400 mt-0.5">{r.sub}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {/* Hose-End Tab */}
      {tab === "hose" && (
        <>
          <div className="card p-6 space-y-5">
            <FertSelector />
            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Sprayer Setting (oz conc. / gal water)</label>
                <select value={hoseSetting} onChange={e => setHoseSetting(e.target.value)} className="input-field">
                  {["0.5", "1", "1.5", "2", "3", "4"].map(v => <option key={v} value={v}>{v} oz/gal</option>)}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Area (sq ft)</label>
                <input type="number" value={hoseArea} onChange={e => setHoseArea(e.target.value)} className="input-field" placeholder="2000" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Water Applied (gal / 1,000 sq ft)</label>
                <select value={hoseFlowGalPer1000} onChange={e => setHoseFlowGalPer1000(e.target.value)} className="input-field">
                  <option value="10">10 gal (quick pass)</option>
                  <option value="20">20 gal (standard)</option>
                  <option value="32">32 gal (slow pass)</option>
                </select>
              </div>
            </div>
          </div>
          {hoseResult && (
            <div className="card p-6 space-y-4">
              <h3 className="font-semibold text-gray-900">Hose-End Results</h3>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  { label: "Concentrate Used", value: `${hoseResult.concentrateOz.toFixed(1)} oz`, sub: `${hoseResult.concentrateGal.toFixed(2)} gallons` },
                  { label: "N Delivered", value: `${hoseResult.nDelivered.toFixed(3)} lbs`, sub: `total for area` },
                  { label: "N Rate", value: `${hoseResult.nPer1000.toFixed(3)} lbs`, sub: `per 1,000 sq ft` },
                  { label: "Area Covered", value: `${parseInt(hoseArea).toLocaleString()} sq ft`, sub: `${(parseInt(hoseArea) / 43560).toFixed(3)} acres` },
                ].map(r => (
                  <div key={r.label} className="rounded-xl bg-gray-50 border border-gray-200 p-4">
                    <div className="text-xs text-gray-500 mb-1">{r.label}</div>
                    <div className="text-xl font-bold text-gray-900">{r.value}</div>
                    <div className="text-xs text-gray-400 mt-0.5">{r.sub}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      <div className="flex items-start gap-3 rounded-lg bg-blue-50 border border-blue-200 p-4">
        <Info className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
        <p className="text-sm text-blue-800">
          <strong>Tip:</strong> Liquid fertilizers are fast-acting (absorbed in 24–48 hours) but short-lasting (2–4 weeks). Use slow-release granular for maintenance and liquid for quick green-up or foliar feeding.
        </p>
      </div>
    </div>
  );
}
