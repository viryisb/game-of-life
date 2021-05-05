import React, { useCallback, useRef, useState } from "react";
import produce from 'immer'
import "./App.css";


const numRows = 30;
const numCols = 50;
/* I created an array of operations to compute the neighbors.*/
const operations = [
  [0, 1],
  [0, -1],
  [1, -1],
  [-1, 1],
  [1, 1],
  [-1, -1],
  [1, 0],
  [-1, 0]

];
const generateEmptyGrid = () => {
  const rows = [];
  for (let i = 0; i < numRows; i++) {
    /* Generate an array and say the length of the array. In this case length=numCols and the second 
    parameter is a mapping function where I get the value in the key and then I can return what the 
    value is going to be. In this case I need the values in this array to be 0 so I'm going to do a function 
    that returns 0 here */
    rows.push(Array.from(Array(numCols), () => 0))
  }
  return rows;
}

const App = () => {
  const [grid, setGrid] = useState(() => {
    return generateEmptyGrid()
  });
  const [running, setRunning] = useState(false)
  /* the current value of Ref is whatever the value of running is. */
  const runningRef = useRef(running);
  runningRef.current = running

  /* I used useCallback hook because I want this function to be recreated every render */
  const runSimulation = useCallback(() => {
    /* I use runningRef here and the current value is always going to be up-to-date  */
    if (!runningRef.current) {
      return;
    }
    //current value of grid and return new value
    setGrid((g) => {
      return produce(g, gridCopy => {
        /* The double for loop is going to go through every value in the grid */
        for (let i = 0; i < numRows; i++) {
          for (let k = 0; k < numCols; k++) {
            let neighbors = 0;
            /* For each operations, each gonna have an X and a Y.
             I'm going to compute a new I (newI) and that is going to be i+x and a new K (newK) 
             that it's going to be k+y. Then, if newI is greater or equal to zero and newI
            is not greater or less than the number of rows and newK is greater than or equal
            to zero and newK is less than the number of columns. If we have a live cell is equal to 1
            and it is going to add 1 to the neighbors. That´s gonna tell us for a given cell how many neighbors it has. 
            So I added a statement: if neighbors is less than 2 or neighbors is greater than 3 then our 
            current grid position dies, so we are going to say  gridCopy[i][k] is equal to 0
            There is one rule left: "Any dead cell with exactly three live neighbours becomes a live cell".
             So I can say else if the current (g[i][k] is dead (is equal to 0) and the neighbors is equal to three then gridCopy[i][k] is equal to 1*/
            operations.forEach(([x, y]) => {
              const newI = i + x;
              const newK = k + y;
              if (newI >= 0 && newI < numRows && newK >= 0 && newK < numCols) {
                neighbors += g[newI][newK];
              }
            });

            if (neighbors < 2 || neighbors > 3) {
              gridCopy[i][k] = 0;
            } else if (g[i][k] === 0 && neighbors === 3) {
              gridCopy[i][k] = 1;
            }
          }
        }
      })
    })


    setTimeout(runSimulation, 300)
  }, [])

  return (
    <>
      <button
        onClick={() => {
          setRunning(!running);
          runningRef.current = true;
          if (!running) {
            runSimulation();
          }
        }}
      >
        {running ? "stop" : "start"}
      </button>
      <button onClick={() => {
        setGrid(generateEmptyGrid())
      }}>
        clear
      </button>
      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${numCols},20px)`

      }}>

        {grid.map((rows, i) =>
          rows.map((col, k) => <div
            /* I display a key here because it is an array. Normally you don't wanna use the index as a key 
            but because we are never gonna shift the actual divs themselves I think it´s fine to use it.
             So I'm going to say i is the row and k is the column. This will give us a unique key */
            key={`{${i}-${k}`}
            onClick={() => {
              const newGrid = produce(grid, gridCopy => {
                /* toggle back and forth: it was like this: gridCopy[i][k] =  1 */
                gridCopy[i][k] = grid[i][k] ? 0 : 1 //if it is currently alive we make it dead. Dead=0, alive=1
              });
              setGrid(newGrid)
            }}
            style={{
              width: 20,
              height: 20,
              /*grid index are i for the row and k for the column index. If it is alive I want this to be pink 
              otherwiseI want to be undefined so it's just empty */
              backgroundColor: grid[i][k] ? 'pink' : undefined,
              border: 'solid 1px black'
            }} />)
        )}
      </div>
    </>
  )
};
export default App;
