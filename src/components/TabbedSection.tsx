// src/components/TabbedSection.tsx
// Example of how to use TabNavigation with content panels

import React from 'react';
import { TabNavigation } from './shared/TabNavigation';
import { useCalculator } from '../contexts/CalculatorContext';
import { AddRelatedCostsContent } from './tabs/AddRelatedCostsContent';
import { OONReimbursementsContent } from './tabs/OONReimbursementsContent';
import { CostCalculatorContent } from './tabs/CostCalculatorContent';

export const TabbedSection: React.FC = () => {
  const { activeTab } = useCalculator();

  return (
    <div className="w-full bg-white">
      {/* Tab Navigation Header */}
      <TabNavigation />
      
      {/* Tab Content */}
      <div className="tab-content">
        {activeTab === 'add-costs' && <AddRelatedCostsContent />}
        {activeTab === 'oon-reimbursements' && <OONReimbursementsContent />}
        {activeTab === 'cost-calculator' && <CostCalculatorContent />}
      </div>
    </div>
  );
};

// Alternative: You could also use a switch statement or object mapping
export const TabbedSectionAlternative: React.FC = () => {
  const { activeTab } = useCalculator();
  
  const renderContent = () => {
    switch(activeTab) {
      case 'add-costs':
        return <AddRelatedCostsContent />;
      case 'oon-reimbursements':
        return <OONReimbursementsContent />;
      case 'cost-calculator':
        return <CostCalculatorContent />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full bg-white">
      <TabNavigation />
      {renderContent()}
    </div>
  );
};