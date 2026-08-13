"use client";

import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";

type FarmType = "dairy" | "beef" | "mixed";

export default function CattleRecordKeeping() {
  const [farmType, setFarmType] = useState<FarmType>("dairy");

  const [milkCows, setMilkCows] = useState("10");
  const [beefCattle, setBeefCattle] = useState("10");
  const [heifers, setHeifers] = useState("3");
  const [calves, setCalves] = useState("5");

  const [milkPerCowDay, setMilkPerCowDay] = useState("15");
  const [milkPrice, setMilkPrice] = useState("35");

  const [avgWeightKg, setAvgWeightKg] = useState("300");
  const [beefPricePerKg, setBeefPricePerKg] = useState("150");
  const [cattleSoldPerYear, setCattleSoldPerYear] = useState("4");

  const [feedCostPerAnimalMonth, setFeedCostPerAnimalMonth] = useState("2500");
  const [vetCostPerAnimalYear, setVetCostPerAnimalYear] = useState("500");
  const [laborCostMonth, setLaborCostMonth] = useState("15000");

  const result = useMemo(() => {
    const mc = farmType !== "beef" ? (parseInt(milkCows) || 0) : 0;
    const bc = farmType !== "dairy" ? (parseInt(beefCattle) || 0) : 0;
    const h = parseInt(heifers) || 0;
    const cal = parseInt(calves) || 0;
    const totalAnimals = mc + bc + h + cal;

    const milkPerDay = mc * (parseFloat(milkPerCowDay) || 0);
    const milkRevenueMonth = milkPerDay * 30 * (parseFloat(milkPrice) || 0);

    const beefRevenueYear = (parseInt(cattleSoldPerYear) || 0) * (parseFloat(avgWeightKg) || 0) * (parseFloat(beefPricePerKg) || 0);
    const beefRevenueMonth = beefRevenueYear / 12;

    const feedCostMonth = totalAnimals * (parseFloat(feedCostPerAnimalMonth) || 0);
    const vetCostMonth = (totalAnimals * (parseFloat(vetCostPerAnimalYear) || 0)) / 12;
    const laborCost = parseFloat(laborCostMonth) || 0;

    const totalRevenueMonth = milkRevenueMonth + beefRevenueMonth;
    const totalCostMonth = feedCostMonth + vetCostMonth + laborCost;
    const profitMonth = totalRevenueMonth - totalCostMonth;
    const profitYear = profitMonth * 12;

    return { totalAnimals, milkPerDay, milkRevenueMonth, beefRevenueMonth, feedCostMonth, vetCostMonth, laborCost, totalRevenueMonth, totalCostMonth, profitMonth, profitYear };
  }, [farmType, milkCows, beefCattle, heifers, calves, milkPerCowDay, milkPrice, avgWeightKg, beefPricePerKg, cattleSoldPerYear, feedCostPerAnimalMonth, vetCostPerAnimalYear, laborCostMonth]);

  const fmt = (n: number) => `₹${Math.round(Math.abs(n)).toLocaleString("en-IN")}`;

  return (
    <div className="space-y-4">
      <div className="card p-6 space-y-5">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Farm Type</label>
          <div className="flex gap-2 flex-wrap">
            {([["dairy", "Dairy Farm"], ["beef", "Beef Farm"], ["mixed", "Mixed Farm"]] as const).map(([v, l]) => (
              <button key={v} onClick={() => setFarmType(v)} className={cn("rounded-full px-4 py-1.5 text-sm font-medium transition-colors", farmType === v ? "bg-green-700 text-white" : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400")}>
                {l}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Herd Composition</label>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {farmType !== "beef" && (
              <div>
                <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400">Milk Cows</label>
                <input type="number" value={milkCows} onChange={e => setMilkCows(e.target.value)} className="input-field" min="0" />
              </div>
            )}
            {farmType !== "dairy" && (
              <div>
                <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400">Beef Cattle</label>
                <input type="number" value={beefCattle} onChange={e => setBeefCattle(e.target.value)} className="input-field" min="0" />
              </div>
            )}
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400">Heifers</label>
              <input type="number" value={heifers} onChange={e => setHeifers(e.target.value)} className="input-field" min="0" />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400">Calves</label>
              <input type="number" value={calves} onChange={e => setCalves(e.target.value)} className="input-field" min="0" />
            </div>
          </div>
        </div>

        {farmType !== "beef" && (
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Dairy Production</label>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400">Milk per Cow / Day (L)</label>
                <input type="number" value={milkPerCowDay} onChange={e => setMilkPerCowDay(e.target.value)} className="input-field" />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400">Milk Price (₹/L)</label>
                <input type="number" value={milkPrice} onChange={e => setMilkPrice(e.target.value)} className="input-field" />
              </div>
            </div>
          </div>
        )}

        {farmType !== "dairy" && (
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Beef / Cattle Sales</label>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400">Cattle Sold / Year</label>
                <input type="number" value={cattleSoldPerYear} onChange={e => setCattleSoldPerYear(e.target.value)} className="input-field" />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400">Avg Weight (kg)</label>
                <input type="number" value={avgWeightKg} onChange={e => setAvgWeightKg(e.target.value)} className="input-field" />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400">Price (₹/kg)</label>
                <input type="number" value={beefPricePerKg} onChange={e => setBeefPricePerKg(e.target.value)} className="input-field" />
              </div>
            </div>
          </div>
        )}

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Monthly Costs</label>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400">Feed / Animal / Month (₹)</label>
              <input type="number" value={feedCostPerAnimalMonth} onChange={e => setFeedCostPerAnimalMonth(e.target.value)} className="input-field" />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400">Vet / Animal / Year (₹)</label>
              <input type="number" value={vetCostPerAnimalYear} onChange={e => setVetCostPerAnimalYear(e.target.value)} className="input-field" />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400">Labor / Month (₹)</label>
              <input type="number" value={laborCostMonth} onChange={e => setLaborCostMonth(e.target.value)} className="input-field" />
            </div>
          </div>
        </div>
      </div>

      <div className="card p-6 space-y-4">
        <h3 className="font-semibold text-gray-900 dark:text-gray-100">Monthly Summary</h3>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Herd Size", value: `${result.totalAnimals} animals`, sub: "Total cattle on farm", color: "bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800 text-green-900 dark:text-green-100" },
            { label: "Monthly Revenue", value: fmt(result.totalRevenueMonth), sub: farmType !== "beef" ? `${result.milkPerDay.toFixed(0)} L milk/day` : "Cattle sales", color: "bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800 text-blue-900 dark:text-blue-100" },
            { label: "Monthly Costs", value: fmt(result.totalCostMonth), sub: "Feed + Vet + Labor", color: "bg-yellow-50 dark:bg-yellow-950 border-yellow-200 dark:border-yellow-800 text-yellow-900 dark:text-yellow-100" },
            { label: "Monthly Profit", value: (result.profitMonth < 0 ? "−" : "") + fmt(result.profitMonth), sub: `${result.profitYear < 0 ? "−" : ""}${fmt(result.profitYear)}/year`, color: result.profitMonth >= 0 ? "bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800 text-green-900 dark:text-green-100" : "bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800 text-red-900 dark:text-red-100" },
          ].map(r => (
            <div key={r.label} className={cn("rounded-xl border p-4", r.color)}>
              <div className="text-xs font-medium opacity-70 mb-1">{r.label}</div>
              <div className="text-xl font-bold">{r.value}</div>
              <div className="text-xs opacity-60 mt-0.5">{r.sub}</div>
            </div>
          ))}
        </div>
        <div className="rounded-xl bg-gray-50 dark:bg-gray-800 p-4 text-sm text-gray-600 dark:text-gray-400 space-y-1">
          {farmType !== "beef" && <div className="flex justify-between"><span>Milk revenue / month:</span><span className="font-medium">{fmt(result.milkRevenueMonth)}</span></div>}
          {farmType !== "dairy" && <div className="flex justify-between"><span>Cattle sale revenue / month:</span><span className="font-medium">{fmt(result.beefRevenueMonth)}</span></div>}
          <div className="flex justify-between"><span>Feed cost / month:</span><span className="font-medium">{fmt(result.feedCostMonth)}</span></div>
          <div className="flex justify-between"><span>Vet cost / month:</span><span className="font-medium">{fmt(result.vetCostMonth)}</span></div>
          <div className="flex justify-between"><span>Labor cost / month:</span><span className="font-medium">{fmt(result.laborCost)}</span></div>
          <div className="flex justify-between font-semibold pt-1 border-t border-gray-200 dark:border-gray-600">
            <span>Annual profit:</span>
            <span className={result.profitYear >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}>
              {result.profitYear < 0 ? "−" : ""}{fmt(result.profitYear)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
