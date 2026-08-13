import type { Metadata } from "next";
import Link from "next/link";
import PerimenopauseCalculator from "@/components/tools/PerimenopauseCalculator";
import JsonLd, { buildToolSchema, buildFaqSchema, buildBreadcrumbSchema } from "@/components/seo/JsonLd";
import Breadcrumb from "@/components/layout/Breadcrumb";
import { ChevronRight, Heart } from "lucide-react";

const BASE_URL = "https://toolswonder.com";
const TOOL_URL = `${BASE_URL}/tools/perimenopause-age-calculator`;

export const metadata: Metadata = {
  title: "Perimenopause Age Calculator – What Stage Am I In?",
  description: "Free perimenopause age calculator. Enter your age, menstrual status, symptoms, and family history to find out your perimenopause stage and estimate when you will reach menopause.",
  keywords: ["perimenopause age calculator", "perimenopause calculator", "am i in perimenopause", "perimenopause stage calculator", "when will i reach menopause", "perimenopause symptoms checker"],
  alternates: { canonical: TOOL_URL },
  openGraph: {
    title: "Perimenopause Age Calculator – What Stage Am I In? | ToolsWonder",
    description: "Find your perimenopause stage and estimate years to menopause based on age, menstrual status, symptoms, and family history.",
    url: TOOL_URL,
    type: "website",
  },
};

const faqs = [
  { question: "What is the average age for perimenopause to start?", answer: "Most women begin perimenopause in their mid-to-late 40s, with the average onset around age 47. However, it can start as early as the late 30s or as late as the early 50s. Early perimenopause (before age 40) affects about 1% of women and is called premature ovarian insufficiency (POI). Genetics plays a major role — if your mother entered menopause early, you are likely to as well." },
  { question: "What are the first signs of perimenopause?", answer: "The earliest signs of perimenopause are often subtle cycle changes — periods arriving earlier or later than usual, becoming heavier or lighter, or lasting for a different number of days. Other early symptoms include: occasional hot flashes, disrupted sleep, mood changes, and decreased libido. Many women mistake early perimenopause for stress. If your cycle varies by 7 or more days from your usual pattern, that is a clinical marker of early perimenopause." },
  { question: "How long does perimenopause last?", answer: "Perimenopause averages 4–8 years, but can range from just a few months to 10+ years. The phase is typically divided into early perimenopause (irregular cycles, variable symptoms) and late perimenopause (skipped periods of 60+ days, more intense symptoms). The final transition — the last 1–2 years before menopause — often brings the most noticeable symptoms as estrogen drops steeply." },
  { question: "How do I know if I am in perimenopause or just stressed?", answer: "Stress and perimenopause share symptoms like sleep disruption, mood changes, and irregular periods. The key differentiator is age and hormonal testing. If you are 40+ and experiencing cycle irregularity alongside symptoms, perimenopause is more likely. A blood test measuring FSH (Follicle-Stimulating Hormone) and estradiol can help — elevated FSH (above 10 IU/L, particularly above 25) suggests perimenopause. However, FSH fluctuates, so a single test is not definitive." },
  { question: "What is the difference between perimenopause and menopause?", answer: "Perimenopause is the transitional phase leading up to menopause — it can last years and is characterized by irregular periods and hormonal fluctuations. Menopause is the specific point in time after 12 consecutive months without a period. After that point, a woman is post-menopausal. Most symptoms associated with 'menopause' (hot flashes, night sweats, mood changes) actually begin in perimenopause, often years before the final period." },
  { question: "Can you get pregnant during perimenopause?", answer: "Yes — pregnancy is possible during perimenopause. While fertility declines significantly, ovulation still occurs unpredictably, and pregnancy can happen. You should use contraception until you have had 12 consecutive months without a period (i.e., until you reach menopause). Women over 50 who have not had a period for 12 months, or women under 50 who have not had a period for 24 months, are generally considered no longer fertile without assisted reproduction." },
];

const relatedTools = [
  { title: "Inflation Calculator", href: "/tools/inflation-calculator", desc: "See how purchasing power changes over time" },
  { title: "SIP Calculator", href: "/tools/sip-calculator", desc: "Plan retirement savings with SIP projections" },
  { title: "EMI Calculator", href: "/tools/emi-calculator", desc: "Calculate monthly loan repayments" },
];

export default function PerimenopauseAgeCalculatorPage() {
  return (
    <>
      <JsonLd data={buildToolSchema({ name: "Perimenopause Age Calculator", description: "Estimate your perimenopause stage and years to menopause based on age, menstrual status, symptoms, and family history.", url: TOOL_URL, category: "Health" })} />
      <JsonLd data={buildFaqSchema(faqs)} />
      <JsonLd data={buildBreadcrumbSchema([
        { name: "Home", url: BASE_URL },
        { name: "Tools", url: `${BASE_URL}/tools` },
        { name: "Health", url: `${BASE_URL}/tools?category=health` },
        { name: "Perimenopause Age Calculator", url: TOOL_URL },
      ])} />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumb items={[
          { label: "Tools", href: "/tools" },
          { label: "Health", href: "/tools?category=health" },
          { label: "Perimenopause Age Calculator" },
        ]} />
        <div className="ad-slot my-4">Advertisement</div>
        <div className="lg:grid lg:grid-cols-[1fr_300px] lg:gap-8">
          <div className="space-y-8">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-pink-50 px-3 py-1 text-xs font-medium text-pink-700">
                  <Heart className="h-3.5 w-3.5" /> Health
                </span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 sm:text-4xl">Perimenopause Age Calculator</h1>
              <p className="mt-3 text-lg text-gray-600 dark:text-gray-400">Find out what perimenopause stage you are in. Enter your age, menstrual status, current symptoms, and family history to get your estimated stage and how many years until menopause.</p>
            </div>

            <PerimenopauseCalculator />

            <div className="ad-slot">Advertisement</div>

            <section className="prose prose-gray max-w-none dark:prose-invert">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Perimenopause Stages Explained</h2>
              <p className="text-gray-600 dark:text-gray-400">Perimenopause is not a single event — it unfolds across distinct stages, each with characteristic hormonal and physical changes. Understanding which stage you are in helps you anticipate what is coming and have informed conversations with your healthcare provider.</p>
              <div className="not-prose overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-gray-50 dark:bg-gray-800 text-left">
                      <th className="border border-gray-200 dark:border-gray-700 px-4 py-2 font-semibold">Stage</th>
                      <th className="border border-gray-200 dark:border-gray-700 px-4 py-2 font-semibold">Typical Age</th>
                      <th className="border border-gray-200 dark:border-gray-700 px-4 py-2 font-semibold">Key Signs</th>
                      <th className="border border-gray-200 dark:border-gray-700 px-4 py-2 font-semibold">Duration</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["Pre-perimenopause", "35–45", "Regular cycles, subtle mood or sleep changes", "—"],
                      ["Early perimenopause", "40–48", "Cycle varies 7+ days, occasional hot flashes", "2–5 years"],
                      ["Late perimenopause", "45–52", "Skipped periods (60+ day gaps), stronger symptoms", "1–3 years"],
                      ["Menopause", "~51 (avg)", "Final period — confirmed 12 months after last", "One point in time"],
                      ["Post-menopause", "51+", "Symptoms may ease; bone/cardiovascular changes begin", "Ongoing"],
                    ].map(([stage, age, signs, dur]) => (
                      <tr key={stage} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-2 font-medium">{stage}</td>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-2 text-pink-700 dark:text-pink-400 font-medium">{age}</td>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-2 text-gray-600 dark:text-gray-400">{signs}</td>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-2">{dur}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-8">Common Perimenopause Symptoms</h2>
              <p className="text-gray-600 dark:text-gray-400">Symptoms vary widely between women in type, severity, and timing. Some women sail through with barely a disruption; others find perimenopause significantly impacts quality of life. The calculator above factors in your reported symptoms as part of the stage assessment.</p>
              <div className="not-prose overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-gray-50 dark:bg-gray-800 text-left">
                      <th className="border border-gray-200 dark:border-gray-700 px-4 py-2 font-semibold">Symptom</th>
                      <th className="border border-gray-200 dark:border-gray-700 px-4 py-2 font-semibold">How Common</th>
                      <th className="border border-gray-200 dark:border-gray-700 px-4 py-2 font-semibold">Usually Starts In</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["Hot flashes / night sweats", "75% of women", "Early–late perimenopause"],
                      ["Irregular periods", "Nearly all", "Earliest sign — early perimenopause"],
                      ["Sleep disruption", "~60%", "Early perimenopause"],
                      ["Mood changes / irritability", "~40–50%", "Early perimenopause"],
                      ["Vaginal dryness", "~50%", "Late perimenopause / post-menopause"],
                      ["Brain fog / memory issues", "~60%", "Early to late perimenopause"],
                      ["Decreased libido", "~40%", "Late perimenopause"],
                      ["Joint pain", "~50%", "Perimenopause (estrogen affects joints)"],
                    ].map(([symptom, common, starts]) => (
                      <tr key={symptom} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-2 font-medium">{symptom}</td>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-2 text-pink-700 dark:text-pink-400 font-medium">{common}</td>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-2 text-gray-600 dark:text-gray-400">{starts}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-8">What Affects When Menopause Starts?</h2>
              <p className="text-gray-600 dark:text-gray-400">Several factors influence a woman&apos;s age at menopause. The strongest predictor is genetics — if your mother reached menopause early, you are likely to as well. Other factors that can shift the timing:</p>
              <ul className="text-gray-600 dark:text-gray-400">
                <li><strong>Earlier menopause:</strong> Smoking (1–2 years earlier), chemotherapy or radiation, surgical removal of ovaries, never having been pregnant.</li>
                <li><strong>Later menopause:</strong> Higher BMI (more estrogen stored in fat), having had multiple pregnancies, oral contraceptive use history (may slightly delay onset).</li>
                <li><strong>Roughly neutral:</strong> Ethnicity, moderate alcohol use, exercise level, oral contraceptive use in younger years.</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-gray-100">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {faqs.map((f, i) => (
                  <div key={i} className="card p-5">
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100">{f.question}</h3>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{f.answer}</p>
                  </div>
                ))}
              </div>
            </section>

            <div className="ad-slot">Advertisement</div>
          </div>

          <aside className="mt-8 space-y-6 lg:mt-0">
            <div className="ad-slot h-[250px]">Advertisement</div>
            <div className="card p-5">
              <h3 className="mb-3 font-semibold text-gray-900 dark:text-gray-100">Perimenopause Stages</h3>
              <div className="space-y-2 text-xs">
                {[
                  ["Pre-perimenopause", "Regular cycles"],
                  ["Early perimenopause", "Varies 7+ days"],
                  ["Late perimenopause", "Skipped periods"],
                  ["Menopause", "12 months no period"],
                  ["Post-menopause", "After menopause"],
                  ["Average duration", "4–8 years"],
                ].map(([s, v]) => (
                  <div key={s} className="flex justify-between gap-2">
                    <span className="text-gray-500 dark:text-gray-400">{s}</span>
                    <span className="font-semibold text-pink-700 dark:text-pink-400 text-right">{v}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="card p-5">
              <h3 className="mb-3 font-semibold text-gray-900 dark:text-gray-100">Key Facts</h3>
              <div className="space-y-2 text-xs">
                {[
                  ["Average menopause age", "51 years"],
                  ["Earliest typical onset", "Late 30s"],
                  ["Perimenopause duration", "4–8 years"],
                  ["FSH elevated at", ">10–25 IU/L"],
                ].map(([s, v]) => (
                  <div key={s} className="flex justify-between gap-2">
                    <span className="text-gray-500 dark:text-gray-400">{s}</span>
                    <span className="font-semibold text-pink-700 dark:text-pink-400 text-right">{v}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="card p-5">
              <h3 className="mb-4 font-semibold text-gray-900 dark:text-gray-100">Other Tools</h3>
              <ul className="space-y-3">
                {relatedTools.map((t) => (
                  <li key={t.href}>
                    <Link href={t.href} className="group flex items-start gap-2">
                      <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-pink-500 group-hover:translate-x-0.5 transition-transform" />
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-gray-100 group-hover:text-pink-600 transition-colors">{t.title}</div>
                        <div className="text-xs text-gray-500">{t.desc}</div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="ad-slot h-[250px]">Advertisement</div>
          </aside>
        </div>
      </div>
    </>
  );
}
