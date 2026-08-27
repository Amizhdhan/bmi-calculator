export type HeightUnit = 'cm' | 'ft';
export type WeightUnit = 'kg' | 'lb';

export type BmiCategoryType = 'Underweight' | 'Normal Weight' | 'Overweight' | 'Obesity';

export interface BmiCategoryInfo {
  id: string;
  name: BmiCategoryType;
  shortName: string;
  rangeLabel: string;
  minBmi: number;
  maxBmi: number;
  colorClass: string;
  bgClass: string;
  borderClass: string;
  badgeBg: string;
  badgeText: string;
  description: string;
  healthRisk: string;
}

export interface BmiResult {
  bmi: number;
  formattedBmi: string;
  category: BmiCategoryType;
  categoryInfo: BmiCategoryInfo;
  healthyBmiRangeText: string;
  healthyWeightMin: number;
  healthyWeightMax: number;
  healthyWeightRangeText: string;
  scalePercentage: number;
  differenceFromNormal: number; // 0 if normal, negative if underweight, positive if overweight
  advice: string;
}

export interface ValidationErrors {
  height?: string;
  heightFeet?: string;
  heightInches?: string;
  weight?: string;
  general?: string;
}
