"use client";

import { useState, useMemo } from "react";

export default function MortgageCalculator() {
  const [homePrice, setHomePrice] = useState("300000");
  const [downPayment, setDownPayment] = useState("60000");
  const [interestRate, setInterestRate] = useState("7.0");
  const [loanTerm, setLoanTerm] = useState("30");
  const [propertyTax, setPropertyTax] = useState("1.2");
  const [insurance, setInsurance] = useState("150");
  const [hoa, setHoa] = useState("0");

  const result = useMemo(() => {
    const price = parseFloat(homePrice) || 0;
    const down = parseFloat(downPayment) || 0;
    const principal = price - down;
    const rate = parseFloat(interestRate) || 0;
    const months = (parseInt(loanTerm) || 30) * 12;
    const monthlyRate = rate / 100 / 12;

    const monthlyPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
    const totalPaid = monthlyPayment * months;
    const totalInterest = totalPaid - principal;

    const annualTax = (price * (parseFloat(propertyTax) || 0) / 100);
    const monthlyTax = annualTax / 12;
    const monthlyInsurance = parseFloat(insurance) || 0;
    const monthlyHOA = parseFloat(hoa) || 0;

    const totalMonthly = monthlyPayment + monthlyTax + monthlyInsurance + monthlyHOA;
    const downPercentage = (down / price) * 100;
    const pmi = downPercentage < 20 ? (principal * 0.005) / 12 : 0; // 0.5% annual PMI if <20% down

    return {
      loanAmount: principal,
      monthlyPayment: monthlyPayment + pmi,
      pmi,
      monthlyTax,
      monthlyInsurance,
      monthlyHOA,
      totalMonthly: totalMonthly + pmi,
      totalInterest,
      totalPaid,
      downPercentage,
      loanToValue: ((principal / price) * 100).toFixed(1),
    };
  }, [homePrice, downPayment, interestRate, loanTerm, propertyTax, insurance, hoa]);

  return (
    <div className="space-y-4">
      <div className="card p-5 space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Home Price ($)</label>
            <input type="number" value={homePrice} onChange={(e) => setHomePrice(e.target.value)} className="input-field" min="0" step="10000" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Down Payment ($)</label>
            <input type="number" value={downPayment} onChange={(e) => setDownPayment(e.target.value)} className="input-field" min="0" step="5000" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Interest Rate (%)</label>
            <input type="number" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} className="input-field" min="0" step="0.1" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Loan Term (Years)</label>
            <select value={loanTerm} onChange={(e) => setLoanTerm(e.target.value)} className="input-field">
              <option value="15">15 years</option>
              <option value="20">20 years</option>
              <option value="30">30 years</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-700 dark:text-gray-300">Property Tax (%/year)</label>
            <input type="number" value={propertyTax} onChange={(e) => setPropertyTax(e.target.value)} className="input-field" step="0.1" />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-700 dark:text-gray-300">Insurance ($/mo)</label>
            <input type="number" value={insurance} onChange={(e) => setInsurance(e.target.value)} className="input-field" step="10" />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-700 dark:text-gray-300">HOA ($/mo)</label>
            <input type="number" value={hoa} onChange={(e) => setHoa(e.target.value)} className="input-field" step="10" />
          </div>
        </div>
      </div>

      <div className="card p-6 space-y-4">
        <h3 className="font-semibold text-gray-900 dark:text-gray-100">Payment Breakdown</h3>
        <div className="grid gap-2 sm:grid-cols-2">
          {[
            { label: "Principal + Interest", value: `$${result.monthlyPayment.toFixed(0)}` },
            { label: "Property Tax", value: `$${result.monthlyTax.toFixed(0)}` },
            { label: "Insurance", value: `$${result.monthlyInsurance.toFixed(0)}` },
            { label: "HOA Fee", value: `$${result.monthlyHOA.toFixed(0)}` },
            { label: "PMI", value: `$${result.pmi.toFixed(0)}` },
            { label: "TOTAL MONTHLY", value: `$${result.totalMonthly.toFixed(0)}`, bold: true },
          ].map((item) => (
            <div key={item.label} className={`flex justify-between p-2 rounded ${item.bold ? "bg-blue-100 dark:bg-blue-900 font-bold" : ""}`}>
              <span>{item.label}</span>
              <span>{item.value}</span>
            </div>
          ))}
        </div>

        <div className="rounded-lg bg-gray-50 dark:bg-gray-800 p-3 text-sm space-y-1">
          <div className="flex justify-between"><span>Loan Amount:</span><span className="font-medium">${result.loanAmount.toFixed(0).toLocaleString()}</span></div>
          <div className="flex justify-between"><span>Total Interest Paid:</span><span className="font-medium">${result.totalInterest.toFixed(0).toLocaleString()}</span></div>
          <div className="flex justify-between"><span>Total Amount Paid:</span><span className="font-medium">${result.totalPaid.toFixed(0).toLocaleString()}</span></div>
          <div className="flex justify-between"><span>Down Payment %:</span><span className="font-medium">{result.downPercentage.toFixed(1)}%</span></div>
        </div>
      </div>
    </div>
  );
}
