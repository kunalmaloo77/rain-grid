import { useState } from "react";
import ZigZagGrid from "./components/Zigzag";
import { Grid } from "./components/RainGrid";

const App = () => {
  const [toggle, setToggle] = useState(true);
  const handleToggle = () => {
    setToggle(!toggle);
  };
  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-b from-black to-gray-900">
      <h1 className="text-white text-4xl font-bold mb-4 animate-glow">
        Rainfall Grid
      </h1>
      {/* <Grid rows={20} cols={10} /> */}
      <button
        className="py-2 px-4 rounded bg-blue-500 text-white hover:bg-blue-600 focus:outline-none my-2"
        onClick={handleToggle}
      >
        Toggle to {toggle ? "Rain Drop" : "Zig-Zac"}
      </button>
      {toggle ? <ZigZagGrid /> : <Grid />}
    </div>
  );
};

export default App;
