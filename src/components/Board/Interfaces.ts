import { GameState, Tile } from "../Interfaces";

export interface BoardState {
  moves: Array<GameState>;
  loading: boolean;
  tiles: Tile[]
}

export type BoardActionType = { type: "addMove"; payload: GameState } | { type: "startMove" } | {type: "endMove"};

export type GameStatus = "WIN" | "GAME_OVER" | "IN_PROGRESS";
