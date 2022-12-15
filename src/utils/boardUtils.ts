import { Value, Tile, Direction } from "../components/interfaces";

const INDICES = [0, 1, 2, 3];

export const areEqual = (b1: Tile[], b2: Tile[]) => {
  return b1.every((x) => b2.some((y) => areTilesEqual(x, y)));
};

export const areTilesEqual = (t1: Tile, t2: Tile): boolean => {
  return (
    (t1 === null && t2 === null) ||
    ((t1 && Object.keys(t1)?.length) === (t2 && Object.keys(t2)?.length) &&
      Object.keys(t1).every((p) => t1[p] === t2[p]))
  );
};

export const isGameWon = (tiles: Tile[]) => {
  return tiles.some((tile) => tile.value === 2048);
};

export const isGameOver = (tiles: Tile[]) => {

  const tilesOnSamePosition = (tiles: Tile[]) => {
    const tilesMap = {};
    for(let i = 0; i< tiles.length; i++){
      const key = `${tiles[i].positionX}${tiles[i].positionY}`;
      if(tilesMap[key]){
        return true;
      }
      tilesMap[key] = true;
    }

    return false;
  }

  if (tiles.length < 16 || tilesOnSamePosition(tiles)) {
    return false;
  }

  const movePossible = (
    arr1: Tile[],
    arr2: Tile[],
    getCoordinate: (x: Tile) => number
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
        getRow(tiles, i),
        getRow(tiles, i + 1),
        (x: Tile) => x.positionY
      ) ||
      movePossible(
        getColumn(tiles, i),
        getColumn(tiles, i + 1),
        (x: Tile) => x.positionX
      )
    ) {
      return false;
    }
  }

  return true;
};

export const merge = (tiles: Tile[]): Tile[] => {
  let id = getNextId(tiles);
  let values: { [key: string]: Tile } = {};

  tiles.forEach((v) => {
    const key = `${v.positionX}${v.positionY}`;
    if (values[key]) {
      const value = (v.value * 2) as Value;
      values[key] = { ...v, id: id++, value, type: "merged" };
    } else {
      values[key] = v;
    }
  });

  return Object.values(values);
};

export const moveRight = (tiles: Tile[]): Tile[] => {
  return INDICES.map((i) =>
    shiftHorizontally(getRow(tiles, i), "right")
  ).flat();
};

export const moveLeft = (tiles: Tile[]): Tile[] => {
  return INDICES.map((i) => shiftHorizontally(getRow(tiles, i), "left")).flat();
};

export const moveUp = (tiles: Tile[]): Tile[] => {
  return INDICES.map((i) =>
    shiftVertically(getColumn(tiles, i), "left")
  ).flat();
};

export const moveDown = (tiles: Tile[]): Tile[] => {
  return INDICES.map((i) =>
    shiftVertically(getColumn(tiles, i), "right")
  ).flat();
};

const shiftHorizontally = (line: Tile[], direction: Direction): Tile[] => {
  return shift(
    line,
    (v: Tile) => v.positionY,
    (v: Tile, position: number) => (v.positionY = position),
    direction
  );
};

const shiftVertically = (line: Tile[], direction: Direction): Tile[] => {
  return shift(
    line,
    (v: Tile) => v.positionX,
    (v: Tile, position: number) => (v.positionX = position),
    direction
  );
};

const shift = (
  line: Tile[],
  getColumn: (v: Tile) => number,
  setColumn: (v: Tile, position: number) => void,
  direction: Direction
): Tile[] => {
  if (line.length === 0) {
    return [];
  }
  let result: Tile[] = JSON.parse(JSON.stringify(line));
  result.sort((v1, v2) => getColumn(v1) - getColumn(v2));

  const startPosition = direction === "left" ? 0 : 4 - result.length;
  for (let i = 0; i < result.length; i++) {
    setColumn(result[i], startPosition + i);
  }

  direction === "left" && result.reverse();
  let i = result.length - 1;
  while (i >= 1) {
    if (result[i].value === result[i - 1].value && result[i].value !== 2048) {
      for (let j = 0; j <= i - 1; j++) {
        const shift = direction === "right" ? 1 : -1;
        setColumn(result[j], getColumn(result[j]) + shift);
      }
      i -= 2;
      continue;
    }

    i--;
  }

  return result;
};

export const generateBoard = (tilesCount: number = 2): Tile[] => {
  let tiles = [];
  while (tilesCount > 0) {
    tiles = [...tiles, createRandomTile(tiles)];
    tilesCount--;
  }

  return tiles;
};

export const createRandomTile = (tiles: Tile[]): Tile => {
  const getCoordinates = (position: number): [number, number] => {
    const x = Math.floor(position / 4);
    const y = position % 4;
    return [x, y];
  };

  Math.floor(Math.random() * 16);

  let position = Math.floor(Math.random() * 16);
  let coordinates = getCoordinates(position);
  while (isExists(tiles, ...coordinates)) {
    position = position === 15 ? 0 : position + 1;
    coordinates = getCoordinates(position);
  }

  const value: Value = Math.random() <= 0.2 ? 4 : 2;

  return {
    id: getNextId(tiles),
    value,
    type: "new",
    positionX: coordinates[0],
    positionY: coordinates[1],
  };
};

const isExists = (
  tiles: Tile[],
  positionX: number,
  positionY: number
): boolean => {
  return tiles.some(
    (x) => x.positionX === positionX && x.positionY === positionY
  );
};

export const getRow = (tiles: Tile[], row: number): Array<Tile> =>
  tiles.filter((x) => x.positionX === row);

export const getColumn = (tiles: Tile[], column: number): Array<Tile> =>
  tiles.filter((x) => x.positionY === column);

export const getNextId = (tiles: Tile[]): number => {
  return getMaxId(tiles) + 1;
};

// Returns the maximum id of the given tiles.
export const getMaxId = (tiles: Tile[]): number => {
  return Math.max.apply(Math, [0, ...tiles.map((x) => x.id)]);
};

export const MOVES_MAP: {[key: string]: Function } = {
  "up": moveUp,
  "down": moveDown,
  "right": moveRight,
  "left": moveLeft,
};
