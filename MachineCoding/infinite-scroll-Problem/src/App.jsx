import { useState } from "react";
import "./App.css";

import InfiniteScroller from "./components/InfiniteScroller";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="app">
      <h1
        style={{ color: "white", textAlign: "center", paddingTop: "20px" }}
      >
        Infinite Scroller Example
      </h1>
      <div style={{ marginTop: "20px" }}>
        <InfiniteScroller />
      </div>
    </div>
  );
}

export default App;
