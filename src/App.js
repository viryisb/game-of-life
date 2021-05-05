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
 {/*  get the index for row and col */}
  {grid.map((rows,i)=>
  rows.map((col, k)=><div 
  /* display a key */
  key={`{${i}-${k}`}
  
  style={{width:20,
     height:20, backgroundColour: grid[i][k]? 'pink':undefined, /* pink for alive and empty (undefined)for dead */
     border:'solid 1px black'
     }}/>)
     )}
</div>
};
export default App;
