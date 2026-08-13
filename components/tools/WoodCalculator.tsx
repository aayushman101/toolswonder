"use client";
import { useState, useMemo } from "react";

export default function WoodCalculator() {
  const [length, setLength] = useState("10");
  const [width, setWidth] = useState("8");
  const [thickness, setThickness] = useState("1");
  const [unit, setUnit] = useState("feet");
  const [woodType, setWoodType] = useState("lumber");

  const result = useMemo(() => {
    const len = parseFloat(length) || 0;
    const wid = parseFloat(width) || 0;
    const thick = parseFloat(thickness) || 0;

    // Convert to feet if needed
    let lenFt = len;
    let widFt = wid;
    let thickFt = thick;

    if (unit === "inches") {
      lenFt = len / 12;
      widFt = wid / 12;
      thickFt = thick / 12;
    }

    // Calculate cubic feet
    const cubicFeet = lenFt * widFt * thickFt;

    // Board feet (thickness in inches × width in inches × length in feet ÷ 12)
    const boardFeet = (thick * (wid * 12) * lenFt) / 12;

    // Cords of wood (1 cord = 128 cubic feet)
    const cords = cubicFeet / 128;

    // Weight estimation (lbs per cubic foot varies by wood type)
    const weightMap: { [key: string]: number } = {
      "lumber": 35,        // Average softwood
      "hardwood": 45,      // Average hardwood
      "firewood": 40,      // Mixed firewood (green)
      "plywood": 40,       // Plywood average
      "cedar": 30,         // Cedar/light wood
    };

    const weightPerCubicFt = weightMap[woodType] || 35;
    const totalWeight = cubicFeet * weightPerCubicFt;

    return { cubicFeet, boardFeet, cords, totalWeight, weightPerCubicFt };
  }, [length, width, thickness, unit, woodType]);

  return (
    <div className="space-y-4">
      <div className="card p-5 space-y-3">
        <div><label className="block text-sm font-medium mb-1">Unit</label><select value={unit} onChange={(e) => setUnit(e.target.value)} className="input-field"><option value="feet">Feet</option><option value="inches">Inches</option></select></div>
        <div className="grid grid-cols-3 gap-2">
          <div><label className="block text-xs font-medium mb-1">Length ({unit === "feet" ? "ft" : "in"})</label><input type="number" value={length} onChange={(e) => setLength(e.target.value)} className="input-field" /></div>
          <div><label className="block text-xs font-medium mb-1">Width ({unit === "feet" ? "ft" : "in"})</label><input type="number" value={width} onChange={(e) => setWidth(e.target.value)} className="input-field" /></div>
          <div><label className="block text-xs font-medium mb-1">Thickness ({unit === "feet" ? "ft" : "in"})</label><input type="number" step="0.25" value={thickness} onChange={(e) => setThickness(e.target.value)} className="input-field" /></div>
        </div>
        <div><label className="block text-sm font-medium mb-1">Wood Type (for weight)</label><select value={woodType} onChange={(e) => setWoodType(e.target.value)} className="input-field"><option value="lumber">Lumber (Softwood)</option><option value="hardwood">Hardwood</option><option value="firewood">Firewood (Green)</option><option value="plywood">Plywood</option><option value="cedar">Cedar/Light Wood</option></select></div>
      </div>
      <div className="card p-6 space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-blue-50 dark:bg-blue-950 p-3 rounded">
            <div className="text-xs text-gray-600 dark:text-gray-400">Cubic Feet</div>
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{result.cubicFeet.toFixed(2)}</div>
          </div>
          <div className="bg-green-50 dark:bg-green-950 p-3 rounded">
            <div className="text-xs text-gray-600 dark:text-gray-400">Board Feet</div>
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">{result.boardFeet.toFixed(1)}</div>
          </div>
        </div>
        <div className="text-xs space-y-1 bg-gray-50 dark:bg-gray-800 p-3 rounded">
          <div className="flex justify-between"><span>Cords:</span><span className="font-medium">{result.cords.toFixed(3)}</span></div>
          <div className="flex justify-between"><span>Est. Weight:</span><span className="font-medium">{result.totalWeight.toFixed(0)} lbs</span></div>
          <div className="flex justify-between"><span>Density ({woodType}):</span><span className="font-medium">{result.weightPerCubicFt} lbs/cu ft</span></div>
        </div>
      </div>
    </div>
  );
}
