// src/components/shared/RangeSlider.tsx
import React from 'react';

interface RangeSliderProps {
  label: string;
  value: number;
  onChange: (percentile: number) => void;
}

export const RangeSlider: React.FC<RangeSliderProps> = ({ label, value, onChange }) => {
  // Match these to the percentile options available in your app
  const percentiles = [50, 60, 70, 80, 90];

  const getCurrentIndex = () => percentiles.indexOf(value);

  const handlePercentileClick = (percentile: number) => {
    if (onChange) {
      onChange(percentile);
    }
  };

  const handlePrevious = () => {
    const currentIndex = getCurrentIndex();
    if (currentIndex > 0) {
      onChange(percentiles[currentIndex - 1]);
    }
  };

  const handleNext = () => {
    const currentIndex = getCurrentIndex();
    if (currentIndex < percentiles.length - 1) {
      onChange(percentiles[currentIndex + 1]);
    }
  };

  return (
    <div className="mb-3">
      <div className="text-sm text-gray-700 mb-2 font-medium">{label}</div>

      <div className="flex items-center gap-2">
        {/* Previous Arrow */}
        <button
          onClick={handlePrevious}
          disabled={getCurrentIndex() === 0}
          className="p-1 hover:bg-gray-100 rounded disabled:opacity-30 disabled:cursor-not-allowed transition-opacity"
          aria-label="Previous percentile"
        >
          <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
            <path
              d="M12 14L8 10L12 6"
              stroke="#666"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* Percentile Labels with Track */}
        <div className="flex flex-1 justify-between relative px-1">
          {/* Track line behind buttons */}
          <div
            className="absolute left-2 right-2 h-0.5 bg-gray-200"
            style={{ top: '50%', transform: 'translateY(-50%)' }}
          />

          {/* Percentile buttons */}
          {percentiles.map((percentile) => (
            <button
              key={percentile}
              onClick={() => handlePercentileClick(percentile)}
              className="relative z-10 px-2 py-0.5 text-xs font-semibold rounded transition-all"
              style={{
                backgroundColor: value === percentile ? '#ffeb99' : 'white',
                color: value === percentile ? '#333' : '#666',
                border: value === percentile ? '2px solid #f0d949' : '1px solid #d1d5db',
                boxShadow: value === percentile ? '0 2px 4px rgba(0,0,0,0.1)' : 'none',
                minWidth: '42px',
                transform: value === percentile ? 'scale(1.05)' : 'scale(1)',
              }}
            >
              {percentile}th
            </button>
          ))}
        </div>

        {/* Next Arrow */}
        <button
          onClick={handleNext}
          disabled={getCurrentIndex() === percentiles.length - 1}
          className="p-1 hover:bg-gray-100 rounded disabled:opacity-30 disabled:cursor-not-allowed transition-opacity"
          aria-label="Next percentile"
        >
          <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
            <path
              d="M8 14L12 10L8 6"
              stroke="#666"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};
