/**
 * Spacing rendszer
 * Nagy érintési célpontok biztosítása (minimum 44x44dp)
 */

export const spacing = {
  // Alap spacing értékek
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  
  // Gyerekbarát nagy gombok
  buttonHeight: 60,        // Minimum 44dp, de nagyobb a könnyebb használatért
  buttonPadding: 20,
  buttonMargin: 12,
  
  // Kártya spacing
  cardPadding: 20,
  cardMargin: 16,
  cardBorderRadius: 16,
  
  // Képernyő padding
  screenPadding: 20,
  screenMargin: 16,
  
  // Játék elemek
  gameElementSpacing: 24,
  optionSpacing: 16,
  
  // Touch target minimum (44dp = ~60px)
  touchTargetMin: 60,
};
