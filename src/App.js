// React
import React from 'react';

// Custom Components
import ProfileCard from './components/ProfileCard/ProfileCard';

// Custom Styles
import './App.css';


function App() {
  return (
    <div className="app">
      <div className="overlay" />
      <div className="profileCardContainer gradient-border">
        <ProfileCard />
      </div>
    </div>
  );
}

export default App;
