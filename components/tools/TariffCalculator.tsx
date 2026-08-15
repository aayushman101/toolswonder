"use client";

import { useState, useMemo } from "react";
import {
  tariffCategories,
  originCountries,
  euCountries,
  US_DUTY_DE_MINIMIS,
  EU_DUTY_DE_MINIMIS,
} from "@/lib/tariff/data";

export default function TariffCalculator() {
  const [destination, setDestination] = useState<"us" | "eu">("us");
  const [euCountry, setEuCountry] = useState("DE");
  const [category, setCategory] = useState("electronics");
  const [origin, setOrigin] = useState("china");
  const [productValue, setProductValue] = useState("1000");
  const [shipping, setShipping] = useState("100");
  const [additionalPct, setAdditionalPct] = useState("0");
  const [overrideRate, setOverrideRate] = useState("");

  const result = useMemo(() => {
    const cat = tariffCategories.find((c) => c.value === category) ?? tariffCategories[0];
    const value = parseFloat(productValue) || 0;
    const ship = parseFloat(shipping) || 0;
    const extra = parseFloat(additionalPct) || 0;
    const override = overrideRate.trim() === "" ? null : parseFloat(overrideRate);

    const baseRate = override !== null && !isNaN(override) ? override : destination === "us" ? cat.usRate : cat.euRate;

    // US duty is assessed on merchandise (FOB) value; EU/most countries assess on CIF (goods + freight + insurance)
    const dutiableValue = destination === "us" ? value : value + ship;

    const baseDutyAmount = (dutiableValue * baseRate) / 100;
    const additionalDutyAmount = (dutiableValue * extra) / 100;
    const totalDuty = baseDutyAmount + additionalDutyAmount;

    const euVatRate = euCountries.find((c) => c.value === euCountry)?.vatRate ?? 21;
    const vatBase = dutiableValue + totalDuty;
    const vatAmount = destination === "eu" ? (vatBase * euVatRate) / 100 : 0;

    const totalLandedCost = value + ship + totalDuty + vatAmount;
    const deMinimisThreshold = destination === "us" ? US_DUTY_DE_MINIMIS : EU_DUTY_DE_MINIMIS;
    const underDeMinimis = value <= deMinimisThreshold;

    return {
      cat,
      baseRate,
      dutiableValue,
      baseDutyAmount,
      additionalDutyAmount,
      totalDuty,
      euVatRate,
      vatAmount,
      totalLandedCost,
      deMinimisThreshold,
      underDeMinimis,
    };
  }, [destination, euCountry, category, productValue, shipping, additionalPct, overrideRate]);

  const currency = destination === "us" ? "$" : "€";

  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-amber-200 bg-amber-50 dark:border-amber-900 dark:bg-amber-950/40 p-4 text-sm text-amber-800 dark:text-amber-200">
        <strong>Estimate only, not customs advice.</strong> Base duty rates below are broad category
        averages. Actual duty depends on the exact HTS/TARIC code and any country-specific tariffs
        (Section 301/232, safeguards, anti-dumping, trade-policy surcharges) that change frequently —
        enter a known surcharge in &ldquo;Additional / special tariff&rdquo; or verify with the official
        sources linked below before shipping.
      </div>

      <div className="card p-5 space-y-4">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setDestination("us")}
            className={`flex-1 rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${destination === "us" ? "bg-blue-600 text-white" : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"}`}
          >
            Importing into USA
          </button>
          <button
            type="button"
            onClick={() => setDestination("eu")}
            className={`flex-1 rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${destination === "eu" ? "bg-blue-600 text-white" : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"}`}
          >
            Importing into EU
          </button>
        </div>

        {destination === "eu" && (
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Destination EU Country (for VAT rate)</label>
            <select value={euCountry} onChange={(e) => setEuCountry(e.target.value)} className="input-field">
              {euCountries.map((c) => (
                <option key={c.value} value={c.value}>{c.label} — {c.vatRate}% VAT</option>
              ))}
            </select>
          </div>
        )}

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Product Category</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="input-field">
              {tariffCategories.map((c) => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Country of Origin</label>
            <select value={origin} onChange={(e) => setOrigin(e.target.value)} className="input-field">
              {originCountries.map((c) => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Product Value ({currency})</label>
            <input type="number" value={productValue} onChange={(e) => setProductValue(e.target.value)} className="input-field" min="0" step="10" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Shipping + Insurance ({currency})</label>
            <input type="number" value={shipping} onChange={(e) => setShipping(e.target.value)} className="input-field" min="0" step="10" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Additional / Special Tariff (%)
            </label>
            <input type="number" value={additionalPct} onChange={(e) => setAdditionalPct(e.target.value)} className="input-field" min="0" step="0.5" placeholder="0" />
            <p className="mt-1 text-xs text-gray-400">Section 301/232, trade-policy surcharge, etc. — check current rate for {originCountries.find((o) => o.value === origin)?.label}.</p>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Override Base Duty Rate (%)
            </label>
            <input type="number" value={overrideRate} onChange={(e) => setOverrideRate(e.target.value)} className="input-field" min="0" step="0.1" placeholder="auto" />
            <p className="mt-1 text-xs text-gray-400">Leave blank to use the {result.cat.label} category average ({destination === "us" ? result.cat.usRate : result.cat.euRate}%).</p>
          </div>
        </div>
      </div>

      <div className="card p-6 space-y-4">
        <h3 className="font-semibold text-gray-900 dark:text-gray-100">Estimated Duty &amp; Landed Cost</h3>

        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-lg bg-blue-50 dark:bg-blue-950 p-4">
            <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Base Duty Rate Used</div>
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{result.baseRate.toFixed(1)}%</div>
          </div>
          <div className="rounded-lg bg-green-50 dark:bg-green-950 p-4">
            <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Estimated Total Landed Cost</div>
            <div className="text-3xl font-bold text-green-600 dark:text-green-400">
              {currency}{result.totalLandedCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-gray-50 dark:bg-gray-800 p-4 text-sm space-y-2">
          <div className="flex justify-between"><span>Dutiable Value ({destination === "us" ? "FOB" : "CIF"})</span><span className="font-medium">{currency}{result.dutiableValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span></div>
          <div className="flex justify-between"><span>Base Duty ({result.baseRate.toFixed(1)}%)</span><span className="font-medium">{currency}{result.baseDutyAmount.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span></div>
          {parseFloat(additionalPct) > 0 && (
            <div className="flex justify-between"><span>Additional/Special Tariff ({additionalPct}%)</span><span className="font-medium">{currency}{result.additionalDutyAmount.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span></div>
          )}
          <div className="flex justify-between font-semibold border-t border-gray-200 dark:border-gray-700 pt-2"><span>Total Duty</span><span>{currency}{result.totalDuty.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span></div>
          {destination === "eu" && (
            <div className="flex justify-between"><span>Import VAT ({result.euVatRate}%, on value + duty)</span><span className="font-medium">{currency}{result.vatAmount.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span></div>
          )}
          <div className="flex justify-between text-base font-bold text-gray-900 dark:text-gray-100 border-t border-gray-200 dark:border-gray-700 pt-2"><span>Total Landed Cost</span><span>{currency}{result.totalLandedCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span></div>
        </div>

        <div className={`rounded-lg border p-3 text-sm ${result.underDeMinimis ? "border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-950/40 text-green-800 dark:text-green-200" : "border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 text-gray-700 dark:text-gray-300"}`}>
          {destination === "us" ? (
            <>
              {result.underDeMinimis ? (
                <>Your product value is under the US <strong>${US_DUTY_DE_MINIMIS} de minimis</strong> threshold, which may qualify for duty-free informal entry under Section 321. This exemption has been narrowed for some countries and shipment types in recent policy changes — confirm current eligibility with CBP before relying on it.</>
              ) : (
                <>Your product value exceeds the US <strong>${US_DUTY_DE_MINIMIS} de minimis</strong> threshold, so standard duty applies.</>
              )}
            </>
          ) : (
            <>
              {result.underDeMinimis ? (
                <>Your product value is under the EU <strong>€{EU_DUTY_DE_MINIMIS} customs duty</strong> exemption threshold, so customs duty may be waived. Import VAT still applies from €0 — there is no VAT exemption for low-value goods.</>
              ) : (
                <>Your product value exceeds the EU <strong>€{EU_DUTY_DE_MINIMIS} customs duty</strong> exemption threshold, so standard duty applies in addition to VAT.</>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
