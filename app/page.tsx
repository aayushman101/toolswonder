"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  TrendingUp,
  Sprout,
  Grid3x3,
  Calculator,
  Zap,
  Globe,
  Search,
  DollarSign,
  HardHat,
  FlaskConical,
  Star,
  ShieldCheck,
  ZapOff,
  Flame,
  MousePointerClick,
  Heart,
  Home,
  TreePine,
  Wind,
  Ship,
} from "lucide-react";
import { tools, categories } from "@/lib/tools/registry";

// Icon mapping to resolve database/registry strings
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  TrendingUp,
  Sprout,
  Grid3x3,
  FlaskConical,
  DollarSign,
  HardHat,
  Globe,
  Zap,
  Star,
  Heart,
  Home,
  TreePine,
  Wind,
  Ship,
};

function DynamicIcon({ name, className }: { name: string; className?: string }) {
  const IconComponent = iconMap[name] || Calculator;
  return <IconComponent className={className} />;
}

const colorStyles: Record<string, { bg: string; text: string; border: string; glow: string }> = {
  blue: {
    bg: "bg-blue-50/80 dark:bg-blue-950/20",
    text: "text-blue-600 dark:text-blue-400",
    border: "border-blue-100 dark:border-blue-900/40",
    glow: "shadow-blue-500/10",
  },
  green: {
    bg: "bg-green-50/80 dark:bg-green-950/20",
    text: "text-green-600 dark:text-green-400",
    border: "border-green-100 dark:border-green-900/40",
    glow: "shadow-green-500/10",
  },
  orange: {
    bg: "bg-orange-50/80 dark:bg-orange-950/20",
    text: "text-orange-600 dark:text-orange-400",
    border: "border-orange-100 dark:border-orange-900/40",
    glow: "shadow-orange-500/10",
  },
  purple: {
    bg: "bg-purple-50/80 dark:bg-purple-950/20",
    text: "text-purple-600 dark:text-purple-400",
    border: "border-purple-100 dark:border-purple-900/40",
    glow: "shadow-purple-500/10",
  },
  pink: {
    bg: "bg-pink-50/80 dark:bg-pink-950/20",
    text: "text-pink-600 dark:text-pink-400",
    border: "border-pink-100 dark:border-pink-900/40",
    glow: "shadow-pink-500/10",
  },
  yellow: {
    bg: "bg-yellow-50/80 dark:bg-yellow-950/20",
    text: "text-yellow-600 dark:text-yellow-400",
    border: "border-yellow-100 dark:border-yellow-900/40",
    glow: "shadow-yellow-500/10",
  },
};

const stats = [
  { label: "Free Tools", value: `${tools.length}+`, icon: Calculator },
  { label: "Categories", value: `${categories.length}`, icon: Star },
  { label: "Target Accuracy", value: "100%", icon: ShieldCheck },
  { label: "Access Cost", value: "$0", icon: Globe },
];

const popularTags = [
  { label: "SIP Calculator", query: "SIP Calculator" },
  { label: "Inflation", query: "Inflation" },
  { label: "Tile Estimator", query: "Tile" },
  { label: "Drip Irrigation", query: "Drip Irrigation" },
  { label: "Electrical Load", query: "Electrical Load" },
];

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Close search suggestions on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setIsSearchFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    return tools.filter(
      (tool) =>
        tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.keywords.some((k) => k.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [searchQuery]);

  const filteredFeaturedTools = useMemo(() => {
    const featured = tools.filter((t) => t.isFeatured);
    if (selectedCategory === "all") return featured;
    return featured.filter((t) => t.categorySlug === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="relative overflow-hidden bg-white dark:bg-gray-950 transition-colors duration-300">
      
      {/* Background ambient glowing shapes */}
      <div className="glow-spot w-[600px] h-[600px] bg-gradient-to-tr from-blue-500/20 via-indigo-500/10 to-purple-500/20 top-[-200px] left-[-200px] blur-3xl animate-pulse" style={{ animationDuration: "12s" }} />
      <div className="glow-spot w-[500px] h-[500px] bg-gradient-to-br from-indigo-500/10 via-purple-500/15 to-pink-500/10 right-[-100px] top-[20%] blur-3xl" />
      <div className="glow-spot w-[700px] h-[700px] bg-gradient-to-tr from-cyan-500/10 via-blue-500/10 to-indigo-500/5 bottom-[-100px] left-[20%] blur-3xl" />

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-60 dark:opacity-80 -z-10 pointer-events-none" />

      {/* Hero Section */}
      <section className="relative pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200/50 dark:border-blue-900/40 bg-blue-50/50 dark:bg-blue-950/30 px-4 py-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 backdrop-blur-sm shadow-sm"
        >
          <Zap className="h-3.5 w-3.5 fill-blue-500/20" />
          One Place for Every Useful Tool
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl leading-none text-gray-900 dark:text-white"
        >
          Free Online Tools &<br />
          <span className="gradient-text">Calculators</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mt-6 max-w-2xl text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed"
        >
          Trusted calculators, converters, and builders for finance, agriculture, construction, health, electrical, and more. Built to expert specifications. Free, fast, and accurate.
        </motion.p>

        {/* Live Search Component */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mx-auto mt-10 max-w-2xl relative z-40"
          ref={searchContainerRef}
        >
          <div className={`relative flex items-center rounded-2xl border transition-all duration-300 shadow-lg ${
            isSearchFocused
              ? "border-blue-500 ring-4 ring-blue-500/10 dark:border-blue-400 bg-white dark:bg-gray-950"
              : "border-gray-200/80 dark:border-gray-800 bg-white/80 dark:bg-gray-900/60 backdrop-blur-md"
          }`}>
            <Search className="absolute left-4 h-5 w-5 text-gray-400 pointer-events-none" />
            <input
              type="text"
              placeholder={`Search ${tools.length}+ calculators (e.g. SIP, brick, fertilizer)...`}
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setIsSearchFocused(true);
              }}
              onFocus={() => setIsSearchFocused(true)}
              className="w-full bg-transparent pl-12 pr-4 py-4 text-sm sm:text-base text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none rounded-2xl"
            />
          </div>

          {/* Autocomplete suggestions */}
          <AnimatePresence>
            {isSearchFocused && searchQuery.trim() && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute top-full left-0 mt-3 w-full rounded-2xl border border-gray-200/80 dark:border-gray-800 bg-white/95 dark:bg-gray-950/95 p-3 shadow-xl shadow-gray-200/20 dark:shadow-black/50 backdrop-blur-xl z-50 text-left"
              >
                <div className="px-2 pb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Matching Tools ({searchResults.length})
                </div>
                {searchResults.length > 0 ? (
                  <div className="max-h-80 overflow-y-auto space-y-1 pr-1">
                    {searchResults.map((tool) => (
                      <Link
                        key={tool.slug}
                        href={`/tools/${tool.slug}`}
                        className="flex items-start gap-3 rounded-xl p-2.5 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors group"
                      >
                        <div className={`flex h-9 w-9 items-center justify-center rounded-lg border shrink-0 ${colorStyles[tool.color]?.bg || "bg-gray-100"} ${colorStyles[tool.color]?.border || "border-gray-200"}`}>
                          <DynamicIcon name={tool.icon} className={`h-4 w-4 ${colorStyles[tool.color]?.text || "text-gray-500"}`} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="text-sm font-semibold text-gray-950 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {tool.title}
                          </div>
                          <div className="text-xs text-gray-600 dark:text-gray-300 truncate mt-0.5">
                            {tool.description}
                          </div>
                        </div>
                        <ArrowRight className="h-4 w-4 text-gray-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all self-center" />
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="py-6 text-center text-sm text-gray-500 dark:text-gray-400 flex flex-col items-center justify-center gap-1.5">
                    <ZapOff className="h-6 w-6 opacity-60" />
                    No tools match &ldquo;{searchQuery}&rdquo;
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Popular Tag suggestions */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs sm:text-sm">
            <span className="text-gray-500 dark:text-gray-400 flex items-center gap-1">
              <Flame className="h-3.5 w-3.5 text-amber-500 fill-amber-500/20" />
              Popular:
            </span>
            {popularTags.map((tag) => (
              <button
                key={tag.label}
                onClick={() => {
                  setSearchQuery(tag.query);
                  setIsSearchFocused(true);
                }}
                className="px-3 py-1 rounded-full border border-gray-200 dark:border-gray-800 bg-gray-50 hover:bg-gray-100 dark:bg-gray-900/40 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white transition-all cursor-pointer"
              >
                {tag.label}
              </button>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Stats Cards Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-10">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {stats.map((s, idx) => {
            const StatIcon = s.icon;
            return (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="glass-card p-5 hover:border-blue-500/30 dark:hover:border-blue-400/20 transition-all duration-300 group flex items-start gap-4"
              >
                <div className="rounded-xl bg-blue-500/5 dark:bg-blue-400/5 p-2.5 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform duration-300">
                  <StatIcon className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-gray-950 to-gray-800 dark:from-white dark:to-gray-200 bg-clip-text text-transparent">
                    {s.value}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mt-0.5">
                    {s.label}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Featured Tools Grid with filtering */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Featured Tools</h2>
            <p className="mt-1.5 text-sm sm:text-base text-gray-600 dark:text-gray-300">Most-searched utility apps, crafted for expert accuracy</p>
          </div>

          {/* Filtering Tab Group */}
          <div className="flex flex-wrap gap-1 border border-gray-200/50 dark:border-gray-800/40 p-1.5 rounded-2xl bg-gray-50/50 dark:bg-gray-950/40 backdrop-blur-sm self-start">
            {[
              { id: "all", label: "All" },
              { id: "finance", label: "Finance" },
              { id: "agriculture", label: "Agriculture" },
              { id: "construction", label: "Construction" },
              { id: "health", label: "Health" },
              { id: "electrical", label: "Electrical" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id)}
                className={`tab-btn relative px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all cursor-pointer ${
                  selectedCategory === tab.id
                    ? "tab-btn-active"
                    : "tab-btn-inactive"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <motion.div
          layout
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filteredFeaturedTools.map((tool) => {
              const styles = colorStyles[tool.color] || colorStyles.blue;
              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  key={tool.slug}
                  className="group"
                >
                  <Link
                    href={`/tools/${tool.slug}`}
                    className={`glass-card relative flex flex-col h-full gap-5 p-6 hover:shadow-xl ${styles.glow} border border-gray-200/60 dark:border-gray-800/60 hover:border-blue-500/20 dark:hover:border-blue-500/20 hover:-translate-y-1 transition-all duration-300`}
                  >
                    {/* Soft background glow per card color */}
                    <div className={`absolute top-0 right-0 w-24 h-24 rounded-full filter blur-2xl opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none -z-10 ${styles.bg}`} />
                    
                    <div className="flex justify-between items-start">
                      <div className={`flex h-12 w-12 items-center justify-center rounded-2xl border ${styles.bg} ${styles.border}`}>
                        <DynamicIcon name={tool.icon} className={`h-6 w-6 ${styles.text}`} />
                      </div>
                      
                      {tool.isNew && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2.5 py-0.5 text-[10px] font-bold text-amber-600 dark:text-amber-400 border border-amber-500/20">
                          NEW
                        </span>
                      )}
                    </div>

                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {tool.title}
                      </h3>
                      <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 leading-relaxed line-clamp-3">
                        {tool.description}
                      </p>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-900/60 flex items-center justify-between text-sm font-semibold text-blue-600 dark:text-blue-400">
                      <span>Open {tool.title}</span>
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1.5 transition-transform duration-300" />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Tool Categories list block */}
      <section className="bg-gray-50/50 dark:bg-gray-950/20 py-20 px-4 sm:px-6 lg:px-8 relative border-y border-gray-100 dark:border-gray-900/40">
        <div className="max-w-7xl mx-auto">
          <div className="mb-14 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Tool Categories</h2>
            <p className="mt-2 text-gray-600 dark:text-gray-300">Browse by categories to find the exact calculator you need</p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((cat, idx) => {
              const styles = colorStyles[cat.color] || colorStyles.blue;
              return (
                <motion.div
                  key={cat.slug}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="glass-card flex flex-col p-6 hover:shadow-lg transition-all duration-300 border border-gray-200/50 dark:border-gray-800/40 hover:border-gray-300 dark:hover:border-gray-700/60"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-2xl border ${styles.bg} ${styles.border}`}>
                      <DynamicIcon name={cat.icon} className={`h-6 w-6 ${styles.text}`} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white">{cat.title}</h3>
                      <span className="text-xs text-gray-400 font-medium">
                        {cat.tools.length} tool{cat.tools.length !== 1 ? "s" : ""}
                      </span>
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-6 flex-1">
                    {cat.description}
                  </p>

                  <div className="space-y-3 pt-4 border-t border-gray-100 dark:border-gray-900/60">
                    <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                      Popular Utilities
                    </div>
                    {cat.tools.slice(0, 4).map((tool) => (
                      <Link
                        key={tool.slug}
                        href={`/tools/${tool.slug}`}
                        className="flex items-center justify-between text-sm text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 group transition-all"
                      >
                        <span className="truncate pr-2 font-medium">→ {tool.title}</span>
                        <MousePointerClick className="h-3.5 w-3.5 opacity-0 group-hover:opacity-60 transition-opacity" />
                      </Link>
                    ))}
                    {cat.tools.length > 4 && (
                      <Link
                        href={`/tools?category=${cat.slug}`}
                        className="block pt-2 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        View all {cat.tools.length} tools
                      </Link>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Structured SEO Guide Content Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="glass-card p-8 sm:p-12 border border-gray-200/50 dark:border-gray-800/40 relative">
          
          {/* Subtle background mesh accent inside card */}
          <div className="absolute inset-0 bg-dots-pattern opacity-30 pointer-events-none rounded-2xl" />
          
          <div className="relative prose prose-gray dark:prose-invert max-w-none">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white text-center mb-8 tracking-tight">
              Free Online Tools & Calculators
            </h2>
            
            <p className="text-gray-700 dark:text-gray-200 leading-relaxed text-base sm:text-lg mb-8 text-center max-w-3xl mx-auto">
              ToolsWonder is a free online utility engine built for accuracy and simplicity. Whether you need a fertilizer calculator for farming, an inflation calculator to measure purchasing power, or a tile calculator for construction projects — every tool here is built on verified scientific formulas and industry-standard data.
            </p>

            <div className="border-t border-gray-100 dark:border-gray-900/60 my-10" />

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                  <Sprout className="h-5 w-5" />
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white m-0">Agriculture Calculators</h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed m-0">
                  The most comprehensive free fertilizer calculators online. The <strong>Fertilizer Calculator</strong> covers 25+ crops and 20+ products including Urea, DAP, MOP, SSP. Also includes a <strong>Drip Irrigation Calculator</strong> with FAO-56 ET values for 18 crops, water savings vs. flood, and dripper count by area or plant count.
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                  <TrendingUp className="h-5 w-5" />
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white m-0">Finance Calculators</h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed m-0">
                  Our <strong>Inflation Calculator</strong> uses real historical CPI data to calculate the purchasing power of money over time. Also calculate SIP returns, compound wealth targets, and monthly EMI schedules for home, car, and personal loans.
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-orange-600 dark:text-orange-400">
                  <Grid3x3 className="h-5 w-5" />
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white m-0">Construction Calculators</h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed m-0">
                  The <strong>Tile Calculator</strong> estimates tiles, grout, and adhesive for any room. We also offer Paint, Brick, Boundary Wall, and Patio Paver Calculators — all with material quantities and cost estimates built in.
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-pink-600 dark:text-pink-400">
                  <ShieldCheck className="h-5 w-5" />
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white m-0">Health Calculators</h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed m-0">
                  Our <strong>Perimenopause Age Calculator</strong> helps women identify their stage based on age, menstrual status, and symptoms — with an estimate of years to menopause. More health tools coming soon.
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-yellow-600 dark:text-yellow-400">
                  <Zap className="h-5 w-5" />
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white m-0">Electrical Calculators</h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed m-0">
                  The <strong>Electrical Load Calculator</strong> lets you add appliances to get total kW and kVA load, recommended circuit breaker size, monthly units consumed, and electricity bill — for both single-phase and three-phase supply.
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400">
                  <Globe className="h-5 w-5" />
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white m-0">The ToolsWonder Difference</h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed m-0">
                  Most free calculators give you a single number with no explanation. ToolsWonder shows you the formula, assumptions, and breakdown. 100% free, mobile-optimized, loads in under 100ms, no signup required.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Grid / Why Us */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="relative rounded-3xl bg-gradient-to-br from-gray-900 via-indigo-950 to-gray-950 p-8 sm:p-12 lg:p-16 text-white overflow-hidden shadow-2xl">
          {/* Ambient light inside why us */}
          <div className="absolute top-[-50px] right-[-50px] w-64 h-64 bg-blue-500/20 blur-3xl rounded-full" />
          <div className="absolute bottom-[-100px] left-[10%] w-96 h-96 bg-indigo-500/10 blur-3xl rounded-full" />
          <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

          <div className="relative text-center max-w-3xl mx-auto mb-12">
            <Globe className="mx-auto mb-4 h-12 w-12 text-blue-400 opacity-95" />
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Why ToolsWonder?</h2>
            <p className="mt-4 text-base sm:text-lg text-indigo-100 leading-relaxed">
              We build expert-grade tools backed by real formulas and verified data — not generic templates. Every tool includes explanations, formulas, and visual examples so you understand the math.
            </p>
          </div>

          <div className="relative grid gap-6 sm:grid-cols-3">
            {[
              {
                title: "Accurate Formulas",
                desc: "Built on verified scientific, economic, and industry-standard formulas.",
                icon: ShieldCheck,
                iconColor: "text-emerald-400"
              },
              {
                title: "Mobile First",
                desc: "Works perfectly on any smartphone, tablet, or desktop, anywhere.",
                icon: Globe,
                iconColor: "text-blue-400"
              },
              {
                title: "Always Free",
                desc: "No signup, no paywalls. Every tool is free to use forever.",
                icon: Star,
                iconColor: "text-amber-400"
              },
            ].map((f, idx) => {
              const Icon = f.icon;
              return (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.15 }}
                  className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                >
                  <Icon className={`h-8 w-8 mb-4 ${f.iconColor}`} />
                  <h3 className="font-bold text-lg text-white">{f.title}</h3>
                  <p className="mt-2 text-sm text-indigo-100 leading-relaxed">{f.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

    </div>
  );
}
