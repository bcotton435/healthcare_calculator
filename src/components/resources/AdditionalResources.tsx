// src/components/resources/AdditionalResources.tsx
import React from 'react';
import { colors } from '../../lib/constants';

// Map Icon Component
const MapIcon = () => (
  <svg width="28" height="28" viewBox="0 0 1200 1200" xmlns="http://www.w3.org/2000/svg">
    <path d="m702.56 110.42c-5.8633-3.3438-11.973-6.2266-18.281-8.625-26.734-10.879-55.426-16.121-84.281-15.395-36.398-1.3594-72.469 7.3086-104.27 25.055-31.809 17.75-58.125 43.898-76.078 75.586-17.953 31.691-26.855 67.707-25.73 104.11 2.3633 81.488 54.375 156.98 100.55 222.52 28.125 39.711 58.238 78.883 90.113 115.97 4.9492 6 10.18 12.02 15.414 18.02v0.003906c67.438-73.516 125.51-155.1 172.89-242.89 20.309-35.207 31.754-74.828 33.355-115.44 0.019531-36.316-9.5586-71.988-27.77-103.41-18.207-31.418-44.398-57.465-75.918-75.504zm21.188 194.06c-7.7148 40.297-34.559 74.316-71.957 91.195-37.395 16.875-80.664 14.496-115.99-6.3789-35.32-20.875-58.27-57.633-61.523-98.531-3.25-40.902 13.609-80.824 45.188-107.02 26.809-22.254 61.633-32.418 96.203-28.078 34.57 4.3438 65.805 22.801 86.277 50.992 20.477 28.191 28.367 63.598 21.801 97.816z" fill="#362C67"/>
    <path d="m116.02 505.73c-6.6289 2.9453-12.262 7.75-16.215 13.836-3.957 6.082-6.0586 13.184-6.0586 20.438v517.91c0 12.691 6.418 24.523 17.062 31.445 10.641 6.918 24.062 7.9805 35.664 2.8281l266.02-118.24v-516.07c-13.281-21.926-24.82-44.859-34.52-68.586z" fill="#362C67"/>
    <path d="m599.66 704.57-28.125-32.324c-5.418-6.2266-10.82-12.469-15.977-18.75-30-34.836-60.957-74.758-91.875-118.12-4.4453-6.3203-9.1133-12.977-13.82-19.762v458.34l300 133.35v-590.79c-37.129 54.66-77.883 106.77-121.98 155.98z" fill="#362C67"/>
    <path d="m1053.5 389.06-267.58 118.93v600l298.03-132.47c6.6289-2.9453 12.262-7.75 16.215-13.836 3.957-6.082 6.0586-13.184 6.0586-20.438v-517.91c0-12.691-6.418-24.523-17.062-31.445-10.641-6.918-24.062-7.9805-35.664-2.8281z" fill="#362C67"/>
  </svg>
);

// Book Icon Component
const BookIcon = () => (
  <svg width="28" height="28" viewBox="0 0 1200 1200" xmlns="http://www.w3.org/2000/svg">
    <path d="m297.84 805.55c103.45 0 202.08 43.078 272.16 118.45 0.14062 0 0.14062 0 0.14062 0.14062 2.0156 2.0156 4.0781 4.1719 5.8594 6.3281v-586.22c-16.219-27.469-36.141-53.062-59.391-76.219-73.078-73.219-170.39-113.53-273.94-113.53h-30v659.06l34.078-4.5469c16.875-2.3906 34.031-3.4688 51.094-3.4688z" fill={colors.primary}/>
    <path d="m902.16 805.55c17.062 0 34.219 1.0781 51.141 3.375l34.078 4.6875v-659.06h-30c-103.55 0-200.86 40.312-273.84 113.39-23.297 23.156-43.219 48.844-59.531 76.312v586.22c1.9219-2.1562 3.8438-4.3125 6-6.4688 70.078-75.375 168.71-118.45 272.16-118.45z" fill={colors.primary}/>
  </svg>
);

// Provider Icon Component
const ProviderIcon = () => (
  <svg width="28" height="28" viewBox="0 0 1200 1200" xmlns="http://www.w3.org/2000/svg" style={{ fill: colors.primary }}>
    <path d="m792 933.37c0 20.25 16.5 36.516 36.75 36.516s36.75-16.266 36.75-36.516c0-20.016-16.5-36.516-36.75-36.516s-36.75 16.5-36.75 36.516z"/>
    <path d="m816.24 689.63h-7.7344l-5.4375 4.3594c22.688 35.953 35.062 77.109 35.062 119.81v65.344h0.14062c26.016 4.2656 45.984 27.234 45.984 54.234 0 30.516-24.984 55.266-55.5 55.266-30.75 0-55.5-24.75-55.5-55.266 0-27.188 19.969-49.922 46.125-54.234v-65.344c0-38.391-11.016-75.328-31.078-107.95l-185.58 149.06-175.13-140.68c-13.875 25.172-22.734 52.547-25.359 80.391 53.766 5.0156 96 50.484 96 105.23v88.734h-51.75c-5.25 0-9.5156-3.9844-9.5156-9.2344s4.2656-9.5156 9.5156-9.5156h33v-69.984c0-44.766-34.266-81.75-78-86.484-3.2344-0.23438-6.2344-0.51562-9.5156-0.51562-3 0-6.2344 0.23438-9.2344 0.51562-43.734 4.5-78 41.484-78 86.484v69.984h33c5.0156 0 9.2344 4.2656 9.2344 9.5156s-4.2656 9.2344-9.2344 9.2344h-51.75v-88.734c0-55.266 42.984-101.02 97.5-105.23 2.7656-32.25 12.844-63.703 29.203-92.344l-15.703-12.609h-13.266c-80.484 0-145.74 65.016-145.74 144.98v307.5h723.98v-307.5c0.046875-80.016-65.203-145.03-145.74-145.03z"/>
    <path d="m348.74 656.39h150.74l-76.266 30.234 16.734 13.266 162.74 131.02 162.74-131.02 16.734-13.5-76.266-30h145.26l1.7344-7.5c3-13.734 75.234-341.02-54.516-503.48-46.266-57.984-113.25-87.516-198.52-87.516s-152.26 29.484-198.52 87.516c-129.74 162.52-57.516 489.74-54.516 503.48zm39.75-388.26c1.5-8.7656 6.2344-16.5 13.5-21.75 7.2656-5.25 16.266-6.9844 24.984-5.4844 13.5 2.4844 27.75 3.9844 42 4.5 77.484 2.25 139.5-29.25 177.98-55.734 15.75-11.484 37.734-9.5156 51.984 4.5 5.7656 5.7656 12 10.734 18.75 15.516 18.234 12.234 39.516 19.734 63 21.984 14.766 1.5 26.25 12.516 29.016 27.234 3.5156 17.766 5.0156 36 5.0156 54.234 0 99.984-49.734 189.74-127.74 229.74-1.7344 1.2656-3.5156 2.0156-5.4844 3-4.2656 2.25-8.7656 4.2656-13.266 5.7656-21.516 9-44.484 13.266-68.25 13.266-21.75 0-42.984-3.75-62.766-11.016-5.0156-1.7344-9.9844-3.75-14.766-6-80.484-36.516-137.48-128.02-137.48-234.74 0-15 1.2656-30 3.5156-45z"/>
  </svg>
);

export const AdditionalResources: React.FC = () => {
  return (
    <div style={{ width: '260px' }}>
      {/* Top padding bar */}
      <div style={{ 
        backgroundColor: '#E6E9F9',
        height: '32px',
        width: '100%'
      }}></div>
      
      {/* Main content */}
      <div style={{ 
        backgroundColor: '#F1F2FB',
        padding: '20px',
        textAlign: 'center'
      }}>
        <h2 style={{ 
          color: '#2c2362',
          fontSize: '1.1rem',
          marginBottom: '20px',
          lineHeight: 1.4,
          fontWeight: 'bold'
        }}>
          Additional Resources
        </h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          {/* Local Price Comparison */}
          <div>
            <div style={{
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 0'
            }}>
              <MapIcon />
            </div>
            <h3 style={{ 
              margin: '10px 0 4px',
              color: colors.primary,
              fontSize: '1rem',
              lineHeight: 1.3,
              fontWeight: '600'
            }}>
              Local Price Comparison
            </h3>
            <p style={{ 
              fontSize: '0.85rem',
              color: '#333',
              margin: '0 0 8px',
              lineHeight: 1.5
            }}>
              Detailed cost estimates in surrounding zip codes on a map view
            </p>
            <button 
              className="font-medium underline" 
              style={{ 
                fontSize: '16px', 
                color: '#1A73E8',
                background: 'none',
                border: 'none',
                cursor: 'pointer'
              }}
              onClick={() => console.log('View Map clicked')}
            >
              View Map
            </button>
          </div>
          
          {/* Learn */}
          <div>
            <div style={{
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 0'
            }}>
              <BookIcon />
            </div>
            <h3 style={{ 
              margin: '10px 0 4px',
              color: colors.primary,
              fontSize: '1rem',
              lineHeight: 1.3,
              fontWeight: '600'
            }}>
              Learn
            </h3>
            <p style={{ 
              fontSize: '0.85rem',
              color: '#333',
              margin: '0 0 15px',
              lineHeight: 1.5
            }}>
              Find Articles, Questions to Ask, Toolkits and Printable Checklists
            </p>
            <button 
              className="font-medium underline" 
              style={{ 
                fontSize: '16px', 
                color: '#1A73E8',
                background: 'none',
                border: 'none',
                cursor: 'pointer'
              }}
              onClick={() => console.log('Learn More clicked')}
            >
              Learn More
            </button>
          </div>
          
          {/* Find a Provider */}
          <div>
            <div style={{
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 10px'
            }}>
              <ProviderIcon />
            </div>
            <h3 style={{ 
              margin: '10px 0 4px',
              color: colors.primary,
              fontSize: '1rem',
              lineHeight: 1.3,
              fontWeight: '600'
            }}>
              Find a Provider
            </h3>
            <p style={{ 
              fontSize: '0.85rem',
              color: '#333',
              margin: '0 0 15px',
              lineHeight: 1.5
            }}>
              Search in your zip code by price, gender and specialty on a map view
            </p>
            <button 
              className="font-medium underline" 
              style={{ 
                fontSize: '16px', 
                color: '#1A73E8',
                background: 'none',
                border: 'none',
                cursor: 'pointer'
              }}
              onClick={() => console.log('Search clicked')}
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};