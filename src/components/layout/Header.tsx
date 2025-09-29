// src/components/layout/Header.tsx
import React from 'react';
import { useCalculator } from '../../contexts/CalculatorContext';

export const Header = () => {
  const { 
    outOfNetworkPercentile, 
    setOutOfNetworkPercentile,
    inNetworkPercentile,
    setInNetworkPercentile 
  } = useCalculator();

  // Percentile data matching your actual values
  const outNetworkData = {
    50: 1819, 60: 2090, 70: 2361, 80: 2826, 90: 4290
  };
  
  const inNetworkData = {
    50: 560, 60: 688, 70: 907, 80: 1372, 90: 2302
  };

  const percentiles = [50, 60, 70, 80, 90];
  const percentilePositions = {
    50: 0, 60: 25, 70: 50, 80: 75, 90: 100
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const getPosition = (percentile) => {
    return percentilePositions[percentile] ?? 50;
  };

  const moveSlider = (type, direction) => {
    const current = type === 'out' ? outOfNetworkPercentile : inNetworkPercentile;
    const currentIndex = percentiles.indexOf(current);
    const newIndex = Math.max(0, Math.min(percentiles.length - 1, currentIndex + direction));
    const newPercentile = percentiles[newIndex];
    
    if (type === 'out') {
      setOutOfNetworkPercentile(newPercentile);
    } else {
      setInNetworkPercentile(newPercentile);
    }
  };

  return (
    <div style={{
      backgroundColor: 'white',
      padding: '24px',
      marginBottom: '24px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
    }}>
      <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
        
        {/* Left Side - Title and Info */}
        <div style={{ flex: 1 }}>
          <p style={{ 
            marginBottom: '8px', 
            color: '#000', 
            fontSize: '14px',
            fontFamily: 'Roboto, sans-serif'
          }}>
            Costs of Care Related to
          </p>
          <h1 style={{ 
            fontWeight: 'bold',
            marginBottom: '12px',
            color: '#000',
            fontSize: '24px',
            lineHeight: '1.3',
            fontFamily: 'Roboto, sans-serif'
          }}>
            Biopsy of large bowel using a flexible<br />endoscope
          </h1>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '12px', 
            marginBottom: '12px' 
          }}>
            <span style={{ fontWeight: '500', fontSize: '14px', color: '#000', fontFamily: 'Roboto, sans-serif' }}>
              CPT Code 45380
            </span>
            <div style={{
              width: '16px',
              height: '16px',
              backgroundColor: '#4F4FAB',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}>
              <span style={{ color: 'white', fontSize: '11px', fontWeight: 'bold' }}>?</span>
            </div>
            <span style={{ fontSize: '14px', color: '#000', fontFamily: 'Roboto, sans-serif' }}>
              New York, NY 10036
            </span>
          </div>
          <div style={{ display: 'flex', gap: '16px' }}>
            <button style={{
              background: 'none',
              border: 'none',
              color: '#1A73E8',
              fontSize: '14px',
              textDecoration: 'underline',
              cursor: 'pointer',
              padding: 0,
              fontFamily: 'Roboto, sans-serif'
            }}>
              Search Again
            </button>
            <button style={{
              background: 'none',
              border: 'none',
              color: '#1A73E8',
              fontSize: '14px',
              textDecoration: 'underline',
              cursor: 'pointer',
              padding: 0,
              fontFamily: 'Roboto, sans-serif'
            }}>
              Print
            </button>
          </div>
        </div>

        {/* Right Side - Range Sliders with Values */}
        <div style={{ display: 'flex', gap: '30px', alignItems: 'flex-start' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {/* Out-of-Network Range */}
            <div style={{ width: '410px', position: 'relative' }}>
              <div style={{ 
                fontSize: '14px', 
                fontWeight: 600, 
                marginBottom: '8px',
                color: '#000',
                fontFamily: 'Roboto, sans-serif'
              }}>
                Out-of-Network Range
              </div>
              <div style={{ position: 'relative', marginBottom: '4px' }}>
                <div style={{ height: '36px', display: 'flex', alignItems: 'center', position: 'relative' }}>
                  {/* Left Arrow */}
                  <button 
                    onClick={() => moveSlider('out', -1)}
                    style={{
                      position: 'absolute',
                      left: '0px',
                      width: '26px',
                      height: '26px',
                      background: 'transparent',
                      border: 'none',
                      cursor: outOfNetworkPercentile === 50 ? 'not-allowed' : 'pointer',
                      opacity: outOfNetworkPercentile === 50 ? 0.3 : 1,
                      padding: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      zIndex: 2
                    }}
                    disabled={outOfNetworkPercentile === 50}
                  >
                    <svg width="23" height="23" viewBox="0 0 23 23">
                      <g transform="scale(-1, 1) translate(-23, 0)">
                        <path d="M20.184,22.104 L1.896,22.104 C0.839976,22.104 -2.4e-05,21.240024 -2.4e-05,20.207976 L-2.4e-05,1.895976 C-2.4e-05,0.839952 0.863952,-4.8e-05 1.896,-4.8e-05 L20.208,-4.8e-05 C21.264024,-4.8e-05 22.104024,0.863928 22.104024,1.895976 L22.104024,20.207976 C22.104024,21.239928 21.239952,22.104 20.183952,22.104 L20.184,22.104 Z M5.615976,5.616 L5.615976,16.512 C5.615976,17.015976 6.168024,17.328024 6.599976,17.088024 L16.055976,11.640024 C16.488,11.400024 16.488,10.752048 16.055976,10.512048 L6.575976,5.040048 C6.143952,4.800048 5.615976,5.1120792 5.615976,5.616072 L5.615976,5.616 Z" 
                          fill="#CCC9D8"/>
                      </g>
                    </svg>
                  </button>

                  {/* Colored Bar with Values */}
                  <div style={{ 
                    backgroundColor: '#007CA3',
                    height: '36px',
                    width: '350px',
                    margin: '0 30px',
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    color: 'white',
                    fontSize: '13px',
                    fontWeight: 500,
                    fontFamily: 'Roboto, sans-serif'
                  }}>
                    {/* White dollar values at each percentile */}
                    <span style={{ position: 'absolute', left: '10px' }}>
                      {formatCurrency(outNetworkData[50])}
                    </span>
                    <span style={{ 
                      position: 'absolute',
                      left: '25%',
                      transform: 'translateX(-50%)'
                    }}>
                      {formatCurrency(outNetworkData[60])}
                    </span>
                    <span style={{ 
                      position: 'absolute',
                      left: '50%',
                      transform: 'translateX(-50%)'
                    }}>
                      {formatCurrency(outNetworkData[70])}
                    </span>
                    <span style={{ 
                      position: 'absolute',
                      left: '75%',
                      transform: 'translateX(-50%)'
                    }}>
                      {formatCurrency(outNetworkData[80])}
                    </span>
                    <span style={{ position: 'absolute', right: '10px' }}>
                      {formatCurrency(outNetworkData[90])}
                    </span>

                    {/* Current Value Highlight */}
                    <span style={{ 
                      position: 'absolute',
                      backgroundColor: 'white',
                      color: '#000',
                      fontSize: '15px',
                      fontWeight: 'bold',
                      padding: '2px 8px',
                      left: outOfNetworkPercentile === 50 ? '10%' : 
                            outOfNetworkPercentile === 90 ? '90%' : 
                            `${getPosition(outOfNetworkPercentile)}%`,
                      transform: 'translateX(-50%)',
                      zIndex: 5,
                      whiteSpace: 'nowrap',
                      transition: 'left 0.2s ease-out'
                    }}>
                      {formatCurrency(outNetworkData[outOfNetworkPercentile])}
                    </span>
                  </div>

                  {/* Right Arrow */}
                  <button 
                    onClick={() => moveSlider('out', 1)}
                    style={{
                      position: 'absolute',
                      right: '0px',
                      width: '26px',
                      height: '26px',
                      background: 'transparent',
                      border: 'none',
                      cursor: outOfNetworkPercentile === 90 ? 'not-allowed' : 'pointer',
                      opacity: outOfNetworkPercentile === 90 ? 0.3 : 1,
                      padding: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      zIndex: 2
                    }}
                    disabled={outOfNetworkPercentile === 90}
                  >
                    <svg width="23" height="23" viewBox="0 0 23 23">
                      <path d="M20.184,22.104 L1.896,22.104 C0.839976,22.104 -2.4e-05,21.240024 -2.4e-05,20.207976 L-2.4e-05,1.895976 C-2.4e-05,0.839952 0.863952,-4.8e-05 1.896,-4.8e-05 L20.208,-4.8e-05 C21.264024,-4.8e-05 22.104024,0.863928 22.104024,1.895976 L22.104024,20.207976 C22.104024,21.239928 21.239952,22.104 20.183952,22.104 L20.184,22.104 Z M5.615976,5.616 L5.615976,16.512 C5.615976,17.015976 6.168024,17.328024 6.599976,17.088024 L16.055976,11.640024 C16.488,11.400024 16.488,10.752048 16.055976,10.512048 L6.575976,5.040048 C6.143952,4.800048 5.615976,5.1120792 5.615976,5.616072 L5.615976,5.616 Z" 
                        fill="#CCC9D8"/>
                    </svg>
                  </button>
                </div>

                {/* Percentile Labels */}
                <div style={{ position: 'relative', height: '25px', margin: '0 30px', width: '350px' }}>
                  {percentiles.map(p => (
                    <span 
                      key={p}
                      onClick={() => setOutOfNetworkPercentile(p)}
                      role="button"
                      style={{ 
                        position: 'absolute',
                        fontSize: '12px', 
                        fontWeight: 500, 
                        color: '#000', 
                        transform: 'translateX(-50%)', 
                        top: '3px', 
                        left: `${getPosition(p)}%`,
                        padding: '3px 5px',
                        cursor: 'pointer',
                        userSelect: 'none',
                        fontFamily: 'Roboto, sans-serif'
                      }}
                    >
                      {p}th
                    </span>
                  ))}
                  <div style={{ 
                    position: 'absolute',
                    top: 0,
                    backgroundColor: '#ffeb99',
                    padding: '2px 8px',
                    fontSize: '13px',
                    fontWeight: 700,
                    color: '#000',
                    userSelect: 'none',
                    zIndex: 10,
                    transform: 'translateX(-50%)',
                    left: `${getPosition(outOfNetworkPercentile)}%`,
                    transition: 'left 0.2s ease-out',
                    pointerEvents: 'none',
                    fontFamily: 'Roboto, sans-serif'
                  }}>
                    {outOfNetworkPercentile}th
                  </div>
                </div>
              </div>
            </div>

            {/* In-Network Range */}
            <div style={{ width: '410px', position: 'relative' }}>
              <div style={{ 
                fontSize: '14px', 
                fontWeight: 600, 
                marginBottom: '8px',
                color: '#000',
                fontFamily: 'Roboto, sans-serif'
              }}>
                In Network Range
              </div>
              <div style={{ position: 'relative', marginBottom: '4px' }}>
                <div style={{ height: '36px', display: 'flex', alignItems: 'center', position: 'relative' }}>
                  {/* Left Arrow */}
                  <button 
                    onClick={() => moveSlider('in', -1)}
                    style={{
                      position: 'absolute',
                      left: '0px',
                      width: '26px',
                      height: '26px',
                      background: 'transparent',
                      border: 'none',
                      cursor: inNetworkPercentile === 50 ? 'not-allowed' : 'pointer',
                      opacity: inNetworkPercentile === 50 ? 0.3 : 1,
                      padding: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      zIndex: 2
                    }}
                    disabled={inNetworkPercentile === 50}
                  >
                    <svg width="23" height="23" viewBox="0 0 23 23">
                      <g transform="scale(-1, 1) translate(-23, 0)">
                        <path d="M20.184,22.104 L1.896,22.104 C0.839976,22.104 -2.4e-05,21.240024 -2.4e-05,20.207976 L-2.4e-05,1.895976 C-2.4e-05,0.839952 0.863952,-4.8e-05 1.896,-4.8e-05 L20.208,-4.8e-05 C21.264024,-4.8e-05 22.104024,0.863928 22.104024,1.895976 L22.104024,20.207976 C22.104024,21.239928 21.239952,22.104 20.183952,22.104 L20.184,22.104 Z M5.615976,5.616 L5.615976,16.512 C5.615976,17.015976 6.168024,17.328024 6.599976,17.088024 L16.055976,11.640024 C16.488,11.400024 16.488,10.752048 16.055976,10.512048 L6.575976,5.040048 C6.143952,4.800048 5.615976,5.1120792 5.615976,5.616072 L5.615976,5.616 Z" 
                          fill="#CCC9D8"/>
                      </g>
                    </svg>
                  </button>

                  {/* Colored Bar with Values */}
                  <div style={{ 
                    backgroundColor: '#D63D0A',
                    height: '36px',
                    width: '350px',
                    margin: '0 30px',
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    color: 'white',
                    fontSize: '13px',
                    fontWeight: 500,
                    fontFamily: 'Roboto, sans-serif'
                  }}>
                    {/* White dollar values at each percentile */}
                    <span style={{ position: 'absolute', left: '10px' }}>
                      {formatCurrency(inNetworkData[50])}
                    </span>
                    <span style={{ 
                      position: 'absolute',
                      left: '25%',
                      transform: 'translateX(-50%)'
                    }}>
                      {formatCurrency(inNetworkData[60])}
                    </span>
                    <span style={{ 
                      position: 'absolute',
                      left: '50%',
                      transform: 'translateX(-50%)'
                    }}>
                      {formatCurrency(inNetworkData[70])}
                    </span>
                    <span style={{ 
                      position: 'absolute',
                      left: '75%',
                      transform: 'translateX(-50%)'
                    }}>
                      {formatCurrency(inNetworkData[80])}
                    </span>
                    <span style={{ position: 'absolute', right: '10px' }}>
                      {formatCurrency(inNetworkData[90])}
                    </span>

                    {/* Current Value Highlight */}
                    <span style={{ 
                      position: 'absolute',
                      backgroundColor: 'white',
                      color: '#000',
                      fontSize: '15px',
                      fontWeight: 'bold',
                      padding: '2px 8px',
                      left: inNetworkPercentile === 50 ? '10%' : 
                            inNetworkPercentile === 90 ? '90%' : 
                            `${getPosition(inNetworkPercentile)}%`,
                      transform: 'translateX(-50%)',
                      zIndex: 5,
                      whiteSpace: 'nowrap',
                      transition: 'left 0.2s ease-out'
                    }}>
                      {formatCurrency(inNetworkData[inNetworkPercentile])}
                    </span>
                  </div>

                  {/* Right Arrow */}
                  <button 
                    onClick={() => moveSlider('in', 1)}
                    style={{
                      position: 'absolute',
                      right: '0px',
                      width: '26px',
                      height: '26px',
                      background: 'transparent',
                      border: 'none',
                      cursor: inNetworkPercentile === 90 ? 'not-allowed' : 'pointer',
                      opacity: inNetworkPercentile === 90 ? 0.3 : 1,
                      padding: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      zIndex: 2
                    }}
                    disabled={inNetworkPercentile === 90}
                  >
                    <svg width="23" height="23" viewBox="0 0 23 23">
                      <path d="M20.184,22.104 L1.896,22.104 C0.839976,22.104 -2.4e-05,21.240024 -2.4e-05,20.207976 L-2.4e-05,1.895976 C-2.4e-05,0.839952 0.863952,-4.8e-05 1.896,-4.8e-05 L20.208,-4.8e-05 C21.264024,-4.8e-05 22.104024,0.863928 22.104024,1.895976 L22.104024,20.207976 C22.104024,21.239928 21.239952,22.104 20.183952,22.104 L20.184,22.104 Z M5.615976,5.616 L5.615976,16.512 C5.615976,17.015976 6.168024,17.328024 6.599976,17.088024 L16.055976,11.640024 C16.488,11.400024 16.488,10.752048 16.055976,10.512048 L6.575976,5.040048 C6.143952,4.800048 5.615976,5.1120792 5.615976,5.616072 L5.615976,5.616 Z" 
                        fill="#CCC9D8"/>
                    </svg>
                  </button>
                </div>

                {/* Percentile Labels */}
                <div style={{ position: 'relative', height: '25px', margin: '0 30px', width: '350px' }}>
                  {percentiles.map(p => (
                    <span 
                      key={p}
                      onClick={() => setInNetworkPercentile(p)}
                      role="button"
                      style={{ 
                        position: 'absolute',
                        fontSize: '12px', 
                        fontWeight: 500, 
                        color: '#000', 
                        transform: 'translateX(-50%)', 
                        top: '3px', 
                        left: `${getPosition(p)}%`,
                        padding: '3px 5px',
                        cursor: 'pointer',
                        userSelect: 'none',
                        fontFamily: 'Roboto, sans-serif'
                      }}
                    >
                      {p}th
                    </span>
                  ))}
                  <div style={{ 
                    position: 'absolute',
                    top: 0,
                    backgroundColor: '#ffeb99',
                    padding: '2px 8px',
                    fontSize: '13px',
                    fontWeight: 700,
                    color: '#000',
                    userSelect: 'none',
                    zIndex: 10,
                    transform: 'translateX(-50%)',
                    left: `${getPosition(inNetworkPercentile)}%`,
                    transition: 'left 0.2s ease-out',
                    pointerEvents: 'none',
                    fontFamily: 'Roboto, sans-serif'
                  }}>
                    {inNetworkPercentile}th
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div style={{
            maxWidth: '180px',
            fontSize: '13px',
            lineHeight: '1.5',
            color: '#000',
            fontFamily: 'Roboto, sans-serif'
          }}>
            The <strong>{outOfNetworkPercentile}th percentile</strong><br />
            represents the <strong>typical cost</strong>.<br />
            {outOfNetworkPercentile}% of doctors charge this<br />
            amount or less.
          </div>
        </div>
      </div>
    </div>
  );
};