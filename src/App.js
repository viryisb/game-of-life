import React, { useState } from "react";
import "./App.css";

//Start with 50 then will see
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
return <div>hello</div>
};
export default App;
