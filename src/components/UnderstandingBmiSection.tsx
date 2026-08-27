import React from 'react';
import { BookOpen, ShieldAlert, CheckCircle, HelpCircle, Layers, Users, Activity, Sparkles } from 'lucide-react';

export const UnderstandingBmiSection: React.FC = () => {
  return (
    <section id="understanding-bmi-section" className="w-full max-w-4xl mx-auto mt-14 space-y-10">
      
      {/* Section Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800">
          <BookOpen className="w-3.5 h-3.5" />
          Health Guide
        </div>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Understanding Your BMI
        </h3>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
          Learn how Body Mass Index is calculated, what your score signifies, and how to interpret it accurately.
        </p>
      </div>

      {/* Grid of Core Knowledge Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Card 1: What BMI Means */}
        <article id="what-bmi-means" className="bg-white dark:bg-slate-900 p-6 sm:p-7 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4">
              <HelpCircle className="w-5 h-5" />
            </div>
            <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
              What BMI Means
            </h4>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              <strong>Body Mass Index (BMI)</strong> is an international statistical estimate comparing an individual’s body weight to their height. Developed in the 19th century by mathematician Adolphe Quetelet, it serves as an accessible clinical baseline for categorizing weight status across populations.
            </p>
            <div className="mt-4 p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/70 dark:border-slate-700/60 text-xs text-slate-700 dark:text-slate-300 font-mono">
              <div><strong>Metric Formula:</strong> BMI = weight (kg) ÷ (height in meters)²</div>
              <div className="mt-1"><strong>Imperial Formula:</strong> BMI = 703 × weight (lb) ÷ (height in inches)²</div>
            </div>
          </div>
        </article>

        {/* Card 2: Healthy BMI Range */}
        <article id="healthy-bmi-range" className="bg-white dark:bg-slate-900 p-6 sm:p-7 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4">
              <CheckCircle className="w-5 h-5" />
            </div>
            <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
              The Healthy BMI Range (18.5 – 24.9)
            </h4>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Epidemiological studies indicate that adults maintaining a BMI between <strong>18.5 and 24.9 kg/m²</strong> experience lower rates of cardiovascular disease, type 2 diabetes, stroke, and hypertension.
            </p>
            <ul className="mt-3 space-y-1.5 text-xs text-slate-600 dark:text-slate-400 list-disc list-inside">
              <li>Supports optimal joint longevity and metabolic balance.</li>
              <li>Associated with balanced lipid profiles and insulin sensitivity.</li>
              <li>Serves as a reliable starting point for general fitness planning.</li>
            </ul>
          </div>
        </article>
      </div>

      {/* BMI Categories Table Card */}
      <article id="bmi-categories-breakdown" className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm overflow-hidden p-6 sm:p-7">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
            <Layers className="w-4 h-4" />
          </div>
          <h4 className="text-lg font-bold text-slate-900 dark:text-white">
            World Health Organization (WHO) BMI Categories
          </h4>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider bg-slate-50/50 dark:bg-slate-800/40">
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">BMI Range (kg/m²)</th>
                <th className="py-3 px-4">Health Implications</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              <tr className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors">
                <td className="py-3.5 px-4 font-semibold text-sky-600 dark:text-sky-400 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-sky-500" />
                  Underweight
                </td>
                <td className="py-3.5 px-4 font-medium text-slate-700 dark:text-slate-300">
                  Less than 18.5
                </td>
                <td className="py-3.5 px-4 text-xs text-slate-600 dark:text-slate-400">
                  Potential nutrient deficiencies, lower bone mineral density, and fatigue.
                </td>
              </tr>
              <tr className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors bg-emerald-50/20 dark:bg-emerald-950/10">
                <td className="py-3.5 px-4 font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  Normal Weight
                </td>
                <td className="py-3.5 px-4 font-medium text-slate-700 dark:text-slate-300">
                  18.5 – 24.9
                </td>
                <td className="py-3.5 px-4 text-xs text-slate-600 dark:text-slate-400">
                  Optimal statistical health range associated with lowest risk of chronic illness.
                </td>
              </tr>
              <tr className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors">
                <td className="py-3.5 px-4 font-semibold text-amber-600 dark:text-amber-400 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  Overweight
                </td>
                <td className="py-3.5 px-4 font-medium text-slate-700 dark:text-slate-300">
                  25.0 – 29.9
                </td>
                <td className="py-3.5 px-4 text-xs text-slate-600 dark:text-slate-400">
                  Elevated probability of high blood pressure, cholesterol imbalance, and joint strain.
                </td>
              </tr>
              <tr className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors">
                <td className="py-3.5 px-4 font-semibold text-rose-600 dark:text-rose-400 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                  Obesity
                </td>
                <td className="py-3.5 px-4 font-medium text-slate-700 dark:text-slate-300">
                  30.0 and above
                </td>
                <td className="py-3.5 px-4 text-xs text-slate-600 dark:text-slate-400">
                  Substantially higher risk of cardiovascular disorders, type 2 diabetes, and sleep apnea.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </article>

      {/* Limitations of BMI */}
      <article id="limitations-of-bmi" className="bg-white dark:bg-slate-900 p-6 sm:p-7 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 flex items-center justify-center">
            <Users className="w-4 h-4" />
          </div>
          <h4 className="text-lg font-bold text-slate-900 dark:text-white">
            Important Limitations of BMI
          </h4>
        </div>

        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          While BMI provides a fast, non-invasive overview, it cannot measure body composition directly. Key factors it does not differentiate include:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200/60 dark:border-slate-700/50">
            <h5 className="text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">
              💪 Muscle vs. Fat Mass
            </h5>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Muscle tissue is much denser than fat. Athletes and bodybuilders with high muscle mass can register as "overweight" or "obese" despite minimal body fat.
            </p>
          </div>

          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200/60 dark:border-slate-700/50">
            <h5 className="text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">
              📍 Fat Distribution
            </h5>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Visceral fat around internal abdominal organs poses greater cardiovascular risks than subcutaneous fat, which BMI numbers do not reflect.
            </p>
          </div>

          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200/60 dark:border-slate-700/50">
            <h5 className="text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">
              ⏳ Age & Sarcopenia
            </h5>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Older adults naturally lose skeletal muscle mass, potentially masking excess body fat inside a seemingly "normal" BMI score.
            </p>
          </div>

          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200/60 dark:border-slate-700/50">
            <h5 className="text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">
              🌏 Demographic & Ethnic Variance
            </h5>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Populations of Asian descent may face heightened metabolic and diabetes risks at lower BMI thresholds (e.g. starting at 23 kg/m²).
            </p>
          </div>
        </div>
      </article>

      {/* Official Required Disclaimer */}
      <div
        id="bmi-disclaimer"
        className="bg-amber-50/80 dark:bg-amber-950/30 border border-amber-300 dark:border-amber-800/80 rounded-2xl p-5 flex items-start gap-3.5 shadow-2xs"
      >
        <ShieldAlert className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <h5 className="text-xs font-bold text-amber-900 dark:text-amber-300 uppercase tracking-wide">
            Medical Disclaimer
          </h5>
          <p className="text-sm font-medium text-amber-800 dark:text-amber-200 leading-relaxed">
            "BMI is a general screening tool and does not directly measure body fat or overall health."
          </p>
          <p className="text-xs text-amber-700/90 dark:text-amber-400/90">
            Always consult a licensed physician, registered dietitian, or qualified healthcare professional for comprehensive diagnostics and personalized clinical guidance.
          </p>
        </div>
      </div>

    </section>
  );
};
