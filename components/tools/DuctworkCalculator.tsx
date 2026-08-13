"use client";
import { useState, useMemo } from "react";

export default function DuctworkCalculator() {
  const [cfm, setCfm] = useState("1000");
  const [ductType, setDuctType] = useState("round");
  const [velocity, setVelocity] = useState("1000");

  const result = useMemo(() => {
    const cfmVal = parseFloat(cfm) || 0;
    const velocityVal = parseFloat(velocity) || 1000;

    // Calculate duct area needed (Area = CFM / Velocity)
    const areaSquareInches = (cfmVal / velocityVal) * 144;

    // Round duct diameter calculation: Area = π * r²
    // Diameter = 2 * sqrt(Area / π)
    let roundDiameter = 0;
    if (areaSquareInches > 0) {
      const radius = Math.sqrt(areaSquareInches / Math.PI);
      roundDiameter = 2 * radius;
    }

    // Rectangular duct: assume 1:1 aspect ratio for default
    // Width = Height = sqrt(Area)
    let rectWidth = 0;
    let rectHeight = 0;
    if (areaSquareInches > 0) {
      rectWidth = Math.sqrt(areaSquareInches);
      rectHeight = rectWidth;
    }

    // Friction loss (approximation in inches of water per 100 ft)
    // Using simplified formula: FL = 0.1 * (velocity/1000)^2
    const frictionLoss = 0.1 * Math.pow(velocityVal / 1000, 2);

    return {
      areaSquareInches,
      roundDiameter,
      rectWidth,
      rectHeight,
      frictionLoss,
    };
  }, [cfm, velocity]);

  return (
    <div className="space-y-6">
      <div className="card p-5 space-y-4">
        <h3 className="text-lg font-semibold">Enter Airflow & Velocity</h3>
        <div>
          <label className="block text-sm font-medium mb-1">CFM (Cubic Feet per Minute)</label>
          <input
            type="number"
            value={cfm}
            onChange={(e) => setCfm(e.target.value)}
            className="input-field"
            placeholder="e.g., 1000"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Velocity (FPM - Feet per Minute)</label>
          <select
            value={velocity}
            onChange={(e) => setVelocity(e.target.value)}
            className="input-field"
          >
            <option value="600">Low (600 FPM) — Quiet, low noise</option>
            <option value="800">Medium (800 FPM) — Standard residential</option>
            <option value="1000">High (1000 FPM) — Commercial, noise okay</option>
            <option value="1200">Very High (1200 FPM) — High-velocity systems</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Duct Type</label>
          <select
            value={ductType}
            onChange={(e) => setDuctType(e.target.value)}
            className="input-field"
          >
            <option value="round">Round Duct</option>
            <option value="rectangular">Rectangular Duct (1:1 ratio)</option>
          </select>
        </div>
      </div>

      <div id="results" className="card p-6 space-y-4">
        <h3 className="text-lg font-semibold">Duct Sizing Results</h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
            <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Required Area</div>
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
              {result.areaSquareInches.toFixed(1)}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">sq inches</div>
          </div>
          <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg">
            <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Friction Loss</div>
            <div className="text-3xl font-bold text-green-600 dark:text-green-400">
              {result.frictionLoss.toFixed(2)}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">in. H₂O/100 ft</div>
          </div>
        </div>

        {ductType === "round" ? (
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded space-y-3 text-sm">
            <div>
              <div className="text-gray-700 dark:text-gray-300 mb-1">Round Duct Diameter</div>
              <div className="font-bold text-lg text-gray-900 dark:text-gray-100">
                {result.roundDiameter.toFixed(2)}&quot; diameter
              </div>
              <div className="text-xs text-gray-500 mt-1">
                Standard sizes: 4&quot;, 5&quot;, 6&quot;, 7&quot;, 8&quot;, 10&quot;, 12&quot;, 14&quot;, 16&quot;
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded space-y-3 text-sm">
            <div>
              <div className="text-gray-700 dark:text-gray-300 mb-1">Rectangular Duct Size</div>
              <div className="font-bold text-lg text-gray-900 dark:text-gray-100">
                {result.rectWidth.toFixed(1)}&quot; × {result.rectHeight.toFixed(1)}&quot;
              </div>
              <div className="text-xs text-gray-500 mt-1">Width × Height (1:1 aspect ratio)</div>
            </div>
          </div>
        )}

        <div className="bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-700 p-3 rounded text-sm text-yellow-800 dark:text-yellow-200">
          ℹ️ <span className="font-medium">Tip:</span> Lower velocity = quieter, but larger duct. Higher velocity = compact, but more noise. Standard residential: 800 FPM.
        </div>
      </div>
    </div>
  );
}
