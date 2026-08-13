import type { Metadata } from "next";
import MortgageCalculator from "@/components/tools/MortgageCalculator";
import Breadcrumb from "@/components/layout/Breadcrumb";

const BASE_URL = "https://toolswonder.com";
export const metadata: Metadata = { title: "Mortgage Calculator – Monthly Payment Calculator", description: "Free mortgage calculator. Calculate monthly payments, total interest, and amortization. Includes property tax, insurance, PMI, and HOA fees.", keywords: ["mortgage calculator", "home loan calculator", "monthly payment calculator"], alternates: { canonical: `${BASE_URL}/tools/mortgage-calculator` } };

export default function Page() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumb items={[{ label: "Tools", href: "/tools" }, { label: "Mortgage Calculator" }]} />
      <h1 className="text-3xl font-bold mt-6 mb-4">Mortgage Calculator</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-6">Calculate your monthly mortgage payment including principal, interest, property tax, insurance, and HOA fees.</p>
      <MortgageCalculator />
    </div>
  );
}
