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
      <ProfileCard />
    </div>
  );
}

export default App;
