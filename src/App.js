import { useEffect, useState } from 'react';
import Board from './Board';
import { checkWin, initializeBoard } from './boardLogic';

function App() {
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [boardMatrix, setBoardMatrix] = useState(initializeBoard());
  const [winner, setWinner] = useState('');
  
  useEffect(() => {
    const result = checkWin(boardMatrix);

    if (result) {
      setWinner(result);
      alert(`${result} wins!`);
    }

  }, [boardMatrix]);


  const resetBoard = () => {
    setBoardMatrix(initializeBoard());
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
