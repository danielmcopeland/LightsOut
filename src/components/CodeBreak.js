import React, { useState } from 'react';

const CodeBreak = () => {
  const start = 234208;
  const end = 765869;
  let count = 0;
  const runProgram = () => {
    for (let i = start; i < end; i++) {
      if (checkAscending(i) && checkAdjacent(i)) {
        count++;
      }
    }
    console.log(count);
  };

  const checkAscending = num => {
    const numArr = num
      .toString()
      .split('')
      .map(a => parseInt(a));

    for (let i = 0; i < numArr.length - 1; i++) {
      if (numArr[i] > numArr[i + 1]) {
        return false;
      }
    }
    return true;
  };

  const checkAdjacent = num => {
    const numArr = num
      .toString()
      .split('')
      .map(a => parseInt(a));
    for (let i = 0; i < numArr.length - 1; i++) {
      if (numArr[i] == numArr[i + 1] && onlyTwo(numArr[i], numArr)) {
        return true;
      }
    }
    return false;
  };

  const onlyTwo = (num, arr) => {
    return arr.filter(n => n == num).length == 2;
  };

  return <button onClick={runProgram}>Break Code</button>;
};

export default CodeBreak;
