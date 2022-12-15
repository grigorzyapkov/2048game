import { Tile } from "../interfaces";

export type ACTIONTYPE = { type: "change"; payload: Tile[] };

export interface ScoresState {
  score: number;
  bestScore: number;
  newPoints: number;
  tiles: Tile[];
}