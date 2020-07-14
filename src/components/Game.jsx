import React from "react";
import Board from "./Board";
import StartGame from './StartGame'


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
  const [isOpen, setIsOpen] = React.useState(true)
  
  function onSubmit(size){
    setstate(sizeBoard(size));
    setIsOpen(false)
  }
  function endGame(isWin){
    if(isWin){
      setIsOpen(true)
    }
  }
  return (
    <div className="game">
      <div className="game-board">
        <Board value={state} />
      </div>
      <div className="game-info">
        {
          isOpen && <StartGame start={onSubmit}/>
        }
        <div>{/* status */}</div>
        <ol>{/* TODO */}</ol>
      </div>
    </div>
  );
}
