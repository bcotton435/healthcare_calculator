// src/lib/data.ts

// Main procedure data
export const procedureData = {
  title: 'Biopsy of large bowel using a flexible endoscope',
  cptCode: '45380',
  outOfNetworkPrice: 2361,  // 70th percentile default
  inNetworkPrice: 907,       // 70th percentile default
  baseCharge: 1960
};

// Percentile values for the main procedure
export const procedurePercentileValues = {
  50: { oon: 1819, in: 560 },
  60: { oon: 2090, in: 734 },
  70: { oon: 2361, in: 907 },  // Default percentile
  80: { oon: 2826, in: 1605 },
  90: { oon: 4290, in: 2302 }
};

// Related costs data with their own percentile values
export const relatedCosts = [
  {
    id: 1,
    name: 'Anesthesia for procedures on lower intestinal tract',
    cptCode: '00810',
    outOfNetworkPrice: 456,
    inNetworkPrice: 234,
    oonName: 'Anesthesia for other procedure on large bowel using an endoscope',
    oonCptCode: '00811',
    baseCharge: 3408,
    percentileValues: {
      50: { oon: 352, in: 180 },
      60: { oon: 404, in: 207 },
      70: { oon: 456, in: 234 },
      80: { oon: 547, in: 281 },
      90: { oon: 830, in: 426 }
    }
  },
  {
    id: 2,
    name: 'Pathology examination, gross and microscopic',
    cptCode: '88305',
    outOfNetworkPrice: 312,
    inNetworkPrice: 156,
    oonName: 'Pathology examination of tissue using a microscope, intermediate complexity',
    baseCharge: 257,
    percentileValues: {
      50: { oon: 241, in: 120 },
      60: { oon: 277, in: 138 },
      70: { oon: 312, in: 156 },
      80: { oon: 374, in: 187 },
      90: { oon: 568, in: 284 }
    }
  },
  {
    id: 3,
    name: 'Facility fee for outpatient procedure',
    cptCode: 'C1728',
    outOfNetworkPrice: 1245,
    inNetworkPrice: 623,
    percentileValues: {
      50: { oon: 962, in: 481 },
      60: { oon: 1104, in: 552 },
      70: { oon: 1245, in: 623 },
      80: { oon: 1490, in: 745 },
      90: { oon: 2263, in: 1131 }
    }
  }
];

// Facility charges data
export const facilityCharges = {
  Hospital: {
    name: "Hospital (Outpatient)",
    multiplier: 1.52,
    outOfNetworkPrice: 6915,
    inNetworkPrice: 5612
  },
  ASC: {
    name: "Ambulatory Surgical Center (ASC)",
    multiplier: 1.0,
    outOfNetworkPrice: 7367,
    inNetworkPrice: 2101
  }
};

// Zip code comparison data
export const zipCodeData = {
  '10036': { 
    avgInNetwork: 1850, 
    avgOutOfNetwork: 3200,
    name: 'Manhattan - Midtown West'
  },
  '10001': { 
    avgInNetwork: 1650, 
    avgOutOfNetwork: 2950,
    name: 'Manhattan - Chelsea'
  },
  '10002': { 
    avgInNetwork: 1750, 
    avgOutOfNetwork: 3100,
    name: 'Manhattan - Lower East Side'
  },
  '10003': { 
    avgInNetwork: 1900, 
    avgOutOfNetwork: 3350,
    name: 'Manhattan - East Village'
  },
  '10004': { 
    avgInNetwork: 1800, 
    avgOutOfNetwork: 3150,
    name: 'Manhattan - Financial District'
  },
  '10005': { 
    avgInNetwork: 1850, 
    avgOutOfNetwork: 3250,
    name: 'Manhattan - Financial District'
  }
};

// Insurance plan types for cost calculator
export const insurancePlans = [
  { id: 'hdhp', name: 'High Deductible Health Plan', deductible: 3000, outOfPocketMax: 6000 },
  { id: 'ppo', name: 'PPO Plan', deductible: 1500, outOfPocketMax: 4000 },
  { id: 'hmo', name: 'HMO Plan', deductible: 1000, outOfPocketMax: 3000 },
  { id: 'custom', name: 'Custom Plan', deductible: 0, outOfPocketMax: 0 }
];

// Helper function to get percentile values dynamically
export const getPercentileValue = (percentile, type = 'oon') => {
  // Find closest percentile if exact match doesn't exist
  const availablePercentiles = Object.keys(procedurePercentileValues).map(Number).sort((a, b) => a - b);
  
  if (procedurePercentileValues[percentile]) {
    return procedurePercentileValues[percentile][type];
  }
  
  // Find closest percentile
  const closest = availablePercentiles.reduce((prev, curr) => {
    return Math.abs(curr - percentile) < Math.abs(prev - percentile) ? curr : prev;
  });
  
  return procedurePercentileValues[closest][type];
};

// Helper function to get related cost at specific percentile
export const getRelatedCostAtPercentile = (costId, percentile, type = 'oon') => {
  const cost = relatedCosts.find(c => c.id === costId);
  if (!cost || !cost.percentileValues) return null;
  
  if (cost.percentileValues[percentile]) {
    return cost.percentileValues[percentile][type];
  }
  
  // Fallback to 70th percentile
  return type === 'oon' ? cost.outOfNetworkPrice : cost.inNetworkPrice;
};

// Chart data for compare by location
export const getChartDataForZips = (selectedZips) => {
  return selectedZips.map(zipCode => ({
    zipCode,
    name: zipCodeData[zipCode]?.name || zipCode,
    avgInNetwork: zipCodeData[zipCode]?.avgInNetwork || 0,
    avgOutOfNetwork: zipCodeData[zipCode]?.avgOutOfNetwork || 0
  }));
};

// Calculate total costs including selected related costs
export const calculateTotalCosts = (selectedCostIds, outPercentile = 70, inPercentile = 70) => {
  // Get main procedure cost at selected percentiles
  const mainOON = getPercentileValue(outPercentile, 'oon');
  const mainIN = getPercentileValue(inPercentile, 'in');
  
  // Add selected related costs
  let additionalOON = 0;
  let additionalIN = 0;
  
  selectedCostIds.forEach(costId => {
    const oonCost = getRelatedCostAtPercentile(costId, outPercentile, 'oon');
    const inCost = getRelatedCostAtPercentile(costId, inPercentile, 'in');
    if (oonCost) additionalOON += oonCost;
    if (inCost) additionalIN += inCost;
  });
  
  return {
    outOfNetwork: mainOON + additionalOON,
    inNetwork: mainIN + additionalIN,
    breakdown: {
      main: { oon: mainOON, in: mainIN },
      additional: { oon: additionalOON, in: additionalIN }
    }
  };
};

// Export all data as a single object for easy access
export const healthcareData = {
  procedure: procedureData,
  percentiles: procedurePercentileValues,
  related: relatedCosts,
  facilities: facilityCharges,
  zipCodes: zipCodeData,
  insurance: insurancePlans
};