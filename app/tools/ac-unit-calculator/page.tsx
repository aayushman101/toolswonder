import type { Metadata } from "next";
import ACUnitCalculator from "@/components/tools/ACUnitCalculator";
import Breadcrumb from "@/components/layout/Breadcrumb";

const BASE_URL = "https://toolswonder.com";
export const metadata: Metadata = { title: "AC Unit Size Calculator – What Size Air Conditioner Do I Need?", description: "Free AC size calculator. Determine the tonnage and BTU needed for your room based on square footage, climate, and insulation.", keywords: ["ac calculator", "air conditioner size", "hvac calculator", "ac unit size"], alternates: { canonical: `${BASE_URL}/tools/ac-unit-calculator` } };

export default function Page() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumb items={[{ label: "Tools", href: "/tools" }, { label: "AC Unit Calculator" }]} />
      <h1 className="text-3xl font-bold mt-6 mb-4">AC Unit Size Calculator</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-6">Find the correct air conditioner size for your space based on square footage, climate zone, and insulation quality.</p>
      <ACUnitCalculator />
    </div>
  );
}
