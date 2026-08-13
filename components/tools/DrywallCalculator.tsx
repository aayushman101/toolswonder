"use client";
import { useState, useMemo } from "react";

export default function DrywallCalculator() {
  const [squareFeet, setSquareFeet] = useState("400");
  const [sheetSize, setSheetSize] = useState("48");
  const [waste, setWaste] = useState("10");
  const [pricePerSheet, setPricePerSheet] = useState("15");

  const result = useMemo(() => {
    const sqft = parseFloat(squareFeet) || 0;
    const sheets = (sqft / parseFloat(sheetSize)) || 0;
    const wastePercent = (parseFloat(waste) || 0) / 100;
    const sheetsNeeded = Math.ceil(sheets * (1 + wastePercent));
    const cost = sheetsNeeded * (parseFloat(pricePerSheet) || 0);
    const jointCompound = Math.ceil(sheets / 10);
    const tape = Math.ceil((sqft / 100) * 50);

    return { sheets, sheetsNeeded, cost, jointCompound, tape };
  }, [squareFeet, sheetSize, waste, pricePerSheet]);

  return (
    <div className="space-y-4">
      <div className="card p-5 space-y-3">
        <div><label className="block text-sm font-medium mb-1">Room Size (sq ft)</label><input type="number" value={squareFeet} onChange={(e) => setSquareFeet(e.target.value)} className="input-field" /></div>
        <div><label className="block text-sm font-medium mb-1">Drywall Sheet Size</label><select value={sheetSize} onChange={(e) => setSheetSize(e.target.value)} className="input-field"><option value="32">4x8 (32 sq ft)</option><option value="48">4x12 (48 sq ft)</option></select></div>
        <div className="grid grid-cols-2 gap-3"><div><label className="block text-xs font-medium mb-1">Waste %</label><input type="number" value={waste} onChange={(e) => setWaste(e.target.value)} className="input-field" /></div><div><label className="block text-xs font-medium mb-1">Price/Sheet</label><input type="number" value={pricePerSheet} onChange={(e) => setPricePerSheet(e.target.value)} className="input-field" /></div></div>
      </div>
      <div className="card p-6 space-y-3">
        <div className="grid grid-cols-2 gap-3"><div className="bg-blue-50 dark:bg-blue-950 p-3 rounded"><div className="text-xs text-gray-600 dark:text-gray-400">Sheets Needed</div><div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{result.sheetsNeeded}</div></div><div className="bg-green-50 dark:bg-green-950 p-3 rounded"><div className="text-xs text-gray-600 dark:text-gray-400">Estimated Cost</div><div className="text-2xl font-bold text-green-600 dark:text-green-400">${result.cost.toFixed(0)}</div></div></div>
        <div className="text-xs space-y-1 bg-gray-50 dark:bg-gray-800 p-3 rounded"><div className="flex justify-between"><span>Joint Compound (5-gal buckets):</span><span className="font-medium">{result.jointCompound}</span></div><div className="flex justify-between"><span>Drywall Tape (feet):</span><span className="font-medium">{result.tape}</span></div></div>
      </div>
    </div>
  );
}
