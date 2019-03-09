const utils = {
  range: (min, max) => Array.from({ length: max - min + 1 }, (_, i) => min + i),
  falseArray: (type, size) =>
    Array(size)
      .fill()
      .map(() => Array(size).fill(type)),
};

export default utils;
