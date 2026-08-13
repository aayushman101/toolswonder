"use client";

import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";

type AreaUnit = "acre" | "hectare" | "bigha" | "sqm" | "sqft";
type Mode = "area" | "plants";

const CROPS: { name: string; et: [number, number]; kc: number }[] = [
  { name: "Tomato",          et: [4.5, 6.0], kc: 1.05 },
  { name: "Chilli / Pepper", et: [3.5, 5.0], kc: 0.95 },
  { name: "Onion",           et: [3.0, 4.5], kc: 0.90 },
  { name: "Sugarcane",       et: [5.0, 8.0], kc: 1.20 },
  { name: "Banana",          et: [6.0, 8.0], kc: 1.10 },
  { name: "Cotton",          et: [4.5, 6.5], kc: 1.05 },
  { name: "Grapes",          et: [3.5, 5.5], kc: 0.85 },
  { name: "Cucumber",        et: [4.0, 6.0], kc: 1.00 },
  { name: "Capsicum",        et: [4.0, 5.5], kc: 0.95 },
  { name: "Maize / Corn",    et: [4.0, 6.0], kc: 1.05 },
  { name: "Potato",          et: [4.0, 5.5], kc: 1.00 },
  { name: "Strawberry",      et: [3.0, 4.5], kc: 0.85 },
  { name: "Brinjal / Eggplant", et: [4.0, 5.5], kc: 1.00 },
  { name: "Cabbage / Cauliflower", et: [3.5, 5.0], kc: 0.95 },
  { name: "Mango / Citrus (Orchard)", et: [5.0, 7.0], kc: 0.90 },
  { name: "Pomegranate",     et: [4.0, 6.0], kc: 0.85 },
  { name: "Wheat",           et: [3.5, 5.0], kc: 1.00 },
  { name: "Garden / Lawn",   et: [4.0, 6.0], kc: 1.00 },
];

const SEASONS: { label: string; factor: number }[] = [
  { label: "Summer (Apr–Jun)", factor: 1.2 },
  { label: "Kharif / Monsoon (Jul–Sep)", factor: 0.7 },
  { label: "Rabi / Winter (Oct–Feb)", factor: 0.85 },
  { label: "Spring (Mar)", factor: 1.0 },
];

const AREA_UNITS: { value: AreaUnit; label: string; toSqm: number }[] = [
  { value: "acre",    label: "Acres",    toSqm: 4046.86 },
  { value: "hectare", label: "Hectares", toSqm: 10000   },
  { value: "bigha",   label: "Bigha (India, ~2529 m²)", toSqm: 2529 },
  { value: "sqm",     label: "Sq. Meters", toSqm: 1     },
  { value: "sqft",    label: "Sq. Feet",   toSqm: 0.0929 },
];

const DRIPPER_RATES = [1, 2, 4, 8, 12, 16];

function formatDuration(hours: number): string {
  if (!isFinite(hours) || hours <= 0) return "0 min";
  const h = Math.floor(hours);
  const m = Math.round((hours - h) * 60);
  if (h === 0) return `${m} min`;
  if (m === 0) return `${h} hr`;
  return `${h} hr ${m} min`;
}

export default function DripIrrigationCalculator() {
  const [mode, setMode] = useState<Mode>("area");
  const [cropIdx, setCropIdx] = useState(0);
  const [seasonIdx, setSeasonIdx] = useState(0);
  const [areaVal, setAreaVal] = useState("1");
  const [areaUnit, setAreaUnit] = useState<AreaUnit>("acre");
  const [plantCount, setPlantCount] = useState("500");
  const [rowSpacing, setRowSpacing] = useState("1.5"); // meters
  const [plantSpacing, setPlantSpacing] = useState("0.6"); // meters
  const [drippersPerPlant, setDrippersPerPlant] = useState("2");
  const [dripperRate, setDripperRate] = useState("4"); // LPH
  const [efficiency, setEfficiency] = useState("90"); // %

  const result = useMemo(() => {
    const crop = CROPS[cropIdx];
    const season = SEASONS[seasonIdx];
    const eff = (parseFloat(efficiency) || 90) / 100;
    const ratePerDripper = parseFloat(dripperRate) || 4; // LPH
    const dppPlant = Math.max(1, parseInt(drippersPerPlant) || 2);

    // Mid-season ET (average of min/max) adjusted by season factor
    const etMid = ((crop.et[0] + crop.et[1]) / 2) * crop.kc * season.factor; // mm/day

    let areaSqm = 0;
    let numPlants = 0;
    let numDrippers = 0;
    let lateralLengthM = 0;

    if (mode === "area") {
      const unitDef = AREA_UNITS.find((u) => u.value === areaUnit)!;
      areaSqm = (parseFloat(areaVal) || 0) * unitDef.toSqm;
      const rs = parseFloat(rowSpacing) || 1.5;
      const ps = parseFloat(plantSpacing) || 0.6;
      numPlants = rs > 0 && ps > 0 ? Math.round(areaSqm / (rs * ps)) : 0;
      numDrippers = numPlants * dppPlant;
      lateralLengthM = rs > 0 ? areaSqm / rs : 0;
    } else {
      numPlants = parseInt(plantCount) || 0;
      numDrippers = numPlants * dppPlant;
      // Estimate area from plants using spacing
      const rs = parseFloat(rowSpacing) || 1.5;
      const ps = parseFloat(plantSpacing) || 0.6;
      areaSqm = numPlants * rs * ps;
      lateralLengthM = areaSqm > 0 && rs > 0 ? areaSqm / rs : 0;
    }

    // Water requirement: area (m²) × ET (mm/day) × 1 L/m²/mm ÷ efficiency
    const waterReqLitersDay = areaSqm * etMid * (1 / eff); // liters/day
    const waterPerPlantLDay = numPlants > 0 ? waterReqLitersDay / numPlants : 0;

    const totalFlowLPH = numDrippers * ratePerDripper; // LPH
    const irrigationDurationHrs = totalFlowLPH > 0 ? waterReqLitersDay / totalFlowLPH : 0;

    // Flood irrigation comparison (efficiency ~45%)
    const floodWaterReq = areaSqm * etMid * (1 / 0.45);
    const waterSavedPct = ((floodWaterReq - waterReqLitersDay) / floodWaterReq) * 100;
    const waterSavedLiters = floodWaterReq - waterReqLitersDay;

    return {
      etMid,
      areaSqm,
      numPlants,
      numDrippers,
      waterReqLitersDay,
      waterPerPlantLDay,
      totalFlowLPH,
      irrigationDurationHrs,
      lateralLengthM,
      waterSavedPct,
      waterSavedLiters,
      waterReqCubicMDay: waterReqLitersDay / 1000,
    };
  }, [mode, cropIdx, seasonIdx, areaVal, areaUnit, plantCount, rowSpacing, plantSpacing, drippersPerPlant, dripperRate, efficiency]);

  return (
    <div className="space-y-4">
      {/* Mode + Season */}
      <div className="card p-5 space-y-4">
        <div className="flex flex-wrap gap-3 items-center justify-between">
          <div className="flex gap-2">
            {([["area", "By Area"], ["plants", "By Plant Count"]] as const).map(([v, l]) => (
              <button
                key={v}
                onClick={() => setMode(v)}
                className={cn(
                  "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
                  mode === v
                    ? "bg-green-600 text-white"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
                )}
              >
                {l}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Crop</label>
            <select value={cropIdx} onChange={(e) => setCropIdx(+e.target.value)} className="input-field">
              {CROPS.map((c, i) => <option key={c.name} value={i}>{c.name}</option>)}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Season</label>
            <select value={seasonIdx} onChange={(e) => setSeasonIdx(+e.target.value)} className="input-field">
              {SEASONS.map((s, i) => <option key={s.label} value={i}>{s.label}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Area / Plants */}
      <div className="card p-5 space-y-4">
        <h3 className="font-semibold text-gray-900 dark:text-gray-100">Field Details</h3>

        {mode === "area" ? (
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Area</label>
              <input type="number" value={areaVal} onChange={(e) => setAreaVal(e.target.value)} className="input-field" min="0" step="0.1" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Unit</label>
              <select value={areaUnit} onChange={(e) => setAreaUnit(e.target.value as AreaUnit)} className="input-field">
                {AREA_UNITS.map((u) => <option key={u.value} value={u.value}>{u.label}</option>)}
              </select>
            </div>
          </div>
        ) : (
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Number of Plants</label>
            <input type="number" value={plantCount} onChange={(e) => setPlantCount(e.target.value)} className="input-field" min="1" />
          </div>
        )}

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Row Spacing (m)</label>
            <input type="number" value={rowSpacing} onChange={(e) => setRowSpacing(e.target.value)} className="input-field" step="0.1" min="0.1" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Plant Spacing (m)</label>
            <input type="number" value={plantSpacing} onChange={(e) => setPlantSpacing(e.target.value)} className="input-field" step="0.1" min="0.1" />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Drippers / Plant</label>
            <select value={drippersPerPlant} onChange={(e) => setDrippersPerPlant(e.target.value)} className="input-field">
              {[1, 2, 3, 4].map((n) => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Dripper Rate (LPH)</label>
            <select value={dripperRate} onChange={(e) => setDripperRate(e.target.value)} className="input-field">
              {DRIPPER_RATES.map((r) => <option key={r} value={r}>{r} LPH</option>)}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">System Efficiency</label>
            <select value={efficiency} onChange={(e) => setEfficiency(e.target.value)} className="input-field">
              <option value="95">95% (new system)</option>
              <option value="90">90% (standard)</option>
              <option value="85">85% (aged system)</option>
              <option value="80">80% (old system)</option>
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
              label: "Daily Water Requirement",
              value: result.waterReqCubicMDay >= 1
                ? `${result.waterReqCubicMDay.toFixed(2)} m³`
                : `${Math.round(result.waterReqLitersDay).toLocaleString("en-IN")} L`,
              sub: `${result.waterPerPlantLDay.toFixed(1)} L/plant/day`,
              color: "bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800 text-blue-900 dark:text-blue-100",
            },
            {
              label: "Total Drippers",
              value: result.numDrippers.toLocaleString("en-IN"),
              sub: `${result.numPlants.toLocaleString("en-IN")} plants × ${drippersPerPlant}`,
              color: "bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800 text-green-900 dark:text-green-100",
            },
            {
              label: "Irrigation Duration",
              value: formatDuration(result.irrigationDurationHrs),
              sub: `Total flow: ${Math.round(result.totalFlowLPH).toLocaleString()} LPH`,
              color: "bg-orange-50 dark:bg-orange-950 border-orange-200 dark:border-orange-800 text-orange-900 dark:text-orange-100",
            },
            {
              label: "Water Saved vs. Flood",
              value: `${result.waterSavedPct.toFixed(0)}%`,
              sub: `Save ${(result.waterSavedLiters / 1000).toFixed(1)} m³/day`,
              color: "bg-teal-50 dark:bg-teal-950 border-teal-200 dark:border-teal-800 text-teal-900 dark:text-teal-100",
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
            <span>Crop ET rate ({SEASONS[seasonIdx].label.split(" ")[0]}):</span>
            <span className="font-medium">{result.etMid.toFixed(1)} mm/day</span>
          </div>
          <div className="flex justify-between">
            <span>Field area:</span>
            <span className="font-medium">{result.areaSqm.toFixed(0)} m² ({(result.areaSqm / 4046.86).toFixed(3)} acres)</span>
          </div>
          <div className="flex justify-between">
            <span>Lateral pipe length (approx.):</span>
            <span className="font-medium">{Math.round(result.lateralLengthM).toLocaleString()} m</span>
          </div>
          <div className="flex justify-between">
            <span>Monthly water usage:</span>
            <span className="font-medium">{(result.waterReqCubicMDay * 30).toFixed(1)} m³</span>
          </div>
        </div>
        <p className="text-xs text-gray-400 dark:text-gray-500">
          * ET values based on FAO-56 Penman-Monteith guidelines with crop coefficients. Actual requirement varies with local climate, soil, and growth stage.
        </p>
      </div>
    </div>
  );
}
