"use client";

import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";

type ApplianceRow = {
  id: number;
  name: string;
  watts: number;
  qty: number;
  hours: number;
};

const COMMON_APPLIANCES = [
  { name: "Ceiling Fan", watts: 75 },
  { name: "LED Bulb (10W)", watts: 10 },
  { name: "LED Tube Light (20W)", watts: 20 },
  { name: "Refrigerator (200L)", watts: 150 },
  { name: "Refrigerator (400L)", watts: 250 },
  { name: "Television (32\" LED)", watts: 55 },
  { name: "Television (43\" LED)", watts: 80 },
  { name: "Television (55\" LED)", watts: 120 },
  { name: "Air Conditioner (1 Ton)", watts: 1000 },
  { name: "Air Conditioner (1.5 Ton)", watts: 1500 },
  { name: "Air Conditioner (2 Ton)", watts: 2000 },
  { name: "Washing Machine", watts: 500 },
  { name: "Geyser / Water Heater (2kW)", watts: 2000 },
  { name: "Geyser / Water Heater (3kW)", watts: 3000 },
  { name: "Water Pump (0.5HP)", watts: 375 },
  { name: "Water Pump (1HP)", watts: 746 },
  { name: "Microwave Oven", watts: 1200 },
  { name: "Electric Iron", watts: 1000 },
  { name: "Induction Cooktop", watts: 1800 },
  { name: "Mixer / Grinder", watts: 500 },
  { name: "Electric Kettle", watts: 1500 },
  { name: "Computer (Desktop)", watts: 300 },
  { name: "Laptop", watts: 65 },
  { name: "Router / Modem", watts: 10 },
  { name: "Hair Dryer", watts: 1200 },
  { name: "Toaster", watts: 800 },
  { name: "Exhaust Fan", watts: 35 },
  { name: "Submersible Pump (1HP)", watts: 746 },
  { name: "Custom Appliance", watts: 0 },
];

const RESIDENTIAL_PRESET: Omit<ApplianceRow, "id">[] = [
  { name: "Ceiling Fan", watts: 75, qty: 3, hours: 8 },
  { name: "LED Bulb (10W)", watts: 10, qty: 6, hours: 6 },
  { name: "Refrigerator (200L)", watts: 150, qty: 1, hours: 24 },
  { name: "Television (43\" LED)", watts: 80, qty: 1, hours: 5 },
  { name: "Washing Machine", watts: 500, qty: 1, hours: 1 },
  { name: "Water Pump (0.5HP)", watts: 375, qty: 1, hours: 2 },
  { name: "Geyser / Water Heater (2kW)", watts: 2000, qty: 1, hours: 1 },
  { name: "Air Conditioner (1.5 Ton)", watts: 1500, qty: 1, hours: 6 },
];

const COMMERCIAL_PRESET: Omit<ApplianceRow, "id">[] = [
  { name: "LED Tube Light (20W)", watts: 20, qty: 10, hours: 10 },
  { name: "Ceiling Fan", watts: 75, qty: 5, hours: 10 },
  { name: "Computer (Desktop)", watts: 300, qty: 5, hours: 8 },
  { name: "Air Conditioner (1.5 Ton)", watts: 1500, qty: 2, hours: 8 },
  { name: "Refrigerator (200L)", watts: 150, qty: 1, hours: 24 },
  { name: "Microwave Oven", watts: 1200, qty: 1, hours: 1 },
  { name: "Electric Kettle", watts: 1500, qty: 1, hours: 1 },
];

const BREAKER_SIZES = [6, 10, 16, 20, 25, 32, 40, 50, 63, 80, 100, 125, 160, 200];

function recommendBreaker(amps: number): number {
  return BREAKER_SIZES.find((s) => s >= amps * 1.25) ?? 200;
}

let nextId = 1;
function makeRows(preset: Omit<ApplianceRow, "id">[]): ApplianceRow[] {
  return preset.map((p) => ({ ...p, id: nextId++ }));
}

export default function ElectricalLoadCalculator() {
  const [preset, setPreset] = useState<"residential" | "commercial">("residential");
  const [rows, setRows] = useState<ApplianceRow[]>(() => makeRows(RESIDENTIAL_PRESET));
  const [powerFactor, setPowerFactor] = useState("0.85");
  const [rate, setRate] = useState("8");
  const [phase, setPhase] = useState<"single" | "three">("single");
  const [quickAdd, setQuickAdd] = useState("");
  const [customWatts, setCustomWatts] = useState("");

  function switchPreset(p: "residential" | "commercial") {
    setPreset(p);
    setRows(makeRows(p === "residential" ? RESIDENTIAL_PRESET : COMMERCIAL_PRESET));
  }

  function addAppliance() {
    const match = COMMON_APPLIANCES.find((a) => a.name === quickAdd);
    if (!match) return;
    const watts = match.watts === 0 ? parseFloat(customWatts) || 0 : match.watts;
    setRows((prev) => [...prev, { id: nextId++, name: match.name === "Custom Appliance" ? "Custom Appliance" : match.name, watts, qty: 1, hours: 4 }]);
    setQuickAdd("");
    setCustomWatts("");
  }

  function updateRow(id: number, field: keyof ApplianceRow, value: string | number) {
    setRows((prev) =>
      prev.map((r) => (r.id === id ? { ...r, [field]: field === "name" ? value : Math.max(0, parseFloat(value as string) || 0) } : r))
    );
  }

  function removeRow(id: number) {
    setRows((prev) => prev.filter((r) => r.id !== id));
  }

  const result = useMemo(() => {
    const pf = Math.min(1, Math.max(0.1, parseFloat(powerFactor) || 0.85));
    const rateVal = parseFloat(rate) || 8;
    const voltage = phase === "single" ? 230 : 415;

    let totalWatts = 0;
    let dailyWh = 0;

    for (const r of rows) {
      const w = (r.watts || 0) * (r.qty || 0);
      totalWatts += w;
      dailyWh += w * (r.hours || 0);
    }

    const kw = totalWatts / 1000;
    const kva = kw / pf;
    const dailyUnits = dailyWh / 1000;
    const monthlyUnits = dailyUnits * 30;
    const monthlyBill = monthlyUnits * rateVal;

    const amps = (kva * 1000) / (phase === "single" ? voltage : voltage * Math.sqrt(3));
    const breakerSize = recommendBreaker(amps);

    return { kw, kva, dailyUnits, monthlyUnits, monthlyBill, amps, breakerSize, totalWatts };
  }, [rows, powerFactor, rate, phase]);

  const isCustom = COMMON_APPLIANCES.find((a) => a.name === quickAdd)?.watts === 0;

  return (
    <div className="space-y-4">
      {/* Settings bar */}
      <div className="card p-5 space-y-4">
        <div className="flex flex-wrap gap-3 items-center justify-between">
          {/* Preset tabs */}
          <div className="flex gap-2">
            {(["residential", "commercial"] as const).map((p) => (
              <button
                key={p}
                onClick={() => switchPreset(p)}
                className={cn(
                  "rounded-full px-4 py-1.5 text-sm font-medium capitalize transition-colors",
                  preset === p
                    ? "bg-yellow-500 text-white"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
                )}
              >
                {p}
              </button>
            ))}
          </div>
          {/* Phase */}
          <div className="flex gap-2">
            {([["single", "Single Phase"], ["three", "Three Phase"]] as const).map(([v, l]) => (
              <button
                key={v}
                onClick={() => setPhase(v)}
                className={cn(
                  "rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
                  phase === v
                    ? "bg-yellow-500 text-white"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
                )}
              >
                {l}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400">
              Power Factor (0.7 – 1.0)
            </label>
            <input
              type="number"
              value={powerFactor}
              onChange={(e) => setPowerFactor(e.target.value)}
              className="input-field"
              step="0.05"
              min="0.7"
              max="1"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400">
              Electricity Rate (₹/unit)
            </label>
            <input
              type="number"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              className="input-field"
              step="0.5"
            />
          </div>
        </div>
      </div>

      {/* Appliance table */}
      <div className="card p-5 space-y-4">
        <h3 className="font-semibold text-gray-900 dark:text-gray-100">Appliances</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="pb-2 text-left font-medium text-gray-500 dark:text-gray-400 pr-3 min-w-[160px]">Appliance</th>
                <th className="pb-2 text-center font-medium text-gray-500 dark:text-gray-400 w-20">Watts</th>
                <th className="pb-2 text-center font-medium text-gray-500 dark:text-gray-400 w-16">Qty</th>
                <th className="pb-2 text-center font-medium text-gray-500 dark:text-gray-400 w-20">Hrs/Day</th>
                <th className="pb-2 text-right font-medium text-gray-500 dark:text-gray-400 w-24">Daily (Wh)</th>
                <th className="pb-2 w-8"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {rows.map((row) => {
                const dailyWh = row.watts * row.qty * row.hours;
                return (
                  <tr key={row.id}>
                    <td className="py-2 pr-3">
                      <input
                        type="text"
                        value={row.name}
                        onChange={(e) => updateRow(row.id, "name", e.target.value)}
                        className="input-field text-xs py-1.5"
                      />
                    </td>
                    <td className="py-2 px-1">
                      <input
                        type="number"
                        value={row.watts}
                        onChange={(e) => updateRow(row.id, "watts", e.target.value)}
                        className="input-field text-xs py-1.5 text-center"
                        min="0"
                      />
                    </td>
                    <td className="py-2 px-1">
                      <input
                        type="number"
                        value={row.qty}
                        onChange={(e) => updateRow(row.id, "qty", e.target.value)}
                        className="input-field text-xs py-1.5 text-center"
                        min="1"
                      />
                    </td>
                    <td className="py-2 px-1">
                      <input
                        type="number"
                        value={row.hours}
                        onChange={(e) => updateRow(row.id, "hours", e.target.value)}
                        className="input-field text-xs py-1.5 text-center"
                        min="0"
                        max="24"
                        step="0.5"
                      />
                    </td>
                    <td className="py-2 pl-1 text-right text-xs font-medium text-gray-700 dark:text-gray-300">
                      {dailyWh >= 1000 ? `${(dailyWh / 1000).toFixed(2)} kWh` : `${dailyWh} Wh`}
                    </td>
                    <td className="py-2 pl-2">
                      <button
                        onClick={() => removeRow(row.id)}
                        className="text-gray-300 hover:text-red-500 dark:text-gray-600 dark:hover:text-red-400 transition-colors text-lg leading-none"
                        aria-label="Remove"
                      >
                        ×
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Quick add */}
        <div className="flex flex-wrap gap-2 pt-1">
          <select
            value={quickAdd}
            onChange={(e) => setQuickAdd(e.target.value)}
            className="input-field flex-1 min-w-[180px] text-sm"
          >
            <option value="">+ Add appliance…</option>
            {COMMON_APPLIANCES.map((a) => (
              <option key={a.name} value={a.name}>
                {a.name}{a.watts ? ` (${a.watts}W)` : ""}
              </option>
            ))}
          </select>
          {isCustom && (
            <input
              type="number"
              placeholder="Watts"
              value={customWatts}
              onChange={(e) => setCustomWatts(e.target.value)}
              className="input-field w-24 text-sm"
              min="0"
            />
          )}
          <button
            onClick={addAppliance}
            disabled={!quickAdd}
            className="rounded-lg bg-yellow-500 px-4 py-2 text-sm font-medium text-white hover:bg-yellow-600 disabled:opacity-40 transition-colors"
          >
            Add
          </button>
        </div>
      </div>

      {/* Results */}
      <div className="card p-6 space-y-4">
        <h3 className="font-semibold text-gray-900 dark:text-gray-100">Results</h3>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              label: "Total Connected Load",
              value: result.kw >= 1 ? `${result.kw.toFixed(2)} kW` : `${result.totalWatts} W`,
              sub: `${result.totalWatts.toLocaleString()} Watts`,
              color: "bg-yellow-50 dark:bg-yellow-950 border-yellow-200 dark:border-yellow-800 text-yellow-900 dark:text-yellow-100",
            },
            {
              label: "Apparent Load (kVA)",
              value: `${result.kva.toFixed(2)} kVA`,
              sub: `PF = ${powerFactor}`,
              color: "bg-orange-50 dark:bg-orange-950 border-orange-200 dark:border-orange-800 text-orange-900 dark:text-orange-100",
            },
            {
              label: "Monthly Units",
              value: `${result.monthlyUnits.toFixed(1)} kWh`,
              sub: `${result.dailyUnits.toFixed(2)} kWh/day`,
              color: "bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800 text-blue-900 dark:text-blue-100",
            },
            {
              label: "Est. Monthly Bill",
              value: `₹${Math.round(result.monthlyBill).toLocaleString("en-IN")}`,
              sub: `@ ₹${rate}/unit`,
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
            <span>Full load current ({phase === "single" ? "230V" : "415V 3Ø"}):</span>
            <span className="font-medium">{result.amps.toFixed(1)} A</span>
          </div>
          <div className="flex justify-between">
            <span>Recommended main circuit breaker:</span>
            <span className="font-semibold text-yellow-700 dark:text-yellow-400">{result.breakerSize} A</span>
          </div>
          <div className="flex justify-between">
            <span>Annual electricity cost:</span>
            <span className="font-medium">₹{Math.round(result.monthlyBill * 12).toLocaleString("en-IN")}</span>
          </div>
          <div className="flex justify-between">
            <span>Annual units consumed:</span>
            <span className="font-medium">{Math.round(result.monthlyUnits * 12).toLocaleString()} kWh</span>
          </div>
        </div>

        <p className="text-xs text-gray-400 dark:text-gray-500">
          * Breaker size = full load current × 1.25 (NEC 80% rule), rounded to next standard size. Actual wiring must be done by a licensed electrician.
        </p>
      </div>
    </div>
  );
}
