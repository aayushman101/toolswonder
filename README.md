# ToolsWonder

**Free Online Calculators & Tools Platform**

A Next.js 15 application featuring 30+ calculator tools for finance, agriculture, construction, and health. Built for speed, SEO optimization, and monetization with Google AdSense.

**Website:** https://toolswonder.com

## Features

- 🧮 **30+ Calculator Tools** - Finance, agriculture, construction, health calculators
- 🔍 **SEO Optimized** - JSON-LD schemas, meta tags, structured data
- 🎨 **Dark/Light Theme** - Built-in theme switcher with next-themes
- 📱 **Mobile Responsive** - Tailwind CSS responsive design
- 💰 **Google AdSense Ready** - Integrated AdSense components
- ⚡ **Next.js 15** - Latest features, serverless deployment
- 🌐 **Multi-language Ready** - Base structure for i18n

## Tech Stack

- **Framework:** Next.js 15 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Theme:** next-themes
- **Deployment:** Vercel
- **Monetization:** Google AdSense

## Project Structure

```
toolswonder/
├── app/
│   ├── layout.tsx          # Root layout with theme provider
│   ├── page.tsx            # Home page
│   ├── tools/              # Tool pages
│   └── sitemap.ts          # Dynamic sitemap
├── components/
│   ├── tools/              # Calculator components (client-side)
│   ├── layout/             # Layout components
│   ├── ads/                # AdSense components
│   └── seo/                # SEO components
├── lib/
│   ├── tools/registry.ts   # Central tool registry
│   └── utils.ts            # Utility functions
├── public/
│   ├── ads.txt             # AdSense ads.txt file
│   └── favicon.ico
└── CLAUDE.md               # Development guide
```

## Available Tools

**Finance:**
- Inflation Calculator
- SIP Calculator
- EMI Calculator
- Mortgage Calculator

**Agriculture:**
- Fertilizer Calculator
- NPK Calculator
- Urea Calculator
- DAP Calculator
- Drip Irrigation Calculator

**Construction:**
- Brick Calculator
- Tile Calculator
- Paint Calculator
- Concrete Calculator
- Drywall Calculator
- Flooring Calculator
- Roofing Calculator
- Wood Calculator
- Lumber Calculator
- Boundary Wall Brick Calculator

**Health:**
- TDEE Calculator
- Perimenopause Age Calculator

**Other:**
- Wire Gauge Calculator
- AC Unit Calculator
- Mulch Calculator
- Furnace BTU Calculator
- Ductwork Calculator
- Electrical Load Calculator
- Insulation Calculator

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
git clone https://github.com/aayushman101/toolswonder.git
cd toolswonder
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

### Build & Deploy

```bash
# Type check
npm run tsc --noEmit

# Build
npm run build

# Deploy to Vercel
npx vercel deploy --prod
```

## Google AdSense Integration

- **Publisher ID:** `ca-pub-4076619037767871`
- **Status:** Verified ✅
- **Ad Components:** Ready in `components/ads/`
- **ads.txt:** Configured

### Adding Ad Units

1. Create ad units in [AdSense Dashboard](https://adsense.google.com/)
2. Get the ad slot IDs
3. Update pages with `<AdUnit slot="YOUR_SLOT_ID" />`

Example:
```tsx
import AdUnit from "@/components/ads/AdUnit";

export default function Page() {
  return (
    <div>
      <AdUnit slot="1234567890" />
      {/* Your content */}
    </div>
  );
}
```

## Adding a New Tool

See [CLAUDE.md](CLAUDE.md) for detailed instructions on:
- Creating calculator components
- Setting up tool pages
- Adding to tool registry
- SEO optimization

## Environment Variables

Create `.env.local`:
```
# Add your environment variables here if needed
```

## Performance

- **Next.js 15** with Turbopack for fast builds
- **Static generation** for tool pages
- **Image optimization** with Next.js Image
- **CSS optimization** with Tailwind CSS
- **Responsive design** for all devices

## SEO

Each tool page includes:
- Meta tags (title, description, keywords)
- JSON-LD schemas (Tool, FAQ, Breadcrumb)
- Open Graph tags
- Canonical URLs
- Structured data for search engines

## License

MIT License - feel free to use for your projects

## Support

- 📧 Email: aayushman6139@gmail.com
- 🐙 GitHub: https://github.com/aayushman101/toolswonder

## Deployment Status

- **Production:** https://toolswonder.com
- **Platform:** Vercel
- **Status:** ✅ Live
- **Auto-deploy:** Enabled (on push to GitHub)

---

**Made with ❤️ for useful tools & calculators**
