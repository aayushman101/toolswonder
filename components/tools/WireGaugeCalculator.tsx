"use client";
import { useState, useMemo } from "react";

export default function WireGaugeCalculator() {
  const [current, setCurrent] = useState("10");
  const [voltage, setVoltage] = useState("12");
  const [distance, setDistance] = useState("50");
  const [voltDrop, setVoltDrop] = useState("3");

  const result = useMemo(() => {
    const I = parseFloat(current) || 0;
    const V = parseFloat(voltage) || 12;
    const D = parseFloat(distance) || 50;
    const VD = parseFloat(voltDrop) || 3;

    // Calculate maximum voltage drop allowed (percentage)
    const maxVD = (VD / V) * 100;

    // Wire resistance table (ohms per 1000 feet at 20°C)
    // Common copper wire gauges
    const wireResistance: { [key: string]: number } = {
      "14": 2.525,
      "12": 1.588,
      "10": 0.9989,
      "8": 0.6282,
      "6": 0.3951,
      "4": 0.2485,
      "2": 0.1563,
      "1": 0.1239,
      "0": 0.0983,
      "2/0": 0.0619,
      "4/0": 0.0390,
    };

    // Formula: Wire gauge selection based on Ohm's law and voltage drop
    // Resistance needed = (Voltage drop / Current) per 1000 feet
    // For round trip: distance * 2
    const roundTripFeet = D * 2;
    const resistanceNeeded = (VD / I) * (1000 / roundTripFeet);

    // Recommended wire gauges
    let recommendedGauge = "10 AWG";
    let recommendedResistance = 0.9989;

    const gauges = ["14", "12", "10", "8", "6", "4", "2", "1", "0", "2/0", "4/0"];
    for (const gauge of gauges) {
      const resistance = wireResistance[gauge] || 0;
      if (resistance <= resistanceNeeded) {
        recommendedGauge = `${gauge} AWG`;
        recommendedResistance = resistance;
        break;
      }
    }

    // Calculate actual voltage drop with recommended wire
    const actualVD = (I * recommendedResistance * roundTripFeet) / 1000;
    const actualVDPercent = (actualVD / V) * 100;

    return {
      recommendedGauge,
      resistanceNeeded,
      recommendedResistance,
      actualVD,
      actualVDPercent,
      maxVD,
    };
  }, [current, voltage, distance, voltDrop]);

  return (
    <div className="space-y-6">
      <div className="card p-5 space-y-4">
        <h3 className="text-lg font-semibold">Enter Wire Requirements</h3>
        <div>
          <label className="block text-sm font-medium mb-1">Current (Amps)</label>
          <input
            type="number"
            value={current}
            onChange={(e) => setCurrent(e.target.value)}
            className="input-field"
            placeholder="e.g., 10"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Voltage (Volts)</label>
          <select
            value={voltage}
            onChange={(e) => setVoltage(e.target.value)}
            className="input-field"
          >
            <option value="12">12V DC (Car, Solar, Low Voltage)</option>
            <option value="24">24V DC (Industrial, Solar)</option>
            <option value="48">48V DC (Telecom, Solar Systems)</option>
            <option value="120">120V AC (Household)</option>
            <option value="240">240V AC (Household, HVAC)</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Distance (One Way - Feet)</label>
          <input
            type="number"
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
            className="input-field"
            placeholder="e.g., 50"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Maximum Voltage Drop Allowed (Volts)</label>
          <select
            value={voltDrop}
            onChange={(e) => setVoltDrop(e.target.value)}
            className="input-field"
          >
            <option value="0.5">0.5V (Low voltage DC systems)</option>
            <option value="1">1V (Recommended for DC 12-24V)</option>
            <option value="2">2V (DC systems, less critical)</option>
            <option value="3">3V (General purpose)</option>
            <option value="5">5V (Non-critical circuits)</option>
          </select>
        </div>
      </div>

      <div id="results" className="card p-6 space-y-4">
        <h3 className="text-lg font-semibold">Recommended Wire Gauge</h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
            <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Wire Gauge</div>
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{result.recommendedGauge}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Copper wire</div>
          </div>
          <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg">
            <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Voltage Drop</div>
            <div className="text-3xl font-bold text-green-600 dark:text-green-400">
              {result.actualVD.toFixed(2)}V
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">({result.actualVDPercent.toFixed(1)}%)</div>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded space-y-3 text-sm">
          <div>
            <div className="text-gray-700 dark:text-gray-300 mb-1">Wire Specifications</div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Gauge:</span>
                <span className="font-medium">{result.recommendedGauge}</span>
              </div>
              <div className="flex justify-between">
                <span>Round Trip Distance:</span>
                <span className="font-medium">{(parseFloat(distance) * 2).toFixed(0)} ft</span>
              </div>
              <div className="flex justify-between">
                <span>Current:</span>
                <span className="font-medium">{current} A</span>
              </div>
              <div className="flex justify-between">
                <span>Resistance (per 1000 ft):</span>
                <span className="font-medium">{result.recommendedResistance.toFixed(4)} Ω</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-700 p-3 rounded text-sm text-yellow-800 dark:text-yellow-200">
          ℹ️ <span className="font-medium">Tip:</span> Always add 10-20% safety margin. If your calculated distance is close to a larger gauge, consider going up one size for better performance.
        </div>
      </div>
    </div>
  );
}
