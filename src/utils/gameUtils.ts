import { BoardStateType, BoardValue } from "../components/Game/Interfaces";
import { Direction, Value } from "../components/interfaces/interfaces";

export const areEqual = (prev: BoardStateType, curr: BoardStateType) => {
  return JSON.stringify(prev) === JSON.stringify(curr);
};

export const isGameOver = (board: BoardStateType) => {
  const [merged] = merge(board);

  if (merged.flat().includes(null)) {
    return false;
  }

  for (let i = 0; i < merged.length; i++) {
    for (let j = 0; j < merged.length - 1; j++) {
      if (
        merged[i][j].value === merged[i][j + 1].value ||
        merged[j][i].value === merged[j + 1][i].value
      ) {
        return false;
      }
    }
  }

  return true;
};

export const sift = (boardState: BoardStateType, direction: Direction) => {
  const MOVES = {
    up: moveUp,
    down: moveDown,
    right: moveRight,
    left: moveLeft,
  };

  return MOVES[direction](boardState);
};

export const merge = (boardState: BoardStateType): [BoardStateType, number] => {
  let id = getNextId(boardState);
  let score = 0;
  let values: { [key: string]: BoardValue } = {};

  boardState
    .flat()
    .filter((v) => v !== null)
    .forEach((v) => {
      const key = `${v.positionX}${v.positionY}`;
      if (values[key]) {
        const value = parseInt(v.value) * 2;
        values[key] = { ...v, id: id++, value: value.toString() as Value };
        score += value;
      } else {
        values[key] = v;
      }
    });

  const merged = [
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
  ];
  Object.values(values).forEach((v) => (merged[v.positionX][v.positionY] = v));

  return [merged, score];
};

export const moveRight = (boardState: BoardStateType): BoardStateType => {
  return boardState.map((line) => shiftRight(line));
};

export const moveLeft = (boardState: BoardStateType): BoardStateType => {
  return boardState.map((line) => shiftLeft(line));
};

export const moveUp = (boardState: BoardStateType): BoardStateType => {
  let result: BoardStateType = [[], [], [], []];
  for (let columnIdx = 0; columnIdx < 4; columnIdx++) {
    const column = shiftLeft(arrayColumn(boardState, columnIdx));
    for (let i = 0; i < 4; i++) {
      result[i][columnIdx] = column[i] && {
        ...column[i],
        positionX: column[i].positionY,
        positionY: columnIdx,
      };
    }
  }

  return result;
};

export const moveDown = (boardState: BoardStateType): BoardStateType => {
  let result: BoardStateType = [[], [], [], []];

  for (let columnIdx = 0; columnIdx < 4; columnIdx++) {
    const column = shiftRight(arrayColumn(boardState, columnIdx));
    for (let i = 0; i < 4; i++) {
      result[i][columnIdx] = column[i] && {
        ...column[i],
        positionX: column[i].positionY,
        positionY: columnIdx,
      };
    }
  }

  return result;
};

const shiftLeft = (line: Array<BoardValue>): Array<BoardValue> => {
  return shiftRight([...line].reverse())
    .reverse()
    .map((x) => x && { ...x, positionY: Math.abs(3 - x.positionY) });
};

const shiftRight = (line: Array<BoardValue>): Array<BoardValue> => {
  let result: Array<BoardValue> = [];
  let pos = 3;
  for (let i = 3; i >= 0; i--) {
    if (line[i] !== null) {
      result[pos] = { ...line[i], positionY: pos };
      pos--;
    }
  }

  for (let i = 0; i <= pos; i++) {
    result[i] = null;
  }

  let i = 3;
  while (i >= 1) {
    if (
      result[i] !== null &&
      result[i].value === result[i - 1]?.value &&
      result[i].value !== "2048"
    ) {
      for (let j = i - 1; j >= 0; j--) {
        if (!result[j]) {
          break;
        }
        result[j].positionY += 1;
      }
      i -= 2;
      break;
    }

    i--;
  }

  return result;
};

const arrayColumn = (arr: BoardStateType, n: number): Array<BoardValue> =>
  arr.map((x) => x[n]);

export const getNextId = (boardState: BoardStateType): number => {
  return getMaxId(boardState) + 1;
};

const getMaxId = (boardState: BoardStateType): number => {
  return Math.max.apply(
    Math,
    boardState
      .flat()
      .filter((x) => x !== null)
      .map((x) => x.id)
  );
};
