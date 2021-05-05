import React, { useState } from "react";
import "./App.css";


const numRows = 50;
const numCols = 50;

const App = () => {
  const [grid, setGrid] = useState(()=>{
  const rows=[];
  for(let i=0; i<numRows; i++){
    rows.push(Array.from(Array(numCols), ()=>0))
  }
  return rows;
  });
console.log(grid)
return <div>
  {grid.map(rows=>rows.map(col=><div/>))}
</div>
};
export default App;
