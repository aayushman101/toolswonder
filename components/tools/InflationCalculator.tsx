"use client";

import { useState, useCallback } from "react";
import { TrendingUp, TrendingDown, DollarSign, RefreshCw, Info } from "lucide-react";
import { cn, formatCurrency, formatNumber } from "@/lib/utils";

// US CPI Annual Averages (BLS CPI-U, base 1982-84=100)
const CPI_DATA: Record<number, number> = {
  1980: 82.4, 1981: 90.9, 1982: 96.5, 1983: 99.6, 1984: 103.9,
  1985: 107.6, 1986: 109.6, 1987: 113.6, 1988: 118.3, 1989: 124.0,
  1990: 130.7, 1991: 136.2, 1992: 140.3, 1993: 144.5, 1994: 148.2,
  1995: 152.4, 1996: 156.9, 1997: 160.5, 1998: 163.0, 1999: 166.6,
  2000: 172.2, 2001: 177.1, 2002: 179.9, 2003: 184.0, 2004: 188.9,
  2005: 195.3, 2006: 201.6, 2007: 207.3, 2008: 215.3, 2009: 214.5,
  2010: 218.1, 2011: 224.9, 2012: 229.6, 2013: 233.0, 2014: 236.7,
  2015: 237.0, 2016: 240.0, 2017: 245.1, 2018: 251.1, 2019: 255.7,
  2020: 258.8, 2021: 270.9, 2022: 292.7, 2023: 304.7, 2024: 314.2,
  2025: 317.3,
};

const CURRENT_YEAR = 2025;
const MIN_YEAR = 1980;
const YEARS = Array.from({ length: CURRENT_YEAR - MIN_YEAR + 1 }, (_, i) => CURRENT_YEAR - i);

type Tab = "general" | "salary" | "future" | "history";

interface InflationResult {
  adjustedValue: number;
  inflationRate: number;
  totalInflation: number;
  purchasingPowerLoss: number;
  yearlyBreakdown: { year: number; value: number; cpi: number; rate: number }[];
}

function calculateInflation(amount: number, fromYear: number, toYear: number): InflationResult {
  const cpiFrom = CPI_DATA[fromYear];
  const cpiTo = CPI_DATA[toYear];
  if (!cpiFrom || !cpiTo) throw new Error("CPI data not available for selected years");

  const adjustedValue = amount * (cpiTo / cpiFrom);
  const totalInflation = ((cpiTo - cpiFrom) / cpiFrom) * 100;
  const years = Math.abs(toYear - fromYear);
  const annualRate = years > 0 ? (Math.pow(cpiTo / cpiFrom, 1 / years) - 1) * 100 : 0;
  const purchasingPowerLoss = amount - (amount * (cpiFrom / cpiTo));

  const start = Math.min(fromYear, toYear);
  const end = Math.max(fromYear, toYear);
  const yearlyBreakdown: InflationResult["yearlyBreakdown"] = [];

  for (let y = start; y <= end; y++) {
    const prevCpi = CPI_DATA[y - 1] ?? CPI_DATA[start];
    const cpi = CPI_DATA[y];
    if (cpi) {
      const rate = ((cpi - prevCpi) / prevCpi) * 100;
      const value = amount * (cpi / cpiFrom);
      yearlyBreakdown.push({ year: y, value, cpi, rate });
    }
  }

  return { adjustedValue, inflationRate: annualRate, totalInflation, purchasingPowerLoss, yearlyBreakdown };
}

export default function InflationCalculator() {
  const [tab, setTab] = useState<Tab>("general");
  const [amount, setAmount] = useState("1000");
  const [fromYear, setFromYear] = useState(2010);
  const [toYear, setToYear] = useState(CURRENT_YEAR);
  const [currency, setCurrency] = useState("USD");
  const [salaryIncrease, setSalaryIncrease] = useState("3");
  const [futureYears, setFutureYears] = useState("10");
  const [futureRate, setFutureRate] = useState("3");
  const [result, setResult] = useState<InflationResult | null>(null);
  const [error, setError] = useState("");
  const [showTable, setShowTable] = useState(false);

  const handleCalculate = useCallback(() => {
    setError("");
    const amt = parseFloat(amount);
    if (isNaN(amt) || amt <= 0) { setError("Please enter a valid positive amount."); return; }
    if (fromYear === toYear) { setError("Start and end year must be different."); return; }
    try {
      setResult(calculateInflation(amt, fromYear, toYear));
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Calculation error.");
    }
  }, [amount, fromYear, toYear]);

  const calcFutureValue = () => {
    const amt = parseFloat(amount);
    const yrs = parseInt(futureYears);
    const rate = parseFloat(futureRate) / 100;
    if (isNaN(amt) || isNaN(yrs) || isNaN(rate)) return null;
    return { future: amt * Math.pow(1 + rate, yrs), loss: amt - amt / Math.pow(1 + rate, yrs) };
  };

  const calcSalaryReal = () => {
    const sal = parseFloat(amount);
    const raise = parseFloat(salaryIncrease) / 100;
    if (!result || isNaN(sal) || isNaN(raise)) return null;
    const years = Math.abs(toYear - fromYear);
    const nominalSalary = sal * Math.pow(1 + raise, years);
    const realSalary = nominalSalary * (CPI_DATA[fromYear] / CPI_DATA[toYear]);
    return { nominal: nominalSalary, real: realSalary, gainLoss: realSalary - sal };
  };

  const futureVal = tab === "future" ? calcFutureValue() : null;
  const salaryVal = tab === "salary" ? calcSalaryReal() : null;
  const isPositive = result ? toYear > fromYear : false;

  const tabs: { id: Tab; label: string }[] = [
    { id: "general", label: "General" },
    { id: "salary", label: "Salary" },
    { id: "future", label: "Future Value" },
    { id: "history", label: "CPI History" },
  ];

  return (
    <div className="space-y-6">
      {/* Tab Bar */}
      <div className="flex gap-1 rounded-xl bg-gray-100 p-1">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => { setTab(t.id); setResult(null); setError(""); }}
            className={cn(
              "flex-1 rounded-lg py-2 text-sm font-medium transition-all",
              tab === t.id ? "bg-white text-blue-700 shadow-sm" : "text-gray-600 hover:text-gray-900"
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Input Panel */}
      <div className="card p-6 space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          {/* Amount */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              {tab === "salary" ? "Current Salary" : "Amount"} ({currency})
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="input-field pl-9"
                placeholder="1000"
                min="0"
                step="any"
              />
            </div>
          </div>

          {/* Currency */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Currency</label>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="input-field"
            >
              <option value="USD">USD – US Dollar</option>
              <option value="EUR">EUR – Euro</option>
              <option value="GBP">GBP – British Pound</option>
              <option value="INR">INR – Indian Rupee</option>
              <option value="CAD">CAD – Canadian Dollar</option>
              <option value="AUD">AUD – Australian Dollar</option>
            </select>
          </div>

          {tab !== "future" ? (
            <>
              {/* From Year */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">From Year</label>
                <select
                  value={fromYear}
                  onChange={(e) => setFromYear(parseInt(e.target.value))}
                  className="input-field"
                >
                  {YEARS.map((y) => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>
              </div>
              {/* To Year */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">To Year</label>
                <select
                  value={toYear}
                  onChange={(e) => setToYear(parseInt(e.target.value))}
                  className="input-field"
                >
                  {YEARS.map((y) => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>
              </div>
            </>
          ) : (
            <>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">Years into Future</label>
                <input
                  type="number"
                  value={futureYears}
                  onChange={(e) => setFutureYears(e.target.value)}
                  className="input-field"
                  min="1"
                  max="50"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">Expected Annual Inflation (%)</label>
                <input
                  type="number"
                  value={futureRate}
                  onChange={(e) => setFutureRate(e.target.value)}
                  className="input-field"
                  min="0"
                  max="50"
                  step="0.1"
                />
              </div>
            </>
          )}

          {/* Salary extra field */}
          {tab === "salary" && (
            <div className="sm:col-span-2">
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Annual Salary Raise (%)
              </label>
              <input
                type="number"
                value={salaryIncrease}
                onChange={(e) => setSalaryIncrease(e.target.value)}
                className="input-field"
                placeholder="3"
                min="0"
                max="100"
                step="0.1"
              />
            </div>
          )}
        </div>

        {error && (
          <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="flex gap-3">
          <button
            onClick={tab === "future" ? () => setResult({ adjustedValue: 0, inflationRate: 0, totalInflation: 0, purchasingPowerLoss: 0, yearlyBreakdown: [] }) : handleCalculate}
            className="btn-primary flex-1"
          >
            <TrendingUp className="h-4 w-4" />
            Calculate
          </button>
          <button
            onClick={() => { setAmount("1000"); setFromYear(2010); setToYear(CURRENT_YEAR); setResult(null); setError(""); setSalaryIncrease("3"); setFutureYears("10"); setFutureRate("3"); }}
            className="btn-secondary"
            title="Reset"
          >
            <RefreshCw className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Results */}
      {tab === "future" && futureVal && (
        <div className="card p-6 animate-slide-up space-y-5">
          <h3 className="font-semibold text-gray-900">Future Value Results</h3>
          <div className="grid gap-4 sm:grid-cols-3">
            <ResultCard
              label="Today's Value"
              value={formatCurrency(parseFloat(amount), currency)}
              sub="Present value"
              color="blue"
            />
            <ResultCard
              label={`Value in ${futureYears} Years`}
              value={formatCurrency(futureVal.future, currency)}
              sub="You'll need this much"
              color="red"
              icon={<TrendingUp className="h-4 w-4" />}
            />
            <ResultCard
              label="Purchasing Power Lost"
              value={formatCurrency(futureVal.loss, currency)}
              sub={`At ${futureRate}% annual inflation`}
              color="orange"
              icon={<TrendingDown className="h-4 w-4" />}
            />
          </div>
          <div className="rounded-lg bg-amber-50 border border-amber-200 px-4 py-3 flex gap-2">
            <Info className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
            <p className="text-sm text-amber-800">
              To maintain today&apos;s purchasing power of{" "}
              <strong>{formatCurrency(parseFloat(amount), currency)}</strong>, you&apos;ll need{" "}
              <strong>{formatCurrency(futureVal.future, currency)}</strong> in {futureYears} years
              at {futureRate}% annual inflation.
            </p>
          </div>
        </div>
      )}

      {result && tab !== "future" && (
        <div className="space-y-4 animate-slide-up">
          <div className="card p-6 space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">Inflation Results</h3>
              <span className={cn(
                "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium",
                isPositive ? "bg-red-50 text-red-700" : "bg-green-50 text-green-700"
              )}>
                {isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                {isPositive ? "Prices rose" : "Prices fell"}
              </span>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <ResultCard
                label={toYear > fromYear ? `Value in ${toYear}` : `Value in ${toYear}`}
                value={formatCurrency(result.adjustedValue, currency)}
                sub={`Equivalent to ${formatCurrency(parseFloat(amount), currency)} in ${fromYear}`}
                color="blue"
              />
              <ResultCard
                label="Total Inflation"
                value={`${result.totalInflation >= 0 ? "+" : ""}${formatNumber(result.totalInflation)}%`}
                sub={`${fromYear} to ${toYear}`}
                color={result.totalInflation >= 0 ? "red" : "green"}
              />
              <ResultCard
                label="Avg Annual Rate"
                value={`${formatNumber(result.inflationRate)}%`}
                sub="Compound annual rate"
                color="purple"
              />
              <ResultCard
                label="Purchasing Power"
                value={`${formatNumber(100 * (CPI_DATA[Math.min(fromYear, toYear)] / CPI_DATA[Math.max(fromYear, toYear)]))}¢`}
                sub={`Today's value of $1 from ${Math.min(fromYear, toYear)}`}
                color="orange"
              />
            </div>

            {/* Salary mode extras */}
            {tab === "salary" && salaryVal && (
              <div className="border-t border-gray-100 pt-5">
                <h4 className="mb-4 text-sm font-semibold text-gray-700">Salary Analysis</h4>
                <div className="grid gap-4 sm:grid-cols-3">
                  <ResultCard
                    label="Nominal Salary (Today)"
                    value={formatCurrency(salaryVal.nominal, currency)}
                    sub={`After ${salaryIncrease}% raises/year`}
                    color="blue"
                  />
                  <ResultCard
                    label="Real Salary (Inflation-Adjusted)"
                    value={formatCurrency(salaryVal.real, currency)}
                    sub="What it's actually worth"
                    color={salaryVal.gainLoss >= 0 ? "green" : "red"}
                  />
                  <ResultCard
                    label="Real Gain / Loss"
                    value={`${salaryVal.gainLoss >= 0 ? "+" : ""}${formatCurrency(salaryVal.gainLoss, currency)}`}
                    sub="Compared to original salary"
                    color={salaryVal.gainLoss >= 0 ? "green" : "red"}
                    icon={salaryVal.gainLoss >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                  />
                </div>
              </div>
            )}

            {/* Toggle table */}
            {result.yearlyBreakdown.length > 0 && (
              <div>
                <button
                  onClick={() => setShowTable(!showTable)}
                  className="text-sm font-medium text-blue-600 hover:text-blue-800"
                >
                  {showTable ? "Hide" : "Show"} Year-by-Year Breakdown →
                </button>
                {showTable && (
                  <div className="mt-4 overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-200 text-left text-xs text-gray-500">
                          <th className="pb-2 pr-4 font-medium">Year</th>
                          <th className="pb-2 pr-4 font-medium">CPI</th>
                          <th className="pb-2 pr-4 font-medium">Annual Rate</th>
                          <th className="pb-2 font-medium">Adjusted Value</th>
                        </tr>
                      </thead>
                      <tbody>
                        {result.yearlyBreakdown.map((row) => (
                          <tr key={row.year} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="py-2 pr-4 font-medium text-gray-900">{row.year}</td>
                            <td className="py-2 pr-4 text-gray-600">{row.cpi.toFixed(1)}</td>
                            <td className={cn("py-2 pr-4", row.rate >= 0 ? "text-red-600" : "text-green-600")}>
                              {row.rate >= 0 ? "+" : ""}{row.rate.toFixed(2)}%
                            </td>
                            <td className="py-2 font-medium text-gray-900">
                              {formatCurrency(row.value, currency)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* CPI History Tab */}
      {tab === "history" && (
        <div className="card p-6 space-y-4">
          <h3 className="font-semibold text-gray-900">US CPI History (1980–2025)</h3>
          <p className="text-sm text-gray-500">
            Source: US Bureau of Labor Statistics — CPI-U (All Urban Consumers, All Items)
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 text-left text-xs text-gray-500">
                  <th className="pb-2 pr-6 font-medium">Year</th>
                  <th className="pb-2 pr-6 font-medium">CPI Value</th>
                  <th className="pb-2 font-medium">Annual Change</th>
                </tr>
              </thead>
              <tbody>
                {YEARS.slice().reverse().map((year) => {
                  const cpi = CPI_DATA[year];
                  const prevCpi = CPI_DATA[year - 1];
                  const change = prevCpi ? ((cpi - prevCpi) / prevCpi) * 100 : null;
                  return (
                    <tr key={year} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-2 pr-6 font-medium text-gray-900">{year}</td>
                      <td className="py-2 pr-6 text-gray-700">{cpi.toFixed(1)}</td>
                      <td className={cn("py-2", change !== null ? (change >= 0 ? "text-red-600" : "text-green-600") : "text-gray-400")}>
                        {change !== null ? `${change >= 0 ? "+" : ""}${change.toFixed(2)}%` : "—"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

function ResultCard({
  label, value, sub, color, icon,
}: {
  label: string;
  value: string;
  sub?: string;
  color: "blue" | "red" | "green" | "orange" | "purple";
  icon?: React.ReactNode;
}) {
  const colors = {
    blue: "bg-blue-50 border-blue-100 text-blue-700",
    red: "bg-red-50 border-red-100 text-red-700",
    green: "bg-green-50 border-green-100 text-green-700",
    orange: "bg-orange-50 border-orange-100 text-orange-700",
    purple: "bg-purple-50 border-purple-100 text-purple-700",
  };
  return (
    <div className={cn("rounded-xl border p-4", colors[color])}>
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs font-medium opacity-80">{label}</span>
        {icon && <span className="opacity-70">{icon}</span>}
      </div>
      <div className="text-xl font-bold">{value}</div>
      {sub && <div className="mt-1 text-xs opacity-70">{sub}</div>}
    </div>
  );
}
