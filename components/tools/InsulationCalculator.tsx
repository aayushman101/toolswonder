"use client";
import { useState, useMemo } from "react";

export default function InsulationCalculator() {
  const [squareFeet, setSquareFeet] = useState("1000");
  const [rValue, setRValue] = useState("R-13");
  const [insulationType, setInsulationType] = useState("fiberglass");
  const [pricePerSqFt, setPricePerSqFt] = useState("0.50");

  const result = useMemo(() => {
    const sqft = parseFloat(squareFeet) || 0;
    const price = parseFloat(pricePerSqFt) || 0;
    const totalCost = sqft * price;

    // Coverage rates per unit (batts/rolls/bags)
    const coverageMap: { [key: string]: number } = {
      "fiberglass": 65.78, // R-13 batt covers ~65.78 sq ft
      "cellulose": 100,    // Loose-fill covers larger area
      "spray-foam": 200,   // Higher coverage
      "mineral-wool": 62.5, // Similar to fiberglass
    };

    const coveragePerUnit = coverageMap[insulationType] || 65;
    const unitsNeeded = Math.ceil(sqft / coveragePerUnit);

    return { sqft, unitsNeeded, totalCost, coveragePerUnit };
  }, [squareFeet, insulationType, pricePerSqFt]);

  return (
    <div className="space-y-4">
      <div className="card p-5 space-y-3">
        <div><label className="block text-sm font-medium mb-1">Room/Attic Size (sq ft)</label><input type="number" value={squareFeet} onChange={(e) => setSquareFeet(e.target.value)} className="input-field" /></div>
        <div><label className="block text-sm font-medium mb-1">R-Value Needed</label><select value={rValue} onChange={(e) => setRValue(e.target.value)} className="input-field"><option value="R-13">R-13 (Walls)</option><option value="R-15">R-15 (Attic, mild climate)</option><option value="R-19">R-19 (Attic, moderate)</option><option value="R-30">R-30 (Attic, cold)</option><option value="R-38">R-38 (Attic, very cold)</option><option value="R-49">R-49 (Attic, extreme)</option></select></div>
        <div><label className="block text-sm font-medium mb-1">Insulation Type</label><select value={insulationType} onChange={(e) => setInsulationType(e.target.value)} className="input-field"><option value="fiberglass">Fiberglass Batts</option><option value="cellulose">Cellulose (Blown-In)</option><option value="spray-foam">Spray Foam</option><option value="mineral-wool">Mineral Wool</option></select></div>
        <div><label className="block text-xs font-medium mb-1">Price per Sq Ft ($)</label><input type="number" step="0.01" value={pricePerSqFt} onChange={(e) => setPricePerSqFt(e.target.value)} className="input-field" /></div>
      </div>
      <div className="card p-6 space-y-3">
        <div className="grid grid-cols-2 gap-3"><div className="bg-blue-50 dark:bg-blue-950 p-3 rounded"><div className="text-xs text-gray-600 dark:text-gray-400">Units Needed</div><div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{result.unitsNeeded}</div></div><div className="bg-green-50 dark:bg-green-950 p-3 rounded"><div className="text-xs text-gray-600 dark:text-gray-400">Estimated Cost</div><div className="text-2xl font-bold text-green-600 dark:text-green-400">${result.totalCost.toFixed(0)}</div></div></div>
        <div className="text-xs space-y-1 bg-gray-50 dark:bg-gray-800 p-3 rounded"><div className="flex justify-between"><span>Coverage (sq ft per unit):</span><span className="font-medium">{result.coveragePerUnit}</span></div><div className="flex justify-between"><span>Total Area:</span><span className="font-medium">{result.sqft.toLocaleString()} sq ft</span></div></div>
      </div>
    </div>
  );
}
