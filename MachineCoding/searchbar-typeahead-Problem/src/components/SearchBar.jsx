import "../App.css";
import { useEffect, useState, useRef } from "react";
import { useDebounce } from "../hooks/useDebounce";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const debounceSearchTerm = useDebounce(searchQuery, 500);
  const cache = useRef({});

  const handleQueryChange = (event) => {
    const value = event.target.value;
    setSearchQuery(value);
  };

  useEffect(() => {
    let isMounted = true;
    const fetchData = async (query) => {
      try {
        if (!query || query.trim().length === 0) {
          setSearchResults([]);
          return;
        }

        if (cache.current[query]) {
          console.log("Cache hit...");
          const cacheResults = cache.current[query];
          setSearchResults(cacheResults);
          return;
        }

        const resp = await fetch(
          `https://dummyjson.com/products/search?q=${query}`,
        );

        const data = await resp.json();

        if (!isMounted) {
          return;
        }
        if (data && data.products && data.products.length > 0) {
          const results = data.products.map((item) => item.title);
          setSearchResults(results);

          cache.current[query] = results;
        } else {
          setSearchResults([]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(debounceSearchTerm);

    return () => {
      isMounted = false;
    };
  }, [debounceSearchTerm]);

  return (
    <div className="search-bar-container">
      <input
        className="searchBar"
        type="text"
        placeholder="Search here.."
        value={searchQuery}
        onChange={handleQueryChange}
      />

      <div>
        {searchResults.length > 0 && (
          <ul className="serach-result-list">
            {searchResults.map((item, index) => {
              return <li key={`${item} - ${index}`}>{item}</li>;
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
