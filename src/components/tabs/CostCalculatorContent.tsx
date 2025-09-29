// src/components/tabs/CostCalculatorContent.tsx
import React from 'react';
import { useCalculator } from '../../contexts/CalculatorContext';
import { colors } from '../../lib/constants';
import { formatCurrency } from '../../lib/utils';

export const CostCalculatorContent = () => {
  // Use local state for values that aren't in context
  const [localReimbursementPercent, setLocalReimbursementPercent] = React.useState(70);
  const [localReimbursementBasis, setLocalReimbursementBasis] = React.useState('UCR');
  const [localDeductibleAmount, setLocalDeductibleAmount] = React.useState('');
  const [localDeductiblePaid, setLocalDeductiblePaid] = React.useState('');
  const [localShowResults, setLocalShowResults] = React.useState(false);
  
  const {
    // Get the state from the first tab
    selectedCosts,
    inNetworkPercentile,
    outOfNetworkPercentile
  } = useCalculator();

  // Percentile-based pricing for primary procedure (matching AddRelatedCostsContent)
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

  // Related costs with percentile adjustments (matching AddRelatedCostsContent)
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

  // Calculate the totals from the first tab
  const calculateTabOneTotals = () => {
    const selectedItems = relatedCosts.filter(cost => selectedCosts.includes(cost.id));
    const additionalOutOfNetwork = selectedItems.reduce((sum, item) => sum + item.outOfNetworkPrice, 0);
    const additionalInNetwork = selectedItems.reduce((sum, item) => sum + item.inNetworkPrice, 0);
    
    return {
      outOfNetwork: currentOONPrice + additionalOutOfNetwork,
      inNetwork: currentINPrice + additionalInNetwork
    };
  };

  // Get the prepopulated values from tab one
  const tabOneTotals = calculateTabOneTotals();
  const inNetworkPrice = tabOneTotals.inNetwork.toString();
  const outOfNetworkPrice = tabOneTotals.outOfNetwork.toString();

  const handlePriceChange = (value: string, setter: (value: string) => void) => {
    // Remove non-numeric characters except decimal
    const cleanValue = value.replace(/[^0-9.]/g, '');
    setter(cleanValue);
  };

  const handleEstimateCosts = () => {
    if (inNetworkPrice || outOfNetworkPrice) {
      setLocalShowResults(true);
    }
  };

  const resetAll = () => {
    setLocalReimbursementPercent(70);
    setLocalReimbursementBasis('UCR');
    setLocalDeductibleAmount('');
    setLocalDeductiblePaid('');
    setLocalShowResults(false);
  };

  const calculateCosts = (price: string, isInNetwork: boolean) => {
    if (!price || parseFloat(price) === 0) return null;
    
    const priceNum = parseFloat(price);
    const deductibleNum = parseFloat(localDeductibleAmount) || 0;
    const paidNum = parseFloat(localDeductiblePaid) || 0;
    const remainingDeductible = Math.max(0, deductibleNum - paidNum);
    
    const coverageRate = localReimbursementPercent / 100;
    // Out-of-network typically has lower coverage
    const adjustedCoverageRate = isInNetwork ? coverageRate : coverageRate * 0.6;
    
    const deductiblePortion = Math.min(priceNum, remainingDeductible);
    const afterDeductible = Math.max(0, priceNum - deductiblePortion);
    const insurancePays = afterDeductible * adjustedCoverageRate;
    const youPay = priceNum - insurancePays;
    
    return {
      total: priceNum,
      deductiblePortion: deductiblePortion,
      insurancePays: insurancePays,
      youPay: youPay,
      coveragePercent: Math.round(adjustedCoverageRate * 100)
    };
  };

  const inNetworkResults = localShowResults ? calculateCosts(inNetworkPrice, true) : null;
  const outOfNetworkResults = localShowResults ? calculateCosts(outOfNetworkPrice, false) : null;

  // Calculate savings when both prices are entered
  const savings = (inNetworkResults && outOfNetworkResults) 
    ? outOfNetworkResults.youPay - inNetworkResults.youPay
    : null;

  return (
    <div style={{ background: 'white' }}>
      {/* Add style tag for placeholder styling */}
      <style>{`
        .price-input-white::placeholder {
          color: rgba(255, 255, 255, 0.7);
          opacity: 1;
        }
        .price-input-white::-webkit-input-placeholder {
          color: rgba(255, 255, 255, 0.7);
          opacity: 1;
        }
        .price-input-white::-moz-placeholder {
          color: rgba(255, 255, 255, 0.7);
          opacity: 1;
        }
        .price-input-white:-ms-input-placeholder {
          color: rgba(255, 255, 255, 0.7);
          opacity: 1;
        }
      `}</style>
      
      {/* Header */}
      <div style={{ 
        backgroundColor: colors.primary,
        padding: '20px 24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <h1 style={{ 
          fontSize: '20px',
          fontWeight: 600,
          color: 'white',
          margin: 0,
          fontFamily: 'Roboto, sans-serif'
        }}>
          Healthcare Cost Calculator
        </h1>
      </div>
      
      <div style={{ padding: '24px' }}>
        {/* Main input sections - only show when not showing results */}
        {!localShowResults ? (
          <div style={{ display: 'flex', gap: '20px', marginBottom: '24px' }}>
            {/* Procedure Price Section */}
            <div style={{ 
              flex: 1,
              minWidth: '250px',
              backgroundColor: '#F3F4F6',
              padding: '20px',
              borderRadius: '6px'
            }}>
              <h3 style={{ 
                fontSize: '16px',
                fontWeight: 600,
                color: '#000',
                marginBottom: '8px',
                fontFamily: 'Roboto, sans-serif'
              }}>
                Procedure Price
              </h3>
              <p style={{ 
                fontSize: '14px',
                color: '#000',
                marginBottom: '16px',
                fontFamily: 'Roboto, sans-serif'
              }}>
                Prices are automatically populated from your selected procedures.
              </p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {/* In-Network Price */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 14px',
                  backgroundColor: colors.red,
                  borderRadius: '4px'
                }}>
                  <span style={{ 
                    color: 'white',
                    fontSize: '14px',
                    fontWeight: 500,
                    fontFamily: 'Roboto, sans-serif'
                  }}>
                    In-Network
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={{ color: 'white', marginRight: '4px', fontSize: '14px' }}>$</span>
                    <input
                      type="text"
                      value={inNetworkPrice}
                      readOnly
                      className="price-input-white"
                      style={{
                        background: 'transparent',
                        color: 'white',
                        textAlign: 'right',
                        width: '80px',
                        border: 'none',
                        outline: 'none',
                        fontSize: '14px',
                        fontFamily: 'Roboto, sans-serif',
                        cursor: 'default'
                      }}
                      placeholder="0"
                    />
                  </div>
                </div>

                {/* Out-of-Network Price */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 14px',
                  backgroundColor: colors.secondaryTeal,
                  borderRadius: '4px'
                }}>
                  <span style={{ 
                    color: 'white',
                    fontSize: '14px',
                    fontWeight: 500,
                    fontFamily: 'Roboto, sans-serif'
                  }}>
                    Out-of-Network
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={{ color: 'white', marginRight: '4px', fontSize: '14px' }}>$</span>
                    <input
                      type="text"
                      value={outOfNetworkPrice}
                      readOnly
                      className="price-input-white"
                      style={{
                        background: 'transparent',
                        color: 'white',
                        textAlign: 'right',
                        width: '80px',
                        border: 'none',
                        outline: 'none',
                        fontSize: '14px',
                        fontFamily: 'Roboto, sans-serif',
                        cursor: 'default'
                      }}
                      placeholder="0"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Deductible Section */}
            <div style={{ 
              flex: 1,
              minWidth: '250px',
              backgroundColor: '#F3F4F6',
              padding: '20px',
              borderRadius: '6px'
            }}>
              <h3 style={{ 
                fontSize: '16px',
                fontWeight: 600,
                color: '#000',
                marginBottom: '16px',
                fontFamily: 'Roboto, sans-serif'
              }}>
                Deductible
              </h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ 
                    display: 'block',
                    fontSize: '14px',
                    color: '#000',
                    marginBottom: '6px',
                    fontFamily: 'Roboto, sans-serif'
                  }}>
                    What is your yearly deductible?
                  </label>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={{ color: '#000', marginRight: '4px', fontSize: '14px' }}>$</span>
                    <input
                      type="text"
                      value={localDeductibleAmount}
                      onChange={(e) => handlePriceChange(e.target.value, setLocalDeductibleAmount)}
                      style={{
                        padding: '6px 8px',
                        border: '1px solid #d1d5db',
                        borderRadius: '4px',
                        width: '100%',
                        outline: 'none',
                        fontSize: '14px',
                        fontFamily: 'Roboto, sans-serif'
                      }}
                      placeholder="0"
                    />
                  </div>
                </div>

                <div>
                  <label style={{ 
                    display: 'block',
                    fontSize: '14px',
                    color: '#000',
                    marginBottom: '6px',
                    fontFamily: 'Roboto, sans-serif'
                  }}>
                    How much have you paid so far this year?
                  </label>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={{ color: '#000', marginRight: '4px', fontSize: '14px' }}>$</span>
                    <input
                      type="text"
                      value={localDeductiblePaid}
                      onChange={(e) => handlePriceChange(e.target.value, setLocalDeductiblePaid)}
                      style={{
                        padding: '6px 8px',
                        border: '1px solid #d1d5db',
                        borderRadius: '4px',
                        width: '100%',
                        outline: 'none',
                        fontSize: '14px',
                        fontFamily: 'Roboto, sans-serif'
                      }}
                      placeholder="0"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Reimbursement Percentile Section */}
            <div style={{ 
              flex: 1,
              minWidth: '300px',
              backgroundColor: '#F3F4F6',
              padding: '20px',
              borderRadius: '6px'
            }}>
              <h3 style={{ 
                fontSize: '16px',
                fontWeight: 600,
                color: '#000',
                marginBottom: '8px',
                fontFamily: 'Roboto, sans-serif'
              }}>
                Reimbursement Percentile
              </h3>
              <p style={{ 
                fontSize: '14px',
                color: '#000',
                marginBottom: '6px',
                fontFamily: 'Roboto, sans-serif'
              }}>
                For Out-of-Network Insurance, Medicare or UCR (Usual, Customary and Reasonable)
              </p>
              <p style={{ 
                fontSize: '14px',
                color: '#000',
                marginBottom: '16px',
                fontFamily: 'Roboto, sans-serif'
              }}>
                Select the reimbursement coverage percentile amount.
              </p>
              
              <div style={{ 
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '16px'
              }}>
                <button 
                  onClick={() => setLocalReimbursementPercent(Math.max(50, localReimbursementPercent - 5))}
                  style={{
                    backgroundColor: colors.green,
                    color: 'white',
                    border: 'none',
                    width: '32px',
                    height: '32px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '18px',
                    fontWeight: 'bold',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  −
                </button>
                <div style={{
                  color: '#000',
                  padding: '6px 16px',
                  fontSize: '18px',
                  fontWeight: 'bold',
                  backgroundColor: 'white',
                  border: '2px solid #d1d5db',
                  borderRadius: '4px',
                  minWidth: '80px',
                  textAlign: 'center',
                  fontFamily: 'Roboto, sans-serif'
                }}>
                  {localReimbursementPercent}%
                </div>
                <button 
                  onClick={() => setLocalReimbursementPercent(Math.min(100, localReimbursementPercent + 5))}
                  style={{
                    backgroundColor: colors.green,
                    color: 'white',
                    border: 'none',
                    width: '32px',
                    height: '32px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '18px',
                    fontWeight: 'bold',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  +
                </button>
              </div>

              <div style={{ display: 'flex', gap: '20px', marginBottom: '8px' }}>
                <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                  <input
                    type="radio"
                    name="calcReimbursementBasis"
                    checked={localReimbursementBasis === 'UCR'}
                    onChange={() => {
                      setLocalReimbursementBasis('UCR');
                      setLocalReimbursementPercent(70);
                    }}
                    style={{ marginRight: '6px' }}
                  />
                  <span style={{ fontSize: '14px', color: '#000', fontFamily: 'Roboto, sans-serif' }}>
                    UCR Based
                  </span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                  <input
                    type="radio"
                    name="calcReimbursementBasis"
                    checked={localReimbursementBasis === 'Medicare'}
                    onChange={() => {
                      setLocalReimbursementBasis('Medicare');
                      setLocalReimbursementPercent(140);
                    }}
                    style={{ marginRight: '6px' }}
                  />
                  <span style={{ fontSize: '14px', color: '#000', fontFamily: 'Roboto, sans-serif' }}>
                    Medicare
                  </span>
                </label>
              </div>
              <p style={{ 
                fontSize: '14px',
                color: '#000',
                fontStyle: 'italic',
                fontFamily: 'Roboto, sans-serif'
              }}>
                Medicare and UCR rates are based on the 80th charge percentile.
              </p>
            </div>
          </div>
        ) : null}

        {/* Estimate Button */}
        {!localShowResults && (
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <button
              onClick={handleEstimateCosts}
              disabled={!inNetworkPrice && !outOfNetworkPrice}
              style={{ 
                backgroundColor: '#187311',
                color: 'white',
                padding: '10px 32px',
                border: 'none',
                borderRadius: '4px',
                fontSize: '14px',
                fontWeight: 600,
                cursor: (!inNetworkPrice && !outOfNetworkPrice) ? 'not-allowed' : 'pointer',
                opacity: (!inNetworkPrice && !outOfNetworkPrice) ? 0.5 : 1,
                fontFamily: 'Roboto, sans-serif'
              }}
            >
              Estimate Costs
            </button>
          </div>
        )}

        {/* Results Section */}
        {localShowResults && (inNetworkResults || outOfNetworkResults) && (
          <div style={{ 
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: '24px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}>
            <div style={{ 
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px'
            }}>
              <h3 style={{ 
                fontSize: '18px',
                fontWeight: 600,
                color: '#000',
                margin: 0,
                fontFamily: 'Roboto, sans-serif'
              }}>
                Your Estimated Costs
              </h3>
              <button 
                onClick={resetAll}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#1A73E8',
                  fontSize: '14px',
                  cursor: 'pointer',
                  fontFamily: 'Roboto, sans-serif',
                  textDecoration: 'underline'
                }}
              >
                Reset
              </button>
            </div>
            
            <div style={{ 
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '20px'
            }}>
              {/* In-Network Results */}
              {inNetworkResults && (
                <div style={{ 
                  border: '1px solid #e0e0e0',
                  borderRadius: '8px',
                  overflow: 'hidden'
                }}>
                  <div style={{ 
                    backgroundColor: colors.red,
                    padding: '10px 16px',
                    color: 'white',
                    fontSize: '14px',
                    fontWeight: 600,
                    fontFamily: 'Roboto, sans-serif'
                  }}>
                    In-Network Costs
                  </div>
                  <div style={{ padding: '16px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                        <span style={{ color: '#000', fontFamily: 'Roboto, sans-serif' }}>Procedure Cost:</span>
                        <span style={{ color: '#000', fontWeight: 500, fontFamily: 'Roboto, sans-serif' }}>
                          {formatCurrency(inNetworkResults.total)}
                        </span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                        <span style={{ color: '#000', fontFamily: 'Roboto, sans-serif' }}>Deductible:</span>
                        <span style={{ color: '#000', fontFamily: 'Roboto, sans-serif' }}>
                          -{formatCurrency(inNetworkResults.deductiblePortion)}
                        </span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                        <span style={{ color: '#000', fontFamily: 'Roboto, sans-serif' }}>
                          Insurance ({inNetworkResults.coveragePercent}%):
                        </span>
                        <span style={{ color: '#000', fontFamily: 'Roboto, sans-serif' }}>
                          -{formatCurrency(inNetworkResults.insurancePays)}
                        </span>
                      </div>
                      <hr style={{ margin: '8px 0', border: 'none', borderTop: '1px solid #e0e0e0' }} />
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '16px', fontWeight: 'bold' }}>
                        <span style={{ color: '#000', fontFamily: 'Roboto, sans-serif' }}>You Pay:</span>
                        <span style={{ color: colors.red, fontFamily: 'Roboto, sans-serif' }}>
                          {formatCurrency(inNetworkResults.youPay)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Out-of-Network Results */}
              {outOfNetworkResults && (
                <div style={{ 
                  border: '1px solid #e0e0e0',
                  borderRadius: '8px',
                  overflow: 'hidden'
                }}>
                  <div style={{ 
                    backgroundColor: colors.secondaryTeal,
                    padding: '10px 16px',
                    color: 'white',
                    fontSize: '14px',
                    fontWeight: 600,
                    fontFamily: 'Roboto, sans-serif'
                  }}>
                    Out-of-Network Costs
                  </div>
                  <div style={{ padding: '16px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                        <span style={{ color: '#000', fontFamily: 'Roboto, sans-serif' }}>Procedure Cost:</span>
                        <span style={{ color: '#000', fontWeight: 500, fontFamily: 'Roboto, sans-serif' }}>
                          {formatCurrency(outOfNetworkResults.total)}
                        </span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                        <span style={{ color: '#000', fontFamily: 'Roboto, sans-serif' }}>Deductible:</span>
                        <span style={{ color: '#000', fontFamily: 'Roboto, sans-serif' }}>
                          -{formatCurrency(outOfNetworkResults.deductiblePortion)}
                        </span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                        <span style={{ color: '#000', fontFamily: 'Roboto, sans-serif' }}>
                          Insurance ({outOfNetworkResults.coveragePercent}%):
                        </span>
                        <span style={{ color: '#000', fontFamily: 'Roboto, sans-serif' }}>
                          -{formatCurrency(outOfNetworkResults.insurancePays)}
                        </span>
                      </div>
                      <hr style={{ margin: '8px 0', border: 'none', borderTop: '1px solid #e0e0e0' }} />
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '16px', fontWeight: 'bold' }}>
                        <span style={{ color: '#000', fontFamily: 'Roboto, sans-serif' }}>You Pay:</span>
                        <span style={{ color: colors.secondaryTeal, fontFamily: 'Roboto, sans-serif' }}>
                          {formatCurrency(outOfNetworkResults.youPay)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Savings Comparison */}
            {savings !== null && savings > 0 && (
              <div style={{ 
                marginTop: '20px',
                padding: '16px',
                backgroundColor: '#f0fdf4',
                border: '2px solid #86efac',
                borderRadius: '8px',
                textAlign: 'center'
              }}>
                <p style={{ 
                  fontSize: '14px',
                  fontWeight: 500,
                  color: '#000',
                  marginBottom: '8px',
                  fontFamily: 'Roboto, sans-serif'
                }}>
                  By choosing In-Network, you save:
                </p>
                <p style={{ 
                  fontSize: '28px',
                  fontWeight: 'bold',
                  color: colors.green,
                  margin: '8px 0',
                  fontFamily: 'Roboto, sans-serif'
                }}>
                  {formatCurrency(savings)}
                </p>
                <p style={{ 
                  fontSize: '14px',
                  color: '#000',
                  fontFamily: 'Roboto, sans-serif'
                }}>
                  That's {Math.round((savings / outOfNetworkResults!.youPay) * 100)}% less!
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};