import React from "react";
import "./Controls.css"; // Importing the new CSS file

const Controls = ({
  generateNewArray,
  handleSort,
  arraySize,
  setArraySize,
  speed,
  setSpeed,
  algorithm,
  setAlgorithm,
  sorting,
}) => {
  return (
    <div className="controls">
      {/* Algorithm Selection */}
      <select
        value={algorithm}
        onChange={(e) => setAlgorithm(e.target.value)}
        disabled={sorting}
      >
        <option value="bubble">Bubble Sort</option>
        <option value="merge">Merge Sort</option>
        <option value="heap">Heap Sort</option>
        <option value="quick">Quick Sort</option>
        <option value="insertion">Insertion Sort</option>
        <option value="selection">Selection Sort</option>
      </select>

      {/* Sort Button */}
      <button
        onClick={() => handleSort(algorithm)}
        disabled={sorting}
      >
        Start Sorting
      </button>

      {/* Generate New Array Button */}
      <button onClick={generateNewArray} disabled={sorting}>
        Generate New Array
      </button>

      {/* Speed Slider */}
      <div className="slider-container">
        <label>Speed: {speed}ms</label>
        <input
          type="range"
          min="50"
          max="500"
          value={speed}
          onChange={(e) => setSpeed(e.target.value)}
          disabled={sorting}
        />
      </div>

      {/* Array Size Slider */}
      <div className="slider-container">
        <label>Array Size: {arraySize}</label>
        <input
          type="range"
          min="10"
          max="150"
          value={arraySize}
          onChange={(e) => setArraySize(e.target.value)}
          disabled={sorting}
        />
      </div>
    </div>
  );
};

export default Controls;

