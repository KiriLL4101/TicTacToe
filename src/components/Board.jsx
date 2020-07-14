import React from "react";
import Square from "./Square";
import useSound from 'use-sound';
import crossSfx from '../assets/audio/cross.mp3';
import zeroSfx from '../assets/audio/zero.mp3';

export default function Board({ value }) {
  const [state, setState] = React.useState({
    squares: value,
    xIsNext: true,
  });
  const [cross] = useSound(crossSfx);
  const [zero] = useSound(zeroSfx);
  function handleClick(i, j) {
    const squares = state.squares.slice();
    squares[i][j] = state.xIsNext ? "X" : "O";
    setState({
      squares: squares,
      xIsNext: !state.xIsNext,
    });
    return state.xIsNext ? cross() : zero();
  }
  function renderSquare(i, j) {
    return (
      <Square
        value={state.squares[i][j]}
        onClick={() => {
          handleClick(i, j);
        }}
        
      />
    );
  }
  function getColsWinner(arr) {
    let result = [];
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr[i].length; j++) {
        if (result[j] === undefined) {
          result[j] = [];
        }

        result[j][i] = arr[i][j];
      }
    }
    return result.map((item) => {
      return item.fill("X");
    });
  }

  function getFirstDiagonal(arr) {
    let result = [];
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr[i].length; j++) {
        if (result[i + j] === undefined) {
          result[i + j] = [];
        }
        result[i + j].push(arr[i][j]);
      }
    }
    return result.map((item) => {
      return item.fill("X");
    });
  }

  function getSecondDiagonal(arr) {
    let result = [];
    for (let i = 0; i < arr.length; i++) {
      for (let j = arr[i].length - 1; j >= 0; j--) {
        if (result[i] === undefined) {
          result[i] = [];
        }
        result[i].push(arr[i][j]);
      }
    }
    return result.map((item) => {
      return item.fill("X");
    });
  }

  function isWin(check) {
    for (let i = 0; i < state.squares.length; i++) {
      for (let j = 4; j < state.squares[i].length; j++) {
        if (
          state.squares[i][j] === check[i][j] &&
          state.squares[i][j] === check[i][j - 1] &&
          state.squares[i][j] === check[i][j - 2] &&
          state.squares[i][j] === check[i][j - 3] &&
          state.squares[i][j] === check[i][j - 4]
        ) {
          return true;
        }
      }
    }
    return false;
  }


  function calculateWinner(squares) {
    const colsNum = getColsWinner(squares);
    const firstDia = getFirstDiagonal(squares);
    const secondDia = getSecondDiagonal(squares);
    const lines = [...colsNum, ...firstDia, ...secondDia]
    if (isWin(lines)) {
      
      setState({
        xIsNext: true,
        squares:state.squares.map((item) => {
          return item.fill(null);
        })
      });
    }
    return false;
  }

  React.useEffect(() => {
    //calculateWinner(state.squares);
  }, [state]);


  let status = "Следующий игрок: " + (state.xIsNext ? "X" : "O");

  function renderBoard(arr) {
    let result = [];
    for (let i = 0; i < arr.length; i++) {
      result[i] = [];
      for (let j = 0; j < arr[i].length; j++) {
        result[i][j] = renderSquare(i, j);
      }
    }
    return result;
  }

  return (
    <div>
      <div className="status">{status}</div>
      {renderBoard(value).map((item) => (
        <div className="board-row">{item.map((val) => val)}</div>
      ))}
    </div>
  );
}
