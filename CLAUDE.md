# ToolsWonder – Project Guide for Claude

## Project Structure

Next.js 15 app at `d:\.AA\ToolsWonder\toolswonder\`.

- `app/tools/[slug]/page.tsx` — one page per tool
- `components/tools/` — interactive React calculator components (`"use client"`)
- `lib/tools/registry.ts` — central tool registry; every tool must be registered here
- `components/seo/JsonLd.tsx` — shared JSON-LD schema builders
- `app/sitemap.ts` — auto-generated from registry; no manual edits needed
- `app/robots.ts` — allows all, points to sitemap

## Deployment

**Platform:** Vercel  
**Project:** `aayushman-s-projects1/toolswonder`  
**Production URL:** https://toolswonder.com  
**Command to deploy:**

```bash
npx vercel deploy --prod
```

Run from `d:\.AA\ToolsWonder\toolswonder\`. The Vercel CLI is available via `npx vercel` (not a global install). No login needed — credentials are already stored locally.

Always run a type-check before deploying:

```bash
npx tsc --noEmit
```

## Adding a New Tool — Checklist

1. **Component** — `components/tools/MyTool.tsx` — must be `"use client"`, use `useMemo` for calculations, use `cn()` from `@/lib/utils` for conditional classes, use `input-field` and `card` CSS classes to match existing style.

2. **Page** — `app/tools/[slug]/page.tsx` — must include:
   - `export const metadata` with `title`, `description`, `keywords`, `alternates.canonical`, and `openGraph`
   - `<JsonLd>` with `buildToolSchema`, `buildFaqSchema`, `buildBreadcrumbSchema` (include category level in breadcrumb)
   - `<Breadcrumb>` with three levels: Tools → Category → Tool Name
   - Category badge chip (`<span>`) next to H1
   - Rich content section (H2 headings + reference tables) between calculator and FAQ
   - Related tools sidebar widget with `<Link>` + `<ChevronRight>`
   - At least 5 FAQ items targeting long-tail keywords
   - Ad slots: above fold, between calculator and content, in sidebar

3. **Registry** — add entry to `lib/tools/registry.ts` `tools` array. If a new `categorySlug` is used, also add a category entry to the `categories` array at the bottom.

4. **Tools page colors** — if adding a new color (e.g. `"pink"`), add it to `catColorMap` and `iconBgMap` in `app/tools/page.tsx`.

## Existing Categories

| Category | `categorySlug` | Color |
|---|---|---|
| Finance Tools | `finance` | `blue` |
| Agriculture Tools | `agriculture` | `green` |
| Construction Tools | `construction` | `orange` |
| Health Tools | `health` | `pink` |
