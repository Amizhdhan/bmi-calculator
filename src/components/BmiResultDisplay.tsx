import React from 'react';
import { BmiResult, HeightUnit, WeightUnit } from '../types';
import { BmiVisualScale } from './BmiVisualScale';
import { Activity, CheckCircle2, AlertCircle, Info, HeartPulse, Sparkles } from 'lucide-react';

interface BmiResultDisplayProps {
  result: BmiResult;
  heightUnit: HeightUnit;
  weightUnit: WeightUnit;
}

export const BmiResultDisplay: React.FC<BmiResultDisplayProps> = ({
  result,
  weightUnit,
}) => {
  const {
    bmi,
    formattedBmi,
    category,
    categoryInfo,
    healthyBmiRangeText,
    healthyWeightRangeText,
    scalePercentage,
    advice
  } = result;

  const getCategoryIcon = () => {
    switch (category) {
      case 'Normal Weight':
        return <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />;
      case 'Underweight':
        return <Info className="w-5 h-5 text-sky-600 dark:text-sky-400" />;
      case 'Overweight':
        return <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400" />;
      case 'Obesity':
        return <AlertCircle className="w-5 h-5 text-rose-600 dark:text-rose-400" />;
    }
  };

  return (
    <div
      id="bmi-result-card"
      className={`mt-8 rounded-2xl border ${categoryInfo.borderClass} ${categoryInfo.bgClass} p-6 sm:p-7 transition-all duration-500 shadow-sm`}
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-200/80 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <HeartPulse className="w-4 h-4 text-indigo-500" />
              Your BMI Score
            </span>
          </div>
          <div className="flex items-baseline gap-3">
            <span id="bmi-value-display" className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {formattedBmi}
            </span>
            <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
              kg/m²
            </span>
          </div>
        </div>

        <div className="flex flex-col sm:items-end">
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Category:</span>
            <span
              id="bmi-category-badge"
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-bold border ${categoryInfo.badgeBg}`}
            >
              {getCategoryIcon()}
              {category}
            </span>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1.5 max-w-xs sm:text-right">
            Standard WHO range for {category.toLowerCase()} is {categoryInfo.rangeLabel} kg/m²
          </p>
        </div>
      </div>

      {/* Visual Scale */}
      <div className="my-5">
        <BmiVisualScale
          bmi={bmi}
          scalePercentage={scalePercentage}
          category={category}
        />
      </div>

      {/* Key Ranges Summary Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 my-5">
        <div id="healthy-bmi-range-card" className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-2xs">
          <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-xs font-semibold mb-1">
            <Activity className="w-4 h-4 text-emerald-500" />
            Healthy BMI Range
          </div>
          <div className="text-base font-bold text-slate-800 dark:text-slate-100">
            {healthyBmiRangeText}
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Standard normal baseline for adults
          </p>
        </div>

        <div id="healthy-weight-range-card" className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-2xs">
          <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-xs font-semibold mb-1">
            <Sparkles className="w-4 h-4 text-indigo-500" />
            Ideal Weight for Your Height
          </div>
          <div className="text-base font-bold text-slate-800 dark:text-slate-100">
            {healthyWeightRangeText}
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Calculated for a target BMI of 18.5 – 24.9 {weightUnit}
          </p>
        </div>
      </div>

      {/* Actionable Health Insight */}
      <div className="bg-white/90 dark:bg-slate-900/90 rounded-xl p-4 border border-slate-200/70 dark:border-slate-800 shadow-2xs">
        <h5 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
          <Info className="w-4 h-4 text-indigo-500" />
          Health Summary & Takeaway
        </h5>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          {categoryInfo.description}
        </p>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 font-medium">
          💡 {advice}
        </p>
      </div>
    </div>
  );
};
