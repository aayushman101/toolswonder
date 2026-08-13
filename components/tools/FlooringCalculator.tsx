"use client";
import { useState, useMemo } from "react";

export default function FlooringCalculator() {
  const [roomLength, setRoomLength] = useState("20");
  const [roomWidth, setRoomWidth] = useState("15");
  const [flooringType, setFlooringType] = useState("laminate");
  const [wastePercent, setWastePercent] = useState("10");
  const [costPerSqFt, setCostPerSqFt] = useState("2.50");

  const result = useMemo(() => {
    const length = parseFloat(roomLength) || 0;
    const width = parseFloat(roomWidth) || 0;
    const waste = (parseFloat(wastePercent) || 0) / 100;
    const costPer = parseFloat(costPerSqFt) || 0;

    const baseArea = length * width;
    const areaWithWaste = baseArea * (1 + waste);

    // Coverage rates per box/unit (sq ft)
    const coverageMap: { [key: string]: { rate: number; unit: string } } = {
      "laminate": { rate: 10, unit: "sq ft per box (planks)" },
      "vinyl": { rate: 9, unit: "sq ft per box" },
      "hardwood": { rate: 20, unit: "sq ft per box" },
      "tile": { rate: 7, unit: "sq ft per box" },
      "carpet": { rate: 50, unit: "sq ft per roll (12 ft wide)" },
    };

    const { rate, unit } = coverageMap[flooringType] || { rate: 10, unit: "sq ft per box" };
    const boxesNeeded = Math.ceil(areaWithWaste / rate);
    const cost = areaWithWaste * costPer;

    return { baseArea, areaWithWaste, boxesNeeded, cost, rate, unit };
  }, [roomLength, roomWidth, flooringType, wastePercent, costPerSqFt]);

  return (
    <div className="space-y-4">
      <div className="card p-5 space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div><label className="block text-xs font-medium mb-1">Room Length (ft)</label><input type="number" value={roomLength} onChange={(e) => setRoomLength(e.target.value)} className="input-field" /></div>
          <div><label className="block text-xs font-medium mb-1">Room Width (ft)</label><input type="number" value={roomWidth} onChange={(e) => setRoomWidth(e.target.value)} className="input-field" /></div>
        </div>
        <div><label className="block text-sm font-medium mb-1">Flooring Material</label><select value={flooringType} onChange={(e) => setFlooringType(e.target.value)} className="input-field"><option value="laminate">Laminate</option><option value="vinyl">Vinyl Plank (LVP)</option><option value="hardwood">Hardwood</option><option value="tile">Tile</option><option value="carpet">Carpet</option></select></div>
        <div className="grid grid-cols-2 gap-3">
          <div><label className="block text-xs font-medium mb-1">Waste %</label><input type="number" value={wastePercent} onChange={(e) => setWastePercent(e.target.value)} className="input-field" /></div>
          <div><label className="block text-xs font-medium mb-1">Cost/Sq Ft ($)</label><input type="number" step="0.10" value={costPerSqFt} onChange={(e) => setCostPerSqFt(e.target.value)} className="input-field" /></div>
        </div>
      </div>
      <div className="card p-6 space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-blue-50 dark:bg-blue-950 p-3 rounded">
            <div className="text-xs text-gray-600 dark:text-gray-400">Boxes Needed</div>
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{result.boxesNeeded}</div>
          </div>
          <div className="bg-green-50 dark:bg-green-950 p-3 rounded">
            <div className="text-xs text-gray-600 dark:text-gray-400">Total Cost</div>
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">${result.cost.toFixed(0)}</div>
          </div>
        </div>
        <div className="text-xs space-y-1 bg-gray-50 dark:bg-gray-800 p-3 rounded">
          <div className="flex justify-between"><span>Room Size:</span><span className="font-medium">{result.baseArea.toFixed(0)} sq ft</span></div>
          <div className="flex justify-between"><span>With Waste ({wastePercent}%):</span><span className="font-medium">{result.areaWithWaste.toFixed(0)} sq ft</span></div>
          <div className="flex justify-between"><span>Coverage per Box:</span><span className="font-medium">{result.rate} sq ft</span></div>
        </div>
      </div>
    </div>
  );
}
