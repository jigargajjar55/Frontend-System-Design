import { useEffect, useState, useRef, useCallback, memo, useMemo } from "react";
import "../App.css";



// Memoized card component to prevent unnecessary re-renders
const ItemCard = memo(({ item, index }) => (
  <div key={`${item}-${index}`} id={`${item}-${index}`} className="card">
    {item}
  </div>
));

const InfiniteScroller = () => {
  const [itemList, setItemList] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);

  // Track fetched pages to handle StrictMode
  // Use useRef. Otherwise, this resets to new Set() on every render.
  const alreadyFetchedPages = useRef(new Set());

  // Ref for the observer to disconnect it properly
  const observer = useRef();

  // Memoized fetchData to prevent recreation and use in dependency arrays
  const fetchData = useCallback(async (pageNumber) => {
    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const newFetchItems = Array.from(
        { length: 10 },
        (_, index) => `Item ${pageNumber * 10 + index + 1}`,
      );

      setItemList((prevItems) => {
        const updatedList = [...prevItems, ...newFetchItems];
        // Check length of updated list, not stale itemList
        if (updatedList.length >= 50) {
          setHasMore(false);
        }
        return updatedList;
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // THE KEY CHANGE: A Callback Ref for the sentinel, now with stable refs
  const lastElementRef = useCallback(
    (node) => {
      // Don't observe if already loading
      if (isLoading) {
        return;
      }

      // Disconnect previous observer to avoid duplicates
      if (observer.current) {
        observer.current.disconnect();
      }

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });

      // Observe the new node
      if (node) {
        observer.current.observe(node);
      }
    },
    [], // Stable observer created once, refs handle latest state
  );

  useEffect(() => {
    if (hasMore && !alreadyFetchedPages.current.has(page)) {
      alreadyFetchedPages.current.add(page);
      fetchData(page);
    }
  }, [page, fetchData]);

  // Memoized item renderer to prevent re-render of individual cards
  const renderedItems = useMemo(
    () =>
      itemList.map((item, index) => (
        <ItemCard key={`${item}-${index}`} item={item} index={index} />
      )),
    [itemList],
  );

  // Memoized loading/empty section
  const loadingSection = useMemo(
    () =>
      hasMore ? (
        <div ref={lastElementRef} className="loadingSection">
          {isLoading && <div>Loading...</div>}
        </div>
      ) : (
        <div className="loadingSection">No more data</div>
      ),
    [hasMore, isLoading, lastElementRef],
  );

  return (
    <div style={{minHeight: "90vh", padding: "20px" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "25px" }}>
        {renderedItems}
      </div>
      {loadingSection}
    </div>
  );
};



export default InfiniteScroller;
