import React from 'react';
import GridSquare from './GridSquare';
import utils from '../utils';

const GameRow = props => {
  const clickHandler = (a, b) => {
    props.handleClick(a, b);
  };
  return (
    <div className="game-row">
      {utils.range(0, props.size - 1).map(number => (
        <GridSquare
          key={[props.yval, number]}
          yval={props.yval}
          xval={number}
          gameGrid={props.gameGrid}
          onClicker={clickHandler}
        />
      ))}
    </div>
  );
};

export default GameRow;
