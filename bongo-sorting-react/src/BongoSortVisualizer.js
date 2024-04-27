import React, { useState } from "react";
import "./BongoSortVisualizer.css";

const BongoSortVisualizer = () => {
  const [array, setArray] = useState([]);
  const [arrayValues, setArrayValues] = useState("");
  const [isSorting, setIsSorting] = useState(false);
  const [sortSpeed, setSortSpeed] = useState(20);
  const [animationSpeed, setAnimationSpeed] = useState(100);
  const [sortAttempts, setSortAttempts] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  // random arr
  const shuffleArray = async (arr, delay) => {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
      await new Promise((resolve) => setTimeout(resolve, delay));
      setSortAttempts((prev) => prev + 1);
      setArray([...arr]);
    }
  };

  // Boooongooo
  const bongoSort = async (arr, delay) => {
    setSortAttempts(0);
    setIsSorting(true);
    setStartTime(performance.now());
    let sorted = false;
    while (!sorted) {
      await shuffleArray(arr, delay);
      sorted = true;
      for (let i = 1; i < arr.length; i++) {
        if (arr[i - 1] > arr[i]) {
          sorted = false;
          break;
        }
      }
      setSortAttempts((prev) => prev + 1);
    }
    setEndTime(performance.now());
    setIsSorting(false);
  };

  // arr input
  const initializeArrayWithInput = () => {
    const inputValues = arrayValues
      .split(" ")
      .map((num) => parseInt(num.trim(), 10))
      .filter((num) => !isNaN(num));

    if (inputValues.length > 0) {
      bongoSort(inputValues, sortSpeed);
    } else {
      alert("not valid array value.");
    }
  };

  return (
    <div className="main">
      <h1>Bongo Sort Visualization</h1>
      <div className="inputPart">
        <label>
          array value (Separated by spacing):
          <input
            type="text"
            value={arrayValues}
            onChange={(e) => setArrayValues(e.target.value)}
            disabled={isSorting}
            placeholder="2 6 3 5 9 1 ..."
          />
        </label>
        <label>
          animation speed(ms):
          <input
            type="number"
            value={animationSpeed}
            onChange={(e) => setAnimationSpeed(Number(e.target.value))}
            disabled={isSorting}
          />
        </label>
        <label>
          sort speed(ms):
          <input
            type="number"
            value={sortSpeed}
            onChange={(e) => setSortSpeed(Number(e.target.value))}
            disabled={isSorting}
          />
        </label>
      </div>
      <button onClick={initializeArrayWithInput} disabled={isSorting}>
        {isSorting ? "Sorting..." : "Initialize and Sort"}
      </button>
      <div className="stats">
        {sortAttempts > 0 && (
          <>
            <p>Number of Sort Attempts: {sortAttempts}</p>
            <p>Sort Time: {(endTime - startTime).toFixed(2)} ms</p>
          </>
        )}
      </div>
      <div className="graph" style={{ display: "flex", flexDirection: "row" }}>
        {array.map((value, idx) => (
          <div
            key={idx}
            style={{
              height: `${value * 10}px`,
              width: `${500 / array.length}px`,
              backgroundColor: "blue",
              margin: "2px",
              transition: `height ${animationSpeed}ms`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default BongoSortVisualizer;
