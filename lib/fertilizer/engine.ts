import { FERTILIZERS, AREA_UNITS, type Fertilizer, type Crop } from "./data";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface NPKRequirement {
  n: number; // kg/ha
  p: number;
  k: number;
  areaHa: number; // total area in hectares
}

export interface FertilizerLine {
  fertilizer: Fertilizer;
  qtyPerHa: number;   // kg per hectare
  qtyTotal: number;   // kg for total area
  nSupplied: number;  // kg/ha N contributed
  pSupplied: number;
  kSupplied: number;
  costPerHa: number;
  costTotal: number;
}

export interface FertOption {
  id: string;
  label: string;
  description: string;
  badge?: string;
  lines: FertilizerLine[];
  totalNPerHa: number;
  totalPPerHa: number;
  totalKPerHa: number;
  excessN: number;
  excessP: number;
  excessK: number;
  deficitN: number;
  deficitP: number;
  deficitK: number;
  costPerHa: number;
  costTotal: number;
  qtyTotal: number;
}

export interface SplitScheduleRow {
  label: string;
  timing: string;
  fertilizers: { name: string; qtyPerHa: number; qtyTotal: number }[];
}

// ─── Unit Helpers ─────────────────────────────────────────────────────────────

export function toHectares(area: number, unit: string): number {
  const u = AREA_UNITS[unit];
  if (!u) return area;
  return area * u.toHectare;
}

export function convertArea(area: number, from: string, to: string): number {
  const ha = toHectares(area, from);
  const toUnit = AREA_UNITS[to];
  if (!toUnit) return ha;
  return ha / toUnit.toHectare;
}

export function convertRate(value: number, from: "kgPerHa" | "kgPerAcre" | "lbsPerAcre", to: "kgPerHa" | "kgPerAcre" | "lbsPerAcre"): number {
  // Convert to kg/ha first
  let kgPerHa = value;
  if (from === "kgPerAcre") kgPerHa = value / 0.404686;
  if (from === "lbsPerAcre") kgPerHa = value * 1.12085;
  // Convert from kg/ha to target
  if (to === "kgPerHa") return kgPerHa;
  if (to === "kgPerAcre") return kgPerHa * 0.404686;
  if (to === "lbsPerAcre") return kgPerHa / 1.12085;
  return kgPerHa;
}

// ─── Core Calculator ──────────────────────────────────────────────────────────

function makeLine(fertId: string, qtyPerHa: number, areaHa: number): FertilizerLine {
  const f = FERTILIZERS.find(x => x.id === fertId)!;
  return {
    fertilizer: f,
    qtyPerHa,
    qtyTotal: qtyPerHa * areaHa,
    nSupplied: (qtyPerHa * f.n) / 100,
    pSupplied: (qtyPerHa * f.p) / 100,
    kSupplied: (qtyPerHa * f.k) / 100,
    costPerHa: qtyPerHa * f.pricePerKg,
    costTotal: qtyPerHa * f.pricePerKg * areaHa,
  };
}

function buildOption(
  id: string, label: string, description: string, badge: string | undefined,
  lines: FertilizerLine[], req: NPKRequirement
): FertOption {
  const tN = lines.reduce((s, l) => s + l.nSupplied, 0);
  const tP = lines.reduce((s, l) => s + l.pSupplied, 0);
  const tK = lines.reduce((s, l) => s + l.kSupplied, 0);
  const costPerHa = lines.reduce((s, l) => s + l.costPerHa, 0);
  return {
    id, label, description, badge, lines,
    totalNPerHa: tN, totalPPerHa: tP, totalKPerHa: tK,
    excessN: Math.max(0, tN - req.n),
    excessP: Math.max(0, tP - req.p),
    excessK: Math.max(0, tK - req.k),
    deficitN: Math.max(0, req.n - tN),
    deficitP: Math.max(0, req.p - tP),
    deficitK: Math.max(0, req.k - tK),
    costPerHa,
    costTotal: costPerHa * req.areaHa,
    qtyTotal: lines.reduce((s, l) => s + l.qtyTotal, 0),
  };
}

export function calcFertOptions(req: NPKRequirement, prices?: Record<string, number>): FertOption[] {
  const { n, p, k, areaHa } = req;

  // Apply custom prices
  if (prices) {
    FERTILIZERS.forEach(f => { if (prices[f.id]) f.pricePerKg = prices[f.id]; });
  }

  const options: FertOption[] = [];

  // ── Option 1: DAP + Urea + MOP ──────────────────────────────────────────
  {
    const dapQty = p > 0 ? p / 0.46 : 0;
    const nFromDap = dapQty * 0.18;
    const remainN = Math.max(0, n - nFromDap);
    const ureaQty = remainN / 0.46;
    const mopQty = k > 0 ? k / 0.60 : 0;
    const lines = [
      ...(dapQty > 0 ? [makeLine("dap", dapQty, areaHa)] : []),
      ...(ureaQty > 0 ? [makeLine("urea", ureaQty, areaHa)] : []),
      ...(mopQty > 0 ? [makeLine("mop", mopQty, areaHa)] : []),
    ];
    options.push(buildOption("dap_urea_mop", "DAP + Urea + MOP", "Standard recommendation using DAP for phosphorus. Most widely used combination across India.", "Most Popular", lines, req));
  }

  // ── Option 2: SSP + Urea + MOP ──────────────────────────────────────────
  {
    const sspQty = p > 0 ? p / 0.16 : 0;
    const ureaQty = n / 0.46;
    const mopQty = k > 0 ? k / 0.60 : 0;
    const lines = [
      ...(sspQty > 0 ? [makeLine("ssp", sspQty, areaHa)] : []),
      ...(ureaQty > 0 ? [makeLine("urea", ureaQty, areaHa)] : []),
      ...(mopQty > 0 ? [makeLine("mop", mopQty, areaHa)] : []),
    ];
    options.push(buildOption("ssp_urea_mop", "SSP + Urea + MOP", "SSP also supplies 11% sulphur and 19% calcium. Ideal for oilseeds, pulses, and sulphur-deficient soils.", "Sulphur Rich", lines, req));
  }

  // ── Option 3: Complex NPK 10-26-26 + Urea + MOP ─────────────────────────
  if (p > 0 && k > 0) {
    // Use 10-26-26 to provide as much P and K as possible with balanced ratio
    // Qty driven by whichever of P or K is limiting
    const byP = p / 0.26;
    const byK = k / 0.26;
    const complexQty = Math.min(byP, byK);
    const nFromComplex = complexQty * 0.10;
    const pFromComplex = complexQty * 0.26;
    const kFromComplex = complexQty * 0.26;
    const remainN = Math.max(0, n - nFromComplex);
    const ureaQty = remainN / 0.46;
    const remainP = Math.max(0, p - pFromComplex);
    const sspQty = remainP > 0 ? remainP / 0.16 : 0;
    const remainK = Math.max(0, k - kFromComplex);
    const mopQty = remainK > 0 ? remainK / 0.60 : 0;
    const lines: FertilizerLine[] = [
      makeLine("npk_10_26_26", complexQty, areaHa),
      ...(ureaQty > 0.1 ? [makeLine("urea", ureaQty, areaHa)] : []),
      ...(sspQty > 0.1 ? [makeLine("ssp", sspQty, areaHa)] : []),
      ...(mopQty > 0.1 ? [makeLine("mop", mopQty, areaHa)] : []),
    ];
    options.push(buildOption("complex_10_26_26", "10-26-26 Complex + Urea", "Single complex fertilizer for basal application; reduces number of bags and labour.", "Single Bag", lines, req));
  }

  // ── Option 4: Complex 17-17-17 + Urea + MOP ─────────────────────────────
  if (p > 0 && k > 0) {
    const complexQty = Math.min(n / 0.17, p / 0.17, k / 0.17);
    const nFromC = complexQty * 0.17;
    const pFromC = complexQty * 0.17;
    const kFromC = complexQty * 0.17;
    const ureaQty = Math.max(0, n - nFromC) / 0.46;
    const sspQty = Math.max(0, p - pFromC) > 0.1 ? Math.max(0, p - pFromC) / 0.16 : 0;
    const mopQty = Math.max(0, k - kFromC) > 0.1 ? Math.max(0, k - kFromC) / 0.60 : 0;
    const lines: FertilizerLine[] = [
      makeLine("npk_17_17_17", complexQty, areaHa),
      ...(ureaQty > 0.1 ? [makeLine("urea", ureaQty, areaHa)] : []),
      ...(sspQty > 0.1 ? [makeLine("ssp", sspQty, areaHa)] : []),
      ...(mopQty > 0.1 ? [makeLine("mop", mopQty, areaHa)] : []),
    ];
    options.push(buildOption("complex_17_17_17", "17-17-17 + Top-dress Urea", "Balanced complex fertilizer. Good where N, P, K deficiencies are equal.", undefined, lines, req));
  }

  return options;
}

// ─── Urea / DAP / MOP Specific Calculators ────────────────────────────────────

export function calcUrea(nKgPerHa: number, areaHa: number) {
  const ureaQty = nKgPerHa / 0.46;
  const f = FERTILIZERS.find(x => x.id === "urea")!;
  return {
    ureaPerHa: ureaQty,
    ureaTotal: ureaQty * areaHa,
    bags50: Math.ceil((ureaQty * areaHa) / 50),
    bags45: Math.ceil((ureaQty * areaHa) / 45),
    costPerHa: ureaQty * f.pricePerKg,
    costTotal: ureaQty * f.pricePerKg * areaHa,
    nSupplied: nKgPerHa,
  };
}

export function calcDAP(pKgPerHa: number, areaHa: number) {
  const dapQty = pKgPerHa / 0.46;
  const f = FERTILIZERS.find(x => x.id === "dap")!;
  return {
    dapPerHa: dapQty,
    dapTotal: dapQty * areaHa,
    bags50: Math.ceil((dapQty * areaHa) / 50),
    nAlsoSupplied: dapQty * 0.18,
    costPerHa: dapQty * f.pricePerKg,
    costTotal: dapQty * f.pricePerKg * areaHa,
    pSupplied: pKgPerHa,
  };
}

export function calcMOP(kKgPerHa: number, areaHa: number) {
  const mopQty = kKgPerHa / 0.60;
  const f = FERTILIZERS.find(x => x.id === "mop")!;
  return {
    mopPerHa: mopQty,
    mopTotal: mopQty * areaHa,
    bags50: Math.ceil((mopQty * areaHa) / 50),
    costPerHa: mopQty * f.pricePerKg,
    costTotal: mopQty * f.pricePerKg * areaHa,
    kSupplied: kKgPerHa,
  };
}

// ─── Blend Calculator ─────────────────────────────────────────────────────────

export interface BlendEntry {
  fertId: string;
  qtyKg: number; // per ha
}

export interface BlendResult {
  totalN: number;
  totalP: number;
  totalK: number;
  totalQty: number;
  costPerHa: number;
  lines: { fertilizer: Fertilizer; qty: number; nContrib: number; pContrib: number; kContrib: number; cost: number }[];
}

export function calcBlend(entries: BlendEntry[]): BlendResult {
  const lines = entries.map(e => {
    const f = FERTILIZERS.find(x => x.id === e.fertId);
    if (!f) return null;
    return {
      fertilizer: f,
      qty: e.qtyKg,
      nContrib: (e.qtyKg * f.n) / 100,
      pContrib: (e.qtyKg * f.p) / 100,
      kContrib: (e.qtyKg * f.k) / 100,
      cost: e.qtyKg * f.pricePerKg,
    };
  }).filter(Boolean) as BlendResult["lines"];

  return {
    totalN: lines.reduce((s, l) => s + l.nContrib, 0),
    totalP: lines.reduce((s, l) => s + l.pContrib, 0),
    totalK: lines.reduce((s, l) => s + l.kContrib, 0),
    totalQty: lines.reduce((s, l) => s + l.qty, 0),
    costPerHa: lines.reduce((s, l) => s + l.cost, 0),
    lines,
  };
}

// ─── Split Schedule ───────────────────────────────────────────────────────────

export function buildSplitSchedule(crop: Crop, option: FertOption, areaHa: number): SplitScheduleRow[] {
  return crop.splitSchedule.map(split => {
    const rows: { name: string; qtyPerHa: number; qtyTotal: number }[] = [];

    option.lines.forEach(line => {
      const f = line.fertilizer;
      // Allocate based on which nutrient this fertilizer primarily supplies
      let splitFraction = 0;
      if (f.n > f.p && f.n > f.k) {
        // N-dominant fertilizer (Urea, CAN, AS, AN)
        splitFraction = split.nPct / 100;
      } else if (f.p >= f.n && f.p >= f.k) {
        // P-dominant (DAP, SSP, TSP)
        splitFraction = split.pPct / 100;
      } else {
        // K-dominant (MOP, SOP)
        splitFraction = split.kPct / 100;
      }
      const qty = line.qtyPerHa * splitFraction;
      if (qty > 0.5) {
        rows.push({ name: f.shortName, qtyPerHa: qty, qtyTotal: qty * areaHa });
      }
    });

    return { label: split.label, timing: split.timing, fertilizers: rows };
  });
}
