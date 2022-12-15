import { GameState, Tile } from "../interfaces";

export interface BoardState {
  moves: Array<GameState>;
  loading: boolean;
  tiles: Tile[]
}

export type BoardActionType = { type: "addMove"; payload: GameState } | { type: "startMove" } | {type: "endMove"};
