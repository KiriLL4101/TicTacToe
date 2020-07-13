import React from "react";
import Board from "./Board";

export default function Game() {
  function sizeBoard(size) {
    let rowsNum = size;
    let colsNum = size;
    let arr = [];
    for (let i = 0; i < rowsNum; i++) {
      arr[i] = [];
      for (let j = 0; j < colsNum; j++) {
        arr[i][j] = null;
      }
    }
    return arr;
  }

  const [state, setstate] = React.useState(sizeBoard(6));

  
  
  return (
    <div className="game">
      <div className="game-board">
        <Board value={state} />
      </div>
      <div className="game-info">
        <div>{/* status */}</div>
        <ol>{/* TODO */}</ol>
      </div>
    </div>
  );
}
