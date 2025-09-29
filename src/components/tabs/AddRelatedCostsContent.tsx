// src/components/tabs/AddRelatedCostsContent.tsx
import React from 'react';
import { useCalculator } from '../../contexts/CalculatorContext';
import { colors, gridTemplate } from '../../lib/constants';
import { formatCurrency } from '../../lib/utils';

export const AddRelatedCostsContent = () => {
  const { 
    selectedCosts, 
    setSelectedCosts,
    isExpanded,
    setIsExpanded,
    toggleCost,
    addAllCosts,
    setActiveTab,
    outOfNetworkPercentile,
    inNetworkPercentile
  } = useCalculator();

  // Percentile-based pricing for primary procedure
  const procedurePricing = {
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

  // Get current prices based on selected percentiles
  const currentOONPrice = procedurePricing.outOfNetwork[outOfNetworkPercentile] || procedurePricing.outOfNetwork[70];
  const currentINPrice = procedurePricing.inNetwork[inNetworkPercentile] || procedurePricing.inNetwork[70];

  // Related costs with percentile adjustments
  // These scale proportionally with the primary procedure percentile
  const getRelatedCostPrices = (basePriceOON, basePriceIN) => {
    const oonMultiplier = currentOONPrice / procedurePricing.outOfNetwork[70];
    const inMultiplier = currentINPrice / procedurePricing.inNetwork[70];
    
    return {
      outOfNetworkPrice: Math.round(basePriceOON * oonMultiplier),
      inNetworkPrice: Math.round(basePriceIN * inMultiplier)
    };
  };

  const relatedCosts = [
    {
      id: 1,
      name: 'Anesthesia for procedures on lower intestinal tract',
      cptCode: '00810',
      ...getRelatedCostPrices(456, 234)
    },
    {
      id: 2,
      name: 'Pathology examination, gross and microscopic',
      cptCode: '88305',
      ...getRelatedCostPrices(312, 156)
    },
    {
      id: 3,
      name: 'Facility fee for outpatient procedure',
      cptCode: 'C1728',
      ...getRelatedCostPrices(1245, 623)
    }
  ];

  const calculateTotalCosts = () => {
    const selectedItems = relatedCosts.filter(cost => selectedCosts.includes(cost.id));
    const additionalOutOfNetwork = selectedItems.reduce((sum, item) => sum + item.outOfNetworkPrice, 0);
    const additionalInNetwork = selectedItems.reduce((sum, item) => sum + item.inNetworkPrice, 0);
    
    return {
      outOfNetwork: currentOONPrice + additionalOutOfNetwork,
      inNetwork: currentINPrice + additionalInNetwork
    };
  };

  const totalCosts = calculateTotalCosts();

  return (
    <>
      {/* Header Section */}
      <div className="p-2" style={{ backgroundColor: colors.primary }}>
        <div className="grid items-end" style={{ gridTemplateColumns: gridTemplate, gap: '0 20px' }}>
          <div className="pr-4 flex items-center h-full">
            <div className="flex items-center">
              <h2 className="font-bold text-white" style={{ fontSize: '20px', lineHeight: '1.2', paddingLeft: '26px', marginRight: '16px' }}>
                Add Possible Related Costs to the Total
              </h2>
              <svg width="16px" height="16px" viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg" className="cursor-pointer hover:opacity-80">
                <ellipse cx="11" cy="10.9605263" rx="11" ry="10.9605263" fill="#FFFFFF"/>
                <text x="11" y="16" textAnchor="middle" fill="#362A69" fontSize="17" fontWeight="800" fontFamily="Roboto">?</text>
              </svg>
            </div>
          </div>
          <div 
            className="h-20 flex flex-col items-center justify-center text-center text-white font-bold px-4"
            style={{ backgroundColor: colors.secondaryTeal, height: '80px', marginLeft: '20px' }}
          >
            <div className="text-xs leading-tight" style={{ fontWeight: 'bold' }}>Out-of-Network /</div>
            <div className="text-xs leading-tight" style={{ fontWeight: 'bold' }}>Uninsured Price</div>
            <div style={{ fontSize: '11px', marginTop: '4px', opacity: 0.9, fontWeight: 'bold' }}>({outOfNetworkPercentile}th percentile)</div>
          </div>
          <div 
            className="h-20 flex flex-col items-center justify-center text-center text-white font-bold px-4"
            style={{ backgroundColor: colors.red, height: '80px', marginLeft: '20px' }}
          >
            <div className="text-xs leading-tight" style={{ fontWeight: 'bold' }}>In-Network Price</div>
            <div style={{ fontSize: '11px', marginTop: '4px', opacity: 0.9, fontWeight: 'bold' }}>({inNetworkPercentile}th percentile)</div>
          </div>
          <div style={{ height: '80px' }} />
        </div>
      </div>

      {/* Primary Procedure Pricing */}
      <div className="bg-white">
        <div className="grid border-b" style={{ gridTemplateColumns: gridTemplate, gap: '0 20px', borderBottomColor: '#E5E7EB' }}>
          <div className="p-4" style={{ paddingLeft: '26px', paddingTop: '20px', paddingBottom: '20px' }}>
            <div className="font-medium mb-1" style={{ fontSize: '16px', lineHeight: '1.4', color: '#1A2E3B' }}>
              Primary Medical Procedure
            </div>
            <div className="font-bold mb-2" style={{ fontSize: '18px', lineHeight: '1.2', color: '#1A2E3B' }}>
              Biopsy of large bowel using a flexible endoscope
            </div>
            <div style={{ fontSize: '14px', lineHeight: '1.4', color: '#000000' }}>CPT Code: 45380</div>
          </div>
          <div className="p-4 text-center border-l flex flex-col items-center justify-center" style={{ borderLeftColor: '#E5E7EB' }}>
            <div className="text-2xl font-bold mb-2" style={{ color: colors.secondaryTeal, fontSize: '26px', fontWeight: 'bold' }}>
              {formatCurrency(currentOONPrice)}
            </div>
            <a 
              onClick={(e) => {
                e.preventDefault();
                setActiveTab('oon-reimbursements');
              }}
              className="hover:underline cursor-pointer" 
              style={{ color: '#2464EC', fontSize: '12px', display: 'inline-block', paddingTop: '15px' }}>
              View Cost with<br />Out of Network Reimbursements
            </a>
          </div>
          <div className="p-4 text-center border-l flex items-center justify-center" style={{ borderLeftColor: '#E5E7EB' }}>
            <div className="text-2xl font-bold" style={{ color: colors.red, fontSize: '26px', fontWeight: 'bold' }}>
              {formatCurrency(currentINPrice)}
            </div>
          </div>
          <div className="p-4 border-l" style={{ borderLeftColor: '#E5E7EB' }} />
        </div>
      </div>

      {/* View Related Costs Section */}
      <div className="border-t-4" style={{ borderColor: colors.green }}>
        <div 
          className="cursor-pointer grid items-center"
          style={{ backgroundColor: colors.green, gridTemplateColumns: gridTemplate, gap: '0 20px', height: '64px', padding: '0 16px' }}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex items-center text-white">
            <span className="text-2xl font-bold mr-4" style={{ color: 'white' }}>{isExpanded ? '▼' : '▶'}</span>
            <span className="font-bold text-white" style={{ fontSize: '18px', color: 'white', fontWeight: 'bold' }}>View Related Costs</span>
            <span className="ml-2 text-sm italic opacity-90" style={{ color: 'white' }}>*to add them to the total below</span>
          </div>
          <div className="text-center text-white">
            <div className="text-sm" style={{ color: 'white' }}>Out-of-Network /</div>
            <div className="text-sm" style={{ color: 'white' }}>Uninsured Price</div>
          </div>
          <div className="text-center text-white">
            <div className="text-sm" style={{ color: 'white' }}>In-Network</div>
            <div className="text-sm" style={{ color: 'white' }}>Price</div>
          </div>
          <div className="text-center">
            <button
              onClick={(e) => {
                e.stopPropagation();
                addAllCosts();
              }}
              style={{
                backgroundColor: '#fff',
                color: '#187311',
                fontSize: '16px',
                fontWeight: '600',
                border: '2px solid #187311',
                borderRadius: '6px',
                padding: '0 18px',
                height: '40px',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              Add All
            </button>
          </div>
        </div>

        {/* Expanded Related Costs */}
        {isExpanded && (
          <div className="bg-white">
            {relatedCosts.map((cost) => (
              <div key={cost.id} className="grid border-b hover:bg-gray-50" 
                   style={{ gridTemplateColumns: gridTemplate, gap: '0 20px', borderBottomColor: '#E5E7EB' }}>
                <div className="p-4" style={{ paddingLeft: '26px', paddingTop: '20px', paddingBottom: '20px' }}>
                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      checked={selectedCosts.includes(cost.id)}
                      onChange={() => toggleCost(cost.id)}
                      className="mt-1 mr-5"
                      style={{ marginRight: '20px' }}
                    />
                    <div>
                      <div className="font-medium text-black mb-1">{cost.name}</div>
                      <div className="text-xs text-black">CPT Code: {cost.cptCode}</div>
                    </div>
                  </div>
                </div>
                <div className="p-4 text-center border-l flex items-center justify-center" style={{ borderLeftColor: '#E5E7EB' }}>
                  <div className="text-lg font-semibold" style={{ color: colors.secondaryTeal, fontSize: '20px', fontWeight: 'bold' }}>
                    {formatCurrency(cost.outOfNetworkPrice)}
                  </div>
                </div>
                <div className="p-4 text-center border-l flex items-center justify-center" style={{ borderLeftColor: '#E5E7EB' }}>
                  <div className="text-lg font-semibold" style={{ color: colors.red, fontSize: '20px', fontWeight: 'bold' }}>
                    {formatCurrency(cost.inNetworkPrice)}
                  </div>
                </div>
                <div className="p-4 border-l flex items-center justify-center" style={{ borderLeftColor: '#E5E7EB' }}>
                  <button
                    onClick={() => toggleCost(cost.id)}
                    style={{
                      backgroundColor: '#fff',
                      color: '#187311',
                      fontSize: '16px',
                      fontWeight: '600',
                      border: '2px solid #187311',
                      borderRadius: '6px',
                      padding: '0 18px',
                      height: '40px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer'
                    }}
                  >
                    {selectedCosts.includes(cost.id) ? 'Remove' : 'Add'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Total Cost Section */}
      <div className="p-4" style={{ backgroundColor: colors.primary, paddingTop: '24px', paddingBottom: '24px' }}>
        <div className="grid" style={{ gridTemplateColumns: gridTemplate, gap: '0 20px', alignItems: 'start' }}>
          <div className="text-white font-bold flex items-center" style={{ fontSize: '28px', paddingLeft: '26px', fontWeight: 'bold', height: '60px' }}>Total Cost</div>
          <div style={{ marginLeft: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ 
              backgroundColor: colors.secondaryTeal, 
              height: '60px', 
              width: '185px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <div style={{ color: 'white', fontWeight: 'bold', fontSize: '20px' }}>
                {formatCurrency(totalCosts.outOfNetwork)}
              </div>
            </div>
            <div className="text-white" style={{ fontSize: '13px', fontWeight: 'bold', marginTop: '8px' }}>Out-of-Network/Uninsured Price</div>
          </div>
          <div style={{ marginLeft: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ 
              backgroundColor: colors.red, 
              height: '60px', 
              width: '185px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <div style={{ color: 'white', fontWeight: 'bold', fontSize: '20px' }}>
                {formatCurrency(totalCosts.inNetwork)}
              </div>
            </div>
            <div className="text-white" style={{ fontSize: '13px', fontWeight: 'bold', marginTop: '8px' }}>In-Network Price</div>
          </div>
          <div />
        </div>
      </div>
    </>
  );
};