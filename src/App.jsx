import React from 'react';
import './App.css';
import Spinner from './components/Spinner';
import { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import InfiniteList from './components/InfiniteList';

function App() {
  const [apiData, setApiData] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    setIsFetching(true);
    fetch('https://api.spacexdata.com/v3/launches')
      .then((response) => response.json())
      .then((data) => {
        setApiData(data);
        setFilteredData(data);
      })
      .then(() => {
        setIsFetching(false);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    console.log(filteredData);
  }, [filteredData]);

  return (
    <div className="App">
      <SearchBar apiData={apiData} setFilteredData={setFilteredData} />
      {isFetching ? <Spinner /> : <InfiniteList items={filteredData} />}
    </div>
  );
}

export default App;
