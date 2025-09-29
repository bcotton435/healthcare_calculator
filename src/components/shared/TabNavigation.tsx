// src/components/shared/TabNavigation.tsx
import React from 'react';
import { useCalculator } from '../../contexts/CalculatorContext';
import styles from '../../styles/components/TabNavigation.module.css';

export const TabNavigation = () => {
  const { activeTab, setActiveTab } = useCalculator();
  
  const tabs = [
    { id: 'add-costs', label: 'Add Related Costs' },
    { id: 'oon-reimbursements', label: 'Out of Network Reimbursements' },
    { id: 'cost-calculator', label: 'Healthcare Cost Calculator' }
  ];
  
  return (
    <div className={styles.tabContainer}>
      {tabs.map(tab => (
        <button
          key={tab.id}
          className={`${styles.tabButton} ${activeTab === tab.id ? styles.active : ''}`}
          onClick={() => setActiveTab(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};