"use client";

import { useState, useMemo } from "react";
import { countryEnergyPrices, LITERS_PER_GALLON, KM_PER_MILE } from "@/lib/evcharging/data";

type Unit = "mi" | "km";
type Location = "home" | "public";

export default function EVChargingCostCalculator() {
  const [countryCode, setCountryCode] = useState("US");
  const [customRate, setCustomRate] = useState("0.18");
  const [unit, setUnit] = useState<Unit>("mi");
  const [distance, setDistance] = useState("1000");
  const [efficiency, setEfficiency] = useState("30");
  const [location, setLocation] = useState<Location>("home");
  const [publicMarkup, setPublicMarkup] = useState("60");
  const [compareGas, setCompareGas] = useState(true);
  const [gasEfficiency, setGasEfficiency] = useState("25");
  const [customGasPrice, setCustomGasPrice] = useState("1.38");

  const country = countryEnergyPrices.find((c) => c.code === countryCode);

  const result = useMemo(() => {
    const dist = parseFloat(distance) || 0;
    const eff = parseFloat(efficiency) || 0;
    const markup = parseFloat(publicMarkup) || 0;

    const baseRate = countryCode === "CUSTOM" ? parseFloat(customRate) || 0 : country?.electricityUsdPerKwh ?? 0;
    const effectiveRate = location === "public" ? baseRate * (1 + markup / 100) : baseRate;

    const kwhUsed = (dist / 100) * eff;
    const evCost = kwhUsed * effectiveRate;
    const evCostPer100 = eff * effectiveRate;

    // Gas comparison
    const gasPrice = countryCode === "CUSTOM" ? parseFloat(customGasPrice) || 0 : country?.gasolineUsdPerLiter ?? 0;
    const mpgOrLper100 = parseFloat(gasEfficiency) || 0;
    let litersUsed = 0;
    if (unit === "mi") {
      const gallonsUsed = mpgOrLper100 > 0 ? dist / mpgOrLper100 : 0;
      litersUsed = gallonsUsed * LITERS_PER_GALLON;
    } else {
      litersUsed = (dist / 100) * mpgOrLper100;
    }
    const gasCost = litersUsed * gasPrice;

    const savings = gasCost - evCost;
    const savingsPct = gasCost > 0 ? (savings / gasCost) * 100 : 0;

    return {
      effectiveRate,
      kwhUsed,
      evCost,
      evCostPer100,
      gasCost,
      savings,
      savingsPct,
      baseRate,
      gasPrice,
    };
  }, [countryCode, customRate, unit, distance, efficiency, location, publicMarkup, gasEfficiency, customGasPrice, country]);

  return (
    <div className="space-y-4">
      <div className="card p-5 space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Country</label>
            <select value={countryCode} onChange={(e) => setCountryCode(e.target.value)} className="input-field">
              {countryEnergyPrices.map((c) => (
                <option key={c.code} value={c.code}>{c.name} — ${c.electricityUsdPerKwh.toFixed(3)}/kWh</option>
              ))}
              <option value="CUSTOM">Custom Rate</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Distance Unit</label>
            <select value={unit} onChange={(e) => setUnit(e.target.value as Unit)} className="input-field">
              <option value="mi">Miles</option>
              <option value="km">Kilometers</option>
            </select>
          </div>
        </div>

        {countryCode === "CUSTOM" && (
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Electricity Rate ($/kWh)</label>
              <input type="number" value={customRate} onChange={(e) => setCustomRate(e.target.value)} className="input-field" min="0" step="0.01" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Gas Price ($/liter)</label>
              <input type="number" value={customGasPrice} onChange={(e) => setCustomGasPrice(e.target.value)} className="input-field" min="0" step="0.01" />
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Distance Driven per Month ({unit})</label>
            <input type="number" value={distance} onChange={(e) => setDistance(e.target.value)} className="input-field" min="0" step="50" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">EV Efficiency (kWh / 100 {unit})</label>
            <input type="number" value={efficiency} onChange={(e) => setEfficiency(e.target.value)} className="input-field" min="0" step="0.5" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Charging Location</label>
            <select value={location} onChange={(e) => setLocation(e.target.value as Location)} className="input-field">
              <option value="home">Home (Level 1/2)</option>
              <option value="public">Public / DC Fast Charging</option>
            </select>
          </div>
          {location === "public" && (
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Public Charging Markup (%)</label>
              <input type="number" value={publicMarkup} onChange={(e) => setPublicMarkup(e.target.value)} className="input-field" min="0" step="5" />
              <p className="mt-1 text-xs text-gray-400">Public/fast chargers typically cost 40–100% more than home electricity due to network and demand fees.</p>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 pt-1">
          <input type="checkbox" id="compareGas" checked={compareGas} onChange={(e) => setCompareGas(e.target.checked)} className="h-4 w-4" />
          <label htmlFor="compareGas" className="text-sm font-medium text-gray-700 dark:text-gray-300">Compare against an equivalent gas car</label>
        </div>

        {compareGas && (
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Gas Car Efficiency ({unit === "mi" ? "MPG" : "L / 100 km"})
            </label>
            <input type="number" value={gasEfficiency} onChange={(e) => setGasEfficiency(e.target.value)} className="input-field" min="0" step="0.5" />
          </div>
        )}
      </div>

      <div className="card p-6 space-y-4">
        <h3 className="font-semibold text-gray-900 dark:text-gray-100">Estimated Charging Cost</h3>

        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-lg bg-blue-50 dark:bg-blue-950 p-4">
            <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">EV Cost per Month</div>
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">${result.evCost.toFixed(2)}</div>
          </div>
          <div className="rounded-lg bg-green-50 dark:bg-green-950 p-4">
            <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Cost per 100 {unit}</div>
            <div className="text-3xl font-bold text-green-600 dark:text-green-400">${result.evCostPer100.toFixed(2)}</div>
          </div>
        </div>

        <div className="rounded-lg bg-gray-50 dark:bg-gray-800 p-4 text-sm space-y-2">
          <div className="flex justify-between"><span className="text-gray-600 dark:text-gray-400">Effective Rate Used</span><span className="font-medium">${result.effectiveRate.toFixed(3)}/kWh</span></div>
          <div className="flex justify-between"><span className="text-gray-600 dark:text-gray-400">Energy Used</span><span className="font-medium">{result.kwhUsed.toFixed(1)} kWh/month</span></div>
          <div className="flex justify-between font-semibold border-t border-gray-200 dark:border-gray-700 pt-2"><span>Annual EV Charging Cost</span><span>${(result.evCost * 12).toLocaleString(undefined, { maximumFractionDigits: 0 })}</span></div>
        </div>

        {compareGas && (
          <div className="rounded-lg bg-gray-50 dark:bg-gray-800 p-4 text-sm space-y-2">
            <div className="text-gray-700 dark:text-gray-300 font-medium mb-1">Vs. Equivalent Gas Car</div>
            <div className="flex justify-between"><span className="text-gray-600 dark:text-gray-400">Gas Cost per Month</span><span className="font-medium">${result.gasCost.toFixed(2)}</span></div>
            <div className="flex justify-between text-base font-bold text-green-700 dark:text-green-400 border-t border-gray-200 dark:border-gray-700 pt-2">
              <span>Monthly Savings with EV</span>
              <span>${result.savings.toFixed(2)} ({result.savingsPct.toFixed(0)}% cheaper)</span>
            </div>
            <div className="flex justify-between text-base font-bold text-green-700 dark:text-green-400">
              <span>Annual Savings with EV</span>
              <span>${(result.savings * 12).toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
