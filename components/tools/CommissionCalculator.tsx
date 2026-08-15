"use client";

import { useState, useMemo } from "react";

type Mode = "real_estate" | "sales";
type Side = "listing" | "buyer";

export default function CommissionCalculator() {
  const [mode, setMode] = useState<Mode>("real_estate");

  // Real estate mode
  const [salePrice, setSalePrice] = useState("400000");
  const [listingRate, setListingRate] = useState("3");
  const [buyerRate, setBuyerRate] = useState("3");
  const [side, setSide] = useState<Side>("listing");
  const [agentSplit, setAgentSplit] = useState("70");

  // Sales commission mode
  const [saleAmount, setSaleAmount] = useState("10000");
  const [commissionRate, setCommissionRate] = useState("10");
  const [numDeals, setNumDeals] = useState("1");

  const reResult = useMemo(() => {
    const price = parseFloat(salePrice) || 0;
    const lRate = parseFloat(listingRate) || 0;
    const bRate = parseFloat(buyerRate) || 0;
    const split = parseFloat(agentSplit) || 0;

    const totalRate = lRate + bRate;
    const totalCommission = (price * totalRate) / 100;
    const listingCommission = (price * lRate) / 100;
    const buyerCommission = (price * bRate) / 100;
    const netProceeds = price - totalCommission;

    const sideCommission = side === "listing" ? listingCommission : buyerCommission;
    const agentTakeHome = (sideCommission * split) / 100;
    const brokerTakeHome = sideCommission - agentTakeHome;

    return {
      totalRate,
      totalCommission,
      listingCommission,
      buyerCommission,
      netProceeds,
      sideCommission,
      agentTakeHome,
      brokerTakeHome,
    };
  }, [salePrice, listingRate, buyerRate, side, agentSplit]);

  const salesResult = useMemo(() => {
    const amount = parseFloat(saleAmount) || 0;
    const rate = parseFloat(commissionRate) || 0;
    const deals = parseFloat(numDeals) || 0;

    const commissionPerDeal = (amount * rate) / 100;
    const totalCommission = commissionPerDeal * deals;

    return { commissionPerDeal, totalCommission };
  }, [saleAmount, commissionRate, numDeals]);

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setMode("real_estate")}
          className={`flex-1 rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${mode === "real_estate" ? "bg-blue-600 text-white" : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"}`}
        >
          Real Estate Commission
        </button>
        <button
          type="button"
          onClick={() => setMode("sales")}
          className={`flex-1 rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${mode === "sales" ? "bg-blue-600 text-white" : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"}`}
        >
          Sales Commission
        </button>
      </div>

      {mode === "real_estate" ? (
        <>
          <div className="card p-5 space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Home Sale Price ($)</label>
              <input type="number" value={salePrice} onChange={(e) => setSalePrice(e.target.value)} className="input-field" min="0" step="5000" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Listing Agent Rate (%)</label>
                <input type="number" value={listingRate} onChange={(e) => setListingRate(e.target.value)} className="input-field" min="0" step="0.1" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Buyer&apos;s Agent Rate (%)</label>
                <input type="number" value={buyerRate} onChange={(e) => setBuyerRate(e.target.value)} className="input-field" min="0" step="0.1" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Calculate Take-Home For</label>
                <select value={side} onChange={(e) => setSide(e.target.value as Side)} className="input-field">
                  <option value="listing">Listing Agent</option>
                  <option value="buyer">Buyer&apos;s Agent</option>
                </select>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Agent&apos;s Brokerage Split (%)</label>
                <input type="number" value={agentSplit} onChange={(e) => setAgentSplit(e.target.value)} className="input-field" min="0" max="100" step="1" />
                <p className="mt-1 text-xs text-gray-400">% of the side&apos;s commission the agent keeps; the rest goes to the brokerage.</p>
              </div>
            </div>
          </div>

          <div className="card p-6 space-y-4">
            <h3 className="font-semibold text-gray-900 dark:text-gray-100">Commission Breakdown</h3>

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-lg bg-blue-50 dark:bg-blue-950 p-4">
                <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Total Commission ({reResult.totalRate.toFixed(1)}%)</div>
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                  ${reResult.totalCommission.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </div>
              </div>
              <div className="rounded-lg bg-green-50 dark:bg-green-950 p-4">
                <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Net Proceeds to Seller</div>
                <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                  ${reResult.netProceeds.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-gray-50 dark:bg-gray-800 p-4 text-sm space-y-2">
              <div className="flex justify-between"><span className="text-gray-600 dark:text-gray-400">Listing Agent Side ({listingRate}%)</span><span className="font-medium">${reResult.listingCommission.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span></div>
              <div className="flex justify-between"><span className="text-gray-600 dark:text-gray-400">Buyer&apos;s Agent Side ({buyerRate}%)</span><span className="font-medium">${reResult.buyerCommission.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span></div>
              <div className="flex justify-between font-semibold border-t border-gray-200 dark:border-gray-700 pt-2"><span>Total Commission</span><span>${reResult.totalCommission.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span></div>
            </div>

            <div className="rounded-lg bg-gray-50 dark:bg-gray-800 p-4 text-sm space-y-2">
              <div className="text-gray-700 dark:text-gray-300 font-medium mb-1">{side === "listing" ? "Listing" : "Buyer's"} Agent Take-Home</div>
              <div className="flex justify-between"><span className="text-gray-600 dark:text-gray-400">{side === "listing" ? "Listing" : "Buyer's"} Side Commission</span><span className="font-medium">${reResult.sideCommission.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span></div>
              <div className="flex justify-between"><span className="text-gray-600 dark:text-gray-400">Agent Keeps ({agentSplit}%)</span><span className="font-medium text-green-700 dark:text-green-400">${reResult.agentTakeHome.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span></div>
              <div className="flex justify-between"><span className="text-gray-600 dark:text-gray-400">Brokerage Keeps ({(100 - (parseFloat(agentSplit) || 0)).toFixed(0)}%)</span><span className="font-medium">${reResult.brokerTakeHome.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span></div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="card p-5 space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Sale Amount per Deal ($)</label>
              <input type="number" value={saleAmount} onChange={(e) => setSaleAmount(e.target.value)} className="input-field" min="0" step="100" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Commission Rate (%)</label>
                <input type="number" value={commissionRate} onChange={(e) => setCommissionRate(e.target.value)} className="input-field" min="0" step="0.5" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Number of Deals</label>
                <input type="number" value={numDeals} onChange={(e) => setNumDeals(e.target.value)} className="input-field" min="0" step="1" />
              </div>
            </div>
          </div>

          <div className="card p-6 space-y-4">
            <h3 className="font-semibold text-gray-900 dark:text-gray-100">Commission Earned</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-lg bg-blue-50 dark:bg-blue-950 p-4">
                <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Commission per Deal</div>
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                  ${salesResult.commissionPerDeal.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </div>
              </div>
              <div className="rounded-lg bg-green-50 dark:bg-green-950 p-4">
                <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Total Commission ({numDeals} deals)</div>
                <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                  ${salesResult.totalCommission.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
