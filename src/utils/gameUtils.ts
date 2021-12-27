import { BoardState, BoardValue } from "../components/Game/Interfaces";
import { Value } from "../components/interfaces/interfaces";

export const areEqual = (b1: BoardState, b2: BoardState) => {
  const areBoardValuesEqual = (v1: BoardValue, v2: BoardValue): boolean => {
    return (
      (v1 === null && v2 === null) ||
      ((v1 && Object.keys(v1)?.length) === (v2 && Object.keys(v2)?.length) &&
        Object.keys(v1).every((p) => v1[p] === v2[p]))
    );
  };

  return b1.every((x) => b2.some((y) => areBoardValuesEqual(x, y)));
};

export const isGameOver = (board: BoardState) => {
  if (board.length < 16) {
    return false;
  }

  const movePossible = (
    arr1: BoardState,
    arr2: BoardState,
    getCoordinate: (x: BoardValue) => number
  ) => {
    return arr1.some((x) =>
      arr2.some(
        (y) => getCoordinate(x) === getCoordinate(y) && x.value === y.value
      )
    );
  };

  for (let i = 0; i < 3; i++) {
    if (
      movePossible(
        getRow(board, i),
        getRow(board, i + 1),
        (x: BoardValue) => x.positionY
      ) ||
      movePossible(
        getColumn(board, i),
        getColumn(board, i + 1),
        (x: BoardValue) => x.positionX
      )
    ) {
      return false;
    }
  }

  return true;
};

export const merge = (board: BoardState): [BoardState, number] => {
  let id = getNextId(board);
  let score = 0;
  let values: { [key: string]: BoardValue } = {};

  board.forEach((v) => {
    const key = `${v.positionX}${v.positionY}`;
    if (values[key]) {
      const value = parseInt(v.value) * 2;
      values[key] = { ...v, id: id++, value: value.toString() as Value };
      score += value;
    } else {
      values[key] = v;
    }
  });

  return [Object.values(values), score];
};

export const moveRight = (board: BoardState): BoardState => {
  let result: BoardState = [];
  for (let i = 0; i < 4; i++) {
    result = [...result, ...shiftRowRight(getRow(board, i))];
  }
  return result;
};

export const moveLeft = (board: BoardState): BoardState => {
  let result: BoardState = [];
  for (let i = 0; i < 4; i++) {
    result = [...result, ...shiftRowLeft(getRow(board, i))];
  }
  return result;
};

export const moveUp = (board: BoardState): BoardState => {
  let result: BoardState = [];
  for (let i = 0; i < 4; i++) {
    result = [
      ...result,
      ...shift(
        getColumn(board, i),
        (v: BoardValue) => v.positionX,
        (v: BoardValue, position: number) => (v.positionX = position),
        "left"
      ),
    ];
  }
  return result;
};

export const moveDown = (board: BoardState): BoardState => {
  let result: BoardState = [];
  for (let i = 0; i < 4; i++) {
    result = [
      ...result,
      ...shift(
        getColumn(board, i),
        (v: BoardValue) => v.positionX,
        (v: BoardValue, position: number) => (v.positionX = position),
        "right"
      ),
    ];
  }
  return result;
};

const shiftRowLeft = (line: Array<BoardValue>): Array<BoardValue> => {
  return shift(
    line,
    (v: BoardValue) => v.positionY,
    (v: BoardValue, position: number) => (v.positionY = position),
    "left"
  );
};

const shiftRowRight = (line: BoardState): BoardState => {
  return shift(
    line,
    (v: BoardValue) => v.positionY,
    (v: BoardValue, position: number) => (v.positionY = position),
    "right"
  );
};

const shift = (
  line: BoardState,
  getSecondaryColumn: (v: BoardValue) => number,
  setSecondaryColumn: (v: BoardValue, position: number) => void,
  direction: "left" | "right"
): BoardState => {
  if (line.length === 0) {
    return [];
  }
  let result: BoardState = JSON.parse(JSON.stringify(line));
  result.sort((v1, v2) => getSecondaryColumn(v1) - getSecondaryColumn(v2));

  const startPosition = direction === "left" ? 0 : 4 - result.length;
  for (let i = 0; i < result.length; i++) {
    setSecondaryColumn(result[i], startPosition + i);
  }

  direction === "left" && result.reverse();
  let i = result.length - 1;
  while (i >= 1) {
    if (result[i].value === result[i - 1].value && result[i].value !== "2048") {
      for (let j = 0; j <= i - 1; j++) {
        const shift = direction === "right" ? 1 : -1;
        setSecondaryColumn(result[j], getSecondaryColumn(result[j]) + shift);
      }
      i -= 2;
      continue;
    }

    i--;
  }

  return result;
};

export const isExists = (
  board: BoardState,
  positionX: number,
  positionY: number
) => {
  return board.some(
    (x) => x.positionX === positionX && x.positionY === positionY
  );
};

export const addRandomValue = (board: BoardState): BoardState => {
  const start = Date.now();
  const result = JSON.parse(JSON.stringify(board));

  const getCoordinates = (position: number): [number, number] => {
    const x = Math.floor(position / 4);
    const y = position % 4;
    return [x, y];
  };

  Math.floor(Math.random() * 16);

  let position = Math.floor(Math.random() * 16);
  let coordinates = getCoordinates(position);
  while (isExists(board, ...coordinates)) {
    position = position === 15 ? 0 : position + 1;
    coordinates = getCoordinates(position);
  }

  const value: Value = Math.random() <= 0.2 ? "4" : "2";
  const x = [
    ...result,
    {
      id: getNextId(board),
      value,
      positionX: coordinates[0],
      positionY: coordinates[1],
    },
  ];

  console.log("addRandomNumber - " + (Date.now() - start));

  return x;
};

export const getRow = (board: BoardState, row: number): Array<BoardValue> =>
  board.filter((x) => x.positionX === row);

export const getColumn = (
  board: BoardState,
  column: number
): Array<BoardValue> => board.filter((x) => x.positionY === column);

export const getNextId = (boardState: BoardState): number => {
  return getMaxId(boardState) + 1;
};

const getMaxId = (boardState: BoardState): number => {
  return Math.max.apply(
    Math,
    boardState.map((x) => x.id)
  );
};
