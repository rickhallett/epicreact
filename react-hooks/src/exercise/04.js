// useState: tic tac toe
// http://localhost:3000/isolated/exercise/04.js

import * as React from 'react';
import {useLocalStorageState} from '../utils';

function Board({squares, selectSquare, status}) {
  function renderSquare(i) {
    return (
      <button className="square" onClick={() => selectSquare(i)}>
        {squares[i]}
      </button>
    );
  }

  return (
    <div>
      <div className="status">{status}</div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
}

function History({history, currentStep, selectStep}) {
  return (
    <div className="game-info">
      <ol>
        {history?.map((step, i) => (
          <li>
            <button
              onClick={() => selectStep(i)}
              disabled={currentStep === i}
              style={{minWidth: '200px', padding: '2px'}}
            >
              {i > 0 ? `Go to step ${i}` : 'Go to game start'}
              {currentStep === i && ' (current)'}
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}

function App() {
  return <Game />;
}

function Game() {
  const [squares, setSquares] = useLocalStorageState(
    'tictactoe',
    Array(9).fill(null),
  );

  const [history, setHistory] = React.useState([squares]);
  const [currentStep, setCurrentStep] = React.useState(0);

  const nextValue = calculateNextValue(squares);
  const winner = calculateWinner(squares);
  const status = calculateStatus(winner, squares, nextValue);

  function selectSquare(square) {
    if (Boolean(winner)) {
      return;
    }

    if (Boolean(squares[square])) {
      return;
    }

    const squaresCopy = [...squares];
    squaresCopy[square] = nextValue;

    if (currentStep === history.length - 1) {
      setHistory((state) => [...state, squaresCopy]);
    } else {
      setHistory((state) => [...state.slice(0, currentStep + 1), squaresCopy]);
    }

    setSquares(squaresCopy);
    setCurrentStep((state) => state + 1);
  }

  function selectStep(step) {
    setSquares(history[step]);
    setCurrentStep(step);
  }

  function restart() {
    setSquares(Array(9).fill(null));
    setHistory([Array(9).fill(null)]);
    setCurrentStep(0);
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={squares} selectSquare={selectSquare} status={status} />
        <button className="restart" onClick={restart}>
          restart
        </button>
      </div>
      <History
        history={history}
        currentStep={currentStep}
        selectStep={selectStep}
      />
    </div>
  );
}

// eslint-disable-next-line no-unused-vars
function calculateStatus(winner, squares, nextValue) {
  return winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
    ? `Scratch: Cat's game`
    : `Next player: ${nextValue}`;
}

// eslint-disable-next-line no-unused-vars
function calculateNextValue(squares) {
  return squares.filter(Boolean).length % 2 === 0 ? 'X' : 'O';
}

// eslint-disable-next-line no-unused-vars
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default App;
