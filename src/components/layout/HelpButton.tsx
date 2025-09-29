import React from 'react';

export const HelpButton = () => {
  return (
    <button
      style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        zIndex: 1000,
        backgroundColor: '#4F4FAB',
        color: 'white',
        padding: '10px 20px',
        borderRadius: '6px',
        border: 'none',
        cursor: 'pointer',
        fontWeight: 'bold'
      }}
      onClick={() => console.log('Help clicked')}
    >
      Help
    </button>
  );
};