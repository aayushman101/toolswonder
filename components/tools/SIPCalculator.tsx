"use client";

import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";

export default function SIPCalculator() {
  const [monthly, setMonthly] = useState("5000");
  const [rate, setRate] = useState("12");
  const [years, setYears] = useState("10");
  const [mode, setMode] = useState<"sip" | "lumpsum">("sip");
  const [lumpsum, setLumpsum] = useState("100000");

  const result = useMemo(() => {
    const r = (parseFloat(rate) || 0) / 100;
    const y = parseFloat(years) || 0;
    const months = y * 12;

    if (mode === "sip") {
      const m = parseFloat(monthly) || 0;
      const mr = r / 12;
      if (mr === 0) {
        return { invested: m * months, returns: 0, total: m * months, gain: 0 };
      }
      const total = m * ((Math.pow(1 + mr, months) - 1) / mr) * (1 + mr);
      const invested = m * months;
      return { invested, returns: total - invested, total, gain: ((total - invested) / invested) * 100 };
    } else {
      const l = parseFloat(lumpsum) || 0;
      const total = l * Math.pow(1 + r, y);
      return { invested: l, returns: total - l, total, gain: ((total - l) / l) * 100 };
    }
  }, [monthly, rate, years, mode, lumpsum]);

  const fmt = (n: number) => n >= 1e7
    ? `₹${(n / 1e7).toFixed(2)} Cr`
    : n >= 1e5
    ? `₹${(n / 1e5).toFixed(2)} L`
    : `₹${Math.round(n).toLocaleString("en-IN")}`;

  return (
    <div className="space-y-4">
      <div className="card p-6 space-y-5">
        {/* Mode toggle */}
        <div className="flex gap-2">
          {([["sip", "SIP (Monthly)"], ["lumpsum", "Lump Sum"]] as const).map(([v, l]) => (
            <button key={v} onClick={() => setMode(v)} className={cn("rounded-full px-4 py-1.5 text-sm font-medium transition-colors", mode === v ? "bg-blue-600 text-white" : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700")}>
              {l}
            </button>
          ))}
        </div>

        {mode === "sip" ? (
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Monthly Investment (₹)</label>
            <input type="number" value={monthly} onChange={e => setMonthly(e.target.value)} className="input-field" min="100" />
            <div className="mt-2 flex gap-2 flex-wrap">
              {["1000", "2000", "5000", "10000", "25000"].map(v => (
                <button key={v} onClick={() => setMonthly(v)} className={cn("rounded-full px-3 py-1 text-xs font-medium transition-colors", monthly === v ? "bg-blue-600 text-white" : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400")}>{parseInt(v).toLocaleString("en-IN")}</button>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Lump Sum Amount (₹)</label>
            <input type="number" value={lumpsum} onChange={e => setLumpsum(e.target.value)} className="input-field" min="1000" />
          </div>
        )}

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Expected Annual Return (%)</label>
          <input type="number" value={rate} onChange={e => setRate(e.target.value)} className="input-field" min="1" max="50" step="0.5" />
          <div className="mt-2 flex gap-2 flex-wrap">
            {["8", "10", "12", "15", "18"].map(v => (
              <button key={v} onClick={() => setRate(v)} className={cn("rounded-full px-3 py-1 text-xs font-medium transition-colors", rate === v ? "bg-blue-600 text-white" : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400")}>{v}%</button>
            ))}
          </div>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Investment Period: <span className="text-blue-600 font-semibold">{years} years</span></label>
          <input type="range" min="1" max="40" value={years} onChange={e => setYears(e.target.value)} className="w-full accent-blue-600" />
          <div className="flex justify-between text-xs text-gray-400 mt-1"><span>1 yr</span><span>40 yrs</span></div>
        </div>
      </div>

      {result && (
        <div className="card p-6 space-y-4">
          <h3 className="font-semibold text-gray-900 dark:text-gray-100">Results</h3>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Invested Amount", value: fmt(result.invested), color: "bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100" },
              { label: "Est. Returns", value: fmt(result.returns), color: "bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800 text-green-900 dark:text-green-100" },
              { label: "Total Value", value: fmt(result.total), color: "bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800 text-blue-900 dark:text-blue-100" },
              { label: "Wealth Gain", value: `${result.gain.toFixed(1)}%`, color: "bg-purple-50 dark:bg-purple-950 border-purple-200 dark:border-purple-800 text-purple-900 dark:text-purple-100" },
            ].map(r => (
              <div key={r.label} className={cn("rounded-xl border p-4", r.color)}>
                <div className="text-xs font-medium opacity-70 mb-1">{r.label}</div>
                <div className="text-xl font-bold">{r.value}</div>
              </div>
            ))}
          </div>

          {/* Visual breakdown bar */}
          <div className="rounded-xl bg-gray-50 dark:bg-gray-800 p-4">
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-2">
              <span>Invested: {((result.invested / result.total) * 100).toFixed(0)}%</span>
              <span>Returns: {((result.returns / result.total) * 100).toFixed(0)}%</span>
            </div>
            <div className="h-3 w-full rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700 flex">
              <div className="h-full bg-gray-400 dark:bg-gray-500 rounded-l-full" style={{ width: `${(result.invested / result.total) * 100}%` }} />
              <div className="h-full bg-green-500 rounded-r-full flex-1" />
            </div>
            <p className="text-xs text-gray-400 mt-2 text-center">Your money grows {(result.total / result.invested).toFixed(2)}x in {years} years at {rate}% p.a.</p>
          </div>
        </div>
      )}
    </div>
  );
}
