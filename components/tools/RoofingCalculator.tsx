"use client";
import { useState, useMemo } from "react";

export default function RoofingCalculator() {
  const [roofLength, setRoofLength] = useState("40");
  const [roofWidth, setRoofWidth] = useState("30");
  const [pitch, setPitch] = useState("6");
  const [material, setMaterial] = useState("asphalt");
  const [wastePercent, setWastePercent] = useState("10");
  const [costPerSqFt, setCostPerSqFt] = useState("3.50");

  const result = useMemo(() => {
    const length = parseFloat(roofLength) || 0;
    const width = parseFloat(roofWidth) || 0;
    const pitchRise = parseFloat(pitch) || 0;
    const waste = (parseFloat(wastePercent) || 0) / 100;
    const costPer = parseFloat(costPerSqFt) || 0;

    // Calculate roof area with pitch factor (simplified formula using Pythagorean theorem)
    // For a pitch of X:12, the multiplier is sqrt(X^2 + 144) / 12
    const pitchMultiplier = Math.sqrt(pitchRise * pitchRise + 144) / 12;
    const baseArea = length * width;
    const actualRoofArea = baseArea * pitchMultiplier;
    const areaWithWaste = actualRoofArea * (1 + waste);

    // Material coverage rates (sq ft per unit)
    const coverageMap: { [key: string]: { rate: number; unit: string } } = {
      "asphalt": { rate: 100, unit: "sq ft per bundle (3 bundles per square)" },
      "metal": { rate: 100, unit: "sq ft per square" },
      "tile": { rate: 100, unit: "sq ft" },
      "wood": { rate: 100, unit: "sq ft per bundle" },
      "composite": { rate: 100, unit: "sq ft per bundle" },
    };

    const { rate, unit } = coverageMap[material] || { rate: 100, unit: "sq ft" };
    const squaresNeeded = Math.ceil(areaWithWaste / 100); // Roofing is measured in "squares" (100 sq ft)
    const cost = squaresNeeded * 100 * costPer;
    const laborHours = squaresNeeded * 1.5; // Rough estimate: 1.5 hours per square

    return { actualRoofArea, areaWithWaste, squaresNeeded, cost, laborHours };
  }, [roofLength, roofWidth, pitch, material, wastePercent, costPerSqFt]);

  return (
    <div className="space-y-4">
      <div className="card p-5 space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div><label className="block text-xs font-medium mb-1">Roof Length (ft)</label><input type="number" value={roofLength} onChange={(e) => setRoofLength(e.target.value)} className="input-field" /></div>
          <div><label className="block text-xs font-medium mb-1">Roof Width (ft)</label><input type="number" value={roofWidth} onChange={(e) => setRoofWidth(e.target.value)} className="input-field" /></div>
        </div>
        <div><label className="block text-sm font-medium mb-1">Roof Pitch (rise:12)</label><select value={pitch} onChange={(e) => setPitch(e.target.value)} className="input-field"><option value="2">2:12 (Shallow)</option><option value="4">4:12 (Low)</option><option value="6">6:12 (Standard)</option><option value="8">8:12 (Medium)</option><option value="10">10:12 (Steep)</option><option value="12">12:12 (Very Steep)</option></select></div>
        <div><label className="block text-sm font-medium mb-1">Roofing Material</label><select value={material} onChange={(e) => setMaterial(e.target.value)} className="input-field"><option value="asphalt">Asphalt Shingles</option><option value="metal">Metal Roofing</option><option value="tile">Tile</option><option value="wood">Wood Shakes</option><option value="composite">Composite</option></select></div>
        <div className="grid grid-cols-2 gap-3">
          <div><label className="block text-xs font-medium mb-1">Waste %</label><input type="number" value={wastePercent} onChange={(e) => setWastePercent(e.target.value)} className="input-field" /></div>
          <div><label className="block text-xs font-medium mb-1">Cost/Sq Ft ($)</label><input type="number" step="0.10" value={costPerSqFt} onChange={(e) => setCostPerSqFt(e.target.value)} className="input-field" /></div>
        </div>
      </div>
      <div className="card p-6 space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-blue-50 dark:bg-blue-950 p-3 rounded">
            <div className="text-xs text-gray-600 dark:text-gray-400">Roofing Squares</div>
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{result.squaresNeeded}</div>
          </div>
          <div className="bg-green-50 dark:bg-green-950 p-3 rounded">
            <div className="text-xs text-gray-600 dark:text-gray-400">Total Cost</div>
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">${result.cost.toFixed(0)}</div>
          </div>
        </div>
        <div className="text-xs space-y-1 bg-gray-50 dark:bg-gray-800 p-3 rounded">
          <div className="flex justify-between"><span>Actual Roof Area:</span><span className="font-medium">{result.actualRoofArea.toFixed(0)} sq ft</span></div>
          <div className="flex justify-between"><span>With Waste ({wastePercent}%):</span><span className="font-medium">{result.areaWithWaste.toFixed(0)} sq ft</span></div>
          <div className="flex justify-between"><span>Est. Labor Hours:</span><span className="font-medium">{result.laborHours.toFixed(1)} hrs</span></div>
        </div>
      </div>
    </div>
  );
}
