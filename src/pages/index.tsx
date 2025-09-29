// src/pages/index.tsx
import React from 'react';
import { CalculatorProvider } from '../contexts/CalculatorContext';
import { TabNavigation } from '../components/shared/TabNavigation';
import { useCalculator } from '../contexts/CalculatorContext';
import { OONReimbursementsContent } from '../components/tabs/OONReimbursementsContent';
import { CostCalculatorContent } from '../components/tabs/CostCalculatorContent';
import { MedianAverage } from '../components/cost-breakdown/MedianAverage';
import { AdditionalResources } from '../components/resources/AdditionalResources';
import { AddRelatedCostsContent } from '../components/tabs/AddRelatedCostsContent';
import { Header } from '../components/layout/Header';
import dynamic from 'next/dynamic';

// Dynamic import for CompareByLocation to avoid SSR issues with Recharts
const CompareByLocation = dynamic(
  () => import('../components/location/CompareByLocation').then(mod => mod.CompareByLocation),
  { ssr: false }
);

// Tabbed Section Component
const TabbedSection = () => {
  const { activeTab } = useCalculator();
  
  return (
    <div style={{ 
      background: 'white', 
      borderRadius: '0',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      marginBottom: '24px'
    }}>
      <TabNavigation />
      <div className="tab-content">
        {activeTab === 'add-costs' && <AddRelatedCostsContent />}
        {activeTab === 'oon-reimbursements' && <OONReimbursementsContent />}
        {activeTab === 'cost-calculator' && <CostCalculatorContent />}
      </div>
    </div>
  );
};

// Main Home Component
export default function Home() {
  return (
    <CalculatorProvider>
      <div style={{ backgroundColor: '#E6E9F8', fontFamily: 'Roboto, sans-serif', minHeight: '100vh', padding: '26px' }}>
        <div className="max-w-7xl mx-auto">
          {/* Header with percentile range sliders */}
          <Header />
          
          {/* Main content area with sidebar */}
          <div className="flex gap-6">
            {/* Left column - Main content */}
            <div className="flex-1">
              {/* Median and Average boxes - should appear right after Header */}
              <MedianAverage />
              
              {/* Tabbed section with three tabs */}
              <TabbedSection />
              
              {/* Compare by Location chart */}
              <div style={{ 
                background: 'white', 
                padding: '24px',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                marginBottom: '24px'
              }}>
                <CompareByLocation />
              </div>
            </div>
            
            {/* Right column - Sidebar with 26px gap */}
            <div style={{ width: '260px', marginLeft: '26px', marginTop: '-26px' }}>
              <AdditionalResources />
            </div>
          </div>
        </div>
      </div>
    </CalculatorProvider>
  );
}