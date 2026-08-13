"use client";

import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";

type MenstrualStatus = "regular" | "irregular" | "very_irregular" | "stopped_less1" | "stopped_1plus";

const SYMPTOMS = [
  { id: "hot_flashes", label: "Hot flashes / night sweats" },
  { id: "sleep", label: "Sleep problems / insomnia" },
  { id: "mood", label: "Mood changes / irritability" },
  { id: "vaginal_dryness", label: "Vaginal dryness" },
  { id: "brain_fog", label: "Brain fog / memory issues" },
  { id: "low_libido", label: "Decreased sex drive" },
  { id: "joint_pain", label: "Joint or muscle pain" },
  { id: "weight_gain", label: "Weight gain (especially abdomen)" },
];

const STAGE_COLORS: Record<string, string> = {
  green: "bg-green-50 dark:bg-green-950 border-green-300 dark:border-green-700 text-green-900 dark:text-green-100",
  blue: "bg-blue-50 dark:bg-blue-950 border-blue-300 dark:border-blue-700 text-blue-900 dark:text-blue-100",
  yellow: "bg-yellow-50 dark:bg-yellow-950 border-yellow-300 dark:border-yellow-700 text-yellow-900 dark:text-yellow-100",
  orange: "bg-orange-50 dark:bg-orange-950 border-orange-300 dark:border-orange-700 text-orange-900 dark:text-orange-100",
  pink: "bg-pink-50 dark:bg-pink-950 border-pink-300 dark:border-pink-700 text-pink-900 dark:text-pink-100",
  purple: "bg-purple-50 dark:bg-purple-950 border-purple-300 dark:border-purple-700 text-purple-900 dark:text-purple-100",
};

export default function PerimenopauseCalculator() {
  const [currentAge, setCurrentAge] = useState("45");
  const [menstrualStatus, setMenstrualStatus] = useState<MenstrualStatus>("irregular");
  const [ageIrregularStarted, setAgeIrregularStarted] = useState("43");
  const [motherMenopauseAge, setMotherMenopauseAge] = useState("");
  const [symptoms, setSymptoms] = useState<string[]>([]);

  const toggleSymptom = (id: string) =>
    setSymptoms(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]);

  const result = useMemo(() => {
    const age = parseFloat(currentAge) || 0;
    const irregularAge = parseFloat(ageIrregularStarted) || age - 2;
    const motherAge = motherMenopauseAge ? parseFloat(motherMenopauseAge) : null;
    const symptomCount = symptoms.length;

    let estimatedMenopauseAge = motherAge ?? 51;
    if (symptomCount >= 5) estimatedMenopauseAge -= 0.5;
    if (menstrualStatus === "very_irregular") estimatedMenopauseAge -= 0.5;
    estimatedMenopauseAge = Math.max(45, Math.min(58, estimatedMenopauseAge));

    let stage: string;
    let stageColor: string;
    let description: string;
    let yearsToMenopause: number | null;

    if (menstrualStatus === "stopped_1plus") {
      stage = "Post-Menopause";
      stageColor = "purple";
      description = "You have reached menopause (12+ months without a period). Your body has completed this hormonal transition.";
      yearsToMenopause = null;
    } else if (menstrualStatus === "stopped_less1") {
      stage = "Menopause";
      stageColor = "pink";
      description = "You are in the final stage of the menopause transition. After 12 consecutive months without a period, you will be post-menopausal.";
      yearsToMenopause = 0;
    } else if (menstrualStatus === "very_irregular") {
      stage = "Late Perimenopause";
      stageColor = "orange";
      description = "You are in late perimenopause with very irregular or skipped periods. Menopause is likely within 1–3 years.";
      yearsToMenopause = Math.max(0.5, estimatedMenopauseAge - age);
    } else if (menstrualStatus === "irregular" && age >= 40) {
      stage = "Early-to-Mid Perimenopause";
      stageColor = "yellow";
      description = "You are in perimenopause. Irregular cycles and symptoms like hot flashes are common in this phase, which can last 4–8 years.";
      yearsToMenopause = Math.max(1, estimatedMenopauseAge - age);
    } else if (age >= 35 && (menstrualStatus === "irregular" || symptomCount >= 3)) {
      stage = "Early Perimenopause";
      stageColor = "blue";
      description = "You may be in early perimenopause. Hormonal fluctuations can begin years before cycles visibly change.";
      yearsToMenopause = estimatedMenopauseAge - age;
    } else {
      stage = "Pre-Perimenopause";
      stageColor = "green";
      description = "You are likely before perimenopause. If you are experiencing notable symptoms, discuss them with your healthcare provider.";
      yearsToMenopause = estimatedMenopauseAge - age;
    }

    const yearsInTransition = (menstrualStatus !== "regular" && menstrualStatus !== "stopped_1plus") ? Math.max(0, age - irregularAge) : null;
    const symptomSeverity = symptomCount === 0 ? "None reported" : symptomCount <= 2 ? "Mild" : symptomCount <= 5 ? "Moderate" : "Significant";

    return { stage, stageColor, description, yearsToMenopause, estimatedMenopauseAge: Math.round(estimatedMenopauseAge), yearsInTransition, symptomCount, symptomSeverity };
  }, [currentAge, menstrualStatus, ageIrregularStarted, motherMenopauseAge, symptoms]);

  return (
    <div className="space-y-4">
      <div className="card p-6 space-y-5">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Your Current Age</label>
            <input type="number" value={currentAge} onChange={e => setCurrentAge(e.target.value)} className="input-field" min="30" max="65" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Mother&apos;s Age at Menopause <span className="text-xs font-normal text-gray-400">(optional)</span></label>
            <input type="number" value={motherMenopauseAge} onChange={e => setMotherMenopauseAge(e.target.value)} className="input-field" placeholder="e.g. 51" min="40" max="62" />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Current Menstrual Status</label>
          <div className="space-y-2">
            {([
              ["regular", "Regular periods (cycle varies less than 7 days)"],
              ["irregular", "Irregular — cycle varies 7+ days from your normal"],
              ["very_irregular", "Very irregular — skipping periods (60+ day gaps)"],
              ["stopped_less1", "Periods stopped — less than 12 months ago"],
              ["stopped_1plus", "Periods stopped — 12 or more months ago"],
            ] as const).map(([v, l]) => (
              <label key={v} className="flex items-center gap-3 cursor-pointer">
                <input type="radio" name="menstrual" value={v} checked={menstrualStatus === v} onChange={() => setMenstrualStatus(v)} className="accent-pink-600" />
                <span className="text-sm text-gray-700 dark:text-gray-300">{l}</span>
              </label>
            ))}
          </div>
        </div>

        {(menstrualStatus === "irregular" || menstrualStatus === "very_irregular") && (
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Age when cycles became irregular</label>
            <input type="number" value={ageIrregularStarted} onChange={e => setAgeIrregularStarted(e.target.value)} className="input-field w-32" min="30" max="60" />
          </div>
        )}

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Symptoms you are experiencing <span className="text-xs font-normal text-gray-500">— select all that apply</span>
          </label>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {SYMPTOMS.map(s => (
              <label key={s.id} className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={symptoms.includes(s.id)} onChange={() => toggleSymptom(s.id)} className="accent-pink-600 h-4 w-4 rounded" />
                <span className="text-sm text-gray-700 dark:text-gray-300">{s.label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="card p-6 space-y-4">
        <h3 className="font-semibold text-gray-900 dark:text-gray-100">Your Perimenopause Assessment</h3>

        <div className={cn("rounded-xl border p-5", STAGE_COLORS[result.stageColor])}>
          <div className="text-xs font-medium opacity-70 mb-1">Estimated Stage</div>
          <div className="text-2xl font-bold mb-2">{result.stage}</div>
          <p className="text-sm opacity-80 leading-relaxed">{result.description}</p>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          {[
            {
              label: "Est. Menopause Age",
              value: result.yearsToMenopause !== null ? `~${result.estimatedMenopauseAge} yrs` : "Reached",
              sub: "Based on your profile",
              color: "bg-pink-50 dark:bg-pink-950 border-pink-200 dark:border-pink-800 text-pink-900 dark:text-pink-100",
            },
            {
              label: "Years to Menopause",
              value: result.yearsToMenopause == null ? "—" : result.yearsToMenopause <= 0 ? "<1 year" : `~${result.yearsToMenopause.toFixed(1)} yrs`,
              sub: result.yearsInTransition != null ? `${result.yearsInTransition.toFixed(1)} yrs in transition` : "Approximate",
              color: "bg-purple-50 dark:bg-purple-950 border-purple-200 dark:border-purple-800 text-purple-900 dark:text-purple-100",
            },
            {
              label: "Symptom Burden",
              value: result.symptomSeverity,
              sub: `${result.symptomCount} of ${SYMPTOMS.length} symptoms`,
              color: "bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100",
            },
          ].map(r => (
            <div key={r.label} className={cn("rounded-xl border p-4", r.color)}>
              <div className="text-xs font-medium opacity-70 mb-1">{r.label}</div>
              <div className="text-xl font-bold">{r.value}</div>
              <div className="text-xs opacity-60 mt-0.5">{r.sub}</div>
            </div>
          ))}
        </div>

        <div className="rounded-lg border border-amber-200 bg-amber-50 dark:bg-amber-950 dark:border-amber-800 p-4 text-sm text-amber-800 dark:text-amber-200">
          <strong>Medical disclaimer:</strong> This tool provides a general estimate only and is not a medical diagnosis. Perimenopause assessment requires blood tests (FSH, estradiol) and clinical evaluation by a qualified healthcare provider.
        </div>
      </div>
    </div>
  );
}
