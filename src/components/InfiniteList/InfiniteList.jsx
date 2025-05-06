import React, { useState, useEffect, useRef, useMemo } from 'react';
import Card from '../Card';
import Spinner from '../Spinner';

export default function InfiniteList({ items, searchTerm }) {
  const [visibleItems, setVisibleItems] = useState([]);
  const [chunkSize] = useState(10);
  const [currentChunk, setCurrentChunk] = useState(0);
  const [loading, setLoading] = useState(false);
  const loaderRef = useRef(null);

  const filteredItems = useMemo(() => {
    if (!searchTerm) {
      return items;
    }
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return items.filter(
      (item) =>
        item.mission_name &&
        item.mission_name.toLowerCase().includes(lowerCaseSearchTerm)
    );
  }, [items, searchTerm]);

  useEffect(() => {
    setCurrentChunk(0);
    setVisibleItems(filteredItems.slice(0, chunkSize));
  }, [filteredItems, chunkSize]);

  useEffect(() => {
    if (loading || visibleItems.length >= filteredItems.length) {
      if (loaderRef.current) {
        const observer = new IntersectionObserver(() => {});
        observer.unobserve(loaderRef.current);
      }
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          setLoading(true);

          const timer = setTimeout(() => {
            const nextChunk = currentChunk + 1;
            const startIndex = nextChunk * chunkSize;
            const endIndex = startIndex + chunkSize;

            const nextItems = filteredItems.slice(startIndex, endIndex);

            setVisibleItems((prev) => [...prev, ...nextItems]);

            setCurrentChunk(nextChunk);

            setLoading(false);
          }, 500);

          return () => clearTimeout(timer);
        }
      },
      { threshold: 1 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [currentChunk, filteredItems, chunkSize, loading, visibleItems.length]);

  const isEnd = visibleItems.length >= filteredItems.length;

  const containerStyles = {
    height: '400px',
    width: '400px',
    overflowY: 'auto',
    margin: '0 auto',
    border: '1px solid #eee',
    borderRadius: '8px',
  };

  const listItemStyles = {
    padding: '10px',
    borderBottom: '1px solid #eee',
    listStyle: 'none',
  };

  const loaderAreaStyles = {
    textAlign: 'center',
    padding: '10px',
    fontWeight: 'bold',
  };

  return (
    <div style={containerStyles}>
      <ul style={{ listStyle: 'none', paddingLeft: 0, margin: 0 }}>
        {visibleItems.map((item, i) => (
          <li key={item.flight_number || i} style={listItemStyles}>
            <Card item={item} />
          </li>
        ))}
      </ul>

      {!isEnd && (
        <div ref={loaderRef} style={loaderAreaStyles}>
          {loading ? <Spinner /> : 'Loading more...'}
        </div>
      )}

      {isEnd && filteredItems.length > 0 && (
        <div style={loaderAreaStyles}>End of results.</div>
      )}
      {isEnd && filteredItems.length === 0 && (
        <div style={loaderAreaStyles}>No results found.</div>
      )}
    </div>
  );
}
