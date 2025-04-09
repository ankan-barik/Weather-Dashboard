import React from 'react';
import './RecentSearches.css'; // Make sure you have the corresponding CSS file

const RecentSearches = ({ searches, onSelectSearch, onClearSearches }) => {
  if (!searches || searches.length === 0) {
    return null;
  }

  return (
    <div className="recent-searches card">
      <div className="recent-searches-header">
        <h3>Recent Searches</h3>
        <button 
          className="clear-searches-btn"
          onClick={onClearSearches}
          aria-label="Clear all recent searches"
        >
          Clear All
        </button>
      </div>
      <ul className="recent-searches-list">
        {searches.map((search, index) => (
          <li key={`${search}-${index}`} className="recent-search-item">
            <button 
              className="recent-search-btn"
              onClick={() => onSelectSearch(search)}
            >
              {search}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentSearches;