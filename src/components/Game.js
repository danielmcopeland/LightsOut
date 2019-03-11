import React, { useState } from 'react';
import utils from '../utils';
import GameRow from './GameRow';

const Game = props => {
  const [gameGrid, setGameGrid] = useState(utils.falseArray(0, props.size));
  const [answerGrid, setAnswerGrid] = useState(utils.falseArray(0, props.size));
  const [gridsArray, setGridsArray] = useState([]);
  const [tempTest, setTempTest] = useState([NaN, NaN]);
  const [difficulty, setDifficulty] = useState(10);

  const gridsArrayPusher = grid => {
    const tempGrids = gridsArray;
    tempGrids.push(grid);
    setGridsArray(tempGrids);
  };

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

  const setAnswerGridHandle = grid => {
    for (let i = 0; i < props.size; i++) {
      for (let j = 0; j < props.size; j++) {
        setAnswerHandle(i, j, grid[i][j]);
      }
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

  const filterOn = () => {
    for (let num = 0; num < Math.pow(2, props.size); num++) {
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
      if (winCheck()) {
        // console.log(num);
        const temp = utils.falseArray(0, props.size);
        for (let i = 0; i < props.size; i++) {
          for (let j = 0; j < props.size; j++) {
            temp[i][j] = answerGrid[i][j];
          }
        }
        gridsArrayPusher(temp);
      }
    }
    if (!winCheck()) {
      setAnswerGridHandle(gridsArray[0]);
    }
    console.log(gridsArray.length);
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
        <button onClick={filterOn}>Filter On</button>

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
        <br />
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
          <button onClick={() => gridsArrayPusher(answerGrid)}>
            add answer
          </button>
        </div>
      ) : (
        <div />
      )}
      {gridsArray.length > 0 ? (
        <div>
          {gridsArray.map(ans => (
            <div className="grid" key={'a' + ans}>
              {utils.range(0, props.size - 1).map(number => (
                <GameRow
                  key={'a' + number}
                  yval={number}
                  gameGrid={ans}
                  handleClick={() => {}}
                  size={props.size}
                />
              ))}
            </div>
          ))}
        </div>
      ) : (
        <div />
      )}
    </div>
  );
};

export default Game;
