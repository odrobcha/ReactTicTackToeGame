import React, { useState } from 'react';
import Player from './components/Player.jsx';
import GameBoard from './components/GameBoard';
import Log from './components/Log';
import GameOver from './components/GameOver';
import { WINNING_COMBINATIONS } from './winning_combinations';

const PLAYERS = {
  X: "Player 1",
  O : "Player 2"
}
const INITIAL_GAME_BOARD= [
    [null, null, null],
    [null, null, null],
    [null, null, null],
];

function deriveActivePlayer (gameTurns) {
    let currentPlayer = 'X';
    if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
        currentPlayer = 'O';
    }
    return currentPlayer;
}

function deriveWinner (gameBoard, players) {
  let winner;
  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];
    if (firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol) {
      winner = players[firstSquareSymbol];
    }
  }
  return winner
}

function deriveGameBoard (gameTurns) {
  let gameBoard = [...INITIAL_GAME_BOARD.map(array => [...array])];
  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }
  return gameBoard;
}

function App () {
    const [players, setPlayers] = useState(PLAYERS);
    const [gameTurns, setGameTurns] = useState([]);
    let currentPlayer = deriveActivePlayer(gameTurns);

    const gameBoard = deriveGameBoard(gameTurns);
    const winner = deriveWinner(gameBoard, players);

    let hasDraw = gameTurns.length === 9 && !winner;
    const handleRestart = () => {
        setGameTurns([]);
    };

    const handleSelectSquare = (row, col) => {
        setGameTurns((prevTurns) => {
            let currentPlayer = deriveActivePlayer(prevTurns);
            const updatedTurns = [{ square: { row: row, col: col }, player: currentPlayer }, ...prevTurns];
            return updatedTurns;
        });
    };

    const handlePlayerNameChange = (symbol, newName) => {
        setPlayers((prevState) => {
            return {
                ...prevState,
                [symbol]: newName
            };
        });
    };

    return (
      <main>
          <div id='game-container'>
              <ol id="players" className="highlight-player">
                  <Player
                    onSaveName={handlePlayerNameChange}
                    isActive={currentPlayer === 'X'}
                    initialName={PLAYERS.X}
                    symbol="X"/>
                  <Player
                    onSaveName={handlePlayerNameChange}
                    isActive={currentPlayer === 'O'}
                    initialName={PLAYERS.O}
                    symbol="O"/>
              </ol>
              {(winner || hasDraw) && <GameOver onRestart={handleRestart} winner={winner}/>}

              <GameBoard
                activePlayerSymbol={currentPlayer}
                board={gameBoard}
                onSelectSquare={handleSelectSquare}/>
          </div>

          <Log turns={gameTurns}/>
      </main>
    );
}

export default App;
