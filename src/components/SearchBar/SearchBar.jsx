import React from 'react';

export default function SearchBar({ searchTerm, handleSearchChange }) {
  const searchInputStyles = {
    width: '100%',
    padding: '10px 15px',
    border: '1px solid #ccc',
    borderRadius: '20px',
    fontSize: '1rem',
    boxSizing: 'border-box',
    outline: 'none',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff',
  };

  return (
    <div style={{ margin: '20px auto', width: '400px' }}>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search..."
        style={searchInputStyles}
      />
    </div>
  );
}
