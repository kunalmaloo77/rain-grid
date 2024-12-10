import { useEffect, useState } from "react";

const Grid = ({ rows = 20, cols = 15 }) => {
  const [grid, setGrid] = useState(
    Array.from({ length: rows }, () => Array.from({ length: cols }, () => null))
  );

  const randomColor = () =>
    ["bg-pink-500", "bg-blue-500", "bg-purple-500", "bg-red-500"][
      Math.floor(Math.random() * 4)
    ];

  const [activeDrops, setActiveDrops] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveDrops((prevDrops) => {
        const newDrops = [...prevDrops];

        // Randomly add new raindrops
        if (Math.random() < 0.3) {
          const col = Math.floor(Math.random() * cols);
          newDrops.push({ row: -1, col, color: randomColor(), trail: [] });
        }

        // Update positions of existing drops
        return newDrops
          .map((drop) => {
            const { row, col, color, trail } = drop;

            // Remove drops that fall outside the grid
            if (row >= rows) return null;

            // Update trail with progressively fading cells
            const newTrail = [
              { row, col, opacity: 1, color }, // Current drop
              ...trail.map((t, index) => ({
                ...t,
                opacity: Math.max(t.opacity - 0.2, 0), // Reduce opacity progressively
              })),
            ].filter((t) => t.opacity > 0); // Remove completely faded cells

            return { row: row + 1, col, color, trail: newTrail };
          })
          .filter(Boolean);
      });

      setGrid(() => {
        const newGrid = Array.from({ length: rows }, () =>
          Array.from({ length: cols }, () => null)
        );

        activeDrops.forEach(({ trail }) => {
          trail.forEach(({ row, col, color, opacity }) => {
            if (row >= 0 && row < rows) {
              newGrid[row][col] = { color, opacity };
            }
          });
        });

        return newGrid;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [rows, cols, activeDrops]);

  return (
    <div
      className={`grid gap-1`}
      style={{
        gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
      }}
    >
      {grid.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            className={`w-6 h-6 border border-gray-700 ${
              cell ? `${cell.color}` : "bg-black"
            }`}
            style={{
              opacity: cell ? cell.opacity : 1, // Set opacity dynamically
            }}
          ></div>
        ))
      )}
    </div>
  );
};

const App = () => {
  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-b from-black to-gray-900">
      <h1 className="text-white text-4xl font-bold mb-4 animate-glow">
        Rainfall Grid
      </h1>
      <Grid rows={20} cols={15} />
    </div>
  );
};

export default App;
