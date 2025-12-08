import { useState } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar";

function App() {
  return (
    <div>
      <h1>Searchbar Typeahead Problem</h1>

      <div style={{ minHeight: "60vh" }}>
        <SearchBar />
      </div>
    </div>
  );
}

export default App;
