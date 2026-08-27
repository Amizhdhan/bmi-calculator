import React, { useState, useEffect } from 'react';
import { BmiResult, HeightUnit, ValidationErrors, WeightUnit } from '../types';
import { calculateBmi, validateInputs } from '../utils/bmiCalculator';
import { BmiResultDisplay } from './BmiResultDisplay';
import { Calculator, RotateCcw, AlertCircle, Sparkles, Ruler, Weight } from 'lucide-react';

export const BmiCalculatorCard: React.FC = () => {
  // Input states
  const [heightUnit, setHeightUnit] = useState<HeightUnit>('cm');
  const [heightCm, setHeightCm] = useState<string>('175');
  const [heightFt, setHeightFt] = useState<string>('5');
  const [heightIn, setHeightIn] = useState<string>('9');

  const [weightUnit, setWeightUnit] = useState<WeightUnit>('kg');
  const [weightValue, setWeightValue] = useState<string>('70');

  // UI / State
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [result, setResult] = useState<BmiResult | null>(null);
  const [hasCalculated, setHasCalculated] = useState<boolean>(false);

  // Initialize with calculation on first load
  useEffect(() => {
    handleCalculate();
  }, []);

  // Handle Height Unit Change with smart conversion
  const handleHeightUnitChange = (newUnit: HeightUnit) => {
    if (newUnit === heightUnit) return;

    if (newUnit === 'ft') {
      // Convert cm to ft & in
      const cm = parseFloat(heightCm);
      if (!isNaN(cm) && cm > 0) {
        const totalInches = cm / 2.54;
        const ft = Math.floor(totalInches / 12);
        const inch = Math.round(totalInches % 12);
        setHeightFt(ft.toString());
        setHeightIn(inch.toString());
      }
    } else {
      // Convert ft & in to cm
      const ft = parseFloat(heightFt) || 0;
      const inch = parseFloat(heightIn) || 0;
      const totalInches = (ft * 12) + inch;
      if (totalInches > 0) {
        const cm = Math.round(totalInches * 2.54);
        setHeightCm(cm.toString());
      }
    }
    setHeightUnit(newUnit);
    setErrors(prev => ({ ...prev, height: undefined, heightFeet: undefined, heightInches: undefined }));
  };

  // Handle Weight Unit Change with smart conversion
  const handleWeightUnitChange = (newUnit: WeightUnit) => {
    if (newUnit === weightUnit) return;

    const currentWeight = parseFloat(weightValue);
    if (!isNaN(currentWeight) && currentWeight > 0) {
      if (newUnit === 'lb') {
        const lb = Math.round(currentWeight * 2.20462 * 10) / 10;
        setWeightValue(lb.toString());
      } else {
        const kg = Math.round((currentWeight / 2.20462) * 10) / 10;
        setWeightValue(kg.toString());
      }
    }
    setWeightUnit(newUnit);
    setErrors(prev => ({ ...prev, weight: undefined }));
  };

  // Calculation action
  const handleCalculate = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    const { isValid, errors: validationErrors } = validateInputs(
      heightUnit,
      heightCm,
      heightFt,
      heightIn,
      weightUnit,
      weightValue
    );

    if (!isValid) {
      setErrors(validationErrors);
      setResult(null);
      return;
    }

    setErrors({});
    const res = calculateBmi(
      heightUnit,
      heightCm,
      heightFt,
      heightIn,
      weightUnit,
      weightValue
    );

    setResult(res);
    setHasCalculated(true);
  };

  // Reset form
  const handleReset = () => {
    setHeightUnit('cm');
    setHeightCm('');
    setHeightFt('');
    setHeightIn('');
    setWeightUnit('kg');
    setWeightValue('');
    setErrors({});
    setResult(null);
    setHasCalculated(false);
  };

  // Preset helper
  const handlePreset = (presetType: 'metric' | 'imperial') => {
    if (presetType === 'metric') {
      setHeightUnit('cm');
      setHeightCm('172');
      setWeightUnit('kg');
      setWeightValue('68');
    } else {
      setHeightUnit('ft');
      setHeightFt('5');
      setHeightIn('8');
      setWeightUnit('lb');
      setWeightValue('155');
    }
    setErrors({});
  };

  return (
    <section id="bmi-calculator-section" className="w-full max-w-2xl mx-auto">
      <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-slate-950/50 border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 md:p-10 transition-all duration-300">
        
        {/* Card Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 mb-3.5 shadow-2xs">
            <Calculator className="w-6 h-6" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Calculate Your Body Mass Index
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2 max-w-md mx-auto">
            Enter your height and weight in metric or imperial units to instantly evaluate your health baseline.
          </p>
        </div>

        {/* Calculator Form */}
        <form onSubmit={handleCalculate} noValidate className="space-y-6">
          
          {/* Height Input Block */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor={heightUnit === 'cm' ? 'height-cm-input' : 'height-ft-input'} className="text-sm font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                <Ruler className="w-4 h-4 text-indigo-500" />
                Height
              </label>

              {/* Unit Toggle: cm / ft */}
              <div 
                id="height-unit-selector" 
                role="group" 
                aria-label="Height unit selector"
                className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200/60 dark:border-slate-700/60"
              >
                <button
                  type="button"
                  id="btn-height-cm"
                  onClick={() => handleHeightUnitChange('cm')}
                  className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all duration-200 cursor-pointer ${
                    heightUnit === 'cm'
                      ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-2xs font-bold'
                      : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                  }`}
                >
                  Centimeters (cm)
                </button>
                <button
                  type="button"
                  id="btn-height-ft"
                  onClick={() => handleHeightUnitChange('ft')}
                  className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all duration-200 cursor-pointer ${
                    heightUnit === 'ft'
                      ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-2xs font-bold'
                      : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                  }`}
                >
                  Feet & Inches (ft)
                </button>
              </div>
            </div>

            {heightUnit === 'cm' ? (
              <div className="relative">
                <input
                  id="height-cm-input"
                  type="number"
                  step="any"
                  value={heightCm}
                  onChange={(e) => {
                    setHeightCm(e.target.value);
                    if (errors.height) setErrors(prev => ({ ...prev, height: undefined }));
                  }}
                  onKeyDown={(e) => e.key === 'Enter' && handleCalculate()}
                  placeholder="e.g. 175"
                  aria-label="Height in centimeters"
                  aria-invalid={!!errors.height}
                  className={`w-full px-4 py-3.5 pr-14 text-base font-medium rounded-xl border bg-slate-50/50 dark:bg-slate-800/50 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all ${
                    errors.height ? 'border-rose-400 dark:border-rose-600 bg-rose-50/30' : 'border-slate-300 dark:border-slate-700'
                  }`}
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-slate-400 dark:text-slate-500 pointer-events-none">
                  cm
                </span>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <div className="relative">
                  <input
                    id="height-ft-input"
                    type="number"
                    step="1"
                    min="0"
                    max="9"
                    value={heightFt}
                    onChange={(e) => {
                      setHeightFt(e.target.value);
                      if (errors.height || errors.heightFeet) setErrors(prev => ({ ...prev, height: undefined, heightFeet: undefined }));
                    }}
                    onKeyDown={(e) => e.key === 'Enter' && handleCalculate()}
                    placeholder="Feet (e.g. 5)"
                    aria-label="Height in feet"
                    aria-invalid={!!(errors.height || errors.heightFeet)}
                    className={`w-full px-4 py-3.5 pr-12 text-base font-medium rounded-xl border bg-slate-50/50 dark:bg-slate-800/50 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all ${
                      errors.height || errors.heightFeet ? 'border-rose-400 dark:border-rose-600 bg-rose-50/30' : 'border-slate-300 dark:border-slate-700'
                    }`}
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-slate-400 dark:text-slate-500 pointer-events-none">
                    ft
                  </span>
                </div>
                <div className="relative">
                  <input
                    id="height-in-input"
                    type="number"
                    step="any"
                    min="0"
                    max="11.9"
                    value={heightIn}
                    onChange={(e) => {
                      setHeightIn(e.target.value);
                      if (errors.height || errors.heightInches) setErrors(prev => ({ ...prev, height: undefined, heightInches: undefined }));
                    }}
                    onKeyDown={(e) => e.key === 'Enter' && handleCalculate()}
                    placeholder="Inches (e.g. 9)"
                    aria-label="Height in inches"
                    aria-invalid={!!(errors.height || errors.heightInches)}
                    className={`w-full px-4 py-3.5 pr-12 text-base font-medium rounded-xl border bg-slate-50/50 dark:bg-slate-800/50 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all ${
                      errors.height || errors.heightInches ? 'border-rose-400 dark:border-rose-600 bg-rose-50/30' : 'border-slate-300 dark:border-slate-700'
                    }`}
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-slate-400 dark:text-slate-500 pointer-events-none">
                    in
                  </span>
                </div>
              </div>
            )}

            {/* Error Message for Height */}
            {(errors.height || errors.heightFeet || errors.heightInches) && (
              <p id="height-error" role="alert" className="text-xs text-rose-600 dark:text-rose-400 font-medium flex items-center gap-1.5 pt-1">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                {errors.height || errors.heightFeet || errors.heightInches}
              </p>
            )}
          </div>

          {/* Weight Input Block */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="weight-input" className="text-sm font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                <Weight className="w-4 h-4 text-indigo-500" />
                Weight
              </label>

              {/* Unit Toggle: kg / lb */}
              <div 
                id="weight-unit-selector" 
                role="group" 
                aria-label="Weight unit selector"
                className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200/60 dark:border-slate-700/60"
              >
                <button
                  type="button"
                  id="btn-weight-kg"
                  onClick={() => handleWeightUnitChange('kg')}
                  className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all duration-200 cursor-pointer ${
                    weightUnit === 'kg'
                      ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-2xs font-bold'
                      : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                  }`}
                >
                  Kilograms (kg)
                </button>
                <button
                  type="button"
                  id="btn-weight-lb"
                  onClick={() => handleWeightUnitChange('lb')}
                  className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all duration-200 cursor-pointer ${
                    weightUnit === 'lb'
                      ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-2xs font-bold'
                      : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                  }`}
                >
                  Pounds (lb)
                </button>
              </div>
            </div>

            <div className="relative">
              <input
                id="weight-input"
                type="number"
                step="any"
                value={weightValue}
                onChange={(e) => {
                  setWeightValue(e.target.value);
                  if (errors.weight) setErrors(prev => ({ ...prev, weight: undefined }));
                }}
                onKeyDown={(e) => e.key === 'Enter' && handleCalculate()}
                placeholder={weightUnit === 'kg' ? 'e.g. 70' : 'e.g. 154'}
                aria-label={`Weight in ${weightUnit}`}
                aria-invalid={!!errors.weight}
                className={`w-full px-4 py-3.5 pr-14 text-base font-medium rounded-xl border bg-slate-50/50 dark:bg-slate-800/50 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all ${
                  errors.weight ? 'border-rose-400 dark:border-rose-600 bg-rose-50/30' : 'border-slate-300 dark:border-slate-700'
                }`}
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-slate-400 dark:text-slate-500 pointer-events-none">
                {weightUnit}
              </span>
            </div>

            {/* Error Message for Weight */}
            {errors.weight && (
              <p id="weight-error" role="alert" className="text-xs text-rose-600 dark:text-rose-400 font-medium flex items-center gap-1.5 pt-1">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                {errors.weight}
              </p>
            )}
          </div>

          {/* Quick Presets / Examples */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-xs text-slate-500 dark:text-slate-400">
            <span className="font-medium flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
              Quick Fill:
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                id="btn-sample-metric"
                onClick={() => handlePreset('metric')}
                className="text-xs px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium transition cursor-pointer"
              >
                172 cm / 68 kg
              </button>
              <button
                type="button"
                id="btn-sample-imperial"
                onClick={() => handlePreset('imperial')}
                className="text-xs px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium transition cursor-pointer"
              >
                5 ft 8 in / 155 lb
              </button>
            </div>
          </div>

          {/* Action Buttons: Calculate BMI & Reset */}
          <div className="pt-2 grid grid-cols-1 sm:grid-cols-4 gap-3">
            <button
              type="submit"
              id="btn-calculate-bmi"
              className="sm:col-span-3 w-full py-3.5 px-6 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-bold text-base rounded-xl shadow-md shadow-indigo-500/20 hover:shadow-lg hover:shadow-indigo-500/30 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Calculator className="w-5 h-5" />
              Calculate BMI
            </button>

            <button
              type="button"
              id="btn-reset-bmi"
              onClick={handleReset}
              className="w-full py-3.5 px-4 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 active:bg-slate-300 text-slate-700 dark:text-slate-200 font-semibold text-sm rounded-xl border border-slate-200 dark:border-slate-700 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
              title="Reset all fields and calculations"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </button>
          </div>
        </form>

        {/* Results Area */}
        {result && (
          <BmiResultDisplay
            result={result}
            heightUnit={heightUnit}
            weightUnit={weightUnit}
          />
        )}
      </div>
    </section>
  );
};
