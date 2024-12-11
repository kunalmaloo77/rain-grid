import React, { useState, useEffect } from "react";

const ZigZagGrid = () => {
  const rows = 20;
  const cols = 10;
  const [activeIndices, setActiveIndices] = useState(
    Array.from({ length: rows }, (_, rowIndex) => ({
      index: 0,
      direction: 1,
      delay: rowIndex * 100,
    }))
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndices((prev) =>
        prev.map(({ index, direction, delay }, rowIndex) => {
          if (delay > 0) {
            return { index, direction, delay: delay - 100 };
          }
          const newIndex = index + direction;
          if (newIndex >= cols) {
            return { index: cols - 1, direction: -1, delay: 0 };
          } else if (newIndex < 0) {
            return { index: 0, direction: 1, delay: 0 };
          }
          return { index: newIndex, direction, delay: 0 };
        })
      );
    }, 100); // Adjust the base delay as needed

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-rows-6 gap-1">
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="grid grid-cols-10 gap-1">
          {Array.from({ length: cols }).map((_, colIndex) => (
            <div
              key={colIndex}
              className={`h-8 w-8 border ${
                colIndex === activeIndices[rowIndex].index
                  ? "bg-red-500"
                  : "bg-gray-300"
              }`}
            ></div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ZigZagGrid;
