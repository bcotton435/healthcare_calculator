// src/contexts/CalculatorContext.tsx
import React, { createContext, useState, useContext } from 'react';

const CalculatorContext = createContext();

export const CalculatorProvider = ({ children }) => {
  // Tab Navigation
  const [activeTab, setActiveTab] = useState('add-costs');
  
  // UPDATED: Percentile state names to match Header.tsx
  const [currentOutPercentile, setCurrentOutPercentile] = useState(70);
  const [currentInPercentile, setCurrentInPercentile] = useState(70);
  
  // Add Related Costs Tab
  const [selectedCosts, setSelectedCosts] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Out of Network Reimbursements Tab
  const [facilityType, setFacilityType] = useState('ASC');
  const [addedProcedures, setAddedProcedures] = useState({
    anesthesia: false,
    pathology: false
  });
  const [reimbursementPercent, setReimbursementPercent] = useState(70);
  const [chargesPercentile] = useState(80); // Fixed value as per original
  
  // Cost Calculator Tab (3rd tab)
  const [reimbursementBasis, setReimbursementBasis] = useState('UCR');
  const [inNetworkPrice, setInNetworkPrice] = useState('');
  const [outOfNetworkPrice, setOutOfNetworkPrice] = useState('');
  const [deductibleAmount, setDeductibleAmount] = useState('');
  const [deductiblePaid, setDeductiblePaid] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [reimbursementExpanded, setReimbursementExpanded] = useState(false);
  
  // Compare by Location
  const [compareZips, setCompareZips] = useState([]);
  const [newZipInput, setNewZipInput] = useState('');
  const [baseZip] = useState('10036');
  
  // Utility functions that might need state
  const toggleCost = (costId) => {
    setSelectedCosts(prev => 
      prev.includes(costId) 
        ? prev.filter(id => id !== costId)
        : [...prev, costId]
    );
  };
  
  const addAllCosts = () => {
    // Assuming we have 3 related costs as per original
    setSelectedCosts([1, 2, 3]);
  };
  
  const toggleProcedure = (procedure) => {
    setAddedProcedures(prev => ({
      ...prev,
      [procedure]: !prev[procedure]
    }));
  };
  
  const addZipCode = (zipCode) => {
    const trimmedZip = zipCode.trim();
    if (trimmedZip && 
        compareZips.length < 3 && 
        !compareZips.includes(trimmedZip) && 
        trimmedZip !== baseZip) {
      setCompareZips([...compareZips, trimmedZip]);
      setNewZipInput('');
    }
  };
  
  const removeZipCode = (zipCode) => {
    setCompareZips(compareZips.filter(zip => zip !== zipCode));
  };
  
  const resetCalculator = () => {
    setReimbursementPercent(70);
    setReimbursementBasis('UCR');
    setReimbursementExpanded(false);
    setInNetworkPrice('');
    setOutOfNetworkPrice('');
    setDeductibleAmount('');
    setDeductiblePaid('');
    setShowResults(false);
  };
  
  const handleEstimateCosts = () => {
    if (inNetworkPrice || outOfNetworkPrice) {
      setShowResults(true);
    }
  };

  const value = {
    // Tab Navigation
    activeTab,
    setActiveTab,
    
    // UPDATED: Percentile states with new names
    currentOutPercentile,
    setCurrentOutPercentile,
    currentInPercentile,
    setCurrentInPercentile,
    
    // ALSO KEEP OLD NAMES for backward compatibility if needed
    outOfNetworkPercentile: currentOutPercentile,
    setOutOfNetworkPercentile: setCurrentOutPercentile,
    inNetworkPercentile: currentInPercentile,
    setInNetworkPercentile: setCurrentInPercentile,
    
    // Add Related Costs
    selectedCosts,
    setSelectedCosts,
    isExpanded,
    setIsExpanded,
    toggleCost,
    addAllCosts,
    
    // Out of Network Reimbursements
    facilityType,
    setFacilityType,
    addedProcedures,
    setAddedProcedures,
    reimbursementPercent,
    setReimbursementPercent,
    chargesPercentile,
    toggleProcedure,
    
    // Cost Calculator (3rd tab)
    reimbursementBasis,
    setReimbursementBasis,
    inNetworkPrice,
    setInNetworkPrice,
    outOfNetworkPrice,
    setOutOfNetworkPrice,
    deductibleAmount,
    setDeductibleAmount,
    deductiblePaid,
    setDeductiblePaid,
    showResults,
    setShowResults,
    isCollapsed,
    setIsCollapsed,
    reimbursementExpanded,
    setReimbursementExpanded,
    resetCalculator,
    handleEstimateCosts,
    
    // Compare by Location
    compareZips,
    setCompareZips,
    newZipInput,
    setNewZipInput,
    baseZip,
    addZipCode,
    removeZipCode
  };

  return (
    <CalculatorContext.Provider value={value}>
      {children}
    </CalculatorContext.Provider>
  );
};

// Export the useCalculator hook
export const useCalculator = () => {
  const context = useContext(CalculatorContext);
  if (!context) {
    throw new Error('useCalculator must be used within CalculatorProvider');
  }
  return context;
};