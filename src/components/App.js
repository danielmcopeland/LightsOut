import React, { useState } from 'react';
import Game from './Game';

export function App({ initialData }) {
  const [count, setCount] = useState(5);
  const [gameId, setGameId] = useState(1);
  const [isCheatMode, setCheatMode] = useState(false);

  const updateGameCount = num => {
    if (!((count == 1 && num == -1) || (count == 15 && num == 1))) {
      setGameId(gameId + 1);
      setCount(count + num);
    }
  };

  const toggleCheatMode = () => {
    setCheatMode(!isCheatMode);
  };

  return (
    <div>
      <h1>{initialData.appName}</h1>
      This is a sample stateful and server-side rendered React application.
      <br />
      <br />
      Here is a button that will track how many times you click it:
      <br />
      <br />
      <button onClick={() => updateGameCount(-1)}>-</button>
      {count}
      <button onClick={() => updateGameCount(1)}>+</button>
      <button
        onClick={toggleCheatMode}
        style={{ backgroundColor: isCheatMode ? 'red' : 'white' }}
      >
        CheatMode
      </button>
      <Game
        key={gameId}
        size={count}
        startNewGame={() => setGameId(gameId + 1)}
        isCheatMode={isCheatMode}
      />
    </div>
  );
}
