import React, { useState } from 'react';
import Player from './components/Player.jsx';
import GameBoard from './components/GameBoard';
import Log from './components/Log';

function deriveActivePlayer (gameTurns) {
    let currentPlayer = 'X';
    if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
        currentPlayer = 'O';
    }
    return currentPlayer;
}

function App () {
    const [gameTurns, setGameTurns] = useState([]);
    let currentPlayer = deriveActivePlayer(gameTurns);

    const handleSelectSquare = (row, col) => {
        setGameTurns((prevTurns) => {
            let currentPlayer = deriveActivePlayer(prevTurns);
            const updatedTurns = [{ square: { row: row, col: col }, player: currentPlayer }, ...prevTurns];
            return updatedTurns;
        });
    };

    return (
      <main>
          <div id='game-container'>
              <ol id="players" className="highlight-player">
                  <Player
                    isActive={currentPlayer === 'X'}
                    initialName="Payer 1"
                    symbol="X"/>
                  <Player
                    isActive={currentPlayer === 'O'}
                    initialName="Payer 2"
                    symbol="O"/>
              </ol>

              <GameBoard
                activePlayerSymbol={currentPlayer}
                turns={gameTurns}
                onSelectSquare={handleSelectSquare}/>
          </div>

          <Log turns={gameTurns}/>
      </main>
    );
}

export default App;
