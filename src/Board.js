const Board = ({boardMatrix, updateBoard}) => {
  return (
    <div className="grid grid-cols-3 gap-2">
      {boardMatrix.length > 0 &&
        boardMatrix.map((arr, iIdx) => arr.map((el, jIdx) => (
          <button
            className="w-24 h-24 flex justify-center items-center border border-gray-500 text-3xl font-bold cursor-pointer"
            onClick={() => updateBoard(iIdx, jIdx)}
          >
            {el.length > 0 ? el : '-'}
          </button>
        )))
      }
    </div>
  )
}

export default Board;
