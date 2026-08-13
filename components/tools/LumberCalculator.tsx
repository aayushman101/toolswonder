"use client";
import { useState, useMemo } from "react";

export default function LumberCalculator() {
  const [projectType, setProjectType] = useState("deck");
  const [length, setLength] = useState("12");
  const [width, setWidth] = useState("10");
  const [spacing, setSpacing] = useState("12");
  const [boardSize, setBoardSize] = useState("2x6");
  const [costPerBf, setCostPerBf] = useState("1.50");

  const result = useMemo(() => {
    const len = parseFloat(length) || 0;
    const wid = parseFloat(width) || 0;
    const spac = parseFloat(spacing) || 0;
    const cost = parseFloat(costPerBf) || 0;

    // Calculate board feet based on project type
    let boardFeet = 0;
    let description = "";

    if (projectType === "deck") {
      // Deck: typical 2x6 boards spaced 16" apart
      const numBoards = Math.ceil((len / (spac / 12)));
      boardFeet = (numBoards * wid * 2 * 6) / 12;
      description = `${numBoards} boards × ${wid} ft × 2×6`;
    } else if (projectType === "framing") {
      // Framing: studs typically 16" or 24" apart, need top/bottom plate
      const numStuds = Math.ceil((len / (spac / 12)));
      const height = parseFloat(spacing) > 20 ? 8 : 8; // Default 8 ft walls
      boardFeet = (numStuds * height * 1.5 * 5.5) / 12; // 2x6 actual
      description = `${numStuds} studs × 8 ft height`;
    } else if (projectType === "joists") {
      // Floor joists: 2x8 or 2x10 typical
      const numJoists = Math.ceil((wid / (spac / 12)));
      boardFeet = (numJoists * len * 2 * 8) / 12;
      description = `${numJoists} joists × ${len} ft × 2×8`;
    } else if (projectType === "fence") {
      // Fence: 6 ft sections, pickets every 5-6"
      const numSections = Math.ceil(len / 6);
      const picketsPerSection = Math.ceil(6 / (spac / 12));
      const totalPickets = numSections * picketsPerSection;
      boardFeet = (totalPickets * 6 * 1 * 4) / 12; // 1x4 pickets
      description = `${totalPickets} pickets × 6 ft × 1×4`;
    }

    const totalCost = boardFeet * cost;

    return { boardFeet, totalCost, description };
  }, [projectType, length, width, spacing, costPerBf]);

  return (
    <div className="space-y-4">
      <div className="card p-5 space-y-3">
        <div><label className="block text-sm font-medium mb-1">Project Type</label><select value={projectType} onChange={(e) => setProjectType(e.target.value)} className="input-field"><option value="deck">Deck</option><option value="framing">Framing (Walls)</option><option value="joists">Floor Joists</option><option value="fence">Fence</option></select></div>
        <div className="grid grid-cols-2 gap-3">
          <div><label className="block text-xs font-medium mb-1">Length (ft)</label><input type="number" value={length} onChange={(e) => setLength(e.target.value)} className="input-field" /></div>
          <div><label className="block text-xs font-medium mb-1">Width (ft)</label><input type="number" value={width} onChange={(e) => setWidth(e.target.value)} className="input-field" /></div>
        </div>
        <div><label className="block text-xs font-medium mb-1">Spacing (inches) - typically 12&quot;, 16&quot;, or 24&quot;</label><input type="number" value={spacing} onChange={(e) => setSpacing(e.target.value)} className="input-field" /></div>
        <div><label className="block text-sm font-medium mb-1">Lumber Size</label><select value={boardSize} onChange={(e) => setBoardSize(e.target.value)} className="input-field"><option value="2x4">2×4</option><option value="2x6">2×6</option><option value="2x8">2×8</option><option value="2x10">2×10</option><option value="1x4">1×4</option><option value="1x6">1×6</option></select></div>
        <div><label className="block text-xs font-medium mb-1">Cost per Board Foot ($)</label><input type="number" step="0.10" value={costPerBf} onChange={(e) => setCostPerBf(e.target.value)} className="input-field" /></div>
      </div>
      <div className="card p-6 space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-blue-50 dark:bg-blue-950 p-3 rounded">
            <div className="text-xs text-gray-600 dark:text-gray-400">Board Feet</div>
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{result.boardFeet.toFixed(1)}</div>
          </div>
          <div className="bg-green-50 dark:bg-green-950 p-3 rounded">
            <div className="text-xs text-gray-600 dark:text-gray-400">Est. Cost</div>
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">${result.totalCost.toFixed(0)}</div>
          </div>
        </div>
        <div className="text-xs space-y-1 bg-gray-50 dark:bg-gray-800 p-3 rounded">
          <div className="flex justify-between"><span>Breakdown:</span><span className="font-medium">{result.description}</span></div>
          <div className="flex justify-between"><span>Cost/BF:</span><span className="font-medium">${costPerBf}</span></div>
        </div>
      </div>
    </div>
  );
}
