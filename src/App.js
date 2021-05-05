import React, { useState } from "react";
import produce from 'immer'
import "./App.css";


const numRows = 50;
const numCols = 50;

const App = () => {
  const [grid, setGrid] = useState(() => {
    const rows = [];
    for (let i = 0; i < numRows; i++) {
      rows.push(Array.from(Array(numCols), () => 0))
    }
    return rows;
  });
  const [running, setRunning]=useState(false)
  
  return (
  <>
  <button>{running? "stop":"start"}</button> {/* set initial state with a button */}
  <div style={{
    display: 'grid',
    gridTemplateColumns: `repeat(${numCols},20px)` //how many columns and size

  }}>
    {/*  get the index for row and col */}
    {grid.map((rows, i) =>
      rows.map((col, k) => <div
        /* display a key */
        key={`{${i}-${k}`}
        onClick={() => {
          const newGrid = produce(grid, gridCopy => {
            /* toggle back and forth: it was like this: gridCopy[i][k] =  1 */
            gridCopy[i][k] = grid[i][k] ? 0 : 1 //if it is currently alive we make it dead
          });
          setGrid(newGrid)
        }}
        style={{
          width: 20,
          height: 20, backgroundColor: grid[i][k] ? 'pink' : undefined, /* pink for alive and empty (undefined)for dead */
          border: 'solid 1px black'
        }} />)
    )}
  </div>
</>
  )};
export default App;
