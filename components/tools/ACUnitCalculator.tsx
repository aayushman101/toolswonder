"use client";
import { useState, useMemo } from "react";

export default function ACUnitCalculator() {
  const [squareFeet, setSquareFeet] = useState("1500");
  const [climate, setClimate] = useState("moderate");
  const [ceiling, setCeiling] = useState("8");
  const [insulation, setInsulation] = useState("average");

  const climateFactor: Record<string, number> = {
    cool: 20, moderate: 25, hot: 30, very_hot: 35
  };
  const insulationFactor: Record<string, number> = {
    poor: 1.2, average: 1.0, good: 0.85
  };

  const result = useMemo(() => {
    const sqft = parseFloat(squareFeet) || 0;
    const ceilHeight = parseFloat(ceiling) || 8;
    const btuPerSqft = climateFactor[climate] || 25;
    const totalBtu = sqft * btuPerSqft * insulationFactor[insulation];
    const tons = Math.ceil(totalBtu / 12000 / 2) * 2;

    return { totalBtu, tons };
  }, [squareFeet, climate, insulation, ceiling]);

  return (
    <div className="space-y-4">
      <div className="card p-5 space-y-3">
        <div><label className="block text-sm font-medium mb-1">Square Feet</label><input type="number" value={squareFeet} onChange={(e) => setSquareFeet(e.target.value)} className="input-field" /></div>
        <div><label className="block text-sm font-medium mb-1">Climate</label><select value={climate} onChange={(e) => setClimate(e.target.value)} className="input-field"><option value="cool">Cool</option><option value="moderate">Moderate</option><option value="hot">Hot</option><option value="very_hot">Very Hot</option></select></div>
        <div><label className="block text-sm font-medium mb-1">Insulation</label><select value={insulation} onChange={(e) => setInsulation(e.target.value)} className="input-field"><option value="poor">Poor</option><option value="average">Average</option><option value="good">Good</option></select></div>
      </div>
      <div className="card p-6">
        <div className="text-center"><div className="text-sm text-gray-600 dark:text-gray-400">Recommended AC Size</div><div className="text-4xl font-bold text-blue-600 dark:text-blue-400">{result.tons} Ton{result.tons !== 1 ? 's' : ''}</div><div className="text-sm text-gray-600 dark:text-gray-400 mt-2">{Math.round(result.totalBtu).toLocaleString()} BTU/h</div></div>
      </div>
    </div>
  );
}
