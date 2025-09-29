// src/lib/utils.ts

import { relatedCosts, outNetworkData, inNetworkData, facilityCharges } from './data';

// Format currency function
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

// Calculate charge by percentile
export const calculateChargeByPercentile = (baseCharge: number, percentile: number): number => {
  const multipliers: Record<number, number> = {
    70: 0.85,
    80: 1.0,
    90: 1.15,
    95: 1.35
  };
  return Math.round(baseCharge * (multipliers[percentile] || 1.0));
};

// Calculate total costs
export const calculateTotalCosts = (
  selectedCosts: number[],
  currentOutPercentile: 50 | 60 | 70 | 80 | 90,
  currentInPercentile: 50 | 60 | 70 | 80 | 90,
  facilityType: 'ASC' | 'Hospital'
) => {
  // Get selected items
  const selectedItems = relatedCosts.filter(cost => selectedCosts.includes(cost.id));
  
  // Calculate additional costs from selected items
  const additionalOutOfNetwork = selectedItems.reduce((sum, item) => {
    const price = item.outOfNetworkPrices?.[currentOutPercentile] || item.outOfNetworkPrice || 0;
    return sum + price;
  }, 0);
  
  const additionalInNetwork = selectedItems.reduce((sum, item) => {
    const price = item.inNetworkPrices?.[currentInPercentile] || item.inNetworkPrice || 0;
    return sum + price;
  }, 0);
  
  // Add facility costs based on selection
  let facilityOutOfNetwork = 0;
  let facilityInNetwork = 0;
  
  if (selectedCosts.includes(3)) { // If facility fee is selected (id: 3)
    // Get the facility prices
    const facilityOut = facilityCharges[facilityType].outOfNetworkPrices?.[currentOutPercentile] || 
                        facilityCharges[facilityType].outOfNetworkPrice || 0;
    const facilityIn = facilityCharges[facilityType].inNetworkPrices?.[currentInPercentile] || 
                       facilityCharges[facilityType].inNetworkPrice || 0;
    
    // Subtract the base procedure price to avoid double counting
    facilityOutOfNetwork = facilityOut - (outNetworkData[currentOutPercentile] || 0);
    facilityInNetwork = facilityIn - (inNetworkData[currentInPercentile] || 0);
  }
  
  // Calculate totals
  return {
    outOfNetwork: (outNetworkData[currentOutPercentile] || 0) + additionalOutOfNetwork + facilityOutOfNetwork,
    inNetwork: (inNetworkData[currentInPercentile] || 0) + additionalInNetwork + facilityInNetwork
  };
};

// Get position for percentile slider
export const getPosition = (percentile: number): number => {
  const percentilePositions: Record<number, number> = {
    50: 0,
    60: 25,
    70: 50,
    80: 75,
    90: 100
  };
  return percentilePositions[percentile] ?? 50;
};

// utils.ts - add this function
export const getPriceByPercentile = (percentile, isInNetwork = false) => {
  const procedureData = {
    outOfNetwork: {
      50: 1819,
      60: 2090,
      70: 2361,
      80: 2826,
      90: 4290
    },
    inNetwork: {
      50: 560,
      60: 734,
      70: 907,
      80: 1605,
      90: 2302
    }
  };
  
  const prices = isInNetwork ? procedureData.inNetwork : procedureData.outOfNetwork;
  return prices[percentile] || prices[70]; // Default to 70th
};