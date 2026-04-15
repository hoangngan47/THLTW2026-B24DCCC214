/**
 * Calculate utilities for Travel Planning
 */

/**
 * Calculate distance between two coordinates (Haversine formula)
 */
export const calculateDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
): number => {
  const R = 6371; // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return distance;
};

/**
 * Calculate transport time between destinations (simple estimate)
 */
export const calculateTransportTime = (distanceKm: number): number => {
  // Assume average speed of 50 km/h
  return Math.round((distanceKm / 50) * 60); // Convert to minutes
};

/**
 * Calculate total budget for a trip
 */
export const calculateTotalBudget = (
  foodBudget: number,
  accommodationBudget: number,
  transportBudget: number,
  activitiesBudget: number = 0,
  otherBudget: number = 0,
): number => {
  return (
    foodBudget + accommodationBudget + transportBudget + activitiesBudget + otherBudget
  );
};

/**
 * Calculate budget per day
 */
export const calculateDailyBudget = (totalBudget: number, numberOfDays: number): number => {
  if (numberOfDays === 0) return 0;
  return Math.round(totalBudget / numberOfDays);
};

/**
 * Format currency to Vietnamese format
 */
export const formatCurrency = (value: number): string => {
  return value.toLocaleString('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });
};

/**
 * Check if budget is exceeded
 */
export const isBudgetExceeded = (
  totalBudget: number,
  maxBudget: number,
): boolean => {
  return totalBudget > maxBudget;
};

/**
 * Calculate remaining budget
 */
export const calculateRemainingBudget = (
  totalBudget: number,
  usedBudget: number,
): number => {
  return totalBudget - usedBudget;
};

/**
 * Get budget percentage
 */
export const getBudgetPercentage = (usedBudget: number, totalBudget: number): number => {
  if (totalBudget === 0) return 0;
  return Math.round((usedBudget / totalBudget) * 100);
};
