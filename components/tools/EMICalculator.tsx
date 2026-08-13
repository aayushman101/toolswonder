"use client";

import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";

type LoanType = "home" | "car" | "personal" | "education";

const PRESETS: Record<LoanType, { amount: string; rate: string; years: string; label: string }> = {
  home:      { amount: "3000000", rate: "8.5",  years: "20", label: "Home Loan" },
  car:       { amount: "700000",  rate: "9.0",  years: "5",  label: "Car Loan" },
  personal:  { amount: "300000",  rate: "14.0", years: "3",  label: "Personal Loan" },
  education: { amount: "500000",  rate: "10.5", years: "7",  label: "Education Loan" },
};

export default function EMICalculator() {
  const [amount, setAmount] = useState("1000000");
  const [rate, setRate]     = useState("8.5");
  const [years, setYears]   = useState("20");
  const [loanType, setLoanType] = useState<LoanType>("home");

  const applyPreset = (type: LoanType) => {
    setLoanType(type);
    setAmount(PRESETS[type].amount);
    setRate(PRESETS[type].rate);
    setYears(PRESETS[type].years);
  };

  const result = useMemo(() => {
    const p = parseFloat(amount) || 0;
    const r = (parseFloat(rate) || 0) / 100 / 12;
    const n = (parseFloat(years) || 0) * 12;
    if (p === 0 || n === 0) return null;
    const emi = r === 0 ? p / n : (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPayment = emi * n;
    const totalInterest = totalPayment - p;
    return { emi, totalPayment, totalInterest, principal: p, n };
  }, [amount, rate, years]);

  const fmt = (n: number) => n >= 1e7
    ? `₹${(n / 1e7).toFixed(2)} Cr`
    : n >= 1e5
    ? `₹${(n / 1e5).toFixed(2)} L`
    : `₹${Math.round(n).toLocaleString("en-IN")}`;

  return (
    <div className="space-y-4">
      <div className="card p-6 space-y-5">
        {/* Loan type presets */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Loan Type</label>
          <div className="flex gap-2 flex-wrap">
            {(Object.entries(PRESETS) as [LoanType, typeof PRESETS[LoanType]][]).map(([key, p]) => (
              <button key={key} onClick={() => applyPreset(key)} className={cn("rounded-full px-4 py-1.5 text-sm font-medium transition-colors", loanType === key ? "bg-blue-600 text-white" : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700")}>
                {p.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Loan Amount (₹)</label>
          <input type="number" value={amount} onChange={e => setAmount(e.target.value)} className="input-field" />
          <p className="mt-1 text-xs text-gray-400">{parseInt(amount || "0") >= 1e5 ? fmt(parseFloat(amount)) : ""}</p>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Annual Interest Rate (%)</label>
          <input type="number" value={rate} onChange={e => setRate(e.target.value)} className="input-field" step="0.1" min="1" max="36" />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Loan Tenure: <span className="text-blue-600 font-semibold">{years} years</span></label>
          <input type="range" min="1" max="30" value={years} onChange={e => setYears(e.target.value)} className="w-full accent-blue-600" />
          <div className="flex justify-between text-xs text-gray-400 mt-1"><span>1 yr</span><span>30 yrs</span></div>
        </div>
      </div>

      {result && (
        <div className="card p-6 space-y-4">
          <h3 className="font-semibold text-gray-900 dark:text-gray-100">Results</h3>

          {/* EMI highlight */}
          <div className="rounded-xl bg-blue-600 p-5 text-white text-center">
            <div className="text-sm font-medium opacity-80">Monthly EMI</div>
            <div className="text-4xl font-bold mt-1">{fmt(result.emi)}</div>
            <div className="text-sm opacity-70 mt-1">per month for {years} years</div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {[
              { label: "Principal Amount", value: fmt(result.principal), color: "bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100" },
              { label: "Total Interest", value: fmt(result.totalInterest), color: "bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800 text-red-900 dark:text-red-100" },
              { label: "Total Payment", value: fmt(result.totalPayment), color: "bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800 text-blue-900 dark:text-blue-100" },
            ].map(r => (
              <div key={r.label} className={cn("rounded-xl border p-4", r.color)}>
                <div className="text-xs font-medium opacity-70 mb-1">{r.label}</div>
                <div className="text-xl font-bold">{r.value}</div>
              </div>
            ))}
          </div>

          {/* Interest vs Principal bar */}
          <div className="rounded-xl bg-gray-50 dark:bg-gray-800 p-4">
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-2">
              <span>Principal: {((result.principal / result.totalPayment) * 100).toFixed(0)}%</span>
              <span>Interest: {((result.totalInterest / result.totalPayment) * 100).toFixed(0)}%</span>
            </div>
            <div className="h-3 w-full rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700 flex">
              <div className="h-full bg-blue-500 rounded-l-full" style={{ width: `${(result.principal / result.totalPayment) * 100}%` }} />
              <div className="h-full bg-red-400 rounded-r-full flex-1" />
            </div>
            <p className="text-xs text-gray-400 mt-2 text-center">You pay {fmt(result.totalInterest)} as interest — {((result.totalInterest / result.principal) * 100).toFixed(0)}% of principal</p>
          </div>
        </div>
      )}
    </div>
  );
}
