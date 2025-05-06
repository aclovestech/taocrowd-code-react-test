import React from 'react';
import './App.css';
import Spinner from './components/Spinner';
import { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import InfiniteList from './components/InfiniteList';

function App() {
  const [apiData, setApiData] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  function handleSearchChange(event) {
    setSearchTerm(event.target.value);
  }

  useEffect(() => {
    setIsFetching(true);
    fetch('https://api.spacexdata.com/v3/launches')
      .then((response) => response.json())
      .then((data) => {
        setApiData(data);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsFetching(false);
      });
  }, []);

  return (
    <div className="App">
      <SearchBar
        searchTerm={searchTerm}
        handleSearchChange={handleSearchChange}
      />
      {isFetching ? (
        <Spinner />
      ) : (
        <InfiniteList items={apiData} searchTerm={searchTerm} />
      )}
    </div>
  );
}

export default App;
