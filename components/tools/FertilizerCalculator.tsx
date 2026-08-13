"use client";

import { useState, useMemo } from "react";
import { Info, ChevronDown, ChevronUp, Printer, Copy, Check, Plus, Trash2, FlaskConical } from "lucide-react";
import { cn, formatNumber } from "@/lib/utils";
import { FERTILIZERS, CROPS, AREA_UNITS } from "@/lib/fertilizer/data";
import { calcFertOptions, calcBlend, toHectares, convertArea, convertRate, buildSplitSchedule, type FertOption, type BlendEntry } from "@/lib/fertilizer/engine";

type Tab = "npk" | "crop" | "blend" | "cost" | "convert";

// ─── Shared helpers ────────────────────────────────────────────────────────────

const CROP_CATEGORIES = [...new Set(CROPS.map(c => c.category))];

function NutrientBar({ label, supplied, required, color }: { label: string; supplied: number; required: number; color: string }) {
  const pct = required > 0 ? Math.min(100, (supplied / required) * 100) : 100;
  const excess = supplied > required;
  const deficit = supplied < required * 0.99;
  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-xs">
        <span className="font-medium text-gray-700">{label}</span>
        <span className={cn("font-semibold", excess ? "text-amber-600" : deficit ? "text-red-600" : "text-green-600")}>
          {formatNumber(supplied, 1)} / {formatNumber(required, 1)} kg/ha
          {excess ? " ↑" : deficit ? " ↓" : " ✓"}
        </span>
      </div>
      <div className="h-2 w-full rounded-full bg-gray-100">
        <div
          className={cn("h-2 rounded-full transition-all", excess ? "bg-amber-400" : deficit ? "bg-red-400" : color)}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

function OptionCard({ opt, req, areaHa, selected, onSelect }: {
  opt: FertOption;
  req: { n: number; p: number; k: number };
  areaHa: number;
  selected: boolean;
  onSelect: () => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const perfect = opt.deficitN < 0.1 && opt.deficitP < 0.1 && opt.deficitK < 0.1;

  return (
    <div
      className={cn(
        "card cursor-pointer border-2 transition-all hover:shadow-md",
        selected ? "border-green-500 bg-green-50/30" : "border-transparent hover:border-green-200"
      )}
      onClick={onSelect}
    >
      {/* Header */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-3">
          <div>
            {opt.badge && (
              <span className="mb-1.5 inline-block rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-700">
                {opt.badge}
              </span>
            )}
            <h3 className="font-semibold text-gray-900 text-sm">{opt.label}</h3>
            <p className="mt-0.5 text-xs text-gray-500">{opt.description}</p>
          </div>
          {selected && <div className="h-5 w-5 rounded-full bg-green-500 flex items-center justify-center shrink-0"><Check className="h-3 w-3 text-white" /></div>}
        </div>

        {/* Fertilizer table */}
        <table className="w-full text-xs mb-3">
          <thead>
            <tr className="text-gray-400 border-b border-gray-100">
              <th className="pb-1 text-left font-medium">Fertilizer</th>
              <th className="pb-1 text-right font-medium">per ha</th>
              <th className="pb-1 text-right font-medium">Total</th>
              <th className="pb-1 text-right font-medium">Cost</th>
            </tr>
          </thead>
          <tbody>
            {opt.lines.map(l => (
              <tr key={l.fertilizer.id} className="border-b border-gray-50">
                <td className="py-1.5 font-medium text-gray-800">{l.fertilizer.shortName}</td>
                <td className="py-1.5 text-right text-gray-700">{formatNumber(l.qtyPerHa, 1)} kg</td>
                <td className="py-1.5 text-right text-gray-700">{formatNumber(l.qtyTotal, 1)} kg</td>
                <td className="py-1.5 text-right text-gray-600">₹{formatNumber(l.costTotal, 0)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="font-semibold text-gray-900">
              <td className="pt-2">Total</td>
              <td className="pt-2 text-right">{formatNumber(opt.lines.reduce((s, l) => s + l.qtyPerHa, 0), 1)} kg</td>
              <td className="pt-2 text-right">{formatNumber(opt.qtyTotal, 1)} kg</td>
              <td className="pt-2 text-right text-green-700">₹{formatNumber(opt.costTotal, 0)}</td>
            </tr>
          </tfoot>
        </table>

        {/* Nutrient bars */}
        <div className="space-y-2 mb-3">
          <NutrientBar label="Nitrogen (N)" supplied={opt.totalNPerHa} required={req.n} color="bg-blue-400" />
          <NutrientBar label="Phosphorus (P₂O₅)" supplied={opt.totalPPerHa} required={req.p} color="bg-orange-400" />
          <NutrientBar label="Potassium (K₂O)" supplied={opt.totalKPerHa} required={req.k} color="bg-purple-400" />
        </div>

        {/* Cost highlight */}
        <div className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2.5">
          <span className="text-xs text-gray-500">Total Cost ({formatNumber(areaHa, 2)} ha)</span>
          <span className={cn("text-lg font-bold", perfect ? "text-green-700" : "text-amber-700")}>
            ₹{formatNumber(opt.costTotal, 0)}
          </span>
        </div>

        {/* Expand */}
        <button
          className="mt-3 flex w-full items-center justify-center gap-1 text-xs font-medium text-green-600 hover:text-green-800"
          onClick={e => { e.stopPropagation(); setExpanded(!expanded); }}
        >
          {expanded ? <><ChevronUp className="h-3.5 w-3.5" /> Hide Details</> : <><ChevronDown className="h-3.5 w-3.5" /> Nutrient Details</>}
        </button>
      </div>

      {/* Expanded nutrient detail */}
      {expanded && (
        <div className="border-t border-gray-100 px-5 pb-5 pt-3">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-gray-400 border-b border-gray-100">
                <th className="pb-1 text-left font-medium">Fertilizer</th>
                <th className="pb-1 text-right font-medium">N (kg/ha)</th>
                <th className="pb-1 text-right font-medium">P (kg/ha)</th>
                <th className="pb-1 text-right font-medium">K (kg/ha)</th>
              </tr>
            </thead>
            <tbody>
              {opt.lines.map(l => (
                <tr key={l.fertilizer.id} className="border-b border-gray-50">
                  <td className="py-1.5 font-medium text-gray-800">{l.fertilizer.shortName}</td>
                  <td className="py-1.5 text-right text-blue-700">{formatNumber(l.nSupplied, 2)}</td>
                  <td className="py-1.5 text-right text-orange-700">{formatNumber(l.pSupplied, 2)}</td>
                  <td className="py-1.5 text-right text-purple-700">{formatNumber(l.kSupplied, 2)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot className="font-semibold">
              <tr>
                <td className="pt-2 text-gray-900">Supplied</td>
                <td className="pt-2 text-right text-blue-700">{formatNumber(opt.totalNPerHa, 2)}</td>
                <td className="pt-2 text-right text-orange-700">{formatNumber(opt.totalPPerHa, 2)}</td>
                <td className="pt-2 text-right text-purple-700">{formatNumber(opt.totalKPerHa, 2)}</td>
              </tr>
              <tr>
                <td className="text-gray-500">Required</td>
                <td className="text-right text-gray-600">{formatNumber(req.n, 2)}</td>
                <td className="text-right text-gray-600">{formatNumber(req.p, 2)}</td>
                <td className="text-right text-gray-600">{formatNumber(req.k, 2)}</td>
              </tr>
              <tr>
                <td className="text-gray-500">Balance</td>
                <td className={cn("text-right", opt.excessN > 0 ? "text-amber-600" : opt.deficitN > 0 ? "text-red-600" : "text-green-600")}>
                  {opt.excessN > 0 ? `+${formatNumber(opt.excessN, 2)}` : opt.deficitN > 0 ? `-${formatNumber(opt.deficitN, 2)}` : "✓"}
                </td>
                <td className={cn("text-right", opt.excessP > 0 ? "text-amber-600" : opt.deficitP > 0 ? "text-red-600" : "text-green-600")}>
                  {opt.excessP > 0 ? `+${formatNumber(opt.excessP, 2)}` : opt.deficitP > 0 ? `-${formatNumber(opt.deficitP, 2)}` : "✓"}
                </td>
                <td className={cn("text-right", opt.excessK > 0 ? "text-amber-600" : opt.deficitK > 0 ? "text-red-600" : "text-green-600")}>
                  {opt.excessK > 0 ? `+${formatNumber(opt.excessK, 2)}` : opt.deficitK > 0 ? `-${formatNumber(opt.deficitK, 2)}` : "✓"}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      )}
    </div>
  );
}

// ─── NPK Tab ──────────────────────────────────────────────────────────────────

function NPKTab() {
  const [n, setN] = useState("120");
  const [p, setP] = useState("60");
  const [k, setK] = useState("40");
  const [area, setArea] = useState("1");
  const [areaUnit, setAreaUnit] = useState("hectare");
  const [rateUnit, setRateUnit] = useState<"kgPerHa" | "kgPerAcre">("kgPerHa");
  const [selectedOpt, setSelectedOpt] = useState(0);
  const [copied, setCopied] = useState(false);

  const areaHa = toHectares(parseFloat(area) || 1, areaUnit);

  const nKgHa = rateUnit === "kgPerAcre" ? parseFloat(n) / 0.404686 : parseFloat(n);
  const pKgHa = rateUnit === "kgPerAcre" ? parseFloat(p) / 0.404686 : parseFloat(p);
  const kKgHa = rateUnit === "kgPerAcre" ? parseFloat(k) / 0.404686 : parseFloat(k);

  const options = useMemo(() => {
    const nv = nKgHa || 0, pv = pKgHa || 0, kv = kKgHa || 0;
    if (nv + pv + kv === 0) return [];
    return calcFertOptions({ n: nv, p: pv, k: kv, areaHa });
  }, [nKgHa, pKgHa, kKgHa, areaHa]);

  const handleCopy = () => {
    if (!options[selectedOpt]) return;
    const opt = options[selectedOpt];
    const text = `Fertilizer Recommendation (${formatNumber(areaHa, 2)} ha)\n` +
      opt.lines.map(l => `${l.fertilizer.name}: ${formatNumber(l.qtyTotal, 1)} kg (₹${formatNumber(l.costTotal, 0)})`).join("\n") +
      `\nTotal Cost: ₹${formatNumber(opt.costTotal, 0)}`;
    navigator.clipboard.writeText(text).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); });
  };

  const sortedOpts = [...options].sort((a, b) => a.costTotal - b.costTotal);
  const cheapestId = sortedOpts[0]?.id;

  return (
    <div className="space-y-5">
      <div className="card p-5 space-y-4">
        {/* Area */}
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="sm:col-span-1">
            <label className="mb-1 block text-xs font-medium text-gray-600">Area</label>
            <input type="number" value={area} onChange={e => setArea(e.target.value)} className="input-field" min="0" step="any" />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-600">Area Unit</label>
            <select value={areaUnit} onChange={e => setAreaUnit(e.target.value)} className="input-field text-xs">
              {Object.entries(AREA_UNITS).map(([k, u]) => (
                <option key={k} value={k}>{u.label} ({u.symbol})</option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-600">Rate Unit</label>
            <select value={rateUnit} onChange={e => setRateUnit(e.target.value as typeof rateUnit)} className="input-field text-xs">
              <option value="kgPerHa">kg / hectare</option>
              <option value="kgPerAcre">kg / acre</option>
            </select>
          </div>
        </div>

        {/* NPK Inputs */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Nutrient Requirements ({rateUnit === "kgPerHa" ? "kg/ha" : "kg/acre"})
          </label>
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Nitrogen (N)", val: n, set: setN, color: "border-blue-300 focus:ring-blue-400", hint: "e.g. 120" },
              { label: "Phosphorus (P₂O₅)", val: p, set: setP, color: "border-orange-300 focus:ring-orange-400", hint: "e.g. 60" },
              { label: "Potassium (K₂O)", val: k, set: setK, color: "border-purple-300 focus:ring-purple-400", hint: "e.g. 40" },
            ].map(({ label, val, set, color, hint }) => (
              <div key={label}>
                <label className="mb-1 block text-xs font-medium text-gray-600">{label}</label>
                <input
                  type="number" value={val}
                  onChange={e => set(e.target.value)}
                  className={cn("input-field", color)}
                  placeholder={hint} min="0" step="any"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Area summary */}
        <div className="rounded-lg bg-green-50 border border-green-200 px-4 py-2.5 flex flex-wrap gap-4 text-sm">
          <span className="text-green-800"><strong>Area:</strong> {formatNumber(areaHa, 3)} ha = {formatNumber(areaHa * 2.47105, 3)} acres</span>
          {nKgHa > 0 && <span className="text-blue-700"><strong>N total:</strong> {formatNumber(nKgHa * areaHa, 1)} kg</span>}
          {pKgHa > 0 && <span className="text-orange-700"><strong>P total:</strong> {formatNumber(pKgHa * areaHa, 1)} kg</span>}
          {kKgHa > 0 && <span className="text-purple-700"><strong>K total:</strong> {formatNumber(kKgHa * areaHa, 1)} kg</span>}
        </div>
      </div>

      {/* Results */}
      {options.length > 0 && (
        <>
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-900">{options.length} Fertilizer Combinations</h3>
            <div className="flex gap-2">
              <button onClick={handleCopy} className="flex items-center gap-1.5 rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50">
                {copied ? <><Check className="h-3.5 w-3.5 text-green-600" /> Copied</> : <><Copy className="h-3.5 w-3.5" /> Copy</>}
              </button>
              <button onClick={() => window.print()} className="flex items-center gap-1.5 rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50">
                <Printer className="h-3.5 w-3.5" /> Print
              </button>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-2">
            {options.map((opt, i) => (
              <div key={opt.id} className="relative">
                {opt.id === cheapestId && (
                  <div className="absolute -top-2 left-4 z-10 rounded-full bg-green-600 px-2.5 py-0.5 text-xs font-bold text-white">
                    Cheapest ₹{formatNumber(opt.costTotal, 0)}
                  </div>
                )}
                <OptionCard
                  opt={opt}
                  req={{ n: nKgHa, p: pKgHa, k: kKgHa }}
                  areaHa={areaHa}
                  selected={selectedOpt === i}
                  onSelect={() => setSelectedOpt(i)}
                />
              </div>
            ))}
          </div>

          {/* Cost comparison */}
          <div className="card p-5">
            <h4 className="mb-4 text-sm font-semibold text-gray-700">Cost Comparison</h4>
            <div className="space-y-2.5">
              {[...options].sort((a, b) => a.costTotal - b.costTotal).map((opt, i) => {
                const maxCost = Math.max(...options.map(o => o.costTotal));
                const pct = (opt.costTotal / maxCost) * 100;
                return (
                  <div key={opt.id} className="flex items-center gap-3">
                    <div className="w-32 text-xs font-medium text-gray-700 truncate shrink-0">{opt.label.split("+")[0].trim()}</div>
                    <div className="flex-1 h-5 rounded-full bg-gray-100 relative">
                      <div
                        className={cn("h-5 rounded-full flex items-center justify-end pr-2", i === 0 ? "bg-green-400" : "bg-gray-300")}
                        style={{ width: `${pct}%` }}
                      >
                        <span className="text-xs font-bold text-white whitespace-nowrap">₹{formatNumber(opt.costTotal, 0)}</span>
                      </div>
                    </div>
                    <div className="text-xs text-gray-500 w-20 text-right shrink-0">
                      ₹{formatNumber(opt.costPerHa, 0)}/ha
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}

      {(nKgHa + pKgHa + kKgHa) === 0 && (
        <div className="rounded-xl border-2 border-dashed border-gray-200 py-10 text-center text-gray-400">
          <FlaskConical className="mx-auto mb-2 h-8 w-8 opacity-40" />
          <p className="text-sm">Enter N, P, K requirements above to see fertilizer recommendations</p>
        </div>
      )}
    </div>
  );
}

// ─── Crop Tab ─────────────────────────────────────────────────────────────────

function CropTab() {
  const [cropId, setCropId] = useState("rice");
  const [soilFertility, setSoilFertility] = useState<"low" | "medium" | "high">("medium");
  const [area, setArea] = useState("1");
  const [areaUnit, setAreaUnit] = useState("hectare");
  const [selectedOpt, setSelectedOpt] = useState(0);
  const [showSchedule, setShowSchedule] = useState(true);

  const crop = CROPS.find(c => c.id === cropId)!;
  const [nReq, pReq, kReq] = crop.npkPerHa[soilFertility];
  const areaHa = toHectares(parseFloat(area) || 1, areaUnit);

  const options = useMemo(() =>
    calcFertOptions({ n: nReq, p: pReq, k: kReq, areaHa }),
    [nReq, pReq, kReq, areaHa]
  );

  const schedule = useMemo(() => {
    if (!options[selectedOpt]) return [];
    return buildSplitSchedule(crop, options[selectedOpt], areaHa);
  }, [crop, options, selectedOpt, areaHa]);

  return (
    <div className="space-y-5">
      <div className="card p-5 space-y-4">
        <div className="grid gap-3 sm:grid-cols-3">
          {/* Crop selector */}
          <div className="sm:col-span-1">
            <label className="mb-1 block text-xs font-medium text-gray-600">Crop</label>
            <select value={cropId} onChange={e => setCropId(e.target.value)} className="input-field text-sm">
              {CROP_CATEGORIES.map(cat => (
                <optgroup key={cat} label={cat}>
                  {CROPS.filter(c => c.category === cat).map(c => (
                    <option key={c.id} value={c.id}>{c.name}{c.nameHi ? ` (${c.nameHi})` : ""}</option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>
          {/* Soil fertility */}
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-600">Soil Fertility</label>
            <select value={soilFertility} onChange={e => setSoilFertility(e.target.value as typeof soilFertility)} className="input-field">
              <option value="low">Low Fertility (poor soil / no soil test)</option>
              <option value="medium">Medium Fertility (average soil)</option>
              <option value="high">High Fertility (rich soil / soil test)</option>
            </select>
          </div>
          {/* Area */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600">Area</label>
              <input type="number" value={area} onChange={e => setArea(e.target.value)} className="input-field" min="0" step="any" />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600">Unit</label>
              <select value={areaUnit} onChange={e => setAreaUnit(e.target.value)} className="input-field text-xs">
                {Object.entries(AREA_UNITS).map(([k, u]) => (
                  <option key={k} value={k}>{u.symbol} – {u.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* NPK auto-filled display */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Nitrogen (N)", val: nReq, color: "bg-blue-50 border-blue-200 text-blue-800" },
            { label: "Phosphorus (P₂O₅)", val: pReq, color: "bg-orange-50 border-orange-200 text-orange-800" },
            { label: "Potassium (K₂O)", val: kReq, color: "bg-purple-50 border-purple-200 text-purple-800" },
          ].map(({ label, val, color }) => (
            <div key={label} className={cn("rounded-xl border p-3 text-center", color)}>
              <div className="text-xs font-medium opacity-80">{label}</div>
              <div className="text-2xl font-bold">{val}</div>
              <div className="text-xs opacity-70">kg/ha</div>
            </div>
          ))}
        </div>

        {/* Crop notes */}
        {crop.notes && (
          <div className="rounded-lg bg-amber-50 border border-amber-200 px-4 py-3 flex gap-2">
            <Info className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
            <div className="text-xs text-amber-800">
              <strong>Agronomic Note:</strong> {crop.notes}
              {crop.yieldTarget && <span className="ml-2 text-amber-600">• Target yield: {crop.yieldTarget}</span>}
            </div>
          </div>
        )}
      </div>

      {/* Fertilizer options */}
      <h3 className="font-semibold text-gray-900">
        Fertilizer Options for {crop.name} — {formatNumber(areaHa, 2)} ha
      </h3>
      <div className="grid gap-4 sm:grid-cols-2">
        {options.map((opt, i) => (
          <OptionCard key={opt.id} opt={opt} req={{ n: nReq, p: pReq, k: kReq }} areaHa={areaHa}
            selected={selectedOpt === i} onSelect={() => { setSelectedOpt(i); setShowSchedule(true); }} />
        ))}
      </div>

      {/* Application Schedule */}
      {showSchedule && schedule.length > 0 && (
        <div className="card p-5">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-gray-900">
              Application Schedule — {options[selectedOpt]?.label}
            </h4>
            <button onClick={() => setShowSchedule(false)} className="text-xs text-gray-400 hover:text-gray-600">Hide</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 text-left text-xs text-gray-500">
                  <th className="pb-2 pr-4 font-medium">Application</th>
                  <th className="pb-2 pr-4 font-medium">Timing</th>
                  <th className="pb-2 font-medium">Fertilizers (kg/ha → total)</th>
                </tr>
              </thead>
              <tbody>
                {schedule.map((row, i) => (
                  <tr key={i} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 pr-4 font-semibold text-gray-900 text-xs">{row.label}</td>
                    <td className="py-3 pr-4 text-xs text-gray-500 whitespace-nowrap">{row.timing}</td>
                    <td className="py-3">
                      <div className="flex flex-wrap gap-2">
                        {row.fertilizers.length > 0 ? row.fertilizers.map(f => (
                          <span key={f.name} className="inline-flex items-center gap-1 rounded-md bg-green-50 border border-green-200 px-2.5 py-1 text-xs font-medium text-green-800">
                            {f.name}: <strong>{formatNumber(f.qtyPerHa, 1)}</strong> kg/ha
                            <span className="text-green-600">({formatNumber(f.qtyTotal, 1)} kg total)</span>
                          </span>
                        )) : <span className="text-xs text-gray-400">No application</span>}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Blend Tab ────────────────────────────────────────────────────────────────

function BlendTab() {
  const [entries, setEntries] = useState<BlendEntry[]>([
    { fertId: "urea", qtyKg: 100 },
    { fertId: "dap", qtyKg: 100 },
    { fertId: "mop", qtyKg: 50 },
  ]);
  const [area, setArea] = useState("1");
  const [areaUnit, setAreaUnit] = useState("hectare");

  const areaHa = toHectares(parseFloat(area) || 1, areaUnit);
  const result = useMemo(() => calcBlend(entries.filter(e => e.qtyKg > 0)), [entries]);

  const addRow = () => setEntries(e => [...e, { fertId: "ssp", qtyKg: 0 }]);
  const removeRow = (i: number) => setEntries(e => e.filter((_, idx) => idx !== i));
  const updateRow = (i: number, field: keyof BlendEntry, val: string | number) => {
    setEntries(e => e.map((row, idx) => idx === i ? { ...row, [field]: val } : row));
  };

  return (
    <div className="space-y-5">
      <div className="card p-5 space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-sm font-semibold text-gray-700">Fertilizer Blend (per hectare)</label>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <input type="number" value={area} onChange={e => setArea(e.target.value)} className="input-field w-20 text-sm" />
              <select value={areaUnit} onChange={e => setAreaUnit(e.target.value)} className="input-field w-28 text-xs">
                {Object.entries(AREA_UNITS).map(([k, u]) => <option key={k} value={k}>{u.symbol}</option>)}
              </select>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          {entries.map((entry, i) => {
            return (
              <div key={i} className="grid grid-cols-[1fr_120px_auto] gap-2 items-center">
                <select
                  value={entry.fertId}
                  onChange={e => updateRow(i, "fertId", e.target.value)}
                  className="input-field text-sm"
                >
                  {["straight", "complex", "organic"].map(cat => (
                    <optgroup key={cat} label={cat.charAt(0).toUpperCase() + cat.slice(1)}>
                      {FERTILIZERS.filter(f => f.category === cat).map(f => (
                        <option key={f.id} value={f.id}>{f.shortName} ({f.n}-{f.p}-{f.k})</option>
                      ))}
                    </optgroup>
                  ))}
                </select>
                <div className="relative">
                  <input
                    type="number"
                    value={entry.qtyKg || ""}
                    onChange={e => updateRow(i, "qtyKg", parseFloat(e.target.value) || 0)}
                    className="input-field pr-8 text-sm"
                    placeholder="kg/ha"
                    min="0"
                  />
                  <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-gray-400">kg</span>
                </div>
                <button onClick={() => removeRow(i)} className="rounded-lg p-2 text-gray-400 hover:bg-red-50 hover:text-red-500">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            );
          })}
        </div>

        <button onClick={addRow} className="flex items-center gap-1.5 text-sm font-medium text-green-600 hover:text-green-800">
          <Plus className="h-4 w-4" /> Add Fertilizer
        </button>
      </div>

      {result.totalQty > 0 && (
        <div className="card p-5 space-y-4">
          <h3 className="font-semibold text-gray-900">Blend Analysis</h3>
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Total N", val: result.totalN, color: "bg-blue-50 border-blue-200 text-blue-800", total: result.totalN * areaHa },
              { label: "Total P₂O₅", val: result.totalP, color: "bg-orange-50 border-orange-200 text-orange-800", total: result.totalP * areaHa },
              { label: "Total K₂O", val: result.totalK, color: "bg-purple-50 border-purple-200 text-purple-800", total: result.totalK * areaHa },
            ].map(({ label, val, color, total }) => (
              <div key={label} className={cn("rounded-xl border p-4 text-center", color)}>
                <div className="text-xs font-medium opacity-80 mb-1">{label}</div>
                <div className="text-2xl font-bold">{formatNumber(val, 2)}</div>
                <div className="text-xs opacity-70">kg/ha</div>
                <div className="text-xs font-semibold mt-1">{formatNumber(total, 1)} kg total</div>
              </div>
            ))}
          </div>

          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 text-left text-xs text-gray-500">
                <th className="pb-2 font-medium">Fertilizer</th>
                <th className="pb-2 text-right font-medium">Qty (kg/ha)</th>
                <th className="pb-2 text-right font-medium">N (kg/ha)</th>
                <th className="pb-2 text-right font-medium">P (kg/ha)</th>
                <th className="pb-2 text-right font-medium">K (kg/ha)</th>
                <th className="pb-2 text-right font-medium">Cost/ha</th>
              </tr>
            </thead>
            <tbody>
              {result.lines.map(l => (
                <tr key={l.fertilizer.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-2 font-medium text-gray-900">{l.fertilizer.name}</td>
                  <td className="py-2 text-right text-gray-700">{formatNumber(l.qty, 1)}</td>
                  <td className="py-2 text-right text-blue-700">{formatNumber(l.nContrib, 2)}</td>
                  <td className="py-2 text-right text-orange-700">{formatNumber(l.pContrib, 2)}</td>
                  <td className="py-2 text-right text-purple-700">{formatNumber(l.kContrib, 2)}</td>
                  <td className="py-2 text-right text-gray-600">₹{formatNumber(l.cost, 0)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot className="font-semibold">
              <tr>
                <td className="pt-2 text-gray-900">TOTAL (per ha)</td>
                <td className="pt-2 text-right">{formatNumber(result.totalQty, 1)} kg</td>
                <td className="pt-2 text-right text-blue-700">{formatNumber(result.totalN, 2)}</td>
                <td className="pt-2 text-right text-orange-700">{formatNumber(result.totalP, 2)}</td>
                <td className="pt-2 text-right text-purple-700">{formatNumber(result.totalK, 2)}</td>
                <td className="pt-2 text-right text-green-700">₹{formatNumber(result.costPerHa, 0)}</td>
              </tr>
              <tr className="text-gray-500">
                <td className="pt-1">TOTAL ({formatNumber(areaHa, 2)} ha)</td>
                <td className="pt-1 text-right">{formatNumber(result.totalQty * areaHa, 1)} kg</td>
                <td className="pt-1 text-right">{formatNumber(result.totalN * areaHa, 1)}</td>
                <td className="pt-1 text-right">{formatNumber(result.totalP * areaHa, 1)}</td>
                <td className="pt-1 text-right">{formatNumber(result.totalK * areaHa, 1)}</td>
                <td className="pt-1 text-right text-green-700">₹{formatNumber(result.costPerHa * areaHa, 0)}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      )}
    </div>
  );
}

// ─── Cost Tab ─────────────────────────────────────────────────────────────────

function CostTab() {
  const [prices, setPrices] = useState<Record<string, string>>(() =>
    Object.fromEntries(FERTILIZERS.filter(f => f.category === "straight").map(f => [f.id, f.pricePerKg.toString()]))
  );
  const [n, setN] = useState("120");
  const [p, setP] = useState("60");
  const [k, setK] = useState("40");
  const [area, setArea] = useState("1");
  const [areaUnit, setAreaUnit] = useState("hectare");

  const areaHa = toHectares(parseFloat(area) || 1, areaUnit);

  const options = useMemo(() => {
    const nv = parseFloat(n) || 0, pv = parseFloat(p) || 0, kv = parseFloat(k) || 0;
    if (nv + pv + kv === 0) return [];
    const cp = Object.fromEntries(Object.entries(prices).map(([k, v]) => [k, parseFloat(v) || 0]));
    const s = FERTILIZERS.filter(f => f.category === "straight");
    const orig = s.map(f => [f.id, f.pricePerKg] as [string, number]);
    s.forEach(f => { if (cp[f.id]) f.pricePerKg = cp[f.id]; });
    const opts = calcFertOptions({ n: nv, p: pv, k: kv, areaHa });
    orig.forEach(([id, price]) => { const f = s.find(x => x.id === id); if (f) f.pricePerKg = price; });
    return opts;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [n, p, k, areaHa, prices]);

  const sortedOpts = [...options].sort((a, b) => a.costTotal - b.costTotal);

  return (
    <div className="space-y-5">
      <div className="card p-5 space-y-4">
        <div className="grid gap-3 sm:grid-cols-5">
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-600">Area</label>
            <input type="number" value={area} onChange={e => setArea(e.target.value)} className="input-field" />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-600">Unit</label>
            <select value={areaUnit} onChange={e => setAreaUnit(e.target.value)} className="input-field text-xs">
              {Object.entries(AREA_UNITS).map(([key, u]) => <option key={key} value={key}>{u.symbol}</option>)}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-600">N (kg/ha)</label>
            <input type="number" value={n} onChange={e => setN(e.target.value)} className="input-field" />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-600">P (kg/ha)</label>
            <input type="number" value={p} onChange={e => setP(e.target.value)} className="input-field" />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-600">K (kg/ha)</label>
            <input type="number" value={k} onChange={e => setK(e.target.value)} className="input-field" />
          </div>
        </div>

        {/* Price inputs */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">Current Fertilizer Prices (₹/kg)</label>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
            {FERTILIZERS.filter(f => f.category === "straight").slice(0, 8).map(f => (
              <div key={f.id} className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2">
                <label className="text-xs font-medium text-gray-600 w-12 shrink-0">{f.shortName}</label>
                <div className="relative flex-1">
                  <span className="absolute left-1.5 top-1/2 -translate-y-1/2 text-xs text-gray-400">₹</span>
                  <input
                    type="number"
                    value={prices[f.id] ?? f.pricePerKg}
                    onChange={e => setPrices(prev => ({ ...prev, [f.id]: e.target.value }))}
                    className="w-full rounded border-0 bg-transparent pl-4 text-sm font-medium text-gray-900 focus:outline-none"
                    min="0"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {sortedOpts.length > 0 && (
        <div className="card p-5 space-y-4">
          <h3 className="font-semibold text-gray-900">Cost-Optimized Recommendations</h3>
          <div className="space-y-3">
            {sortedOpts.map((opt, rank) => (
              <div key={opt.id} className={cn("rounded-xl border p-4", rank === 0 ? "border-green-300 bg-green-50" : "border-gray-200")}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className={cn("text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center",
                      rank === 0 ? "bg-green-600 text-white" : "bg-gray-200 text-gray-600"
                    )}>#{rank + 1}</span>
                    <span className="font-semibold text-sm text-gray-900">{opt.label}</span>
                    {rank === 0 && <span className="text-xs text-green-600 font-medium">← Cheapest</span>}
                  </div>
                  <span className="text-lg font-bold text-gray-900">₹{formatNumber(opt.costTotal, 0)}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 text-xs">
                  {opt.lines.map(l => (
                    <div key={l.fertilizer.id} className="flex justify-between bg-white rounded px-2 py-1.5 border border-gray-100">
                      <span className="text-gray-600">{l.fertilizer.shortName}</span>
                      <span className="font-medium">{formatNumber(l.qtyTotal, 1)} kg</span>
                    </div>
                  ))}
                </div>
                <div className="mt-2 flex gap-4 text-xs text-gray-500">
                  <span>₹{formatNumber(opt.costPerHa, 0)}/ha</span>
                  <span>₹{formatNumber(opt.costPerHa / 2.47, 0)}/acre</span>
                  {rank > 0 && <span className="text-red-500">+₹{formatNumber(opt.costTotal - sortedOpts[0].costTotal, 0)} more</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Convert Tab ──────────────────────────────────────────────────────────────

function ConvertTab() {
  const [areaVal, setAreaVal] = useState("1");
  const [areaFrom, setAreaFrom] = useState("acre");
  const [rateVal, setRateVal] = useState("100");
  const [rateFrom, setRateFrom] = useState<"kgPerHa" | "kgPerAcre" | "lbsPerAcre">("kgPerHa");

  const areaResults = Object.entries(AREA_UNITS).map(([key, unit]) => ({
    key, unit,
    value: convertArea(parseFloat(areaVal) || 0, areaFrom, key),
  }));

  const rateResults: { label: string; key: string; val: number }[] = [
    { label: "kg / hectare", key: "kgPerHa", val: convertRate(parseFloat(rateVal) || 0, rateFrom, "kgPerHa") },
    { label: "kg / acre", key: "kgPerAcre", val: convertRate(parseFloat(rateVal) || 0, rateFrom, "kgPerAcre") },
    { label: "lbs / acre", key: "lbsPerAcre", val: convertRate(parseFloat(rateVal) || 0, rateFrom, "lbsPerAcre") },
  ];

  return (
    <div className="space-y-6 grid gap-6 sm:grid-cols-2">
      {/* Area converter */}
      <div className="card p-5 space-y-4">
        <h3 className="font-semibold text-gray-900">Area Converter</h3>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-600">Area</label>
            <input type="number" value={areaVal} onChange={e => setAreaVal(e.target.value)} className="input-field" min="0" />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-600">From Unit</label>
            <select value={areaFrom} onChange={e => setAreaFrom(e.target.value)} className="input-field text-xs">
              {Object.entries(AREA_UNITS).map(([k, u]) => <option key={k} value={k}>{u.label}</option>)}
            </select>
          </div>
        </div>
        <div className="space-y-1.5 max-h-80 overflow-y-auto">
          {areaResults.map(({ key, unit, value }) => (
            <div key={key} className={cn("flex justify-between rounded-lg px-3 py-2 text-sm", key === areaFrom ? "bg-green-50 border border-green-200" : "bg-gray-50")}>
              <span className="text-gray-600">{unit.label}</span>
              <span className="font-semibold text-gray-900">{formatNumber(value, 4)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Rate converter */}
      <div className="card p-5 space-y-4">
        <h3 className="font-semibold text-gray-900">Nutrient Rate Converter</h3>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-600">Rate</label>
            <input type="number" value={rateVal} onChange={e => setRateVal(e.target.value)} className="input-field" min="0" />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-600">From Unit</label>
            <select value={rateFrom} onChange={e => setRateFrom(e.target.value as typeof rateFrom)} className="input-field">
              <option value="kgPerHa">kg / hectare</option>
              <option value="kgPerAcre">kg / acre</option>
              <option value="lbsPerAcre">lbs / acre</option>
            </select>
          </div>
        </div>
        <div className="space-y-1.5">
          {rateResults.map(r => (
            <div key={r.key} className={cn("flex justify-between rounded-lg px-3 py-2.5 text-sm", r.key === rateFrom ? "bg-green-50 border border-green-200" : "bg-gray-50")}>
              <span className="text-gray-600">{r.label}</span>
              <span className="font-semibold text-gray-900">{formatNumber(r.val, 4)}</span>
            </div>
          ))}
        </div>

        {/* Quick reference */}
        <div className="mt-4 border-t border-gray-100 pt-4">
          <h4 className="mb-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Quick Reference</h4>
          <div className="space-y-1.5 text-xs text-gray-600">
            {[
              "1 kg/ha = 0.89 lbs/acre",
              "1 kg/ha = 0.405 kg/acre",
              "1 lbs/acre = 1.12 kg/ha",
              "1 acre = 0.4047 hectare",
              "1 hectare = 2.471 acres",
              "1 acre = 43,560 sq ft",
            ].map(s => <div key={s} className="flex items-center gap-2"><span className="text-green-500">•</span>{s}</div>)}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function FertilizerCalculator({ defaultTab = "npk" }: { defaultTab?: Tab }) {
  const [tab, setTab] = useState<Tab>(defaultTab);

  const tabs: { id: Tab; label: string; desc: string }[] = [
    { id: "npk", label: "NPK Calculator", desc: "Enter N, P, K requirements" },
    { id: "crop", label: "Crop Calculator", desc: "Select crop for auto recommendation" },
    { id: "blend", label: "Blend Analyzer", desc: "Mix fertilizers & analyze" },
    { id: "cost", label: "Cost Optimizer", desc: "Find cheapest combination" },
    { id: "convert", label: "Unit Converter", desc: "Area & rate conversions" },
  ];

  return (
    <div className="space-y-5">
      {/* Tabs */}
      <div className="border-b border-gray-200">
        <div className="flex gap-0 overflow-x-auto">
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={cn(
                "flex-shrink-0 border-b-2 px-4 py-3 text-sm font-medium transition-colors",
                tab === t.id
                  ? "border-green-600 text-green-700"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              )}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {tab === "npk" && <NPKTab />}
      {tab === "crop" && <CropTab />}
      {tab === "blend" && <BlendTab />}
      {tab === "cost" && <CostTab />}
      {tab === "convert" && <ConvertTab />}
    </div>
  );
}
