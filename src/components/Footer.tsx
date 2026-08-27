import React from 'react';
import { Scale, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-slate-200/80 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 mt-20 py-8 transition-colors">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
        
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-indigo-600 flex items-center justify-center text-white text-xs">
            <Scale className="w-3.5 h-3.5" />
          </div>
          <span className="font-semibold text-slate-700 dark:text-slate-300">
            BMI Calculator
          </span>
          <span>•</span>
          <span>Fast, Accurate Body Mass Index Engine</span>
        </div>

        <div className="flex items-center gap-1">
          <span>Designed with precision & accessibility</span>
        </div>

      </div>
    </footer>
  );
};
