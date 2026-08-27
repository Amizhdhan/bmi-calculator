import React from 'react';
import { BmiCategoryType } from '../types';

interface BmiVisualScaleProps {
  bmi: number;
  scalePercentage: number;
  category: BmiCategoryType;
}

export const BmiVisualScale: React.FC<BmiVisualScaleProps> = ({
  bmi,
  scalePercentage,
  category,
}) => {
  const segments = [
    {
      id: 'underweight',
      name: 'Underweight',
      range: '< 18.5',
      color: 'bg-sky-500',
      textColor: 'text-sky-700 dark:text-sky-400',
      activeBorder: 'border-sky-500 ring-2 ring-sky-300 dark:ring-sky-800',
      isActive: category === 'Underweight'
    },
    {
      id: 'normal',
      name: 'Normal',
      range: '18.5 – 24.9',
      color: 'bg-emerald-500',
      textColor: 'text-emerald-700 dark:text-emerald-400',
      activeBorder: 'border-emerald-500 ring-2 ring-emerald-300 dark:ring-emerald-800',
      isActive: category === 'Normal Weight'
    },
    {
      id: 'overweight',
      name: 'Overweight',
      range: '25.0 – 29.9',
      color: 'bg-amber-500',
      textColor: 'text-amber-700 dark:text-amber-400',
      activeBorder: 'border-amber-500 ring-2 ring-amber-300 dark:ring-amber-800',
      isActive: category === 'Overweight'
    },
    {
      id: 'obesity',
      name: 'Obesity',
      range: '≥ 30.0',
      color: 'bg-rose-500',
      textColor: 'text-rose-700 dark:text-rose-400',
      activeBorder: 'border-rose-500 ring-2 ring-rose-300 dark:ring-rose-800',
      isActive: category === 'Obesity'
    }
  ];

  return (
    <div id="bmi-visual-scale-container" className="w-full space-y-4 pt-3 pb-1">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-200">
          BMI Visual Indicator
        </h4>
        <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
          Scale: 14 to 38+ kg/m²
        </span>
      </div>

      {/* Scale Track & Needle Container */}
      <div className="relative pt-8 pb-3">
        {/* Animated Position Needle / Pin */}
        <div
          id="bmi-scale-marker"
          className="absolute top-0 transform -translate-x-1/2 transition-all duration-700 ease-out z-10 flex flex-col items-center"
          style={{ left: `${scalePercentage}%` }}
        >
          <div className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold px-2 py-0.5 rounded shadow-md whitespace-nowrap mb-1 flex items-center gap-1">
            <span>{bmi.toFixed(1)}</span>
          </div>
          <div className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[6px] border-t-slate-900 dark:border-t-white" />
          <div className="w-0.5 h-6 bg-slate-900 dark:bg-white rounded-full shadow" />
        </div>

        {/* 4-Zone Segmented Bar */}
        <div 
          id="bmi-bar-track" 
          className="h-4 w-full rounded-full flex overflow-hidden shadow-inner bg-slate-100 dark:bg-slate-800 p-0.5 gap-0.5"
          role="progressbar"
          aria-valuenow={bmi}
          aria-valuemin={14}
          aria-valuemax={38}
          aria-label="BMI Category Scale Position"
        >
          {segments.map((seg) => (
            <div
              key={seg.id}
              className={`h-full flex-1 transition-all duration-300 rounded-sm ${seg.color} ${
                seg.isActive ? 'opacity-100 ring-2 ring-white/80 dark:ring-slate-900 shadow-sm' : 'opacity-70'
              }`}
              title={`${seg.name}: ${seg.range}`}
            />
          ))}
        </div>
      </div>

      {/* Category Labels and Thresholds below track */}
      <div className="grid grid-cols-4 gap-1.5 pt-1 text-center">
        {segments.map((seg) => (
          <div
            key={`label-${seg.id}`}
            className={`p-2 rounded-lg transition-all duration-300 text-xs ${
              seg.isActive
                ? `bg-slate-100 dark:bg-slate-800 font-semibold shadow-xs ${seg.activeBorder}`
                : 'text-slate-600 dark:text-slate-400 bg-slate-50/60 dark:bg-slate-900/40 border border-slate-200/50 dark:border-slate-800'
            }`}
          >
            <div className={`font-semibold truncate ${seg.textColor}`}>
              {seg.name}
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 font-medium">
              {seg.range}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
