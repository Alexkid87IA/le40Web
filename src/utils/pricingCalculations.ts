import { Studio, Duration, Formula, Option } from '../data/studiosLaunch/config';

export interface ConfigurationState {
  studio: Studio | null;
  duration: Duration | null;
  formula: Formula | null;
  selectedOptions: Map<string, number>;
}

export interface PriceBreakdown {
  studioBase: number;
  studioWithDuration: number;
  formulaPrice: number;
  optionsTotal: number;
  subtotal: number;
  discountAmount: number;
  total: number;
  hourlyRate: number;
  normalHourlyRate: number;
  savings: number;
}

export function calculatePrice(config: ConfigurationState): PriceBreakdown {
  if (!config.studio || !config.duration) {
    return {
      studioBase: 0,
      studioWithDuration: 0,
      formulaPrice: 0,
      optionsTotal: 0,
      subtotal: 0,
      discountAmount: 0,
      total: 0,
      hourlyRate: 0,
      normalHourlyRate: 0,
      savings: 0
    };
  }

  const studioBase = config.studio.priceDiscounted * config.duration.hours;

  const studioWithDuration = config.studio.priceDiscounted * config.duration.hours * config.duration.multiplier / config.duration.hours;

  let formulaPrice = 0;
  if (config.formula && !config.formula.included) {
    const ratio = config.duration.hours / 4;
    formulaPrice = config.formula.priceFor4h * ratio;
  }

  let optionsTotal = 0;
  config.selectedOptions.forEach((quantity, optionId) => {
    const option = getOptionById(optionId);
    if (option) {
      if (option.unit === '/h') {
        optionsTotal += option.price * config.duration.hours * quantity;
      } else {
        optionsTotal += option.price * quantity;
      }
    }
  });

  const subtotal = studioWithDuration + formulaPrice + optionsTotal;

  const discountAmount = 0;

  const total = subtotal - discountAmount;

  const hourlyRate = total / config.duration.hours;
  const normalHourlyRate = config.studio.priceNormal;

  const normalTotal = (config.studio.priceNormal * config.duration.hours * config.duration.multiplier / config.duration.hours) + formulaPrice + optionsTotal;
  const savings = normalTotal - total;

  return {
    studioBase,
    studioWithDuration,
    formulaPrice,
    optionsTotal,
    subtotal,
    discountAmount,
    total,
    hourlyRate,
    normalHourlyRate,
    savings
  };
}

function getOptionById(id: string): Option | undefined {
  const { options } = require('../data/studiosLaunch/config');
  return options.find((opt: Option) => opt.id === id);
}

export function formatPrice(price: number): string {
  return `${Math.round(price)}€`;
}

export function calculateDurationPrice(studio: Studio, duration: Duration): {
  price: number;
  pricePerHour: number;
  savings: number;
  normalPrice: number;
} {
  const price = studio.priceDiscounted * duration.hours * duration.multiplier / duration.hours;
  const pricePerHour = price / duration.hours;
  const normalPrice = studio.priceDiscounted * duration.hours;
  const savings = normalPrice - price;

  return {
    price,
    pricePerHour,
    savings,
    normalPrice
  };
}

export function getRecommendedStudios(profileId: string, allStudios: Studio[]): Studio[] {
  return allStudios.filter(studio =>
    studio.profilesRecommended.includes(profileId)
  );
}
