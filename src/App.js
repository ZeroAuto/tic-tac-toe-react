import { useEffect, useState } from 'react';
import Board from './Board';

const startingMatrix = [
  ['', '', ''],
  ['', '', ''],
  ['', '', ''],
]

function App() {
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [boardMatrix, setBoardMatrix] = useState(structuredClone(startingMatrix));
  const [winner, setWinner] = useState('');
  
  useEffect(() => {
    const checkWin = (board) => {
      for (let i = 0; i < 3; i++) {
        if (board[i][0] && board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
          return board[i][0];
        }
      }
      
      for (let i = 0; i < 3; i++) {
        if (board[0][i] && board[0][i] === board[1][i] && board[1][i] === board[2][i]) {
          return board[0][i];
        }
      }
      
      if (board[0][0] && board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
        return board[0][0];
      }
      
      if (board[0][2] && board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
        return board[0][2];
      }

      return null;
    };

    const result = checkWin(boardMatrix);
    if (result) {
      setWinner(result);
      alert(`${result} wins!`);
    }

  }, [boardMatrix]);


  const resetBoard = () => {
    setBoardMatrix(structuredClone(startingMatrix));
    setWinner('');
    setCurrentPlayer('X');
  };

  const updateBoard = (iIdx, jIdx) => {
    if (winner !== '') return;
    const piece = boardMatrix[iIdx][jIdx];
    if (piece !== '') return;
    const updatedBoard = [...boardMatrix];
    updatedBoard[iIdx][jIdx] = currentPlayer;
    setBoardMatrix(updatedBoard);
    setCurrentPlayer(prev => prev === 'O' ? 'X' : 'O');
  }

  return (
    <div className="App">
      <div className="w-72 mx-auto">
        <div>
          {winner !== '' ? <span>Winner: {winner}</span> : <span>Current Player: {currentPlayer}</span>}
        </div>
        <Board boardMatrix={boardMatrix} updateBoard={updateBoard} />
        <div>
          <button onClick={() => resetBoard()}>Reset</button>
        </div>
      </div>
    </div>
  );
}

export default App;
