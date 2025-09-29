// src/components/cost-breakdown/MedianAverage.tsx
import React from 'react';
import { useCalculator } from '../../contexts/CalculatorContext';
import styles from '../../styles/components/MedianAverage.module.css';

export const MedianAverage = () => {
  const { outOfNetworkPercentile, inNetworkPercentile } = useCalculator();
  
  // Get values based on current percentiles
  const percentileValues = {
    50: { oon: 1819, in: 560 },
    60: { oon: 2090, in: 734 },
    70: { oon: 2361, in: 907 },
    80: { oon: 2826, in: 1605 },
    90: { oon: 4290, in: 2302 }
  };
  
  // Get current values with fallback to 70th percentile
  const currentOONValue = percentileValues[outOfNetworkPercentile]?.oon || percentileValues[70].oon;
  const currentINValue = percentileValues[inNetworkPercentile]?.in || percentileValues[70].in;
  
  return (
    <div className={styles.container}>
      {/* Median Box */}
      <div className={styles.metricBox}>
        <h3 className={styles.title}>Median</h3>
        <div className={styles.priceColumns}>
          <div className={styles.column}>
            <span className={styles.label}>Out-of-Network:</span>
            <span className={`${styles.price} ${styles.oon}`}>$6755</span>
          </div>
          <div className={styles.column}>
            <span className={styles.label}>In-Network:</span>
            <span className={`${styles.price} ${styles.in}`}>$2790</span>
          </div>
        </div>
      </div>
      
      {/* Average Box */}
      <div className={styles.metricBox}>
        <h3 className={styles.title}>Average</h3>
        <div className={styles.priceColumns}>
          <div className={styles.column}>
            <span className={styles.label}>Out-of-Network:</span>
            <span className={`${styles.price} ${styles.oon}`}>
              ${currentOONValue.toLocaleString()}
            </span>
          </div>
          <div className={styles.column}>
            <span className={styles.label}>In-Network:</span>
            <span className={`${styles.price} ${styles.in}`}>
              ${currentINValue.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};