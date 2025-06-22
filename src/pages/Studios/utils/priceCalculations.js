import { durations } from '../data/durations';
import { formulas } from '../data/formulas';
import { optionsCatalog } from '../data/optionsCatalog';

export const calculatePrice = ({ setup, duration, formula, options }) => {
  if (!setup) return 0;
  
  const durationData = durations.find(d => d.id === duration);
  const formulaData = formulas.find(f => f.id === formula);
  const basePrice = setup.basePrice;
  
  let total = basePrice * durationData.multiplier * formulaData.priceMultiplier;
  
  options.forEach(optionId => {
    const option = optionsCatalog[optionId];
    if (option) {
      if (option.unit === '/h') {
        total += option.price * durationData.hours;
      } else {
        total += option.price;
      }
    }
  });
  
  return Math.round(total);
};