import { useState } from "react";
import "./App.css";
import FlashCard from "./components/FlashCard.jsx";

const faqs = [
  {
    id: 1,
    question: "What is your name?",
    answer: "My name is Jigarkumar Gajjar.",
  },
  {
    id: 2,
    question: "What is your hobby?",
    answer: "Music and Reading Books.",
  },
  {
    id: 3,
    question: "What is your fav movie?",
    answer: "ABCD",
  },
];

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePreviousButtonClick = () => {
    if (currentIndex === 0) {
      return;
    }
    setCurrentIndex((idx) => idx - 1);
  };

  const handleNextButtonClick = () => {
    if (currentIndex === faqs.length - 1) {
      return;
    }
    setCurrentIndex((idx) => idx + 1);
  };

  return (
    <div>
      <FlashCard key={faqs[currentIndex].id} flashCard={faqs[currentIndex]} />

      <div className="navigationFooter">
        <button
          style={{
            color: "white",
            backgroundColor: `${currentIndex === 0 ? "grey" : "blue"}`,
            cursor: `${currentIndex === 0 ? "not-allowed" : "pointer"}`,
          }}
          onClick={handlePreviousButtonClick}
          disabled={currentIndex === 0}
        >
          Previous
        </button>

        <div> {`${currentIndex + 1}/${faqs.length}`}</div>

        <button
          style={{
            color: "white",
            cursor: `${currentIndex === faqs.length - 1 ? "not-allowed" : "pointer"}`,
            backgroundColor: `${currentIndex === faqs.length - 1 ? "grey" : "green"}`,
          }}
          onClick={handleNextButtonClick}
          disabled={currentIndex === faqs.length - 1}
        >
          next
        </button>
      </div>
    </div>
  );
}

export default App;
