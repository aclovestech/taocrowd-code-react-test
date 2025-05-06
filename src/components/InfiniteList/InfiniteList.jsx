import React, { useState, useEffect, useRef } from 'react';
import Card from '../Card';
import Spinner from '../Spinner';

export default function InfiniteList({ items }) {
  const [visibleItems, setVisibleItems] = useState([]);
  const [chunkSize] = useState(10);
  const [currentChunk, setCurrentChunk] = useState(0);
  const [loading, setLoading] = useState(false); // <-- Add loading state
  const loaderRef = useRef(null);

  // Load first chunk on mount
  useEffect(() => {
    setVisibleItems(items.slice(0, chunkSize));
  }, [items, chunkSize]); // <-- Added chunkSize dependency

  // Load more chunks when loader is visible
  useEffect(() => {
    // Prevent observing if already loading or at the end
    if (loading || currentChunk * chunkSize >= items.length) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        // Check if the loader is visible and we are not already loading
        if (entries[0].isIntersecting && !loading) {
          setLoading(true); // <-- Start loading

          // --- Add a delay here ---
          const timer = setTimeout(() => {
            const nextChunk = currentChunk + 1;
            const nextItems = items.slice(
              nextChunk * chunkSize,
              (nextChunk + 1) * chunkSize
            );

            setVisibleItems((prev) => [...prev, ...nextItems]);
            setCurrentChunk(nextChunk);
            setLoading(false); // <-- End loading after delay
          }, 500); // <-- Adjust delay time (in milliseconds) as needed

          // Cleanup the timer if the component unmounts or dependencies change
          return () => clearTimeout(timer);
        }
      },
      { threshold: 1 } // Trigger when the entire loader element is visible
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      // Cleanup the observer
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
    // Added loading to the dependency array
  }, [currentChunk, items, chunkSize, loading]);

  // Check if we have displayed all items
  const isEnd = visibleItems.length >= items.length; // <-- Check visibleItems length

  return (
    <div
      style={{
        height: '400px',
        width: '400px',
        overflowY: 'auto',
        margin: '0 auto',
      }}
    >
      <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
        {visibleItems.map((item, i) => (
          <li
            key={i} // Using index as key is okay here since list order is stable on append
            style={{ padding: '10px', borderBottom: '1px solid #eee' }}
          >
            <Card item={item} />
          </li>
        ))}
      </ul>

      {/* Show spinner if not at the end AND loading */}
      {/* The loaderRef div is always present when not at the end */}
      {!isEnd && (
        <div ref={loaderRef} style={{ textAlign: 'center', padding: '10px' }}>
          {loading ? <Spinner /> : 'Loading more...'}{' '}
          {/* Or just keep the Spinner */}
        </div>
      )}

      {/* Show end message if at the end */}
      {isEnd && (
        <div
          style={{ textAlign: 'center', padding: '10px', fontWeight: 'bold' }}
        >
          End of list.
        </div>
      )}
    </div>
  );
}
