import React, { useEffect, useState } from 'react';
import './WeatherAnimations.css';

const WeatherAnimations = ({ weatherCondition, timeOfDay = 'day' }) => {
  const [elements, setElements] = useState([]);
  
  useEffect(() => {
    // Generate random elements based on weather condition
    generateElements(weatherCondition);
    
    // Regenerate elements when weather condition changes
    return () => {
      setElements([]);
    };
  }, [weatherCondition]);
  
  const generateElements = (condition) => {
    const conditionLower = condition?.toLowerCase() || 'clear';
    let newElements = [];
    
    if (conditionLower.includes('clear')) {
      // Create sun rays or stars
      const count = timeOfDay === 'day' ? 1 : 20;
      for (let i = 0; i < count; i++) {
        if (timeOfDay === 'day') {
          // One sun
          newElements.push({
            id: `sun-${i}`,
            style: {
              left: '15%',
              top: '20%',
              animationDelay: '0s'
            }
          });
        } else {
          // Multiple stars
          newElements.push({
            id: `star-${i}`,
            style: {
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 50}%`,
              animationDelay: `${Math.random() * 5}s`
            }
          });
        }
      }
    } else if (conditionLower.includes('cloud')) {
      // Create clouds
      const count = 5;
      for (let i = 0; i < count; i++) {
        newElements.push({
          id: `cloud-${i}`,
          style: {
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 40}%`,
            animationDuration: `${80 + Math.random() * 40}s`,
            opacity: 0.5 + Math.random() * 0.5,
            transform: `scale(${0.5 + Math.random()})`,
          }
        });
      }
    } else if (conditionLower.includes('rain')) {
      // Create raindrops
      const count = 50;
      for (let i = 0; i < count; i++) {
        newElements.push({
          id: `rain-${i}`,
          style: {
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: `${0.5 + Math.random()}s`
          }
        });
      }
    } else if (conditionLower.includes('snow')) {
      // Create snowflakes
      const count = 30;
      for (let i = 0; i < count; i++) {
        newElements.push({
          id: `snow-${i}`,
          style: {
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${5 + Math.random() * 10}s`,
            opacity: 0.7 + Math.random() * 0.3,
            transform: `scale(${0.2 + Math.random() * 0.8})`
          }
        });
      }
    } else if (conditionLower.includes('thunder')) {
      // Create lightning
      const count = 3;
      for (let i = 0; i < count; i++) {
        newElements.push({
          id: `lightning-${i}`,
          style: {
            left: `${20 + Math.random() * 60}%`,
            animationDelay: `${i * 3 + Math.random() * 5}s`
          }
        });
      }
    } else if (conditionLower.includes('mist') || conditionLower.includes('fog')) {
      // Create fog patches
      const count = 5;
      for (let i = 0; i < count; i++) {
        newElements.push({
          id: `fog-${i}`,
          style: {
            left: `${Math.random() * 100}%`,
            top: `${50 + Math.random() * 30}%`,
            opacity: 0.4 + Math.random() * 0.3,
            animationDuration: `${15 + Math.random() * 15}s`,
            transform: `scale(${1 + Math.random() * 2})`
          }
        });
      }
    }
    
    setElements(newElements);
  };
  
  // Render appropriate weather elements
  const renderWeatherElements = () => {
    const conditionLower = weatherCondition?.toLowerCase() || 'clear';
    
    if (conditionLower.includes('clear')) {
      if (timeOfDay === 'day') {
        return elements.map((el) => (
          <div key={el.id} className="sun" style={el.style}>
            <div className="sun-rays"></div>
          </div>
        ));
      } else {
        return elements.map((el) => (
          <div key={el.id} className="star" style={el.style}></div>
        ));
      }
    } else if (conditionLower.includes('cloud')) {
      return elements.map((el) => (
        <div key={el.id} className="cloud" style={el.style}></div>
      ));
    } else if (conditionLower.includes('rain')) {
      return elements.map((el) => (
        <div key={el.id} className="raindrop" style={el.style}></div>
      ));
    } else if (conditionLower.includes('snow')) {
      return elements.map((el) => (
        <div key={el.id} className="snowflake" style={el.style}></div>
      ));
    } else if (conditionLower.includes('thunder')) {
      return elements.map((el) => (
        <div key={el.id} className="lightning" style={el.style}></div>
      ));
    } else if (conditionLower.includes('mist') || conditionLower.includes('fog')) {
      return elements.map((el) => (
        <div key={el.id} className="fog" style={el.style}></div>
      ));
    }
    
    return null;
  };
  
  return (
    <div className={`weather-animation-container ${timeOfDay}-background`}>
      {renderWeatherElements()}
    </div>
  );
};

export default WeatherAnimations;