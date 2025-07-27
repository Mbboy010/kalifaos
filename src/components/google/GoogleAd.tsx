import React, { useEffect } from 'react';

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

interface AdSenseProps {
  className?: string;
  style?: React.CSSProperties;
  'data-ad-client': string;
  'data-ad-slot': string;
  'data-ad-format'?: string;
  'data-full-width-responsive'?: string;
  [key: `data-${string}`]: string | undefined; // Allow other data attributes
}

const GoogleAd: React.FC<AdSenseProps> = ({
  className = 'adsbygoogle',
  style = { display: 'block' },
  ...rest
}) => {
  
  useEffect(() => {
    setTimeout(() =>{
      
    try {
      // Check if the adsbygoogle array exists and push an empty object
      // This triggers the ad loading for the ins tag in the component
      if (window.adsbygoogle) {
        window.adsbygoogle.push({});
      } else {
        console.warn('Google AdSense script not loaded.');
      }
    } catch (e) {
      console.error('Error loading AdSense ad:', e);
    }
    
    
    },3000)
    
    
  }, []); // Empty dependency array ensures this runs only once after initial render

  return (
    <ins
      className={className}
      style={style}
// //       {...rest}
    ></ins>
  );
};

export default GoogleAd;
