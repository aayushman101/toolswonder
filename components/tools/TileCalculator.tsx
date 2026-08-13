"use client";

import { useState, useCallback } from "react";
import { Grid3x3, RefreshCw, Info, Package } from "lucide-react";
import { cn, formatNumber } from "@/lib/utils";

type Tab = "floor" | "wall" | "shower" | "ceiling" | "backsplash";
type Unit = "ft" | "in" | "m" | "cm";

interface TileResult {
  areaSqFt: number;
  tilesExact: number;
  tilesWithWaste: number;
  tilesTotal: number;
  boxes: number;
  costEstimate: number;
  groutLbs: number;
}

const WASTE_DEFAULTS: Record<Tab, number> = {
  floor: 10,
  wall: 10,
  shower: 15,
  ceiling: 10,
  backsplash: 10,
};

const TILE_PRESETS = [
  { label: "6×6 inch", w: 6, h: 6 },
  { label: "12×12 inch", w: 12, h: 12 },
  { label: "18×18 inch", w: 18, h: 18 },
  { label: "24×24 inch", w: 24, h: 24 },
  { label: "12×24 inch", w: 12, h: 24 },
  { label: "3×6 inch (Subway)", w: 3, h: 6 },
  { label: "4×4 inch", w: 4, h: 4 },
  { label: "3×12 inch (Plank)", w: 3, h: 12 },
  { label: "Custom", w: 0, h: 0 },
];

function toInches(val: number, unit: Unit): number {
  if (unit === "ft") return val * 12;
  if (unit === "m") return val * 39.3701;
  if (unit === "cm") return val / 2.54;
  return val; // already inches
}

function toSqFt(length: number, width: number, unit: Unit): number {
  const inL = toInches(length, unit);
  const inW = toInches(width, unit);
  return (inL * inW) / 144;
}

function calcTiles(params: {
  roomL: number; roomW: number; roomUnit: Unit;
  tileW: number; tileH: number; tileUnit: Unit;
  waste: number; tilesPerBox: number; pricePerTile: number;
  groutJoint: number;
}): TileResult {
  const { roomL, roomW, roomUnit, tileW, tileH, tileUnit, waste, tilesPerBox, pricePerTile, groutJoint } = params;
  const areaSqFt = toSqFt(roomL, roomW, roomUnit);
  const tileWSqFt = toSqFt(tileW + groutJoint / 10, tileH + groutJoint / 10, tileUnit);
  const tilesExact = areaSqFt / tileWSqFt;
  const tilesWithWaste = tilesExact * (1 + waste / 100);
  const tilesTotal = Math.ceil(tilesWithWaste);
  const boxes = Math.ceil(tilesTotal / tilesPerBox);
  const costEstimate = tilesTotal * pricePerTile;
  // Grout estimate: roughly 1 lb per 15 sq ft for standard joint
  const groutLbs = Math.ceil(areaSqFt / 15);

  return { areaSqFt, tilesExact, tilesWithWaste, tilesTotal, boxes, costEstimate, groutLbs };
}

export default function TileCalculator() {
  const [tab, setTab] = useState<Tab>("floor");
  const [roomL, setRoomL] = useState("10");
  const [roomW, setRoomW] = useState("12");
  const [roomUnit, setRoomUnit] = useState<Unit>("ft");
  const [tilePreset, setTilePreset] = useState(1); // 12x12 default
  const [tileW, setTileW] = useState("12");
  const [tileH, setTileH] = useState("12");
  const [tileUnit, setTileUnit] = useState<Unit>("in");
  const [waste, setWaste] = useState(10);
  const [diagonal, setDiagonal] = useState(false);
  const [tilesPerBox, setTilesPerBox] = useState("15");
  const [pricePerTile, setPricePerTile] = useState("2.50");
  const [groutJoint, setGroutJoint] = useState("0.125");
  const [result, setResult] = useState<TileResult | null>(null);
  const [error, setError] = useState("");

  const applyPreset = (idx: number) => {
    setTilePreset(idx);
    const p = TILE_PRESETS[idx];
    if (idx < TILE_PRESETS.length - 1) {
      setTileW(p.w.toString());
      setTileH(p.h.toString());
    }
  };

  const handleCalculate = useCallback(() => {
    setError("");
    const l = parseFloat(roomL), w = parseFloat(roomW);
    const tw = parseFloat(tileW), th = parseFloat(tileH);
    const wst = diagonal ? waste + 15 : waste;
    const tpb = parseFloat(tilesPerBox);
    const ppt = parseFloat(pricePerTile);
    const gj = parseFloat(groutJoint);

    if (isNaN(l) || l <= 0 || isNaN(w) || w <= 0) { setError("Enter valid room dimensions."); return; }
    if (isNaN(tw) || tw <= 0 || isNaN(th) || th <= 0) { setError("Enter valid tile dimensions."); return; }
    if (isNaN(tpb) || tpb <= 0) { setError("Enter valid tiles per box."); return; }

    setResult(calcTiles({ roomL: l, roomW: w, roomUnit, tileW: tw, tileH: th, tileUnit, waste: wst, tilesPerBox: tpb, pricePerTile: isNaN(ppt) ? 0 : ppt, groutJoint: isNaN(gj) ? 0.125 : gj }));
  }, [roomL, roomW, roomUnit, tileW, tileH, tileUnit, waste, diagonal, tilesPerBox, pricePerTile, groutJoint]);

  const tabs: { id: Tab; label: string }[] = [
    { id: "floor", label: "Floor" },
    { id: "wall", label: "Wall" },
    { id: "shower", label: "Shower" },
    { id: "ceiling", label: "Ceiling" },
    { id: "backsplash", label: "Backsplash" },
  ];

  const tabDescriptions: Record<Tab, string> = {
    floor: "Calculate floor tiles for any room shape. Includes waste for cuts.",
    wall: "Wall tile calculator for bathrooms, kitchens, and feature walls.",
    shower: "Shower tile calculator with extra waste for cuts around fixtures.",
    ceiling: "Ceiling tile calculator for grid or glue-up tile installations.",
    backsplash: "Kitchen or bathroom backsplash tile estimator.",
  };

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex gap-1 rounded-xl bg-gray-100 p-1 overflow-x-auto">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => { setTab(t.id); setWaste(WASTE_DEFAULTS[t.id]); setResult(null); setError(""); }}
            className={cn(
              "flex-shrink-0 rounded-lg px-3 py-2 text-sm font-medium transition-all",
              tab === t.id ? "bg-white text-orange-700 shadow-sm" : "text-gray-600 hover:text-gray-900"
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      <p className="text-sm text-gray-500">{tabDescriptions[tab]}</p>

      {/* Inputs */}
      <div className="card p-6 space-y-5">
        {/* Room Dimensions */}
        <div>
          <div className="mb-3 flex items-center justify-between">
            <label className="text-sm font-semibold text-gray-700">
              {tab === "backsplash" ? "Backsplash" : tab === "shower" ? "Shower" : "Room"} Dimensions
            </label>
            <select value={roomUnit} onChange={(e) => setRoomUnit(e.target.value as Unit)} className="input-field w-36">
              <option value="ft">Feet (ft)</option>
              <option value="in">Inches (in)</option>
              <option value="m">Meters (m)</option>
              <option value="cm">Centimeters (cm)</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600">
                Length ({roomUnit})
              </label>
              <input
                type="number"
                value={roomL}
                onChange={(e) => setRoomL(e.target.value)}
                className="input-field"
                placeholder="10"
                min="0"
                step="any"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600">
                Width ({roomUnit})
              </label>
              <input
                type="number"
                value={roomW}
                onChange={(e) => setRoomW(e.target.value)}
                className="input-field"
                placeholder="12"
                min="0"
                step="any"
              />
            </div>
          </div>
        </div>

        {/* Tile Size */}
        <div>
          <div className="mb-3 flex items-center justify-between">
            <label className="text-sm font-semibold text-gray-700">Tile Size</label>
            <select value={tileUnit} onChange={(e) => setTileUnit(e.target.value as Unit)} className="input-field w-36">
              <option value="in">Inches (in)</option>
              <option value="cm">Centimeters (cm)</option>
              <option value="ft">Feet (ft)</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="mb-1.5 block text-xs font-medium text-gray-600">Tile Preset</label>
            <select value={tilePreset} onChange={(e) => applyPreset(parseInt(e.target.value))} className="input-field">
              {TILE_PRESETS.map((p, i) => <option key={i} value={i}>{p.label}</option>)}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600">Tile Width ({tileUnit})</label>
              <input
                type="number"
                value={tileW}
                onChange={(e) => { setTileW(e.target.value); setTilePreset(TILE_PRESETS.length - 1); }}
                className="input-field"
                min="0"
                step="any"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600">Tile Height ({tileUnit})</label>
              <input
                type="number"
                value={tileH}
                onChange={(e) => { setTileH(e.target.value); setTilePreset(TILE_PRESETS.length - 1); }}
                className="input-field"
                min="0"
                step="any"
              />
            </div>
          </div>
        </div>

        {/* Settings Row */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Waste Factor: {waste}%
            </label>
            <input
              type="range"
              value={waste}
              onChange={(e) => setWaste(parseInt(e.target.value))}
              min="5"
              max="30"
              step="1"
              className="w-full accent-orange-500"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>5%</span><span>Standard ({WASTE_DEFAULTS[tab]}%)</span><span>30%</span>
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Grout Joint (inches)</label>
            <select value={groutJoint} onChange={(e) => setGroutJoint(e.target.value)} className="input-field">
              <option value="0.0625">1/16 in (1.5mm)</option>
              <option value="0.125">1/8 in (3mm) — Standard</option>
              <option value="0.1875">3/16 in (5mm)</option>
              <option value="0.25">1/4 in (6mm)</option>
              <option value="0.375">3/8 in (10mm)</option>
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Tiles Per Box</label>
            <input
              type="number"
              value={tilesPerBox}
              onChange={(e) => setTilesPerBox(e.target.value)}
              className="input-field"
              min="1"
            />
          </div>
        </div>

        {/* Price and Diagonal */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Price per Tile ($)</label>
            <input
              type="number"
              value={pricePerTile}
              onChange={(e) => setPricePerTile(e.target.value)}
              className="input-field"
              min="0"
              step="0.01"
              placeholder="2.50"
            />
          </div>
          <div className="flex items-center gap-3 rounded-lg border border-gray-200 px-4 py-3">
            <input
              type="checkbox"
              id="diagonal"
              checked={diagonal}
              onChange={(e) => setDiagonal(e.target.checked)}
              className="h-4 w-4 rounded accent-orange-500"
            />
            <label htmlFor="diagonal" className="text-sm font-medium text-gray-700 cursor-pointer">
              Diagonal / 45° Lay Pattern (+15% waste)
            </label>
          </div>
        </div>

        {error && (
          <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">{error}</div>
        )}

        <div className="flex gap-3">
          <button onClick={handleCalculate} className="btn-primary flex-1" style={{ backgroundColor: "#ea580c" }}>
            <Grid3x3 className="h-4 w-4" />
            Calculate Tiles
          </button>
          <button
            onClick={() => { setRoomL("10"); setRoomW("12"); setTileW("12"); setTileH("12"); setTilePreset(1); setWaste(WASTE_DEFAULTS[tab]); setDiagonal(false); setTilesPerBox("15"); setPricePerTile("2.50"); setResult(null); setError(""); }}
            className="btn-secondary"
          >
            <RefreshCw className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Results */}
      {result && (
        <div className="card p-6 space-y-5 animate-slide-up">
          <h3 className="font-semibold text-gray-900 flex items-center gap-2">
            <Package className="h-5 w-5 text-orange-600" />
            Tile Calculation Results
          </h3>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { label: "Total Area", value: `${formatNumber(result.areaSqFt, 2)} sq ft`, sub: `${formatNumber(result.areaSqFt * 0.0929, 2)} m²`, color: "blue" },
              { label: "Tiles Needed (exact)", value: formatNumber(result.tilesExact, 1), sub: "Without waste factor", color: "gray" },
              { label: "Tiles with Waste", value: formatNumber(result.tilesWithWaste, 1), sub: `At ${waste}% waste factor`, color: "orange" },
              { label: "Order This Many", value: result.tilesTotal.toString(), sub: "Rounded up to whole tiles", color: "red" },
              { label: "Boxes to Buy", value: `${result.boxes} boxes`, sub: `(${tilesPerBox} tiles/box)`, color: "green" },
              { label: "Grout Estimate", value: `${result.groutLbs} lbs`, sub: "Approximate grout needed", color: "purple" },
            ].map(({ label, value, sub, color }) => {
              const colorMap: Record<string, string> = {
                blue: "bg-blue-50 border-blue-100 text-blue-700",
                orange: "bg-orange-50 border-orange-100 text-orange-700",
                red: "bg-red-50 border-red-100 text-red-700",
                green: "bg-green-50 border-green-100 text-green-700",
                purple: "bg-purple-50 border-purple-100 text-purple-700",
                gray: "bg-gray-50 border-gray-200 text-gray-700",
              };
              return (
                <div key={label} className={cn("rounded-xl border p-4", colorMap[color])}>
                  <div className="text-xs font-medium opacity-80 mb-1">{label}</div>
                  <div className="text-2xl font-bold">{value}</div>
                  {sub && <div className="text-xs opacity-70 mt-1">{sub}</div>}
                </div>
              );
            })}
          </div>

          {/* Cost estimate */}
          {parseFloat(pricePerTile) > 0 && (
            <div className="rounded-xl border border-green-200 bg-green-50 p-5">
              <div className="text-sm font-semibold text-green-800 mb-2">Cost Estimate</div>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-xs text-green-600">Tile Cost</div>
                  <div className="text-xl font-bold text-green-800">${formatNumber(result.costEstimate, 2)}</div>
                </div>
                <div>
                  <div className="text-xs text-green-600">Est. Grout Cost</div>
                  <div className="text-xl font-bold text-green-800">${formatNumber(result.groutLbs * 15, 2)}</div>
                </div>
                <div>
                  <div className="text-xs text-green-600">Total Materials</div>
                  <div className="text-xl font-bold text-green-800">${formatNumber(result.costEstimate + result.groutLbs * 15, 2)}</div>
                </div>
              </div>
            </div>
          )}

          <div className="rounded-lg bg-amber-50 border border-amber-200 px-4 py-3 flex gap-2">
            <Info className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
            <p className="text-sm text-amber-800">
              Always buy 10–15% extra tiles to account for cuts, breakage, and future replacements.
              Tile dye lots vary between batches — buy all tiles at once.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
