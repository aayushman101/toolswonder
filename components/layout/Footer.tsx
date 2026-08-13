import Link from "next/link";
import { Calculator } from "lucide-react";
import { tools, categories } from "@/lib/tools/registry";

// Shorter names for footer display (matching navbar)
const categoryFooterNames: Record<string, string> = {
  "finance": "Finance",
  "agriculture": "Agriculture",
  "construction": "Construction & Home",
  "health": "Health & Fitness",
  "electrical": "Electrical",
  "diy-landscaping": "DIY & Landscaping",
  "home-hvac": "HVAC & Climate",
};

// Build links dynamically from categories
const getCategoryLinks = () => {
  const links: Record<string, Array<{ label: string; href: string }>> = {};

  categories.forEach((category) => {
    // Get up to 3 featured tools, then fill with regular tools
    const featured = tools
      .filter((t) => t.categorySlug === category.slug && t.isFeatured)
      .slice(0, 3);
    const regular = tools
      .filter((t) => t.categorySlug === category.slug && !t.isFeatured)
      .slice(0, 3 - featured.length);
    const categoryTools = [...featured, ...regular];

    const displayName = categoryFooterNames[category.slug] || category.title;
    links[displayName] = categoryTools.map((tool) => ({
      label: tool.title,
      href: `/tools/${tool.slug}`,
    }));
  });

  return links;
};

const links = {
  ...getCategoryLinks(),
  Company: [
    { label: "About", href: "/about" },
    { label: "All Tools", href: "/tools" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Contact", href: "/contact" },
  ],
};

const network = [
  {
    href: "https://textwonder.com",
    label: "TextWonder",
    desc: "Free text tools — word counter, case converter, lorem ipsum, and more.",
  },
  {
    href: "https://aaobanao.com",
    label: "AaoBanao",
    desc: "Creative DIY projects, craft ideas, and make-it-yourself guides.",
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-gray-200/50 dark:border-gray-800/40 bg-gray-50/40 dark:bg-gray-950/30 transition-all duration-300">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-9">
          {/* Brand */}
          <div className="lg:col-span-1 md:col-span-4">
            <Link href="/" className="flex items-center gap-2 font-bold text-lg text-blue-600 dark:text-blue-500 group">
              <Calculator className="h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
              <span>ToolsWonder</span>
            </Link>
            <p className="mt-3 text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
              One place for every useful tool. Free, fast, and accurate calculators for every need.
            </p>
          </div>

          {/* Internal links */}
          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <h3 className="mb-3 text-sm font-semibold text-gray-900">{category}</h3>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-gray-500 transition-colors hover:text-blue-600"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Our Network */}
          <div>
            <h3 className="mb-3 text-sm font-semibold text-gray-900">Our Network</h3>
            <ul className="space-y-4">
              {network.map((site) => (
                <li key={site.href}>
                  <a
                    href={site.href}
                    target="_blank"
                    rel="noopener"
                    className="group block"
                  >
                    <span className="text-sm font-medium text-blue-600 group-hover:text-blue-800 transition-colors">
                      {site.label} ↗
                    </span>
                    <span className="mt-0.5 block text-xs text-gray-400 leading-relaxed">
                      {site.desc}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-gray-200 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} ToolsWonder. All rights reserved.
          </p>
          <p className="text-xs text-gray-400">
            Also visit{" "}
            <a href="https://textwonder.com" target="_blank" rel="noopener" className="hover:text-blue-600 transition-colors">
              TextWonder
            </a>
            {" "}·{" "}
            <a href="https://aaobanao.com" target="_blank" rel="noopener" className="hover:text-blue-600 transition-colors">
              AaoBanao
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
