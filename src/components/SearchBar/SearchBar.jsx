import React, { useState } from 'react';

export default function SearchBar({ apiData, setFilteredData }) {
  const [searchTerm, setSearchTerm] = useState('');

  function handleOnChange(e) {
    setSearchTerm(e.target.value);

    if (e.target.value) {
      const newFilteredData = apiData.filter(
        (item) =>
          item.mission_name &&
          item.mission_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredData(newFilteredData);
    } else {
      setFilteredData(apiData);
    }
  }

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
        onChange={handleOnChange}
        placeholder="Search..."
        style={searchInputStyles}
      />
    </div>
  );
}
