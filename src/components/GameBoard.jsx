

const GameBoard = ({onSelectSquare, board}) => {
    return (
      <ol id="game-board">
          {board.map((row, rowIndex) => {
              return <li key={rowIndex}>
                  <ol>
                      {row.map((playerSymbol, colIndex) => {
                          return <li key={colIndex}>
                              <button
                                disabled={playerSymbol !== null}
                                onClick={() => onSelectSquare(rowIndex, colIndex)}>
                                  {playerSymbol}
                              </button>
                          </li>;
                      })}
                  </ol>
              </li>;
          })}


      </ol>
    );
};

export default GameBoard;
