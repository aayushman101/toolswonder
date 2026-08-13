"use client";
import { useState, useMemo } from "react";

export default function FurnaceBtuCalculator() {
  const [squareFeet, setSquareFeet] = useState("1500");
  const [climate, setClimate] = useState("moderate");
  const [insulation, setInsulation] = useState("average");

  const result = useMemo(() => {
    const sqft = parseFloat(squareFeet) || 0;

    // BTU per square foot by climate (heating)
    const climateMap: { [key: string]: number } = {
      "mild": 25,      // Mild winters (South)
      "moderate": 35,  // Moderate winters (Mid-Atlantic, Midwest)
      "cold": 45,      // Cold winters (Northeast, Northern Midwest)
      "very-cold": 60, // Very cold winters (Northern climates, mountains)
    };

    // Insulation factor (multiplier to adjust BTU)
    const insulationMap: { [key: string]: number } = {
      "poor": 1.3,      // Poor insulation, older homes
      "average": 1.0,   // Average/standard insulation
      "good": 0.85,     // Good insulation, modern homes
      "excellent": 0.7, // Excellent insulation, well-sealed
    };

    const btuPerSqFt = climateMap[climate] || 35;
    const insulationFactor = insulationMap[insulation] || 1.0;

    // Calculate BTU requirement
    const baseBtu = sqft * btuPerSqFt;
    const adjustedBtu = baseBtu * insulationFactor;

    // Round to nearest 5,000 for standard furnace sizing
    const furnaceBtu = Math.ceil(adjustedBtu / 5000) * 5000;

    // Furnace size recommendation (BTU to output size)
    let furnaceSize = "";
    if (furnaceBtu <= 40000) furnaceSize = "40,000 BTU/hr";
    else if (furnaceBtu <= 60000) furnaceSize = "60,000 BTU/hr";
    else if (furnaceBtu <= 80000) furnaceSize = "80,000 BTU/hr";
    else if (furnaceBtu <= 100000) furnaceSize = "100,000 BTU/hr";
    else if (furnaceBtu <= 120000) furnaceSize = "120,000 BTU/hr";
    else furnaceSize = `${Math.ceil(furnaceBtu / 10000) * 10000} BTU/hr`;

    return { adjustedBtu, furnaceBtu, furnaceSize };
  }, [squareFeet, climate, insulation]);

  return (
    <div className="space-y-6">
      <div className="card p-5 space-y-4">
        <h3 className="text-lg font-semibold">Enter Your Home Details</h3>
        <div><label className="block text-sm font-medium mb-1">Square Footage</label><input type="number" value={squareFeet} onChange={(e) => setSquareFeet(e.target.value)} className="input-field" placeholder="e.g., 1500" /></div>
        <div><label className="block text-sm font-medium mb-1">Climate Zone</label><select value={climate} onChange={(e) => setClimate(e.target.value)} className="input-field"><option value="mild">Mild (South, warm winters) — 25 BTU/sq ft</option><option value="moderate">Moderate (Mid-Atlantic, Midwest) — 35 BTU/sq ft</option><option value="cold">Cold (Northeast, Northern Midwest) — 45 BTU/sq ft</option><option value="very-cold">Very Cold (Northern areas, mountains) — 60 BTU/sq ft</option></select></div>
        <div><label className="block text-sm font-medium mb-1">Insulation Level</label><select value={insulation} onChange={(e) => setInsulation(e.target.value)} className="input-field"><option value="poor">Poor (older homes, minimal insulation) — Add 30%</option><option value="average">Average (standard homes) — No adjustment</option><option value="good">Good (modern homes, well-insulated) — Reduce 15%</option><option value="excellent">Excellent (new homes, sealed) — Reduce 30%</option></select></div>
        <button onClick={() => window.location.hash = '#results'} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded">Calculate My Furnace Size</button>
      </div>

      <div id="results" className="card p-6 space-y-4">
        <h3 className="text-lg font-semibold">Your Furnace Recommendation</h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
            <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Calculated Requirement</div>
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{result.adjustedBtu.toFixed(0)}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">BTU/hour</div>
          </div>
          <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg">
            <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Furnace Size</div>
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">{result.furnaceSize}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Recommended</div>
          </div>
        </div>
        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded space-y-2 text-sm">
          <div className="flex justify-between"><span className="text-gray-700 dark:text-gray-300">Exact Calculation:</span><span className="font-medium text-gray-900 dark:text-gray-100">{result.furnaceBtu.toLocaleString()} BTU/hr</span></div>
          <div className="flex justify-between"><span className="text-gray-700 dark:text-gray-300">Climate Factor:</span><span className="font-medium text-gray-900 dark:text-gray-100">{climate === "mild" ? "25" : climate === "moderate" ? "35" : climate === "cold" ? "45" : "60"} BTU/sq ft</span></div>
          <div className="flex justify-between"><span className="text-gray-700 dark:text-gray-300">Insulation Adjustment:</span><span className="font-medium text-gray-900 dark:text-gray-100">{insulation === "poor" ? "+30%" : insulation === "good" ? "-15%" : insulation === "excellent" ? "-30%" : "None"}</span></div>
        </div>
      </div>
    </div>
  );
}
