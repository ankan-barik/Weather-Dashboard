import { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import LoadingSpinner from './components/LoadingSpinner';
import ForecastSection from './components/ForecastSection';
//import ForecastCard from './components/ForecastCard';
import RecentSearches from './components/RecentSearches';
import ThemeToggle from './components/ThemeToggle';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [recentSearches, setRecentSearches] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  const API_KEY = '2ef836536612fabaaac2990fc33ac7dc'; // Add your OpenWeatherMap API key here
  
  useEffect(() => {
    // Load recent searches from localStorage on component mount
    const savedSearches = localStorage.getItem('recentSearches');
    if (savedSearches) {
      setRecentSearches(JSON.parse(savedSearches));
    }
    
    // Load theme preference
    const savedTheme = localStorage.getItem('darkMode');
    if (savedTheme) {
      setDarkMode(JSON.parse(savedTheme));
    }
    
    // Load last searched city and fetch its weather if available
    const lastCity = localStorage.getItem('lastCity');
    if (lastCity) {
      setCity(lastCity);
      fetchWeatherData(lastCity);
    }
  }, []);
  
  useEffect(() => {
    // Apply dark mode class to body
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
    
    // Save theme preference
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const fetchWeatherData = async (searchCity) => {
    if (!searchCity.trim() || !API_KEY) {
      setError(API_KEY ? 'Please enter a city name' : 'Please add your API key in the App.jsx file');
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${API_KEY}&units=metric`
      );
      
      if (!response.ok) {
        throw new Error(
          response.status === 404
            ? 'City not found. Please check the spelling and try again.'
            : `Error ${response.status}: Failed to fetch weather data. Please try again later.`
        );
      }
      
      const data = await response.json();
      setWeatherData(data);
      
      // Update recent searches
      updateRecentSearches(searchCity);
      
      // Save last searched city
      localStorage.setItem('lastCity', searchCity);
      
    } catch (err) {
      setError(err.message);
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  const updateRecentSearches = (searchCity) => {
    const cityName = searchCity.trim();
    // Remove the city if it exists already to avoid duplicates
    const filteredSearches = recentSearches.filter(
      search => search.toLowerCase() !== cityName.toLowerCase()
    );
    
    // Add the new city at the beginning and keep only the last 5
    const updatedSearches = [cityName, ...filteredSearches].slice(0, 5);
    setRecentSearches(updatedSearches);
    
    // Save to localStorage
    localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
  };

  const handleSearch = (searchCity) => {
    setCity(searchCity);
    fetchWeatherData(searchCity);
  };
  
  const handleRecentSearch = (searchCity) => {
    setCity(searchCity);
    fetchWeatherData(searchCity);
  };
  
  const handleRefresh = () => {
    if (city) {
      fetchWeatherData(city);
    }
  };
  
  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };
  
  const renderErrorMessage = () => {
    if (!error) return null;
    
    return (
      <div className="error-message">
        <p>{error}</p>
      </div>
    );
  };

  return (
    <div className={`app-container ${darkMode ? 'dark-mode' : ''}`}>
      <div className="weather-background"></div>
      
      <header>
        <h1>Weather Dashboard</h1>
        <ThemeToggle darkMode={darkMode} toggleTheme={toggleTheme} />
      </header>
      
      <main>
        <SearchBar onSearch={handleSearch} />
        
        {loading && <LoadingSpinner />}
        
        {error && renderErrorMessage()}
        
        {weatherData && !loading && !error && (
          <WeatherCard 
            weatherData={weatherData} 
            onRefresh={handleRefresh} 
          />
        )}
        
        {weatherData && !loading && !error && (
          <ForecastSection 
            city={city}
            apiKey={API_KEY}
          />
        )}
        
        {recentSearches.length > 0 && (
          <RecentSearches 
            searches={recentSearches} 
            onSelectSearch={handleRecentSearch} 
          />
        )}
      </main>
      
      <footer>
        <p>Weather data provided by OpenWeatherMap</p>
        <p className="copyright">&copy; {new Date().getFullYear()} Weather Dashboard</p>
      </footer>
    </div>
  );
}

export default App;