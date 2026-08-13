import type { Metadata } from "next";
import TDEECalculator from "@/components/tools/TDEECalculator";
import JsonLd, { buildToolSchema, buildFaqSchema, buildBreadcrumbSchema } from "@/components/seo/JsonLd";
import Breadcrumb from "@/components/layout/Breadcrumb";

const BASE_URL = "https://toolswonder.com";
const TOOL_URL = `${BASE_URL}/tools/tdee-calculator`;

export const metadata: Metadata = {
  title: "TDEE Calculator – Daily Calorie & Macro Calculator",
  description: "Free TDEE (Total Daily Energy Expenditure) calculator. Calculate daily calories needed with BMR, activity level, and fitness goals. Get macro breakdowns for fat loss, muscle gain, or maintenance.",
  keywords: ["tdee calculator", "calorie calculator", "macro calculator", "daily calorie needs", "caloric deficit", "maintenance calories", "bmr calculator"],
  alternates: { canonical: TOOL_URL },
  openGraph: { title: "TDEE Calculator", description: "Calculate your daily calories and macros", url: TOOL_URL, type: "website" },
};

export default function TDEECalculatorPage() {
  return (
    <>
      <JsonLd data={buildToolSchema({ name: "TDEE Calculator", description: "Calculate total daily energy expenditure, BMR, and macro targets", url: TOOL_URL, category: "Fitness" })} />
      <JsonLd data={buildFaqSchema([
        { question: "What is TDEE?", answer: "TDEE (Total Daily Energy Expenditure) is the total calories your body burns daily including exercise. It's calculated as: BMR × Activity Multiplier. Use TDEE to determine calorie goals for weight loss, gain, or maintenance." },
        { question: "What is BMR?", answer: "BMR (Basal Metabolic Rate) is calories burned at rest. We use the Mifflin-St Jeor equation, which accounts for age, height, weight, and gender. BMR is the foundation for calculating TDEE." },
        { question: "How do I use TDEE to lose weight?", answer: "Eat 300-500 calories below TDEE daily for 0.5-1 lb/week loss. Example: TDEE 2500 → eat 2000-2200 calories/day. Combine with strength training to preserve muscle during weight loss." },
        { question: "What are macros?", answer: "Macros (macronutrients) are protein, carbs, and fats. Our calculator shows 2 breakdowns: Balanced (30/40/30) for most people, or High Protein (40/35/25) for muscle building or fat loss." },
      ])} />
      <JsonLd data={buildBreadcrumbSchema([{ name: "Home", url: BASE_URL }, { name: "Tools", url: `${BASE_URL}/tools` }, { name: "TDEE Calculator", url: TOOL_URL }])} />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: "Tools", href: "/tools" }, { label: "TDEE Calculator" }]} />
        <div className="ad-slot my-4">Advertisement</div>
        <div className="lg:grid lg:grid-cols-[1fr_280px] lg:gap-8">
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 sm:text-4xl">TDEE Calculator</h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 mt-3">Calculate your Total Daily Energy Expenditure (TDEE) and get personalized calorie & macro targets for fat loss, muscle gain, or maintenance. Based on Mifflin-St Jeor formula.</p>
            </div>
            <TDEECalculator />
            <div className="ad-slot">Advertisement</div>
          </div>
          <aside className="mt-8 space-y-5 lg:mt-0">
            <div className="ad-slot h-[250px]">Advertisement</div>
            <div className="card p-5">
              <h3 className="mb-3 font-semibold text-gray-900 dark:text-gray-100">Quick Tips</h3>
              <ul className="text-xs space-y-2 text-gray-600 dark:text-gray-400">
                <li>• Track intake for 2 weeks, adjust if needed</li>
                <li>• Protein: 0.8-1g per lb of body weight</li>
                <li>• Deficit 300-500 cal for steady loss</li>
                <li>• Add strength training to preserve muscle</li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
