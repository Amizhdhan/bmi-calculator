import { BmiCategoryInfo, BmiCategoryType, BmiResult, HeightUnit, ValidationErrors, WeightUnit } from '../types';

export const BMI_CATEGORIES: Record<BmiCategoryType, BmiCategoryInfo> = {
  'Underweight': {
    id: 'underweight',
    name: 'Underweight',
    shortName: 'Underweight',
    rangeLabel: '< 18.5',
    minBmi: 0,
    maxBmi: 18.49,
    colorClass: 'text-sky-600 dark:text-sky-400',
    bgClass: 'bg-sky-50 dark:bg-sky-950/30',
    borderClass: 'border-sky-300 dark:border-sky-800',
    badgeBg: 'bg-sky-100 text-sky-800 border-sky-200',
    badgeText: 'text-sky-700',
    description: 'Your BMI indicates you may be below the optimal weight range for your height. Consult a healthcare provider to ensure you are receiving adequate nutrition.',
    healthRisk: 'Risk of nutritional deficiencies, weakened immunity, and lower bone density.'
  },
  'Normal Weight': {
    id: 'normal',
    name: 'Normal Weight',
    shortName: 'Normal',
    rangeLabel: '18.5 – 24.9',
    minBmi: 18.5,
    maxBmi: 24.99,
    colorClass: 'text-emerald-600 dark:text-emerald-400',
    bgClass: 'bg-emerald-50 dark:bg-emerald-950/30',
    borderClass: 'border-emerald-300 dark:border-emerald-800',
    badgeBg: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    badgeText: 'text-emerald-700',
    description: 'Great job! Your BMI falls within the standard healthy weight category associated with lowest overall health risks.',
    healthRisk: 'Lowest statistical risk of weight-related health conditions.'
  },
  'Overweight': {
    id: 'overweight',
    name: 'Overweight',
    shortName: 'Overweight',
    rangeLabel: '25.0 – 29.9',
    minBmi: 25.0,
    maxBmi: 29.99,
    colorClass: 'text-amber-600 dark:text-amber-400',
    bgClass: 'bg-amber-50 dark:bg-amber-950/30',
    borderClass: 'border-amber-300 dark:border-amber-800',
    badgeBg: 'bg-amber-100 text-amber-800 border-amber-200',
    badgeText: 'text-amber-700',
    description: 'Your BMI indicates weight higher than recommended for your height. Adopting a balanced diet and regular physical activity can help manage health risks.',
    healthRisk: 'Moderate increased risk for hypertension, cardiovascular strain, and insulin resistance.'
  },
  'Obesity': {
    id: 'obesity',
    name: 'Obesity',
    shortName: 'Obesity',
    rangeLabel: '≥ 30.0',
    minBmi: 30.0,
    maxBmi: 100,
    colorClass: 'text-rose-600 dark:text-rose-400',
    bgClass: 'bg-rose-50 dark:bg-rose-950/30',
    borderClass: 'border-rose-300 dark:border-rose-800',
    badgeBg: 'bg-rose-100 text-rose-800 border-rose-200',
    badgeText: 'text-rose-700',
    description: 'Your BMI falls into the obesity category. We recommend discussing personalized lifestyle, nutritional, and medical strategies with a healthcare professional.',
    healthRisk: 'High increased risk for type 2 diabetes, heart disease, high blood pressure, and sleep apnea.'
  }
};

/**
 * Validates user inputs and returns friendly error messages
 */
export function validateInputs(
  heightUnit: HeightUnit,
  heightCm: string,
  heightFt: string,
  heightIn: string,
  weightUnit: WeightUnit,
  weightValue: string
): { isValid: boolean; errors: ValidationErrors } {
  const errors: ValidationErrors = {};

  // Validate Height
  if (heightUnit === 'cm') {
    if (!heightCm || heightCm.trim() === '') {
      errors.height = 'Please enter your height in centimeters.';
    } else {
      const parsedCm = parseFloat(heightCm);
      if (isNaN(parsedCm)) {
        errors.height = 'Height must be a valid number.';
      } else if (parsedCm <= 0) {
        errors.height = 'Height must be greater than 0.';
      } else if (parsedCm < 40) {
        errors.height = 'Height is unusually low (minimum 40 cm).';
      } else if (parsedCm > 280) {
        errors.height = 'Height cannot exceed 280 cm.';
      }
    }
  } else {
    // Imperial height (ft & in)
    const hasFt = heightFt && heightFt.trim() !== '';
    const hasIn = heightIn && heightIn.trim() !== '';

    if (!hasFt && !hasIn) {
      errors.height = 'Please enter your height in feet and inches.';
    } else {
      const parsedFt = hasFt ? parseFloat(heightFt) : 0;
      const parsedIn = hasIn ? parseFloat(heightIn) : 0;

      if (isNaN(parsedFt) || parsedFt < 0) {
        errors.heightFeet = 'Feet must be 0 or greater.';
      }
      if (isNaN(parsedIn) || parsedIn < 0) {
        errors.heightInches = 'Inches must be 0 or greater.';
      } else if (parsedIn >= 12 && hasFt) {
        errors.heightInches = 'Inches should typically be between 0 and 11.';
      }

      const totalInches = (parsedFt * 12) + parsedIn;
      if (totalInches <= 0) {
        errors.height = 'Total height must be greater than 0.';
      } else if (totalInches < 18) {
        errors.height = 'Height is unusually low (minimum 1 ft 6 in).';
      } else if (totalInches > 110) {
        errors.height = 'Height cannot exceed 9 ft 2 in.';
      }
    }
  }

  // Validate Weight
  if (!weightValue || weightValue.trim() === '') {
    errors.weight = `Please enter your weight in ${weightUnit}.`;
  } else {
    const parsedWeight = parseFloat(weightValue);
    if (isNaN(parsedWeight)) {
      errors.weight = 'Weight must be a valid number.';
    } else if (parsedWeight <= 0) {
      errors.weight = 'Weight must be greater than 0.';
    } else {
      if (weightUnit === 'kg') {
        if (parsedWeight < 10) {
          errors.weight = 'Weight is unusually low (minimum 10 kg).';
        } else if (parsedWeight > 500) {
          errors.weight = 'Weight cannot exceed 500 kg.';
        }
      } else {
        if (parsedWeight < 22) {
          errors.weight = 'Weight is unusually low (minimum 22 lb).';
        } else if (parsedWeight > 1100) {
          errors.weight = 'Weight cannot exceed 1100 lb.';
        }
      }
    }
  }

  const isValid = Object.keys(errors).length === 0;
  return { isValid, errors };
}

/**
 * Calculates BMI and generates comprehensive result details
 */
export function calculateBmi(
  heightUnit: HeightUnit,
  heightCm: string,
  heightFt: string,
  heightIn: string,
  weightUnit: WeightUnit,
  weightValue: string
): BmiResult | null {
  // Convert height to meters
  let heightInMeters = 0;
  let heightInInches = 0;

  if (heightUnit === 'cm') {
    const cm = parseFloat(heightCm);
    if (isNaN(cm) || cm <= 0) return null;
    heightInMeters = cm / 100;
    heightInInches = cm / 2.54;
  } else {
    const ft = parseFloat(heightFt) || 0;
    const inch = parseFloat(heightIn) || 0;
    const totalInches = (ft * 12) + inch;
    if (isNaN(totalInches) || totalInches <= 0) return null;
    heightInInches = totalInches;
    heightInMeters = totalInches * 0.0254;
  }

  // Convert weight to kg and lb
  let weightInKg = 0;
  let weightInLb = 0;
  const parsedWeight = parseFloat(weightValue);
  if (isNaN(parsedWeight) || parsedWeight <= 0) return null;

  if (weightUnit === 'kg') {
    weightInKg = parsedWeight;
    weightInLb = parsedWeight * 2.20462;
  } else {
    weightInLb = parsedWeight;
    weightInKg = parsedWeight / 2.20462;
  }

  // Calculate BMI
  const bmiRaw = weightInKg / (heightInMeters * heightInMeters);
  const bmi = Math.round(bmiRaw * 10) / 10;
  const formattedBmi = bmi.toFixed(1);

  // Categorize
  let category: BmiCategoryType;
  if (bmi < 18.5) {
    category = 'Underweight';
  } else if (bmi <= 24.9) {
    category = 'Normal Weight';
  } else if (bmi <= 29.9) {
    category = 'Overweight';
  } else {
    category = 'Obesity';
  }

  const categoryInfo = BMI_CATEGORIES[category];

  // Healthy weight range calculations for this height (BMI 18.5 to 24.9)
  const minHealthyKg = 18.5 * (heightInMeters * heightInMeters);
  const maxHealthyKg = 24.9 * (heightInMeters * heightInMeters);

  let healthyWeightMin = 0;
  let healthyWeightMax = 0;
  let healthyWeightRangeText = '';

  if (weightUnit === 'kg') {
    healthyWeightMin = Math.round(minHealthyKg * 10) / 10;
    healthyWeightMax = Math.round(maxHealthyKg * 10) / 10;
    healthyWeightRangeText = `${healthyWeightMin.toFixed(1)} – ${healthyWeightMax.toFixed(1)} kg`;
  } else {
    const minHealthyLb = minHealthyKg * 2.20462;
    const maxHealthyLb = maxHealthyKg * 2.20462;
    healthyWeightMin = Math.round(minHealthyLb * 10) / 10;
    healthyWeightMax = Math.round(maxHealthyLb * 10) / 10;
    healthyWeightRangeText = `${healthyWeightMin.toFixed(1)} – ${healthyWeightMax.toFixed(1)} lb`;
  }

  // Calculate position on visual 4-part scale (0% to 100%)
  // Range mapped: 14 to 38
  // Underweight: 0 - 25% (mapped from 14 to 18.5)
  // Normal: 25% - 50% (mapped from 18.5 to 25.0)
  // Overweight: 50% - 75% (mapped from 25.0 to 30.0)
  // Obesity: 75% - 100% (mapped from 30.0 to 38.0)
  let scalePercentage = 0;
  if (bmi < 18.5) {
    const ratio = Math.max(0, (bmi - 14) / (18.5 - 14));
    scalePercentage = Math.min(24.5, ratio * 25);
  } else if (bmi <= 24.9) {
    const ratio = (bmi - 18.5) / (25.0 - 18.5);
    scalePercentage = 25 + (ratio * 25);
  } else if (bmi <= 29.9) {
    const ratio = (bmi - 25.0) / (30.0 - 25.0);
    scalePercentage = 50 + (ratio * 25);
  } else {
    const ratio = Math.min(1, Math.max(0, (bmi - 30.0) / (38.0 - 30.0)));
    scalePercentage = 75 + (ratio * 25);
  }
  // Clamp between 2% and 98% for marker display
  scalePercentage = Math.max(3, Math.min(97, scalePercentage));

  // Difference from normal range
  let differenceFromNormal = 0;
  if (bmi < 18.5) {
    differenceFromNormal = bmi - 18.5; // negative
  } else if (bmi > 24.9) {
    differenceFromNormal = bmi - 24.9; // positive
  }

  // Actionable advice text
  let advice = '';
  if (category === 'Underweight') {
    const gainNeeded = weightUnit === 'kg' ? (minHealthyKg - weightInKg) : (minHealthyKg * 2.20462 - weightInLb);
    advice = `You are approximately ${Math.abs(gainNeeded).toFixed(1)} ${weightUnit} below the normal weight range for your height. Focus on nutrient-dense foods and strength-building.`;
  } else if (category === 'Normal Weight') {
    advice = `Your weight is in balance with your height. Maintain this with balanced nutrition, good sleep, and at least 150 minutes of moderate activity weekly.`;
  } else if (category === 'Overweight') {
    const lossNeeded = weightUnit === 'kg' ? (weightInKg - maxHealthyKg) : (weightInLb - maxHealthyKg * 2.20462);
    advice = `You are approximately ${lossNeeded.toFixed(1)} ${weightUnit} above the standard normal weight range. Moderate dietary adjustments and daily walks can help you reach a healthy baseline.`;
  } else {
    const lossNeeded = weightUnit === 'kg' ? (weightInKg - maxHealthyKg) : (weightInLb - maxHealthyKg * 2.20462);
    advice = `You are approximately ${lossNeeded.toFixed(1)} ${weightUnit} above the normal weight range. We suggest consulting a doctor or dietitian to create a safe, sustainable health plan.`;
  }

  return {
    bmi,
    formattedBmi,
    category,
    categoryInfo,
    healthyBmiRangeText: '18.5 – 24.9 kg/m²',
    healthyWeightMin,
    healthyWeightMax,
    healthyWeightRangeText,
    scalePercentage,
    differenceFromNormal,
    advice
  };
}
