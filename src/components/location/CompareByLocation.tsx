// src/components/location/CompareByLocation.tsx
import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { colors } from '../../lib/constants';
import { formatCurrency } from '../../lib/utils';

// Location icon component
const LocationIcon = () => (
  <svg width="24" height="24" viewBox="0 0 1200 1200" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '8px' }}>
    <path d="m197.11 448.55c0 246.14 280.36 567.24 402.89 705.79 122.53-138.56 402.89-459.66 402.89-705.79 0-222.52-180.37-402.89-402.89-402.89s-402.89 180.37-402.89 402.89zm402.89-194.72c172.87 0 260.06 210.05 137.68 332.39-122.39 122.39-332.39 35.203-332.39-137.68 0-107.53 87.188-194.72 194.72-194.72z" 
          fill="#362C67" 
          fillRule="evenodd"/>
  </svg>
);

// Remove icon component (grey circular X)
const RemoveIcon = () => (
  <svg 
    width="16" 
    height="16" 
    viewBox="0 0 1200 1200" 
    xmlns="http://www.w3.org/2000/svg"
    style={{ cursor: 'pointer' }}
  >
    <path 
      d="m600 0c-331.36 0-600 268.64-600 600s268.64 600 600 600 600-268.64 600-600-268.64-600-600-600zm220.4 719c18.762 18.801 29.281 44.16 29.281 70.762 0 26.602-10.559 51.961-29.281 70.719-18.762 18.801-44.16 29.281-70.719 29.281-26.559 0-51.961-10.602-70.719-29.281l-99.039-99-99.039 99c-18.762 18.762-44.16 29.281-70.719 29.281-26.559 0-51.961-10.52-70.719-29.281-18.84-18.762-29.281-44.16-29.281-70.719 0-26.559 10.559-51.961 29.281-70.762l99-99-99-99c-18.762-18.801-29.281-44.16-29.281-70.762-0.003906-26.598 10.637-51.918 29.355-70.68 18.762-18.801 44.16-29.281 70.719-29.281 26.559 0 51.961 10.602 70.719 29.281l99.039 99 99.039-99c18.762-18.762 44.16-29.281 70.719-29.281s51.961 10.52 70.719 29.281c18.84 18.762 29.281 44.16 29.281 70.719s-10.559 51.961-29.281 70.762l-99.074 98.961z"
      fill="#666666"
    />
  </svg>
);

// Question mark icon component with the new SVG
const QuestionIcon = () => (
  <svg 
    width="24" 
    height="24" 
    viewBox="0 0 63 63" 
    xmlns="http://www.w3.org/2000/svg"
    style={{ cursor: 'pointer' }}
  >
    <defs>
      <ellipse id="path-question-1" cx="27.5" cy="27.4013158" rx="27.5" ry="27.4013158"></ellipse>
      <filter x="-9.1%" y="-9.1%" width="125.5%" height="125.5%" filterUnits="objectBoundingBox" id="filter-question-2">
        <feOffset dx="2" dy="2" in="SourceAlpha" result="shadowOffsetOuter1"></feOffset>
        <feGaussianBlur stdDeviation="2" in="shadowOffsetOuter1" result="shadowBlurOuter1"></feGaussianBlur>
        <feColorMatrix values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.182426826 0" type="matrix" in="shadowBlurOuter1"></feColorMatrix>
      </filter>
    </defs>
    <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <g transform="translate(4, 4)">
        <g>
          <use fill="black" fillOpacity="1" filter="url(#filter-question-2)" xlinkHref="#path-question-1"></use>
          <use fill="#4F4FAB" fillRule="evenodd" xlinkHref="#path-question-1"></use>
        </g>
        <text 
          fontFamily="Roboto, sans-serif" 
          fontSize="47" 
          fontWeight="800" 
          letterSpacing="2.52914798" 
          fill="#FFFFFF"
        >
          <tspan x="16.9411765" y="44.375">?</tspan>
        </text>
      </g>
    </g>
  </svg>
);

export const CompareByLocation = () => {
  const [compareZips, setCompareZips] = useState([]);
  const [newZipInput, setNewZipInput] = useState('');
  const baseZip = '10036';

  // Sample zip code data
  const zipCodeData = {
    '10036': { avgInNetwork: 1850, avgOutOfNetwork: 3200 },
    '10001': { avgInNetwork: 1650, avgOutOfNetwork: 2950 },
    '10002': { avgInNetwork: 1750, avgOutOfNetwork: 3100 },
    '10003': { avgInNetwork: 1900, avgOutOfNetwork: 3350 },
    '10004': { avgInNetwork: 1700, avgOutOfNetwork: 3000 },
    '10005': { avgInNetwork: 1800, avgOutOfNetwork: 3150 },
    '10006': { avgInNetwork: 1600, avgOutOfNetwork: 2900 },
    '10007': { avgInNetwork: 1950, avgOutOfNetwork: 3400 },
    '10008': { avgInNetwork: 1550, avgOutOfNetwork: 2850 },
    '10009': { avgInNetwork: 1725, avgOutOfNetwork: 3050 }
  };

  const addZipCode = () => {
    const trimmedZip = newZipInput.trim();
    if (
      trimmedZip &&
      compareZips.length < 3 &&
      !compareZips.includes(trimmedZip) &&
      trimmedZip !== baseZip &&
      zipCodeData[trimmedZip]
    ) {
      setCompareZips([...compareZips, trimmedZip]);
      setNewZipInput('');
    }
  };

  const removeZipCode = (zipCode) => {
    setCompareZips(compareZips.filter(zip => zip !== zipCode));
  };

  const getChartData = () => {
    const selectedZips = [baseZip, ...compareZips];
    return selectedZips.map(zipCode => ({
      zipCode,
      'In-Network': zipCodeData[zipCode]?.avgInNetwork || 0,
      'Out-of-Network': zipCodeData[zipCode]?.avgOutOfNetwork || 0
    }));
  };

  const getAvailableZipCodes = () => {
    return Object.keys(zipCodeData).filter(
      zip => zip !== baseZip && !compareZips.includes(zip)
    );
  };

  const chartData = getChartData();

  return (
    <div style={{ backgroundColor: 'white', marginTop: 0 }}>
      <div style={{ padding: '4px 16px 16px 16px' }}>
        {/* Header */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          marginBottom: '12px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <LocationIcon />
            <h2 style={{ 
              fontSize: '20px',
              fontWeight: 600,
              color: colors.primary,
              margin: 0,
              fontFamily: 'Roboto, sans-serif'
            }}>
              Compare Costs by Location
            </h2>
          </div>
          <QuestionIcon />
        </div>

        {/* Description */}
        <p style={{ 
          fontSize: '16px', 
          color: '#000',
          fontFamily: 'Roboto, sans-serif',
          marginBottom: '20px',
          marginTop: 0
        }}>
          Compare procedure costs in <span style={{ fontWeight: 'bold' }}>zip code {baseZip}</span> with up to three other zip codes
        </p>

        {/* Zip Code Selection */}
        <div style={{ marginBottom: '16px' }}>
          {/* Display selected zip codes */}
          <div style={{ 
            display: 'flex',
            flexWrap: 'wrap',
            gap: '12px',
            marginBottom: '16px',
            padding: '8px 0'
          }}>
            {compareZips.map((zip) => (
              <div 
                key={zip} 
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: '#e0e7ff',
                  padding: '8px 14px',
                  borderRadius: '6px',
                  gap: '10px',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                }}
              >
                <span style={{ 
                  fontSize: '14px',
                  fontWeight: 500,
                  color: '#362C67',
                  fontFamily: 'Roboto, sans-serif'
                }}>
                  {zip}
                </span>
                <button
                  onClick={() => removeZipCode(zip)}
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'pointer'
                  }}
                  aria-label={`Remove ${zip}`}
                >
                  <RemoveIcon />
                </button>
              </div>
            ))}
          </div>

          {/* Add zip code input */}
          {compareZips.length < 3 && (
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <input
                type="text"
                value={newZipInput}
                onChange={(e) => setNewZipInput(e.target.value)}
                placeholder="Enter zip code..."
                style={{ 
                  fontSize: '14px', 
                  fontFamily: 'Roboto, sans-serif',
                  padding: '0 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '4px',
                  height: '40px',
                  width: '200px',
                  outline: 'none'
                }}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    addZipCode();
                  }
                }}
                maxLength={5}
              />
              <button
                onClick={addZipCode}
                disabled={!newZipInput.trim()}
                style={{
                  backgroundColor: !newZipInput.trim() ? '#a6d5a2' : '#187311',
                  color: '#fff',
                  fontSize: '14px',
                  fontWeight: '600',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '10px 24px',
                  height: '40px',
                  cursor: !newZipInput.trim() ? 'not-allowed' : 'pointer',
                  opacity: !newZipInput.trim() ? 0.7 : 1,
                  display: 'flex',
                  alignItems: 'center',
                  fontFamily: 'Roboto, sans-serif'
                }}
              >
                <Plus size={16} style={{ marginRight: '8px' }} />
                Compare
              </button>
            </div>
          )}

          {/* Available zip codes hint */}
          {getAvailableZipCodes().length > 0 && compareZips.length < 3 && (
            <div style={{ marginTop: '8px' }}>
              <p style={{ 
                fontSize: '12px',
                color: '#000',
                fontStyle: 'italic',
                fontFamily: 'Roboto, sans-serif',
                margin: 0
              }}>
                Available zip codes for testing: {getAvailableZipCodes().slice(0, 5).join(', ')}
                {getAvailableZipCodes().length > 5 && '...'}
              </p>
            </div>
          )}
        </div>

        {/* Chart Section */}
        {chartData.length > 0 && (
          <div style={{ marginTop: '24px' }}>
            <h3 style={{ 
              fontSize: '16px',
              fontWeight: 600,
              color: colors.primary,
              marginBottom: '16px',
              fontFamily: 'Roboto, sans-serif'
            }}>
              Average Procedure Costs by Zip Code
            </h3>
            <div style={{ width: '100%', height: '300px' }}>
              <ResponsiveContainer>
                <BarChart 
                  data={chartData} 
                  margin={{ top: 20, right: 30, left: 40, bottom: 40 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
                  <XAxis 
                    dataKey="zipCode" 
                    stroke="#000" 
                    fontSize={14}
                    angle={-45}
                    textAnchor="end"
                    height={60}
                    tick={{ fill: '#000' }}
                  />
                  <YAxis 
                    stroke="#000" 
                    fontSize={12} 
                    tickFormatter={(value) => `$${value.toLocaleString()}`}
                    tick={{ fill: '#000' }}
                  />
                  <Tooltip 
                    formatter={(value) => formatCurrency(value)}
                    contentStyle={{ 
                      backgroundColor: 'white',
                      border: '1px solid #e5e7eb',
                      borderRadius: '4px'
                    }}
                  />
                  <Bar 
                    dataKey="In-Network" 
                    fill={colors.red} 
                    name="Average In-Network"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar 
                    dataKey="Out-of-Network" 
                    fill={colors.secondaryTeal} 
                    name="Average Out-of-Network"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};