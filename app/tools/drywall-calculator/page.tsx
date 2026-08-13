import type { Metadata } from "next";
import DrywallCalculator from "@/components/tools/DrywallCalculator";
import Breadcrumb from "@/components/layout/Breadcrumb";

const BASE_URL = "https://toolswonder.com";
export const metadata: Metadata = { title: "Drywall Calculator – How Many Sheets of Drywall Do I Need?", description: "Free drywall calculator. Calculate sheets, joint compound, and tape needed for your room. Includes waste allowance and cost estimates.", keywords: ["drywall calculator", "how many sheets of drywall", "drywall cost calculator"], alternates: { canonical: `${BASE_URL}/tools/drywall-calculator` } };

export default function Page() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumb items={[{ label: "Tools", href: "/tools" }, { label: "Drywall Calculator" }]} />
      <h1 className="text-3xl font-bold mt-6 mb-4">Drywall Calculator</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-6">Calculate drywall sheets, joint compound, tape, and materials needed for your project.</p>
      <DrywallCalculator />
    </div>
  );
}
