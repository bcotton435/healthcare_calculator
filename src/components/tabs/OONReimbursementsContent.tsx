// src/components/tabs/OONReimbursementsContent.tsx
import React from 'react';
import { useCalculator } from '../../contexts/CalculatorContext';
import { colors } from '../../lib/constants';

export const OONReimbursementsContent = () => {
  const {
    facilityType,
    setFacilityType,
    addedProcedures,
    toggleProcedure,
    reimbursementPercent,
    setReimbursementPercent,
    setActiveTab,
    outOfNetworkPercentile  // Add this to use the current percentile
  } = useCalculator();
  
  // Base charges at 70th percentile (we'll scale from here)
  const baseCharges70th = {
    procedure: 1960,
    anesthesia: 3408,
    pathology: 257
  };
  
  // Percentile multipliers for scaling
  const percentileMultipliers = {
    50: 0.77,   // 1819/2361
    60: 0.885,  // 2090/2361
    70: 1.0,    // baseline
    80: 1.196,  // 2826/2361
    90: 1.816   // 4290/2361
  };
  
  // Get current multiplier
  const currentMultiplier = percentileMultipliers[outOfNetworkPercentile] || 1.0;
  
  // Calculate current base charges based on selected percentile
  const currentCharges = {
    procedure: Math.round(baseCharges70th.procedure * currentMultiplier),
    anesthesia: Math.round(baseCharges70th.anesthesia * currentMultiplier),
    pathology: Math.round(baseCharges70th.pathology * currentMultiplier)
  };
  
  // Facility multipliers remain the same
  const facilityCharges = {
    Hospital: {
      name: "Hospital (Outpatient)",
      multiplier: 1.52,
    },
    ASC: {
      name: "Ambulatory Surgical Center (ASC)",
      multiplier: 1.0,
    }
  };
  
  const calculateProcedureCosts = (baseCharge, facility = facilityType) => {
    const facilityAdjustedCharge = Math.round(baseCharge * facilityCharges[facility].multiplier);
    const planPayment = Math.round(facilityAdjustedCharge * (reimbursementPercent / 100));
    const outOfPocket = facilityAdjustedCharge - planPayment;
    
    return {
      providerCharge: facilityAdjustedCharge,
      planPayment,
      outOfPocket
    };
  };
  
  const mainCosts = calculateProcedureCosts(currentCharges.procedure);
  const anesthesiaCosts = addedProcedures.anesthesia ? calculateProcedureCosts(currentCharges.anesthesia) : null;
  const pathologyCosts = addedProcedures.pathology ? calculateProcedureCosts(currentCharges.pathology) : null;
  
  const totalOutOfPocket = mainCosts.outOfPocket + 
    (anesthesiaCosts?.outOfPocket || 0) + 
    (pathologyCosts?.outOfPocket || 0);
  
  return (
    <div style={{ background: 'white' }}>
      {/* Header */}
      <div style={{ 
        backgroundColor: colors.primary, 
        padding: '20px 24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <h1 style={{ 
            fontSize: '20px',
            fontWeight: 600,
            color: 'white',
            margin: 0,
            fontFamily: 'Roboto, sans-serif'
          }}>
            Out-Of-Network Reimbursements
          </h1>
          <div style={{
            width: '20px',
            height: '20px',
            background: 'white',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            fontSize: '12px',
            color: colors.primary,
            fontWeight: 'bold'
          }}>
            ?
          </div>
        </div>
        <div style={{
          backgroundColor: colors.secondaryTeal,
          padding: '10px 16px',
          borderRadius: '4px',
          color: 'white',
          fontFamily: 'Roboto, sans-serif',
          textAlign: 'center',
          minWidth: '140px'
        }}>
          <div style={{ fontSize: '14px', fontWeight: 600, lineHeight: '1.3' }}>
            Out-of-Network/
            <br />
            Uninsured Price
          </div>
          <div style={{ fontSize: '13px', marginTop: '4px' }}>
            ({outOfNetworkPercentile}th percentile)
          </div>
        </div>
      </div>

      <div style={{ padding: '24px' }}>
        {/* Main Procedure Info */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{ 
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: '24px'
          }}>
            {/* Left side - Procedure info */}
            <div>
              <h2 style={{ 
                fontSize: '16px',
                fontWeight: 600,
                color: '#000',
                marginBottom: '12px',
                fontFamily: 'Roboto, sans-serif'
              }}>
                Medical Procedure
              </h2>
              <p style={{ 
                fontSize: '14px',
                color: '#000',
                marginBottom: '4px',
                fontFamily: 'Roboto, sans-serif'
              }}>
                Biopsy of large bowel using a flexible endoscope
              </p>
              <p style={{ 
                fontSize: '14px',
                color: '#000',
                fontFamily: 'Roboto, sans-serif'
              }}>
                CPT Code: 45380
              </p>
            </div>

            {/* Right side - Cost breakdown */}
            <div style={{ minWidth: '450px' }}>
              {/* Provider Charge Row */}
              <div style={{ 
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '8px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '14px', color: '#000', fontFamily: 'Roboto, sans-serif' }}>
                    Typical provider charge
                  </span>
                  <div style={{ 
                    backgroundColor: colors.secondaryTeal,
                    color: 'white',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '12px',
                    fontFamily: 'Roboto, sans-serif',
                    cursor: 'pointer'
                  }}>
                    {outOfNetworkPercentile}th percentile of charges
                  </div>
                </div>
                <div style={{ 
                  fontSize: '18px',
                  fontWeight: 600,
                  color: colors.secondaryTeal,
                  fontFamily: 'Roboto, sans-serif'
                }}>
                  ${mainCosts.providerCharge.toLocaleString()}
                </div>
              </div>

              {/* Plan Payment Row */}
              <div style={{ 
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '8px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '14px', color: '#000', fontFamily: 'Roboto, sans-serif' }}>
                    Plan will pay
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <button
                      onClick={() => setReimbursementPercent(Math.max(60, reimbursementPercent - 10))}
                      style={{
                        backgroundColor: colors.green,
                        color: 'white',
                        border: 'none',
                        width: '28px',
                        height: '28px',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '18px',
                        lineHeight: '1',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 'bold'
                      }}
                    >
                      −
                    </button>
                    <div style={{ 
                      backgroundColor: colors.green,
                      color: 'white',
                      padding: '6px 12px',
                      borderRadius: '4px',
                      fontSize: '14px',
                      fontFamily: 'Roboto, sans-serif'
                    }}>
                      {reimbursementPercent}% of charges
                    </div>
                    <button
                      onClick={() => setReimbursementPercent(Math.min(100, reimbursementPercent + 10))}
                      style={{
                        backgroundColor: colors.green,
                        color: 'white',
                        border: 'none',
                        width: '28px',
                        height: '28px',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '18px',
                        lineHeight: '1',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 'bold'
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div style={{ 
                  fontSize: '16px',
                  fontWeight: 500,
                  color: '#000',
                  fontFamily: 'Roboto, sans-serif'
                }}>
                  − ${mainCosts.planPayment.toLocaleString()}
                </div>
              </div>

              {/* Out of Pocket Row */}
              <div style={{ 
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingTop: '8px',
                borderTop: '1px solid #e0e0e0'
              }}>
                <span style={{ fontSize: '14px', color: '#000', fontFamily: 'Roboto, sans-serif' }}>
                  Out-of-Pocket Cost
                </span>
                <div style={{ 
                  fontSize: '18px',
                  fontWeight: 600,
                  color: '#000',
                  fontFamily: 'Roboto, sans-serif'
                }}>
                  = ${mainCosts.outOfPocket.toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Out of Network Related Costs Header */}
        <div style={{
          backgroundColor: colors.secondaryTeal,
          margin: '0 -24px',
          padding: '12px 24px',
          color: 'white',
          fontFamily: 'Roboto, sans-serif'
        }}>
          <h3 style={{ 
            fontSize: '16px',
            fontWeight: 600,
            margin: 0
          }}>
            Out of Network Related Costs
          </h3>
        </div>

        {/* Related Costs Content - White Background */}
        <div style={{ marginBottom: '24px' }}>
          {/* Anesthesia */}
          <div style={{ 
            paddingTop: '16px',
            paddingBottom: '16px',
            borderBottom: '1px solid #e0e0e0'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ flex: 1 }}>
                <h4 style={{ 
                  fontSize: '14px',
                  fontWeight: 600,
                  marginBottom: '4px',
                  color: '#000',
                  fontFamily: 'Roboto, sans-serif'
                }}>
                  Anesthesia
                </h4>
                <p style={{ 
                  fontSize: '14px',
                  marginBottom: '4px',
                  color: '#000',
                  fontFamily: 'Roboto, sans-serif'
                }}>
                  Anesthesia for other procedure on large bowel using an endoscope
                </p>
                <p style={{ 
                  fontSize: '14px',
                  color: '#000',
                  fontFamily: 'Roboto, sans-serif'
                }}>
                  CPT Code: 00811
                </p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <button
                  onClick={() => toggleProcedure('anesthesia')}
                  style={{
                    backgroundColor: addedProcedures.anesthesia ? '#D63D0A' : colors.green,
                    color: 'white',
                    padding: '8px 20px',
                    border: 'none',
                    borderRadius: '4px',
                    fontSize: '14px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    fontFamily: 'Roboto, sans-serif'
                  }}
                >
                  {addedProcedures.anesthesia ? 'Remove' : 'Add'}
                </button>
                {addedProcedures.anesthesia && anesthesiaCosts && (
                  <div style={{ minWidth: '80px', textAlign: 'right' }}>
                    <div style={{ 
                      fontSize: '16px',
                      fontWeight: 600,
                      color: '#000',
                      fontFamily: 'Roboto, sans-serif'
                    }}>
                      ${anesthesiaCosts.outOfPocket.toLocaleString()}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Pathology */}
          <div style={{ 
            paddingTop: '16px',
            paddingBottom: '16px',
            borderBottom: '1px solid #e0e0e0'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ flex: 1 }}>
                <h4 style={{ 
                  fontSize: '14px',
                  fontWeight: 600,
                  marginBottom: '4px',
                  color: '#000',
                  fontFamily: 'Roboto, sans-serif'
                }}>
                  Pathology
                </h4>
                <p style={{ 
                  fontSize: '14px',
                  marginBottom: '4px',
                  color: '#000',
                  fontFamily: 'Roboto, sans-serif'
                }}>
                  Pathology examination of tissue using a microscope, intermediate complexity
                </p>
                <p style={{ 
                  fontSize: '14px',
                  color: '#000',
                  fontFamily: 'Roboto, sans-serif'
                }}>
                  CPT Code: 88305
                </p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <button
                  onClick={() => toggleProcedure('pathology')}
                  style={{
                    backgroundColor: addedProcedures.pathology ? '#D63D0A' : colors.green,
                    color: 'white',
                    padding: '8px 20px',
                    border: 'none',
                    borderRadius: '4px',
                    fontSize: '14px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    fontFamily: 'Roboto, sans-serif'
                  }}
                >
                  {addedProcedures.pathology ? 'Remove' : 'Add'}
                </button>
                {addedProcedures.pathology && pathologyCosts && (
                  <div style={{ minWidth: '80px', textAlign: 'right' }}>
                    <div style={{ 
                      fontSize: '16px',
                      fontWeight: 600,
                      color: '#000',
                      fontFamily: 'Roboto, sans-serif'
                    }}>
                      ${pathologyCosts.outOfPocket.toLocaleString()}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Facility Type Selection */}
          <div style={{ 
            paddingTop: '20px',
            paddingBottom: '8px'
          }}>
            <div style={{ marginBottom: '16px' }}>
              {/* Hospital Option */}
              <div style={{ marginBottom: '12px' }}>
                <label style={{ 
                  display: 'flex', 
                  alignItems: 'flex-start',
                  cursor: 'pointer',
                  gap: '12px'
                }}>
                  <input
                    type="radio"
                    value="Hospital"
                    checked={facilityType === 'Hospital'}
                    onChange={(e) => setFacilityType(e.target.value)}
                    style={{ 
                      marginTop: '2px',
                      cursor: 'pointer'
                    }}
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{ 
                      fontSize: '14px',
                      fontWeight: 600,
                      color: '#000',
                      marginBottom: '4px',
                      fontFamily: 'Roboto, sans-serif'
                    }}>
                      Hospital (Outpatient)
                    </div>
                    <div style={{ 
                      fontSize: '14px',
                      color: '#000',
                      marginBottom: '2px',
                      fontFamily: 'Roboto, sans-serif'
                    }}>
                      Biopsy of large bowel using a flexible endoscope
                    </div>
                    <div style={{ 
                      fontSize: '14px',
                      color: '#000',
                      fontFamily: 'Roboto, sans-serif'
                    }}>
                      CPT Code: 45380
                    </div>
                  </div>
                </label>
              </div>

              {/* Ambulatory Option */}
              <div style={{ 
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between'
              }}>
                <label style={{ 
                  display: 'flex', 
                  alignItems: 'flex-start',
                  cursor: 'pointer',
                  gap: '12px',
                  flex: 1
                }}>
                  <input
                    type="radio"
                    value="ASC"
                    checked={facilityType === 'ASC'}
                    onChange={(e) => setFacilityType(e.target.value)}
                    style={{ 
                      marginTop: '2px',
                      cursor: 'pointer'
                    }}
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{ 
                      fontSize: '14px',
                      fontWeight: 600,
                      color: '#000',
                      marginBottom: '4px',
                      fontFamily: 'Roboto, sans-serif'
                    }}>
                      Ambulatory Surgical Center (ASC)
                    </div>
                    <div style={{ 
                      fontSize: '14px',
                      color: '#000',
                      marginBottom: '2px',
                      fontFamily: 'Roboto, sans-serif'
                    }}>
                      Biopsy of large bowel using a flexible endoscope
                    </div>
                    <div style={{ 
                      fontSize: '14px',
                      color: '#000',
                      fontFamily: 'Roboto, sans-serif'
                    }}>
                      CPT Code: 45380
                    </div>
                  </div>
                </label>

                {/* ASC Cost Details - Only show when ASC is selected */}
                {facilityType === 'ASC' && (
                  <div style={{ minWidth: '450px', paddingLeft: '20px' }}>
                    <button
                      style={{
                        backgroundColor: colors.green,
                        color: 'white',
                        padding: '8px 20px',
                        border: 'none',
                        borderRadius: '4px',
                        fontSize: '14px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        fontFamily: 'Roboto, sans-serif',
                        marginBottom: '12px'
                      }}
                    >
                      Add
                    </button>
                    <div style={{ 
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '4px'
                    }}>
                      <span style={{ fontSize: '14px', color: '#000', fontFamily: 'Roboto, sans-serif' }}>
                        Typical provider charge
                      </span>
                      <div style={{ 
                        fontSize: '16px',
                        fontWeight: 600,
                        color: colors.secondaryTeal,
                        fontFamily: 'Roboto, sans-serif'
                      }}>
                        ${mainCosts.providerCharge.toLocaleString()}
                      </div>
                    </div>
                    <div style={{ 
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '4px'
                    }}>
                      <span style={{ fontSize: '14px', color: '#000', fontFamily: 'Roboto, sans-serif' }}>
                        Plan will pay
                        <span style={{ fontSize: '14px', color: '#000', marginLeft: '4px' }}>
                          {reimbursementPercent}%
                        </span>
                      </span>
                      <div style={{ 
                        fontSize: '14px',
                        color: '#000',
                        fontFamily: 'Roboto, sans-serif'
                      }}>
                        - ${mainCosts.planPayment.toLocaleString()}
                      </div>
                    </div>
                    <div style={{ 
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <span style={{ fontSize: '14px', color: '#000', fontFamily: 'Roboto, sans-serif' }}>
                        Out-of-Pocket Cost
                      </span>
                      <div style={{ 
                        fontSize: '16px',
                        fontWeight: 600,
                        color: '#000',
                        fontFamily: 'Roboto, sans-serif'
                      }}>
                        = ${mainCosts.outOfPocket.toLocaleString()}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Total Cost Section */}
        <div style={{
          backgroundColor: colors.primary,
          margin: '0 -24px -24px',
          padding: '20px 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '0'
        }}>
          <h2 style={{ 
            fontSize: '20px',
            fontWeight: 600,
            color: 'white',
            margin: 0,
            fontFamily: 'Roboto, sans-serif'
          }}>
            Total Cost
          </h2>
          <div style={{ textAlign: 'right' }}>
            <div style={{ 
              fontSize: '28px',
              fontWeight: 700,
              color: 'white',
              fontFamily: 'Roboto, sans-serif'
            }}>
              ${totalOutOfPocket.toLocaleString()}
            </div>
            <div style={{ 
              fontSize: '12px',
              color: 'white',
              opacity: 0.9,
              fontFamily: 'Roboto, sans-serif'
            }}>
              Out-of-Pocket Cost
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};