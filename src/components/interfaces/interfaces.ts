import { Dispatch } from "react";

export type Value =
  | "2"
  | "4"
  | "8"
  | "16"
  | "32"
  | "64"
  | "128"
  | "256"
  | "512"
  | "1024"
  | "2048";

export type TransformFactor = 121 | 97 | 73;

export type MoveKeyCode = "ArrowUp" | "ArrowDown" | "ArrowRight" | "ArrowLeft";

export type Direction = "right" | "left";

export type TileType = "merged" | "new";

export interface Tile {
  id: number;
  value: Value;
  type: TileType;
  positionX: number;
  positionY: number;
}

export type GameContextActionType =
  | { type: "restart" }
  | { type: "addMove"; payload: MoveKeyCode }
  | { type: "startMove" }
  | { type: "move", payload: Tile[] }
  | { type: "endMove"; payload?: Tile[] };

export interface GameState {
  tiles: Tile[];
  moves: MoveKeyCode[];
  loading: boolean;
}

export interface IGameContext {
  tiles: Tile[];
  dispatch: Dispatch<GameContextActionType>;
  // restartGame: () => void;
}
