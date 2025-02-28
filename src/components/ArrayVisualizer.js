import React from "react";
import "./ArrayVisualizer.css";

const ArrayVisualizer = ({ array, highlightedBars }) => {
  return (
    <div className="array-container">
      {array.map((value, index) => {
        let barClass = "array-bar";

        // Apply specific classes for sorting animations
        if (highlightedBars) {
          if (highlightedBars.selected && highlightedBars.selected.includes(index)) {
            barClass += " selected"; // Highlight selected bars
          } else if (highlightedBars.compare && highlightedBars.compare.includes(index)) {
            barClass += " compare"; // Highlight compared bars
          } else if (highlightedBars.sorted && highlightedBars.sorted.includes(index)) {
            barClass += " sorted"; // Highlight sorted bars
          } else {
            barClass += " unsorted"; // Default color for unsorted bars
          }
        }

        return (
          <div
            key={index}
            className={barClass}
            style={{ height: `${value}px` }}
          />
        );
      })}
    </div>
  );
};

export default ArrayVisualizer;
