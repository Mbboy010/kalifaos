'use client';

import ContractMessagesComponent from './ContractMessagesComponent';
import UserSummaryComponent from './UserSummaryComponent';
import ButtonList from './DownloadList';
import BarChart from './BarChart';
import Content from './Content';
import { useState, useEffect } from 'react';


// Placeholder data (replace with actual data from an API or state management)


const Home: React.FC = () => {
  const [greeting, setGreeting] = useState<string>('Welcome back');

  useEffect(() => {
    // Simulate dynamic greeting based on time (e.g., morning, afternoon, evening)
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good morning');
    else if (hour < 17) setGreeting('Good afternoon');
    else setGreeting('Good evening');
  }, []);

  return (
    <div className="min-h-screen  bg-gradient-to-br from-black/80 via-black/50 to-red-900/50">



      {/* Hero Section */}

      <BarChart />

      {/* Additional Dashboard Content (Placeholder) */}
      <Content />
      
      <ButtonList />
 
        <UserSummaryComponent />

      <ContractMessagesComponent />

    </div>
  );
};

export default Home;