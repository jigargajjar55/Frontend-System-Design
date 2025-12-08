import { useState, useEffect } from "react";
import "../App.css";

const GRID_SIZE = 3;
const TOTAL_BOXES = GRID_SIZE * GRID_SIZE;

const Grid = () => {
  const [selectedCell, setSelectedCell] = useState([]);
  const [isUnloading, setIsUnloading] = useState(false);

  const handleOnClick = (id) => {
    if (isUnloading || selectedCell.includes(id)) {
      return;
    }

    setSelectedCell((prev) => {
      const newCells = [...prev];

      newCells.push(id);

      if (newCells.length === TOTAL_BOXES) {
        setIsUnloading(true);
      }

      return newCells;
    });
  };

  useEffect(() => {
    if (!isUnloading) {
      return;
    }

    const timer = setInterval(() => {
      setSelectedCell((prevCells) => {
        const newCells = [...prevCells];
        newCells.pop();

        if (newCells.length === 0) {
          clearInterval(timer);
          setIsUnloading(false);
        }

        return newCells;
      });
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [isUnloading]);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
        width: "500px",
        height: "500px",
        gap: "20px",
      }}
    >
      {[...Array(TOTAL_BOXES)].map((_, index) => {
        const isActive = selectedCell.includes(index);

        return (
          <div
            key={index}
            className={`gridCell ${isActive ? "activeCell" : ""}`}
            onClick={() => handleOnClick(index)}
          >
            {index}
          </div>
        );
      })}
    </div>
  );
};

export default Grid;
