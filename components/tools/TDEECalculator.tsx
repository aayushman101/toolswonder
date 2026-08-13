"use client";

import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";

type Gender = "male" | "female";
type ActivityLevel = "sedentary" | "light" | "moderate" | "active" | "veryactive";

const ACTIVITY_MULTIPLIERS: Record<ActivityLevel, { label: string; value: number; desc: string }> = {
  sedentary: { label: "Sedentary (Little to no exercise)", value: 1.2, desc: "Office job, minimal movement" },
  light: { label: "Lightly Active (1-3 days/week)", value: 1.375, desc: "Light exercise or sports" },
  moderate: { label: "Moderately Active (3-5 days/week)", value: 1.55, desc: "Moderate exercise/sports" },
  active: { label: "Very Active (6-7 days/week)", value: 1.725, desc: "Intense exercise most days" },
  veryactive: { label: "Extremely Active (Physical job or training)", value: 1.9, desc: "Very intense daily exercise" },
};

const GOALS = [
  { id: "maintain", label: "Maintain Weight", deficit: 0 },
  { id: "lose", label: "Lose Weight (0.5 lb/week)", deficit: 250 },
  { id: "lose2", label: "Lose Weight (1 lb/week)", deficit: 500 },
  { id: "gain", label: "Gain Weight (0.5 lb/week)", deficit: -250 },
  { id: "gain2", label: "Gain Weight (1 lb/week)", deficit: -500 },
];

export default function TDEECalculator() {
  const [gender, setGender] = useState<Gender>("male");
  const [age, setAge] = useState("25");
  const [height, setHeight] = useState("70");
  const [heightUnit, setHeightUnit] = useState<"in" | "cm">("in");
  const [weight, setWeight] = useState("180");
  const [weightUnit, setWeightUnit] = useState<"lb" | "kg">("lb");
  const [activity, setActivity] = useState<ActivityLevel>("moderate");
  const [goal, setGoal] = useState("maintain");

  const result = useMemo(() => {
    const ageNum = parseInt(age) || 0;
    const heightIn = heightUnit === "in" ? parseFloat(height) || 0 : (parseFloat(height) || 0) / 2.54;
    const weightLb = weightUnit === "lb" ? parseFloat(weight) || 0 : (parseFloat(weight) || 0) * 2.20462;

    // Mifflin-St Jeor equation for BMR
    let bmr = 0;
    if (gender === "male") {
      bmr = 10 * (weightLb / 2.20462) + 6.25 * (heightIn * 2.54) - 5 * ageNum + 5;
    } else {
      bmr = 10 * (weightLb / 2.20462) + 6.25 * (heightIn * 2.54) - 5 * ageNum - 161;
    }

    const tdee = bmr * ACTIVITY_MULTIPLIERS[activity].value;
    const goalDeficit = GOALS.find((g) => g.id === goal)?.deficit || 0;
    const targetCalories = tdee - goalDeficit;

    // Macro breakdown (40/30/30 for balanced)
    const protein = targetCalories * 0.3 / 4; // 4 cal/g
    const carbs = targetCalories * 0.4 / 4; // 4 cal/g
    const fats = targetCalories * 0.3 / 9; // 9 cal/g

    // Alternative macros (high protein)
    const proteinHigh = targetCalories * 0.4 / 4;
    const carbsHigh = targetCalories * 0.35 / 4;
    const fatsHigh = targetCalories * 0.25 / 9;

    return {
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      targetCalories: Math.round(targetCalories),
      deficitDaily: goalDeficit,
      weightLb,
      protein: Math.round(protein),
      carbs: Math.round(carbs),
      fats: Math.round(fats),
      proteinHigh: Math.round(proteinHigh),
      carbsHigh: Math.round(carbsHigh),
      fatsHigh: Math.round(fatsHigh),
    };
  }, [gender, age, height, heightUnit, weight, weightUnit, activity, goal]);

  return (
    <div className="space-y-4">
      {/* Personal Info */}
      <div className="card p-5 space-y-4">
        <h3 className="font-semibold text-gray-900 dark:text-gray-100">Personal Information</h3>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Gender</label>
            <select value={gender} onChange={(e) => setGender(e.target.value as Gender)} className="input-field">
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Age</label>
            <input type="number" value={age} onChange={(e) => setAge(e.target.value)} className="input-field" min="10" max="120" />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div className="col-span-2">
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Height</label>
            <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} className="input-field" step="0.1" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Unit</label>
            <select value={heightUnit} onChange={(e) => setHeightUnit(e.target.value as "in" | "cm")} className="input-field">
              <option value="in">Inches</option>
              <option value="cm">Centimeters</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div className="col-span-2">
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Weight</label>
            <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} className="input-field" step="0.1" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Unit</label>
            <select value={weightUnit} onChange={(e) => setWeightUnit(e.target.value as "lb" | "kg")} className="input-field">
              <option value="lb">Pounds</option>
              <option value="kg">Kilograms</option>
            </select>
          </div>
        </div>
      </div>

      {/* Activity & Goal */}
      <div className="card p-5 space-y-4">
        <h3 className="font-semibold text-gray-900 dark:text-gray-100">Activity & Goal</h3>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Activity Level</label>
          <select value={activity} onChange={(e) => setActivity(e.target.value as ActivityLevel)} className="input-field">
            {Object.entries(ACTIVITY_MULTIPLIERS).map(([key, val]) => (
              <option key={key} value={key}>{val.label}</option>
            ))}
          </select>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">{ACTIVITY_MULTIPLIERS[activity].desc}</p>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Goal</label>
          <select value={goal} onChange={(e) => setGoal(e.target.value)} className="input-field">
            {GOALS.map((g) => (
              <option key={g.id} value={g.id}>{g.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Results */}
      <div className="card p-6 space-y-4">
        <h3 className="font-semibold text-gray-900 dark:text-gray-100">Daily Calorie & Macro Targets</h3>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              label: "BMR",
              value: `${result.bmr}`,
              sub: "Calories at rest",
              color: "bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800 text-blue-900 dark:text-blue-100",
            },
            {
              label: "TDEE",
              value: `${result.tdee}`,
              sub: `@ ${ACTIVITY_MULTIPLIERS[activity].label.split(" ")[0]} activity`,
              color: "bg-purple-50 dark:bg-purple-950 border-purple-200 dark:border-purple-800 text-purple-900 dark:text-purple-100",
            },
            {
              label: "Daily Target",
              value: `${result.targetCalories}`,
              sub: `${result.deficitDaily > 0 ? "-" : result.deficitDaily < 0 ? "+" : ""}${Math.abs(result.deficitDaily)} deficit`,
              color: "bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800 text-green-900 dark:text-green-100",
            },
            {
              label: "Weight Change",
              value: goal.includes("lose") ? "-0.5–1 lb/wk" : goal.includes("gain") ? "+0.5–1 lb/wk" : "Maintain",
              sub: "Expected rate",
              color: "bg-amber-50 dark:bg-amber-950 border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-100",
            },
          ].map((r) => (
            <div key={r.label} className={cn("rounded-xl border p-4", r.color)}>
              <div className="text-xs font-medium opacity-70 mb-1">{r.label}</div>
              <div className="text-xl font-bold">{r.value}</div>
              <div className="text-xs opacity-60 mt-0.5">{r.sub}</div>
            </div>
          ))}
        </div>

        {/* Macro Breakdowns */}
        <div className="space-y-3 pt-4">
          <div>
            <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">Balanced Macros (40/30/30)</h4>
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: "Protein", value: result.protein, color: "bg-red-100 dark:bg-red-900/30 text-red-900 dark:text-red-200" },
                { label: "Carbs", value: result.carbs, color: "bg-blue-100 dark:bg-blue-900/30 text-blue-900 dark:text-blue-200" },
                { label: "Fats", value: result.fats, color: "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-900 dark:text-yellow-200" },
              ].map((m) => (
                <div key={m.label} className={cn("rounded-lg p-3 text-center", m.color)}>
                  <div className="text-xs font-medium">{m.label}</div>
                  <div className="text-lg font-bold">{m.value}g</div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">High Protein (40/35/25)</h4>
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: "Protein", value: result.proteinHigh, color: "bg-red-100 dark:bg-red-900/30 text-red-900 dark:text-red-200" },
                { label: "Carbs", value: result.carbsHigh, color: "bg-blue-100 dark:bg-blue-900/30 text-blue-900 dark:text-blue-200" },
                { label: "Fats", value: result.fatsHigh, color: "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-900 dark:text-yellow-200" },
              ].map((m) => (
                <div key={m.label} className={cn("rounded-lg p-3 text-center", m.color)}>
                  <div className="text-xs font-medium">{m.label}</div>
                  <div className="text-lg font-bold">{m.value}g</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-gray-50 dark:bg-gray-800 p-4 text-sm text-gray-600 dark:text-gray-400 space-y-1.5">
          <div className="flex justify-between">
            <span>Weekly calorie deficit:</span>
            <span className="font-medium">{Math.round(result.deficitDaily * 7).toLocaleString()} cal</span>
          </div>
          <div className="flex justify-between">
            <span>Weekly weight change:</span>
            <span className="font-medium">{(Math.round(result.deficitDaily * 7) / 3500).toFixed(2)} lb</span>
          </div>
          <div className="flex justify-between">
            <span>Formula:</span>
            <span className="font-medium">Mifflin-St Jeor</span>
          </div>
        </div>
      </div>
    </div>
  );
}
