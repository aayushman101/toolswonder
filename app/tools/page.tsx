import type { Metadata } from "next";
import Link from "next/link";
import { tools, categories } from "@/lib/tools/registry";
import { TrendingUp, Sprout, Grid3x3, Calculator } from "lucide-react";

export function generateMetadata(): Metadata {
  return {
    title: "All Free Online Tools – Calculators, Converters & More",
    description: `Browse ${tools.length}+ free online calculators for finance, agriculture, construction, electrical, HVAC, automotive, and import/tariff planning. Inflation, fertilizer, tile, mortgage, tariff, EV charging — all free.`,
    alternates: { canonical: "https://toolswonder.com/tools" },
  };
}

const toolIcons: Record<string, React.ReactNode> = {
  "inflation-calculator": <TrendingUp className="h-5 w-5" />,
  "fertilizer-calculator": <Sprout className="h-5 w-5" />,
  "tile-calculator": <Grid3x3 className="h-5 w-5" />,
};

const catColorMap: Record<string, string> = {
  blue: "border-blue-200 hover:border-blue-400",
  green: "border-green-200 hover:border-green-400",
  orange: "border-orange-200 hover:border-orange-400",
  pink: "border-pink-200 hover:border-pink-400",
  yellow: "border-yellow-200 hover:border-yellow-400",
  purple: "border-purple-200 hover:border-purple-400",
};

const iconBgMap: Record<string, string> = {
  blue: "bg-blue-50 text-blue-600",
  green: "bg-green-50 text-green-600",
  orange: "bg-orange-50 text-orange-600",
  pink: "bg-pink-50 text-pink-600",
  yellow: "bg-yellow-50 text-yellow-600",
  purple: "bg-purple-50 text-purple-600",
};

export default function ToolsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 sm:text-4xl">All Free Online Tools</h1>
        <p className="mt-3 text-gray-500 dark:text-gray-400">
          {tools.length} tools across {categories.length} categories — and growing.
        </p>
      </div>

      {categories.map((cat) => (
        <section key={cat.slug} className="mb-12">
          <div className="mb-5 flex items-center gap-3">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">{cat.title}</h2>
            <span className="rounded-full bg-gray-100 dark:bg-gray-800 px-2.5 py-0.5 text-xs font-medium text-gray-600 dark:text-gray-400">
              {cat.tools.length} tool{cat.tools.length !== 1 ? "s" : ""}
            </span>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {cat.tools.map((tool) => (
              <Link
                key={tool.slug}
                href={`/tools/${tool.slug}`}
                className={`card group flex items-start gap-4 p-5 transition-all hover:shadow-md hover:-translate-y-0.5 border ${catColorMap[tool.color] ?? ""}`}
              >
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${iconBgMap[tool.color] ?? "bg-gray-100 text-gray-600"}`}>
                  {toolIcons[tool.slug] ?? <Calculator className="h-5 w-5" />}
                </div>
                <div className="min-w-0">
                  <div className="font-semibold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors text-sm">
                    {tool.title}
                  </div>
                  <div className="mt-1 text-xs text-gray-500 dark:text-gray-400 line-clamp-2">{tool.description}</div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
