"use client";

import { useState, useMemo } from "react";
import { stateTaxRates } from "@/lib/salestax/data";

type Mode = "forward" | "reverse";

export default function SalesTaxCalculator() {
  const [mode, setMode] = useState<Mode>("forward");
  const [stateCode, setStateCode] = useState("NJ");
  const [customRate, setCustomRate] = useState("6.625");
  const [localRate, setLocalRate] = useState("0");

  const [preTaxPrice, setPreTaxPrice] = useState("100");
  const [totalPrice, setTotalPrice] = useState("106.63");

  const selectedState = stateTaxRates.find((s) => s.code === stateCode) ?? stateTaxRates[0];
  const baseRate = stateCode === "CUSTOM" ? parseFloat(customRate) || 0 : selectedState.rate;
  const local = parseFloat(localRate) || 0;
  const totalRate = baseRate + local;

  const result = useMemo(() => {
    if (mode === "forward") {
      const price = parseFloat(preTaxPrice) || 0;
      const tax = (price * totalRate) / 100;
      const total = price + tax;
      return { price, tax, total };
    } else {
      const total = parseFloat(totalPrice) || 0;
      const price = total / (1 + totalRate / 100);
      const tax = total - price;
      return { price, tax, total };
    }
  }, [mode, preTaxPrice, totalPrice, totalRate]);

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setMode("forward")}
          className={`flex-1 rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${mode === "forward" ? "bg-blue-600 text-white" : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"}`}
        >
          Add Sales Tax
        </button>
        <button
          type="button"
          onClick={() => setMode("reverse")}
          className={`flex-1 rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${mode === "reverse" ? "bg-blue-600 text-white" : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"}`}
        >
          Reverse (Remove Tax)
        </button>
      </div>

      <div className="card p-5 space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">State</label>
            <select value={stateCode} onChange={(e) => setStateCode(e.target.value)} className="input-field">
              {stateTaxRates.map((s) => (
                <option key={s.code} value={s.code}>{s.name}{s.code !== "CUSTOM" ? ` — ${s.rate}%` : ""}</option>
              ))}
            </select>
          </div>
          {stateCode === "CUSTOM" ? (
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Custom Rate (%)</label>
              <input type="number" value={customRate} onChange={(e) => setCustomRate(e.target.value)} className="input-field" min="0" step="0.01" />
            </div>
          ) : (
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Local / Additional Tax (%)</label>
              <input type="number" value={localRate} onChange={(e) => setLocalRate(e.target.value)} className="input-field" min="0" step="0.01" placeholder="0" />
            </div>
          )}
        </div>

        {mode === "forward" ? (
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Price Before Tax ($)</label>
            <input type="number" value={preTaxPrice} onChange={(e) => setPreTaxPrice(e.target.value)} className="input-field" min="0" step="1" />
          </div>
        ) : (
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Total Price Paid, Tax Included ($)</label>
            <input type="number" value={totalPrice} onChange={(e) => setTotalPrice(e.target.value)} className="input-field" min="0" step="1" />
          </div>
        )}

        <p className="text-xs text-gray-400">
          Using combined rate of <strong>{totalRate.toFixed(3)}%</strong>
          {stateCode !== "CUSTOM" && ` (${selectedState.name} state rate ${baseRate}%${local > 0 ? ` + ${local}% local` : ""})`}.
          Many cities/counties add local tax on top of the state rate — enter it above if known.
        </p>
      </div>

      <div className="card p-6 space-y-4">
        <h3 className="font-semibold text-gray-900 dark:text-gray-100">Result</h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-lg bg-blue-50 dark:bg-blue-950 p-4">
            <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">{mode === "forward" ? "Price Before Tax" : "Price Before Tax (derived)"}</div>
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">${result.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
          </div>
          <div className="rounded-lg bg-purple-50 dark:bg-purple-950 p-4">
            <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Sales Tax ({totalRate.toFixed(3)}%)</div>
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">${result.tax.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
          </div>
        </div>
        <div className="rounded-lg bg-green-50 dark:bg-green-950 p-4">
          <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Total Price {mode === "reverse" ? "Paid" : ""}</div>
          <div className="text-3xl font-bold text-green-600 dark:text-green-400">${result.total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
        </div>
      </div>
    </div>
  );
}
