import "../App.css";
import { useState } from "react";

const FlashCard = ({ flashCard }) => {
  const [flip, setFlip] = useState(false);
  const { id, question, answer } = flashCard;
  return (
    <div
      className="card-container"
      onClick={() => setFlip((prevFlip) => !prevFlip)}
    >
      <div className={`card-inner ${flip ? "flipped" : ""}`}>
        <div className="card-front">
          <h2>{question}</h2>
          <div>Click here to see</div>
        </div>
        <div className="card-back">
          <h2>{answer}</h2>
        </div>
      </div>
    </div>
  );
};

export default FlashCard;
