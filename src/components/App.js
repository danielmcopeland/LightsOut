import React, { useState } from 'react';
import Game from './Game';
import TestFunction from './TestFunction';
import CodeBreak from './CodeBreak';
import Intcode from './Intcode';

export function App({ initialData }) {
  const [count, setCount] = useState(5);
  const [gameId, setGameId] = useState(1);
  const [isCheatMode, setCheatMode] = useState(false);

  const updateGameCount = num => {
    if (!((count == 1 && num == -1) || (count == 17 && num == 1))) {
      setGameId(gameId + 1);
      setCount(count + num);
    }
  };

  const toggleCheatMode = () => {
    setCheatMode(!isCheatMode);
  };

  const styles = {
    backgroundColor: 'black',
  };

  return (
    <div style={{ backgroundColor: 'black' }}>
      <TestFunction />
      <CodeBreak />
      <Intcode />
      <h1>{initialData.appName}</h1>
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
