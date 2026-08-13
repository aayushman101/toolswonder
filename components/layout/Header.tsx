"use client";

import { useState, useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { Menu, X, Calculator, Search, Sun, Moon, ArrowRight } from "lucide-react";
import { tools, categories } from "@/lib/tools/registry";

// Shorter names for navbar display
const categoryNavNames: Record<string, string> = {
  "finance": "Finance",
  "agriculture": "Agriculture",
  "construction": "Construction",
  "health": "Health",
  "electrical": "Electrical",
  "diy-landscaping": "DIY",
  "home-hvac": "HVAC",
};

// Build nav from categories dynamically
const getCategoryNav = () => {
  const categoryLinks = categories.map((cat) => ({
    label: categoryNavNames[cat.slug] || cat.title,
    href: `/tools?category=${cat.slug}`,
  }));
  return [...categoryLinks, { label: "All Tools", href: "/tools" }];
};

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="h-9 w-9" />;

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="rounded-xl p-2.5 text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800/60 transition-all duration-300 active:scale-95"
      aria-label="Toggle dark mode"
    >
      {theme === "dark" ? <Sun className="h-4.5 w-4.5" /> : <Moon className="h-4.5 w-4.5" />}
    </button>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Close search suggestions on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredTools = searchQuery.trim()
    ? tools.filter(
        (t) =>
          t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          t.keywords.some((k) => k.toLowerCase().includes(searchQuery.toLowerCase()))
      ).slice(0, 5)
    : [];

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200/50 dark:border-gray-800/40 bg-white/80 dark:bg-gray-950/70 backdrop-blur-md transition-all duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 font-bold text-xl text-blue-600 dark:text-blue-500 shrink-0 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600/10 text-blue-600 dark:text-blue-500 group-hover:scale-110 transition-all duration-300">
              <Calculator className="h-5 w-5" />
            </div>
            <span className="bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent group-hover:opacity-90 transition-opacity">ToolsWonder</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {getCategoryNav().map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-xl px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-850 hover:text-gray-900 dark:hover:text-gray-100"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Search */}
          <div className="hidden md:flex flex-1 max-w-xs relative" ref={searchRef}>
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="search"
                placeholder="Search tools..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
                className="w-full rounded-xl border border-gray-200/80 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/60 py-2.5 pl-9 pr-4 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:border-blue-500 dark:focus:border-blue-400 focus:bg-white dark:focus:bg-gray-950 focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all duration-300"
                aria-label="Search tools"
              />
            </div>

            {/* Suggestions Dropdown */}
            {showSuggestions && searchQuery.trim() && (
              <div className="absolute top-full left-0 mt-2 w-full rounded-2xl border border-gray-200/80 dark:border-gray-850 bg-white dark:bg-gray-950 p-2 shadow-xl shadow-gray-200/20 dark:shadow-black/40 backdrop-blur-xl z-50">
                {filteredTools.length > 0 ? (
                  <div className="space-y-0.5">
                    {filteredTools.map((tool) => (
                      <Link
                        key={tool.slug}
                        href={`/tools/${tool.slug}`}
                        onClick={() => {
                          setShowSuggestions(false);
                          setSearchQuery("");
                        }}
                        className="flex items-center justify-between rounded-xl px-3 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900/80 transition-colors"
                      >
                        <span className="font-medium truncate pr-2">{tool.title}</span>
                        <ArrowRight className="h-3.5 w-3.5 opacity-60 flex-shrink-0" />
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="px-3 py-4 text-center text-xs text-gray-400">
                    No tools found
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right side: theme toggle + mobile menu */}
          <div className="flex items-center gap-1">
            <ThemeToggle />
            <button
              className="md:hidden rounded-xl p-2.5 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-855 transition-colors"
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden border-t border-gray-100 dark:border-gray-900 bg-white/95 dark:bg-gray-950/95 backdrop-blur-md px-4 py-3 space-y-1">
          <div className="pb-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="search"
                placeholder="Search tools..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 py-2.5 pl-9 pr-4 text-sm text-gray-900 dark:text-gray-100 focus:outline-none"
              />
            </div>
            {searchQuery.trim() && (
              <div className="mt-2 rounded-xl border border-gray-100 dark:border-gray-850 bg-white dark:bg-gray-900 p-1 space-y-0.5">
                {filteredTools.map((tool) => (
                  <Link
                    key={tool.slug}
                    href={`/tools/${tool.slug}`}
                    onClick={() => {
                      setOpen(false);
                      setSearchQuery("");
                    }}
                    className="block rounded-lg px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    {tool.title}
                  </Link>
                ))}
                {filteredTools.length === 0 && (
                  <div className="px-3 py-3 text-center text-xs text-gray-400">
                    No tools found
                  </div>
                )}
              </div>
            )}
          </div>
          {getCategoryNav().map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block rounded-xl px-3 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/60"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
