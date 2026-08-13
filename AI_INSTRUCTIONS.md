# 🤖 AI Agent Instructions for ToolsWonder

**Last Updated:** August 13, 2026

This document provides complete guidance for AI agents working on the ToolsWonder project. Read this first before making any changes.

---

## 📋 Quick Overview

**Project:** ToolsWonder - Free Online Calculators & Tools Platform  
**URL:** https://toolswonder.com  
**Type:** Next.js 15 SaaS/Calculator Platform  
**Monetization:** Google AdSense  
**Repository:** https://github.com/aayushman101/toolswonder  
**Deployment:** Vercel (https://vercel.com/aayushman-s-projects1/toolswonder)  
**Owner:** Aayushman (aayushman6139@gmail.com)  
**Status:** ✅ Live & Monetized  

---

## 🗂️ Project Structure

```
toolswonder/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout with AdSense script & theme
│   ├── page.tsx                 # Home page
│   ├── globals.css              # Global styles (Tailwind CSS)
│   ├── tools/                   # Tool pages directory
│   │   ├── page.tsx             # Tools listing/dashboard
│   │   └── [calculator-name]/   # Individual tool routes
│   │       └── page.tsx         # Tool page with SEO & ads
│   ├── robots.ts                # SEO robots.txt
│   ├── sitemap.ts               # Dynamic sitemap generation
│   └── favicon.ico/route.ts     # Favicon route handler
│
├── components/                   # React components
│   ├── tools/                   # Calculator components (all "use client")
│   │   ├── BrickCalculator.tsx
│   │   ├── TileCalculator.tsx
│   │   ├── FertilizerCalculator.tsx
│   │   └── [40+ other calculators]
│   │
│   ├── ads/                     # Google AdSense components
│   │   ├── AdSenseScript.tsx    # Loads AdSense JS globally
│   │   └── AdUnit.tsx           # Reusable ad component
│   │
│   ├── layout/                  # Layout components
│   │   ├── Header.tsx           # Navigation header
│   │   ├── Footer.tsx           # Footer
│   │   ├── Breadcrumb.tsx       # Breadcrumb navigation
│   │   └── ThemeProvider.tsx    # Dark/light theme
│   │
│   └── seo/                     # SEO components
│       └── JsonLd.tsx           # JSON-LD schema builders
│
├── lib/                         # Utilities & helpers
│   ├── tools/
│   │   └── registry.ts          # ⭐ CENTRAL TOOL REGISTRY
│   ├── fertilizer/
│   │   ├── data.ts              # Fertilizer calculation data
│   │   └── engine.ts            # Calculation logic
│   └── utils.ts                 # Utility functions (cn, etc)
│
├── public/                      # Static files
│   ├── ads.txt                  # AdSense ads.txt (REQUIRED)
│   ├── favicon.ico
│   ├── apple-icon.png
│   └── og-image.png
│
├── .gitignore                   # Git ignore rules (excludes node_modules)
├── package.json                 # Dependencies & scripts
├── tsconfig.json                # TypeScript config
├── tailwind.config.ts           # Tailwind CSS config
├── next.config.ts               # Next.js config
│
├── README.md                    # Project overview
├── CLAUDE.md                    # Development guide (for Claude)
├── ADSENSE_SETUP.md            # AdSense setup guide
└── AI_INSTRUCTIONS.md          # ⬅️ This file
```

---

## 🔑 Key Files & Their Purpose

### `lib/tools/registry.ts` ⭐ MOST IMPORTANT
**Purpose:** Central registry of ALL tools  
**Contains:**
- `tools[]` array - List of all calculators with metadata
- `categories[]` array - Tool categories (finance, agriculture, construction, health)
- Each tool entry has: `slug`, `name`, `description`, `category`, `icon`, `color`

**When adding a new tool:**
1. Add entry to `tools[]` array
2. If new category, add to `categories[]`

**Example:**
```typescript
{
  slug: "brick-calculator",
  name: "Brick Calculator",
  description: "Calculate bricks needed",
  categorySlug: "construction",
  icon: "Hammer2",
  color: "orange"
}
```

### `app/layout.tsx`
**Contains:**
- Global metadata (title, description, keywords)
- Google Search Console verification
- **AdSenseScript component** (loads on ALL pages)
- Google Analytics script
- Theme provider

⚠️ **DO NOT REMOVE:** `<AdSenseScript />` component - it loads AdSense globally

### `components/ads/AdUnit.tsx`
**Purpose:** Render individual ad units  
**Usage:**
```tsx
<AdUnit slot="SLOT_ID_HERE" format="vertical" />
```
**Props:**
- `slot` (required) - Ad slot ID from AdSense
- `format` - "auto" | "vertical" | "horizontal"
- `responsive` - boolean (default: true)
- `className` - CSS classes

---

## 🛠️ Tech Stack

| Tech | Purpose | Version |
|------|---------|---------|
| **Next.js** | Framework | 15.5.19 |
| **React** | UI Library | 19.0 |
| **TypeScript** | Type Safety | 5.x |
| **Tailwind CSS** | Styling | 3.4.17 |
| **next-themes** | Dark/Light Mode | 0.4.6 |
| **Framer Motion** | Animations | 12.15 |
| **Lucide Icons** | Icons | 0.511 |
| **Zod** | Validation | 3.24.2 |
| **Vercel** | Hosting | - |

---

## 📁 What's Where

### Adding a New Calculator Tool

**Required Files:**
1. **Component:** `components/tools/MyToolCalculator.tsx`
   - Must be `"use client"`
   - Use `useMemo` for calculations
   - Use Tailwind for styling
   - Use `.input-field` and `.card` CSS classes

2. **Page:** `app/tools/my-tool-slug/page.tsx`
   - Must have `export const metadata` with SEO tags
   - Must include `<JsonLd>` schemas (Tool, FAQ, Breadcrumb)
   - Must have `<Breadcrumb>` navigation
   - Must have `<AdUnit>` components (top, middle, sidebar)
   - Should have 5+ FAQ items
   - Should have "Related Tools" section

3. **Registry:** Update `lib/tools/registry.ts`
   - Add to `tools[]` array
   - If new category, add to `categories[]`

**Example Structure:**
```tsx
// components/tools/MyTool.tsx
"use client";

export default function MyTool() {
  return (
    <div className="space-y-4">
      <input className="input-field" type="number" placeholder="Enter value" />
      <div className="card p-5">Result: ...</div>
    </div>
  );
}
```

```tsx
// app/tools/my-tool-slug/page.tsx
import MyTool from "@/components/tools/MyTool";
import AdUnit from "@/components/ads/AdUnit";

export const metadata = {
  title: "My Tool - ToolsWonder",
  description: "...",
  // ... more SEO
};

export default function Page() {
  return (
    <div>
      <Breadcrumb items={...} />
      <AdUnit slot="TOP_AD_SLOT" />
      <MyTool />
      <AdUnit slot="MIDDLE_AD_SLOT" />
      <FAQ items={...} />
      <AdUnit slot="SIDEBAR_AD_SLOT" format="vertical" />
    </div>
  );
}
```

---

## 🌐 Deployment & Hosting

### Vercel Project Settings
- **URL:** https://vercel.com/aayushman-s-projects1/toolswonder
- **Production Domain:** https://toolswonder.com
- **GitHub Connection:** ✅ Connected (auto-deploy on push)
- **Environment:** Production
- **Region:** US East (Washington, D.C.)

### How Deployment Works

**Automatic Deployment:**
1. Push to GitHub (`master` branch)
2. Vercel webhook triggers
3. Build runs (~40 seconds)
4. Deploys to production
5. Live at https://toolswonder.com

**Manual Deployment (if needed):**
```bash
cd d:\.AA\ToolsWonder\toolswonder

# Option 1: Using Vercel CLI (requires auth)
npx vercel deploy --prod

# Option 2: Using Vercel Dashboard (Recommended)
# Go to https://vercel.com/aayushman-s-projects1/toolswonder/deployments
# Click "Redeploy" on the latest deployment
```

### Build Process
```bash
npm run build
# Compiles TypeScript
# Builds Next.js
# Generates static pages
# Validates types with tsc
```

---

## 🐙 GitHub Workflow

### Repository
- **URL:** https://github.com/aayushman101/toolswonder
- **Branch:** master
- **Visibility:** Public
- **Owner:** aayushman101

### Push Changes to GitHub

```bash
cd d:\.AA\ToolsWonder\toolswonder

# 1. Check status
git status

# 2. Stage files
git add app/tools/my-tool/page.tsx
git add components/tools/MyTool.tsx
git add lib/tools/registry.ts

# 3. Commit (include co-author)
git commit -m "Add MyTool calculator

Description of what this adds/fixes."

# 4. Push (auto-deploys!)
git push origin master
```

### Commit Message Format
```
Short description (50 chars max)

Longer explanation if needed.
Multiple paragraphs are fine.

Co-Authored-By: Claude <noreply@anthropic.com>
```

---

## 💰 Google AdSense Integration

### Account Details
- **Publisher ID:** `ca-pub-4076619037767871`
- **Status:** ✅ Verified
- **Approval:** Pending/In Review (1-2 weeks)
- **Dashboard:** https://adsense.google.com

### What's Deployed

**1. AdSense Meta Tag** (`app/layout.tsx`)
```html
<meta name="google-adsense-account" content="ca-pub-4076619037767871" />
```

**2. AdSense Script** (`components/ads/AdSenseScript.tsx`)
```tsx
<Script
  async
  src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4076619037767871"
  strategy="beforeInteractive"
/>
```

**3. ads.txt File** (`public/ads.txt`)
```
google.com, pub-4076619037767871, DIRECT, f08c47fec0942fa0
```

### Adding Ad Units

Once Google approves (sends email):

1. **Create Ad Unit** in AdSense Dashboard
   - Type: "Display ads"
   - Format: Responsive or specific (300x250, etc)
   - Copy the slot ID

2. **Add to Page**
   ```tsx
   import AdUnit from "@/components/ads/AdUnit";
   
   <AdUnit slot="123456789" /> // Replace with actual slot ID
   ```

3. **Push to GitHub**
   - Changes auto-deploy to production
   - Ads go live immediately

### Expected Ad Placement
- Top of page (before fold)
- Between calculator and FAQ
- Sidebar (vertical format)
- Between content sections

---

## 🔍 SEO & Structure

### JSON-LD Schemas (Auto-generated)
Every tool page includes:
- **ToolSchema** - Describes the calculator
- **FAQSchema** - For FAQ section
- **BreadcrumbSchema** - For navigation
- **OG Tags** - For social sharing

**Located in:** `components/seo/JsonLd.tsx`

### Meta Tags
**Each page must have:**
```typescript
export const metadata = {
  title: "Tool Name – Description",
  description: "Long description for search engines",
  keywords: ["keyword1", "keyword2", "keyword3"],
  alternates: { canonical: "https://toolswonder.com/tools/slug" },
  openGraph: {
    title: "...",
    description: "...",
    url: "...",
    images: [{ url: "..." }],
  }
}
```

### SEO Best Practices
✅ DO:
- Include target keywords in title & description
- Write compelling meta descriptions (150-160 chars)
- Add 5+ FAQ items with long-tail keywords
- Link to related tools
- Use semantic HTML

❌ DON'T:
- Keyword stuff
- Copy descriptions from other sites
- Forget canonical URLs
- Use duplicate meta descriptions

---

## 🎨 Design System

### Colors & Tailwind
- Use Tailwind CSS for all styling
- `dark:` prefix for dark mode
- Root colors defined in `globals.css`

### CSS Classes
- `.input-field` - Standard input styling
- `.card` - Card/box styling
- `.text-gradient` - Gradient text effect

### Icons
- Use Lucide icons: `import { IconName } from "lucide-react"`
- Categories have assigned icons in registry

### Responsive Design
```tsx
// Mobile first approach
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  {/* Responsive grid */}
</div>
```

---

## 🧪 Development Workflow

### Local Development
```bash
cd d:\.AA\ToolsWonder\toolswonder

# Install dependencies
npm install

# Start dev server
npm run dev
# Opens http://localhost:3000

# Type checking
npx tsc --noEmit

# Build
npm run build
```

### Common Tasks

**Add a new calculator tool:**
1. Create component file
2. Create page file with metadata & AdUnits
3. Update registry
4. Test locally
5. Commit & push

**Update existing tool:**
1. Edit component or page
2. Test locally
3. Commit & push

**Fix bug:**
1. Identify issue
2. Fix code
3. Type check: `npx tsc --noEmit`
4. Test locally
5. Commit & push

---

## ⚙️ Configuration Files

### `next.config.ts`
- Image optimization
- Redirects/rewrites (if any)
- Environment variables

### `tailwind.config.ts`
- Color palette
- Spacing scale
- Font configuration
- Dark mode setup

### `tsconfig.json`
- Path aliases (`@/` = src root)
- Strict mode enabled
- Module resolution

### `.gitignore`
```
node_modules/
.next/
.env.local
.vercel
*.log
.DS_Store
```

---

## 📊 File Naming Conventions

| Type | Pattern | Example |
|------|---------|---------|
| **Components** | PascalCase.tsx | `BrickCalculator.tsx` |
| **Pages** | lowercase-kebab/page.tsx | `brick-calculator/page.tsx` |
| **Utilities** | camelCase.ts | `utils.ts` |
| **Folders** | lowercase-kebab | `tools/`, `components/` |

---

## 🚨 Common Mistakes to Avoid

❌ **DON'T:**
- Remove `<AdSenseScript />` from layout
- Forget to update registry when adding tools
- Use client-side state in tool pages (use `useMemo`)
- Hardcode CSS values (use Tailwind)
- Forget meta tags and SEO
- Push node_modules to GitHub
- Remove ads.txt file
- Click your own ads (violates AdSense policy)
- Commit sensitive tokens or secrets

✅ **DO:**
- Always use TypeScript types
- Test locally before pushing
- Include AdUnits on every tool page
- Write semantic HTML
- Use Tailwind for styling
- Update registry for new tools
- Commit frequently with clear messages
- Follow existing patterns
- Use environment variables for secrets

---

## 📞 Important Contacts & Links

| Resource | URL |
|----------|-----|
| **Live Site** | https://toolswonder.com |
| **GitHub** | https://github.com/aayushman101/toolswonder |
| **Vercel** | https://vercel.com/aayushman-s-projects1/toolswonder |
| **AdSense** | https://adsense.google.com |
| **Google Analytics** | GA ID: G-KZQ9CPW343 |
| **Search Console** | Verified |

---

## 🎯 Next Steps (When AdSense Approves)

1. Create ad units in AdSense dashboard
2. Get slot IDs
3. Add `<AdUnit slot="ID" />` to tool pages
4. Create new branch: `git checkout -b feature/add-ad-units`
5. Update pages with ad units
6. Commit: `git commit -m "Add AdSense ad units to calculator pages"`
7. Push: `git push origin feature/add-ad-units`
8. Create PR or merge directly to master
9. Watch ads go live! 💰

---

## 📝 Notes for Future Development

- **Traffic monitoring:** Check Google Analytics regularly
- **Ad performance:** Monitor CTR and RPM in AdSense dashboard
- **New tools:** Follow the adding tools checklist
- **Bug fixes:** Always type-check before deploying
- **Performance:** Use Next.js Image component, optimize bundles
- **SEO:** Monitor search rankings, update keywords

---

## ✅ Pre-Deployment Checklist

Before pushing to GitHub (which auto-deploys):

- [ ] TypeScript compiles: `npx tsc --noEmit`
- [ ] All imports are correct
- [ ] New tool added to registry (if applicable)
- [ ] Meta tags are complete
- [ ] AdUnits are placed (if new page)
- [ ] SEO is optimized
- [ ] Component is tested locally
- [ ] Breadcrumbs work correctly
- [ ] Links are working
- [ ] Mobile responsive
- [ ] Commit message is clear
- [ ] No sensitive data in commits

---

## 🤝 Working with AI Agents

**Important Notes for Claude/Future AI:**

1. **Always read this file first** before making changes
2. **Check registry before adding tools** - Don't duplicate
3. **Follow the patterns** - Look at existing tools for examples
4. **Ask for clarification** - If unsure about user intent
5. **Type safety** - Use TypeScript everywhere
6. **Test locally** - Before claiming completion
7. **Update registry** - When adding new tools
8. **No breaking changes** - Without explicit request
9. **Preserve AdSense** - Never remove ad components
10. **Document changes** - Clear commit messages
11. **No secrets in code** - Use environment variables
12. **Follow conventions** - File naming, code style, structure

---

**Last Verified:** August 13, 2026  
**Next Review:** When significant architecture changes occur  
**Questions?** Check CLAUDE.md or ADSENSE_SETUP.md
