import React, { useState } from 'react';
import utils from '../utils';
import GameRow from './GameRow';

const Game = props => {
  const [gameGrid, setGameGrid] = useState(utils.falseArray(0, props.size));
  const [answerGrid, setAnswerGrid] = useState(utils.falseArray(0, props.size));
  const [tempTest, setTempTest] = useState([NaN, NaN]);
  const [difficulty, setDifficulty] = useState(10);

  const clickHandle = (yval, xval) => {
    const tempGrid = gameGrid;
    const tempAns = answerGrid;
    tempGrid[yval][xval] = tempGrid[yval][xval] == 0 ? 1 : 0;
    tempAns[yval][xval] = tempAns[yval][xval] == 0 ? 1 : 0;

    if (yval > 0) {
      tempGrid[yval - 1][xval] = tempGrid[yval - 1][xval] == 0 ? 1 : 0;
    }
    if (yval < props.size - 1) {
      tempGrid[yval + 1][xval] = tempGrid[yval + 1][xval] == 0 ? 1 : 0;
    }
    if (xval > 0) {
      tempGrid[yval][xval - 1] = tempGrid[yval][xval - 1] == 0 ? 1 : 0;
    }
    if (xval < props.size - 1) {
      tempGrid[yval][xval + 1] = tempGrid[yval][xval + 1] == 0 ? 1 : 0;
    }

    setGameGrid(tempGrid);
    setAnswerGrid(tempAns);
    setTempTest([yval, xval]);
  };

  const getAnswerHandle = (y, x) => {
    return answerGrid[y][x];
  };

  const setAnswerHandle = (y, x, val) => {
    if (getAnswerHandle(y, x) != val) {
      clickHandle(y, x);
    }
  };

  const winCheck = () => {
    return gameGrid.every(row => row.every(a => a));
  };
  const reverseWinCheck = () => {
    return gameGrid.every(row => row.every(a => !a));
  };

  const handleSubmitDifficulty = () => {
    for (let i = 0; i < difficulty; i++) {
      const a = getRandomInt(props.size);
      const b = getRandomInt(props.size);
      clickHandle(a, b);
    }
  };

  const getRandomInt = max => {
    return Math.floor(Math.random() * Math.floor(max));
  };

  const filterOff = () => {
    for (let i = 0; i < 10; i++) {
      const a = getRandomInt(props.size);
      clickHandle(0, a);
    }

    for (let i = 1; i < props.size; i++) {
      for (let j = 0; j < props.size; j++) {
        if (gameGrid[i - 1][j]) {
          clickHandle(i, j);
        }
      }
    }
  };
  const filterOn = num => {
    if (num >= Math.pow(2, props.size)) {
      return;
    }
    // for (let i = 0; i < 10; i++) {
    //   const a = getRandomInt(props.size);
    //   clickHandle(0, a);
    // }

    for (let j = 0; j < props.size; j++) {
      if (Math.pow(2, j) & num) {
        setAnswerHandle(0, j, 1);
      } else {
        setAnswerHandle(0, j, 0);
      }
    }

    for (let i = 1; i < props.size; i++) {
      for (let j = 0; j < props.size; j++) {
        if (!gameGrid[i - 1][j]) {
          clickHandle(i, j);
        }
      }
    }
    if (!winCheck()) {
      filterOn(num + 1);
    } else {
      console.log(num);
    }
  };
  return (
    <div>
      <form>
        <input
          type="text"
          value={difficulty}
          onChange={event => setDifficulty(event.target.value)}
          placeholder="Difficulty (1-10)"
          required
        />
      </form>
      <div>
        <button onClick={handleSubmitDifficulty}>New Challenge</button>
        <button onClick={props.startNewGame}>Start New Game</button>
        <button onClick={filterOff}>Filter Off</button>
        <button onClick={() => filterOn(0)}>Filter On</button>

        <div>{winCheck() ? <div>Win!</div> : <div />}</div>
        <div>{reverseWinCheck() ? <div>Win!</div> : <div />}</div>
      </div>
      <div className="game">
        {utils.range(0, props.size - 1).map(number => (
          <GameRow
            key={number}
            yval={number}
            gameGrid={gameGrid}
            handleClick={clickHandle}
            size={props.size}
          />
        ))}
        Last button clicked= {tempTest[0]}, {tempTest[1]}
        <br />
        {gameGrid[0][0]}
      </div>
      {props.isCheatMode ? (
        <div className="game2">
          {utils.range(0, props.size - 1).map(number => (
            <GameRow
              key={number}
              yval={number}
              gameGrid={answerGrid}
              handleClick={clickHandle}
              size={props.size}
            />
          ))}
          <br />
          {answerGrid[0][0]}
        </div>
      ) : (
        <div>
          <div>{gameGrid}</div>
          <div>{gameGrid[0]}</div>
          <div>{gameGrid[1]}</div>
          <div>{gameGrid[2]}</div>
          <div>{gameGrid[3]}</div>
          <div>{gameGrid[4]}</div>
        </div>
      )}
    </div>
  );
};

export default Game;
