// src/LoadingDots.jsx

import React from 'react';

const OrbitingDotsSpinner = () => {
  return (
    <div className="flex items-center justify-center space-x-2 h-20">
      {[...Array(4)].map((_, i) => (
        <span
          key={i}
          className="w-2 h-2 rounded-full bg-blue-600"
          style={{
            animation: 'bounce 0.8s infinite ease-in-out',
            animationDelay: `${i * 0.3}s`,
          }}
        ></span>
      ))}
    </div>
  );
};

export default OrbitingDotsSpinner;
