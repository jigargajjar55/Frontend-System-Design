import { useEffect, useState, useRef, useCallback } from "react";
import "../App.css";

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

   // THE KEY CHANGE: A Callback Ref for the sentinel
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

      //Observe the new node
      if (node) {
        observer.current.observe(node);
      }
    },
    [isLoading, hasMore],
  );  // Re-create observer only when these change

  const fetchData = async (pageNumber) => {
    setIsLoading(true);

    try {
      const response = await new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve();
        }, 2000);
      });

      const newFetchItems = Array.from(
        { length: 10 },
        (_, index) => `Item ${pageNumber * 10 + index + 1}`,
      );

      if (itemList.length + newFetchItems.length >= 50) {
        setHasMore(false);
      }

      setItemList((prevItems) => [...prevItems, ...newFetchItems]);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (hasMore && !alreadyFetchedPages.current.has(page)) {
      alreadyFetchedPages.current.add(page);
      fetchData(page);
    }
  }, [page]);

  return (
    <div>
      <div style={{ display: "flex", flexDirection: "column", gap: "25px" }}>
        {itemList.map((item, index) => {
          return (
            <div
              key={`${item} - ${index}`}
              id={`${item} - ${index}`}
              className="card"
            >
              {item}
            </div>
          );
        })}
      </div>

      {hasMore ? (
        <div ref={lastElementRef} className="loadingSection">
          {isLoading && <div> Loading...</div>}
        </div>
      ) : (
        <div className="loadingSection">No more data</div>
      )}
    </div>
  );
};

export default InfiniteScroller;
