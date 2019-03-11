import React from 'react';

const GridSquare = props => {
  return (
    <div className="star">
      <button
        className="grid-button"
        style={{
          backgroundColor: props.gameGrid[props.yval][props.xval]
            ? 'yellow'
            : 'gray',
        }}
        onClick={() => props.onClicker(props.yval, props.xval)}
      />
    </div>
  );
};

export default GridSquare;
