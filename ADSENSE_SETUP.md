# Google AdSense Setup Guide for ToolsWonder

## What I've Done (Code Changes)

I've added Google AdSense integration to your Next.js project:

1. **Created AdSense Components:**
   - `components/ads/AdSenseScript.tsx` - Loads the Google AdSense script globally
   - `components/ads/AdUnit.tsx` - Reusable component for displaying ads

2. **Updated Root Layout:**
   - Added `<AdSenseScript />` to `app/layout.tsx` to load AdSense on all pages

3. **Updated Brick Calculator Page:**
   - Replaced placeholder text with `<AdUnit>` components
   - Ad slots placed at: top of page, between calculator and FAQ, and in sidebar

## Step-by-Step: Apply for Google AdSense

### Step 1: Verify Your Website (Already Done ✅)
Your site is already verified with Google Search Console:
- **Google Verification ID:** `a6b7Ncm9HJyoPbAed9CNdAaY6D18tPp653WHn802sm8`
- This is already configured in `app/layout.tsx`

### Step 2: Create a Google AdSense Account

1. Go to [Google AdSense](https://www.google.com/adsense/)
2. Click **"Sign in with your Google account"** (or create one if needed)
3. Click **"Get started"**
4. Enter your website URL: `https://toolswonder.com`
5. Select your country and timezone (India, based on your tools)
6. Accept AdSense policies and click **"Create account"**

### Step 3: Add Your Publisher ID to Code

Once you create your AdSense account, Google will give you a **Publisher ID** in the format: `ca-pub-XXXXXXXXXX`

1. **Find all instances of `ca-pub-YOUR_PUBLISHER_ID`** in these files:
   - `components/ads/AdSenseScript.tsx` (line 8)
   - `components/ads/AdUnit.tsx` (line 20)

2. **Replace with your actual Publisher ID:**
   ```
   ca-pub-XXXXXXXXXX  ← Replace with your real ID
   ```

3. **Save files and deploy:**
   ```bash
   npx tsc --noEmit
   npx vercel deploy --prod
   ```

### Step 4: Create Ad Units in AdSense

After approving your site, Google AdSense dashboard will let you create ad units:

1. Go to **AdSense Dashboard** → **Ads** → **By code**
2. Click **"Create new ad unit"**
3. Choose ad format (recommended for your site):
   - **Responsive display ads** - for top/middle sections
   - **Vertical ads (160×600, 300×600)** - for sidebar
4. For each ad unit, copy the **AD SLOT ID** (looks like: `1234567890`)

### Step 5: Add Your Ad Slot IDs to Code

Replace `REPLACE_WITH_AD_SLOT` in these locations:

**In `app/tools/brick-calculator/page.tsx`:**
```tsx
// Top of page (line 36)
<AdUnit slot="YOUR_FIRST_AD_SLOT_ID" />

// Between calculator and FAQ (line 46)
<AdUnit slot="YOUR_SECOND_AD_SLOT_ID" />

// Sidebar (line 62)
<AdUnit slot="YOUR_THIRD_AD_SLOT_ID" format="vertical" />
```

### Step 6: Apply Ad Units to All Other Tool Pages

For each of your other calculator pages (inflation, fertilizer, tile, etc.):

1. Add import at top:
   ```tsx
   import AdUnit from "@/components/ads/AdUnit";
   ```

2. Replace ad slot placeholders with:
   ```tsx
   <AdUnit slot="YOUR_AD_SLOT_ID" />
   ```

**Quick Find & Replace for all pages:**
Search for files containing `className="ad-slot"` and replace with `<AdUnit>` components.

## Expected Timeline

- **Application Submission:** Immediate (when you sign up)
- **Initial Review:** 3-5 days (usually automatic)
- **Full Approval:** 1-2 weeks
- **Ads Showing:** Once approved, ads appear within hours

## Approval Requirements

Google will check:
- ✅ Site is public and accessible
- ✅ Has sufficient content (your 30+ tools qualify)
- ✅ Complies with AdSense policies
- ✅ Uses original content (your calculators are unique tools)

Your site should **easily qualify** - you have:
- 30+ unique calculator tools
- Good SEO setup with JSON-LD
- Mobile-responsive design
- No policy violations

## Important Notes

1. **Don't Click Your Own Ads** - This gets you banned immediately
2. **No Ad-Free Requests to Users** - Don't ask visitors to disable adblockers
3. **Proper Ad Placement** - Ads should not interfere with content
4. **Monitor Performance** - Check AdSense dashboard regularly for earnings

## Earnings Estimates

- **CPM** (Cost Per Mille): $0.5-$5 per 1,000 impressions
- **CTR** (Click-Through Rate): 1-3% typical
- **Income depends on:** traffic, country of visitors, content niche

Example: 10,000 monthly visitors, $2 CPM, 2% CTR = ~$200-400/month

## After Approval: What to Do

1. Monitor earnings in AdSense Dashboard
2. Check ad performance (CTR, RPM)
3. Optimize ad placement based on data
4. Ensure ads are responsive on mobile
5. Keep content fresh and updated

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Ads not showing | Check Publisher ID is correct, wait 24-48 hours after approval |
| "Ads by Google" text only | Ad slot may be blocked, check browser console for errors |
| Low earnings | Improve traffic, target high-paying keywords (finance/construction) |
| Account suspended | Review AdSense policies immediately, appeal via dashboard |

## Files Modified

```
✅ app/layout.tsx - Added AdSenseScript component
✅ components/ads/AdSenseScript.tsx - Created (new)
✅ components/ads/AdUnit.tsx - Created (new)
✅ app/tools/brick-calculator/page.tsx - Updated ad slots
```

## Next Steps

1. **Apply for AdSense** → https://www.google.com/adsense/
2. **Get your Publisher ID** from AdSense dashboard
3. **Replace `ca-pub-YOUR_PUBLISHER_ID`** in both ad component files
4. **Create ad units** and get their slot IDs
5. **Replace `REPLACE_WITH_AD_SLOT`** with actual slot IDs
6. **Deploy:** `npx vercel deploy --prod`
7. **Wait for approval** (1-2 weeks)
8. **Monitor earnings** in AdSense dashboard

---

**Questions?** Check [Google AdSense Help Center](https://support.google.com/adsense)
